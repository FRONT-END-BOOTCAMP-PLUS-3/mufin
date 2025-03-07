import styled, { keyframes } from "styled-components";

// ✅ 폭죽 개수 및 범위 설정
const PARTICLES = 50;
const CONF_WIDTH = 500;
const CONF_HEIGHT = 500;

/**
 * ✅ 랜덤 값 생성 함수
 * @param {number} max - 최대값
 * @param {number} offset - 기준점에서 빼줄 값
 * @returns {number} - 랜덤한 값
 */
export const getRandomValue = (max: number, offset: number = 0) =>
  Math.random() * max - offset;

/**
 * ✅ 랜덤 색상 생성 함수
 * @returns {string} - HSL 색상 값
 */
export const getRandomColor = () => `hsl(${Math.random() * 360}, 100%, 50%)`;

/**
 * ✅ 폭죽 `box-shadow` 생성 함수
 * @returns {string} - 여러 개의 폭죽 입자가 있는 `box-shadow` 스타일 문자열
 */
export const generateBoxShadow = () =>
  Array.from(
    { length: PARTICLES },
    () =>
      `${getRandomValue(CONF_WIDTH, CONF_WIDTH / 2)}px 
     ${getRandomValue(CONF_HEIGHT, CONF_HEIGHT / 1.2)}px 
     ${getRandomColor()}`
  ).join(",");

/**
 * ✅ 초기 폭죽 위치 생성
 * @returns {string} - 초기 폭죽 입자의 `box-shadow` 값
 */
export const generateBoxShadowInitial = () =>
  Array.from({ length: PARTICLES }, () => "0 0 #fff").join(",");

// ✅ 폭죽이 터지는 애니메이션
export const bang = keyframes`
  to {
    box-shadow: ${generateBoxShadow()};
  }
`;

// ✅ 폭죽이 떨어지는 애니메이션
export const gravity = keyframes`
  to {
    transform: translateY(200px);
    opacity: 0;
  }
`;

// ✅ 폭죽이 나타나는 위치 설정 애니메이션
export const position = keyframes`
  0%, 19.9% { top: 10%; left: 40%; }
  20%, 39.9% { top: 40%; left: 30%; }
  40%, 59.9% { top: 20%; left: 70%; }
  60%, 79.9% { top: 30%; left: 20%; }
  80%, 99.9% { top: 30%; left: 80%; }
`;

// ✅ 폭죽 입자 스타일
export const Particle = styled.div`
  width: 3px;
  height: 3px;
  position: absolute;
  background: green;
  border-radius: 50%;
  box-shadow: ${generateBoxShadowInitial()};
  animation: ${bang} 1s ease-out infinite backwards,
    ${gravity} 1s ease-in infinite backwards,
    ${position} 5s linear infinite backwards;
`;

// ✅ 두 번째 폭죽 효과 (살짝 딜레이)
export const ParticleAfter = styled(Particle)`
  animation-delay: 1.25s, 1.25s, 1.25s;
  animation-duration: 1.25s, 1.25s, 6.25s;
`;
