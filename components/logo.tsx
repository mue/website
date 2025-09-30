import type { SVGProps } from 'react';

type LogoProps = SVGProps<SVGSVGElement>;

const Logo = ({ width = 500, height = 500, className, ...props }: LogoProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="250" cy="250" r="250" fill="url(#paint0_linear_2128_17)" />
      <path
        d="M283.648 159.326V185.963H341.262V243.117H368.138V159.326H283.648Z"
        fill="url(#paint1_linear_2128_17)"
      />
      <path
        d="M302.745 247.788H278.932V271.573H256.96V247.788H233.13V225.858H256.96V202.091H278.932V225.858H302.745V247.788ZM334.876 191.135H277.397V171.196H181.004V302.469H354.871V248.52H334.876V191.135Z"
        fill="url(#paint2_linear_2128_17)"
      />
      <path
        d="M175.023 195.633H156.562V326.906H330.429V308.43H175.023V195.633Z"
        fill="url(#paint3_linear_2128_17)"
      />
      <path
        d="M150.586 220.071H132.125V351.344H305.992V332.867H150.586V220.071Z"
        fill="url(#paint4_linear_2128_17)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2128_17"
          x1="462"
          y1="120"
          x2="29.5"
          y2="383"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF5C25" />
          <stop offset="0.484375" stopColor="#D21A11" />
          <stop offset="1" stopColor="#FF456E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2128_17"
          x1="325.893"
          y1="243.117"
          x2="325.893"
          y2="159.326"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F18D91" />
          <stop offset="1" stopColor="#FBD3C6" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2128_17"
          x1="267.937"
          y1="302.469"
          x2="267.937"
          y2="171.196"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F18D91" />
          <stop offset="1" stopColor="#FBD3C6" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_2128_17"
          x1="243.496"
          y1="326.906"
          x2="243.496"
          y2="195.633"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F18D91" />
          <stop offset="1" stopColor="#FBD3C6" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_2128_17"
          x1="219.058"
          y1="351.344"
          x2="219.058"
          y2="220.071"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F18D91" />
          <stop offset="1" stopColor="#FBD3C6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
