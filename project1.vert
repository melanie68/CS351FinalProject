// Vertex Shader
attribute vec3 a_Position;
attribute vec2 a_TexCoord;
attribute vec3 a_Normal;

uniform mat4 u_Model;
uniform mat4 u_World;
uniform mat4 u_Camera;
uniform mat4 u_Projection;

varying vec2 v_TexCoord;
varying vec3 v_Normal;

void main() {
    // Calculate the final position of the vertex
    gl_Position = u_Projection * u_Camera * u_World * u_Model * vec4(a_Position, 1.0);

    // Pass texture coordinates and normals to the fragment shader
    v_TexCoord = a_TexCoord;
    v_Normal = a_Normal;
}