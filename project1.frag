// Fragment Shader
precision highp float;

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