uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vUv;
varying vec4 vTexture;


void main()
{
    vTexture = texture2D(uTexture, uv);    
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // elevation
    modelPosition.z += ((vTexture.r + vTexture.g + vTexture.b) / 3.0) * 5.0 + sin(vTexture.r + uTime) ;

    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    // modelPosition.z += length(vTexture.xyz) * 1.2;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition ;

    // Varying
    vUv = uv;
}