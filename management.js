function groupInputs(groupName, groupDescription,groupMembers) {
    this.groupName = groupName;
    this.groupDescription = groupDescription;
    this.groupMembers=groupMembers
  }
  
  class GroupDisplay {
    constructor() {}
  
    add(arrayInputs) {
      let tableBody = document.getElementById("table-body");
      let htmlToBeAdded = "";
      for (let i = 0; i < arrayInputs.length; i++) {
        htmlToBeAdded += `
          <tr>
            <td>${i + 1}</td>
            <td>${arrayInputs[i].groupName}</td>
            <td>${arrayInputs[i].groupDescription}</td>
            <td>${arrayInputs[i].groupMembers}</td>
            <td> <button type="button" onclick="deleteGroup(${i})" class="dlt-btn btn-primary btn" id="dlt-btn"> Delete </button> </td>
          </tr>
        `;
      }
      tableBody.innerHTML = htmlToBeAdded;
    }
  
    clear() {
      let groupForm = document.getElementById("groupform");
      groupForm.reset();
    }
  
    validate(inputs) {
      if (inputs.groupName == "" || inputs.groupDescription == "" || inputs.groupMembers =="") {
        return false;
      } else return true;
    }
  
    alertUser(type, sub, message) {
      let alertUser = document.getElementById("alertuser");
      let htmlToBeAddedInAlert = `
        <div class="alert alert-${type} alert-dismissible fade show" id="alert" role="alert">
          <strong>${sub}</strong> ${message}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>`;
      alertUser.innerHTML += htmlToBeAddedInAlert;
      setTimeout(() => {
        alertUser.innerHTML = "";
      }, 4000);
    }
  }
  
  // Show Group List even after reload
  function showGroupList() {
    let groupItems = localStorage.getItem("groupItems");
    if (groupItems == null) {
      groupArray = [];
    } else {
      groupArray = JSON.parse(groupItems);
    }
    new GroupDisplay().add(groupArray);
  }
  
  
  showGroupList();
  
  // Deleting Group Item
  function deleteGroup(index) {
    let groupItems = localStorage.getItem("groupItems");
    if (groupItems == null) {
      groupArray = [];
    } else {
      groupArray = JSON.parse(groupItems);
    }
    groupArray.splice(index, 1);
    localStorage.setItem("groupItems", JSON.stringify(groupArray));
    showGroupList();
  }
  document.addEventListener("DOMContentLoaded", function () {
    const groupForm = document.getElementById("groupform");
    const alertUser = document.getElementById("alertuser");

    groupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Check the number of members before submitting the form
      const memberCount = getMemberCount(); // Implement this function to get the member count
      if (memberCount >= 5 && memberCount <= 6) {
        // Proceed with form submission
        alertUser.innerHTML = ""; // Clear any previous alerts
        groupForm.submit();
      } else {
        // Display an alert to the user
        alertUser.innerHTML =
          '<div class="alert alert-danger" role="alert">Group must have 5 to 6 members.</div>';
      }
    });

    // Implement this function to get the member count from your form
    function getMemberCount() {
      // Add logic to count the number of members in your form
      // For example, you can count the number of input fields or use another method.
      // Return the count.
    }
  });
  
  // Add submit function to the form
  const groupForm = document.getElementById("groupform");
  groupForm.addEventListener("submit", groupFormSubmit);
  
  function groupFormSubmit(e) {
    e.preventDefault();
    let givenGroupName = document.getElementById("GroupName").value;
    let givenGroupDescription = document.getElementById("GroupDescription").value;
    let givenGroupMembers=document.getElementById("GroupMembers").value;
  
    let groupObject = new groupInputs(givenGroupName, givenGroupDescription,givenGroupMembers);
  
    let groupDisplayObj = new GroupDisplay();
    if (groupDisplayObj.validate(groupObject)) {
      let groupItems = localStorage.getItem("groupItems");
      if (groupItems == null) {
        groupArray = [];
      } else {
        groupArray = JSON.parse(groupItems);
      }
      groupArray.push(groupObject);
      localStorage.setItem("groupItems", JSON.stringify(groupArray));
  
      new GroupDisplay().add(groupArray);
      groupDisplayObj.clear();
      groupDisplayObj.alertUser("success", "Success", "Group created successfully");
    } else {
      groupDisplayObj.alertUser("danger", "Oops!", "Please fill out all fields");
    }
  }
  