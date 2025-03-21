// Last edited by Dietrich Geisler 2025

// references to general information
var g_canvas
var gl
var g_lastFrameMS

// references to the GLSL programs we need to load
var g_vshader
var g_fshader

// GLSL uniform references
var g_u_model_ref
var g_u_world_ref


// lighting references
var g_u_inversetranspose_ref
var g_u_light_ref1
var g_u_light_ref2
var g_u_light_ref3

var g_u_redlighting_ref
var g_u_bluelighting_ref
var g_u_greenlighting_ref

var g_u_specpower_ref
var g_u_flatlighting_ref
var g_u_flatcolor_ref

var g_u_redlighting_ref
var g_u_bluelighting_ref
var g_u_greenlighting_ref


var g_lightPosition1
var g_specPower

var g_u_texture_ref
var g_texturePointer

var g_platformPosition1 = [2.0, 0, 2.0]
var g_platformPosition2 = [2.0, 0.15, 2.0]
var g_platformPosition3 = [2.0, 0.30, 2.0]
var g_platformPosition4 = [2.0, 0.45, 2.0]

var g_platformModel1
var g_platformModel2
var g_platformModel3
var g_platformModel4

var g_platformMatrix1
var g_platformMatrix2
var g_platformMatrix3
var g_platformMatrix4

// Models
var g_sphereModel
var g_emeraldModel

// usual model/world matrices
var g_modelMatrix
var g_worldMatrix

// Mesh definitions
var g_sphereMesh
var g_emeraldMesh

var g_sphereNormals
var g_pyramidNormals
var g_emeraldNormals

const sphereCOLOR = [1.0, 0, 0];
const pyramidCOLOR = [1.0, 0.9, 0];
const emeraldCOLOR = [0.2, 0.7, 0.1];
const lightCOLOR = [1.0, 1.00, 1.00];


// texture coordinates
var g_pyramidTextureCoord

// images for texture
var g_pyramidImage

// Camera projection 
var g_u_camera_ref

var g_u_projection_ref
var g_projectionMatrix 

var g_viewMatrix
// Key states
var g_yawA = 0.0;   // Horizontal rotation
var g_pitchA = 0.0; // Vertical rotation

// Camera direction vector (updated dynamically)
var g_lookDirX = 0.0;
var g_lookDirY = 0.0;
var g_lookDirZ = -1.0; // Default looking forward

// Camera up vector
var g_upX = 0.0;
var g_upY = 1.0;
var g_upZ = 0.0;

let g_camPosX = 0.0;
let g_camPosY = 0.3;
let g_camPosZ = 2.0; // Positioned 5 units away from origin
var g_vbo;

// boolean states 
var sphereRotateX = false
var shouldRandomize = false

var redOn = true
var greenOn = true
var blueOn = true

// We're using triangles, so our vertices each have 3 elements
const TRIANGLE_SIZE = 3

// The size in bytes of a floating point
const FLOAT_SIZE = 4

const SPHERE_SCALE = 0.1
const PYRAMID_SCALE = 0.5
const EMERALD_SCALE = 0.01

const LIGHT_CUBE_MESH = [
    // front face
    1, 1, 1,
    -1, 1, 1,
    -1, -1, 1,

    1, 1, 1,
    -1, -1, 1,
    1, -1, 1,

    // back face
    1, 1, -1,
    -1, -1, -1,
    -1, 1, -1,

    1, 1, -1,
    1, -1, -1,
    -1, -1, -1,

    // right face
    1, 1, 1,
    1, -1, -1,
    1, 1, -1,

    1, 1, 1,
    1, -1, 1,
    1, -1, -1,

    // left face
    -1, 1, 1,
    -1, 1, -1,
    -1, -1, -1,

    -1, 1, 1,
    -1, -1, -1,
    -1, -1, 1,

    // top face
    1, 1, 1,
    1, 1, -1,
    -1, 1, -1,

    1, 1, 1,
    -1, 1, -1,
    -1, 1, 1,

    // bottom face
    1, -1, 1,
    -1, -1, -1,
    1, -1, -1,

    1, -1, 1,
    -1, -1, 1,
    -1, -1, -1,
]

const CUBE_NORMALS = [
    // front face
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // back face
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,

    // right face
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // left face
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,

    // top face
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // bottom face
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
]

// same as cube normals 
const PLATFORM_NORMALS = [
    // front face
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    // back face
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,

    // right face
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    // left face
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,

    // top face
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    // bottom face
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
]


const PLATFORM_MESH = [
    // front face
    1, 1, 1,
    -1, 1, 1,
    -1, -1, 1,

    1, 1, 1,
    -1, -1, 1,
    1, -1, 1,

    // back face
    1, 1, -1,
    -1, -1, -1,
    -1, 1, -1,

    1, 1, -1,
    1, -1, -1,
    -1, -1, -1,

    // right face
    1, 1, 1,
    1, -1, -1,
    1, 1, -1,

    1, 1, 1,
    1, -1, 1,
    1, -1, -1,

    // left face
    -1, 1, 1,
    -1, 1, -1,
    -1, -1, -1,

    -1, 1, 1,
    -1, -1, -1,
    -1, -1, 1,

    // top face
    1, 1, 1,
    1, 1, -1,
    -1, 1, -1,

    1, 1, 1,
    -1, 1, -1,
    -1, 1, 1,

    // bottom face
    1, -1, 1,
    -1, -1, -1,
    1, -1, -1,

    1, -1, 1,
    -1, -1, 1,
    -1, -1, -1,
]

// TODO: add this to the VBO for use in the GPU
const PLATFORM_TEX_MAPPING = [
    // front face
    1, 1,
    0, 1,
    0, 0,
    1, 1,
    0, 0,
    1, 0,

    // back face
    1, 0,
    0, 1,
    0, 0,
    1, 0,
    1, 1,
    0, 1,

    // right face
    0, 1,
    1, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,

    // left face
    1, 1,
    0, 1,
    0, 0,
    1, 1,
    0, 0,
    1, 0,

    // top face
    1, 0,
    1, 1,
    0, 1,
    1, 0,
    0, 1,
    0, 0,

    // bottom face
    1, 1,
    0, 0,
    1, 0,
    1, 1,
    0, 1,
    0, 0,
]

function main() {


    setupKeyBinds()
    slider_input = document.getElementById('slider1Y')
    slider_input.addEventListener('input', (event) => {
        updateLight1Y(event.target.value)
    })

    slider_input = document.getElementById('slider1Y')
    slider_input.addEventListener('input', (event) => {
        updateLight1Y(event.target.value)
    })
    g_canvas = document.getElementById('canvas')

    // Get the rendering context for WebGL
    gl = getWebGLContext(g_canvas, true)
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL')
        return
    }

    // We will call this at the end of most main functions from now on
    loadImageFiles()
}

/*
 * Helper function to load OBJ files in sequence
 * For much larger files, you may are welcome to make this more parallel
 * I made everything sequential for this class to make the logic easier to follow
 */
async function loadOBJFiles() {
    // open our OBJ file(s)
    data = await fetch('./resources/sphere.tri.obj').then(response => response.text()).then((x) => x)
    g_sphereMesh = []
    g_sphereNormals = []
    readObjFile(data, g_sphereMesh)
    g_sphereNormals = getNormals(g_sphereMesh)
    data = await fetch('./resources/emerald1.tri.obj').then(response => response.text()).then((x) => x)
    g_emeraldMesh = []
    g_emeraldNormals = []
    readObjFile(data, g_emeraldMesh)
    g_emeraldNormals = getNormals(g_emeraldMesh);

    loadGLSLFiles()
}

async function loadImageFiles() {
    g_pyramidImage = new Image()
    g_pyramidImage.src = "resources/pyramidtexture.png"
    await g_pyramidImage.decode()
    loadOBJFiles()
}

async function loadGLSLFiles() {
    g_vshader = await fetch('/project1.vert').then(response => response.text()).then((x) => x)
    g_fshader = await fetch('/project1.frag').then(response => response.text()).then((x) => x)

    // wait until everything is loaded before rendering
    startRendering()
}

function generateTerrainTextureCoordinates(terrain, width, depth) {
    var textureCoordinates = [];
    for (let i = 0; i < terrain.length; i++) {
        let x = terrain[i][0]; // X position of the vertex
        let z = terrain[i][2]; // Z position of the vertex

        // Normalize the coordinates to [0, 1] range, and use a repeating pattern
        let u = (x % width) / width;  // Horizontal texture repeat
        let v = (z % depth) / depth;  // Vertical texture repeat

        textureCoordinates.push(u, v);
    }
    return textureCoordinates;
}

function startRendering() {
    // Initialize GPU's vertex and fragment shaders programs
    if (!initShaders(gl, g_vshader, g_fshader)) {
        console.log('Failed to intialize shaders.')
        return
    }
    var terrainGenerator = new TerrainGenerator()
    // use the current milliseconds as our seed by default
    // TODO: consider setting this as a constant when testing stuff!
    //   just make sure to change it back to something semi-random before submitting :)
    var seed = new Date().getMilliseconds()

    var options = { 
        width: 100, 
        height: 10, 
        depth: 100, 
        seed: seed,
        noisefn: "wave", 
        roughness: 20
    };
    
    var terrain = terrainGenerator.generateTerrainMesh(options)
    g_terrainMesh = []
    for (var i = 0; i < terrain.length; i++) {
        g_terrainMesh.push(...terrain[i])
    }
    var terrainTextureCoordinates = generateTerrainTextureCoordinates(terrain, options.width, options.depth);


    // initialize the VBO
    var sphereColors = buildSphereColorAttributes(g_sphereMesh.length / 3)
    var emeraldColors = buildEmeraldColorAttributes(g_emeraldMesh.length / 3)
    var lightColors = buildLightColorAttributes(LIGHT_CUBE_MESH.length / 3)

    var sphereTypes = new Array(g_sphereMesh.length / 3).fill(2);  // 2 for sphere
    var emeraldTypes = new Array(g_emeraldMesh.length / 3).fill(1);  // 1 for emerald
    var pyramidTypes = new Array(PLATFORM_MESH.length / 3).fill(0);  // 0 for pyramid (texture)
    var lightTypes = new Array(LIGHT_CUBE_MESH.length / 3).fill(3);


    var data = PLATFORM_MESH
    .concat(g_sphereMesh)
    .concat(g_emeraldMesh)
    .concat(LIGHT_CUBE_MESH)
    .concat(PLATFORM_TEX_MAPPING)
    .concat(sphereColors)
    .concat(emeraldColors)
    .concat(lightColors)
    .concat(pyramidTypes)
    .concat(sphereTypes)
    .concat(emeraldTypes)
    .concat(pyramidTypes) // Add object types for each mesh
    .concat(PLATFORM_NORMALS)
    .concat(g_platformNormals)
    .concat(g_emeraldNormals)
    .concat(CUBE_NORMALS);

    if (!initVBO(new Float32Array(data))) {
       return
   }

    const positionOffset = 0;
    const textureOffset = (PLATFORM_MESH.length + g_sphereMesh.length + g_emeraldMesh.length + LIGHT_CUBE_MESH.length) * FLOAT_SIZE;
    const colorOffset = textureOffset + (PLATFORM_TEX_MAPPING.length* FLOAT_SIZE);
    const typeOffset = colorOffset + (sphereColors.length + emeraldColors.length + lightColors.length) * FLOAT_SIZE;

   console.log("Position:", PLATFORM_MESH.length + g_sphereMesh.length + g_emeraldMesh.length + LIGHT_CUBE_MESH.length)
   console.log("Texture:",  PLATFORM_TEX_MAPPING.length)
   console.log("Color:", sphereColors.length+ emeraldColors.length + lightColors.length)
   console.log("Type:", sphereTypes.length + emeraldTypes.length + pyramidTypes.length)

   if (!setupVec(3, 'a_Position', 0, positionOffset)) {
    return; // Exit if position setup fails
    }
    // Set up texture coordinates attribute (a_TexCoord) for PLATFORM_MESH only
    console.log("Texture Start:", PLATFORM_MESH.length + g_sphereMesh.length + g_emeraldMesh.length + LIGHT_CUBE_MESH.length)
    if (!setupVec(2, 'a_TexCoord', 0, textureOffset)) {
        return; // Exit if texture coordinates setup fails
    }
    console.log("Color Start:", PLATFORM_MESH.length + g_sphereMesh.length + g_emeraldMesh.length + LIGHT_CUBE_MESH.length + PLATFORM_TEX_MAPPING.length)
    // Set up color data for the sphere, emerald, and light cube meshes
    if (!setupVec(3, 'a_Color', 0, colorOffset)) {
        return; // Exit if color setup fails
    }
    console.log("Object Start:", g_sphereMesh.length + g_emeraldMesh.length + PLATFORM_MESH.length + LIGHT_CUBE_MESH.length + PLATFORM_TEX_MAPPING.length + sphereColors.length + emeraldColors.length + lightColors.length)
    if (!setupVec(1, 'a_ObjectType', 0, typeOffset)) {
        return;

    if (!setupVec3('a_Normal', 0, (g_sphereMesh.length + g_emeraldMesh.length + PLATFORM_MESH.length + LIGHT_CUBE_MESH.length + PLATFORM_TEX_MAPPING.length + sphereColors.length + emeraldColors.length + lightColors.length + sphereTypes.length + emeraldTypes.length + pyramidTypes.length) * FLOAT_SIZE)) {
        return
    }

    // Get references to GLSL uniforms
    g_u_model_ref = gl.getUniformLocation(gl.program, 'u_Model')
    g_u_world_ref = gl.getUniformLocation(gl.program, 'u_World')
    g_u_camera_ref = gl.getUniformLocation(gl.program, 'u_Camera')
    g_u_projection_ref = gl.getUniformLocation(gl.program, 'u_Projection')
    g_u_texture_ref = gl.getUniformLocation(gl.program, 'u_Texture')

    // light references
    g_u_inversetranspose_ref = gl.getUniformLocation(gl.program, 'u_ModelWorldInverseTranspose')
    g_u_light_ref1 = gl.getUniformLocation(gl.program, 'u_Light1')
    g_u_light_ref2 = gl.getUniformLocation(gl.program, 'u_Light2')
    g_u_light_ref3 = gl.getUniformLocation(gl.program, 'u_Light3')

    g_u_specpower_ref = gl.getUniformLocation(gl.program, 'u_SpecPower')
    g_u_flatlighting_ref = gl.getUniformLocation(gl.program, 'u_FlatLighting')
    g_u_flatcolor_ref = gl.getUniformLocation(gl.program, 'u_FlatColor')
    g_u_diffuse_ref = gl.getUniformLocation(gl.program, 'u_DiffuseColor')
    g_u_redlighting_ref = gl.getUniformLocation(gl.program, 'u_REDLighting')
    g_u_bluelighting_ref = gl.getUniformLocation(gl.program, 'u_BLUELighting')
    g_u_greenlighting_ref = gl.getUniformLocation(gl.program, 'u_GREENLighting')


    // model translation and scaling
    g_sphereModel = new Matrix4()
    g_sphereModel = g_sphereModel.scale(SPHERE_SCALE, SPHERE_SCALE, -SPHERE_SCALE) // -z to make the plane not be "inside-out"

    g_emeraldModel = new Matrix4()
    g_emeraldModel = g_emeraldModel.scale(EMERALD_SCALE, EMERALD_SCALE, -EMERALD_SCALE)

    g_platformModel1 = new Matrix4().scale(PYRAMID_SCALE, 0.08, PYRAMID_SCALE)
    g_platformModel2 = new Matrix4().scale(0.4, 0.08, 0.3)
    g_platformModel3 = new Matrix4().scale(0.2, 0.08, 0.2)
    g_platformModel4 = new Matrix4().scale(0.1, 0.08, 0.1)

    g_platformMatrix1 = new Matrix4().translate(...g_platformPosition1)
    g_platformMatrix2 = new Matrix4().translate(...g_platformPosition2)
    g_platformMatrix3 = new Matrix4().translate(...g_platformPosition3)
    g_platformMatrix4 = new Matrix4().translate(...g_platformPosition4)


    g_sphereMatrix = new Matrix4().translate(2.5, 0.85, 2.8)
    g_emeraldMatrix = new Matrix4().translate(2, 0.65, 2)

    var g_texturePointer = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, g_texturePointer)

    gl.uniform1i(g_u_texture_ref, g_texturePointer)

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, g_pyramidImage)

    gl.generateMipmap(gl.TEXTURE_2D)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR)


    // Setup a "reasonable" perspective matrix
    const aspectRatio = g_canvas.width / g_canvas.height;
    g_projectionMatrix = new Matrix4().setPerspective(45, aspectRatio, 0.1, 500);
    g_viewMatrix = new Matrix4()    


    // Enable culling and depth tests
    gl.cullFace(gl.FRONT_AND_BACK); // Cull both front and back faces
    gl.enable(gl.DEPTH_TEST)

    // Setup for ticks
    g_lastFrameMS = Date.now()

    g_lightPosition1 = [2.5, 0.75, 2]
    g_lightPosition2 = [2.0, 0.75, 2.5]
    g_lightPosition3 = [1.75, 0.75, 1.5]

    g_specPower = 5

    updateLight1Y(0.75)

    tick()
}


// extra constants for cleanliness
var SPHERE_ROTATION_SPEED = .1
var PYRAMID_ROT_SPEED = 0.06
var EMERALD_ROT_SPEED = 0.7
const CAMERA_SPEED = .1
const CAMERA_ROT_SPEED = .1

// function to apply all the logic for a single frame tick
function tick() {
    // time since the last frame
    var deltaTime

    // calculate deltaTime
    var current_time = Date.now()
    deltaTime = current_time - g_lastFrameMS
    g_lastFrameMS = current_time

    // rotate the arm constantly around the given axis (of the model)
    angle = SPHERE_ROTATION_SPEED * deltaTime

    // rotation matrices
    if (sphereRotateX) // only rotate sphere when true 
    {
        g_sphereMatrix.rotate(-deltaTime * SPHERE_ROTATION_SPEED, 0, 1, 0)
    }
    g_platformMatrix1.rotate(-deltaTime * PYRAMID_ROT_SPEED, 0, 1, 0)
    g_platformMatrix2.rotate(-deltaTime * PYRAMID_ROT_SPEED, 0, 1, 0)
    g_platformMatrix3.rotate(-deltaTime * PYRAMID_ROT_SPEED, 0, 1, 0)
    g_platformMatrix4.rotate(-deltaTime * PYRAMID_ROT_SPEED, 0, 1, 0)
    g_emeraldMatrix.rotate(-deltaTime * EMERALD_ROT_SPEED, 0, 1, 0)
    
    updateCam()


    draw()
    
    requestAnimationFrame(tick, g_canvas)
}


// draw to the screen on the next frame
function draw() {
    // Update with our global transformation matrices
   

    // Clear the canvas with a black backgroundd
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.uniformMatrix4fv(g_u_camera_ref, false, g_viewMatrix.elements);
    gl.uniformMatrix4fv(g_u_projection_ref, false, g_projectionMatrix.elements)
    

    // draw pyramid platforms 
    gl.uniformMatrix4fv(g_u_model_ref, false, g_platformModel1.elements)
    gl.uniformMatrix4fv(g_u_world_ref, false, g_platformMatrix1.elements)
    gl.drawArrays(gl.TRIANGLES, 0, PLATFORM_MESH.length / 3)

    gl.uniformMatrix4fv(g_u_model_ref, false, g_platformModel2.elements)
    gl.uniformMatrix4fv(g_u_world_ref, false, g_platformMatrix2.elements)
    gl.drawArrays(gl.TRIANGLES, 0, PLATFORM_MESH.length / 3)

    gl.uniformMatrix4fv(g_u_model_ref, false, g_platformModel3.elements)
    gl.uniformMatrix4fv(g_u_world_ref, false, g_platformMatrix3.elements)
    gl.drawArrays(gl.TRIANGLES, 0, PLATFORM_MESH.length / 3)

    gl.uniformMatrix4fv(g_u_model_ref, false, g_platformModel4.elements)
    gl.uniformMatrix4fv(g_u_world_ref, false, g_platformMatrix4.elements)
    gl.drawArrays(gl.TRIANGLES, 0, PLATFORM_MESH.length / 3);

     // draw the sphere 
    gl.uniformMatrix4fv(g_u_model_ref, false, g_sphereModel.elements)
    gl.uniformMatrix4fv(g_u_world_ref, false, g_sphereMatrix.elements)

    var inverseTranspose = new Matrix4(g_sphereMatrix).multiply(g_sphereModel)
    inverseTranspose.invert().transpose()
    gl.uniformMatrix4fv(g_u_inversetranspose_ref, false, inverseTranspose.elements)

    gl.uniform1i(g_u_flatlighting_ref, false)
    gl.uniform3fv(g_u_light_ref1, new Float32Array(g_lightPosition1))
    gl.uniform3fv(g_u_light_ref2, new Float32Array(g_lightPosition2))
    gl.uniform3fv(g_u_light_ref3, new Float32Array(g_lightPosition3))
    
    gl.uniform1i(g_u_redlighting_ref, redOn)
    gl.uniform1i(g_u_bluelighting_ref, blueOn)
    gl.uniform1i(g_u_greenlighting_ref, greenOn)

    gl.uniform1f(g_u_specpower_ref, g_specPower)
    gl.uniform3fv(g_u_diffuse_ref, new Float32Array(sphereCOLOR))

    gl.drawArrays(gl.TRIANGLES, (PLATFORM_MESH.length) / 3, g_sphereMesh.length / 3)

    gl.uniformMatrix4fv(g_u_model_ref, false, g_emeraldModel.elements)
    gl.uniformMatrix4fv(g_u_world_ref, false, g_emeraldMatrix.elements)
    var inverseTranspose = new Matrix4(g_emeraldMatrix).multiply(g_emeraldModel)
    inverseTranspose.invert().transpose()
    gl.uniformMatrix4fv(g_u_inversetranspose_ref, false, inverseTranspose.elements)
    gl.uniform3fv(g_u_diffuse_ref, new Float32Array(emeraldCOLOR))
  
    gl.drawArrays(gl.TRIANGLES, (g_sphereMesh.length + PLATFORM_MESH.length) / 3, g_emeraldMesh.length / 3)

    // light 1
    gl.uniform1i(g_u_flatlighting_ref, true)
    gl.uniform3fv(g_u_flatcolor_ref, [1, 0, 0])
    let g_lightModel = new Matrix4().scale(.05, .05, .05);
    let g_lightMatrix = new Matrix4().translate(...g_lightPosition1);
    gl.uniformMatrix4fv(g_u_model_ref, false, g_lightModel.elements)
    gl.uniformMatrix4fv(g_u_world_ref, false, g_lightMatrix.elements)
    var inverseTranspose = new Matrix4(g_lightMatrix.elements).multiply(g_lightModel)
    inverseTranspose.invert().transpose()
    gl.uniformMatrix4fv(g_u_inversetranspose_ref, false, inverseTranspose.elements)
    gl.uniform3fv(g_u_diffuse_ref, new Float32Array(lightCOLOR))

    gl.drawArrays(gl.TRIANGLES, (g_sphereMesh.length + PLATFORM_MESH.length + g_emeraldMesh.length) / 3, LIGHT_CUBE_MESH.length / 3)

    // // light 2
    gl.uniform3fv(g_u_flatcolor_ref, [0, 0, 1])
    let g_lightMatrix2 = new Matrix4().translate(...g_lightPosition2);
    gl.uniformMatrix4fv(g_u_world_ref, false, g_lightMatrix2.elements)
    
    var inverseTranspose = new Matrix4(g_lightMatrix2.elements).multiply(g_lightModel)
    inverseTranspose.invert().transpose()
    gl.uniformMatrix4fv(g_u_inversetranspose_ref, false, inverseTranspose.elements)

    gl.drawArrays(gl.TRIANGLES, (g_sphereMesh.length + PLATFORM_MESH.length + g_emeraldMesh.length) / 3, LIGHT_CUBE_MESH.length / 3)

    // // light 3
    gl.uniform3fv(g_u_flatcolor_ref, [0, 1, 0])
    let g_lightMatrix3 = new Matrix4().translate(...g_lightPosition3);
    gl.uniformMatrix4fv(g_u_world_ref, false, g_lightMatrix3.elements)
    
    var inverseTranspose = new Matrix4(g_lightMatrix3.elements).multiply(g_lightModel)
    inverseTranspose.invert().transpose()
    gl.uniformMatrix4fv(g_u_inversetranspose_ref, false, inverseTranspose.elements)

    gl.drawArrays(gl.TRIANGLES, (g_sphereMesh.length + PLATFORM_MESH.length + g_emeraldMesh.length) / 3, LIGHT_CUBE_MESH.length / 3)

}

function updateRotation()
{
    sphereRotateX = true
}
function updateRed()
{
    redOn = !redOn
}
function updateGreen()
{
    greenOn = !greenOn
}
function updateBlue()
{
    blueOn = !blueOn
}

function updateRed()
{
    redOn = !redOn
}
function updateGreen()
{
    greenOn = !greenOn
}
function updateBlue()
{
    blueOn = !blueOn
}

// Helper to construct colors
// makes every triangle a slightly different shade of blue
function buildColorAttributes(vertex_count) {
    var colors = []
    for (var i = 0; i < vertex_count / 3; i++) {
        // three vertices per triangle
        for (var vert = 0; vert < 3; vert++) {
            var shade = (i * 3) / vertex_count
            colors.push(0.8, 0.8, shade)
        }
    }

    return colors
}

function buildLightColorAttributes(vertex_count) {
    var colors = []
    for (var i = 0; i < vertex_count / 3; i++) {
        // three vertices per triangle
        for (var vert = 0; vert < 3; vert++) {
            colors.push(1, 1, 1)
        }
    }

    return colors
}

function buildEmeraldColorAttributes(vertex_count) {
    var colors = []
    for (var i = 0; i < vertex_count / 3; i++) {
        // Three vertices per triangle
        for (var vert = 0; vert < 3; vert++) {
            var shade = 0.3 + (i * 3) / vertex_count * 0.7 
            colors.push(0.31 * shade, 0.78 * shade, 0.47 * shade) // emerald green gradient
        }
    }

    return colors
}

function buildSphereColorAttributes(vertex_count) {
    var colors = []
    for (var i = 0; i < vertex_count / 3; i++) {
        // Three vertices per triangle
        for (var vert = 0; vert < 3; vert++) {
            var shade = 0.5 + (i * 3) / vertex_count * 0.5 
            colors.push(shade, 0.2, 0.0) // orange gradient
        }
    }

    return colors
}

function getNormals(cubeMesh) {
    const normals = [];
        for (let i = 0; i < cubeMesh.length; i += 9) {
            const v1 = [cubeMesh[i], cubeMesh[i + 1], cubeMesh[i + 2]];
            const v2 = [cubeMesh[i + 3], cubeMesh[i + 4], cubeMesh[i + 5]];
            const v3 = [cubeMesh[i + 6], cubeMesh[i + 7], cubeMesh[i + 8]];
  
            const A = [v2[0] - v1[0], v2[1] - v1[1], v2[2] - v1[2]];
            const B = [v3[0] - v1[0], v3[1] - v1[1], v3[2] - v1[2]];
  
            let normalX = A[1] * B[2] - A[2] * B[1];
            let normalY = A[2] * B[0] - A[0] * B[2];
            let normalZ = A[0] * B[1] - A[1] * B[0];
  
            const len = Math.hypot(normalX, normalY, normalZ);
            if (len > 0.00001) {
                normalX /= len;
                normalY /= len;
                normalZ /= len;
            }

            normals.push(normalX, normalY, normalZ);
            normals.push(normalX, normalY, normalZ);
            normals.push(normalX, normalY, normalZ);
    }
  
    return normals;
}

  

function updateCamVec(){
    g_lookX = Math.cos(g_yawA) * Math.cos(g_pitchA)
    g_lookY = Math.sin(g_pitchA)
    g_lookZ = Math.sin(g_yawA) * Math.cos(g_pitchA)
    const len = Math.sqrt(g_lookX * g_lookX + g_lookY * g_lookY + g_lookZ * g_lookZ)
    g_lookX /= len
    g_lookY /= len
    g_lookZ /= len
    if (Math.abs(g_pitchA) > Math.PI / 2 - 0.01) {
        g_upX = 0.0
        g_upY = Math.sign(Math.sin(g_pitchA)) * -1.0
        g_upZ = 0.0
    } else {
        g_upX = 0.0
        g_upY = 1.0
        g_upZ = 0.0
    }
}

function updateCam() {
    updateCamVec()
    g_viewMatrix = new Matrix4().setLookAt(
        g_camPosX, g_camPosY, g_camPosZ,
        g_camPosX + g_lookX, g_camPosY + g_lookY, g_camPosZ + g_lookZ,
        g_upX, g_upY, g_upZ
    )
}

function updateLight1Y(amount) {
    label = document.getElementById('light1Y')
    label.textContent = `Red Light Y: ${Number(amount).toFixed(2)}`
    g_lightPosition1[1] = Number(amount)
}

function buildTerrainColors(terrain, height) {
    var colors = [];
    for (var i = 0; i < terrain.length; i++) {
        // Normalize the height of the vertex (0 = bottom, 1 = top)
        var normalizedHeight = terrain[i][1] / height;

        // Define the base colors
        var bottomColor = [0.4, 0.2, 0.0]; // Brown (RGB)
        var topColor = [1.0, 0.0, 0.0];    // Red (RGB)

        // Interpolate between brown and red based on the normalized height
        var color = [
            bottomColor[0] + (topColor[0] - bottomColor[0]) * normalizedHeight, // Red
            bottomColor[1] + (topColor[1] - bottomColor[1]) * normalizedHeight, // Green
            bottomColor[2] + (topColor[2] - bottomColor[2]) * normalizedHeight  // Blue
        ];

        // Add the color to the colors array
        colors.push(...color);
    }

    return colors;
}


/*
 * Helper function to setup key binding logic
 */
function setupKeyBinds() {
    // Start movement when the key starts being pressed
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowUp':
                g_pitchA += CAMERA_ROT_SPEED;
                if (g_pitchA > Math.PI) g_pitchA = Math.PI;
                break;
            case 'ArrowDown':
                g_pitchA -= CAMERA_ROT_SPEED;
                if (g_pitchA < -Math.PI) g_pitchA = -Math.PI; // Fixed sign
                break;
            case 'ArrowLeft':
                g_yawA -= CAMERA_ROT_SPEED;
                break;
            case 'ArrowRight':
                g_yawA += CAMERA_ROT_SPEED;
                break;
             case 'a': {
                let rX = g_lookZ * g_upY - g_lookY * g_upZ;
                let rY = g_lookX * g_upZ - g_lookZ * g_upX;
                let rZ = g_lookY * g_upX - g_lookX * g_upY;

                const rLen = Math.sqrt(rX * rX + rY * rY + rZ * rZ);
                rX /= rLen;
                rY /= rLen; // Fixed typo
                rZ /= rLen;

                g_camPosX += rX * CAMERA_SPEED;
                g_camPosY += rY * CAMERA_SPEED;
                g_camPosZ += rZ * CAMERA_SPEED; // Fixed `=+` to `+=`
                break;
            }
            case 'd': {
                let rX1 = g_lookZ * g_upY - g_lookY * g_upZ;
                let rY1 = g_lookX * g_upZ - g_lookZ * g_upX;
                let rZ1 = g_lookY * g_upX - g_lookX * g_upY;

                const rLen = Math.sqrt(rX1 * rX1 + rY1 * rY1 + rZ1 * rZ1);
                rX1 /= rLen;
                rY1 /= rLen;
                rZ1 /= rLen;

                g_camPosX -= rX1 * CAMERA_SPEED;
                g_camPosY -= rY1 * CAMERA_SPEED;
                g_camPosZ -= rZ1 * CAMERA_SPEED;
                break;
            }  
            case 'w':
                g_camPosX += g_lookX * CAMERA_SPEED;
                g_camPosY += g_lookY * CAMERA_SPEED;
                g_camPosZ += g_lookZ * CAMERA_SPEED;
                break;
            case 's':
                g_camPosX -= g_lookX * CAMERA_SPEED;
                g_camPosY -= g_lookY * CAMERA_SPEED;
                g_camPosZ -= g_lookZ * CAMERA_SPEED;
                break;
        } // End switch
        updateCam();
    }); // End event listener
}



// How far in the X and Z directions the grid should extend
// Recall that the camera "rests" on the X/Z plane, since Z is "out" from the camera
const GRID_X_RANGE = 1000
const GRID_Z_RANGE = 1000

// The default y-offset of the grid for rendering
const GRID_Y_OFFSET = -0.5



/*
 * Initialize the VBO with the provided data
 * Assumes we are going to have "static" (unchanging) data
 */
function initVBO(data) {
    // get the VBO handle
    g_vbo = gl.createBuffer()
    if (!g_vbo) {
        return false
    }

    // Bind the VBO to the GPU array and copy `data` into that VBO
    gl.bindBuffer(gl.ARRAY_BUFFER, g_vbo)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

    return true
}

/*
 * Helper function to load the given vec3 data chunk onto the VBO
 * Requires that the VBO already be setup and assigned to the GPU
 */
function setupVec(size, name, stride, offset) {
    // Get the attribute by name
    var attributeID = gl.getAttribLocation(gl.program, `${name}`)
    if (attributeID < 0) {
        console.log(`Failed to get the storage location of ${name}`)
        return false
    }

    // Set how the GPU fills the a_Position variable with data from the GPU 
    gl.vertexAttribPointer(attributeID, size, gl.FLOAT, false, stride, offset)
    gl.enableVertexAttribArray(attributeID)

    return true
}

