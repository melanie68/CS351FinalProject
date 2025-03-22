precision highp float;

varying vec3 v_Normal;
varying vec3 v_Position;
varying vec2 v_TexCoord;
varying mediump vec3 v_Color;

uniform mat4 u_Model;
uniform mat4 u_World;
uniform mat4 u_Camera;
uniform mat4 u_ModelWorldInverseTranspose;

uniform vec3 u_Light1; // Position of light 1
uniform vec3 u_Light2; // Position of light 2
uniform vec3 u_Light3; // Position of light 3

uniform bool u_REDLighting;
uniform bool u_GREENLighting;
uniform bool u_BLUELighting;

uniform bool u_FlatLighting;
uniform vec3 u_FlatColor;

uniform bool u_TextureOn;
uniform sampler2D u_Texture;

void main() {
    vec4 finalColor;

    if (u_TextureOn) {
        finalColor = texture2D(u_Texture, v_TexCoord);
        
    } else if (u_FlatLighting) {
        finalColor = vec4(u_FlatColor, 1.0);
    } else {
        finalColor = vec4(v_Color, 1.0);
    }

    if (!u_FlatLighting) {
        vec3 worldPosition = vec3(u_World * u_Model * vec4(v_Position, 1.0));
        vec3 worldNormal = normalize(vec3(u_World * u_Model * vec4(v_Normal, 0.0)));

        vec3 lightColor1 = vec3(1.0, 0.0, 0.0); // Red light
        vec3 lightColor2 = vec3(0.0, 0.0, 1.0); // Blue light
        vec3 lightColor3 = vec3(0.0, 1.0, 0.0); // Green light

        vec3 diffuseLighting = vec3(0.0);

        if (u_REDLighting) {
            vec3 lightDir1 = normalize(u_Light1 - worldPosition);
            float diffuse1 = max(dot(lightDir1, worldNormal), 0.0);
            diffuseLighting += diffuse1 * lightColor1;
        }

        if (u_BLUELighting) {
            vec3 lightDir2 = normalize(u_Light2 - worldPosition);
            float diffuse2 = max(dot(lightDir2, worldNormal), 0.0);
            diffuseLighting += diffuse2 * lightColor2;
        }

        if (u_GREENLighting) {
            vec3 lightDir3 = normalize(u_Light3 - worldPosition);
            float diffuse3 = max(dot(lightDir3, worldNormal), 0.0);
            diffuseLighting += diffuse3 * lightColor3;
        }

        finalColor.rgb += diffuseLighting;
    }

    gl_FragColor = finalColor;
}