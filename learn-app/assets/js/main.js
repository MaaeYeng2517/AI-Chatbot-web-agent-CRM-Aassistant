// Section Navigation
function showSection(id) {
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => sec.classList.remove('active'));
  const s = document.getElementById(id);
  if(s) s.classList.add('active');
  window.scrollTo({ top:0, behavior:'smooth' });
}

// Tabs (Student)
const tabButtons = document.querySelectorAll('.tab-btn');
const tabs = document.querySelectorAll('#tab-content .tab');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('text-blue-600','border-b-2','border-blue-600'));
    tabButtons.forEach(b => b.classList.add('text-gray-600'));
    btn.classList.add('text-blue-600','border-b-2','border-blue-600');
    btn.classList.remove('text-gray-600');

    const tabName = btn.dataset.tab;
    tabs.forEach(t => t.classList.add('hidden'));
    tabs.forEach(t => t.classList.remove('active-tab'));
    document.querySelector(`#tab-content .tab:nth-child(${["courses","progress","notifications"].indexOf(tabName)+1})`).classList.remove('hidden');
    document.querySelector(`#tab-content .tab:nth-child(${["courses","progress","notifications"].indexOf(tabName)+1})`).classList.add('active-tab');
  });
});

// Tabs (Instructor)
const instructorTabButtons = document.querySelectorAll('.instructor-tab-btn');
const instructorTabs = document.querySelectorAll('#instructor-tab-content .instructor-tab');
instructorTabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    instructorTabButtons.forEach(b => b.classList.remove('text-blue-600','border-b-2','border-blue-600'));
    instructorTabButtons.forEach(b => b.classList.add('text-gray-600'));
    btn.classList.add('text-blue-600','border-b-2','border-blue-600');
    btn.classList.remove('text-gray-600');

    const tabName = btn.dataset.tab;
    instructorTabs.forEach(t => t.classList.add('hidden'));
    instructorTabs.forEach(t => t.classList.remove('active-tab'));
    document.querySelector(`#instructor-tab-content .instructor-tab:nth-child(${["courses","earnings","analytics"].indexOf(tabName)+1})`).classList.remove('hidden');
    document.querySelector(`#instructor-tab-content .instructor-tab:nth-child(${["courses","earnings","analytics"].indexOf(tabName)+1})`).classList.add('active-tab');
  });
});

// Interactive Lessons
const lessons = document.querySelectorAll('.lesson');
const courseContent = document.getElementById('course-content');
const lessonFooter = document.getElementById('lesson-footer');
const lessonSubtitle = document.getElementById('lesson-subtitle');
const lessonDetails = document.getElementById('lesson-details');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
if(lessons.length>0){
  lessons.forEach(lesson => {
    lesson.addEventListener('click', () => {
      const title = lesson.dataset.title;
      const content = lesson.dataset.content;
      const progress = lesson.dataset.progress;
      if(courseContent) courseContent.textContent = `Playing: ${title}`;
      if(lessonFooter) lessonFooter.style.display='block';
      if(lessonSubtitle) lessonSubtitle.textContent=title;
      if(lessonDetails) lessonDetails.textContent=content;
      if(progressBar) progressBar.style.width = progress+'%';
      if(progressText) progressText.textContent = progress+'% Completed';
      lessons.forEach(l => l.classList.remove('active-lesson'));
      lesson.classList.add('active-lesson');
    });
  });
}

// Quiz
const quizOptions = document.querySelectorAll('.quiz-option');
if(quizOptions.length>0){
  quizOptions.forEach(option => {
    option.addEventListener('click', () => {
      quizOptions.forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
    });
  });
}
function submitQuiz() {
  const selected = document.querySelector('.quiz-option.selected');
  if(selected){
    alert(`You selected: ${selected.textContent}\nScore: 100% (Demo)`);
  }else{
    alert('Please select an option.');
  }
}
