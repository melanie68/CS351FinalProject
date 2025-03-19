attribute vec3 a_Position;
attribute vec2 a_TexCoord;
attribute vec3 a_Normal;

uniform mat4 u_Model;
uniform mat4 u_World;
uniform mat4 u_Camera;
uniform mat4 u_Projection;

uniform vec3 u_Light;


varying vec2 v_TexCoord;
varying vec3 v_Normal;

attribute vec3 a_Color;
varying vec3 v_Color;

varying vec3 v_Position;

void main() {

    gl_Position = u_Projection * u_Camera * u_World * u_Model * vec4(a_Position, 1.0);

    v_Normal = a_Normal;
    v_Position = a_Position;
    v_TexCoord = a_TexCoord;
}