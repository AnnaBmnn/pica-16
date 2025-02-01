varying vec2 vUv;
varying vec4 vPosition;

void main()
{
    // Varying
    vUv = uv;
    vPosition = csm_PositionRaw;
    // csm_Position -= 2.0;
}