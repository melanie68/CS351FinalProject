'''
Reads in an obj file with a polygon face format and converts it to tri face format
This script is a bit hacky and may not work with all obj files
Last edited by Dietrich Geisler 2025
'''

import sys
import os
from typing import Tuple


def read_inputs() -> Tuple[str, str]:
    '''
    Validates and reads inputs from the command line
    '''
    if len(sys.argv) < 3:
        print(
            '''\
Expected input with 3 arguments: 
quad_to_try.py [input].obj [output].obj
''')
        exit()

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    assert input_file.endswith('.obj')
    assert os.path.exists(input_file)
    assert output_file.endswith('.obj')

    return input_file, output_file


def parse_input(input_file: str) -> list[str]:
    '''
    Returns a list of lines from the given input file
    Where each face of vertex count N is replaced with N-2 triangular faces
    '''
    result = []
    with open(input_file, 'r') as ifile:
        for linenum, line in enumerate(ifile):
            if line.startswith('f'):
                info = line.strip().split()
                assert(len(info) > 3), 'faces must have at least 3 vertices'
                # write the N-2 triangles
                # use the first vertex as a "grounding point"
                # any vertex would work, but this one is "simplest"
                for i in range(len(info) - 3):
                    triangle = f'{info[1]} {info[i + 2]} {info[i + 3]}'
                    result.append(f'f {triangle}\n')
            else:
                result.append(line)
    return result


def write_output(output_file: str, result: list[str]):
    '''
    Trivial function to write our result to the given file
    '''
    with open(output_file, 'w') as ofile:
        for line in result:
            ofile.write(line)


def main():
    input_file, output_file = read_inputs()
    result = parse_input(input_file)
    write_output(output_file, result)


if __name__ == "__main__":
    main()
