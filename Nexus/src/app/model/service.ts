export interface Service {
  // 이름
  name: string;

  // 명세 파일
  description: File;

  // 산출물 위치
  artifactLink: string;

  // 산출물
  artifact: File;

  // 전제 조건(서비스가 실행되기 전 응답 확인)
  prerequisite: string;
}
