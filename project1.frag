precision highp float;

varying vec3 v_Normal;
uniform mat4 u_Model;
varying vec3 v_Position;
uniform mat4 u_World;
uniform mat4 u_Camera;
uniform mat4 u_ModelWorldInverseTranspose;

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


varying mediump vec3 v_Color;
uniform sampler2D u_Texture;
varying vec2 v_TexCoord;

void main() {
    if (u_FlatLighting) {
        // use a slightly faded green "by default"
        gl_FragColor = vec4(u_FlatColor, 1.0);
    } else {
        vec3 rotated = normalize(vec3(u_Model * vec4(v_Normal, 0.0)));
       
        vec3 lightColor1 = vec3(1.0, 0.0, 0.0);
        vec3 lightColor2 = vec3(0.0, 0.0, 1.0);
        vec3 lightColor3 = vec3(0.0, 1.0, 0.0);


        vec3 color1 = dot(normalize(u_Light1), rotated) * lightColor1;
        vec3 color2 = dot(normalize(u_Light2), rotated) * lightColor2;
        vec3 color3 = dot(normalize(u_Light3), rotated) * lightColor3;

        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);

        if (u_REDLighting){
            gl_FragColor += vec4(color1, 1.0);
        }
        if (u_GREENLighting){
            gl_FragColor += vec4(color3, 1.0);
        }
        if (u_BLUELighting){
            gl_FragColor += vec4(color2, 1.0);
        }
}
}