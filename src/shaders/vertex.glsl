uniform float uTime;


varying vec2 vUv;
varying vec4 vPosition;
varying float vTime;


void main()
{
    // Varying
    vUv = uv;
    vPosition = csm_PositionRaw;
    vTime = uTime;
    // csm_Position -= 2.0;
}