import { Lesson } from "src/interface";

/**
 * This file is used for init each page html
 *
 * init document title / header title and lesson list
 *
 * Each page html has his own associated .ts file so .ts file imported in the file
 * must import thi file and call "initPage" function
 */

const addTitlePage = (title: string) => {
  if (!document) return;

  document.title = title;
};

const addTitleHeader = (title: string) => {
  const titlePage = document.getElementById("title-page") as HTMLTitleElement;

  titlePage.textContent = title;
};

const addLessonLink = (link: string) => {
  const lessonLink = document.getElementById("lesson-link") as HTMLLinkElement;
  lessonLink.href = link;
  lessonLink.title = link;
};

const templateItemList = ({ title, link, done }: Lesson) => `
          <a href="${link}">
                ${title}
            <span class="text-green-500 ${done ? "" : "hidden"}">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="ml-auto h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    /></svg>
            </span>
          </a>
`;

const addLessonList = (lessonsList: Array<Lesson>) => {
  const listContainer = document.getElementById("list-items") as HTMLDivElement;

  lessonsList.map((lesson) => {
    const listElement = document.createElement("li");
    listElement.innerHTML = templateItemList(lesson);
    listContainer.appendChild(listElement);
  });
};

interface InitPageParams {
  titlePage: string;
  titleHeader: string;
  originalLesson: string;
  lessonsList: Array<Lesson>;
}

export const initPage = ({
  titlePage,
  titleHeader,
  lessonsList,
  originalLesson,
}: InitPageParams) => {
  addTitlePage(titlePage);
  addTitleHeader(titleHeader);
  addLessonLink(originalLesson);
  addLessonList(lessonsList);
};
