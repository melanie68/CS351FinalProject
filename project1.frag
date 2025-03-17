// Fragment Shader
precision highp float;

uniform sampler2D u_Texture;
varying vec2 v_TexCoord;
varying vec3 v_Normal;

void main() {
    // Sample the texture using the texture coordinates passed from the vertex shader
    // vec4 textureColor = texture2D(u_Texture, v_TexCoord);

    // Set the final color of the fragment
    gl_FragColor =  texture2D(u_Texture, v_TexCoord);
}