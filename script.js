const sections = document.querySelectorAll('.section');
// const saveButton = document.querySelector('.save-button');
// let draggedSection = null;
// let changesMade = false;

// sections.forEach(section => {
//   section.addEventListener('dragstart', () => {
//     section.classList.add('dragging');
//     draggedSection = section;
//   });

//   section.addEventListener('dragover', e => {
//     e.preventDefault();
//     const afterElement = getDragAfterElement(section, e.clientY);
//     const sectionList = section.parentNode;
//     if (afterElement == null) {
//       sectionList.appendChild(draggedSection);
//     } else {
//       sectionList.insertBefore(draggedSection, afterElement);
//     }
//     changesMade = true;
//   });

//   section.addEventListener('dragend', () => {
//     section.classList.remove('dragging');
//     draggedSection = null;
//     if (changesMade) {
//       saveButton.disabled = false;
//     }
//   });

//   section.addEventListener('input', () => {
//     changesMade = true;
//     saveButton.disabled = false;
//   });
// });

// function getDragAfterElement(container, y) {
//   const sectionElements = [...container.parentElement.querySelectorAll('.section:not(.dragging)')];

//   return sectionElements.reduce((closest, section) => {
//     const box = section.getBoundingClientRect();
//     const offset = y - box.top - box.height / 2;
//     if (offset < 0 && offset > closest.offset) {
//       return { offset, element: section };
//     } else {
//       return closest;
//     }
//   }, { offset: Number.NEGATIVE_INFINITY }).element;
// }
let draggedSection;
let changesMade = false;
const saveButton = document.querySelector('.save-button');// Replace 'save-button' with the actual ID of your save button

// Add touch event listeners for drag and drop functionality
// Add touch event listeners for drag and drop functionality
sections.forEach(section => {
  section.addEventListener('dragstart', () => {
    section.classList.add('dragging');
    draggedSection = section;
  });

  section.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(section, e.clientY);
    const sectionList = section.parentNode;
    if (afterElement == null) {
      sectionList.appendChild(draggedSection);
    } else {
      sectionList.insertBefore(draggedSection, afterElement);
    }
    changesMade = true;
    saveButton.disabled = false;
  });

  section.addEventListener('dragend', () => {
    section.classList.remove('dragging');
    draggedSection = null;
    if (changesMade) {
      saveButton.disabled = false;
    }
  });

  section.addEventListener('input', () => {
    changesMade = true;
    saveButton.disabled = false;
  });

  // Touch events for mobile/touch devices
  section.addEventListener('touchstart', (event) => {
    event.preventDefault();
    section.classList.add('dragging');
    draggedSection = section;
  });

  section.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    const afterElement = getDragAfterElement(section, touch.clientY);
    const sectionList = section.parentNode;
    if (afterElement == null) {
      sectionList.appendChild(draggedSection);
    } else {
      sectionList.insertBefore(draggedSection, afterElement);
    }
    changesMade = true;
    saveButton.disabled = false;
  });

  section.addEventListener('touchend', () => {
    section.classList.remove('dragging');
    draggedSection = null;
    if (changesMade) {
      saveButton.disabled = false;
    }
  });
});

function getDragAfterElement(container, y) {
  const sectionElements = [...container.parentElement.querySelectorAll('.section:not(.dragging)')];

  return sectionElements.reduce((closest, section) => {
    const box = section.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: section };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}


////

const infoButtons = document.querySelectorAll('.info-button');

infoButtons.forEach(infoButton => {
  infoButton.addEventListener('click', () => {
    const section = infoButton.closest('.section');
    const sectionName = section.querySelector('.section-name');
    const description = getSectionDescription(sectionName.textContent);
    alert(description);
  });
});

function getSectionDescription(sectionName) {
  let description = '';

  // Customize the description based on the section name
  switch (sectionName) {
    case 'Profile Summary':
      description = 'This section gives a summary about your overall work-profile.';
      break;
    case 'Academic and Cocurricular Achievements':
      description = 'This section showcases your achievements in past academics and cocurricular activities.';
      break;
    case 'Summer Internship Experience':
      description = 'This section highlights all of your summer internship experiences.';
      break;
      case 'Work Experience':
      description = 'This section highlights all of your full time opportunities.';
      break;
      case 'Projects':
      description = 'This section lists down all of the projects you have completed till date.';
      break;
      case 'Certifications':
      description = 'This section mentions all of the certifications you have received to validate your skills.';
      break;
      case 'Leadership Positions':
        description = 'This section highlights your experience of different leadership positions you have been in the past.';
        break;
        case 'Extracurricular':
          description = 'This section highlights your participation in different extracurricular activities in the past.';
          break;
          case 'Education':
            description = 'This section highlights and mentions all of your educational history.';
            break;
          
    // Add more cases for other section names
    default:
      description = 'No description available.';
      break;
  }

  return description;
}



const toggleSwitches = document.querySelectorAll('.toggle-button input[type="checkbox"]');

toggleSwitches.forEach(toggleSwitch => {
  const section = toggleSwitch.closest('.section');

  toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
      enableSection(section);
    } else {
      disableSection(section);
    }
    checkSaveButtonStatus();
  });

  function enableSection(section) {
    section.classList.remove('disabled');
    section.classList.add('enabled');
    // Additional logic if needed when enabling the section
  }

  function disableSection(section) {
    section.classList.remove('enabled');
    section.classList.add('disabled');
    // Additional logic if needed when disabling the section
  }
});

function checkSaveButtonStatus() {
  const saveButton = document.querySelector('.save-button');
  const enabledSections = document.querySelectorAll('.section.enabled');

  if (enabledSections.length > 0) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
}




///edit functionality
// function editSectionName(button) {
//   var sectionNameElement = button.parentNode.querySelector('.section-name');
//   var saveButton = button.parentNode.querySelector('.save-edit-button');

//   // Hide the edit button and show the save button
//   button.style.display = 'none';
//   saveButton.style.display = 'inline';

//   // Convert the section name into a text input for editing
//   var sectionNameInput = document.createElement('input');
//   sectionNameInput.type = 'text';
//   sectionNameInput.value = sectionNameElement.textContent;
//   sectionNameInput.addEventListener('keydown', function(event) {
//     if (event.keyCode === 13) { // Enter key
//       event.preventDefault();
//       saveSectionName(button);
//     }
//   });
//   sectionNameElement.textContent = '';
//   sectionNameElement.appendChild(sectionNameInput);
//   sectionNameInput.focus();
// }

// function saveSectionName(button) {
//   var sectionNameElement = button.parentNode.querySelector('.section-name');
//   var saveButton = button.parentNode.querySelector('.save-edit-button');

//   // Show the edit button and hide the save button
//   button.style.display = 'inline';
//   saveButton.style.display = 'none';

//   // Get the updated section name from the input field
//   var sectionNameInput = sectionNameElement.querySelector('input');
//   var updatedSectionName = sectionNameInput.value;

//   // Update the section name
//   sectionNameElement.textContent = updatedSectionName;
// }


// function editSectionName(button) {
//   var sectionNameElement = button.parentNode.querySelector('.section-name');
//   var saveButton = button.parentNode.querySelector('.save-edit-button');

//   // Hide the edit button and show the save button
//   button.style.display = 'none';
//   saveButton.style.display = 'inline';

//   // Convert the section name into a text input for editing
//   var sectionNameInput = document.createElement('input');
//   sectionNameInput.type = 'text';
//   sectionNameInput.value = sectionNameElement.textContent;
//   sectionNameInput.addEventListener('keydown', function(event) {
//     if (event.keyCode === 13) { // Enter key
//       event.preventDefault();
//       saveSectionName(button);
//     }
//   });
//   sectionNameElement.textContent = '';
//   sectionNameElement.appendChild(sectionNameInput);
//   sectionNameInput.focus();
// }

// function saveSectionName(button) {
//   var sectionNameElement = button.parentNode.querySelector('.section-name');
//   var editButton = button.parentNode.querySelector('.edit-button');

//   // Show the edit button and hide the save button
//   editButton.style.display = 'inline';
//   button.style.display = 'none';

//   // Get the updated section name from the input field
//   var sectionNameInput = sectionNameElement.querySelector('input');
//   var updatedSectionName = sectionNameInput.value;

//   // Update the section name
//   sectionNameElement.textContent = updatedSectionName;

//   // Clean up the input field
//   sectionNameInput.remove();
// }

function editSectionName(button) {
  var sectionContainer = button.parentNode;
  var sectionNameElement = sectionContainer.querySelector('.section-name');
  var saveButton = sectionContainer.querySelector('.save-edit-button');

  // Hide the edit button and show the save button
  button.style.display = 'none';
  saveButton.style.display = 'inline';

  // Convert the section name into a text input for editing
  var sectionNameInput = document.createElement('input');
  sectionNameInput.type = 'text';
  sectionNameInput.value = sectionNameElement.textContent;
  sectionNameInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) { // Enter key
      event.preventDefault();
      saveSectionName(button);
    }
  });
  sectionNameElement.textContent = '';
  sectionNameElement.appendChild(sectionNameInput);
  sectionNameInput.focus();
}

function saveSectionName(button) {
  var sectionContainer = button.parentNode;
  var sectionNameElement = sectionContainer.querySelector('.section-name');
  var editButton = sectionContainer.querySelector('.edit-button');

  // Show the edit button and hide the save button
  editButton.style.display = 'inline';
  button.style.display = 'none';

  // Get the updated section name from the input field
  var sectionNameInput = sectionNameElement.querySelector('input');
  var updatedSectionName = sectionNameInput.value;

  // Update the section name
  sectionNameElement.textContent = updatedSectionName;

  // Clean up the input field
  sectionNameInput.remove();
}


//-------------------------------------------------

//changes saved functionality
function saveChanges() {
  // Perform your save logic here

  // Disable the save button
  var saveButton = document.querySelector('.save-button');
  saveButton.disabled = true;

  // Show a prompt with the message "Changes saved"
  window.alert('Changes saved!!');
}

