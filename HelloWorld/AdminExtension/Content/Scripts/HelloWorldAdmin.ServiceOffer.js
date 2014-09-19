﻿/*globals window,parent,jQuery,document,setTimeout*/
/// <dictionary>jslint,iframe, Addon, </dictionary>
/// <disable>JS2076.IdentifierIsMiscased</disable>  // for 'Editions'
(function ($, global, undefined) {
  "use strict";

  var selectedEditionRow, cachedServiceOffer, currentPlanEntity;

  //function showAddAddonWizard() {
  //	debugger
  //	var commandParameter = {
  //		serviceName: resources.DialogTitle,
  //		title: resources.AddSqlServerGroupToAnAddon,
  //		subTitle: resources.LetsSpecifyQuotasForAnAddon,
  //		listGroupsUrl: "HostingSqlServer/ListGroups",
  //		additionalSizeConfigEnabled: true,
  //		noGroupsMessage: resources.NoSqlGroupExists,
  //		Editions: []
  //	};

  //	if (cachedServiceOffer && cachedServiceOffer.Editions) {
  //		commandParameter.Editions = cachedServiceOffer.Editions;
  //	}
  //	global.ServiceOffer.Internal.postCommandToHost("TODO_TEMPORARY_PreIFrameWizardPlaceholderAddAddonCommand", commandParameter);
  //}

  //function showEditAddonWizard() {
  //	debugger
  //	var commandParameter = {
  //		serviceName: resources.DialogTitle,
  //		title: resources.EditSqlAddonTitle,
  //		subTitle: resources.LetsEditGroupAddonSubTitle,
  //		editedEdition: selectedEditionRow,
  //		listGroupsUrl: "HostingSqlServer/ListGroups",
  //		additionalSizeConfigEnabled: true,
  //		groupMissingMessage: resources.SqlGroupMissing,
  //		Editions: []
  //	};

  //	if (cachedServiceOffer && cachedServiceOffer.Editions) {
  //		commandParameter.Editions = cachedServiceOffer.Editions;
  //	}

  //	global.ServiceOffer.Internal.postCommandToHost("TODO_TEMPORARY_PreIFrameWizardPlaceholderUpdateAddonCommand", commandParameter);
  //}

  //function showDeleteAddonConfirmation() {
  //	debugger
  //	var commandParameter = {
  //		deletedEdition: selectedEditionRow,
  //		promptText: resources.DoYouWantToDeleteAddon.format(selectedEditionRow.groupName)
  //	};
  //	global.ServiceOffer.Internal.postCommandToHost("TODO_TEMPORARY_PreIFrameWizardPlaceholderConfirmDbDeletionCommand", commandParameter);
  //}

  //function showAddEditionWizard() {
  //	debugger
  //	var commandParameter = {
  //		serviceName: resources.DialogTitle,
  //		title: resources.AddSqlServerGroupToAPlan,
  //		subTitle: resources.LetsSpecifyQuotasForGroup,
  //		listGroupsUrl: "HostingSqlServer/ListGroups",
  //		additionalSizeConfigEnabled: true,
  //		windowsAuthConfigEnabled: true,
  //		noGroupsMessage: resources.NoSqlGroupExists,
  //		Editions: []
  //	};

  //	if (cachedServiceOffer && cachedServiceOffer.Editions) {
  //		commandParameter.Editions = cachedServiceOffer.Editions;
  //	}
  //	global.ServiceOffer.Internal.postCommandToHost("TODO_TEMPORARY_PreIFrameWizardPlaceholderAddEditionCommand", commandParameter);
  //}

  //function showEditEditionWizard() {
  //	debugger
  //	var commandParameter = {
  //		serviceName: resources.DialogTitle,
  //		title: resources.EditSqlGroupTitle,
  //		subTitle: resources.LetsEditGroupPlanSubTitle,
  //		editedEdition: selectedEditionRow,
  //		listGroupsUrl: "HostingSqlServer/ListGroups",
  //		additionalSizeConfigEnabled: true,
  //		windowsAuthConfigEnabled: true,
  //		groupMissingMessage: resources.SqlGroupMissing,
  //		Editions: []
  //	};

  //	if (cachedServiceOffer && cachedServiceOffer.Editions) {
  //		commandParameter.Editions = cachedServiceOffer.Editions;
  //	}

  //	global.ServiceOffer.Internal.postCommandToHost("TODO_TEMPORARY_PreIFrameWizardPlaceholderUpdateEditionCommand", commandParameter);
  //}

  //function showDeleteEditionConfirmation() {
  //	debugger
  //	var commandParameter = {
  //		deletedEdition: selectedEditionRow,
  //		promptText: resources.DoYouWantToDeleteEdition.format(selectedEditionRow.displayName)
  //	};
  //	global.ServiceOffer.Internal.postCommandToHost("TODO_TEMPORARY_PreIFrameWizardPlaceholderConfirmDbDeletionCommand", commandParameter);
  //}

  function updateEmptyListPlaceholderVisibility() {
    if (!cachedServiceOffer || cachedServiceOffer.Editions.length === 0) {
      $(".gridContainer").hide();
      $(".hs-empty").show();
    } else {
      $(".gridContainer").show();
      $(".hs-empty").hide();
    }

    $(".newDatabaseEdition").off("click").on("click", function (event) {
      event.preventDefault();
      if (currentPlanEntity === global.ServiceOffer.planEntityEnum.addon) {
        showAddAddonWizard();
      } else {
        showAddEditionWizard();
      }
      return false;
    });
  }

  //function getAddonCommands() {
  //	return [
  //        {
  //        	id: "sqlAdmin.addAddon",
  //        	displayName: resources.AddGroupCommandName,
  //        	isEnabled: true,
  //        	iconWellKnownName: "create"
  //        },
  //        {
  //        	id: "sqlAdmin.editAddon",
  //        	displayName: resources.EditGroupCommandName,
  //        	isEnabled: !!selectedEditionRow, // only enable when an edition is selected
  //        	iconWellKnownName: "edit"
  //        },
  //        {
  //        	id: "sqlAdmin.deleteAddon",
  //        	displayName: resources.DeleteGroupCommandName,
  //        	isEnabled: !!selectedEditionRow, // only enable when an edition is selected
  //        	iconWellKnownName: "delete"
  //        }
  //	];
  //}

  //function getPlanCommands() {
  //	return [
  //        {
  //        	id: "sqlAdmin.addEdition",
  //        	displayName: resources.AddGroupCommandName,
  //        	isEnabled: true,
  //        	iconWellKnownName: "create"
  //        },
  //        {
  //        	id: "sqlAdmin.editEdition",
  //        	displayName: resources.EditGroupCommandName,
  //        	isEnabled: !!selectedEditionRow, // only enable when an edition is selected
  //        	iconWellKnownName: "edit"
  //        },
  //        {
  //        	id: "sqlAdmin.deleteEdition",
  //        	displayName: resources.DeleteGroupCommandName,
  //        	isEnabled: !!selectedEditionRow, // only enable when an edition is selected
  //        	iconWellKnownName: "delete"
  //        }
  //	];
  //}

  function updateContextualCommands() {
    if (currentPlanEntity === global.ServiceOffer.planEntityEnum.addon) {
      global.ServiceOffer.setCommands(getAddonCommands());
    } else {
      global.ServiceOffer.setCommands(getPlanCommands());
    }
  }

  //function updateServiceOffer(value) {
  //	var nameValueServiceOffer = {};
  //	if (value) {
  //		nameValueServiceOffer.Editions = JSON.stringify(value.Editions);
  //		global.ServiceOffer.updateServiceOffer(nameValueServiceOffer);
  //	} else {
  //		global.ServiceOffer.updateServiceOffer(null);
  //	}
  //}

  //function executeCommand(commandId, commandParameter) {
  //	debugger
  //	var i;
  //	switch (commandId) {
  //		case "sqlAdmin.addAddon":
  //			showAddAddonWizard();
  //			break;

  //		case "sqlAdmin.editAddon":
  //			showEditAddonWizard();
  //			break;

  //		case "sqlAdmin.deleteAddon":
  //			showDeleteAddonConfirmation();
  //			break;

  //		case "sqlAdmin.addEdition":
  //			showAddEditionWizard();
  //			break;

  //		case "sqlAdmin.editEdition":
  //			showEditEditionWizard();
  //			break;

  //		case "sqlAdmin.deleteEdition":
  //			showDeleteEditionConfirmation();
  //			break;

  //		case "TODO_TEMPORARY_COMMAND_dbAddonEditionAdded":
  //		case "TODO_TEMPORARY_COMMAND_dbEditionAdded":
  //			$.observable(cachedServiceOffer.Editions).insert(cachedServiceOffer.Editions.length, commandParameter);
  //			updateEmptyListPlaceholderVisibility();
  //			updateServiceOffer(cachedServiceOffer);
  //			break;

  //		case "TODO_TEMPORARY_COMMAND_dbAddonEditionUpdated":
  //		case "TODO_TEMPORARY_COMMAND_dbEditionUpdated":
  //			if (commandParameter) {
  //				$.observable(selectedEditionRow).setProperty(commandParameter);
  //				updateServiceOffer(cachedServiceOffer);
  //			}
  //			break;

  //		case "TODO_TEMPORARY_COMMAND_dbEditionDeleted":
  //			for (i = cachedServiceOffer.Editions.length - 1; i >= 0; i--) {
  //				if (cachedServiceOffer.Editions[i] === selectedEditionRow) {
  //					$.observable(cachedServiceOffer.Editions).remove(i, 1);
  //					selectedEditionRow = null;
  //					break;
  //				}
  //			}

  //			updateEmptyListPlaceholderVisibility();
  //			updateContextualCommands();
  //			updateServiceOffer(cachedServiceOffer);
  //	}
  //}

  //function onRowSelected(row) {
  //	selectedEditionRow = row;
  //	updateContextualCommands();
  //}

  // public: Called after "Save" command for plan is invoked, but before it is sent to a resource provider. Do final validation here and throw an exception if there is an error</summary>
  //function onOfferSaving() {
  //	if (!cachedServiceOffer || !cachedServiceOffer.Editions || cachedServiceOffer.Editions.length === 0) {
  //		throw resources.InvalidQuotasNoGroup;
  //	}
  //}

  // private: Receives config from host and updates the UI
  function initializeServiceOffer(serviceOffer, planEntityType) {
    var planEditionsColumns;

    currentPlanEntity = planEntityType;
    /*if (planEntityType === global.ServiceOffer.planEntityEnum.addon) {
        $(".sqlAdminQuotas #msg-nothing").text(resources.ToSetAddonQuotas);
        $(".sqlAdminQuotas .newDatabaseEdition").text(resources.AddFirstSQLServerGroupToTheAddon);
    } else {
        $(".sqlAdminQuotas #msg-nothing").text(resources.ToSetQuotas);
        $(".sqlAdminQuotas .newDatabaseEdition").text(resources.AddFirstSQLServerGroupToThePlan);
    }*/

    // always start from scratch and only take in what is expected. Drop any leftovers that may come from an earlier versions.
    cachedServiceOffer = { Editions: [] };

    if (serviceOffer.Editions) {
      cachedServiceOffer.Editions = JSON.parse(serviceOffer.Editions);
    }

    selectedEditionRow = null;

    if (serviceOffer) {
      planEditionsColumns = [
          { name: "Display name", field: "displayName", type: "text" },
          { name: "Instance count", field: "instanceCount", type: "text" },
          { name: "Size", field: "size", type: "text" }
      ];
      /*
                  if (planEntityType === global.ServiceOffer.planEntityEnum.plan) {
                      // Max size can only specified on the base-plan
                      planEditionsColumns.push({ name: resources.MaxSizeMbColumnName, field: "resourceSizeLimit", type: "text" });
                  }*/

      updateEmptyListPlaceholderVisibility();
      $(".sqlAdminQuotas > .gridContainer").wazDataGrid("destroy")
          .wazDataGrid({
            columns: planEditionsColumns,
            data: cachedServiceOffer.Editions,
            ////rowMetadata: rowMetadata,
            selectable: true,
            /*rowSelect: function (e, rows) {
                onRowSelected(rows.selected ? rows.selected.dataItem : null);
            }*/
          });

      // BUG: 475711 TEMPORARY WORKAROUND. Use timer until timing of initialRefreshCompleted is fixed
      setTimeout(function () {
        global.ServiceOffer.refreshHeight();
      }, 100);
      //// BUG: 410629 Consolidate repetative code from serveral extensions and remove it from here
      //gridDataSource = $(".sqlAdminQuotas > .gridContainer").wazDataGrid("option", "dataSource");
      //if (gridDataSource.isReset) {
      //    // The grid's data source has not yet refreshed.  Listen for the first refresh completion.
      //    initialRefreshCompleted = function() {
      //        $(gridDataSource).off("refreshSuccess refreshError", initialRefreshCompleted);
      //         global.ServiceOffer.refreshHeight();
      //        global.setTimeout(function() {
      //            global.ServiceOffer.refreshHeight();
      //        }, 100);
      //    };
      //    $(gridDataSource).on("refreshSuccess refreshError", initialRefreshCompleted);
      //} else {
      //    // The grid's data source refreshed in the course of grid construction.
      //    global.ServiceOffer.refreshHeight();
      //}
    }
    //updateContextualCommands(); // called during revert-changes
  }

  function initializePage() {
    if (!global.ServiceOffer) {
      return;
    }

    global.ServiceOffer.registerExtension({
      initializeServiceOffer: initializeServiceOffer,
      //onOfferSaving: onOfferSaving,
      //executeCommand: executeCommand
    });
  }

  $(document).ready(initializePage);

})(jQuery, this);      // Ignore jslint
