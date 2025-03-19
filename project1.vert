// Vertex Shader
attribute vec3 a_Position;
attribute vec2 a_TexCoord;
attribute vec3 a_Normal;
attribute vec3 a_Color;      // Color for non-textured meshes (sphere, emerald, light cube)
// attribute float a_ObjectType; // 0: Pyramid (with texture), 1: Emerald, 2: Sphere (both with color)


uniform mat4 u_Model;
uniform mat4 u_World;
uniform mat4 u_Camera;
uniform mat4 u_Projection;

uniform vec3 u_Light;


varying vec2 v_TexCoord;
varying vec3 v_Normal;
varying vec3 v_Color;        // Color passed to the fragment shader for non-textured meshes
//varying float v_ObjectType;   // Pass object type to the fragment shader
void main() {
    // Calculate the final position of the vertex
    gl_Position = u_Projection * u_Camera * u_World * u_Model * vec4(a_Position, 1.0);

    // Pass texture coordinates and normals to the fragment shader
    v_TexCoord = a_TexCoord;
    v_Normal = a_Normal;
    v_Color = a_Color;
    // v_ObjectType = a_ObjectType;
}