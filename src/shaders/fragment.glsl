#define PI 3.1415926535897932384626433832795


varying vec2 vUv;
varying vec4 vTexture;

float random(vec2 st)
{

    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main()
{

    // gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    gl_FragColor = vec4(vTexture.rgb, 0.8);

}
