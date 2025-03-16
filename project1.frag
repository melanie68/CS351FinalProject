precision highp float;

uniform vec3 u_Light1;
uniform vec3 u_Light2;
uniform vec3 u_Light3;

varying mediump vec3 v_Color;
uniform sampler2D u_Texture;
varying vec2 v_TexCoord;
void main() {
    vec4 textureColor = texture2D(u_Texture, v_TexCoord);
    gl_FragColor = vec4(v_Color, 1.0);
}