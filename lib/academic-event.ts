/** 학술·연구 버튼 → 공지사항 섹션으로 이동 + 해당 학술활동 모달 열기 */
export const ACADEMIC_EVENT = 'open-academic';

export function openAcademic(id: string) {
    window.dispatchEvent(new CustomEvent<string>(ACADEMIC_EVENT, { detail: id }));
}
