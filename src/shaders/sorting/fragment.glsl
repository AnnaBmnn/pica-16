#define PI 3.1415926535897932384626433832795


varying vec2 vUv;
varying vec4 vTexture;
varying vec4 vTextureAlpha;

varying float vTime;


void main()
{
    float median = (vTextureAlpha.r + vTextureAlpha.g + vTextureAlpha.b) / 3.0;
    gl_FragColor = vec4(vTexture.r, vTexture.g, vTexture.b, vTextureAlpha.b);

}
