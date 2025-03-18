// Fragment Shader
precision highp float;

uniform mat4 u_Model;
uniform mat4 u_Camera;
varying vec3 v_Position;
uniform mat4 u_World;

uniform vec3 u_Light1;
uniform vec3 u_Light2;
uniform vec3 u_Light3;

uniform float u_SpecPower;

uniform bool u_FlatLighting;
uniform vec3 u_FlatColor;

uniform vec3 u_DiffuseColor;

uniform bool u_REDLighting;
uniform bool u_GREENLighting;
uniform bool u_BLUELighting;

uniform sampler2D u_Texture;
varying vec2 v_TexCoord;
varying vec3 v_Color;         // Color for sphere and emerald
varying vec3 v_Normal;
varying float v_ObjectType;   // Object type to distinguish objects

void main() {
    if (v_ObjectType == 0.0) {
        // Pyramid: Use texture
        gl_FragColor = texture2D(u_Texture, v_TexCoord);
    } else {
        // Sphere or Emerald: Use color
        gl_FragColor = vec4(v_Color, 1.0);
    }
}