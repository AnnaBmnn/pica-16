varying vec2 vUv;
varying vec4 vPosition;


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
    vec2 uvDeform = vUv;
    uvDeform.x += sin(vUv.y * 0.1) * 0.3;
    uvDeform.y += sin(vUv.x * 2.1) * 1.2;

    // uvDeform.y += random(vUv) * 0.001;


    float patternX = step(0.5, mod( uvDeform.x * 100.0, 1.0));
    float patternY = step(0.5, mod( uvDeform.y * 250.0, 1.0));
    float pattern = mod(patternX + patternY , 2.0 );

    // pattern /= random(vUv) * 10.0;

    csm_DiffuseColor.rgb *= vec3(pattern * sign(cos(vUv.x * 0.0001)) * random(vUv));
    csm_Emissive.rgb *= vec3(pattern * sign(cos(vUv.x * 0.0001)) * random(vUv));

    csm_Emissive.rgb += random(vUv) * 0.2;
    // csm_DiffuseColor.rgb = vec3(vUv.y * 10.0);


}
