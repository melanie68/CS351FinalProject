precision highp float;

varying vec3 v_Normal;
uniform mat4 u_Model;
varying vec3 v_Position;
uniform mat4 u_World;
uniform mat4 u_Camera;
uniform mat4 u_ModelWorldInverseTranspose;

uniform vec3 u_Light1;
uniform float u_SpecPower;

uniform bool u_FlatLighting;
uniform vec3 u_FlatColor;

uniform vec3 u_DiffuseColor;


varying mediump vec3 v_Color;
uniform sampler2D u_Texture;
varying vec2 v_TexCoord;
void main() {
    if (u_FlatLighting) {
        // use a slightly faded green "by default"
        gl_FragColor = vec4(u_FlatColor, 1.0);
    } else {
        vec3 worldPosition = vec3(u_World * u_Model * vec4(v_Position, 1.0));
        vec3 worldNormal = normalize(vec3(u_ModelWorldInverseTranspose * vec4(v_Normal, 0.0)));
        vec3 cameraSpacePosition = vec3(u_Camera * vec4(worldPosition, 1.0));

        vec3 lightDir = normalize(u_Light1);

        float diffuse = max(dot(lightDir, worldNormal), 0.0);

        vec3 reflectDir = normalize(reflect(-lightDir, worldNormal));
        vec3 cameraReflectDir = vec3(u_Camera * vec4(reflectDir, 0.0));

        vec3 cameraDir = normalize(vec3(0.0, 0.0, 0.0) - cameraSpacePosition);

        float angle = max(dot(cameraDir, cameraReflectDir), 0.0);
        float specular = max(pow(angle, u_SpecPower), 0.0);

        vec3 specularColor = vec3(1.0, 1.0, 1.0);
        vec3 ambientColor = vec3(0.0, 0.0, 0.00);

        vec3 lightColor = vec3(0.84, 0.58, 0.76);

        vec3 color = ambientColor + diffuse * (lightColor * u_DiffuseColor) + specular * specularColor;
        gl_FragColor = vec4(color, 1.0);
}
}