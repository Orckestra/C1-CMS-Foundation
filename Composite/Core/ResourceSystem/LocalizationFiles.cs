
 
 
 
 

 
 
 
 
 
 


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.Core.ResourceSystem
{
	/// <summary>    
	/// Class generated from localization files  
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	internal static class LocalizationFiles
	{
		
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_C1Console_SecurityViolation {
 /// <summary>Security violation</summary> 
 public static string LayoutLabel { get { return T("LayoutLabel"); } } 
 /// <summary>Not allowed</summary> 
 public static string Title { get { return T("Title"); } } 
 /// <summary>You do not have permission to execute the action. Contact your administrator for more information.</summary> 
 public static string Description { get { return T("Description"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.C1Console.SecurityViolation", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_C1Console_Trees {
 /// <summary>Error in tree</summary> 
 public static string KeyFacade_ErrorTreeNode_Label { get { return T("KeyFacade.ErrorTreeNode.Label"); } } 
 /// <summary>Show Message</summary> 
 public static string KeyFacade_ErrorTreeNode_ShowMessage_Label { get { return T("KeyFacade.ErrorTreeNode.ShowMessage.Label"); } } 
 /// <summary>Show Error Message</summary> 
 public static string KeyFacade_ErrorTreeNode_ShowMessage_ToolTip { get { return T("KeyFacade.ErrorTreeNode.ShowMessage.ToolTip"); } } 
 /// <summary>Error message</summary> 
 public static string KeyFacade_ErrorTreeNode_ShowMessage_Title { get { return T("KeyFacade.ErrorTreeNode.ShowMessage.Title"); } } 
 /// <summary>Unknown exception happened: &apos;{0}&apos;</summary> 
 public static string TreeValidationError_Common_UnknownException(string parameter0) { return string.Format(T("TreeValidationError.Common.UnknownException"), parameter0); } 
 /// <summary>Unknown element &apos;{0}&apos;</summary> 
 public static string TreeValidationError_Common_UnknownElement(string parameter0) { return string.Format(T("TreeValidationError.Common.UnknownElement"), parameter0); } 
 /// <summary>The required attribute &apos;{0}&apos; is missing</summary> 
 public static string TreeValidationError_Common_MissingAttribute(string parameter0) { return string.Format(T("TreeValidationError.Common.MissingAttribute"), parameter0); } 
 /// <summary>The attribute &apos;{0}&apos; has a value that is not allowed</summary> 
 public static string TreeValidationError_Common_WrongAttributeValue(string parameter0) { return string.Format(T("TreeValidationError.Common.WrongAttributeValue"), parameter0); } 
 /// <summary>The type &apos;{0}&apos; does not contain a property named &apos;{1}&apos;</summary> 
 public static string TreeValidationError_Common_MissingProperty(string parameter0,string parameter1) { return string.Format(T("TreeValidationError.Common.MissingProperty"), parameter0,parameter1); } 
 /// <summary>The type &apos;{0}&apos; could not be found</summary> 
 public static string TreeValidationError_Common_UnkownInterfaceType(string parameter0) { return string.Format(T("TreeValidationError.Common.UnkownInterfaceType"), parameter0); } 
 /// <summary>The type &apos;{0}&apos; does not implement the interface &apos;{1}&apos;</summary> 
 public static string TreeValidationError_Common_NotImplementingIData(string parameter0,string parameter1) { return string.Format(T("TreeValidationError.Common.NotImplementingIData"), parameter0,parameter1); } 
 /// <summary>The value &apos;{0} is not allowed as a permission type value</summary> 
 public static string TreeValidationError_Common_WrongPermissinValue(string parameter0) { return string.Format(T("TreeValidationError.Common.WrongPermissinValue"), parameter0); } 
 /// <summary>The value &apos;{0} is not allowed as a location value</summary> 
 public static string TreeValidationError_Common_WrongLocationValue(string parameter0) { return string.Format(T("TreeValidationError.Common.WrongLocationValue"), parameter0); } 
 /// <summary>No function markup provided as a child element</summary> 
 public static string TreeValidationError_Common_MissingFunctionMarkup { get { return T("TreeValidationError.Common.MissingFunctionMarkup"); } } 
 /// <summary>The function could not be created for the provided function markup</summary> 
 public static string TreeValidationError_Common_WrongFunctionMarkup { get { return T("TreeValidationError.Common.WrongFunctionMarkup"); } } 
 /// <summary>Missing root element in tree markup</summary> 
 public static string TreeValidationError_Markup_NoRootElement { get { return T("TreeValidationError.Markup.NoRootElement"); } } 
 /// <summary>Syntax error: {0} at line {1} position {2}</summary> 
 public static string TreeValidationError_Markup_SchemaError(string parameter0,string parameter1,string parameter2) { return string.Format(T("TreeValidationError.Markup.SchemaError"), parameter0,parameter1,parameter2); } 
 /// <summary>The attachment point &apos;{0}&apos; is unknown</summary> 
 public static string TreeValidationError_AutoAttachments_UnknownAttachmentPoint(string parameter0) { return string.Format(T("TreeValidationError.AutoAttachments.UnknownAttachmentPoint"), parameter0); } 
 /// <summary>The attachment position &apos;{0}&apos; is unknown</summary> 
 public static string TreeValidationError_AutoAttachments_UnknownAttachmentPosition(string parameter0) { return string.Format(T("TreeValidationError.AutoAttachments.UnknownAttachmentPosition"), parameter0); } 
 /// <summary>No elements are allowed in trees that are used with data attached trees</summary> 
 public static string TreeValidationError_DataAttachments_NoElementsAllowed { get { return T("TreeValidationError.DataAttachments.NoElementsAllowed"); } } 
 /// <summary>ShareRootElementById is only allowed if the tree has a single named attachment point</summary> 
 public static string TreeValidationError_ElementRoot_ShareRootElementByIdNotAllowed { get { return T("TreeValidationError.ElementRoot.ShareRootElementByIdNotAllowed"); } } 
 /// <summary>The value of the Id is not allowed. The Id should be non-empty, not start with NodeAutoId_ and not be RootTreeNode</summary> 
 public static string TreeValidationError_SimpleElement_WrongIdValue { get { return T("TreeValidationError.SimpleElement.WrongIdValue"); } } 
 /// <summary>The id value &apos;{0}&apos; has already been used in this tree</summary> 
 public static string TreeValidationError_SimpleElement_AlreadyUsedId(string parameter0) { return string.Format(T("TreeValidationError.SimpleElement.AlreadyUsedId"), parameter0); } 
 /// <summary>The data interface &apos;{0}&apos; is used more than once as a child under the same parent element and this is not allowed</summary> 
 public static string TreeValidationError_DataElementsTreeNode_SameInterfaceUsedTwice(string parameter0) { return string.Format(T("TreeValidationError.DataElementsTreeNode.SameInterfaceUsedTwice"), parameter0); } 
 /// <summary>The same interface &apos;{0}&apos; is used as parent type as parent filter and this is not allowed</summary> 
 public static string TreeValidationError_DataElementsTreeNode_SameParentFilterInterfaceUsedTwice(string parameter0) { return string.Format(T("TreeValidationError.DataElementsTreeNode.SameParentFilterInterfaceUsedTwice"), parameter0); } 
 /// <summary>More than one parent filter is pointing to the interface &apos;{0}&apos;. Change the Display value to Lazy</summary> 
 public static string TreeValidationError_DataElementsTreeNode_MoreThanOnParentFilterIsPointingToMe(string parameter0) { return string.Format(T("TreeValidationError.DataElementsTreeNode.MoreThanOnParentFilterIsPointingToMe"), parameter0); } 
 /// <summary>Type attribute is missing</summary> 
 public static string TreeValidationError_DataFolderElements_MissingInterfaceType { get { return T("TreeValidationError.DataFolderElements.MissingInterfaceType"); } } 
 /// <summary>The interface type &apos;{0}&apos; does not match the parent elements interface type &apos;{1}&apos;</summary> 
 public static string TreeValidationError_DataFolderElements_WrongInterfaceType(string parameter0,string parameter1) { return string.Format(T("TreeValidationError.DataFolderElements.WrongInterfaceType"), parameter0,parameter1); } 
 /// <summary>DateFormat attribute requires that the property &apos;{0}&apos; should be of type &apos;{1}&apos; but is type &apos;{2}&apos;</summary> 
 public static string TreeValidationError_DataFolderElements_DateFormetNotAllowed(string parameter0,string parameter1,string parameter2) { return string.Format(T("TreeValidationError.DataFolderElements.DateFormetNotAllowed"), parameter0,parameter1,parameter2); } 
 /// <summary>The property &apos;{0}&apos; is of type Date and this requires the DateFormat attribute to be present</summary> 
 public static string TreeValidationError_DataFolderElements_DateFormetIsMissing(string parameter0) { return string.Format(T("TreeValidationError.DataFolderElements.DateFormetIsMissing"), parameter0); } 
 /// <summary>Ranges and first-letter-only not allowed at the same time</summary> 
 public static string TreeValidationError_DataFolderElements_RangesAndFirstLetterOnlyNotAllowed { get { return T("TreeValidationError.DataFolderElements.RangesAndFirstLetterOnlyNotAllowed"); } } 
 /// <summary>First-letter-only requires that the property &apos;{0}&apos; should be of type &apos;{1}&apos; but is type &apos;{2}&apos;</summary> 
 public static string TreeValidationError_DataFolderElements_WrongFirstLetterOnlyPropertyType(string parameter0,string parameter1,string parameter2) { return string.Format(T("TreeValidationError.DataFolderElements.WrongFirstLetterOnlyPropertyType"), parameter0,parameter1,parameter2); } 
 /// <summary>Only data child elements with the same interface type as the folder grouping (&apos;{0}&apos;) are allowed</summary> 
 public static string TreeValidationError_DataFolderElements_WrongDateChildInterfaceType(string parameter0) { return string.Format(T("TreeValidationError.DataFolderElements.WrongDateChildInterfaceType"), parameter0); } 
 /// <summary>Switching from the interface type &apos;{0}&apos; to a different interface type &apos;{1}&apos; is not allowed in the same folder grouping group</summary> 
 public static string TreeValidationError_DataFolderElements_InterfaceTypeSwitchNotAllowed(string parameter0,string parameter1) { return string.Format(T("TreeValidationError.DataFolderElements.InterfaceTypeSwitchNotAllowed"), parameter0,parameter1); } 
 /// <summary>Using the field name &apos;{0}&apos; twice in the same grouping tree is not allowed</summary> 
 public static string TreeValidationError_DataFolderElements_SameFieldUsedTwice(string parameter0) { return string.Format(T("TreeValidationError.DataFolderElements.SameFieldUsedTwice"), parameter0); } 
 /// <summary>Maximum one parent id filter node can be used on data elements used in groupings</summary> 
 public static string TreeValidationError_DataFolderElements_TooManyParentIdFilters { get { return T("TreeValidationError.DataFolderElements.TooManyParentIdFilters"); } } 
 /// <summary>The type &apos;{0}&apos; is not in the parent tree of this node or specified as an attachment points type</summary> 
 public static string TreeValidationError_ParentIdFilterNode_TypeIsNotInParentTree(string parameter0) { return string.Format(T("TreeValidationError.ParentIdFilterNode.TypeIsNotInParentTree"), parameter0); } 
 /// <summary>The operator &apos;{0}&apos; is unknown or not supported</summary> 
 public static string TreeValidationError_FieldFilter_UnknownOperatorName(string parameter0) { return string.Format(T("TreeValidationError.FieldFilter.UnknownOperatorName"), parameter0); } 
 /// <summary>The string value &apos;{0}&apos; could not be converted to the type &apos;{1}&apos;</summary> 
 public static string TreeValidationError_FieldFilter_ValueCouldNotBeConverted(string parameter0,string parameter1) { return string.Format(T("TreeValidationError.FieldFilter.ValueCouldNotBeConverted"), parameter0,parameter1); } 
 /// <summary>The operator &apos;{0}&apos; is not supported for the type &apos;{1}&apos;</summary> 
 public static string TreeValidationError_FieldFilter_OperatorNotSupportedForType(string parameter0,string parameter1) { return string.Format(T("TreeValidationError.FieldFilter.OperatorNotSupportedForType"), parameter0,parameter1); } 
 /// <summary>Function markup is missing</summary> 
 public static string TreeValidationError_FunctionFilter_MissingFunctionMarkup { get { return T("TreeValidationError.FunctionFilter.MissingFunctionMarkup"); } } 
 /// <summary>The function could not be created for the provided function markup</summary> 
 public static string TreeValidationError_FunctionFilter_WrongFunctionMarkup { get { return T("TreeValidationError.FunctionFilter.WrongFunctionMarkup"); } } 
 /// <summary>The function does not return value of the type &apos;{0}&apos;</summary> 
 public static string TreeValidationError_FunctionFilter_WrongReturnValue(string parameter0) { return string.Format(T("TreeValidationError.FunctionFilter.WrongReturnValue"), parameter0); } 
 /// <summary>The return type of the expression returned by the function is &apos;{0}&apos;, &apos;{1}&apos; was expected</summary> 
 public static string TreeValidationError_FunctionFilter_WrongFunctionReturnType(string parameter0,string parameter1) { return string.Format(T("TreeValidationError.FunctionFilter.WrongFunctionReturnType"), parameter0,parameter1); } 
 /// <summary>The parameter count of expression returned by the function is &apos;{0}&apos;, 1 was expected</summary> 
 public static string TreeValidationError_FunctionFilter_WrongFunctionParameterCount(string parameter0) { return string.Format(T("TreeValidationError.FunctionFilter.WrongFunctionParameterCount"), parameter0); } 
 /// <summary>The expressions parameter type returned by the function is &apos;{0}&apos;, &apos;{1}&apos; was expected</summary> 
 public static string TreeValidationError_FunctionFilter_WrongFunctionParameterType(string parameter0,string parameter1) { return string.Format(T("TreeValidationError.FunctionFilter.WrongFunctionParameterType"), parameter0,parameter1); } 
 /// <summary>The function does not return value of the type &apos;{0}&apos;</summary> 
 public static string TreeValidationError_ReportFunctionAction_WrongReturnValue(string parameter0) { return string.Format(T("TreeValidationError.ReportFunctionAction.WrongReturnValue"), parameter0); } 
 /// <summary>The file &apos;{0}&apos; does not exist</summary> 
 public static string TreeValidationError_GenericAddDataAction_MissingMarkupFile(string parameter0) { return string.Format(T("TreeValidationError.GenericAddDataAction.MissingMarkupFile"), parameter0); } 
 /// <summary>The custom markup path &apos;{0}&apos; is wrongly formatted. Use ~/Dir1/Dir2/File.xml</summary> 
 public static string TreeValidationError_GenericAddDataAction_BadMarkupPath(string parameter0) { return string.Format(T("TreeValidationError.GenericAddDataAction.BadMarkupPath"), parameter0); } 
 /// <summary>The edit data action only applies to elements that produce data elements</summary> 
 public static string TreeValidationError_GenericEditDataAction_OwnerIsNotDataNode { get { return T("TreeValidationError.GenericEditDataAction.OwnerIsNotDataNode"); } } 
 /// <summary>The file &apos;{0}&apos; does not exist</summary> 
 public static string TreeValidationError_GenericEditDataAction_MissingMarkupFile(string parameter0) { return string.Format(T("TreeValidationError.GenericEditDataAction.MissingMarkupFile"), parameter0); } 
 /// <summary>The custom markup path &apos;{0}&apos; is wrongly formatted. Use ~/Dir1/Dir2/File.xml</summary> 
 public static string TreeValidationError_GenericEditDataAction_BadMarkupPath(string parameter0) { return string.Format(T("TreeValidationError.GenericEditDataAction.BadMarkupPath"), parameter0); } 
 /// <summary>The delete data action only applies to elements that produce data elements</summary> 
 public static string TreeValidationError_GenericDeleteDataAction_OwnerIsNotDataNode { get { return T("TreeValidationError.GenericDeleteDataAction.OwnerIsNotDataNode"); } } 
 /// <summary>The dialog type &apos;{0}&apos; is not supported</summary> 
 public static string TreeValidationError_MessageBoxAction_UnknownDialogType(string parameter0) { return string.Format(T("TreeValidationError.MessageBoxAction.UnknownDialogType"), parameter0); } 
 /// <summary>Too many &apos;{0}&apos; elements, only one is allowed</summary> 
 public static string TreeValidationError_CustomUrlAction_TooManyPostParameterElements(string parameter0) { return string.Format(T("TreeValidationError.CustomUrlAction.TooManyPostParameterElements"), parameter0); } 
 /// <summary>The view type &apos;{0}&apos; is not supported</summary> 
 public static string TreeValidationError_CustomUrlAction_UnknownViewType(string parameter0) { return string.Format(T("TreeValidationError.CustomUrlAction.UnknownViewType"), parameter0); } 
 /// <summary>The direction value &apos;{0}&apos; is wrong, should be either &apos;ascending&apos; or &apos;descending&apos;</summary> 
 public static string TreeValidationError_FieldOrderBy_UnknownDirection(string parameter0) { return string.Format(T("TreeValidationError.FieldOrderBy.UnknownDirection"), parameter0); } 
 /// <summary>The type &apos;{0}&apos; does not contain a field named &apos;{1}&apos;</summary> 
 public static string TreeValidationError_FieldOrderBy_UnknownField(string parameter0,string parameter1) { return string.Format(T("TreeValidationError.FieldOrderBy.UnknownField"), parameter0,parameter1); } 
 /// <summary>&apos;{0}&apos; is in wrong format, use the format: {1}</summary> 
 public static string TreeValidationError_DataFieldValueHelper_WrongFormat(string parameter0,string parameter1) { return string.Format(T("TreeValidationError.DataFieldValueHelper.WrongFormat"), parameter0,parameter1); } 
 /// <summary>The interface &apos;{0}&apos; is not contained in the current element or any of its parents</summary> 
 public static string TreeValidationError_DataFieldValueHelper_InterfaceNotInParentTree(string parameter0) { return string.Format(T("TreeValidationError.DataFieldValueHelper.InterfaceNotInParentTree"), parameter0); } 
 /// <summary>The range value is wrongly formatted</summary> 
 public static string TreeValidationError_Range_WrongFormat { get { return T("TreeValidationError.Range.WrongFormat"); } } 
 /// <summary>The property &apos;{0}&apos; is of type &apos;{1}&apos; which does not support ranges</summary> 
 public static string TreeValidationError_Range_UnsupportedType(string parameter0,string parameter1) { return string.Format(T("TreeValidationError.Range.UnsupportedType"), parameter0,parameter1); } 
 /// <summary>The value first value ({0}) in a range should be lesser than second value ({1})</summary> 
 public static string TreeValidationError_Range_MinMaxError(string parameter0,string parameter1) { return string.Format(T("TreeValidationError.Range.MinMaxError"), parameter0,parameter1); } 
 /// <summary>The max value of a range should be less than the min value of the succeeding range</summary> 
 public static string TreeValidationError_Range_NextRangeError { get { return T("TreeValidationError.Range.NextRangeError"); } } 
 /// <summary>From {0} to {1}</summary> 
 public static string TreeRanges_IntRange_Closed(string parameter0,string parameter1) { return string.Format(T("TreeRanges.IntRange.Closed"), parameter0,parameter1); } 
 /// <summary>{0} or less</summary> 
 public static string TreeRanges_IntRange_MinOpenEnded(string parameter0) { return string.Format(T("TreeRanges.IntRange.MinOpenEnded"), parameter0); } 
 /// <summary>{0} or more</summary> 
 public static string TreeRanges_IntRange_MaxOpenEnded(string parameter0) { return string.Format(T("TreeRanges.IntRange.MaxOpenEnded"), parameter0); } 
 /// <summary>Other</summary> 
 public static string TreeRanges_IntRange_Other { get { return T("TreeRanges.IntRange.Other"); } } 
 /// <summary>From {0} to {1}</summary> 
 public static string TreeRanges_StringRange_Closed(string parameter0,string parameter1) { return string.Format(T("TreeRanges.StringRange.Closed"), parameter0,parameter1); } 
 /// <summary>{0} and before</summary> 
 public static string TreeRanges_StringRange_MinOpenEnded(string parameter0) { return string.Format(T("TreeRanges.StringRange.MinOpenEnded"), parameter0); } 
 /// <summary>{0} and after</summary> 
 public static string TreeRanges_StringRange_MaxOpenEnded(string parameter0) { return string.Format(T("TreeRanges.StringRange.MaxOpenEnded"), parameter0); } 
 /// <summary>Other</summary> 
 public static string TreeRanges_StringRange_Other { get { return T("TreeRanges.StringRange.Other"); } } 
 /// <summary>Add</summary> 
 public static string GenericAddDataAction_DefaultLabel { get { return T("GenericAddDataAction.DefaultLabel"); } } 
 /// <summary>Edit</summary> 
 public static string GenericEditDataAction_DefaultLabel { get { return T("GenericEditDataAction.DefaultLabel"); } } 
 /// <summary>Delete</summary> 
 public static string GenericDeleteDataAction_DefaultLabel { get { return T("GenericDeleteDataAction.DefaultLabel"); } } 
 /// <summary>Cascade delete error</summary> 
 public static string TreeGenericDelete_CascadeDeleteErrorTitle { get { return T("TreeGenericDelete.CascadeDeleteErrorTitle"); } } 
 /// <summary>The type is referenced by another type that does not allow cascade deletes. This operation is halted</summary> 
 public static string TreeGenericDelete_CascadeDeleteErrorMessage { get { return T("TreeGenericDelete.CascadeDeleteErrorMessage"); } } 
 /// <summary>Delete Data?</summary> 
 public static string TreeGenericDeleteConfirm_LabelFieldGroup { get { return T("TreeGenericDeleteConfirm.LabelFieldGroup"); } } 
 /// <summary>Delete</summary> 
 public static string TreeGenericDeleteConfirm_Text { get { return T("TreeGenericDeleteConfirm.Text"); } } 
 /// <summary>Delete data?</summary> 
 public static string TreeGenericDeleteConfirmDeletingRelatedData_LabelFieldGroup { get { return T("TreeGenericDeleteConfirmDeletingRelatedData.LabelFieldGroup"); } } 
 /// <summary>There is some referenced data that will also be deleted, do you want to continue?</summary> 
 public static string TreeGenericDeleteConfirmDeletingRelatedData_ConfirmationText { get { return T("TreeGenericDeleteConfirmDeletingRelatedData.ConfirmationText"); } } 
 /// <summary>Add</summary> 
 public static string TreeAddTreeDefinitionWorkflow_AddNew_Label { get { return T("TreeAddTreeDefinitionWorkflow.AddNew.Label"); } } 
 /// <summary>Add new tree definition</summary> 
 public static string TreeAddTreeDefinitionWorkflow_AddNew_ToolTip { get { return T("TreeAddTreeDefinitionWorkflow.AddNew.ToolTip"); } } 
 /// <summary>Add new tree definition</summary> 
 public static string TreeAddTreeDefinition_Layout_Label { get { return T("TreeAddTreeDefinition.Layout.Label"); } } 
 /// <summary>Add new tree definition</summary> 
 public static string TreeAddTreeDefinition_FieldGroup_Label { get { return T("TreeAddTreeDefinition.FieldGroup.Label"); } } 
 /// <summary>Definition name</summary> 
 public static string TreeAddTreeDefinition_NameTextBox_Label { get { return T("TreeAddTreeDefinition.NameTextBox.Label"); } } 
 /// <summary>Definition name</summary> 
 public static string TreeAddTreeDefinition_NameTextBox_Help { get { return T("TreeAddTreeDefinition.NameTextBox.Help"); } } 
 /// <summary>Template</summary> 
 public static string TreeAddTreeDefinition_TemplateSelector_Label { get { return T("TreeAddTreeDefinition.TemplateSelector.Label"); } } 
 /// <summary>Select a template to start with</summary> 
 public static string TreeAddTreeDefinition_TemplateSelector_Help { get { return T("TreeAddTreeDefinition.TemplateSelector.Help"); } } 
 /// <summary>Position</summary> 
 public static string TreeAddTreeDefinition_PositionSelector_Label { get { return T("TreeAddTreeDefinition.PositionSelector.Label"); } } 
 /// <summary>Position</summary> 
 public static string TreeAddTreeDefinition_PositionSelector_Help { get { return T("TreeAddTreeDefinition.PositionSelector.Help"); } } 
 /// <summary>Delete</summary> 
 public static string TreeDeleteTreeDefinitionWorkflow_Delete_Label { get { return T("TreeDeleteTreeDefinitionWorkflow.Delete.Label"); } } 
 /// <summary>Delete tree definition</summary> 
 public static string TreeDeleteTreeDefinitionWorkflow_Delete_ToolTip { get { return T("TreeDeleteTreeDefinitionWorkflow.Delete.ToolTip"); } } 
 /// <summary>Delete tree definition</summary> 
 public static string TreeDeleteTreeDefinition_Layout_Label { get { return T("TreeDeleteTreeDefinition.Layout.Label"); } } 
 /// <summary>Delete selected tree definition</summary> 
 public static string TreeDeleteTreeDefinition_Title { get { return T("TreeDeleteTreeDefinition.Title"); } } 
 /// <summary>Delete selected tree definition?</summary> 
 public static string TreeDeleteTreeDefinition_Description { get { return T("TreeDeleteTreeDefinition.Description"); } } 
 /// <summary>Edit</summary> 
 public static string TreeDeleteTreeDefinitionWorkflow_Edit_Label { get { return T("TreeDeleteTreeDefinitionWorkflow.Edit.Label"); } } 
 /// <summary>Edit tree definition</summary> 
 public static string TreeDeleteTreeDefinitionWorkflow_Edit_ToolTip { get { return T("TreeDeleteTreeDefinitionWorkflow.Edit.ToolTip"); } } 
 /// <summary>Add Application</summary> 
 public static string AddApplicationWorkflow_AddApplication_Label { get { return T("AddApplicationWorkflow.AddApplication.Label"); } } 
 /// <summary>Add new application</summary> 
 public static string AddApplicationWorkflow_AddApplication_ToolTip { get { return T("AddApplicationWorkflow.AddApplication.ToolTip"); } } 
 /// <summary>Add application</summary> 
 public static string AddApplication_Layout_Label { get { return T("AddApplication.Layout.Label"); } } 
 /// <summary>Select application</summary> 
 public static string AddApplication_FieldGroup_Label { get { return T("AddApplication.FieldGroup.Label"); } } 
 /// <summary>Application</summary> 
 public static string AddApplication_TreeIdSelector_Label { get { return T("AddApplication.TreeIdSelector.Label"); } } 
 /// <summary>Select the application that you wish to add</summary> 
 public static string AddApplication_TreeIdSelector_Help { get { return T("AddApplication.TreeIdSelector.Help"); } } 
 /// <summary>Position</summary> 
 public static string AddApplication_PositionSelector_Label { get { return T("AddApplication.PositionSelector.Label"); } } 
 /// <summary>The position to insert this application</summary> 
 public static string AddApplication_PositionSelector_Help { get { return T("AddApplication.PositionSelector.Help"); } } 
 /// <summary>No applications</summary> 
 public static string AddApplication_NoTrees_Title { get { return T("AddApplication.NoTrees.Title"); } } 
 /// <summary>You have added all available applications</summary> 
 public static string AddApplication_NoTrees_Message { get { return T("AddApplication.NoTrees.Message"); } } 
 /// <summary>Remove Application</summary> 
 public static string RemoveApplicationWorkflow_RemoveApplication_Label { get { return T("RemoveApplicationWorkflow.RemoveApplication.Label"); } } 
 /// <summary>Remove existing application</summary> 
 public static string RemoveApplicationWorkflow_RemoveApplication_ToolTip { get { return T("RemoveApplicationWorkflow.RemoveApplication.ToolTip"); } } 
 /// <summary>Remove application</summary> 
 public static string RemoveApplication_Layout_Label { get { return T("RemoveApplication.Layout.Label"); } } 
 /// <summary>Remove application</summary> 
 public static string RemoveApplication_FieldGroup_Label { get { return T("RemoveApplication.FieldGroup.Label"); } } 
 /// <summary>Application</summary> 
 public static string RemoveApplication_TreeIdSelector_Label { get { return T("RemoveApplication.TreeIdSelector.Label"); } } 
 /// <summary>Select the application that you wish to remove</summary> 
 public static string RemoveApplication_TreeIdSelector_Help { get { return T("RemoveApplication.TreeIdSelector.Help"); } } 
 /// <summary>No applications</summary> 
 public static string RemoveApplication_NoTrees_Title { get { return T("RemoveApplication.NoTrees.Title"); } } 
 /// <summary>You have removed all available applications</summary> 
 public static string RemoveApplication_NoTrees_Message { get { return T("RemoveApplication.NoTrees.Message"); } } 
 /// <summary>Translate data</summary> 
 public static string LocalizeDataWorkflow_LocalizeDataLabel { get { return T("LocalizeDataWorkflow.LocalizeDataLabel"); } } 
 /// <summary>Translate data</summary> 
 public static string LocalizeDataWorkflow_LocalizeDataToolTip { get { return T("LocalizeDataWorkflow.LocalizeDataToolTip"); } } 
 /// <summary>Not yet approved or published</summary> 
 public static string LocalizeDataWorkflow_DisabledData { get { return T("LocalizeDataWorkflow.DisabledData"); } } 
 /// <summary>Failed to translate data</summary> 
 public static string LocalizeData_ShowError_Layout_Label { get { return T("LocalizeData.ShowError.Layout.Label"); } } 
 /// <summary>Translation errors</summary> 
 public static string LocalizeData_ShowError_InfoTable_Caption { get { return T("LocalizeData.ShowError.InfoTable.Caption"); } } 
 /// <summary>The following fields has a reference to a data type. You should translate these data items before you can translate this data item</summary> 
 public static string LocalizeData_ShowError_Description { get { return T("LocalizeData.ShowError.Description"); } } 
 /// <summary>The field &apos;{0}&apos; is referencing data of type &apos;{1}&apos; with the label &apos;{2}&apos;</summary> 
 public static string LocalizeData_ShowError_FieldErrorFormat(string parameter0,string parameter1,string parameter2) { return string.Format(T("LocalizeData.ShowError.FieldErrorFormat"), parameter0,parameter1,parameter2); } 
 /// <summary>This data has already been translated. The translated version belongs to a different group.</summary> 
 public static string LocalizeData_ShowError_AlreadyTranslated { get { return T("LocalizeData.ShowError.AlreadyTranslated"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.C1Console.Trees", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_C1Console_Users {
 /// <summary>Change Password...</summary> 
 public static string ChangeOwnPasswordWorkflow_ElementActionLabel { get { return T("ChangeOwnPasswordWorkflow.ElementActionLabel"); } } 
 /// <summary>Change your password</summary> 
 public static string ChangeOwnPasswordWorkflow_ElementActionToolTip { get { return T("ChangeOwnPasswordWorkflow.ElementActionToolTip"); } } 
 /// <summary>Change Password</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_Label { get { return T("ChangeOwnPasswordWorkflow.Dialog.Label"); } } 
 /// <summary>Change your password</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_FieldGroup_Label { get { return T("ChangeOwnPasswordWorkflow.Dialog.FieldGroup.Label"); } } 
 /// <summary>Existing password</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_ExistingPassword_Label { get { return T("ChangeOwnPasswordWorkflow.Dialog.ExistingPassword.Label"); } } 
 /// <summary>For security reasons you must present your existing password before you can continue.</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_ExistingPassword_Help { get { return T("ChangeOwnPasswordWorkflow.Dialog.ExistingPassword.Help"); } } 
 /// <summary>New password</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_NewPassword_Label { get { return T("ChangeOwnPasswordWorkflow.Dialog.NewPassword.Label"); } } 
 /// <summary>The password specified in this field must match the confirmation below.</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_NewPassword_Help { get { return T("ChangeOwnPasswordWorkflow.Dialog.NewPassword.Help"); } } 
 /// <summary>Confirm new password</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_NewPasswordConfirmed_Label { get { return T("ChangeOwnPasswordWorkflow.Dialog.NewPasswordConfirmed.Label"); } } 
 /// <summary>The password specified in this field must match the one specified above.</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_NewPasswordConfirmed_Help { get { return T("ChangeOwnPasswordWorkflow.Dialog.NewPasswordConfirmed.Help"); } } 
 /// <summary>Regional Settings...</summary> 
 public static string ChangeOwnCultureWorkflow_ElementActionLabel { get { return T("ChangeOwnCultureWorkflow.ElementActionLabel"); } } 
 /// <summary>Set the C1 Console language and formatting of numbers, times and dates</summary> 
 public static string ChangeOwnCultureWorkflow_ElementActionToolTip { get { return T("ChangeOwnCultureWorkflow.ElementActionToolTip"); } } 
 /// <summary>Regional Settings and Language</summary> 
 public static string ChangeOwnCultureWorkflow_Dialog_Label { get { return T("ChangeOwnCultureWorkflow.Dialog.Label"); } } 
 /// <summary>Regional settings</summary> 
 public static string ChangeOwnCultureWorkflow_Dialog_CultureSelector_Label { get { return T("ChangeOwnCultureWorkflow.Dialog.CultureSelector.Label"); } } 
 /// <summary>To change the way numbers, dates, and hours are displayed, select an entry from the list.</summary> 
 public static string ChangeOwnCultureWorkflow_Dialog_CultureSelector_Help { get { return T("ChangeOwnCultureWorkflow.Dialog.CultureSelector.Help"); } } 
 /// <summary>C1 Console language</summary> 
 public static string ChangeOwnCultureWorkflow_Dialog_C1ConsoleLanguageSelector_Label { get { return T("ChangeOwnCultureWorkflow.Dialog.C1ConsoleLanguageSelector.Label"); } } 
 /// <summary>Select the language to be used for labels, help texts, dialogs etc. The available options here are limited to languages installed. You may install more languages via the Package system, see Composite.Localization.</summary> 
 public static string ChangeOwnCultureWorkflow_Dialog_C1ConsoleLanguageSelector_Help { get { return T("ChangeOwnCultureWorkflow.Dialog.C1ConsoleLanguageSelector.Help"); } } 
 /// <summary>Change application language</summary> 
 public static string ChangeOwnCultureWorkflow_Dialog_Confirm_Title { get { return T("ChangeOwnCultureWorkflow.Dialog.Confirm.Title"); } } 
 /// <summary>Are your sure you wish to change the settings? The application will restart and all your unsaved changes will be lost.</summary> 
 public static string ChangeOwnCultureWorkflow_Dialog_Confirm_Text { get { return T("ChangeOwnCultureWorkflow.Dialog.Confirm.Text"); } } 
 /// <summary>Regional settings</summary> 
 public static string ChangeOwnCultureWorkflow_FieldGroup_Label { get { return T("ChangeOwnCultureWorkflow.FieldGroup.Label"); } } 
 /// <summary>Administrators</summary> 
 public static string AdministratorAutoCreator_DefaultGroupName { get { return T("AdministratorAutoCreator.DefaultGroupName"); } } 
 /// <summary>Translation...</summary> 
 public static string ChangeForeignLocaleWorkflow_ActionLabel { get { return T("ChangeForeignLocaleWorkflow.ActionLabel"); } } 
 /// <summary>Change source language</summary> 
 public static string ChangeForeignLocaleWorkflow_ActionToolTip { get { return T("ChangeForeignLocaleWorkflow.ActionToolTip"); } } 
 /// <summary>None</summary> 
 public static string ChangeForeignLocaleWorkflow_NoForeignLocaleLabel { get { return T("ChangeForeignLocaleWorkflow.NoForeignLocaleLabel"); } } 
 /// <summary>Translation</summary> 
 public static string ChangeForeignLocaleWorkflow_Dialog_Label { get { return T("ChangeForeignLocaleWorkflow.Dialog.Label"); } } 
 /// <summary>Select language to translate from</summary> 
 public static string ChangeForeignLocaleWorkflow_FieldGroup_Label { get { return T("ChangeForeignLocaleWorkflow.FieldGroup.Label"); } } 
 /// <summary>Multiple languages not installed</summary> 
 public static string ChangeForeignLocaleWorkflow_NoOrOneActiveLocales_Title { get { return T("ChangeForeignLocaleWorkflow.NoOrOneActiveLocales.Title"); } } 
 /// <summary>Two or more languages must be installed in order to support translations. Administrators can add more languages in the &apos;System&apos; perspective.</summary> 
 public static string ChangeForeignLocaleWorkflow_NoOrOneActiveLocales_Description { get { return T("ChangeForeignLocaleWorkflow.NoOrOneActiveLocales.Description"); } } 
 /// <summary>From-language</summary> 
 public static string ChangeForeignLocaleWorkflow_ForeignCultureSelector_Label { get { return T("ChangeForeignLocaleWorkflow.ForeignCultureSelector.Label"); } } 
 /// <summary>Pages written in the from-language will be indicated by globe icons in the Content tree. The associated &quot;Translate Page&quot; action imports the page into the current working language.</summary> 
 public static string ChangeForeignLocaleWorkflow_ForeignCultureSelector_Help { get { return T("ChangeForeignLocaleWorkflow.ForeignCultureSelector.Help"); } } 
 /// <summary>The active language has been changed</summary> 
 public static string ChangeOwnActiveLocaleWorkflow_CloseAllViews_Message { get { return T("ChangeOwnActiveLocaleWorkflow.CloseAllViews.Message"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.C1Console.Users", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Core_PackageSystem_PackageFragmentInstallers {
 /// <summary>The package composite version requirements does not match the current composite version</summary> 
 public static string PackageManager_CompositeVersionMisMatch { get { return T("PackageManager.CompositeVersionMisMatch"); } } 
 /// <summary>Package is already installed</summary> 
 public static string PackageManager_PackageAlreadyInstalled { get { return T("PackageManager.PackageAlreadyInstalled"); } } 
 /// <summary>A newer version of the package is already installed</summary> 
 public static string PackageManager_NewerVersionInstalled { get { return T("PackageManager.NewerVersionInstalled"); } } 
 /// <summary>Could not locate the package directory path &apos;{0}&apos;</summary> 
 public static string PackageManager_MissingPackageDirectory(string parameter0) { return string.Format(T("PackageManager.MissingPackageDirectory"), parameter0); } 
 /// <summary>The package is marked as non uninstallable</summary> 
 public static string PackageManager_Uninstallable { get { return T("PackageManager.Uninstallable"); } } 
 /// <summary>Could not locate the package zip file path &apos;{0}&apos;</summary> 
 public static string PackageManager_MissingZipFile(string parameter0) { return string.Format(T("PackageManager.MissingZipFile"), parameter0); } 
 /// <summary>Could not locate the package uninstall file path &apos;{0}&apos;</summary> 
 public static string PackageManager_MissingUninstallFile(string parameter0) { return string.Format(T("PackageManager.MissingUninstallFile"), parameter0); } 
 /// <summary>Missing &apos;{0}&apos; element.</summary> 
 public static string PackageManager_MissingElement(string parameter0) { return string.Format(T("PackageManager.MissingElement"), parameter0); } 
 /// <summary>Missing &apos;{0}&apos; attribute.</summary> 
 public static string PackageManager_MissingAttribute(string parameter0) { return string.Format(T("PackageManager.MissingAttribute"), parameter0); } 
 /// <summary>&apos;{0}&apos; attribute value is not a valid value.</summary> 
 public static string PackageManager_InvalidAttributeValue(string parameter0) { return string.Format(T("PackageManager.InvalidAttributeValue"), parameter0); } 
 /// <summary>&apos;{0}&apos; element value is not a valid value</summary> 
 public static string PackageManager_InvalidElementValue(string parameter0) { return string.Format(T("PackageManager.InvalidElementValue"), parameter0); } 
 /// <summary>Expected exactly two elements, &apos;{0}&apos; and &apos;{1}&apos;</summary> 
 public static string ConfigurationTransformationPackageFragmentInstaller_ExpectedExactlyTwoElements(string parameter0,string parameter1) { return string.Format(T("ConfigurationTransformationPackageFragmentInstaller.ExpectedExactlyTwoElements"), parameter0,parameter1); } 
 /// <summary>Missing &apos;{0}&apos; element.</summary> 
 public static string ConfigurationTransformationPackageFragmentInstaller_MissingElement(string parameter0) { return string.Format(T("ConfigurationTransformationPackageFragmentInstaller.MissingElement"), parameter0); } 
 /// <summary>Missing &apos;{0}&apos; attribute.</summary> 
 public static string ConfigurationTransformationPackageFragmentInstaller_MissingAttribute(string parameter0) { return string.Format(T("ConfigurationTransformationPackageFragmentInstaller.MissingAttribute"), parameter0); } 
 /// <summary>The path &apos;{0}&apos; does not exist in the ZIP.</summary> 
 public static string ConfigurationTransformationPackageFragmentInstaller_PathDoesNotExist(string parameter0) { return string.Format(T("ConfigurationTransformationPackageFragmentInstaller.PathDoesNotExist"), parameter0); } 
 /// <summary>Unable to parse ZIP&apos;ed XSLT file &apos;{0}&apos;. {1}</summary> 
 public static string ConfigurationTransformationPackageFragmentInstaller_UnableToParsXslt(string parameter0,string parameter1) { return string.Format(T("ConfigurationTransformationPackageFragmentInstaller.UnableToParsXslt"), parameter0,parameter1); } 
 /// <summary>The XSLT file &apos;{0}&apos; will generate an invalid Configuration file. {1}</summary> 
 public static string ConfigurationTransformationPackageFragmentInstaller_XsltWillGeneratedInvalid(string parameter0,string parameter1) { return string.Format(T("ConfigurationTransformationPackageFragmentInstaller.XsltWillGeneratedInvalid"), parameter0,parameter1); } 
 /// <summary>Only one &apos;Types&apos; element allowed</summary> 
 public static string DataPackageFragmentInstaller_OnlyOneElement { get { return T("DataPackageFragmentInstaller.OnlyOneElement"); } } 
 /// <summary>Missing &apos;Types&apos; element</summary> 
 public static string DataPackageFragmentInstaller_MissingElement { get { return T("DataPackageFragmentInstaller.MissingElement"); } } 
 /// <summary>Missing {0} attribute in the configuration</summary> 
 public static string DataPackageFragmentInstaller_MissingAttribute(string parameter0) { return string.Format(T("DataPackageFragmentInstaller.MissingAttribute"), parameter0); } 
 /// <summary>Wrong DataScopeIdentifier ({0}) name in the configuration</summary> 
 public static string DataPackageFragmentInstaller_WrongDataScopeIdentifier(string parameter0) { return string.Format(T("DataPackageFragmentInstaller.WrongDataScopeIdentifier"), parameter0); } 
 /// <summary>Wrong culture ({0}) name in the configuration</summary> 
 public static string DataPackageFragmentInstaller_WrongLocale(string parameter0) { return string.Format(T("DataPackageFragmentInstaller.WrongLocale"), parameter0); } 
 /// <summary>Missing file &apos;{0}&apos; in the package zip</summary> 
 public static string DataPackageFragmentInstaller_MissingFile(string parameter0) { return string.Format(T("DataPackageFragmentInstaller.MissingFile"), parameter0); } 
 /// <summary>The data interface type &apos;{0}&apos; has not been configured in the system</summary> 
 public static string DataPackageFragmentInstaller_TypeNotConfigured(string parameter0) { return string.Format(T("DataPackageFragmentInstaller.TypeNotConfigured"), parameter0); } 
 /// <summary>The data interface type &apos;{0}&apos; does not inherit the interface &apos;{1}&apos;</summary> 
 public static string DataPackageFragmentInstaller_TypeNotInheriting(string parameter0,string parameter1) { return string.Format(T("DataPackageFragmentInstaller.TypeNotInheriting"), parameter0,parameter1); } 
 /// <summary>The data interface type &apos;{0}&apos; does not have a property named &apos;{1}&apos;</summary> 
 public static string DataPackageFragmentInstaller_MissingProperty(string parameter0,string parameter1) { return string.Format(T("DataPackageFragmentInstaller.MissingProperty"), parameter0,parameter1); } 
 /// <summary>The data interface type &apos;{0}&apos; does not have a writable property named &apos;{1}&apos;</summary> 
 public static string DataPackageFragmentInstaller_MissingWritableProperty(string parameter0,string parameter1) { return string.Format(T("DataPackageFragmentInstaller.MissingWritableProperty"), parameter0,parameter1); } 
 /// <summary>Could not convert the value &apos;{0}&apos; to the type &apos;{1}&apos;</summary> 
 public static string DataPackageFragmentInstaller_ConversionFailed(string parameter0,string parameter1) { return string.Format(T("DataPackageFragmentInstaller.ConversionFailed"), parameter0,parameter1); } 
 /// <summary>The property &apos;{0}&apos; on the interface &apos;{1}&apos; is missing a value.</summary> 
 public static string DataPackageFragmentInstaller_MissingPropertyVaule(string parameter0,string parameter1) { return string.Format(T("DataPackageFragmentInstaller.MissingPropertyVaule"), parameter0,parameter1); } 
 /// <summary>Data type &apos;{0}&apos;: {1} record(s) already installed</summary> 
 public static string DataPackageFragmentInstaller_DataExists(string parameter0,string parameter1) { return string.Format(T("DataPackageFragmentInstaller.DataExists"), parameter0,parameter1); } 
 /// <summary>Missing data type descriptor for the type {0}</summary> 
 public static string DataPackageFragmentInstaller_MissingTypeDescriptor(string parameter0) { return string.Format(T("DataPackageFragmentInstaller.MissingTypeDescriptor"), parameter0); } 
 /// <summary>The data type &apos;{0}&apos; is not localized but a locale is specified in the configuration</summary> 
 public static string DataPackageFragmentInstaller_TypeNonLocalizedWithLocale(string parameter0) { return string.Format(T("DataPackageFragmentInstaller.TypeNonLocalizedWithLocale"), parameter0); } 
 /// <summary>The data type &apos;{0}&apos; is localized but no locale is specified in the configuration</summary> 
 public static string DataPackageFragmentInstaller_TypeLocalizedWithoutLocale(string parameter0) { return string.Format(T("DataPackageFragmentInstaller.TypeLocalizedWithoutLocale"), parameter0); } 
 /// <summary>Referenced data missing. Type: {0}, {1}: &apos;{2}&apos;</summary> 
 public static string DataPackageFragmentInstaller_ReferencedDataMissing(string parameter0,string parameter1,string parameter2) { return string.Format(T("DataPackageFragmentInstaller.ReferencedDataMissing"), parameter0,parameter1,parameter2); } 
 /// <summary>Only one &apos;Types&apos; element allowed</summary> 
 public static string DataPackageFragmentUninstaller_OnlyOneElement { get { return T("DataPackageFragmentUninstaller.OnlyOneElement"); } } 
 /// <summary>Missing {0} attribute in the configuration</summary> 
 public static string DataPackageFragmentUninstaller_MissingAttribute(string parameter0) { return string.Format(T("DataPackageFragmentUninstaller.MissingAttribute"), parameter0); } 
 /// <summary>The data type &apos;{0}&apos; does not contain a key property named &apos;{1}</summary> 
 public static string DataPackageFragmentUninstaller_MissingKeyProperty(string parameter0,string parameter1) { return string.Format(T("DataPackageFragmentUninstaller.MissingKeyProperty"), parameter0,parameter1); } 
 /// <summary>Only one &apos;Types&apos; element allowed</summary> 
 public static string DataTypePackageFragmentInstaller_OnlyOneElement { get { return T("DataTypePackageFragmentInstaller.OnlyOneElement"); } } 
 /// <summary>Missing &apos;Types&apos; element</summary> 
 public static string DataTypePackageFragmentInstaller_MissingElement { get { return T("DataTypePackageFragmentInstaller.MissingElement"); } } 
 /// <summary>Missing {0} attribute in the configuration</summary> 
 public static string DataTypePackageFragmentInstaller_MissingAttribute(string parameter0) { return string.Format(T("DataTypePackageFragmentInstaller.MissingAttribute"), parameter0); } 
 /// <summary>The data interface type &apos;{0}&apos; has not been configured in the system</summary> 
 public static string DataTypePackageFragmentInstaller_TypeNotConfigured(string parameter0) { return string.Format(T("DataTypePackageFragmentInstaller.TypeNotConfigured"), parameter0); } 
 /// <summary>The data interface type &apos;{0}&apos; does not inherit the interface &apos;{1}&apos;</summary> 
 public static string DataTypePackageFragmentInstaller_TypeNotInheriting(string parameter0,string parameter1) { return string.Format(T("DataTypePackageFragmentInstaller.TypeNotInheriting"), parameter0,parameter1); } 
 /// <summary>The interface type &apos;{0}&apos; is already exists in the system</summary> 
 public static string DataTypePackageFragmentInstaller_TypeExists(string parameter0) { return string.Format(T("DataTypePackageFragmentInstaller.TypeExists"), parameter0); } 
 /// <summary>Failed to build a data type descriptor for interface &apos;{0}&apos;</summary> 
 public static string DataTypePackageFragmentInstaller_InterfaceCodeError(string parameter0) { return string.Format(T("DataTypePackageFragmentInstaller.InterfaceCodeError"), parameter0); } 
 /// <summary>Only one &apos;Types&apos; element allowed</summary> 
 public static string DataTypePackageFragmentUninstaller_OnlyOneElement { get { return T("DataTypePackageFragmentUninstaller.OnlyOneElement"); } } 
 /// <summary>Missing {0} attribute in the configuration</summary> 
 public static string DataTypePackageFragmentUninstaller_MissingAttribute(string parameter0) { return string.Format(T("DataTypePackageFragmentUninstaller.MissingAttribute"), parameter0); } 
 /// <summary>Wrong attribute format in the configuration</summary> 
 public static string DataTypePackageFragmentUninstaller_WrongAttributeFormat { get { return T("DataTypePackageFragmentUninstaller.WrongAttributeFormat"); } } 
 /// <summary>Only one &apos;Types&apos; element allowed</summary> 
 public static string DynamicDataTypePackageFragmentInstaller_OnlyOneElement { get { return T("DynamicDataTypePackageFragmentInstaller.OnlyOneElement"); } } 
 /// <summary>Missing &apos;Types&apos; element</summary> 
 public static string DynamicDataTypePackageFragmentInstaller_MissingElement { get { return T("DynamicDataTypePackageFragmentInstaller.MissingElement"); } } 
 /// <summary>Error xml parsing the dataTypeDescriptor attribute</summary> 
 public static string DynamicDataTypePackageFragmentInstaller_DataTypeDescriptorParseError { get { return T("DynamicDataTypePackageFragmentInstaller.DataTypeDescriptorParseError"); } } 
 /// <summary>Error while deserializing a DataType. Error text: {0}.</summary> 
 public static string DynamicDataTypePackageFragmentInstaller_DataTypeDescriptorDeserializeError(string parameter0) { return string.Format(T("DynamicDataTypePackageFragmentInstaller.DataTypeDescriptorDeserializeError"), parameter0); } 
 /// <summary>Cannot find a referenced type &apos;{0}&apos;.</summary> 
 public static string DynamicDataTypePackageFragmentInstaller_MissingReferencedType(string parameter0) { return string.Format(T("DynamicDataTypePackageFragmentInstaller.MissingReferencedType"), parameter0); } 
 /// <summary>The interface type &apos;{0}&apos; is already exists in the system</summary> 
 public static string DynamicDataTypePackageFragmentInstaller_TypeExists(string parameter0) { return string.Format(T("DynamicDataTypePackageFragmentInstaller.TypeExists"), parameter0); } 
 /// <summary>Only one &apos;Types&apos; element allowed</summary> 
 public static string DynamicDataTypePackageFragmentUninstaller_OnlyOneElement { get { return T("DynamicDataTypePackageFragmentUninstaller.OnlyOneElement"); } } 
 /// <summary>Missing {0} attribute in the configuration</summary> 
 public static string DynamicDataTypePackageFragmentUninstaller_MissingAttribute(string parameter0) { return string.Format(T("DynamicDataTypePackageFragmentUninstaller.MissingAttribute"), parameter0); } 
 /// <summary>Wrong attribute format in the configuration</summary> 
 public static string DynamicDataTypePackageFragmentUninstaller_WrongAttributeFormat { get { return T("DynamicDataTypePackageFragmentUninstaller.WrongAttributeFormat"); } } 
 /// <summary>Only one &apos;Files&apos; element allowed</summary> 
 public static string FilePackageFragmentInstaller_OnlyOneFilesElement { get { return T("FilePackageFragmentInstaller.OnlyOneFilesElement"); } } 
 /// <summary>Only one &apos;Directories&apos; element allowed</summary> 
 public static string FilePackageFragmentInstaller_OnlyOneDirectoriesElement { get { return T("FilePackageFragmentInstaller.OnlyOneDirectoriesElement"); } } 
 /// <summary>Missing {0} attribute in the configuration</summary> 
 public static string FilePackageFragmentInstaller_MissingAttribute(string parameter0) { return string.Format(T("FilePackageFragmentInstaller.MissingAttribute"), parameter0); } 
 /// <summary>The &apos;deleteTargetDirectory&apos; attribute can only be applied to directories, not files</summary> 
 public static string FilePackageFragmentInstaller_DeleteTargetDirectoryNotAllowed { get { return T("FilePackageFragmentInstaller.DeleteTargetDirectoryNotAllowed"); } } 
 /// <summary>Wrong attribute value format, bool value expected</summary> 
 public static string FilePackageFragmentInstaller_WrongAttributeBoolFormat { get { return T("FilePackageFragmentInstaller.WrongAttributeBoolFormat"); } } 
 /// <summary>The install zip-file does not contain the file &apos;{0}&apos;</summary> 
 public static string FilePackageFragmentInstaller_MissingFile(string parameter0) { return string.Format(T("FilePackageFragmentInstaller.MissingFile"), parameter0); } 
 /// <summary>The file &apos;{0}&apos; already exists</summary> 
 public static string FilePackageFragmentInstaller_FileExists(string parameter0) { return string.Format(T("FilePackageFragmentInstaller.FileExists"), parameter0); } 
 /// <summary>File &apos;{0}&apos; marked as &apos;Read Only&apos; and therefore cannot be overwritten.</summary> 
 public static string FilePackageFragmentInstaller_FileReadOnly(string parameter0) { return string.Format(T("FilePackageFragmentInstaller.FileReadOnly"), parameter0); } 
 /// <summary>The &apos;assemblyLoad&apos; attribute can only be applied to files, not directories</summary> 
 public static string FilePackageFragmentInstaller_AssemblyLoadNotAllowed { get { return T("FilePackageFragmentInstaller.AssemblyLoadNotAllowed"); } } 
 /// <summary>The &apos;onlyUpdate&apos; attribute can only be applied to files, not directories</summary> 
 public static string FilePackageFragmentInstaller_OnlyUpdateNotAllowed { get { return T("FilePackageFragmentInstaller.OnlyUpdateNotAllowed"); } } 
 /// <summary>The &apos;onlyUpdate&apos; attribute is not allowed in combination with the &apos;loadAssembly&apos; attribute</summary> 
 public static string FilePackageFragmentInstaller_OnlyUpdateNotAllowedWithLoadAssemlby { get { return T("FilePackageFragmentInstaller.OnlyUpdateNotAllowedWithLoadAssemlby"); } } 
 /// <summary>The install zip-file does not contain the directory &apos;{0}&apos;</summary> 
 public static string FilePackageFragmentInstaller_MissingDirectory(string parameter0) { return string.Format(T("FilePackageFragmentInstaller.MissingDirectory"), parameter0); } 
 /// <summary>Uninstall.xml contains file pathes, binded to the original website location, and therefore the package cannot be uninstalled safely.</summary> 
 public static string FilePackageFragmentInstaller_WrongBasePath { get { return T("FilePackageFragmentInstaller.WrongBasePath"); } } 
 /// <summary>Only one &apos;Files&apos; element allowed</summary> 
 public static string FilePackageFragmentUninstaller_OnlyOneFilesElement { get { return T("FilePackageFragmentUninstaller.OnlyOneFilesElement"); } } 
 /// <summary>Only one &apos;Areas&apos; element allowed</summary> 
 public static string VirtualElementProviderNodePackageFragmentInstaller_OnlyOneElement { get { return T("VirtualElementProviderNodePackageFragmentInstaller.OnlyOneElement"); } } 
 /// <summary>Could not find the type &apos;{0}&apos;</summary> 
 public static string VirtualElementProviderNodePackageFragmentInstaller_MissingType(string parameter0) { return string.Format(T("VirtualElementProviderNodePackageFragmentInstaller.MissingType"), parameter0); } 
 /// <summary>Could not find the icon &apos;{0}&apos;</summary> 
 public static string VirtualElementProviderNodePackageFragmentInstaller_MissingIcon(string parameter0) { return string.Format(T("VirtualElementProviderNodePackageFragmentInstaller.MissingIcon"), parameter0); } 
 /// <summary>Only one &apos;Areas&apos; element allowed</summary> 
 public static string VirtualElementProviderNodePackageFragmentUninstaller_OnlyOneElement { get { return T("VirtualElementProviderNodePackageFragmentUninstaller.OnlyOneElement"); } } 
 /// <summary>Missing {0} attribute in the configuration</summary> 
 public static string VirtualElementProviderNodePackageFragmentUninstaller_MissingAttribute(string parameter0) { return string.Format(T("VirtualElementProviderNodePackageFragmentUninstaller.MissingAttribute"), parameter0); } 
 /// <summary>Missing {0} attribute in the configuration</summary> 
 public static string FileXslTransformationPackageFragmentInstaller_MissingAttribute(string parameter0) { return string.Format(T("FileXslTransformationPackageFragmentInstaller.MissingAttribute"), parameter0); } 
 /// <summary>File &apos;{0}&apos; not found</summary> 
 public static string FileXslTransformationPackageFragmentInstaller_FileNotFound(string parameter0) { return string.Format(T("FileXslTransformationPackageFragmentInstaller.FileNotFound"), parameter0); } 
 /// <summary>File &apos;{0}&apos; marked as &apos;Read Only&apos; and therefore cannot be overwritten.</summary> 
 public static string FileXslTransformationPackageFragmentInstaller_FileReadOnly(string parameter0) { return string.Format(T("FileXslTransformationPackageFragmentInstaller.FileReadOnly"), parameter0); } 
 /// <summary>File &apos;{0}&apos; was marked as &apos;Read Only&apos;. This file attribute was explicitly removed and the file was updated normally.</summary> 
 public static string FileXslTransformationPackageFragmentInstaller_FileReadOnlyOverride(string parameter0) { return string.Format(T("FileXslTransformationPackageFragmentInstaller.FileReadOnlyOverride"), parameter0); } 
 /// <summary>Only one &apos;PackageVersions&apos; element allowed</summary> 
 public static string PackageVersionBumberFragmentInstaller_OnlyOneElement { get { return T("PackageVersionBumberFragmentInstaller.OnlyOneElement"); } } 
 /// <summary>Missing {0} attribute in the configuration</summary> 
 public static string PackageVersionBumberFragmentInstaller_MissingAttribute(string parameter0) { return string.Format(T("PackageVersionBumberFragmentInstaller.MissingAttribute"), parameter0); } 
 /// <summary>Wrong attribute value format, Guid value expected</summary> 
 public static string PackageVersionBumberFragmentInstaller_WrongAttributeGuidFormat { get { return T("PackageVersionBumberFragmentInstaller.WrongAttributeGuidFormat"); } } 
 /// <summary>The package id duplicate: &apos;{0}&apos;</summary> 
 public static string PackageVersionBumberFragmentInstaller_PackageIdDuplicate(string parameter0) { return string.Format(T("PackageVersionBumberFragmentInstaller.PackageIdDuplicate"), parameter0); } 
 /// <summary>Wrong attribute value format, Version value expected (x.y.z)</summary> 
 public static string PackageVersionBumberFragmentInstaller_WrongAttributeVersionFormat { get { return T("PackageVersionBumberFragmentInstaller.WrongAttributeVersionFormat"); } } 
 /// <summary>Only one &apos;PackageVersions&apos; element allowed</summary> 
 public static string PackageVersionBumberFragmentUninstaller_OnlyOneElement { get { return T("PackageVersionBumberFragmentUninstaller.OnlyOneElement"); } } 
 /// <summary>Missing {0} attribute in the configuration</summary> 
 public static string PackageVersionBumberFragmentUninstaller_MissingAttribute(string parameter0) { return string.Format(T("PackageVersionBumberFragmentUninstaller.MissingAttribute"), parameter0); } 
 /// <summary>Wrong attribute value format, Guid value expected</summary> 
 public static string PackageVersionBumberFragmentUninstaller_WrongAttributeGuidFormat { get { return T("PackageVersionBumberFragmentUninstaller.WrongAttributeGuidFormat"); } } 
 /// <summary>The package id duplicate: &apos;{0}&apos;</summary> 
 public static string PackageVersionBumberFragmentUninstaller_PackageIdDuplicate(string parameter0) { return string.Format(T("PackageVersionBumberFragmentUninstaller.PackageIdDuplicate"), parameter0); } 
 /// <summary>Wrong attribute value format, Version value expected (x.y.z)</summary> 
 public static string PackageVersionBumberFragmentUninstaller_WrongAttributeVersionFormat { get { return T("PackageVersionBumberFragmentUninstaller.WrongAttributeVersionFormat"); } } 
 /// <summary>A public RSA key is missing in the package configuration</summary> 
 public static string PackageLicenseFragmentInstaller_MissingPublicKeyElement { get { return T("PackageLicenseFragmentInstaller.MissingPublicKeyElement"); } } 
 /// <summary>Invalid license key</summary> 
 public static string License_InvalidKeyTitle { get { return T("License.InvalidKeyTitle"); } } 
 /// <summary>The license key is invalid. You need to obtain a valid license key.</summary> 
 public static string License_InvalidKeyMessage { get { return T("License.InvalidKeyMessage"); } } 
 /// <summary>Trial period has expired</summary> 
 public static string License_ExpiredTitle { get { return T("License.ExpiredTitle"); } } 
 /// <summary>The trial period of the package has expired. You need to obtain a valid license.</summary> 
 public static string License_ExpiredMessage { get { return T("License.ExpiredMessage"); } } 
 /// <summary>Failed to get license information. ProductId: {0}</summary> 
 public static string License_Failed(string parameter0) { return string.Format(T("License.Failed"), parameter0); } 
 /// <summary>The Windows user under which this C1 instance is running does not have write permission to file or folder &apos;{0}&apos;.</summary> 
 public static string NotEnoughNtfsPermissions(string parameter0) { return string.Format(T("NotEnoughNtfsPermissions"), parameter0); } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Cultures {
 /// <summary>Afrikaans, South Africa</summary> 
 public static string af_ZA { get { return T("af-ZA"); } } 
 /// <summary>Albanian, Albania</summary> 
 public static string sq_AL { get { return T("sq-AL"); } } 
 /// <summary>Arabic, Algeria</summary> 
 public static string ar_DZ { get { return T("ar-DZ"); } } 
 /// <summary>Arabic, Bahrain</summary> 
 public static string ar_BH { get { return T("ar-BH"); } } 
 /// <summary>Arabic, Egypt</summary> 
 public static string ar_EG { get { return T("ar-EG"); } } 
 /// <summary>Arabic, Iraq</summary> 
 public static string ar_IQ { get { return T("ar-IQ"); } } 
 /// <summary>Arabic, Jordan</summary> 
 public static string ar_JO { get { return T("ar-JO"); } } 
 /// <summary>Arabic, Kuwait</summary> 
 public static string ar_KW { get { return T("ar-KW"); } } 
 /// <summary>Arabic, Lebanon</summary> 
 public static string ar_LB { get { return T("ar-LB"); } } 
 /// <summary>Arabic, Libya</summary> 
 public static string ar_LY { get { return T("ar-LY"); } } 
 /// <summary>Arabic, Morocco</summary> 
 public static string ar_MA { get { return T("ar-MA"); } } 
 /// <summary>Arabic, Oman</summary> 
 public static string ar_OM { get { return T("ar-OM"); } } 
 /// <summary>Arabic, Qatar</summary> 
 public static string ar_QA { get { return T("ar-QA"); } } 
 /// <summary>Arabic, Saudi Arabia</summary> 
 public static string ar_SA { get { return T("ar-SA"); } } 
 /// <summary>Arabic, Syria</summary> 
 public static string ar_SY { get { return T("ar-SY"); } } 
 /// <summary>Arabic, Tunisia</summary> 
 public static string ar_TN { get { return T("ar-TN"); } } 
 /// <summary>Arabic, U.A.E.</summary> 
 public static string ar_AE { get { return T("ar-AE"); } } 
 /// <summary>Arabic, Yemen</summary> 
 public static string ar_YE { get { return T("ar-YE"); } } 
 /// <summary>Armenian, Armenia</summary> 
 public static string hy_AM { get { return T("hy-AM"); } } 
 /// <summary>Azeri, Cyrillic Azerbaijan</summary> 
 public static string az_Cyrl_AZ { get { return T("az-Cyrl-AZ"); } } 
 /// <summary>Azeri, Latin Azerbaijan</summary> 
 public static string az_Latn_AZ { get { return T("az-Latn-AZ"); } } 
 /// <summary>Basque, Basque</summary> 
 public static string eu_ES { get { return T("eu-ES"); } } 
 /// <summary>Belarusian, Belarus</summary> 
 public static string be_BY { get { return T("be-BY"); } } 
 /// <summary>Bosnian, Bosnia and Herzegovina</summary> 
 public static string bs_Latn_BA { get { return T("bs-Latn-BA"); } } 
 /// <summary>Bosnian (Cyrillic) (Bosnia and Herzegovina)</summary> 
 public static string bs_Cyrl_BA { get { return T("bs-Cyrl-BA"); } } 
 /// <summary>Bulgarian, Bulgaria</summary> 
 public static string bg_BG { get { return T("bg-BG"); } } 
 /// <summary>Catalan, Catalan</summary> 
 public static string ca_ES { get { return T("ca-ES"); } } 
 /// <summary>Chinese, Hong Kong S.A.R.</summary> 
 public static string zh_HK { get { return T("zh-HK"); } } 
 /// <summary>Chinese, Macao S.A.R.</summary> 
 public static string zh_MO { get { return T("zh-MO"); } } 
 /// <summary>Chinese, People&apos;s Republic of China</summary> 
 public static string zh_CN { get { return T("zh-CN"); } } 
 /// <summary>Chinese, Singapore</summary> 
 public static string zh_SG { get { return T("zh-SG"); } } 
 /// <summary>Chinese, Taiwan</summary> 
 public static string zh_TW { get { return T("zh-TW"); } } 
 /// <summary>Croatian, Bosnia and Herzegovina</summary> 
 public static string hr_BA { get { return T("hr-BA"); } } 
 /// <summary>Croatian, Croatia</summary> 
 public static string hr_HR { get { return T("hr-HR"); } } 
 /// <summary>Czech, Czech Republic</summary> 
 public static string cs_CZ { get { return T("cs-CZ"); } } 
 /// <summary>Danish</summary> 
 public static string da_DK { get { return T("da-DK"); } } 
 /// <summary>Divehi, Maldives</summary> 
 public static string dv_MV { get { return T("dv-MV"); } } 
 /// <summary>Dutch, Belgium</summary> 
 public static string nl_BE { get { return T("nl-BE"); } } 
 /// <summary>Dutch</summary> 
 public static string nl_NL { get { return T("nl-NL"); } } 
 /// <summary>English, Australia</summary> 
 public static string en_AU { get { return T("en-AU"); } } 
 /// <summary>English, Belize</summary> 
 public static string en_BZ { get { return T("en-BZ"); } } 
 /// <summary>English, Canada</summary> 
 public static string en_CA { get { return T("en-CA"); } } 
 /// <summary>English, Caribbean</summary> 
 public static string en_029 { get { return T("en-029"); } } 
 /// <summary>English, Ireland</summary> 
 public static string en_IE { get { return T("en-IE"); } } 
 /// <summary>English, Jamaica</summary> 
 public static string en_JM { get { return T("en-JM"); } } 
 /// <summary>English, New Zealand</summary> 
 public static string en_NZ { get { return T("en-NZ"); } } 
 /// <summary>English, Republic of the Philippines</summary> 
 public static string en_PH { get { return T("en-PH"); } } 
 /// <summary>English, South Africa</summary> 
 public static string en_ZA { get { return T("en-ZA"); } } 
 /// <summary>English, Trinidad and Tobago</summary> 
 public static string en_TT { get { return T("en-TT"); } } 
 /// <summary>English, UK</summary> 
 public static string en_GB { get { return T("en-GB"); } } 
 /// <summary>English, US</summary> 
 public static string en_US { get { return T("en-US"); } } 
 /// <summary>English, Zimbabwe</summary> 
 public static string en_ZW { get { return T("en-ZW"); } } 
 /// <summary>Estonian, Estonia</summary> 
 public static string et_EE { get { return T("et-EE"); } } 
 /// <summary>Faroese, Faroe Islands</summary> 
 public static string fo_FO { get { return T("fo-FO"); } } 
 /// <summary>Filipino, Philippines</summary> 
 public static string fil_PH { get { return T("fil-PH"); } } 
 /// <summary>Finnish</summary> 
 public static string fi_FI { get { return T("fi-FI"); } } 
 /// <summary>French, Belgium</summary> 
 public static string fr_BE { get { return T("fr-BE"); } } 
 /// <summary>French, Canada</summary> 
 public static string fr_CA { get { return T("fr-CA"); } } 
 /// <summary>French</summary> 
 public static string fr_FR { get { return T("fr-FR"); } } 
 /// <summary>French, Luxembourg</summary> 
 public static string fr_LU { get { return T("fr-LU"); } } 
 /// <summary>French, Principality of Monaco</summary> 
 public static string fr_MC { get { return T("fr-MC"); } } 
 /// <summary>French, Switzerland</summary> 
 public static string fr_CH { get { return T("fr-CH"); } } 
 /// <summary>Frisian, Netherlands</summary> 
 public static string fy_NL { get { return T("fy-NL"); } } 
 /// <summary>Gaelic, United Kingdom</summary> 
 public static string gd_GB { get { return T("gd-GB"); } } 
 /// <summary>Galician, Galician</summary> 
 public static string gl_ES { get { return T("gl-ES"); } } 
 /// <summary>Georgian, Georgia</summary> 
 public static string ka_GE { get { return T("ka-GE"); } } 
 /// <summary>German, Austria</summary> 
 public static string de_AT { get { return T("de-AT"); } } 
 /// <summary>German</summary> 
 public static string de_DE { get { return T("de-DE"); } } 
 /// <summary>German, Liechtenstein</summary> 
 public static string de_LI { get { return T("de-LI"); } } 
 /// <summary>German, Luxembourg</summary> 
 public static string de_LU { get { return T("de-LU"); } } 
 /// <summary>German, Switzerland</summary> 
 public static string de_CH { get { return T("de-CH"); } } 
 /// <summary>Greek, Greece</summary> 
 public static string el_GR { get { return T("el-GR"); } } 
 /// <summary>Greenlandic</summary> 
 public static string kl_GL { get { return T("kl-GL"); } } 
 /// <summary>Gujarati, India</summary> 
 public static string gu_IN { get { return T("gu-IN"); } } 
 /// <summary>Hebrew, Israel</summary> 
 public static string he_IL { get { return T("he-IL"); } } 
 /// <summary>Hindi, India</summary> 
 public static string hi_IN { get { return T("hi-IN"); } } 
 /// <summary>Hungarian, Hungary</summary> 
 public static string hu_HU { get { return T("hu-HU"); } } 
 /// <summary>Icelandic, Iceland</summary> 
 public static string is_IS { get { return T("is-IS"); } } 
 /// <summary>Indonesian, Indonesia</summary> 
 public static string id_ID { get { return T("id-ID"); } } 
 /// <summary>Inuktitut (Latin) (Canada)</summary> 
 public static string iu_Latn_CA { get { return T("iu-Latn-CA"); } } 
 /// <summary>Irish, Ireland</summary> 
 public static string ga_IE { get { return T("ga-IE"); } } 
 /// <summary>Italian</summary> 
 public static string it_IT { get { return T("it-IT"); } } 
 /// <summary>Italian, Switzerland</summary> 
 public static string it_CH { get { return T("it-CH"); } } 
 /// <summary>Japanese, Japan</summary> 
 public static string ja_JP { get { return T("ja-JP"); } } 
 /// <summary>Kannada, India</summary> 
 public static string kn_IN { get { return T("kn-IN"); } } 
 /// <summary>Kazakh, Kazakhstan</summary> 
 public static string kk_KZ { get { return T("kk-KZ"); } } 
 /// <summary>Kiswahili, Kenya</summary> 
 public static string sw_KE { get { return T("sw-KE"); } } 
 /// <summary>Konkani, India</summary> 
 public static string kok_IN { get { return T("kok-IN"); } } 
 /// <summary>Korean, Korea</summary> 
 public static string ko_KR { get { return T("ko-KR"); } } 
 /// <summary>Kyrgyz, Kyrgyzstan</summary> 
 public static string ky_KG { get { return T("ky-KG"); } } 
 /// <summary>Latvian, Latvia</summary> 
 public static string lv_LV { get { return T("lv-LV"); } } 
 /// <summary>Lithuanian, Lithuania</summary> 
 public static string lt_LT { get { return T("lt-LT"); } } 
 /// <summary>Luxembourgish, Luxembourg</summary> 
 public static string lb_LU { get { return T("lb-LU"); } } 
 /// <summary>Macedonian, Former Yugoslav Republic of Macedonia</summary> 
 public static string mk_MK { get { return T("mk-MK"); } } 
 /// <summary>Malay, Brunei Darussalam</summary> 
 public static string ms_BN { get { return T("ms-BN"); } } 
 /// <summary>Malay, Malaysia</summary> 
 public static string ms_MY { get { return T("ms-MY"); } } 
 /// <summary>Maltese, Malta</summary> 
 public static string mt_MT { get { return T("mt-MT"); } } 
 /// <summary>Maori, New Zealand</summary> 
 public static string mi_NZ { get { return T("mi-NZ"); } } 
 /// <summary>Mapudungun, Chile</summary> 
 public static string arn_CL { get { return T("arn-CL"); } } 
 /// <summary>Marathi, India</summary> 
 public static string mr_IN { get { return T("mr-IN"); } } 
 /// <summary>Mohawk, Canada</summary> 
 public static string moh_CA { get { return T("moh-CA"); } } 
 /// <summary>Mongolian, Cyrillic Mongolia</summary> 
 public static string mn_MN { get { return T("mn-MN"); } } 
 /// <summary>Norwegian Bokmål</summary> 
 public static string nb_NO { get { return T("nb-NO"); } } 
 /// <summary>Norwegian Nynorsk, Norway</summary> 
 public static string nn_NO { get { return T("nn-NO"); } } 
 /// <summary>Persian, Iran</summary> 
 public static string fa_IR { get { return T("fa-IR"); } } 
 /// <summary>Polish, Poland</summary> 
 public static string pl_PL { get { return T("pl-PL"); } } 
 /// <summary>Portuguese, Brazil</summary> 
 public static string pt_BR { get { return T("pt-BR"); } } 
 /// <summary>Portuguese, Portugal</summary> 
 public static string pt_PT { get { return T("pt-PT"); } } 
 /// <summary>Punjabi, India</summary> 
 public static string pa_IN { get { return T("pa-IN"); } } 
 /// <summary>Quechua, Bolivia</summary> 
 public static string quz_BO { get { return T("quz-BO"); } } 
 /// <summary>Quechua, Ecuador</summary> 
 public static string quz_EC { get { return T("quz-EC"); } } 
 /// <summary>Quechua, Peru</summary> 
 public static string quz_PE { get { return T("quz-PE"); } } 
 /// <summary>Romanian, Romania</summary> 
 public static string ro_RO { get { return T("ro-RO"); } } 
 /// <summary>Romansh, Switzerland</summary> 
 public static string rm_CH { get { return T("rm-CH"); } } 
 /// <summary>Russian, Russia</summary> 
 public static string ru_RU { get { return T("ru-RU"); } } 
 /// <summary>Sami (Inari) (Finland)</summary> 
 public static string smn_FI { get { return T("smn-FI"); } } 
 /// <summary>Sami (Lule) (Norway)</summary> 
 public static string smj_NO { get { return T("smj-NO"); } } 
 /// <summary>Sami (Lule) (Sweden)</summary> 
 public static string smj_SE { get { return T("smj-SE"); } } 
 /// <summary>Sami (Northern) (Finland)</summary> 
 public static string se_FI { get { return T("se-FI"); } } 
 /// <summary>Sami (Northern) (Norway)</summary> 
 public static string se_NO { get { return T("se-NO"); } } 
 /// <summary>Sami</summary> 
 public static string se_SE { get { return T("se-SE"); } } 
 /// <summary>Sami (Skolt) (Finland)</summary> 
 public static string sms_FI { get { return T("sms-FI"); } } 
 /// <summary>Sami (Southern) (Norway)</summary> 
 public static string sma_NO { get { return T("sma-NO"); } } 
 /// <summary>Sami (Southern) (Sweden)</summary> 
 public static string sma_SE { get { return T("sma-SE"); } } 
 /// <summary>Sanskrit, India</summary> 
 public static string sa_IN { get { return T("sa-IN"); } } 
 /// <summary>Serbian, Cyrillic (Bosnia and Herzegovina)</summary> 
 public static string sr_Cyrl_BA { get { return T("sr-Cyrl-BA"); } } 
 /// <summary>Serbian, Cyrillic (Montenegro)</summary> 
 public static string sr_Cyrl_ME { get { return T("sr-Cyrl-ME"); } } 
 /// <summary>Serbian, Cyrillic (Serbia and Montenegro - former)</summary> 
 public static string sr_Cyrl_CS { get { return T("sr-Cyrl-CS"); } } 
 /// <summary>Serbian, Cyrillic (Serbia)</summary> 
 public static string sr_Cyrl_RS { get { return T("sr-Cyrl-RS"); } } 
 /// <summary>Serbian, Latin (Bosnia and Herzegovina)</summary> 
 public static string sr_Latn_BA { get { return T("sr-Latn-BA"); } } 
 /// <summary>Serbian, Latin (Montenegro)</summary> 
 public static string sr_Latn_ME { get { return T("sr-Latn-ME"); } } 
 /// <summary>Serbian, Latin (Serbia and Montenegro - former)</summary> 
 public static string sr_Latn_CS { get { return T("sr-Latn-CS"); } } 
 /// <summary>Serbian, Latin (Serbia)</summary> 
 public static string sr_Latn_RS { get { return T("sr-Latn-RS"); } } 
 /// <summary>Sesotho sa Leboa, South Africa</summary> 
 public static string ns_ZA { get { return T("ns-ZA"); } } 
 /// <summary>Setswana, South Africa</summary> 
 public static string tn_ZA { get { return T("tn-ZA"); } } 
 /// <summary>Slovak, Slovakia</summary> 
 public static string sk_SK { get { return T("sk-SK"); } } 
 /// <summary>Slovenian, Slovenia</summary> 
 public static string sl_SI { get { return T("sl-SI"); } } 
 /// <summary>Spanish, Argentina</summary> 
 public static string es_AR { get { return T("es-AR"); } } 
 /// <summary>Spanish, Bolivia</summary> 
 public static string es_BO { get { return T("es-BO"); } } 
 /// <summary>Spanish, Chile</summary> 
 public static string es_CL { get { return T("es-CL"); } } 
 /// <summary>Spanish, Colombia</summary> 
 public static string es_CO { get { return T("es-CO"); } } 
 /// <summary>Spanish, Costa Rica</summary> 
 public static string es_CR { get { return T("es-CR"); } } 
 /// <summary>Spanish, Dominican Republic</summary> 
 public static string es_DO { get { return T("es-DO"); } } 
 /// <summary>Spanish, Ecuador</summary> 
 public static string es_EC { get { return T("es-EC"); } } 
 /// <summary>Spanish, El Salvador</summary> 
 public static string es_SV { get { return T("es-SV"); } } 
 /// <summary>Spanish, Guatemala</summary> 
 public static string es_GT { get { return T("es-GT"); } } 
 /// <summary>Spanish, Honduras</summary> 
 public static string es_HN { get { return T("es-HN"); } } 
 /// <summary>Spanish, Mexico</summary> 
 public static string es_MX { get { return T("es-MX"); } } 
 /// <summary>Spanish, Nicaragua</summary> 
 public static string es_NI { get { return T("es-NI"); } } 
 /// <summary>Spanish, Panama</summary> 
 public static string es_PA { get { return T("es-PA"); } } 
 /// <summary>Spanish, Paraguay</summary> 
 public static string es_PY { get { return T("es-PY"); } } 
 /// <summary>Spanish, Peru</summary> 
 public static string es_PE { get { return T("es-PE"); } } 
 /// <summary>Spanish, Puerto Rico</summary> 
 public static string es_PR { get { return T("es-PR"); } } 
 /// <summary>Spanish</summary> 
 public static string es_ES { get { return T("es-ES"); } } 
 /// <summary>Spanish, Uruguay</summary> 
 public static string es_UY { get { return T("es-UY"); } } 
 /// <summary>Spanish, Venezuela</summary> 
 public static string es_VE { get { return T("es-VE"); } } 
 /// <summary>Swedish, Finland</summary> 
 public static string sv_FI { get { return T("sv-FI"); } } 
 /// <summary>Swedish</summary> 
 public static string sv_SE { get { return T("sv-SE"); } } 
 /// <summary>Syriac, Syria</summary> 
 public static string syr_SY { get { return T("syr-SY"); } } 
 /// <summary>Tamil, India</summary> 
 public static string ta_IN { get { return T("ta-IN"); } } 
 /// <summary>Tatar, Russia</summary> 
 public static string tt_RU { get { return T("tt-RU"); } } 
 /// <summary>Telugu, India</summary> 
 public static string te_IN { get { return T("te-IN"); } } 
 /// <summary>Thai, Thailand</summary> 
 public static string th_TH { get { return T("th-TH"); } } 
 /// <summary>Turkish, Turkey</summary> 
 public static string tr_TR { get { return T("tr-TR"); } } 
 /// <summary>Ukrainian, Ukraine</summary> 
 public static string uk_UA { get { return T("uk-UA"); } } 
 /// <summary>Urdu, Islamic Republic of Pakistan</summary> 
 public static string ur_PK { get { return T("ur-PK"); } } 
 /// <summary>Uzbek, Cyrillic Uzbekistan</summary> 
 public static string uz_Cyrl_UZ { get { return T("uz-Cyrl-UZ"); } } 
 /// <summary>Uzbek, Latin Uzbekistan</summary> 
 public static string uz_Latn_UZ { get { return T("uz-Latn-UZ"); } } 
 /// <summary>Vietnamese, Vietnam</summary> 
 public static string vi_VN { get { return T("vi-VN"); } } 
 /// <summary>Welsh, United Kingdom</summary> 
 public static string cy_GB { get { return T("cy-GB"); } } 
 /// <summary>Xhosa, South Africa</summary> 
 public static string xh_ZA { get { return T("xh-ZA"); } } 
 /// <summary>Zulu, South Africa</summary> 
 public static string zu_ZA { get { return T("zu-ZA"); } } 
 /// <summary>Alsatian, France</summary> 
 public static string gsw_FR { get { return T("gsw-FR"); } } 
 /// <summary>Amharic, Ethiopia</summary> 
 public static string am_ET { get { return T("am-ET"); } } 
 /// <summary>Assamese, India</summary> 
 public static string as_IN { get { return T("as-IN"); } } 
 /// <summary>Bashkir, Russia</summary> 
 public static string ba_RU { get { return T("ba-RU"); } } 
 /// <summary>Bengali, Bangladesh</summary> 
 public static string bn_BD { get { return T("bn-BD"); } } 
 /// <summary>Bengali, India</summary> 
 public static string bn_IN { get { return T("bn-IN"); } } 
 /// <summary>Breton, France</summary> 
 public static string br_FR { get { return T("br-FR"); } } 
 /// <summary>Corsican, France</summary> 
 public static string co_FR { get { return T("co-FR"); } } 
 /// <summary>Dari, Afghanistan</summary> 
 public static string prs_AF { get { return T("prs-AF"); } } 
 /// <summary>English, India</summary> 
 public static string en_IN { get { return T("en-IN"); } } 
 /// <summary>English, Malaysia</summary> 
 public static string en_MY { get { return T("en-MY"); } } 
 /// <summary>English, Singapore</summary> 
 public static string en_SG { get { return T("en-SG"); } } 
 /// <summary>Hausa (Latin) (Nigeria)</summary> 
 public static string ha_Latn_NG { get { return T("ha-Latn-NG"); } } 
 /// <summary>Igbo, Nigeria</summary> 
 public static string ig_NG { get { return T("ig-NG"); } } 
 /// <summary>Inuktitut, Canada</summary> 
 public static string iu_Cans_CA { get { return T("iu-Cans-CA"); } } 
 /// <summary>Khmer, Cambodia</summary> 
 public static string km_KH { get { return T("km-KH"); } } 
 /// <summary>K&apos;iche, Guatemala</summary> 
 public static string qut_GT { get { return T("qut-GT"); } } 
 /// <summary>Kinyarwanda, Rwanda</summary> 
 public static string rw_RW { get { return T("rw-RW"); } } 
 /// <summary>Lao, Lao P.D.R.</summary> 
 public static string lo_LA { get { return T("lo-LA"); } } 
 /// <summary>Lower Sorbian, Germany</summary> 
 public static string dsb_DE { get { return T("dsb-DE"); } } 
 /// <summary>Malayalam, India</summary> 
 public static string ml_IN { get { return T("ml-IN"); } } 
 /// <summary>Mongolian (Traditional Mongolian) (People&apos;s Republic of China)</summary> 
 public static string mn_Mong_CN { get { return T("mn-Mong-CN"); } } 
 /// <summary>Nepali, Nepal</summary> 
 public static string ne_NP { get { return T("ne-NP"); } } 
 /// <summary>Occitan, France</summary> 
 public static string oc_FR { get { return T("oc-FR"); } } 
 /// <summary>Oriya, India</summary> 
 public static string or_IN { get { return T("or-IN"); } } 
 /// <summary>Pashto, Afghanistan</summary> 
 public static string ps_AF { get { return T("ps-AF"); } } 
 /// <summary>Sesotho sa Leboa, South Africa</summary> 
 public static string nso_ZA { get { return T("nso-ZA"); } } 
 /// <summary>Sinhala, Sri Lanka</summary> 
 public static string si_LK { get { return T("si-LK"); } } 
 /// <summary>Spanish, United States</summary> 
 public static string es_US { get { return T("es-US"); } } 
 /// <summary>Tajik (Cyrillic) (Tajikistan)</summary> 
 public static string tg_Cyrl_TJ { get { return T("tg-Cyrl-TJ"); } } 
 /// <summary>Tamazight (Latin) (Algeria)</summary> 
 public static string tzm_Latn_DZ { get { return T("tzm-Latn-DZ"); } } 
 /// <summary>Tibetan, People&apos;s Republic of China</summary> 
 public static string bo_CN { get { return T("bo-CN"); } } 
 /// <summary>Turkmen, Turkmenistan</summary> 
 public static string tk_TM { get { return T("tk-TM"); } } 
 /// <summary>Uighur, People&apos;s Republic of China</summary> 
 public static string ug_CN { get { return T("ug-CN"); } } 
 /// <summary>Upper Sorbian, Germany</summary> 
 public static string hsb_DE { get { return T("hsb-DE"); } } 
 /// <summary>Wolof, Senegal</summary> 
 public static string wo_SN { get { return T("wo-SN"); } } 
 /// <summary>Yakut, Russia</summary> 
 public static string sah_RU { get { return T("sah-RU"); } } 
 /// <summary>Yi, People&apos;s Republic of China</summary> 
 public static string ii_CN { get { return T("ii-CN"); } } 
 /// <summary>Yoruba, Nigeria</summary> 
 public static string yo_NG { get { return T("yo-NG"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Cultures", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_EntityTokenLocked {
 /// <summary>This item is currently being edited</summary> 
 public static string LayoutLabel { get { return T("LayoutLabel"); } } 
 /// <summary>Information</summary> 
 public static string LockedByUsername_FieldGroupLabel { get { return T("LockedByUsername.FieldGroupLabel"); } } 
 /// <summary>The item is edited by:</summary> 
 public static string LockedByUsername_Label { get { return T("LockedByUsername.Label"); } } 
 /// <summary>Another user is editing this item. Press OK to proceed or cancel to abort.</summary> 
 public static string LockedByUsername_Help { get { return T("LockedByUsername.Help"); } } 
 /// <summary>You are editing this item in another tab - continue?</summary> 
 public static string SameUserHeading_Title { get { return T("SameUserHeading.Title"); } } 
 /// <summary>Press OK to proceed opening the item or Cancel to abort.</summary> 
 public static string SameUserHeading_Description { get { return T("SameUserHeading.Description"); } } 
 /// <summary>Another user is editing this item - continue?</summary> 
 public static string AnotherUserHeading_Title { get { return T("AnotherUserHeading.Title"); } } 
 /// <summary>If the item is changed simultaneously by multiple users changes may get lost. Press OK to proceed or cancel to abort.</summary> 
 public static string AnotherUserHeading_Description { get { return T("AnotherUserHeading.Description"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.EntityTokenLocked", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_GeneratedTypes {
 /// <summary>One or more types are referencing this type. Renaming is not possible</summary> 
 public static string TypesAreReferencing { get { return T("TypesAreReferencing"); } } 
 /// <summary>The type name &apos;{0}&apos; appears in the namespace &apos;{1}&apos; - this is not allowed</summary> 
 public static string TypeNameInNamespace(string parameter0,string parameter1) { return string.Format(T("TypeNameInNamespace"), parameter0,parameter1); } 
 /// <summary>A type with the same name already exists</summary> 
 public static string TypesNameClash { get { return T("TypesNameClash"); } } 
 /// <summary>No fields added</summary> 
 public static string MissingFields { get { return T("MissingFields"); } } 
 /// <summary>The type name &apos;{0}&apos; is not a valid identifier.</summary> 
 public static string TypeNameIsInvalidIdentifier(string parameter0) { return string.Format(T("TypeNameIsInvalidIdentifier"), parameter0); } 
 /// <summary>The field name &apos;{0}&apos; can not be used</summary> 
 public static string FieldNameCannotBeUsed(string parameter0) { return string.Format(T("FieldNameCannotBeUsed"), parameter0); } 
 /// <summary>The specified &apos;Type namespace&apos; is already in use as a &apos;Type name&apos; (namespace + name). Consider changing the name of &apos;{0}&apos; to &apos;{0}.Item&apos;.</summary> 
 public static string NameSpaceIsTypeTypeName(string parameter0) { return string.Format(T("NameSpaceIsTypeTypeName"), parameter0); } 
 /// <summary>Type name belongs to a reserved namespace.</summary> 
 public static string NamespaceIsReserved { get { return T("NamespaceIsReserved"); } } 
 /// <summary>Cannot add a data type since it will cause some compilation errors.</summary> 
 public static string CompileErrorWhileAddingType { get { return T("CompileErrorWhileAddingType"); } } 
 /// <summary>Cannot change a data type since it will cause some compilation errors.</summary> 
 public static string CompileErrorWhileChangingType { get { return T("CompileErrorWhileChangingType"); } } 
 /// <summary>Field &apos;{0}&apos; does not have a widget provider specified.</summary> 
 public static string FieldDoesNotHaveWidget(string parameter0) { return string.Format(T("FieldDoesNotHaveWidget"), parameter0); } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.GeneratedTypes", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Management {
 /// <summary>Edit Permissions</summary> 
 public static string ManageUserPermissions_ManageUserPermissionsOnBranchLabel { get { return T("ManageUserPermissions.ManageUserPermissionsOnBranchLabel"); } } 
 /// <summary>Edit Permissions</summary> 
 public static string ManageUserPermissions_ManageUserPermissionsOnItemLabel { get { return T("ManageUserPermissions.ManageUserPermissionsOnItemLabel"); } } 
 /// <summary>Global Permissions</summary> 
 public static string ManageUserPermissions_ManageGlobalUserPermissionsLabel { get { return T("ManageUserPermissions.ManageGlobalUserPermissionsLabel"); } } 
 /// <summary>Manage user permissions</summary> 
 public static string ManageUserPermissions_ManageUserPermissionsToolTip { get { return T("ManageUserPermissions.ManageUserPermissionsToolTip"); } } 
 /// <summary>Log</summary> 
 public static string LogElementProvider_RootLabel { get { return T("LogElementProvider.RootLabel"); } } 
 /// <summary>System log</summary> 
 public static string LogElementProvider_RootLabelToolTip { get { return T("LogElementProvider.RootLabelToolTip"); } } 
 /// <summary>Show the log</summary> 
 public static string LogElementProvider_ShowLogLabel { get { return T("LogElementProvider.ShowLogLabel"); } } 
 /// <summary>Show the system log</summary> 
 public static string LogElementProvider_ShowLogToolTip { get { return T("LogElementProvider.ShowLogToolTip"); } } 
 /// <summary>Metadata</summary> 
 public static string DataCompositionVisabilityFacade_DefaultContainerLabel { get { return T("DataCompositionVisabilityFacade.DefaultContainerLabel"); } } 
 /// <summary>Delete User?</summary> 
 public static string Website_Forms_Administrative_DeleteUserStep1_LabelFieldGroup { get { return T("Website.Forms.Administrative.DeleteUserStep1.LabelFieldGroup"); } } 
 /// <summary>Delete the selected user?</summary> 
 public static string Website_Forms_Administrative_DeleteUserStep1_Text { get { return T("Website.Forms.Administrative.DeleteUserStep1.Text"); } } 
 /// <summary>Cascade delete error</summary> 
 public static string DeleteUserWorkflow_CascadeDeleteErrorTitle { get { return T("DeleteUserWorkflow.CascadeDeleteErrorTitle"); } } 
 /// <summary>The type is referenced by another type that does not allow cascade deletes. This operation is halted</summary> 
 public static string DeleteUserWorkflow_CascadeDeleteErrorMessage { get { return T("DeleteUserWorkflow.CascadeDeleteErrorMessage"); } } 
 /// <summary>Cannot delete a user</summary> 
 public static string DeleteUserWorkflow_DeleteSelfTitle { get { return T("DeleteUserWorkflow.DeleteSelfTitle"); } } 
 /// <summary>You can not delete an account you logged in as.</summary> 
 public static string DeleteUserWorkflow_DeleteSelfErrorMessage { get { return T("DeleteUserWorkflow.DeleteSelfErrorMessage"); } } 
 /// <summary>Select Function</summary> 
 public static string Website_Function_SelectDialog_Title { get { return T("Website.Function.SelectDialog.Title"); } } 
 /// <summary>Select Widget</summary> 
 public static string Website_Widget_SelectDialog_Title { get { return T("Website.Widget.SelectDialog.Title"); } } 
 /// <summary>Select Page or File</summary> 
 public static string Website_ContentLink_SelectDialog_Title { get { return T("Website.ContentLink.SelectDialog.Title"); } } 
 /// <summary>Select Page</summary> 
 public static string Website_Page_SelectDialog_Title { get { return T("Website.Page.SelectDialog.Title"); } } 
 /// <summary>Select Frontend File</summary> 
 public static string Website_FrontendFile_SelectDialog_Title { get { return T("Website.FrontendFile.SelectDialog.Title"); } } 
 /// <summary>Select Media</summary> 
 public static string Website_Media_SelectDialog_Title { get { return T("Website.Media.SelectDialog.Title"); } } 
 /// <summary>Select Image</summary> 
 public static string Website_Image_SelectDialog_Title { get { return T("Website.Image.SelectDialog.Title"); } } 
 /// <summary>Select Folder</summary> 
 public static string Website_Folder_SelectDialog_Title { get { return T("Website.Folder.SelectDialog.Title"); } } 
 /// <summary>General settings</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_LabelFieldGroup { get { return T("Website.Forms.Administrative.EditUserStep1.LabelFieldGroup"); } } 
 /// <summary>User name</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_UserNameLabel { get { return T("Website.Forms.Administrative.EditUserStep1.UserNameLabel"); } } 
 /// <summary>User names can not be changed. This is a &apos;read only&apos; field.</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_UserNameHelp { get { return T("Website.Forms.Administrative.EditUserStep1.UserNameHelp"); } } 
 /// <summary>Password</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_PasswordLabel { get { return T("Website.Forms.Administrative.EditUserStep1.PasswordLabel"); } } 
 /// <summary>The password has to be more than 6 characters long.</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_PasswordHelp { get { return T("Website.Forms.Administrative.EditUserStep1.PasswordHelp"); } } 
 /// <summary>Email</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_EmailLabel { get { return T("Website.Forms.Administrative.EditUserStep1.EmailLabel"); } } 
 /// <summary>The e-mail address of the user (optional).</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_EmailHelp { get { return T("Website.Forms.Administrative.EditUserStep1.EmailHelp"); } } 
 /// <summary>Folder</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_GroupLabel { get { return T("Website.Forms.Administrative.EditUserStep1.GroupLabel"); } } 
 /// <summary>If you enter a folder name that does not already exist a new folder will be created.</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_GroupHelp { get { return T("Website.Forms.Administrative.EditUserStep1.GroupHelp"); } } 
 /// <summary>C1 Console Localization</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_LabelLocalizationFieldGroup { get { return T("Website.Forms.Administrative.EditUserStep1.LabelLocalizationFieldGroup"); } } 
 /// <summary>Regional settings</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_CultureLabel { get { return T("Website.Forms.Administrative.EditUserStep1.CultureLabel"); } } 
 /// <summary>To change the way numbers, dates, and hours are displayed, select an entry from the list.</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_CultureHelp { get { return T("Website.Forms.Administrative.EditUserStep1.CultureHelp"); } } 
 /// <summary>C1 Console Language</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_C1ConsoleLanguageLabel { get { return T("Website.Forms.Administrative.EditUserStep1.C1ConsoleLanguageLabel"); } } 
 /// <summary>Select the language to be used for labels, help texts, dialogs etc. The available options here are limited to languages installed. You may install more languages via the Package system, see Composite.Localization.</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_C1ConsoleLanguageHelp { get { return T("Website.Forms.Administrative.EditUserStep1.C1ConsoleLanguageHelp"); } } 
 /// <summary>Perspectives</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActivePerspectiveFieldLabel { get { return T("Website.Forms.Administrative.EditUserStep1.ActivePerspectiveFieldLabel"); } } 
 /// <summary>Visible perspectives</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActivePerspectiveMultiSelectLabel { get { return T("Website.Forms.Administrative.EditUserStep1.ActivePerspectiveMultiSelectLabel"); } } 
 /// <summary>Select which perspectives should be visible when the user starts the C1 Console.</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActivePerspectiveMultiSelectHelp { get { return T("Website.Forms.Administrative.EditUserStep1.ActivePerspectiveMultiSelectHelp"); } } 
 /// <summary>Global permissions</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_GlobalPermissionsFieldLabel { get { return T("Website.Forms.Administrative.EditUserStep1.GlobalPermissionsFieldLabel"); } } 
 /// <summary>Global permissions</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_GlobalPermissionsMultiSelectLabel { get { return T("Website.Forms.Administrative.EditUserStep1.GlobalPermissionsMultiSelectLabel"); } } 
 /// <summary>The Administrate permission grants the user access to manage user permissions and execute other administrative tasks.</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_GlobalPermissionsMultiSelectHelp { get { return T("Website.Forms.Administrative.EditUserStep1.GlobalPermissionsMultiSelectHelp"); } } 
 /// <summary>The removal of your own administrative permission has been ignored. You still have administrative privileges.</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_GlobalPermissions_IgnoredOwnAdministrativeRemoval { get { return T("Website.Forms.Administrative.EditUserStep1.GlobalPermissions.IgnoredOwnAdministrativeRemoval"); } } 
 /// <summary>Data language access</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActiveLocalesFieldLabel { get { return T("Website.Forms.Administrative.EditUserStep1.ActiveLocalesFieldLabel"); } } 
 /// <summary>Data Languages</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActiveLocalesMultiSelectLabel { get { return T("Website.Forms.Administrative.EditUserStep1.ActiveLocalesMultiSelectLabel"); } } 
 /// <summary>User has access to manage data in the selected languages.</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActiveLocalesMultiSelectHelp { get { return T("Website.Forms.Administrative.EditUserStep1.ActiveLocalesMultiSelectHelp"); } } 
 /// <summary>Active content language</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActiveLocaleLabel { get { return T("Website.Forms.Administrative.EditUserStep1.ActiveLocaleLabel"); } } 
 /// <summary>The content language this user will edit.</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActiveLocaleHelp { get { return T("Website.Forms.Administrative.EditUserStep1.ActiveLocaleHelp"); } } 
 /// <summary>The selected language is not checked in the data language section.</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActiveLocaleNotChecked { get { return T("Website.Forms.Administrative.EditUserStep1.ActiveLocaleNotChecked"); } } 
 /// <summary>You must select at least one active language.</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_NoActiveLocaleSelected { get { return T("Website.Forms.Administrative.EditUserStep1.NoActiveLocaleSelected"); } } 
 /// <summary>General</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_GenerelTabLabel { get { return T("Website.Forms.Administrative.EditUserStep1.GenerelTabLabel"); } } 
 /// <summary>Permissions</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_PermissionsTabLabel { get { return T("Website.Forms.Administrative.EditUserStep1.PermissionsTabLabel"); } } 
 /// <summary>Perspectives</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_PerspectivesTabLabel { get { return T("Website.Forms.Administrative.EditUserStep1.PerspectivesTabLabel"); } } 
 /// <summary>User Groups</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_UserGroupsFieldLabel { get { return T("Website.Forms.Administrative.EditUserStep1.UserGroupsFieldLabel"); } } 
 /// <summary>Select the user groups that the selected user should be a member of.</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_UserGroupsMultiSelectHelp { get { return T("Website.Forms.Administrative.EditUserStep1.UserGroupsMultiSelectHelp"); } } 
 /// <summary>Error</summary> 
 public static string EditUserWorkflow_EditErrorTitle { get { return T("EditUserWorkflow.EditErrorTitle"); } } 
 /// <summary>You can not delete your own access rights to &apos;System&apos; perspective.</summary> 
 public static string EditUserWorkflow_EditOwnAccessToSystemPerspective { get { return T("EditUserWorkflow.EditOwnAccessToSystemPerspective"); } } 
 /// <summary>Users</summary> 
 public static string UserElementProvider_RootLabel { get { return T("UserElementProvider.RootLabel"); } } 
 /// <summary>Users</summary> 
 public static string UserElementProvider_RootToolTip { get { return T("UserElementProvider.RootToolTip"); } } 
 /// <summary>Add User...</summary> 
 public static string UserElementProvider_AddUserLabel { get { return T("UserElementProvider.AddUserLabel"); } } 
 /// <summary>Add new user</summary> 
 public static string UserElementProvider_AddUserToolTip { get { return T("UserElementProvider.AddUserToolTip"); } } 
 /// <summary>Edit User</summary> 
 public static string UserElementProvider_EditUserLabel { get { return T("UserElementProvider.EditUserLabel"); } } 
 /// <summary>Edit selected user</summary> 
 public static string UserElementProvider_EditUserToolTip { get { return T("UserElementProvider.EditUserToolTip"); } } 
 /// <summary>Delete User</summary> 
 public static string UserElementProvider_DeleteUserLabel { get { return T("UserElementProvider.DeleteUserLabel"); } } 
 /// <summary>Delete the selected user</summary> 
 public static string UserElementProvider_DeleteUserToolTip { get { return T("UserElementProvider.DeleteUserToolTip"); } } 
 /// <summary>Warning</summary> 
 public static string UserElementProvider_ChangeOtherActiveLocaleTitle { get { return T("UserElementProvider.ChangeOtherActiveLocaleTitle"); } } 
 /// <summary>You have change the active language for a user that is currently logged on. The users console will be reloaded and data might be lost.</summary> 
 public static string UserElementProvider_ChangeOtherActiveLocaleMessage { get { return T("UserElementProvider.ChangeOtherActiveLocaleMessage"); } } 
 /// <summary>Cleanup Required</summary> 
 public static string UserElementProvider_ChangeOtherActiveLocaleDialogTitle { get { return T("UserElementProvider.ChangeOtherActiveLocaleDialogTitle"); } } 
 /// <summary>This requires a stage cleanup. Active editors will be saved and closed.</summary> 
 public static string UserElementProvider_ChangeOtherActiveLocaleDialogText { get { return T("UserElementProvider.ChangeOtherActiveLocaleDialogText"); } } 
 /// <summary>A user with the same name already exists</summary> 
 public static string AddNewUserWorkflow_UsernameDuplicateError { get { return T("AddNewUserWorkflow.UsernameDuplicateError"); } } 
 /// <summary>Add New User</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_LabelFieldGroup { get { return T("Website.Forms.Administrative.AddNewUserStep1.LabelFieldGroup"); } } 
 /// <summary>User name</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_UserNameLabel { get { return T("Website.Forms.Administrative.AddNewUserStep1.UserNameLabel"); } } 
 /// <summary>When you have created a new user the username cannot be changed</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_UserNameHelp { get { return T("Website.Forms.Administrative.AddNewUserStep1.UserNameHelp"); } } 
 /// <summary>Password</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_PasswordLabel { get { return T("Website.Forms.Administrative.AddNewUserStep1.PasswordLabel"); } } 
 /// <summary>The password has to be more than 6 characters long.</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_PasswordHelp { get { return T("Website.Forms.Administrative.AddNewUserStep1.PasswordHelp"); } } 
 /// <summary>Email address</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_EmailLabel { get { return T("Website.Forms.Administrative.AddNewUserStep1.EmailLabel"); } } 
 /// <summary>The e-mail address of the user (optional).</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_EmailHelp { get { return T("Website.Forms.Administrative.AddNewUserStep1.EmailHelp"); } } 
 /// <summary>Folder</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_GroupLabel { get { return T("Website.Forms.Administrative.AddNewUserStep1.GroupLabel"); } } 
 /// <summary>If you enter a folder name that does not already exist a new folder will be created.</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_GroupHelp { get { return T("Website.Forms.Administrative.AddNewUserStep1.GroupHelp"); } } 
 /// <summary>Regional settings</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_CultureLabel { get { return T("Website.Forms.Administrative.AddNewUserStep1.CultureLabel"); } } 
 /// <summary>To change the way numbers, dates, and hours are displayed, select an entry from the list.</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_CultureHelp { get { return T("Website.Forms.Administrative.AddNewUserStep1.CultureHelp"); } } 
 /// <summary>C1 Console Language</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_C1ConsoleLanguageLabel { get { return T("Website.Forms.Administrative.AddNewUserStep1.C1ConsoleLanguageLabel"); } } 
 /// <summary>Select the language to be used for labels, help texts, dialogs etc. The available options here are limited to languages installed. You may install more languages via the Package system, see Composite.Localization.</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_C1ConsoleLanguageHelp { get { return T("Website.Forms.Administrative.AddNewUserStep1.C1ConsoleLanguageHelp"); } } 
 /// <summary>A language is required</summary> 
 public static string UserElementProvider_MissingActiveLanguageTitle { get { return T("UserElementProvider.MissingActiveLanguageTitle"); } } 
 /// <summary>To create a user a language is required, but no languages have been added yet. You can add one under the System perspective.</summary> 
 public static string UserElementProvider_MissingActiveLanguageMessage { get { return T("UserElementProvider.MissingActiveLanguageMessage"); } } 
 /// <summary>User with the same login already exist</summary> 
 public static string UserElementProvider_UserLoginIsAlreadyUsed { get { return T("UserElementProvider.UserLoginIsAlreadyUsed"); } } 
 /// <summary>Add Datafolder</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderTypeLabel { get { return T("AssociatedDataElementProviderHelper.AddDataFolderTypeLabel"); } } 
 /// <summary>Add datafolder</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderTypeToolTip { get { return T("AssociatedDataElementProviderHelper.AddDataFolderTypeToolTip"); } } 
 /// <summary>Add Data</summary> 
 public static string AssociatedDataElementProviderHelper_AddAssociatedDataLabel { get { return T("AssociatedDataElementProviderHelper.AddAssociatedDataLabel"); } } 
 /// <summary>Add data</summary> 
 public static string AssociatedDataElementProviderHelper_AddAssociatedDataToolTip { get { return T("AssociatedDataElementProviderHelper.AddAssociatedDataToolTip"); } } 
 /// <summary>Edit Data</summary> 
 public static string AssociatedDataElementProviderHelper_EditAssociatedDataLabel { get { return T("AssociatedDataElementProviderHelper.EditAssociatedDataLabel"); } } 
 /// <summary>Edit data</summary> 
 public static string AssociatedDataElementProviderHelper_EditAssociatedDataToolTip { get { return T("AssociatedDataElementProviderHelper.EditAssociatedDataToolTip"); } } 
 /// <summary>Delete Data</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteAssociatedDataLabel { get { return T("AssociatedDataElementProviderHelper.DeleteAssociatedDataLabel"); } } 
 /// <summary>Delete data</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteAssociatedDataToolTip { get { return T("AssociatedDataElementProviderHelper.DeleteAssociatedDataToolTip"); } } 
 /// <summary>Localize</summary> 
 public static string AssociatedDataElementProviderHelper_LocalizeData { get { return T("AssociatedDataElementProviderHelper.LocalizeData"); } } 
 /// <summary>Localize data</summary> 
 public static string AssociatedDataElementProviderHelper_LocalizeDataToolTip { get { return T("AssociatedDataElementProviderHelper.LocalizeDataToolTip"); } } 
 /// <summary>Not yet approved or published</summary> 
 public static string AssociatedDataElementProviderHelper_DisabledData { get { return T("AssociatedDataElementProviderHelper.DisabledData"); } } 
 /// <summary>Add Datafolder</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExSelectType_FieldLabel { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExSelectType.FieldLabel"); } } 
 /// <summary>Datafolder type</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExSelectType_SelectorLabel { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExSelectType.SelectorLabel"); } } 
 /// <summary>Create new datatype or use an existing datatype (if present).</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExSelectType_SelectorHelp { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExSelectType.SelectorHelp"); } } 
 /// <summary>Settings</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelNewType { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelNewType"); } } 
 /// <summary>Type name</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelTypeName { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelTypeName"); } } 
 /// <summary>The technical name of the data type (ex. Product). This is used to identify this type in code and should not be changed once used externally.</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HelpTypeName { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HelpTypeName"); } } 
 /// <summary>Type namespace</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelTypeNamespace { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelTypeNamespace"); } } 
 /// <summary>The namespace (module / category name) of the type. This is used to identify this type in code and should not be changed.</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HelpTypeNamespace { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HelpTypeNamespace"); } } 
 /// <summary>Title</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelTypeTitle { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelTypeTitle"); } } 
 /// <summary>Use this entry to specify a user friendly name. You can change this field as you like.</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HelpTypeTitle { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HelpTypeTitle"); } } 
 /// <summary>Fields</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelFields { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelFields"); } } 
 /// <summary>Services</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_ServicesLabel { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.ServicesLabel"); } } 
 /// <summary>Has publishing</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HasPublishing { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HasPublishing"); } } 
 /// <summary>Has localization</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HasLocalization { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HasLocalization"); } } 
 /// <summary>No page datafolders exists</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExWorkflow_NoTypesTitle { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoTypesTitle"); } } 
 /// <summary>No page datafolders have been created yet. You can create a page datafolder in the &apos;Data&apos; perspective.</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExWorkflow_NoTypesMessage { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoTypesMessage"); } } 
 /// <summary>No Unused Page Datafolders Exist</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExWorkflow_NoUnusedTypesTitle { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoUnusedTypesTitle"); } } 
 /// <summary>All available page datafolders have been added already. To create a new page datafolder go to the &apos;Data&apos; perspective.</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExWorkflow_NoUnusedTypesMessage { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoUnusedTypesMessage"); } } 
 /// <summary>Error</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_ErrorTitle { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.ErrorTitle"); } } 
 /// <summary>Select existing data folder type to add</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderSelectType_FieldLabel { get { return T("AssociatedDataElementProviderHelper.AddDataFolderSelectType.FieldLabel"); } } 
 /// <summary>Existing data folder types</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderSelectType_SelectorLabel { get { return T("AssociatedDataElementProviderHelper.AddDataFolderSelectType.SelectorLabel"); } } 
 /// <summary>Select existing data folder type to add</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderSelectType_SelectorHelp { get { return T("AssociatedDataElementProviderHelper.AddDataFolderSelectType.SelectorHelp"); } } 
 /// <summary>Remove Metadata Field</summary> 
 public static string AssociatedDataElementProviderHelper_RemoveMetaDataTypeLabel { get { return T("AssociatedDataElementProviderHelper.RemoveMetaDataTypeLabel"); } } 
 /// <summary>Remove metadata field</summary> 
 public static string AssociatedDataElementProviderHelper_RemoveMetaDataTypeToolTip { get { return T("AssociatedDataElementProviderHelper.RemoveMetaDataTypeToolTip"); } } 
 /// <summary>Remove Datafolder from Page</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_LabelFieldGroup { get { return T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.LabelFieldGroup"); } } 
 /// <summary>Data cleanup</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_FieldGroupLabel { get { return T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.FieldGroupLabel"); } } 
 /// <summary>Delete data</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_DeleteFolderDataLabel { get { return T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.DeleteFolderDataLabel"); } } 
 /// <summary>Yes, delete folder data</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_DeleteFolderDataCheckBoxLabel { get { return T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.DeleteFolderDataCheckBoxLabel"); } } 
 /// <summary>If you want data in this folder to stay in the database, you should uncheck this option.</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_DeleteFolderDataHelp { get { return T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.DeleteFolderDataHelp"); } } 
 /// <summary>Add Metadata Field</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataSelectType_LayoutLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataSelectType.LayoutLabel"); } } 
 /// <summary>Add Metadata Field</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataTypeLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataTypeLabel"); } } 
 /// <summary>Add metadata field</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataTypeToolTip { get { return T("AssociatedDataElementProviderHelper.AddMetaDataTypeToolTip"); } } 
 /// <summary>Select existing metadata type to add</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataSelectType_FieldLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataSelectType.FieldLabel"); } } 
 /// <summary>Existing metadata types</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataSelectType_SelectorLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataSelectType.SelectorLabel"); } } 
 /// <summary>Select existing metadata type to add</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataSelectType_SelectorHelp { get { return T("AssociatedDataElementProviderHelper.AddMetaDataSelectType.SelectorHelp"); } } 
 /// <summary>No page metadata types exists</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_NoTypesTitle { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.NoTypesTitle"); } } 
 /// <summary>No page metatypes have been created yet. You can create a Page metatype in the &apos;Data&apos; perspective.</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_NoTypesMessage { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.NoTypesMessage"); } } 
 /// <summary>Metadata field group naming</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_NamingFieldLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.NamingFieldLabel"); } } 
 /// <summary>Name</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_FieldGroupNameLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.FieldGroupNameLabel"); } } 
 /// <summary>Enter a unique name identifying this metadata field group</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_FieldGroupNameHelp { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.FieldGroupNameHelp"); } } 
 /// <summary>Label</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_FieldGroupLabelLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.FieldGroupLabelLabel"); } } 
 /// <summary>Enter a user friendly label for this metadata field group</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_FieldGroupLabelHelp { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.FieldGroupLabelHelp"); } } 
 /// <summary>Metadata field group visibility</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_VisabilityFieldLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.VisabilityFieldLabel"); } } 
 /// <summary>Tab</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_ContainerSelectorLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.ContainerSelectorLabel"); } } 
 /// <summary>Select the tab for which this metadata should exists</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_ContainerSelectorHelp { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.ContainerSelectorHelp"); } } 
 /// <summary>Start display from</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_StartDisplaySelectorLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.StartDisplaySelectorLabel"); } } 
 /// <summary>Start display from</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_StartDisplaySelectorHelp { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.StartDisplaySelectorHelp"); } } 
 /// <summary>Inherit display</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_InheritDisplaySelectorLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.InheritDisplaySelectorLabel"); } } 
 /// <summary>Inherit display</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_InheritDisplaySelectorHelp { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.InheritDisplaySelectorHelp"); } } 
 /// <summary>The metadata field group has no items in scope</summary> 
 public static string AssociatedDataElementProviderHelper_NoItems_Title { get { return T("AssociatedDataElementProviderHelper.NoItems.Title"); } } 
 /// <summary>There are currently no items within the specified display range. Press Previous to change the display range or Finish to create the metadata field group.</summary> 
 public static string AssociatedDataElementProviderHelper_NoItems_Description { get { return T("AssociatedDataElementProviderHelper.NoItems.Description"); } } 
 /// <summary>This item</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption0 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption0"); } } 
 /// <summary>Children</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption1 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption1"); } } 
 /// <summary>2nd generation descendants</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption2 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption2"); } } 
 /// <summary>3rd generation descendants</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption3 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption3"); } } 
 /// <summary>4th generation descendants</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption4 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption4"); } } 
 /// <summary>5th generation descendants</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption5 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption5"); } } 
 /// <summary>Do not inherit</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption0 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption0"); } } 
 /// <summary>Inherit 1 generation</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption1 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption1"); } } 
 /// <summary>Inherit 2 generations</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption2 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption2"); } } 
 /// <summary>Inherit 3 generations</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption3 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption3"); } } 
 /// <summary>Always inherit</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption4 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption4"); } } 
 /// <summary>The field group name is in use</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_FieldGroupNameNotValid { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.FieldGroupNameNotValid"); } } 
 /// <summary>Remove Metadata Field Group</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteMetaDataSelectType_LayoutLabel { get { return T("AssociatedDataElementProviderHelper.DeleteMetaDataSelectType.LayoutLabel"); } } 
 /// <summary>Select a metadata field group to remove</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteMetaDataSelectFieldGroupName_FieldLabel { get { return T("AssociatedDataElementProviderHelper.DeleteMetaDataSelectFieldGroupName.FieldLabel"); } } 
 /// <summary>Field group</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteMetaDataSelectFieldGroupName_SelectorLabel { get { return T("AssociatedDataElementProviderHelper.DeleteMetaDataSelectFieldGroupName.SelectorLabel"); } } 
 /// <summary>Select a metadata field group to remove</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteMetaDataSelectFieldGroupName_SelectorHelp { get { return T("AssociatedDataElementProviderHelper.DeleteMetaDataSelectFieldGroupName.SelectorHelp"); } } 
 /// <summary>Edit Metadata Field</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataTypeLabel { get { return T("AssociatedDataElementProviderHelper.EditMetaDataTypeLabel"); } } 
 /// <summary>Edit metadata field</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataTypeToolTip { get { return T("AssociatedDataElementProviderHelper.EditMetaDataTypeToolTip"); } } 
 /// <summary>Edit Page Metadata Field</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_Layout_Label { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.Layout.Label"); } } 
 /// <summary>Page metadata field settings</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_FieldGroup_Label { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.FieldGroup.Label"); } } 
 /// <summary>Label</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_LabelTextBox_Label { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.LabelTextBox.Label"); } } 
 /// <summary>The label of the metadata field. Used when editing pages</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_LabelTextBox_Help { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.LabelTextBox.Help"); } } 
 /// <summary>Tab</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataContainerSelector_Label { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataContainerSelector.Label"); } } 
 /// <summary>Select the tab for which this metadata should exists</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataContainerSelector_Help { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataContainerSelector.Help"); } } 
 /// <summary>Start display from</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_StartDisplaySelectorLabel { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.StartDisplaySelectorLabel"); } } 
 /// <summary>Start display from</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_StartDisplaySelectorHelp { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.StartDisplaySelectorHelp"); } } 
 /// <summary>Inherit display</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_InheritDisplaySelectorLabel { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.InheritDisplaySelectorLabel"); } } 
 /// <summary>Inherit display</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_InheritDisplaySelectorHelp { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.InheritDisplaySelectorHelp"); } } 
 /// <summary>Metadata field</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataDefinitionSelector_Label { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataDefinitionSelector.Label"); } } 
 /// <summary>Select the metadata field to edit</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataDefinitionSelector_Help { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataDefinitionSelector.Help"); } } 
 /// <summary>No Metadata Fields to Edit</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_NoMetaDataDefinitionsExists_Title { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.NoMetaDataDefinitionsExists.Title"); } } 
 /// <summary>There is no metadata fields defined on this item to edit</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_NoMetaDataDefinitionsExists_Message { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.NoMetaDataDefinitionsExists.Message"); } } 
 /// <summary>The metadata type is used another place with same name but different label</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataFieldNameAlreadyUsed { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataFieldNameAlreadyUsed"); } } 
 /// <summary>There exists one or more definitions with the same name, container change is not allowed</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataContainerChangeNotAllowed { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataContainerChangeNotAllowed"); } } 
 /// <summary>Press finish to save</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_NoDefaultValuesNeeded_Title { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.NoDefaultValuesNeeded.Title"); } } 
 /// <summary>All required information has been gathered. Press Finish to update the metadata field</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_NoDefaultValuesNeeded_Description { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.NoDefaultValuesNeeded.Description"); } } 
 /// <summary>No Metadata Fields to Remove</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteMetaDataWorkflow_NoDefinedTypesExists_Title { get { return T("AssociatedDataElementProviderHelper.DeleteMetaDataWorkflow.NoDefinedTypesExists.Title"); } } 
 /// <summary>There is no metadata fields defined on this item to remove</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteMetaDataWorkflow_NoDefinedTypesExists_Message { get { return T("AssociatedDataElementProviderHelper.DeleteMetaDataWorkflow.NoDefinedTypesExists.Message"); } } 
 /// <summary>Cascade delete error</summary> 
 public static string DeleteAssociatedDataWorkflow_CascadeDeleteErrorTitle { get { return T("DeleteAssociatedDataWorkflow.CascadeDeleteErrorTitle"); } } 
 /// <summary>The type is referenced by another type that does not allow cascade deletes. This operation is halted</summary> 
 public static string DeleteAssociatedDataWorkflow_CascadeDeleteErrorMessage { get { return T("DeleteAssociatedDataWorkflow.CascadeDeleteErrorMessage"); } } 
 /// <summary>Settings</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelNewType { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelNewType"); } } 
 /// <summary>Type name</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelTypeName { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelTypeName"); } } 
 /// <summary>The name of the new type that you are creating (ex. product)</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HelpTypeName { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HelpTypeName"); } } 
 /// <summary>Type namespace</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelTypeNamespace { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelTypeNamespace"); } } 
 /// <summary>The name of the module, category or namespace that you are creating</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HelpTypeNamespace { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HelpTypeNamespace"); } } 
 /// <summary>Title</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelTypeTitle { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelTypeTitle"); } } 
 /// <summary>Use this entry to specify a user friendly name</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HelpTypeTitle { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HelpTypeTitle"); } } 
 /// <summary>Fields</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelFields { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelFields"); } } 
 /// <summary>Services</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_ServicesLabel { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.ServicesLabel"); } } 
 /// <summary>Has versioning</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HasVersioning { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HasVersioning"); } } 
 /// <summary>Has publishing</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HasPublishing { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HasPublishing"); } } 
 /// <summary>Delete Data?</summary> 
 public static string Website_Forms_Administrative_DeleteAssociatedTypeDataStep1_FieldGroupLabel { get { return T("Website.Forms.Administrative.DeleteAssociatedTypeDataStep1.FieldGroupLabel"); } } 
 /// <summary>Delete data?</summary> 
 public static string Website_Forms_Administrative_DeleteAssociatedTypeDataStep1_Text { get { return T("Website.Forms.Administrative.DeleteAssociatedTypeDataStep1.Text"); } } 
 /// <summary>Add page data</summary> 
 public static string Website_Forms_Administrative_AddAssociatedDataWorkflow_FieldGroupLabel { get { return T("Website.Forms.Administrative.AddAssociatedDataWorkflow.FieldGroupLabel"); } } 
 /// <summary>Select a datatype to add</summary> 
 public static string Website_Forms_Administrative_AddAssociatedDataWorkflow_TypeSelectorLabel { get { return T("Website.Forms.Administrative.AddAssociatedDataWorkflow.TypeSelectorLabel"); } } 
 /// <summary>Select one of the existing types to add data to</summary> 
 public static string Website_Forms_Administrative_AddAssociatedDataWorkflow_TypeSelectorHelp { get { return T("Website.Forms.Administrative.AddAssociatedDataWorkflow.TypeSelectorHelp"); } } 
 /// <summary>Add page datatype</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeWorkflow_FieldGroupLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeWorkflow.FieldGroupLabel"); } } 
 /// <summary>Select type to add</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAddExisting_TypeSelectorLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeAddExisting.TypeSelectorLabel"); } } 
 /// <summary>Select one of the existing types in the system</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAddExisting_TypeSelectorHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeAddExisting.TypeSelectorHelp"); } } 
 /// <summary>Select a foreign key</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAddExistingSelectForeignKey_KeySelectorLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeAddExistingSelectForeignKey.KeySelectorLabel"); } } 
 /// <summary>Select one of the fields from the type to use as foreign key</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAddExistingSelectForeignKey_KeySelectorHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeAddExistingSelectForeignKey.KeySelectorHelp"); } } 
 /// <summary>Add a</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAddingTypeSelection_KeySelectorLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeAddingTypeSelection.KeySelectorLabel"); } } 
 /// <summary>Creating a new type or using an existing type</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAddingTypeSelection_KeySelectorHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeAddingTypeSelection.KeySelectorHelp"); } } 
 /// <summary>Select type:</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAssociationTypeSelection_KeySelectorLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeAssociationTypeSelection.KeySelectorLabel"); } } 
 /// <summary>Regular data is a new type that are created under a page. Metadata is a new field that are created on a page</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAssociationTypeSelection_KeySelectorHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeAssociationTypeSelection.KeySelectorHelp"); } } 
 /// <summary>Rule name</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeRuleNameLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeRuleNameLabel"); } } 
 /// <summary>Rule name are saved with the metadata and are a part of the metadata key. The name must be unique.</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeRuleNameHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeRuleNameHelp"); } } 
 /// <summary>Rule label</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeRuleLabelLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeRuleLabelLabel"); } } 
 /// <summary>Rule label is used as a user friendly name for the instance. Can be localized</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeRuleHelpHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeRuleHelpHelp"); } } 
 /// <summary>Select composition container</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ContainerKeySelectorLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ContainerKeySelectorLabel"); } } 
 /// <summary>Select container for the new rule.</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ContainerKeySelectorHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ContainerKeySelectorHelp"); } } 
 /// <summary>Select composition scope</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeKeySelectorLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeKeySelectorLabel"); } } 
 /// <summary>Select the scope for the new composition</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeKeySelectorHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeKeySelectorHelp"); } } 
 /// <summary>Levels</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeLevelsScopeSelection_LevelsLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeLevelsScopeSelection.LevelsLabel"); } } 
 /// <summary>The depth of sub pages in which the composition will be visible</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeLevelsScopeSelection_LevelsHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeLevelsScopeSelection.LevelsHelp"); } } 
 /// <summary>Confirm new datatype:</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_AssociationTypeLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.AssociationTypeLabel"); } } 
 /// <summary>Metadata is a new field that are created on a page</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_AssociationTypeHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.AssociationTypeHelp"); } } 
 /// <summary>Composition scope rule name</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeRuleNameLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeRuleNameLabel"); } } 
 /// <summary>Rule name are saved with the metadata and are a part of the metadata key. The name must be unique.</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeRuleNameHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeRuleNameHelp"); } } 
 /// <summary>Composition scope rule label</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeRuleLabelLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeRuleLabelLabel"); } } 
 /// <summary>Rule label is used as a user friendly name for the instance. Can be localized</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeRuleHelpHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeRuleHelpHelp"); } } 
 /// <summary>Composition scope</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeLabel"); } } 
 /// <summary>This is the scope in which the new composition will be visible when editing pages</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeHelp"); } } 
 /// <summary>Adding type</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_AddingTypeLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.AddingTypeLabel"); } } 
 /// <summary>Create a new type or use an existing type</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_AddingTypeHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.AddingTypeHelp"); } } 
 /// <summary>Existing type name</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_ExistingTypeNameLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.ExistingTypeNameLabel"); } } 
 /// <summary>The name of the selected existing type in the system to use</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_ExistingTypeNameHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.ExistingTypeNameHelp"); } } 
 /// <summary>Foreign key field name</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_ForeignKeyFieldNameLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.ForeignKeyFieldNameLabel"); } } 
 /// <summary>The name of the field of the existing type to use as a foreign key </summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_ForeignKeyFieldNameHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.ForeignKeyFieldNameHelp"); } } 
 /// <summary>Remove Datafolder</summary> 
 public static string AssociatedDataElementProviderHelper_RemoveAssociatedTypeLabel { get { return T("AssociatedDataElementProviderHelper.RemoveAssociatedTypeLabel"); } } 
 /// <summary>Remove datafolder</summary> 
 public static string AssociatedDataElementProviderHelper_RemoveAssociatedTypeToolTip { get { return T("AssociatedDataElementProviderHelper.RemoveAssociatedTypeToolTip"); } } 
 /// <summary>Remove page datatype</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedType_FieldGroupLabel { get { return T("Website.Forms.Administrative.RemoveAssociatedType.FieldGroupLabel"); } } 
 /// <summary>Remove page datatype</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeFinalInfo_AssociationTypeLabel { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeFinalInfo.AssociationTypeLabel"); } } 
 /// <summary>Composition scope rule name</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeFinalInfo_CompositionScopeRuleNameLabel { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeFinalInfo.CompositionScopeRuleNameLabel"); } } 
 /// <summary>Select a rule</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectRuleName_KeySelectorLabel { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeSelectRuleName.KeySelectorLabel"); } } 
 /// <summary>The name of the rule to remove</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectRuleName_KeySelectorHelp { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeSelectRuleName.KeySelectorHelp"); } } 
 /// <summary>Select page datatype</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectAssociationType_KeySelectorLabel { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeSelectAssociationType.KeySelectorLabel"); } } 
 /// <summary></summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectAssociationType_KeySelectorHelp { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeSelectAssociationType.KeySelectorHelp"); } } 
 /// <summary>Select datatype</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectType_TypeSelectorLabel { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeSelectType.TypeSelectorLabel"); } } 
 /// <summary>Select one of the existing types</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectType_TypeSelectorHelp { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeSelectType.TypeSelectorHelp"); } } 
 /// <summary>Virtual root</summary> 
 public static string VirtualElementProviderElementProvider_ID01 { get { return T("VirtualElementProviderElementProvider.ID01"); } } 
 /// <summary>Users and Permissions</summary> 
 public static string VirtualElementProviderElementProvider_PermissionsPerspective { get { return T("VirtualElementProviderElementProvider.PermissionsPerspective"); } } 
 /// <summary>Users</summary> 
 public static string VirtualElementProviderElementProvider_UserPerspective { get { return T("VirtualElementProviderElementProvider.UserPerspective"); } } 
 /// <summary>Developer Apps</summary> 
 public static string VirtualElementProviderElementProvider_DeveloperApplicationPerspective { get { return T("VirtualElementProviderElementProvider.DeveloperApplicationPerspective"); } } 
 /// <summary>User Groups</summary> 
 public static string VirtualElementProviderElementProvider_UserGroupPerspective { get { return T("VirtualElementProviderElementProvider.UserGroupPerspective"); } } 
 /// <summary>System</summary> 
 public static string VirtualElementProviderElementProvider_SystemPerspective { get { return T("VirtualElementProviderElementProvider.SystemPerspective"); } } 
 /// <summary>Content</summary> 
 public static string VirtualElementProviderElementProvider_ContentPerspective { get { return T("VirtualElementProviderElementProvider.ContentPerspective"); } } 
 /// <summary>Data</summary> 
 public static string VirtualElementProviderElementProvider_DatasPerspective { get { return T("VirtualElementProviderElementProvider.DatasPerspective"); } } 
 /// <summary>Layout</summary> 
 public static string VirtualElementProviderElementProvider_DesignPerspective { get { return T("VirtualElementProviderElementProvider.DesignPerspective"); } } 
 /// <summary>Functions</summary> 
 public static string VirtualElementProviderElementProvider_FunctionsPerspective { get { return T("VirtualElementProviderElementProvider.FunctionsPerspective"); } } 
 /// <summary>All Media Files</summary> 
 public static string VirtualElementProviderElementProvider_MediaFilePerspective { get { return T("VirtualElementProviderElementProvider.MediaFilePerspective"); } } 
 /// <summary>Media</summary> 
 public static string VirtualElementProviderElementProvider_MediaPerspective { get { return T("VirtualElementProviderElementProvider.MediaPerspective"); } } 
 /// <summary>All Functions</summary> 
 public static string VirtualElementProviderElementProvider_ReadOnlyFunctionPerspective { get { return T("VirtualElementProviderElementProvider.ReadOnlyFunctionPerspective"); } } 
 /// <summary>All Widget Functions</summary> 
 public static string VirtualElementProviderElementProvider_ReadOnlyWidgetFunctionPerspective { get { return T("VirtualElementProviderElementProvider.ReadOnlyWidgetFunctionPerspective"); } } 
 /// <summary>SQL Functions</summary> 
 public static string VirtualElementProviderElementProvider_SqlFunctionPerspective { get { return T("VirtualElementProviderElementProvider.SqlFunctionPerspective"); } } 
 /// <summary>Xslt Based Functions</summary> 
 public static string VirtualElementProviderElementProvider_XsltBasedFunctionPerspective { get { return T("VirtualElementProviderElementProvider.XsltBasedFunctionPerspective"); } } 
 /// <summary>Server Log</summary> 
 public static string VirtualElementProviderElementProvider_RootActions_ViewSystemLogLabel { get { return T("VirtualElementProviderElementProvider.RootActions.ViewSystemLogLabel"); } } 
 /// <summary>View recent server events</summary> 
 public static string VirtualElementProviderElementProvider_RootActions_ViewSystemLogTooltip { get { return T("VirtualElementProviderElementProvider.RootActions.ViewSystemLogTooltip"); } } 
 /// <summary>Broadcast Message</summary> 
 public static string VirtualElementProviderElementProvider_RootActions_SendMessageLabel { get { return T("VirtualElementProviderElementProvider.RootActions.SendMessageLabel"); } } 
 /// <summary>Send a message to all running consoles</summary> 
 public static string VirtualElementProviderElementProvider_RootActions_SendMessageTooltip { get { return T("VirtualElementProviderElementProvider.RootActions.SendMessageTooltip"); } } 
 /// <summary>Restart server</summary> 
 public static string VirtualElementProviderElementProvider_RootActions_RestartApplicationLabel { get { return T("VirtualElementProviderElementProvider.RootActions.RestartApplicationLabel"); } } 
 /// <summary>Restart the server</summary> 
 public static string VirtualElementProviderElementProvider_RootActions_RestartApplicationTooltip { get { return T("VirtualElementProviderElementProvider.RootActions.RestartApplicationTooltip"); } } 
 /// <summary>Broadcast Message to All C1 Consoles</summary> 
 public static string SendMessageToConsolesWorkflow_Layout_Label { get { return T("SendMessageToConsolesWorkflow.Layout.Label"); } } 
 /// <summary>Message to broadcast</summary> 
 public static string SendMessageToConsolesWorkflow_FieldGroup_Label { get { return T("SendMessageToConsolesWorkflow.FieldGroup.Label"); } } 
 /// <summary>Title</summary> 
 public static string SendMessageToConsolesWorkflow_TitleTextBox_Label { get { return T("SendMessageToConsolesWorkflow.TitleTextBox.Label"); } } 
 /// <summary>Dialog title of broadcast message</summary> 
 public static string SendMessageToConsolesWorkflow_TitleTextBox_Help { get { return T("SendMessageToConsolesWorkflow.TitleTextBox.Help"); } } 
 /// <summary>Message</summary> 
 public static string SendMessageToConsolesWorkflow_MessageTextArea_Label { get { return T("SendMessageToConsolesWorkflow.MessageTextArea.Label"); } } 
 /// <summary>The message to broadcast</summary> 
 public static string SendMessageToConsolesWorkflow_MessageTextArea_Help { get { return T("SendMessageToConsolesWorkflow.MessageTextArea.Help"); } } 
 /// <summary>Login</summary> 
 public static string LoginWebRequestHandler_Login { get { return T("LoginWebRequestHandler.Login"); } } 
 /// <summary>Login to {0}</summary> 
 public static string LoginWebRequestHandler_Header(string parameter0) { return string.Format(T("LoginWebRequestHandler.Header"), parameter0); } 
 /// <summary>Incorrect user name or password</summary> 
 public static string LoginWebRequestHandler_LoginFailed { get { return T("LoginWebRequestHandler.LoginFailed"); } } 
 /// <summary>Password</summary> 
 public static string LoginWebRequestHandler_Password { get { return T("LoginWebRequestHandler.Password"); } } 
 /// <summary>Username</summary> 
 public static string LoginWebRequestHandler_Username { get { return T("LoginWebRequestHandler.Username"); } } 
 /// <summary>Log in as another user.</summary> 
 public static string LoginWebRequestHandler_LogInAsOtherUser { get { return T("LoginWebRequestHandler.LogInAsOtherUser"); } } 
 /// <summary>Wrong username or password.</summary> 
 public static string LoginWebRequestHandler_WrongUserNameOrPassword { get { return T("LoginWebRequestHandler.WrongUserNameOrPassword"); } } 
 /// <summary>The supplied Windows login, {0}\{1} is not registered in the user database. You must use a different login.</summary> 
 public static string LoginWebRequestHandler_UserNameNotRegistered(string parameter0,string parameter1) { return string.Format(T("LoginWebRequestHandler.UserNameNotRegistered"), parameter0,parameter1); } 
 /// <summary>The type {0} is not an interface.</summary> 
 public static string DataInterfaceValidator_TypeNotAnInterface(string parameter0) { return string.Format(T("DataInterfaceValidator.TypeNotAnInterface"), parameter0); } 
 /// <summary>The interface type {0} does not implement the interface {1}.</summary> 
 public static string DataInterfaceValidator_TypeDoesNotImplementInterface(string parameter0,string parameter1) { return string.Format(T("DataInterfaceValidator.TypeDoesNotImplementInterface"), parameter0,parameter1); } 
 /// <summary>The property {0} on the interface type {1} is not a accepted type.</summary> 
 public static string DataInterfaceValidator_NotAcceptedType(string parameter0,string parameter1) { return string.Format(T("DataInterfaceValidator.NotAcceptedType"), parameter0,parameter1); } 
 /// <summary>The interface {0} is not a valid IData interface.</summary> 
 public static string DataInterfaceValidator_NotValidIDataInterface(string parameter0) { return string.Format(T("DataInterfaceValidator.NotValidIDataInterface"), parameter0); } 
 /// <summary>Cascade delete error</summary> 
 public static string DeleteMediaFileWorkflow_CascadeDeleteErrorTitle { get { return T("DeleteMediaFileWorkflow.CascadeDeleteErrorTitle"); } } 
 /// <summary>The type is referenced by another type that does not allow cascade deletes. This operation is halted</summary> 
 public static string DeleteMediaFileWorkflow_CascadeDeleteErrorMessage { get { return T("DeleteMediaFileWorkflow.CascadeDeleteErrorMessage"); } } 
 /// <summary>Cascade delete error</summary> 
 public static string DeleteMediaFolderWorkflow_CascadeDeleteErrorTitle { get { return T("DeleteMediaFolderWorkflow.CascadeDeleteErrorTitle"); } } 
 /// <summary>The type is referenced by another type that does not allow cascade deletes. This operation is halted</summary> 
 public static string DeleteMediaFolderWorkflow_CascadeDeleteErrorMessage { get { return T("DeleteMediaFolderWorkflow.CascadeDeleteErrorMessage"); } } 
 /// <summary>Add folders and files to the media archive</summary> 
 public static string MediaFileProviderElementProvider_RootToolTip { get { return T("MediaFileProviderElementProvider.RootToolTip"); } } 
 /// <summary>Add Folder</summary> 
 public static string MediaFileProviderElementProvider_AddMediaFolder { get { return T("MediaFileProviderElementProvider.AddMediaFolder"); } } 
 /// <summary>Add new media folder</summary> 
 public static string MediaFileProviderElementProvider_AddMediaFolderToolTip { get { return T("MediaFileProviderElementProvider.AddMediaFolderToolTip"); } } 
 /// <summary>Upload File</summary> 
 public static string MediaFileProviderElementProvider_AddMediaFile { get { return T("MediaFileProviderElementProvider.AddMediaFile"); } } 
 /// <summary>Add new media file</summary> 
 public static string MediaFileProviderElementProvider_AddMediaFileToolTip { get { return T("MediaFileProviderElementProvider.AddMediaFileToolTip"); } } 
 /// <summary>Delete File</summary> 
 public static string MediaFileProviderElementProvider_DeleteMediaFile { get { return T("MediaFileProviderElementProvider.DeleteMediaFile"); } } 
 /// <summary>Delete the selected media file</summary> 
 public static string MediaFileProviderElementProvider_DeleteMediaFileToolTip { get { return T("MediaFileProviderElementProvider.DeleteMediaFileToolTip"); } } 
 /// <summary>Delete Folder</summary> 
 public static string MediaFileProviderElementProvider_DeleteMediaFolder { get { return T("MediaFileProviderElementProvider.DeleteMediaFolder"); } } 
 /// <summary>Delete the media folder and all items under it.</summary> 
 public static string MediaFileProviderElementProvider_DeleteMediaFolderToolTip { get { return T("MediaFileProviderElementProvider.DeleteMediaFolderToolTip"); } } 
 /// <summary>Download</summary> 
 public static string MediaFileProviderElementProvider_Download { get { return T("MediaFileProviderElementProvider.Download"); } } 
 /// <summary>Download file</summary> 
 public static string MediaFileProviderElementProvider_DownloadToolTip { get { return T("MediaFileProviderElementProvider.DownloadToolTip"); } } 
 /// <summary>File Properties</summary> 
 public static string MediaFileProviderElementProvider_EditMediaFile { get { return T("MediaFileProviderElementProvider.EditMediaFile"); } } 
 /// <summary>Rename the selected media file</summary> 
 public static string MediaFileProviderElementProvider_EditMediaFileToolTip { get { return T("MediaFileProviderElementProvider.EditMediaFileToolTip"); } } 
 /// <summary>Edit text</summary> 
 public static string MediaFileProviderElementProvider_EditMediaFileTextContent { get { return T("MediaFileProviderElementProvider.EditMediaFileTextContent"); } } 
 /// <summary>Edit text content</summary> 
 public static string MediaFileProviderElementProvider_EditMediaFileTextContentToolTip { get { return T("MediaFileProviderElementProvider.EditMediaFileTextContentToolTip"); } } 
 /// <summary>Image Editor</summary> 
 public static string MediaFileProviderElementProvider_EditImage { get { return T("MediaFileProviderElementProvider.EditImage"); } } 
 /// <summary>Open the selected media file in the image editor</summary> 
 public static string MediaFileProviderElementProvider_EditImageToolTip { get { return T("MediaFileProviderElementProvider.EditImageToolTip"); } } 
 /// <summary>Folder Properties</summary> 
 public static string MediaFileProviderElementProvider_EditMediaFolder { get { return T("MediaFileProviderElementProvider.EditMediaFolder"); } } 
 /// <summary>Edit media folder properties</summary> 
 public static string MediaFileProviderElementProvider_EditMediaFolderToolTip { get { return T("MediaFileProviderElementProvider.EditMediaFolderToolTip"); } } 
 /// <summary>Replace File</summary> 
 public static string MediaFileProviderElementProvider_ChangeMediaFile { get { return T("MediaFileProviderElementProvider.ChangeMediaFile"); } } 
 /// <summary>Replace the selected with another media file</summary> 
 public static string MediaFileProviderElementProvider_ChangeMediaFileToolTip { get { return T("MediaFileProviderElementProvider.ChangeMediaFileToolTip"); } } 
 /// <summary>Upload Multiple</summary> 
 public static string MediaFileProviderElementProvider_UploadZipFile { get { return T("MediaFileProviderElementProvider.UploadZipFile"); } } 
 /// <summary>Upload Zip file</summary> 
 public static string MediaFileProviderElementProvider_UploadZipFileToolTip { get { return T("MediaFileProviderElementProvider.UploadZipFileToolTip"); } } 
 /// <summary>Media Item</summary> 
 public static string MediaFileProviderElementProvider_MediaFileItemToolTip { get { return T("MediaFileProviderElementProvider.MediaFileItemToolTip"); } } 
 /// <summary>Organize folders and files</summary> 
 public static string MediaFileProviderElementProvider_OrganizedFilesAndFoldersToolTip { get { return T("MediaFileProviderElementProvider.OrganizedFilesAndFoldersToolTip"); } } 
 /// <summary>Error</summary> 
 public static string MediaFileProviderElementProvider_ErrorMessageTitle { get { return T("MediaFileProviderElementProvider.ErrorMessageTitle"); } } 
 /// <summary>File &apos;{0}&apos; already exists in folder &apos;{1}&apos;</summary> 
 public static string MediaFileProviderElementProvider_FileAlreadyExistsMessage(string parameter0,string parameter1) { return string.Format(T("MediaFileProviderElementProvider.FileAlreadyExistsMessage"), parameter0,parameter1); } 
 /// <summary>Failure</summary> 
 public static string UploadNewMediaFileWorkflow_UploadFailure { get { return T("UploadNewMediaFileWorkflow.UploadFailure"); } } 
 /// <summary>The uploaded file must be of the same type as the original. The file you uploaded is of a different type.</summary> 
 public static string UploadNewMediaFileWorkflow_UploadFailureMessage { get { return T("UploadNewMediaFileWorkflow.UploadFailureMessage"); } } 
 /// <summary>Show Graph</summary> 
 public static string RelationshipGraphActionExecutor_ShowGraph { get { return T("RelationshipGraphActionExecutor.ShowGraph"); } } 
 /// <summary>Show relationship graph</summary> 
 public static string RelationshipGraphActionExecutor_ShowGraphToolTip { get { return T("RelationshipGraphActionExecutor.ShowGraphToolTip"); } } 
 /// <summary>Show Oriented Graph</summary> 
 public static string RelationshipGraphActionExecutor_ShowOrientedGraph { get { return T("RelationshipGraphActionExecutor.ShowOrientedGraph"); } } 
 /// <summary>Show Oriented Relationship graph</summary> 
 public static string RelationshipGraphActionExecutor_ShowOrientedGraphToolTip { get { return T("RelationshipGraphActionExecutor.ShowOrientedGraphToolTip"); } } 
 /// <summary>Show Element Information</summary> 
 public static string ShowElementInformationActionExecutor_ShowElementInformation_Label { get { return T("ShowElementInformationActionExecutor.ShowElementInformation.Label"); } } 
 /// <summary>Show Element Information</summary> 
 public static string ShowElementInformationActionExecutor_ShowElementInformation_ToolTip { get { return T("ShowElementInformationActionExecutor.ShowElementInformation.ToolTip"); } } 
 /// <summary>Search elements</summary> 
 public static string RelationshipGraphActionExecutor_Search { get { return T("RelationshipGraphActionExecutor.Search"); } } 
 /// <summary>Search for elements</summary> 
 public static string RelationshipGraphActionExecutor_SearchToolTip { get { return T("RelationshipGraphActionExecutor.SearchToolTip"); } } 
 /// <summary>Search elements</summary> 
 public static string RelationshipGraphActionExecutor_SearchElements { get { return T("RelationshipGraphActionExecutor.SearchElements"); } } 
 /// <summary>Search for elements</summary> 
 public static string RelationshipGraphActionExecutor_SearchElementsToolTip { get { return T("RelationshipGraphActionExecutor.SearchElementsToolTip"); } } 
 /// <summary>Version No.</summary> 
 public static string Website_General_LabelVersionNumber { get { return T("Website.General.LabelVersionNumber"); } } 
 /// <summary>Restart?</summary> 
 public static string Website_Application_DialogReload_Title { get { return T("Website.Application.DialogReload.Title"); } } 
 /// <summary>Restart Composite C1? All unsaved changes will be lost.</summary> 
 public static string Website_Application_DialogReload_Text { get { return T("Website.Application.DialogReload.Text"); } } 
 /// <summary>Save Resource?</summary> 
 public static string WebSite_Application_DialogSaveResource_Title { get { return T("WebSite.Application.DialogSaveResource.Title"); } } 
 /// <summary>&quot;${resourcename}&quot; has been modified. Save changes?</summary> 
 public static string WebSite_Application_DialogSaveResource_Text { get { return T("WebSite.Application.DialogSaveResource.Text"); } } 
 /// <summary>Save Resources?</summary> 
 public static string Website_Dialogs_SaveAll_LabelSaveResources { get { return T("Website.Dialogs.SaveAll.LabelSaveResources"); } } 
 /// <summary>Unsaved resources</summary> 
 public static string Website_Dialogs_SaveAll_LabelUnsavedResources { get { return T("Website.Dialogs.SaveAll.LabelUnsavedResources"); } } 
 /// <summary>Yes</summary> 
 public static string Website_Dialogs_LabelYes { get { return T("Website.Dialogs.LabelYes"); } } 
 /// <summary>No</summary> 
 public static string Website_Dialogs_LabelNo { get { return T("Website.Dialogs.LabelNo"); } } 
 /// <summary>OK</summary> 
 public static string Website_Dialogs_LabelAccept { get { return T("Website.Dialogs.LabelAccept"); } } 
 /// <summary>Cancel</summary> 
 public static string Website_Dialogs_LabelCancel { get { return T("Website.Dialogs.LabelCancel"); } } 
 /// <summary>More Info</summary> 
 public static string Website_Dialogs_LabelDisclosure { get { return T("Website.Dialogs.LabelDisclosure"); } } 
 /// <summary>About Composite C1</summary> 
 public static string Website_Dialogs_About_Title { get { return T("Website.Dialogs.About.Title"); } } 
 /// <summary>Credits</summary> 
 public static string Website_Dialogs_About_LabelCredits { get { return T("Website.Dialogs.About.LabelCredits"); } } 
 /// <summary>Back</summary> 
 public static string Website_Dialogs_About_LabelBack { get { return T("Website.Dialogs.About.LabelBack"); } } 
 /// <summary>Credits</summary> 
 public static string Website_Dialogs_About_LabelCredits2 { get { return T("Website.Dialogs.About.LabelCredits2"); } } 
 /// <summary>No access</summary> 
 public static string Website_Dialogs_NoAccessTitle { get { return T("Website.Dialogs.NoAccessTitle"); } } 
 /// <summary>You have not been granted access rights to the system. Please contact your administrator.</summary> 
 public static string Website_Dialogs_NoAccessText { get { return T("Website.Dialogs.NoAccessText"); } } 
 /// <summary>Unit</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_Unit { get { return T("Website.Dialogs.ImageEditor.ScaleImage.Unit"); } } 
 /// <summary>Width</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_Width { get { return T("Website.Dialogs.ImageEditor.ScaleImage.Width"); } } 
 /// <summary>Height</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_Height { get { return T("Website.Dialogs.ImageEditor.ScaleImage.Height"); } } 
 /// <summary>Scale Image</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_LabelScaleImage { get { return T("Website.Dialogs.ImageEditor.ScaleImage.LabelScaleImage"); } } 
 /// <summary>Dimensions</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_LabelDimensions { get { return T("Website.Dialogs.ImageEditor.ScaleImage.LabelDimensions"); } } 
 /// <summary>Image Size</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_LabelImageSize { get { return T("Website.Dialogs.ImageEditor.ScaleImage.LabelImageSize"); } } 
 /// <summary>Fixed Ratio</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_LabelFixedRatio { get { return T("Website.Dialogs.ImageEditor.ScaleImage.LabelFixedRatio"); } } 
 /// <summary>Free Resize</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_LabelFreeResize { get { return T("Website.Dialogs.ImageEditor.ScaleImage.LabelFreeResize"); } } 
 /// <summary>Pixels</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_LabelPixels { get { return T("Website.Dialogs.ImageEditor.ScaleImage.LabelPixels"); } } 
 /// <summary>Percent</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_LabelPercent { get { return T("Website.Dialogs.ImageEditor.ScaleImage.LabelPercent"); } } 
 /// <summary>Login screen</summary> 
 public static string Website_Dialogs_Options_LoginScreen { get { return T("Website.Dialogs.Options.LoginScreen"); } } 
 /// <summary>Options</summary> 
 public static string Website_Dialogs_Options_LabelOptions { get { return T("Website.Dialogs.Options.LabelOptions"); } } 
 /// <summary>General</summary> 
 public static string Website_Dialogs_Options_LabelGeneral { get { return T("Website.Dialogs.Options.LabelGeneral"); } } 
 /// <summary>Advanced</summary> 
 public static string Website_Dialogs_Options_LabelAdvanced { get { return T("Website.Dialogs.Options.LabelAdvanced"); } } 
 /// <summary>Login Preferences</summary> 
 public static string Website_Dialogs_Options_LabelLoginPreferences { get { return T("Website.Dialogs.Options.LabelLoginPreferences"); } } 
 /// <summary>Fake login screen</summary> 
 public static string Website_Dialogs_Options_LabelFakeLoginScreen { get { return T("Website.Dialogs.Options.LabelFakeLoginScreen"); } } 
 /// <summary>No login screen</summary> 
 public static string Website_Dialogs_Options_LabelNoLoginScreen { get { return T("Website.Dialogs.Options.LabelNoLoginScreen"); } } 
 /// <summary>Error in web service method </summary> 
 public static string Website_Dialogs_WebServices_Error { get { return T("Website.Dialogs.WebServices.Error"); } } 
 /// <summary>Web Service Error</summary> 
 public static string Website_Dialogs_WebServices_LabelWebServiceError { get { return T("Website.Dialogs.WebServices.LabelWebServiceError"); } } 
 /// <summary>Insert Where?</summary> 
 public static string Website_Dialogs_SystemTree_DetailedPaste_Title { get { return T("Website.Dialogs.SystemTree.DetailedPaste.Title"); } } 
 /// <summary>Position</summary> 
 public static string Website_Dialogs_SystemTree_DetailedPaste_LabelPosition { get { return T("Website.Dialogs.SystemTree.DetailedPaste.LabelPosition"); } } 
 /// <summary>Insert before</summary> 
 public static string Website_Dialogs_SystemTree_DetailedPaste_LabelInsertBefore { get { return T("Website.Dialogs.SystemTree.DetailedPaste.LabelInsertBefore"); } } 
 /// <summary>Insert after</summary> 
 public static string Website_Dialogs_SystemTree_DetailedPaste_LabelInsertAfter { get { return T("Website.Dialogs.SystemTree.DetailedPaste.LabelInsertAfter"); } } 
 /// <summary>Edit image</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelTitle { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelTitle"); } } 
 /// <summary>File</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelFile { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelFile"); } } 
 /// <summary>Save</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelSave { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelSave"); } } 
 /// <summary>Save As...</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelSaveAs { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelSaveAs"); } } 
 /// <summary>Revert</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelRevert { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRevert"); } } 
 /// <summary>View</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelView { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelView"); } } 
 /// <summary>Zoom</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelZoom { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelZoom"); } } 
 /// <summary>Zoom In</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelZoomIn { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelZoomIn"); } } 
 /// <summary>Zoom Out</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelZoomOut { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelZoomOut"); } } 
 /// <summary>800%</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label800 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label800"); } } 
 /// <summary>400%</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label400 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label400"); } } 
 /// <summary>200%</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label200 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label200"); } } 
 /// <summary>100%</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label100 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label100"); } } 
 /// <summary>50%</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label50 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label50"); } } 
 /// <summary>25%</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label25 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label25"); } } 
 /// <summary>12%</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label12 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label12"); } } 
 /// <summary>Image</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelImage { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelImage"); } } 
 /// <summary>Transform</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelTransform { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelTransform"); } } 
 /// <summary>Flip Horizontally</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelFlipHorizontal { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelFlipHorizontal"); } } 
 /// <summary>Flip Vertically</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelFlipVertical { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelFlipVertical"); } } 
 /// <summary>Rotate 90 Degrees CW</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelRotate90CW { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRotate90CW"); } } 
 /// <summary>Rotate 90 Degrees CCW</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelRotate90CCW { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRotate90CCW"); } } 
 /// <summary>Rotate 180 Degrees</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelRotate180 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRotate180"); } } 
 /// <summary>Scale Image...</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelScale { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelScale"); } } 
 /// <summary>Crop Image</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelCrop { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelCrop"); } } 
 /// <summary>Select</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBox_ToolTipSelect { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBox.ToolTipSelect"); } } 
 /// <summary>Zoom</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBox_ToolTipZoom { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBox.ToolTipZoom"); } } 
 /// <summary>Save</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelSave { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelSave"); } } 
 /// <summary>Scale image</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelScale { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelScale"); } } 
 /// <summary>Crop image</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelCrop { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelCrop"); } } 
 /// <summary>Undo</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelUndo { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelUndo"); } } 
 /// <summary>Redo</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelRedo { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelRedo"); } } 
 /// <summary>Permissions</summary> 
 public static string Website_Content_Views_Editors_PermissionEditor_LabelTitle { get { return T("Website.Content.Views.Editors.PermissionEditor.LabelTitle"); } } 
 /// <summary>Users</summary> 
 public static string Website_Content_Views_Editors_PermissionEditor_LabelTabUsers { get { return T("Website.Content.Views.Editors.PermissionEditor.LabelTabUsers"); } } 
 /// <summary>User Groups</summary> 
 public static string Website_Content_Views_Editors_PermissionEditor_LabelTabUserGroups { get { return T("Website.Content.Views.Editors.PermissionEditor.LabelTabUserGroups"); } } 
 /// <summary>Save</summary> 
 public static string Website_Content_Views_Editors_PermissionEditor_LabelButtonSave { get { return T("Website.Content.Views.Editors.PermissionEditor.LabelButtonSave"); } } 
 /// <summary>Go back one page</summary> 
 public static string Website_Content_Views_Help_ToolTipBack { get { return T("Website.Content.Views.Help.ToolTipBack"); } } 
 /// <summary>Go forward one page</summary> 
 public static string Website_Content_Views_Help_ToolTipForward { get { return T("Website.Content.Views.Help.ToolTipForward"); } } 
 /// <summary>Refresh page</summary> 
 public static string Website_Content_Views_Help_ToolTipRefresh { get { return T("Website.Content.Views.Help.ToolTipRefresh"); } } 
 /// <summary>Contents</summary> 
 public static string Website_Content_Views_Help_LabelContents { get { return T("Website.Content.Views.Help.LabelContents"); } } 
 /// <summary>Help contents</summary> 
 public static string Website_Content_Views_Help_ToolTipContents { get { return T("Website.Content.Views.Help.ToolTipContents"); } } 
 /// <summary>Collapse All</summary> 
 public static string Website_Content_Views_SystemView_ToolTipCollapseAll { get { return T("Website.Content.Views.SystemView.ToolTipCollapseAll"); } } 
 /// <summary>Link with Editor</summary> 
 public static string Website_Content_Views_SystemView_ToolTipLinkWithEditor { get { return T("Website.Content.Views.SystemView.ToolTipLinkWithEditor"); } } 
 /// <summary>New Search...</summary> 
 public static string Website_Content_Views_Search_Search_LabelNewSearch { get { return T("Website.Content.Views.Search.Search.LabelNewSearch"); } } 
 /// <summary>Formatted</summary> 
 public static string Website_Content_Views_ViewSource_LabelFormatted { get { return T("Website.Content.Views.ViewSource.LabelFormatted"); } } 
 /// <summary>Raw</summary> 
 public static string Website_Content_Views_ViewSource_LabelRaw { get { return T("Website.Content.Views.ViewSource.LabelRaw"); } } 
 /// <summary>Server Log</summary> 
 public static string ServerLog_LabelTitle { get { return T("ServerLog.LabelTitle"); } } 
 /// <summary>Delete old</summary> 
 public static string ServerLog_LabelButtonDeleteOld { get { return T("ServerLog.LabelButtonDeleteOld"); } } 
 /// <summary>Refresh</summary> 
 public static string ServerLog_LabelButtonRefresh { get { return T("ServerLog.LabelButtonRefresh"); } } 
 /// <summary>No log data available...</summary> 
 public static string ServerLog_EmptyLabel { get { return T("ServerLog.EmptyLabel"); } } 
 /// <summary>Date</summary> 
 public static string ServerLog_LogEntry_DateLabel { get { return T("ServerLog.LogEntry.DateLabel"); } } 
 /// <summary>Message</summary> 
 public static string ServerLog_LogEntry_MessageLabel { get { return T("ServerLog.LogEntry.MessageLabel"); } } 
 /// <summary>Title</summary> 
 public static string ServerLog_LogEntry_TitleLabel { get { return T("ServerLog.LogEntry.TitleLabel"); } } 
 /// <summary>EventType</summary> 
 public static string ServerLog_LogEntry_EventTypeLabel { get { return T("ServerLog.LogEntry.EventTypeLabel"); } } 
 /// <summary>Verbose</summary> 
 public static string ServerLog_Severity_Verbose { get { return T("ServerLog.Severity.Verbose"); } } 
 /// <summary>Information</summary> 
 public static string ServerLog_Severity_Information { get { return T("ServerLog.Severity.Information"); } } 
 /// <summary>Warning</summary> 
 public static string ServerLog_Severity_Warning { get { return T("ServerLog.Severity.Warning"); } } 
 /// <summary>Error</summary> 
 public static string ServerLog_Severity_Error { get { return T("ServerLog.Severity.Error"); } } 
 /// <summary>Critical</summary> 
 public static string ServerLog_Severity_Critical { get { return T("ServerLog.Severity.Critical"); } } 
 /// <summary>Refresh</summary> 
 public static string FunctionDocumentation_LabelButtonRefresh { get { return T("FunctionDocumentation.LabelButtonRefresh"); } } 
 /// <summary>Print</summary> 
 public static string FunctionDocumentation_LabelButtonPrint { get { return T("FunctionDocumentation.LabelButtonPrint"); } } 
 /// <summary>Execution Ended</summary> 
 public static string Website_FlowUICompleted_ExecutionEndedTitle { get { return T("Website.FlowUICompleted.ExecutionEndedTitle"); } } 
 /// <summary>The action executed in this window has ended.</summary> 
 public static string Website_FlowUICompleted_ExecutionEndedMessage { get { return T("Website.FlowUICompleted.ExecutionEndedMessage"); } } 
 /// <summary>Server Error</summary> 
 public static string Website_ServerError_ServerErrorTitle { get { return T("Website.ServerError.ServerErrorTitle"); } } 
 /// <summary>An unfortunate error has occurred.</summary> 
 public static string Website_ServerError_ServerErrorMessage { get { return T("Website.ServerError.ServerErrorMessage"); } } 
 /// <summary>Details</summary> 
 public static string Website_ServerError_ServerErrorDetails { get { return T("Website.ServerError.ServerErrorDetails"); } } 
 /// <summary>License Violation</summary> 
 public static string Website_LicenseViolation_LicenseViolationTitle { get { return T("Website.LicenseViolation.LicenseViolationTitle"); } } 
 /// <summary>The requested action is in violates with your current license.</summary> 
 public static string Website_LicenseViolation_LicenseViolationMessage { get { return T("Website.LicenseViolation.LicenseViolationMessage"); } } 
 /// <summary>Flash options</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelFlashOptions { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelFlashOptions"); } } 
 /// <summary>High</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelHigh { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelHigh"); } } 
 /// <summary>Low</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelLow { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelLow"); } } 
 /// <summary>Autohigh</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelAutohigh { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelAutohigh"); } } 
 /// <summary>Autolow</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelAutolow { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelAutolow"); } } 
 /// <summary>Best</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelBest { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelBest"); } } 
 /// <summary>Window</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelWindow { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelWindow"); } } 
 /// <summary>Opaque</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelOpaque { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelOpaque"); } } 
 /// <summary>Transparent</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelTransparent { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelTransparent"); } } 
 /// <summary>Showall</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelShowall { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelShowall"); } } 
 /// <summary>Noborder</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelNoborder { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelNoborder"); } } 
 /// <summary>Exactfit</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelExactfit { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelExactfit"); } } 
 /// <summary>Auto play</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelAutoPlay { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelAutoPlay"); } } 
 /// <summary>Loop</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelLoop { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelLoop"); } } 
 /// <summary>Show menu</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelShowMenu { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelShowMenu"); } } 
 /// <summary>SWLiveConnect</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelSWLiveConnect { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelSWLiveConnect"); } } 
 /// <summary>Quicktime options</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelQuickTimeOptions { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelQuickTimeOptions"); } } 
 /// <summary>Loop</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelLoop { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelLoop"); } } 
 /// <summary>Cache</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelCache { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelCache"); } } 
 /// <summary>No correction</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelNoCorrection { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelNoCorrection"); } } 
 /// <summary>Kiosk mode</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelKioskMode { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelKioskMode"); } } 
 /// <summary>Play every frame</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelPlayEveryFrame { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelPlayEveryFrame"); } } 
 /// <summary>Auto play</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelAutoPlay { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelAutoPlay"); } } 
 /// <summary>Controller</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelController { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelController"); } } 
 /// <summary>Enable Javascript</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelEnableJavaScript { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelEnableJavaScript"); } } 
 /// <summary>AutoHREF</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelAutoHRef { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelAutoHRef"); } } 
 /// <summary>Target cache</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelTargetCache { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelTargetCache"); } } 
 /// <summary>Shockwave options</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelShockWaveOptions { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelShockWaveOptions"); } } 
 /// <summary>High</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelHigh { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelHigh"); } } 
 /// <summary>Low</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelLow { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelLow"); } } 
 /// <summary>Autohigh</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelAutoHigh { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelAutoHigh"); } } 
 /// <summary>Autolow</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelAutoLow { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelAutoLow"); } } 
 /// <summary>Best</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelBest { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelBest"); } } 
 /// <summary>Window</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelWindow { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelWindow"); } } 
 /// <summary>Opaque</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelOpaque { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelOpaque"); } } 
 /// <summary>Transparent</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelTransparent { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelTransparent"); } } 
 /// <summary>Showall</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelShowAll { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelShowAll"); } } 
 /// <summary>Noborder</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelNoBorder { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelNoBorder"); } } 
 /// <summary>Exactfit</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelExactFit { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelExactFit"); } } 
 /// <summary>Auto play</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelAutoPlay { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelAutoPlay"); } } 
 /// <summary>Loop</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelLoop { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelLoop"); } } 
 /// <summary>Show menu</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelShowMenu { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelShowMenu"); } } 
 /// <summary>SWLiveConnect</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelSWLiveConnect { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelSWLiveConnect"); } } 
 /// <summary>Quicktime options</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelQuickTimeOptions { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelQuickTimeOptions"); } } 
 /// <summary>Auto Start</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelAutoStart { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelAutoStart"); } } 
 /// <summary>Show menu</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelShowMenu { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelShowMenu"); } } 
 /// <summary>Invoke URLs</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelInvokeURLs { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelInvokeURLs"); } } 
 /// <summary>Stretch to fit</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelStretchToFit { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelStretchToFit"); } } 
 /// <summary>Enabled</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelEnabled { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelEnabled"); } } 
 /// <summary>Fullscreen</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelFullScreen { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelFullScreen"); } } 
 /// <summary>Mute</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelMute { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelMute"); } } 
 /// <summary>Windowless video</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelWindowLessVideo { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelWindowLessVideo"); } } 
 /// <summary>Save</summary> 
 public static string Website_App_LabelSave { get { return T("Website.App.LabelSave"); } } 
 /// <summary>Save and Publish</summary> 
 public static string Website_App_LabelSaveAndPublish { get { return T("Website.App.LabelSaveAndPublish"); } } 
 /// <summary>Close Tab</summary> 
 public static string Website_App_LabelCloseTab { get { return T("Website.App.LabelCloseTab"); } } 
 /// <summary>Close Others</summary> 
 public static string Website_App_LabelCloseOthers { get { return T("Website.App.LabelCloseOthers"); } } 
 /// <summary>Refresh View</summary> 
 public static string Website_App_LabelRefreshView { get { return T("Website.App.LabelRefreshView"); } } 
 /// <summary>Make Dirty</summary> 
 public static string Website_App_LabelMakeDirty { get { return T("Website.App.LabelMakeDirty"); } } 
 /// <summary>View Source</summary> 
 public static string Website_App_LabelViewSource { get { return T("Website.App.LabelViewSource"); } } 
 /// <summary>View Generated</summary> 
 public static string Website_App_LabelViewGenerated { get { return T("Website.App.LabelViewGenerated"); } } 
 /// <summary>View Serialized</summary> 
 public static string Website_App_LabelViewSerialized { get { return T("Website.App.LabelViewSerialized"); } } 
 /// <summary>Close</summary> 
 public static string Website_App_LabelClose { get { return T("Website.App.LabelClose"); } } 
 /// <summary>File</summary> 
 public static string Website_App_LabelFile { get { return T("Website.App.LabelFile"); } } 
 /// <summary>Close</summary> 
 public static string Website_App_LabelFileClose { get { return T("Website.App.LabelFileClose"); } } 
 /// <summary>Close All</summary> 
 public static string Website_App_LabelFileCloseAll { get { return T("Website.App.LabelFileCloseAll"); } } 
 /// <summary>Save All...</summary> 
 public static string Website_App_LabelFileSaveAll { get { return T("Website.App.LabelFileSaveAll"); } } 
 /// <summary>Exit</summary> 
 public static string Website_App_LabelFileExit { get { return T("Website.App.LabelFileExit"); } } 
 /// <summary>View</summary> 
 public static string Website_App_LabelView { get { return T("Website.App.LabelView"); } } 
 /// <summary>Composite Start</summary> 
 public static string Website_App_LabelViewCompositeStart { get { return T("Website.App.LabelViewCompositeStart"); } } 
 /// <summary>System Log</summary> 
 public static string Website_App_LabelSystemLog { get { return T("Website.App.LabelSystemLog"); } } 
 /// <summary>Developer Panel</summary> 
 public static string Website_App_LabelDeveloperPanel { get { return T("Website.App.LabelDeveloperPanel"); } } 
 /// <summary>Tools</summary> 
 public static string Website_App_LabelTools { get { return T("Website.App.LabelTools"); } } 
 /// <summary>Help</summary> 
 public static string Website_App_LabelHelp { get { return T("Website.App.LabelHelp"); } } 
 /// <summary>Help Contents</summary> 
 public static string Website_App_LabelHelpContents { get { return T("Website.App.LabelHelpContents"); } } 
 /// <summary>Provide Feedback...</summary> 
 public static string Website_App_LabelFeedback { get { return T("Website.App.LabelFeedback"); } } 
 /// <summary>About Composite C1</summary> 
 public static string Website_App_LabelAboutComposite { get { return T("Website.App.LabelAboutComposite"); } } 
 /// <summary>Cut</summary> 
 public static string Website_App_LabelCut { get { return T("Website.App.LabelCut"); } } 
 /// <summary>Copy</summary> 
 public static string Website_App_LabelCopy { get { return T("Website.App.LabelCopy"); } } 
 /// <summary>Paste</summary> 
 public static string Website_App_LabelPaste { get { return T("Website.App.LabelPaste"); } } 
 /// <summary>Refresh</summary> 
 public static string Website_App_LabelRefresh { get { return T("Website.App.LabelRefresh"); } } 
 /// <summary>Loading...</summary> 
 public static string Website_App_LabelLoading { get { return T("Website.App.LabelLoading"); } } 
 /// <summary>Loaded</summary> 
 public static string Website_App_LabelLoaded { get { return T("Website.App.LabelLoaded"); } } 
 /// <summary>Saved</summary> 
 public static string Website_App_LabelSaved { get { return T("Website.App.LabelSaved"); } } 
 /// <summary>Minimize</summary> 
 public static string Website_App_ToolTipMinimize { get { return T("Website.App.ToolTipMinimize"); } } 
 /// <summary>Maximize</summary> 
 public static string Website_App_ToolTipMaximize { get { return T("Website.App.ToolTipMaximize"); } } 
 /// <summary>Restore</summary> 
 public static string Website_App_ToolTipUnMaximize { get { return T("Website.App.ToolTipUnMaximize"); } } 
 /// <summary>Restore</summary> 
 public static string Website_App_ToolTipUnMinimize { get { return T("Website.App.ToolTipUnMinimize"); } } 
 /// <summary>Close</summary> 
 public static string Website_App_ToolTipClose { get { return T("Website.App.ToolTipClose"); } } 
 /// <summary>Opening {0}...</summary> 
 public static string Website_App_StatusBar_Opening(string parameter0) { return string.Format(T("Website.App.StatusBar.Opening"), parameter0); } 
 /// <summary>Refreshing {0}...</summary> 
 public static string Website_App_StatusBar_Refreshing(string parameter0) { return string.Format(T("Website.App.StatusBar.Refreshing"), parameter0); } 
 /// <summary>Loading {0}...</summary> 
 public static string Website_App_StatusBar_Loading(string parameter0) { return string.Format(T("Website.App.StatusBar.Loading"), parameter0); } 
 /// <summary>Error</summary> 
 public static string Website_App_StatusBar_Error { get { return T("Website.App.StatusBar.Error"); } } 
 /// <summary>Warning</summary> 
 public static string Website_App_StatusBar_Warn { get { return T("Website.App.StatusBar.Warn"); } } 
 /// <summary>Working...</summary> 
 public static string Website_App_StatusBar_Busy { get { return T("Website.App.StatusBar.Busy"); } } 
 /// <summary>Ready!</summary> 
 public static string Website_App_StatusBar_Ready { get { return T("Website.App.StatusBar.Ready"); } } 
 /// <summary>Error in</summary> 
 public static string Website_App_StatusBar_ErrorInField { get { return T("Website.App.StatusBar.ErrorInField"); } } 
 /// <summary>Add New Media File</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_Layout_Label { get { return T("Website.Forms.Administrative.AddNewMediaFile.Layout.Label"); } } 
 /// <summary>Media Properties</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_FieldGroup_Label { get { return T("Website.Forms.Administrative.AddNewMediaFile.FieldGroup.Label"); } } 
 /// <summary>Filename</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_FileUpload_Label { get { return T("Website.Forms.Administrative.AddNewMediaFile.FileUpload.Label"); } } 
 /// <summary>Select/enter the filename to upload</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_FileUpload_Help { get { return T("Website.Forms.Administrative.AddNewMediaFile.FileUpload.Help"); } } 
 /// <summary>Allow overwrite</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_OverwriteCheckBox_Label { get { return T("Website.Forms.Administrative.AddNewMediaFile.OverwriteCheckBox.Label"); } } 
 /// <summary>Replace existing file</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_OverwriteCheckBox_Help { get { return T("Website.Forms.Administrative.AddNewMediaFile.OverwriteCheckBox.Help"); } } 
 /// <summary>Filename</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_FilenameTextBox_Label { get { return T("Website.Forms.Administrative.AddNewMediaFile.FilenameTextBox.Label"); } } 
 /// <summary>The name of the file in the media library</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_FilenameTextBox_Help { get { return T("Website.Forms.Administrative.AddNewMediaFile.FilenameTextBox.Help"); } } 
 /// <summary>Title</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_TitleTextBox_Label { get { return T("Website.Forms.Administrative.AddNewMediaFile.TitleTextBox.Label"); } } 
 /// <summary>Use this field for an image title</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_TitleTextBox_Help { get { return T("Website.Forms.Administrative.AddNewMediaFile.TitleTextBox.Help"); } } 
 /// <summary>Description</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_DescriptionTextBox_Label { get { return T("Website.Forms.Administrative.AddNewMediaFile.DescriptionTextBox.Label"); } } 
 /// <summary>Use this field for a short description of the image</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_DescriptionTextBox_Help { get { return T("Website.Forms.Administrative.AddNewMediaFile.DescriptionTextBox.Help"); } } 
 /// <summary>Please select a file to upload</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_MissingUploadedFile_Message { get { return T("Website.Forms.Administrative.AddNewMediaFile.MissingUploadedFile.Message"); } } 
 /// <summary>A file with the same name exists. Check allow overwrite or change the filename</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_FileExists_Message { get { return T("Website.Forms.Administrative.AddNewMediaFile.FileExists.Message"); } } 
 /// <summary>The total length of the filename (folder and filename) is too long</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_TotalFilenameToLong_Message { get { return T("Website.Forms.Administrative.AddNewMediaFile.TotalFilenameToLong.Message"); } } 
 /// <summary>Add New Media Folder</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_Label_AddNewMediaFolder { get { return T("Website.Forms.Administrative.AddNewMediaFolder.Label.AddNewMediaFolder"); } } 
 /// <summary>Folder Name</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_LabelFolderName { get { return T("Website.Forms.Administrative.AddNewMediaFolder.LabelFolderName"); } } 
 /// <summary></summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_HelpFolderName { get { return T("Website.Forms.Administrative.AddNewMediaFolder.HelpFolderName"); } } 
 /// <summary>Title</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_LabelTitle { get { return T("Website.Forms.Administrative.AddNewMediaFolder.LabelTitle"); } } 
 /// <summary></summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_HelpTitle { get { return T("Website.Forms.Administrative.AddNewMediaFolder.HelpTitle"); } } 
 /// <summary>Description</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_LabelDescription { get { return T("Website.Forms.Administrative.AddNewMediaFolder.LabelDescription"); } } 
 /// <summary></summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_HelpDescription { get { return T("Website.Forms.Administrative.AddNewMediaFolder.HelpDescription"); } } 
 /// <summary>The folder already exists</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_FolderNameAlreadyUsed { get { return T("Website.Forms.Administrative.AddNewMediaFolder.FolderNameAlreadyUsed"); } } 
 /// <summary>The total length of the folder name is too long</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_FolderNameTooLong { get { return T("Website.Forms.Administrative.AddNewMediaFolder.FolderNameTooLong"); } } 
 /// <summary>The folder name can not only be &apos;/&apos; or &apos;\&apos;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_FolderNotOnlySlash { get { return T("Website.Forms.Administrative.AddNewMediaFolder.FolderNotOnlySlash"); } } 
 /// <summary>Upload Multiple Files via a Zip File</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_LabelDialog { get { return T("Website.Forms.Administrative.AddZipMediaFile.LabelDialog"); } } 
 /// <summary>Select Zip file containing files to extract</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_LabelFieldGroup { get { return T("Website.Forms.Administrative.AddZipMediaFile.LabelFieldGroup"); } } 
 /// <summary>Zip file</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_LabelFile { get { return T("Website.Forms.Administrative.AddZipMediaFile.LabelFile"); } } 
 /// <summary>Create a Zip file (right click local folder and select Send to -&gt; Compressed folder) and select it using the Browse button</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_HelpFile { get { return T("Website.Forms.Administrative.AddZipMediaFile.HelpFile"); } } 
 /// <summary>Create folders</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_LabelRecreateStructure { get { return T("Website.Forms.Administrative.AddZipMediaFile.LabelRecreateStructure"); } } 
 /// <summary>Selecting this option will copy the exact folder structure from your Zip file</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_HelpRecreateStructure { get { return T("Website.Forms.Administrative.AddZipMediaFile.HelpRecreateStructure"); } } 
 /// <summary>Extract folders from Zip file</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_LabelRecreateStructureCheckBox { get { return T("Website.Forms.Administrative.AddZipMediaFile.LabelRecreateStructureCheckBox"); } } 
 /// <summary>Overwrite existing</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_LabelOverwriteExsisting { get { return T("Website.Forms.Administrative.AddZipMediaFile.LabelOverwriteExsisting"); } } 
 /// <summary>Selecting this option will overwrite existing files in the media archive with matching file names</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_HelpOverwriteExsisting { get { return T("Website.Forms.Administrative.AddZipMediaFile.HelpOverwriteExsisting"); } } 
 /// <summary>Error</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_Error_Title { get { return T("Website.Forms.Administrative.AddZipMediaFile.Error.Title"); } } 
 /// <summary>Overwrite existing files</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_LabelOverwriteExsistingCheckBox { get { return T("Website.Forms.Administrative.AddZipMediaFile.LabelOverwriteExsistingCheckBox"); } } 
 /// <summary>Please select a file to upload</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_MissingUploadedFile_Message { get { return T("Website.Forms.Administrative.AddZipMediaFile.MissingUploadedFile.Message"); } } 
 /// <summary>Please use the normal upload command to upload .docx files</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_CannotUploadDocxFile { get { return T("Website.Forms.Administrative.AddZipMediaFile.CannotUploadDocxFile"); } } 
 /// <summary>The selected file was not a correct zip file</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_WrongUploadedFile_Message { get { return T("Website.Forms.Administrative.AddZipMediaFile.WrongUploadedFile.Message"); } } 
 /// <summary>Function search</summary> 
 public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelFunctionSearch { get { return T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelFunctionSearch"); } } 
 /// <summary>Keyword</summary> 
 public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelKeyword { get { return T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelKeyword"); } } 
 /// <summary>Write a keyword to search for.</summary> 
 public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelKeywordHelp { get { return T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelKeywordHelp"); } } 
 /// <summary>Return type</summary> 
 public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelReturnType { get { return T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelReturnType"); } } 
 /// <summary>Select a return type to search for.</summary> 
 public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelReturnTypeHelp { get { return T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelReturnTypeHelp"); } } 
 /// <summary>Delete This File?</summary> 
 public static string Website_Forms_Administrative_DeleteMediaFile_LabelFieldGroup { get { return T("Website.Forms.Administrative.DeleteMediaFile.LabelFieldGroup"); } } 
 /// <summary>Delete this file?</summary> 
 public static string Website_Forms_Administrative_DeleteMediaFile_Text { get { return T("Website.Forms.Administrative.DeleteMediaFile.Text"); } } 
 /// <summary>Deleting a file</summary> 
 public static string Website_Forms_Administrative_DeleteMediaFile_DeleteDataConfirmationHeader { get { return T("Website.Forms.Administrative.DeleteMediaFile.DeleteDataConfirmationHeader"); } } 
 /// <summary>There is some referenced data that will also be deleted, do you want to continue?</summary> 
 public static string Website_Forms_Administrative_DeleteMediaFile_DeleteDataConfirmationText { get { return T("Website.Forms.Administrative.DeleteMediaFile.DeleteDataConfirmationText"); } } 
 /// <summary>Delete This Folder?</summary> 
 public static string Website_Forms_Administrative_DeleteMediaFolder_LabelFieldGroup { get { return T("Website.Forms.Administrative.DeleteMediaFolder.LabelFieldGroup"); } } 
 /// <summary>Delete this folder?</summary> 
 public static string Website_Forms_Administrative_DeleteMediaFolder_Text { get { return T("Website.Forms.Administrative.DeleteMediaFolder.Text"); } } 
 /// <summary>This folder contains one or more files or subfolders. Deleting this folder will also delete all sub files and folders. Delete this folder?</summary> 
 public static string Website_Forms_Administrative_DeleteMediaFolder_HasChildringText { get { return T("Website.Forms.Administrative.DeleteMediaFolder.HasChildringText"); } } 
 /// <summary>Media Properties</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_LabelFieldGroup { get { return T("Website.Forms.Administrative.EditMediaFile.LabelFieldGroup"); } } 
 /// <summary>Title</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_LabelTitle { get { return T("Website.Forms.Administrative.EditMediaFile.LabelTitle"); } } 
 /// <summary>Use this field for an image title</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_HelpTitle { get { return T("Website.Forms.Administrative.EditMediaFile.HelpTitle"); } } 
 /// <summary>File Name</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_LabelFileName { get { return T("Website.Forms.Administrative.EditMediaFile.LabelFileName"); } } 
 /// <summary>The entry specified in this field is a part of the image ID</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_HelpFileName { get { return T("Website.Forms.Administrative.EditMediaFile.HelpFileName"); } } 
 /// <summary>Description</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_LabelDescription { get { return T("Website.Forms.Administrative.EditMediaFile.LabelDescription"); } } 
 /// <summary>Use this field for at short description of the image</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_HelpDescription { get { return T("Website.Forms.Administrative.EditMediaFile.HelpDescription"); } } 
 /// <summary>The total length of the filename (folder and filename) is too long</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_TotalFilenameToLong_Message { get { return T("Website.Forms.Administrative.EditMediaFile.TotalFilenameToLong.Message"); } } 
 /// <summary>A file with the same name already exists in this folder.</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_FileExists_Message { get { return T("Website.Forms.Administrative.EditMediaFile.FileExists.Message"); } } 
 /// <summary>Folder Properties</summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_LabelFieldGroup { get { return T("Website.Forms.Administrative.EditMediaFolder.LabelFieldGroup"); } } 
 /// <summary>Folder Name</summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_LabelFolderName { get { return T("Website.Forms.Administrative.EditMediaFolder.LabelFolderName"); } } 
 /// <summary></summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_HelpFolderName { get { return T("Website.Forms.Administrative.EditMediaFolder.HelpFolderName"); } } 
 /// <summary>Title</summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_LabelTitle { get { return T("Website.Forms.Administrative.EditMediaFolder.LabelTitle"); } } 
 /// <summary>Use this field for a folder title</summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_HelpTitle { get { return T("Website.Forms.Administrative.EditMediaFolder.HelpTitle"); } } 
 /// <summary>Description</summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_LabelDescription { get { return T("Website.Forms.Administrative.EditMediaFolder.LabelDescription"); } } 
 /// <summary></summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_HelpDescription { get { return T("Website.Forms.Administrative.EditMediaFolder.HelpDescription"); } } 
 /// <summary>The folder contains a file where the total length of the filename and the new folder name is too long</summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_TotalFilenameToLong_Message { get { return T("Website.Forms.Administrative.EditMediaFolder.TotalFilenameToLong.Message"); } } 
 /// <summary>Draft</summary> 
 public static string Website_Forms_Administrative_EditPage_DraftTransition { get { return T("Website.Forms.Administrative.EditPage.DraftTransition"); } } 
 /// <summary>Awaiting Approval</summary> 
 public static string Website_Forms_Administrative_EditPage_AwaitingApprovalTransition { get { return T("Website.Forms.Administrative.EditPage.AwaitingApprovalTransition"); } } 
 /// <summary>Awaiting Publication</summary> 
 public static string Website_Forms_Administrative_EditPage_AwaitingPublicationTransition { get { return T("Website.Forms.Administrative.EditPage.AwaitingPublicationTransition"); } } 
 /// <summary>Search</summary> 
 public static string Website_Forms_Administrative_ElementKeywordSearch_LabelFieldGroup { get { return T("Website.Forms.Administrative.ElementKeywordSearch.LabelFieldGroup"); } } 
 /// <summary>Keyword</summary> 
 public static string Website_Forms_Administrative_ElementKeywordSearch_LabelKeyword { get { return T("Website.Forms.Administrative.ElementKeywordSearch.LabelKeyword"); } } 
 /// <summary>Write a keyword to search for.</summary> 
 public static string Website_Forms_Administrative_ElementKeywordSearch_LabelSearchKeyword { get { return T("Website.Forms.Administrative.ElementKeywordSearch.LabelSearchKeyword"); } } 
 /// <summary>Upload New Media File</summary> 
 public static string Website_Forms_Administrative_UploadMediaFile_LabelFieldGroup { get { return T("Website.Forms.Administrative.UploadMediaFile.LabelFieldGroup"); } } 
 /// <summary>File name:</summary> 
 public static string Website_Forms_Administrative_UploadMediaFile_LabelFile { get { return T("Website.Forms.Administrative.UploadMediaFile.LabelFile"); } } 
 /// <summary></summary> 
 public static string Website_Forms_Administrative_UploadMediaFile_HelpFile { get { return T("Website.Forms.Administrative.UploadMediaFile.HelpFile"); } } 
 /// <summary>File missing or empty</summary> 
 public static string Website_Forms_Administrative_UploadMediaFile_EmptyFileErrorTitle { get { return T("Website.Forms.Administrative.UploadMediaFile.EmptyFileErrorTitle"); } } 
 /// <summary>No file data was received. Please use the browse button and ensure that the selected file is not empty.</summary> 
 public static string Website_Forms_Administrative_UploadMediaFile_EmptyFileErrorMessage { get { return T("Website.Forms.Administrative.UploadMediaFile.EmptyFileErrorMessage"); } } 
 /// <summary>Upload New Media File to Existing File</summary> 
 public static string Website_Forms_Administrative_UploadNewMediaFile_LabelFieldGroup { get { return T("Website.Forms.Administrative.UploadNewMediaFile.LabelFieldGroup"); } } 
 /// <summary>File name:</summary> 
 public static string Website_Forms_Administrative_UploadNewMediaFile_LabelFile { get { return T("Website.Forms.Administrative.UploadNewMediaFile.LabelFile"); } } 
 /// <summary></summary> 
 public static string Website_Forms_Administrative_UploadNewMediaFile_HelpFile { get { return T("Website.Forms.Administrative.UploadNewMediaFile.HelpFile"); } } 
 /// <summary>Save</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_Document_LabelSave { get { return T("Website.Forms.Administrative.AdministrativeTemplates.Document.LabelSave"); } } 
 /// <summary>Save As...</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_Document_LabelSaveAs { get { return T("Website.Forms.Administrative.AdministrativeTemplates.Document.LabelSaveAs"); } } 
 /// <summary>Previous</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_Wizard_LabelPrevious { get { return T("Website.Forms.Administrative.AdministrativeTemplates.Wizard.LabelPrevious"); } } 
 /// <summary>Next</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_Wizard_LabelNext { get { return T("Website.Forms.Administrative.AdministrativeTemplates.Wizard.LabelNext"); } } 
 /// <summary>Finish</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_Wizard_LabelFinish { get { return T("Website.Forms.Administrative.AdministrativeTemplates.Wizard.LabelFinish"); } } 
 /// <summary>Cancel</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_Wizard_LabelCancel { get { return T("Website.Forms.Administrative.AdministrativeTemplates.Wizard.LabelCancel"); } } 
 /// <summary>OK</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_DataDialog_LabelOk { get { return T("Website.Forms.Administrative.AdministrativeTemplates.DataDialog.LabelOk"); } } 
 /// <summary>Cancel</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_DataDialog_LabelCancel { get { return T("Website.Forms.Administrative.AdministrativeTemplates.DataDialog.LabelCancel"); } } 
 /// <summary>OK</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_ConfirmDialog_LabelOk { get { return T("Website.Forms.Administrative.AdministrativeTemplates.ConfirmDialog.LabelOk"); } } 
 /// <summary>Cancel</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_ConfirmDialog_LabelCancel { get { return T("Website.Forms.Administrative.AdministrativeTemplates.ConfirmDialog.LabelCancel"); } } 
 /// <summary>Input</summary> 
 public static string Website_Misc_SourceCodeViewer_LabelInput { get { return T("Website.Misc.SourceCodeViewer.LabelInput"); } } 
 /// <summary>Output</summary> 
 public static string Website_Misc_SourceCodeViewer_LabelOutput { get { return T("Website.Misc.SourceCodeViewer.LabelOutput"); } } 
 /// <summary>Not allowed.</summary> 
 public static string Website_Misc_Trees_DialogTitle_PasteNotAllowed { get { return T("Website.Misc.Trees.DialogTitle.PasteNotAllowed"); } } 
 /// <summary>Paste not allowed in this context.</summary> 
 public static string Website_Misc_Trees_DialogText_PasteNotAllowed { get { return T("Website.Misc.Trees.DialogText.PasteNotAllowed"); } } 
 /// <summary>Not allowed</summary> 
 public static string Website_Misc_Trees_DialogTitle_PasteTypeNotAllowed { get { return T("Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"); } } 
 /// <summary>Folder won&apos;t accept document type.</summary> 
 public static string Website_Misc_Trees_DialogText_PasteTypeNotAllowed { get { return T("Website.Misc.Trees.DialogText.PasteTypeNotAllowed"); } } 
 /// <summary>Edit Selections</summary> 
 public static string Website_Misc_MultiSelector_LabelEditSelections { get { return T("Website.Misc.MultiSelector.LabelEditSelections"); } } 
 /// <summary>Version information</summary> 
 public static string GenericVersionProcessController_Version { get { return T("GenericVersionProcessController.Version"); } } 
 /// <summary>Show version information</summary> 
 public static string GenericVersionProcessController_VersionToolTip { get { return T("GenericVersionProcessController.VersionToolTip"); } } 
 /// <summary>Select a value...</summary> 
 public static string AspNetUiControl_Selector_SelectValueLabel { get { return T("AspNetUiControl.Selector.SelectValueLabel"); } } 
 /// <summary>&lt; broken reference &gt;...</summary> 
 public static string AspNetUiControl_Selector_BrokenReference { get { return T("AspNetUiControl.Selector.BrokenReference"); } } 
 /// <summary>(no selection)</summary> 
 public static string AspNetUiControl_Selector_NoSelection { get { return T("AspNetUiControl.Selector.NoSelection"); } } 
 /// <summary>No matches for &apos;{0}&apos;</summary> 
 public static string AspNetUiControl_Selector_NoMatchesFor(string parameter0) { return string.Format(T("AspNetUiControl.Selector.NoMatchesFor"), parameter0); } 
 /// <summary>This field contains a broken reference</summary> 
 public static string Validation_BrokenReference { get { return T("Validation.BrokenReference"); } } 
 /// <summary>This field is required.</summary> 
 public static string Validation_RequiredField { get { return T("Validation.RequiredField"); } } 
 /// <summary>Only {0} digit(s) after decimal point allowed</summary> 
 public static string Validation_Decimal_SymbolsAfterPointAllowed(string parameter0) { return string.Format(T("Validation.Decimal.SymbolsAfterPointAllowed"), parameter0); } 
 /// <summary>Only {0} digit(s) before decimal point allowed</summary> 
 public static string Validation_Decimal_SymbolsBeforePointAllowed(string parameter0) { return string.Format(T("Validation.Decimal.SymbolsBeforePointAllowed"), parameter0); } 
 /// <summary>The specified value is either too big or too small. The acceptable range is from -2,147,483,648 to 2,147,483,647</summary> 
 public static string Validation_Int32_Overflow { get { return T("Validation.Int32.Overflow"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Management", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_NameValidation {
 /// <summary>Name can not be an empty string</summary> 
 public static string EmptyName { get { return T("EmptyName"); } } 
 /// <summary>Namespace can not be an empty string</summary> 
 public static string EmptyNamespace { get { return T("EmptyNamespace"); } } 
 /// <summary>Namespace can not contain the same name part multiple times</summary> 
 public static string DuplicateElementNamespace { get { return T("DuplicateElementNamespace"); } } 
 /// <summary>The name &apos;{0}&apos; is not a valid identifier</summary> 
 public static string InvalidIdentifier(string parameter0) { return string.Format(T("InvalidIdentifier"), parameter0); } 
 /// <summary>The name &apos;{0}&apos; is not a valid identifier. Identifiers may not start with digits.</summary> 
 public static string InvalidIdentifierDigit(string parameter0) { return string.Format(T("InvalidIdentifierDigit"), parameter0); } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.NameValidation", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Permissions {
 /// <summary>Read</summary> 
 public static string ReadLabel { get { return T("ReadLabel"); } } 
 /// <summary>Edit</summary> 
 public static string EditLabel { get { return T("EditLabel"); } } 
 /// <summary>Add</summary> 
 public static string AddLabel { get { return T("AddLabel"); } } 
 /// <summary>Delete</summary> 
 public static string DeleteLabel { get { return T("DeleteLabel"); } } 
 /// <summary>Approve</summary> 
 public static string ApproveLabel { get { return T("ApproveLabel"); } } 
 /// <summary>Publish</summary> 
 public static string PublishLabel { get { return T("PublishLabel"); } } 
 /// <summary>Administrate</summary> 
 public static string AdministrateLabel { get { return T("AdministrateLabel"); } } 
 /// <summary>ClearPermissions</summary> 
 public static string ClearPermissionsLabel { get { return T("ClearPermissionsLabel"); } } 
 /// <summary>This operation would remove your administrative permissions from this entity. You can not remove your own administrative permissions.</summary> 
 public static string AdminLockoutMessage { get { return T("AdminLockoutMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Permissions", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_AllFunctionsElementProvider {
 /// <summary>All Functions</summary> 
 public static string Plugins_AllFunctionsElementProvider_FunctionRootFolderLabel { get { return T("Plugins.AllFunctionsElementProvider.FunctionRootFolderLabel"); } } 
 /// <summary>All functions</summary> 
 public static string Plugins_AllFunctionsElementProvider_FunctionRootFolderToolTip { get { return T("Plugins.AllFunctionsElementProvider.FunctionRootFolderToolTip"); } } 
 /// <summary>All Widget Functions</summary> 
 public static string Plugins_AllFunctionsElementProvider_WidgetFunctionRootFolderLabel { get { return T("Plugins.AllFunctionsElementProvider.WidgetFunctionRootFolderLabel"); } } 
 /// <summary>All widget functions</summary> 
 public static string Plugins_AllFunctionsElementProvider_WidgetFunctionRootFolderToolTip { get { return T("Plugins.AllFunctionsElementProvider.WidgetFunctionRootFolderToolTip"); } } 
 /// <summary>Generate Documentation</summary> 
 public static string AllFunctionsElementProvider_GenerateDocumentation { get { return T("AllFunctionsElementProvider.GenerateDocumentation"); } } 
 /// <summary>Generate documentation for all functions below this folder</summary> 
 public static string AllFunctionsElementProvider_GenerateDocumentationTooltip { get { return T("AllFunctionsElementProvider.GenerateDocumentationTooltip"); } } 
 /// <summary>Information</summary> 
 public static string AllFunctionsElementProvider_ViewFunctionInformation { get { return T("AllFunctionsElementProvider.ViewFunctionInformation"); } } 
 /// <summary>View function information</summary> 
 public static string AllFunctionsElementProvider_ViewFunctionInformationTooltip { get { return T("AllFunctionsElementProvider.ViewFunctionInformationTooltip"); } } 
 /// <summary>Test: {0}</summary> 
 public static string FunctionTesterWorkflow_Layout_Label(string parameter0) { return string.Format(T("FunctionTesterWorkflow.Layout.Label"), parameter0); } 
 /// <summary>Functions</summary> 
 public static string FunctionTesterWorkflow_FunctionCalls_Label { get { return T("FunctionTesterWorkflow.FunctionCalls.Label"); } } 
 /// <summary>Results</summary> 
 public static string FunctionTesterWorkflow_Preview_Label { get { return T("FunctionTesterWorkflow.Preview.Label"); } } 
 /// <summary>Runtime</summary> 
 public static string FunctionTesterWorkflow_Runtime_FieldGroup_Label { get { return T("FunctionTesterWorkflow.Runtime.FieldGroup.Label"); } } 
 /// <summary>Settings</summary> 
 public static string FunctionTesterWorkflow_DebugFieldGroup_Label { get { return T("FunctionTesterWorkflow.DebugFieldGroup.Label"); } } 
 /// <summary>Page</summary> 
 public static string FunctionTesterWorkflow_DebugPage_Label { get { return T("FunctionTesterWorkflow.DebugPage.Label"); } } 
 /// <summary>When executing the function, this page is used as current page</summary> 
 public static string FunctionTesterWorkflow_DebugPage_Help { get { return T("FunctionTesterWorkflow.DebugPage.Help"); } } 
 /// <summary>Data scope</summary> 
 public static string FunctionTesterWorkflow_DebugPageDataScope_Label { get { return T("FunctionTesterWorkflow.DebugPageDataScope.Label"); } } 
 /// <summary>When executing the function, this is used as current data scope</summary> 
 public static string FunctionTesterWorkflow_DebugPageDataScope_Help { get { return T("FunctionTesterWorkflow.DebugPageDataScope.Help"); } } 
 /// <summary>Language</summary> 
 public static string FunctionTesterWorkflow_DebugActiveLocale_Label { get { return T("FunctionTesterWorkflow.DebugActiveLocale.Label"); } } 
 /// <summary>When executing the function, this is used as the current language</summary> 
 public static string FunctionTesterWorkflow_DebugActiveLocale_Help { get { return T("FunctionTesterWorkflow.DebugActiveLocale.Help"); } } 
 /// <summary>Administrative</summary> 
 public static string FunctionTesterWorkflow_AdminitrativeScope_Label { get { return T("FunctionTesterWorkflow.AdminitrativeScope.Label"); } } 
 /// <summary>Public</summary> 
 public static string FunctionTesterWorkflow_PublicScope_Label { get { return T("FunctionTesterWorkflow.PublicScope.Label"); } } 
 /// <summary>Test Function</summary> 
 public static string AllFunctionsElementProvider_FunctionTester_Label { get { return T("AllFunctionsElementProvider.FunctionTester.Label"); } } 
 /// <summary>Test function</summary> 
 public static string AllFunctionsElementProvider_FunctionTester_ToolTip { get { return T("AllFunctionsElementProvider.FunctionTester.ToolTip"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_GeneratedDataTypesElementProvider {
 /// <summary>Global Datatypes</summary> 
 public static string GlobalDataFolderLabel { get { return T("GlobalDataFolderLabel"); } } 
 /// <summary>Global datatypes</summary> 
 public static string GlobalDataFolderToolTip { get { return T("GlobalDataFolderToolTip"); } } 
 /// <summary>Website Items</summary> 
 public static string GlobalDataFolderLabel_OnlyGlobalData { get { return T("GlobalDataFolderLabel_OnlyGlobalData"); } } 
 /// <summary>Website Items (Data)</summary> 
 public static string GlobalDataFolderToolTip_OnlyGlobalData { get { return T("GlobalDataFolderToolTip_OnlyGlobalData"); } } 
 /// <summary>Static Datatypes</summary> 
 public static string StaticDataTypesFolderLabel { get { return T("StaticDataTypesFolderLabel"); } } 
 /// <summary>Custom defined interfaces</summary> 
 public static string StaticDataTypesFolderToolTip { get { return T("StaticDataTypesFolderToolTip"); } } 
 /// <summary>Page Datafolders</summary> 
 public static string PageDataFolderDataFolderLabel { get { return T("PageDataFolderDataFolderLabel"); } } 
 /// <summary>Page datafolders</summary> 
 public static string PageDataFolderDataFolderToolTip { get { return T("PageDataFolderDataFolderToolTip"); } } 
 /// <summary>Page Metatypes</summary> 
 public static string PageMetaDataFolderLabel { get { return T("PageMetaDataFolderLabel"); } } 
 /// <summary>Page metatypes</summary> 
 public static string PageMetaDataFolderToolTip { get { return T("PageMetaDataFolderToolTip"); } } 
 /// <summary>Add Datatype</summary> 
 public static string Add { get { return T("Add"); } } 
 /// <summary>Add new global datatype</summary> 
 public static string AddToolTip { get { return T("AddToolTip"); } } 
 /// <summary>List Unpublished Data</summary> 
 public static string ViewUnpublishedItems { get { return T("ViewUnpublishedItems"); } } 
 /// <summary>Get an overview of data that haven&apos;t been published yet</summary> 
 public static string ViewUnpublishedItemsToolTip { get { return T("ViewUnpublishedItemsToolTip"); } } 
 /// <summary>Unpublished data</summary> 
 public static string ViewUnpublishedItems_document_title { get { return T("ViewUnpublishedItems-document-title"); } } 
 /// <summary>The list below display data items which are currently being edited or are ready to be approved / published.</summary> 
 public static string ViewUnpublishedItems_document_description { get { return T("ViewUnpublishedItems-document-description"); } } 
 /// <summary>No unpublished data.</summary> 
 public static string ViewUnpublishedItems_document_empty_label { get { return T("ViewUnpublishedItems-document-empty-label"); } } 
 /// <summary>Add Datafolder</summary> 
 public static string AddDataFolder { get { return T("AddDataFolder"); } } 
 /// <summary>Add new datafolder</summary> 
 public static string AddDataFolderToolTip { get { return T("AddDataFolderToolTip"); } } 
 /// <summary>Add Metatype</summary> 
 public static string AddMetaDataLabel { get { return T("AddMetaDataLabel"); } } 
 /// <summary>Add metatype</summary> 
 public static string AddMetaDataToolTip { get { return T("AddMetaDataToolTip"); } } 
 /// <summary>Edit Datatype</summary> 
 public static string Edit { get { return T("Edit"); } } 
 /// <summary>Edit selected datatype</summary> 
 public static string EditToolTip { get { return T("EditToolTip"); } } 
 /// <summary>Edit</summary> 
 public static string EditDataFolderTypeLabel { get { return T("EditDataFolderTypeLabel"); } } 
 /// <summary>Edit selected datafolder</summary> 
 public static string EditDataFolderTypeToolTip { get { return T("EditDataFolderTypeToolTip"); } } 
 /// <summary>Edit</summary> 
 public static string EditMetaDataTypeLabel { get { return T("EditMetaDataTypeLabel"); } } 
 /// <summary>Edit selected metadata</summary> 
 public static string EditMetaDataTypeToolTip { get { return T("EditMetaDataTypeToolTip"); } } 
 /// <summary>Delete Datatype</summary> 
 public static string Delete { get { return T("Delete"); } } 
 /// <summary>Delete selected datatype</summary> 
 public static string DeleteToolTip { get { return T("DeleteToolTip"); } } 
 /// <summary>Delete</summary> 
 public static string DeleteDataFolderTypeLabel { get { return T("DeleteDataFolderTypeLabel"); } } 
 /// <summary>Delete selected datafolder</summary> 
 public static string DeleteDataFolderTypeToolTip { get { return T("DeleteDataFolderTypeToolTip"); } } 
 /// <summary>Delete</summary> 
 public static string DeleteMetaDataTypeLabel { get { return T("DeleteMetaDataTypeLabel"); } } 
 /// <summary>Delete selected metadata</summary> 
 public static string DeleteMetaDataTypeToolTip { get { return T("DeleteMetaDataTypeToolTip"); } } 
 /// <summary>Edit Form Markup</summary> 
 public static string EditFormMarkup { get { return T("EditFormMarkup"); } } 
 /// <summary>Modify the layout of the data form using markup</summary> 
 public static string EditFormMarkupToolTip { get { return T("EditFormMarkupToolTip"); } } 
 /// <summary>Enable Localization</summary> 
 public static string EnableLocalization { get { return T("EnableLocalization"); } } 
 /// <summary>Enable localization</summary> 
 public static string EnableLocalizationToolTip { get { return T("EnableLocalizationToolTip"); } } 
 /// <summary>Disable Localization</summary> 
 public static string DisableLocalization { get { return T("DisableLocalization"); } } 
 /// <summary>Disable localization</summary> 
 public static string DisableLocalizationToolTip { get { return T("DisableLocalizationToolTip"); } } 
 /// <summary>Not yet approved or published</summary> 
 public static string DisabledData { get { return T("DisabledData"); } } 
 /// <summary>(undefined [{0}])</summary> 
 public static string UndefinedLabelTemplate(string parameter0) { return string.Format(T("UndefinedLabelTemplate"), parameter0); } 
 /// <summary>(undefined)</summary> 
 public static string UndefinedDataLavelTemplate { get { return T("UndefinedDataLavelTemplate"); } } 
 /// <summary>Show in Content perspective</summary> 
 public static string ShowInContent { get { return T("ShowInContent"); } } 
 /// <summary>Show in Content perspective</summary> 
 public static string ShowInContentToolTip { get { return T("ShowInContentToolTip"); } } 
 /// <summary>Add Data</summary> 
 public static string AddData { get { return T("AddData"); } } 
 /// <summary>Add new data</summary> 
 public static string AddDataToolTip { get { return T("AddDataToolTip"); } } 
 /// <summary>Edit Data</summary> 
 public static string EditData { get { return T("EditData"); } } 
 /// <summary>Edit selected data</summary> 
 public static string EditDataToolTip { get { return T("EditDataToolTip"); } } 
 /// <summary>Delete Data</summary> 
 public static string DeleteData { get { return T("DeleteData"); } } 
 /// <summary>Delete selected data</summary> 
 public static string DeleteDataToolTip { get { return T("DeleteDataToolTip"); } } 
 /// <summary>Translate Data</summary> 
 public static string LocalizeData { get { return T("LocalizeData"); } } 
 /// <summary>Translate selected data</summary> 
 public static string LocalizeDataToolTip { get { return T("LocalizeDataToolTip"); } } 
 /// <summary>Publication State</summary> 
 public static string LabelPublicationState { get { return T("LabelPublicationState"); } } 
 /// <summary>Draft</summary> 
 public static string DraftTransition { get { return T("DraftTransition"); } } 
 /// <summary>Awaiting Approval</summary> 
 public static string AwaitingApprovalTransition { get { return T("AwaitingApprovalTransition"); } } 
 /// <summary>New Datatype</summary> 
 public static string AddNewInterfaceTypeStep1_DocumentTitle { get { return T("AddNewInterfaceTypeStep1.DocumentTitle"); } } 
 /// <summary>New Page Metatype</summary> 
 public static string AddNewCompositionTypeWorkflow_DocumentTitle { get { return T("AddNewCompositionTypeWorkflow.DocumentTitle"); } } 
 /// <summary>New Page Datafolder</summary> 
 public static string AddNewAggregationTypeWorkflow_DocumentTitle { get { return T("AddNewAggregationTypeWorkflow.DocumentTitle"); } } 
 /// <summary>Settings</summary> 
 public static string EditorCommon_SettingsTab { get { return T("EditorCommon.SettingsTab"); } } 
 /// <summary>Type title</summary> 
 public static string EditorCommon_LabelTitleGroup { get { return T("EditorCommon.LabelTitleGroup"); } } 
 /// <summary>Programmatic naming and services</summary> 
 public static string EditorCommon_LabelProgrammaticNamingAndServices { get { return T("EditorCommon.LabelProgrammaticNamingAndServices"); } } 
 /// <summary>Programmatic naming</summary> 
 public static string EditorCommon_LabelProgrammaticNaming { get { return T("EditorCommon.LabelProgrammaticNaming"); } } 
 /// <summary>Type name</summary> 
 public static string EditorCommon_LabelTypeName { get { return T("EditorCommon.LabelTypeName"); } } 
 /// <summary>The technical name of the data type (ex. Product). This is used to identify this type in code and should not be changed once used externally.</summary> 
 public static string EditorCommon_HelpTypeName { get { return T("EditorCommon.HelpTypeName"); } } 
 /// <summary>Type namespace</summary> 
 public static string EditorCommon_LabelTypeNamespace { get { return T("EditorCommon.LabelTypeNamespace"); } } 
 /// <summary>The namespace (module / category name) of the type. This is used to identify this type in code and should not be changed once used externally.</summary> 
 public static string EditorCommon_HelpTypeNamespace { get { return T("EditorCommon.HelpTypeNamespace"); } } 
 /// <summary>Title</summary> 
 public static string EditorCommon_LabelTitle { get { return T("EditorCommon.LabelTitle"); } } 
 /// <summary>Use this entry to specify a user friendly name. This name is used in most UI.</summary> 
 public static string EditorCommon_HelpTitle { get { return T("EditorCommon.HelpTitle"); } } 
 /// <summary>Fields</summary> 
 public static string EditorCommon_LabelFields { get { return T("EditorCommon.LabelFields"); } } 
 /// <summary>Services</summary> 
 public static string EditorCommon_ServicesLabel { get { return T("EditorCommon.ServicesLabel"); } } 
 /// <summary>Has caching</summary> 
 public static string EditorCommon_HasCaching { get { return T("EditorCommon.HasCaching"); } } 
 /// <summary>Has publishing</summary> 
 public static string EditorCommon_HasPublishing { get { return T("EditorCommon.HasPublishing"); } } 
 /// <summary>Is localizable data</summary> 
 public static string EditorCommon_HasLocalization { get { return T("EditorCommon.HasLocalization"); } } 
 /// <summary>Delete Data?</summary> 
 public static string DeleteGeneratedDataStep1_LabelFieldGroup { get { return T("DeleteGeneratedDataStep1.LabelFieldGroup"); } } 
 /// <summary>Delete data?</summary> 
 public static string DeleteGeneratedDataStep1_Text { get { return T("DeleteGeneratedDataStep1.Text"); } } 
 /// <summary>There is some referenced data that will also be deleted, do you want to continue?</summary> 
 public static string DeleteDataConfirmationText { get { return T("DeleteDataConfirmationText"); } } 
 /// <summary>Delete Datatype</summary> 
 public static string DeleteGeneratedInterfaceStep1_LabelFieldGroup { get { return T("DeleteGeneratedInterfaceStep1.LabelFieldGroup"); } } 
 /// <summary>Delete the datatype</summary> 
 public static string DeleteGeneratedInterfaceStep1_Text { get { return T("DeleteGeneratedInterfaceStep1.Text"); } } 
 /// <summary>Cascade delete error</summary> 
 public static string CascadeDeleteErrorTitle { get { return T("CascadeDeleteErrorTitle"); } } 
 /// <summary>The type is referenced by another type that does not allow cascade deletes. This operation is halted</summary> 
 public static string CascadeDeleteErrorMessage { get { return T("CascadeDeleteErrorMessage"); } } 
 /// <summary>Delete Datatype</summary> 
 public static string DeleteAggregationTypeWorkflow_LabelFieldGroup { get { return T("DeleteAggregationTypeWorkflow.LabelFieldGroup"); } } 
 /// <summary>Delete the datatype</summary> 
 public static string DeleteAggregationTypeWorkflow_Text { get { return T("DeleteAggregationTypeWorkflow.Text"); } } 
 /// <summary>Error</summary> 
 public static string DeleteAggregationTypeWorkflow_ErrorTitle { get { return T("DeleteAggregationTypeWorkflow.ErrorTitle"); } } 
 /// <summary>Cannot delete type &apos;{0}&apos; since it is used by a page type.</summary> 
 public static string DeleteAggregationTypeWorkflow_IsUsedByPageType(string parameter0) { return string.Format(T("DeleteAggregationTypeWorkflow.IsUsedByPageType"), parameter0); } 
 /// <summary>Delete Datatype</summary> 
 public static string DeleteCompositionTypeWorkflow_LabelFieldGroup { get { return T("DeleteCompositionTypeWorkflow.LabelFieldGroup"); } } 
 /// <summary>Delete the datatype</summary> 
 public static string DeleteCompositionTypeWorkflow_Text { get { return T("DeleteCompositionTypeWorkflow.Text"); } } 
 /// <summary>Error</summary> 
 public static string DeleteCompositionTypeWorkflow_ErrorTitle { get { return T("DeleteCompositionTypeWorkflow.ErrorTitle"); } } 
 /// <summary>Cannot delete type &apos;{0}&apos; since there&apos;re types that referenced to it.</summary> 
 public static string DeleteCompositionTypeWorkflow_TypeIsReferenced(string parameter0) { return string.Format(T("DeleteCompositionTypeWorkflow.TypeIsReferenced"), parameter0); } 
 /// <summary>Cannot delete type &apos;{0}&apos; since it is used by a page type.</summary> 
 public static string DeleteCompositionTypeWorkflow_IsUsedByPageType(string parameter0) { return string.Format(T("DeleteCompositionTypeWorkflow.IsUsedByPageType"), parameter0); } 
 /// <summary>To Xml</summary> 
 public static string ToXmlLabel { get { return T("ToXmlLabel"); } } 
 /// <summary>To Xml</summary> 
 public static string ToXmlToolTip { get { return T("ToXmlToolTip"); } } 
 /// <summary>Enable Localization</summary> 
 public static string EnableTypeLocalizationWorkflow_Dialog_Label { get { return T("EnableTypeLocalizationWorkflow.Dialog.Label"); } } 
 /// <summary>Enable localization</summary> 
 public static string EnableTypeLocalizationWorkflow_Step1_FieldGroup_Label { get { return T("EnableTypeLocalizationWorkflow.Step1.FieldGroup.Label"); } } 
 /// <summary>Move existing data to ...</summary> 
 public static string EnableTypeLocalizationWorkflow_Step1_CultureSelector_Label { get { return T("EnableTypeLocalizationWorkflow.Step1.CultureSelector.Label"); } } 
 /// <summary>When you enable &apos;localization&apos; on a data type, all data must belong to a language. Select the language existing data should now be moved to.</summary> 
 public static string EnableTypeLocalizationWorkflow_Step1_CultureSelector_Help { get { return T("EnableTypeLocalizationWorkflow.Step1.CultureSelector.Help"); } } 
 /// <summary>Confirmation</summary> 
 public static string EnableTypeLocalizationWorkflow_Step2_Title { get { return T("EnableTypeLocalizationWorkflow.Step2.Title"); } } 
 /// <summary>Data type will be localized and data copied to selected locale. Click Finish to continue.</summary> 
 public static string EnableTypeLocalizationWorkflow_Step2_Description { get { return T("EnableTypeLocalizationWorkflow.Step2.Description"); } } 
 /// <summary>Warning</summary> 
 public static string EnableTypeLocalizationWorkflow_Step3_Title { get { return T("EnableTypeLocalizationWorkflow.Step3.Title"); } } 
 /// <summary>There&apos;s some datatypes which have references to the type. While localizing the data will be copied to all languages in order to prevent appearing of broken references.</summary> 
 public static string EnableTypeLocalizationWorkflow_Step3_Description { get { return T("EnableTypeLocalizationWorkflow.Step3.Description"); } } 
 /// <summary>Missing active locales</summary> 
 public static string EnableTypeLocalizationWorkflow_Abort_Title { get { return T("EnableTypeLocalizationWorkflow.Abort.Title"); } } 
 /// <summary>There are no added active locales. Add at least one before localization this datatype.</summary> 
 public static string EnableTypeLocalizationWorkflow_Abort_Description { get { return T("EnableTypeLocalizationWorkflow.Abort.Description"); } } 
 /// <summary>Disable Localization</summary> 
 public static string DisableTypeLocalizationWorkflow_Dialog_Label { get { return T("DisableTypeLocalizationWorkflow.Dialog.Label"); } } 
 /// <summary>Disable localization</summary> 
 public static string DisableTypeLocalizationWorkflow_Step1_FieldGroup_Label { get { return T("DisableTypeLocalizationWorkflow.Step1.FieldGroup.Label"); } } 
 /// <summary>Keep data from ...</summary> 
 public static string DisableTypeLocalizationWorkflow_Step1_CultureSelector_Label { get { return T("DisableTypeLocalizationWorkflow.Step1.CultureSelector.Label"); } } 
 /// <summary>When localization is disabled on a datatype only one translation can be kept. Data from other languages will be lost.</summary> 
 public static string DisableTypeLocalizationWorkflow_Step1_CultureSelector_Help { get { return T("DisableTypeLocalizationWorkflow.Step1.CultureSelector.Help"); } } 
 /// <summary>Confirmation</summary> 
 public static string DisableTypeLocalizationWorkflow_Step2_Title { get { return T("DisableTypeLocalizationWorkflow.Step2.Title"); } } 
 /// <summary>All data from other locales than the one selected will be lost. Click Finish to continue.</summary> 
 public static string DisableTypeLocalizationWorkflow_Step2_Description { get { return T("DisableTypeLocalizationWorkflow.Step2.Description"); } } 
 /// <summary>Failed to translate data</summary> 
 public static string LocalizeDataWorkflow_ShowError_LayoutLabel { get { return T("LocalizeDataWorkflow.ShowError.LayoutLabel"); } } 
 /// <summary>Translation errors</summary> 
 public static string LocalizeDataWorkflow_ShowError_InfoTableCaption { get { return T("LocalizeDataWorkflow.ShowError.InfoTableCaption"); } } 
 /// <summary>This data has already been translated. The translated version belongs to a different group.</summary> 
 public static string LocalizeDataWorkflow_ShowError_AlreadyTranslated { get { return T("LocalizeDataWorkflow.ShowError.AlreadyTranslated"); } } 
 /// <summary>The following fields has a reference to a data type. You should translate these data items before you can translate this data item</summary> 
 public static string LocalizeDataWorkflow_ShowError_Description { get { return T("LocalizeDataWorkflow.ShowError.Description"); } } 
 /// <summary>The field &apos;{0}&apos; is referencing data of type &apos;{1}&apos; with the label &apos;{2}&apos;</summary> 
 public static string LocalizeDataWorkflow_ShowError_FieldErrorFormat(string parameter0,string parameter1,string parameter2) { return string.Format(T("LocalizeDataWorkflow.ShowError.FieldErrorFormat"), parameter0,parameter1,parameter2); } 
 /// <summary>Error</summary> 
 public static string AddNewInterfaceTypeStep1_ErrorTitle { get { return T("AddNewInterfaceTypeStep1.ErrorTitle"); } } 
 /// <summary>Error</summary> 
 public static string EditInterfaceTypeStep1_ErrorTitle { get { return T("EditInterfaceTypeStep1.ErrorTitle"); } } 
 /// <summary>Error</summary> 
 public static string AddNewCompositionTypeWorkflow_ErrorTitle { get { return T("AddNewCompositionTypeWorkflow.ErrorTitle"); } } 
 /// <summary>Error</summary> 
 public static string AddNewAggregationTypeWorkflow_ErrorTitle { get { return T("AddNewAggregationTypeWorkflow.ErrorTitle"); } } 
 /// <summary>Error</summary> 
 public static string EditCompositionTypeWorkflow_ErrorTitle { get { return T("EditCompositionTypeWorkflow.ErrorTitle"); } } 
 /// <summary>Error</summary> 
 public static string EditAggregationTypeWorkflow_ErrorTitle { get { return T("EditAggregationTypeWorkflow.ErrorTitle"); } } 
 /// <summary>XML Result</summary> 
 public static string DataTypeDescriptorToXmlLabel { get { return T("DataTypeDescriptorToXmlLabel"); } } 
 /// <summary>This type has custom form markup</summary> 
 public static string FormMarkupInfo_Dialog_Label { get { return T("FormMarkupInfo.Dialog.Label"); } } 
 /// <summary>Your field changes will not affect the form for editing data. Do &apos;{0}&apos; to change the form or delete the file &apos;{1}&apos;.</summary> 
 public static string FormMarkupInfo_Message(string parameter0,string parameter1) { return string.Format(T("FormMarkupInfo.Message"), parameter0,parameter1); } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_GenericPublishProcessController {
 /// <summary>Send to Draft</summary> 
 public static string SendToDraft { get { return T("SendToDraft"); } } 
 /// <summary></summary> 
 public static string SendToDraftToolTip { get { return T("SendToDraftToolTip"); } } 
 /// <summary>Publish</summary> 
 public static string Publish { get { return T("Publish"); } } 
 /// <summary>Publish to site</summary> 
 public static string PublishToolTip { get { return T("PublishToolTip"); } } 
 /// <summary>Unpublish</summary> 
 public static string Unpublish { get { return T("Unpublish"); } } 
 /// <summary>Set to draft status and remove the published version</summary> 
 public static string UnpublishToolTip { get { return T("UnpublishToolTip"); } } 
 /// <summary>Send for Approval</summary> 
 public static string SendForApproval { get { return T("SendForApproval"); } } 
 /// <summary>Send for approval</summary> 
 public static string SendForApprovalToolTip { get { return T("SendForApprovalToolTip"); } } 
 /// <summary>Send for Publication</summary> 
 public static string SendForPublication { get { return T("SendForPublication"); } } 
 /// <summary>Send for publication</summary> 
 public static string SendForPublicationToolTip { get { return T("SendForPublicationToolTip"); } } 
 /// <summary>Undo Changes</summary> 
 public static string UndoPublishedChanges { get { return T("UndoPublishedChanges"); } } 
 /// <summary>Undo unpublished changes</summary> 
 public static string UndoPublishedChangesToolTip { get { return T("UndoPublishedChangesToolTip"); } } 
 /// <summary>Action Not Possible</summary> 
 public static string ValidationErrorTitle { get { return T("ValidationErrorTitle"); } } 
 /// <summary>The data did not validate with the following errors:</summary> 
 public static string ValidationErrorMessage { get { return T("ValidationErrorMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_LocalizationElementProvider {
 /// <summary>Languages</summary> 
 public static string ElementProvider_RootFolderLabel { get { return T("ElementProvider.RootFolderLabel"); } } 
 /// <summary>Explore and manage installed languages</summary> 
 public static string ElementProvider_RootFolderToolTip { get { return T("ElementProvider.RootFolderToolTip"); } } 
 /// <summary>Default</summary> 
 public static string ElementProvider_DefaultLabel { get { return T("ElementProvider.DefaultLabel"); } } 
 /// <summary>No Languages Available</summary> 
 public static string AddSystemLocaleWorkflow_NoMoreLocalesTitle { get { return T("AddSystemLocaleWorkflow.NoMoreLocalesTitle"); } } 
 /// <summary>You have installed all possible languages.</summary> 
 public static string AddSystemLocaleWorkflow_NoMoreLocalesMessage { get { return T("AddSystemLocaleWorkflow.NoMoreLocalesMessage"); } } 
 /// <summary>Add Language</summary> 
 public static string AddSystemLocaleWorkflow_AddElementActionLabel { get { return T("AddSystemLocaleWorkflow.AddElementActionLabel"); } } 
 /// <summary>Add new language</summary> 
 public static string AddSystemLocaleWorkflow_AddElementActionToolTip { get { return T("AddSystemLocaleWorkflow.AddElementActionToolTip"); } } 
 /// <summary>Add Language</summary> 
 public static string AddSystemLocaleWorkflow_Dialog_Label { get { return T("AddSystemLocaleWorkflow.Dialog.Label"); } } 
 /// <summary>Choose language</summary> 
 public static string AddSystemLocaleWorkflow_FieldGroup_Label { get { return T("AddSystemLocaleWorkflow.FieldGroup.Label"); } } 
 /// <summary>Languages</summary> 
 public static string AddSystemLocaleWorkflow_CultureSelector_Label { get { return T("AddSystemLocaleWorkflow.CultureSelector.Label"); } } 
 /// <summary>The list of available, uninstalled languages. Language packages may be installed for additional options.</summary> 
 public static string AddSystemLocaleWorkflow_CultureSelector_Help { get { return T("AddSystemLocaleWorkflow.CultureSelector.Help"); } } 
 /// <summary>URL mapping name</summary> 
 public static string AddSystemLocaleWorkflow_UrlMappingName_Label { get { return T("AddSystemLocaleWorkflow.UrlMappingName.Label"); } } 
 /// <summary>This string will be inserted into the URL of pages published in a given language. The website &quot;default&quot; language may leave this entry blank.</summary> 
 public static string AddSystemLocaleWorkflow_UrlMappingName_Help { get { return T("AddSystemLocaleWorkflow.UrlMappingName.Help"); } } 
 /// <summary>User access</summary> 
 public static string AddSystemLocaleWorkflow_AllUsersAccess_Label { get { return T("AddSystemLocaleWorkflow.AllUsersAccess.Label"); } } 
 /// <summary>Give access to all users</summary> 
 public static string AddSystemLocaleWorkflow_AllUsersAccess_ItemLabel { get { return T("AddSystemLocaleWorkflow.AllUsersAccess.ItemLabel"); } } 
 /// <summary>If checked, the language will be made available to all registered users for viewing and editing</summary> 
 public static string AddSystemLocaleWorkflow_AllUsersAccess_Help { get { return T("AddSystemLocaleWorkflow.AllUsersAccess.Help"); } } 
 /// <summary>URL mapping name is already in use</summary> 
 public static string AddSystemLocaleWorkflow_UrlMappingName_InUseMessage { get { return T("AddSystemLocaleWorkflow.UrlMappingName.InUseMessage"); } } 
 /// <summary>Edit Language</summary> 
 public static string EditSystemLocaleWorkflow_EditElementActionLabel { get { return T("EditSystemLocaleWorkflow.EditElementActionLabel"); } } 
 /// <summary>Edit language</summary> 
 public static string EditSystemLocaleWorkflow_EditElementActionToolTip { get { return T("EditSystemLocaleWorkflow.EditElementActionToolTip"); } } 
 /// <summary>Edit Language</summary> 
 public static string EditSystemLocaleWorkflow_Dialog_Label { get { return T("EditSystemLocaleWorkflow.Dialog.Label"); } } 
 /// <summary>Language properties</summary> 
 public static string EditSystemLocaleWorkflow_FieldGroup_Label { get { return T("EditSystemLocaleWorkflow.FieldGroup.Label"); } } 
 /// <summary>URL mapping name</summary> 
 public static string EditSystemLocaleWorkflow_UrlMappingName_Label { get { return T("EditSystemLocaleWorkflow.UrlMappingName.Label"); } } 
 /// <summary>URL mapping name</summary> 
 public static string EditSystemLocaleWorkflow_UrlMappingName_Help { get { return T("EditSystemLocaleWorkflow.UrlMappingName.Help"); } } 
 /// <summary>URL mapping name is already in use</summary> 
 public static string EditSystemLocaleWorkflow_UrlMappingName_InUseMessage { get { return T("EditSystemLocaleWorkflow.UrlMappingName.InUseMessage"); } } 
 /// <summary>Set as Default</summary> 
 public static string DefineDefaultActiveLocaleWorkflow_ElementActionLabel { get { return T("DefineDefaultActiveLocaleWorkflow.ElementActionLabel"); } } 
 /// <summary>Set as default language</summary> 
 public static string DefineDefaultActiveLocaleWorkflow_ElementActionToolTip { get { return T("DefineDefaultActiveLocaleWorkflow.ElementActionToolTip"); } } 
 /// <summary>Remove Language</summary> 
 public static string RemoveSystemLocaleWorkflow_RemoveElementActionLabel { get { return T("RemoveSystemLocaleWorkflow.RemoveElementActionLabel"); } } 
 /// <summary>Remove language</summary> 
 public static string RemoveSystemLocaleWorkflow_RemoveElementActionToolTip { get { return T("RemoveSystemLocaleWorkflow.RemoveElementActionToolTip"); } } 
 /// <summary>Remove Language?</summary> 
 public static string RemoveSystemLocaleWorkflow_Dialog_Label { get { return T("RemoveSystemLocaleWorkflow.Dialog.Label"); } } 
 /// <summary>Cannot Remove Last Language</summary> 
 public static string RemoveSystemLocaleWorkflow_Abort_Title { get { return T("RemoveSystemLocaleWorkflow.Abort.Title"); } } 
 /// <summary>You are about to remove a language that is the only language for one or more users. Please add other languages to these users and try again.</summary> 
 public static string RemoveSystemLocaleWorkflow_Abort_Description { get { return T("RemoveSystemLocaleWorkflow.Abort.Description"); } } 
 /// <summary>Remove this language?</summary> 
 public static string RemoveSystemLocaleWorkflow_Confirm_Description { get { return T("RemoveSystemLocaleWorkflow.Confirm.Description"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_MasterPagePageTemplate {
 /// <summary>Add New Master Page</summary> 
 public static string AddNewMasterPagePageTemplateWorkflow_LabelDialog { get { return T("AddNewMasterPagePageTemplateWorkflow.LabelDialog"); } } 
 /// <summary>Edit Master Page</summary> 
 public static string EditMasterPageAction_Label { get { return T("EditMasterPageAction.Label"); } } 
 /// <summary>Edit source code of the master page</summary> 
 public static string EditMasterPageAction_ToolTip { get { return T("EditMasterPageAction.ToolTip"); } } 
 /// <summary>Delete</summary> 
 public static string DeleteMasterPageAction_Label { get { return T("DeleteMasterPageAction.Label"); } } 
 /// <summary>Delete page template</summary> 
 public static string DeleteMasterPageAction_ToolTip { get { return T("DeleteMasterPageAction.ToolTip"); } } 
 /// <summary>Validation error</summary> 
 public static string EditTemplate_Validation_DialogTitle { get { return T("EditTemplate.Validation.DialogTitle"); } } 
 /// <summary>Compilation failed: {0}</summary> 
 public static string EditTemplate_Validation_CompilationFailed(string parameter0) { return string.Format(T("EditTemplate.Validation.CompilationFailed"), parameter0); } 
 /// <summary>Page template class does not inherit &apos;{0}&apos;</summary> 
 public static string EditTemplate_Validation_IncorrectBaseClass(string parameter0) { return string.Format(T("EditTemplate.Validation.IncorrectBaseClass"), parameter0); } 
 /// <summary>Failed to evaluate page template property &apos;{0}&apos;. Exception: {1}</summary> 
 public static string EditTemplate_Validation_PropertyError(string parameter0,string parameter1) { return string.Format(T("EditTemplate.Validation.PropertyError"), parameter0,parameter1); } 
 /// <summary>It is not allowed to change the template ID through the current workflow. The original template ID is &apos;{0}&apos;</summary> 
 public static string EditTemplate_Validation_TemplateIdChanged(string parameter0) { return string.Format(T("EditTemplate.Validation.TemplateIdChanged"), parameter0); } 
 /// <summary>Add New Master Page Template</summary> 
 public static string AddNewMasterPagePageTemplate_LabelDialog { get { return T("AddNewMasterPagePageTemplate.LabelDialog"); } } 
 /// <summary>Master Page Template</summary> 
 public static string AddNewMasterPagePageTemplate_LabelFieldGroup { get { return T("AddNewMasterPagePageTemplate.LabelFieldGroup"); } } 
 /// <summary>Template Title</summary> 
 public static string AddNewMasterPagePageTemplate_LabelTemplateTitle { get { return T("AddNewMasterPagePageTemplate.LabelTemplateTitle"); } } 
 /// <summary>The title identifies this template in lists. Consider selecting a short but meaningful name.</summary> 
 public static string AddNewMasterPagePageTemplate_LabelTemplateTitleHelp { get { return T("AddNewMasterPagePageTemplate.LabelTemplateTitleHelp"); } } 
 /// <summary>Copy from</summary> 
 public static string AddNewMasterPagePageTemplate_LabelCopyFrom { get { return T("AddNewMasterPagePageTemplate.LabelCopyFrom"); } } 
 /// <summary>You can copy the markup from another Layout Template by selecting it in this list.</summary> 
 public static string AddNewMasterPagePageTemplate_LabelCopyFromHelp { get { return T("AddNewMasterPagePageTemplate.LabelCopyFromHelp"); } } 
 /// <summary>(New template)</summary> 
 public static string AddNewMasterPagePageTemplate_LabelCopyFromEmptyOption { get { return T("AddNewMasterPagePageTemplate.LabelCopyFromEmptyOption"); } } 
 /// <summary>Title already used</summary> 
 public static string AddNewMasterPagePageTemplateWorkflow_TitleInUseTitle { get { return T("AddNewMasterPagePageTemplateWorkflow.TitleInUseTitle"); } } 
 /// <summary>The title is too long (used as part of a filename).</summary> 
 public static string AddNewMasterPagePageTemplateWorkflow_TitleTooLong { get { return T("AddNewMasterPagePageTemplateWorkflow.TitleTooLong"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.MasterPagePageTemplate", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_MethodBasedFunctionProviderElementProvider {
 /// <summary>C# Functions</summary> 
 public static string RootFolderLabel { get { return T("RootFolderLabel"); } } 
 /// <summary>Method functions</summary> 
 public static string RootFolderToolTip { get { return T("RootFolderToolTip"); } } 
 /// <summary>Delete This Function</summary> 
 public static string DeleteFunction_LabelFieldGroup { get { return T("DeleteFunction.LabelFieldGroup"); } } 
 /// <summary>Delete this function</summary> 
 public static string DeleteFunction_Text { get { return T("DeleteFunction.Text"); } } 
 /// <summary>Add External C# function</summary> 
 public static string Add { get { return T("Add"); } } 
 /// <summary>Add an external C# method based function.</summary> 
 public static string AddToolTip { get { return T("AddToolTip"); } } 
 /// <summary>Add Inline C# function</summary> 
 public static string Create { get { return T("Create"); } } 
 /// <summary>Add an inline C# method based function.</summary> 
 public static string CreateToolTip { get { return T("CreateToolTip"); } } 
 /// <summary>Edit</summary> 
 public static string Edit { get { return T("Edit"); } } 
 /// <summary>Edit Function.</summary> 
 public static string EditToolTip { get { return T("EditToolTip"); } } 
 /// <summary>Delete</summary> 
 public static string Delete { get { return T("Delete"); } } 
 /// <summary>Delete Function.</summary> 
 public static string DeleteToolTip { get { return T("DeleteToolTip"); } } 
 /// <summary>Add new method based function</summary> 
 public static string AddNewMethodBasedFunction_LabelFieldGroup { get { return T("AddNewMethodBasedFunction.LabelFieldGroup"); } } 
 /// <summary>Type</summary> 
 public static string AddNewMethodBasedFunctionStep1_LabelType { get { return T("AddNewMethodBasedFunctionStep1.LabelType"); } } 
 /// <summary>The type that contains the method in question</summary> 
 public static string AddNewMethodBasedFunctionStep1_LabelTypeHelp { get { return T("AddNewMethodBasedFunctionStep1.LabelTypeHelp"); } } 
 /// <summary>Method name</summary> 
 public static string AddNewMethodBasedFunctionStep2_LabelMethodName { get { return T("AddNewMethodBasedFunctionStep2.LabelMethodName"); } } 
 /// <summary></summary> 
 public static string AddNewMethodBasedFunctionStep2_HelpMethodName { get { return T("AddNewMethodBasedFunctionStep2.HelpMethodName"); } } 
 /// <summary>Method Name</summary> 
 public static string AddNewMethodBasedFunctionStep3_LabelMethodName { get { return T("AddNewMethodBasedFunctionStep3.LabelMethodName"); } } 
 /// <summary></summary> 
 public static string AddNewMethodBasedFunctionStep3_HelpMethodName { get { return T("AddNewMethodBasedFunctionStep3.HelpMethodName"); } } 
 /// <summary>Namespace Name</summary> 
 public static string AddNewMethodBasedFunctionStep3_LabelNamespaceName { get { return T("AddNewMethodBasedFunctionStep3.LabelNamespaceName"); } } 
 /// <summary></summary> 
 public static string AddNewMethodBasedFunctionStep3_HelpNamespaceName { get { return T("AddNewMethodBasedFunctionStep3.HelpNamespaceName"); } } 
 /// <summary>Error</summary> 
 public static string AddNewMethodBasedFunctionStep3_LabelError { get { return T("AddNewMethodBasedFunctionStep3.LabelError"); } } 
 /// <summary>Cascade delete error</summary> 
 public static string CascadeDeleteErrorTitle { get { return T("CascadeDeleteErrorTitle"); } } 
 /// <summary>The type is referenced by another type that does not allow cascade deletes. This operation is halted</summary> 
 public static string CascadeDeleteErrorMessage { get { return T("CascadeDeleteErrorMessage"); } } 
 /// <summary>Could not find type</summary> 
 public static string AddFunction_CouldNotFindType { get { return T("AddFunction.CouldNotFindType"); } } 
 /// <summary>The type does not contain any valid method</summary> 
 public static string AddFunction_TypeHasNoValidMethod { get { return T("AddFunction.TypeHasNoValidMethod"); } } 
 /// <summary>The type is marked as either abstract or static. Calling methods on abstract or static types is not supported.</summary> 
 public static string AddFunction_TypeIsAbstractOrStatic { get { return T("AddFunction.TypeIsAbstractOrStatic"); } } 
 /// <summary>The type must not have overloads</summary> 
 public static string AddFunction_TypeMustNotHaveOverloads { get { return T("AddFunction.TypeMustNotHaveOverloads"); } } 
 /// <summary>Method name must be non-empty</summary> 
 public static string AddFunction_MethodNameIsEmpty { get { return T("AddFunction.MethodNameIsEmpty"); } } 
 /// <summary>Namespace must be like A.B.C - not start and end with .</summary> 
 public static string AddFunction_InvalidNamespace { get { return T("AddFunction.InvalidNamespace"); } } 
 /// <summary>The function name &apos;{0}&apos; is already used</summary> 
 public static string AddFunction_NameAlreadyUsed(string parameter0) { return string.Format(T("AddFunction.NameAlreadyUsed"), parameter0); } 
 /// <summary>Edit Method Based Query</summary> 
 public static string EditMethodBasedFunction_LabelFieldGroup { get { return T("EditMethodBasedFunction.LabelFieldGroup"); } } 
 /// <summary>Method Name</summary> 
 public static string EditMethodBasedFunction_LabelMethodName { get { return T("EditMethodBasedFunction.LabelMethodName"); } } 
 /// <summary>The name that the function should be know under.</summary> 
 public static string EditMethodBasedFunction_LabelMethodNameHelp { get { return T("EditMethodBasedFunction.LabelMethodNameHelp"); } } 
 /// <summary>Namespace Name</summary> 
 public static string EditMethodBasedFunction_LabelNamespaceName { get { return T("EditMethodBasedFunction.LabelNamespaceName"); } } 
 /// <summary>The namespace to place the method under.</summary> 
 public static string EditMethodBasedFunction_LabelNamespaceNameHelp { get { return T("EditMethodBasedFunction.LabelNamespaceNameHelp"); } } 
 /// <summary>Type</summary> 
 public static string EditMethodBasedFunction_LabelType { get { return T("EditMethodBasedFunction.LabelType"); } } 
 /// <summary>The type that contains the method in question.</summary> 
 public static string EditMethodBasedFunction_LabelTypeHelp { get { return T("EditMethodBasedFunction.LabelTypeHelp"); } } 
 /// <summary>Method</summary> 
 public static string EditMethodBasedFunction_LabelMethod { get { return T("EditMethodBasedFunction.LabelMethod"); } } 
 /// <summary>The method to invoke on the type.</summary> 
 public static string EditMethodBasedFunction_LabelMethodHelp { get { return T("EditMethodBasedFunction.LabelMethodHelp"); } } 
 /// <summary>Error</summary> 
 public static string EditMethodBasedFunction_LabelError { get { return T("EditMethodBasedFunction.LabelError"); } } 
 /// <summary>Method name must be non-empty</summary> 
 public static string EditFunction_MethodNameEmpty { get { return T("EditFunction.MethodNameEmpty"); } } 
 /// <summary>Namespace must not start and end with . - example A.B.C</summary> 
 public static string EditFunction_InvalidNamespace { get { return T("EditFunction.InvalidNamespace"); } } 
 /// <summary>Could not find type</summary> 
 public static string EditFunction_TypeNotFound { get { return T("EditFunction.TypeNotFound"); } } 
 /// <summary>The type does not contain the method</summary> 
 public static string EditFunction_MethodNotInType { get { return T("EditFunction.MethodNotInType"); } } 
 /// <summary>The type does not contain any valid method</summary> 
 public static string EditFunction_NoValidMethod { get { return T("EditFunction.NoValidMethod"); } } 
 /// <summary>The type must not have overloads</summary> 
 public static string EditFunction_MethodOverloadsNotAllowed { get { return T("EditFunction.MethodOverloadsNotAllowed"); } } 
 /// <summary>Settings</summary> 
 public static string AddInlineFunctionWorkflow_FieldGroup_Label { get { return T("AddInlineFunctionWorkflow.FieldGroup.Label"); } } 
 /// <summary>Name</summary> 
 public static string AddInlineFunctionWorkflow_MethodName_Label { get { return T("AddInlineFunctionWorkflow.MethodName.Label"); } } 
 /// <summary>The name of the method you want to create</summary> 
 public static string AddInlineFunctionWorkflow_MethodName_Help { get { return T("AddInlineFunctionWorkflow.MethodName.Help"); } } 
 /// <summary>Namespace</summary> 
 public static string AddInlineFunctionWorkflow_MethodNamespace_Label { get { return T("AddInlineFunctionWorkflow.MethodNamespace.Label"); } } 
 /// <summary>The namespace of the method you want to create</summary> 
 public static string AddInlineFunctionWorkflow_MethodNamespace_Help { get { return T("AddInlineFunctionWorkflow.MethodNamespace.Help"); } } 
 /// <summary>Description</summary> 
 public static string AddInlineFunctionWorkflow_MethodDescription_Label { get { return T("AddInlineFunctionWorkflow.MethodDescription.Label"); } } 
 /// <summary>A short description of the function</summary> 
 public static string AddInlineFunctionWorkflow_MethodDescription_Help { get { return T("AddInlineFunctionWorkflow.MethodDescription.Help"); } } 
 /// <summary>Template</summary> 
 public static string AddInlineFunctionWorkflow_InlineFunctionMethodTemplate_Label { get { return T("AddInlineFunctionWorkflow.InlineFunctionMethodTemplate.Label"); } } 
 /// <summary>Select the template that you want to use for the new method.</summary> 
 public static string AddInlineFunctionWorkflow_InlineFunctionMethodTemplate_Help { get { return T("AddInlineFunctionWorkflow.InlineFunctionMethodTemplate.Help"); } } 
 /// <summary>Settings</summary> 
 public static string EditInlineFunctionWorkflow_FieldGroup_Label { get { return T("EditInlineFunctionWorkflow.FieldGroup.Label"); } } 
 /// <summary>Name</summary> 
 public static string EditInlineFunctionWorkflow_MethodName_Label { get { return T("EditInlineFunctionWorkflow.MethodName.Label"); } } 
 /// <summary>The name of the method you want to create</summary> 
 public static string EditInlineFunctionWorkflow_MethodName_Help { get { return T("EditInlineFunctionWorkflow.MethodName.Help"); } } 
 /// <summary>Namespace</summary> 
 public static string EditInlineFunctionWorkflow_MethodNamespace_Label { get { return T("EditInlineFunctionWorkflow.MethodNamespace.Label"); } } 
 /// <summary>The namespace of the method you want to create</summary> 
 public static string EditInlineFunctionWorkflow_MethodNamespace_Help { get { return T("EditInlineFunctionWorkflow.MethodNamespace.Help"); } } 
 /// <summary>Description</summary> 
 public static string EditInlineFunctionWorkflow_MethodDescription_Label { get { return T("EditInlineFunctionWorkflow.MethodDescription.Label"); } } 
 /// <summary>A short description of the function</summary> 
 public static string EditInlineFunctionWorkflow_MethodDescription_Help { get { return T("EditInlineFunctionWorkflow.MethodDescription.Help"); } } 
 /// <summary>Debug</summary> 
 public static string EditInlineFunctionWorkflow_DebugFieldGroup_Label { get { return T("EditInlineFunctionWorkflow.DebugFieldGroup.Label"); } } 
 /// <summary>Page</summary> 
 public static string EditInlineFunctionWorkflow_DebugPage_Label { get { return T("EditInlineFunctionWorkflow.DebugPage.Label"); } } 
 /// <summary>When debugging, this page is used as current page</summary> 
 public static string EditInlineFunctionWorkflow_DebugPage_Help { get { return T("EditInlineFunctionWorkflow.DebugPage.Help"); } } 
 /// <summary>Data scope</summary> 
 public static string EditInlineFunctionWorkflow_DebugPageDataScope_Label { get { return T("EditInlineFunctionWorkflow.DebugPageDataScope.Label"); } } 
 /// <summary>When debugging, this is used as current data scope</summary> 
 public static string EditInlineFunctionWorkflow_DebugPageDataScope_Help { get { return T("EditInlineFunctionWorkflow.DebugPageDataScope.Help"); } } 
 /// <summary>Language</summary> 
 public static string EditInlineFunctionWorkflow_DebugActiveLocale_Label { get { return T("EditInlineFunctionWorkflow.DebugActiveLocale.Label"); } } 
 /// <summary>When debugging, this is used as the current language</summary> 
 public static string EditInlineFunctionWorkflow_DebugActiveLocale_Help { get { return T("EditInlineFunctionWorkflow.DebugActiveLocale.Help"); } } 
 /// <summary>Source</summary> 
 public static string EditInlineFunctionWorkflow_Code_Label { get { return T("EditInlineFunctionWorkflow.Code.Label"); } } 
 /// <summary>Assembly References</summary> 
 public static string EditInlineFunctionWorkflow_AssembliesFieldGroup_Label { get { return T("EditInlineFunctionWorkflow.AssembliesFieldGroup.Label"); } } 
 /// <summary>Preview</summary> 
 public static string EditInlineFunctionWorkflow_Preview_Label { get { return T("EditInlineFunctionWorkflow.Preview.Label"); } } 
 /// <summary>Input Parameters</summary> 
 public static string EditInlineFunctionWorkflow_ParameterFieldGroup_Label { get { return T("EditInlineFunctionWorkflow.ParameterFieldGroup.Label"); } } 
 /// <summary>Administrative</summary> 
 public static string EditInlineFunctionWorkflow_AdminitrativeScope_Label { get { return T("EditInlineFunctionWorkflow.AdminitrativeScope.Label"); } } 
 /// <summary>Public</summary> 
 public static string EditInlineFunctionWorkflow_PublicScope_Label { get { return T("EditInlineFunctionWorkflow.PublicScope.Label"); } } 
 /// <summary>Empty method</summary> 
 public static string InlineFunctionMethodTemplate_Clean { get { return T("InlineFunctionMethodTemplate.Clean"); } } 
 /// <summary>Method with parameters</summary> 
 public static string InlineFunctionMethodTemplate_WithParameters { get { return T("InlineFunctionMethodTemplate.WithParameters"); } } 
 /// <summary>Method using data connection</summary> 
 public static string InlineFunctionMethodTemplate_DataConnection { get { return T("InlineFunctionMethodTemplate.DataConnection"); } } 
 /// <summary>A public static class named {0} is missing from the code. This class should contain the function method.</summary> 
 public static string CSharpInlineFunction_OnMissingContainerType(string parameter0) { return string.Format(T("CSharpInlineFunction.OnMissingContainerType"), parameter0); } 
 /// <summary>The namespace in the code &apos;{0}&apos; does not match the given function namespace &apos;{1}&apos;.</summary> 
 public static string CSharpInlineFunction_OnNamespaceMismatch(string parameter0,string parameter1) { return string.Format(T("CSharpInlineFunction.OnNamespaceMismatch"), parameter0,parameter1); } 
 /// <summary>The given function name &apos;{0}&apos; was not found or not public static in the class &apos;{1}&apos;.</summary> 
 public static string CSharpInlineFunction_OnMissionMethod(string parameter0,string parameter1) { return string.Format(T("CSharpInlineFunction.OnMissionMethod"), parameter0,parameter1); } 
 /// <summary>The parameter &apos;{0}&apos; has not been added to &apos;Input Parameters&apos; - to call your function you need to add the parameter and give it either a test or default value.</summary> 
 public static string CSharpInlineFunction_MissingParameterDefinition(string parameter0) { return string.Format(T("CSharpInlineFunction.MissingParameterDefinition"), parameter0); } 
 /// <summary>The parameter &apos;{0}&apos; is expecting test value of type &apos;{1}&apos;, got value of type &apos;{2}&apos;.</summary> 
 public static string CSharpInlineFunction_WrongParameterTestValueType(string parameter0,string parameter1,string parameter2) { return string.Format(T("CSharpInlineFunction.WrongParameterTestValueType"), parameter0,parameter1,parameter2); } 
 /// <summary>The parameter &apos;{0}&apos; defined on &apos;Input Parameters&apos; must have a test or default value before your function can be evaluated.</summary> 
 public static string CSharpInlineFunction_MissingParameterTestOrDefaultValue(string parameter0) { return string.Format(T("CSharpInlineFunction.MissingParameterTestOrDefaultValue"), parameter0); } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PackageElementProvider {
 /// <summary>Packages</summary> 
 public static string RootFolderLabel { get { return T("RootFolderLabel"); } } 
 /// <summary>Explore and manage installed packages</summary> 
 public static string RootFolderToolTip { get { return T("RootFolderToolTip"); } } 
 /// <summary>Available Packages</summary> 
 public static string AvailablePackagesFolderLabel { get { return T("AvailablePackagesFolderLabel"); } } 
 /// <summary>Available packages</summary> 
 public static string AvailablePackagesFolderToolTip { get { return T("AvailablePackagesFolderToolTip"); } } 
 /// <summary>Installed Packages</summary> 
 public static string InstalledPackageFolderLabel { get { return T("InstalledPackageFolderLabel"); } } 
 /// <summary>Installed packages</summary> 
 public static string InstalledPackageFolderToolTip { get { return T("InstalledPackageFolderToolTip"); } } 
 /// <summary>Local Packages</summary> 
 public static string LocalPackagesFolderLabel { get { return T("LocalPackagesFolderLabel"); } } 
 /// <summary>Local packages</summary> 
 public static string LocalPackagesFolderToolTip { get { return T("LocalPackagesFolderToolTip"); } } 
 /// <summary>Package Sources</summary> 
 public static string PackageSourcesFolderLabel { get { return T("PackageSourcesFolderLabel"); } } 
 /// <summary>Package sources</summary> 
 public static string PackageSourcesFolderToolTip { get { return T("PackageSourcesFolderToolTip"); } } 
 /// <summary>Package Info</summary> 
 public static string ViewAvailableInformationLabel { get { return T("ViewAvailableInformationLabel"); } } 
 /// <summary>View package information</summary> 
 public static string ViewAvailableInformationToolTip { get { return T("ViewAvailableInformationToolTip"); } } 
 /// <summary>Package Info</summary> 
 public static string ViewInstalledInformationLabel { get { return T("ViewInstalledInformationLabel"); } } 
 /// <summary>View package information</summary> 
 public static string ViewInstalledInformationToolTip { get { return T("ViewInstalledInformationToolTip"); } } 
 /// <summary>Install Local Package...</summary> 
 public static string InstallLocalPackageLabel { get { return T("InstallLocalPackageLabel"); } } 
 /// <summary>Install package from local file system</summary> 
 public static string InstallLocalPackageToolTip { get { return T("InstallLocalPackageToolTip"); } } 
 /// <summary>Add Package Source</summary> 
 public static string AddPackageSourceLabel { get { return T("AddPackageSourceLabel"); } } 
 /// <summary>Add package source</summary> 
 public static string AddPackageSourceToolTip { get { return T("AddPackageSourceToolTip"); } } 
 /// <summary>Delete Package Source</summary> 
 public static string DeletePackageSourceLabel { get { return T("DeletePackageSourceLabel"); } } 
 /// <summary>Delete package source</summary> 
 public static string DeletePackageSourceToolTip { get { return T("DeletePackageSourceToolTip"); } } 
 /// <summary>Clear Cache</summary> 
 public static string ClearServerCacheLabel { get { return T("ClearServerCacheLabel"); } } 
 /// <summary>Clear cache to get the newest packages</summary> 
 public static string ClearServerCacheToolTip { get { return T("ClearServerCacheToolTip"); } } 
 /// <summary>Package Info</summary> 
 public static string ViewAvailableInformation_FieldGroupLabel { get { return T("ViewAvailableInformation.FieldGroupLabel"); } } 
 /// <summary>Name</summary> 
 public static string ViewAvailableInformation_NameTextLabel { get { return T("ViewAvailableInformation.NameTextLabel"); } } 
 /// <summary>Description</summary> 
 public static string ViewAvailableInformation_DescriptionTextLabel { get { return T("ViewAvailableInformation.DescriptionTextLabel"); } } 
 /// <summary>Author</summary> 
 public static string ViewAvailableInformation_AuthorTextLabel { get { return T("ViewAvailableInformation.AuthorTextLabel"); } } 
 /// <summary>Free Trial Info</summary> 
 public static string ViewAvailableInformation_TrialInfoFieldGroupLabel { get { return T("ViewAvailableInformation.TrialInfoFieldGroupLabel"); } } 
 /// <summary>Trial information</summary> 
 public static string ViewAvailableInformation_TrialInformationLabel { get { return T("ViewAvailableInformation.TrialInformationLabel"); } } 
 /// <summary>This is a commercial package, available for free in the trial period. When the trial period has expired functionality may be degraded, unless you choose to purchase a license.</summary> 
 public static string ViewAvailableInformation_TrialInformationText { get { return T("ViewAvailableInformation.TrialInformationText"); } } 
 /// <summary>Free trial period (days)</summary> 
 public static string ViewAvailableInformation_TrialDaysLabel { get { return T("ViewAvailableInformation.TrialDaysLabel"); } } 
 /// <summary>Installation Info</summary> 
 public static string ViewAvailableInformation_InstallationInfoFieldGroupLabel { get { return T("ViewAvailableInformation.InstallationInfoFieldGroupLabel"); } } 
 /// <summary>Version</summary> 
 public static string ViewAvailableInformation_VersionTextLabel { get { return T("ViewAvailableInformation.VersionTextLabel"); } } 
 /// <summary>Technical Description</summary> 
 public static string ViewAvailableInformation_TechicalDescriptionTextLabel { get { return T("ViewAvailableInformation.TechicalDescriptionTextLabel"); } } 
 /// <summary>Source</summary> 
 public static string ViewAvailableInformation_PackageSourceTextLabel { get { return T("ViewAvailableInformation.PackageSourceTextLabel"); } } 
 /// <summary>Price (USD)</summary> 
 public static string ViewAvailableInformation_PriceTextLabel { get { return T("ViewAvailableInformation.PriceTextLabel"); } } 
 /// <summary>Install</summary> 
 public static string ViewAvailableInformation_Toolbar_InstallLabel { get { return T("ViewAvailableInformation.Toolbar.InstallLabel"); } } 
 /// <summary>Read more</summary> 
 public static string ViewAvailableInformation_Toolbar_ReadMoreLabel { get { return T("ViewAvailableInformation.Toolbar.ReadMoreLabel"); } } 
 /// <summary>Already Installed</summary> 
 public static string ViewAvailableInformation_ShowError_MessageTitle { get { return T("ViewAvailableInformation.ShowError.MessageTitle"); } } 
 /// <summary>The package is already installed, cannot install the selected package.</summary> 
 public static string ViewAvailableInformation_ShowError_MessageMessage { get { return T("ViewAvailableInformation.ShowError.MessageMessage"); } } 
 /// <summary>Package server did not respond</summary> 
 public static string ViewAvailableInformation_ShowServerError_MessageTitle { get { return T("ViewAvailableInformation.ShowServerError.MessageTitle"); } } 
 /// <summary>The package server did not respond, try again or contact the system administrator</summary> 
 public static string ViewAvailableInformation_ShowServerError_MessageMessage { get { return T("ViewAvailableInformation.ShowServerError.MessageMessage"); } } 
 /// <summary>Package Info</summary> 
 public static string ViewInstalledInformation_FieldGroupLabel { get { return T("ViewInstalledInformation.FieldGroupLabel"); } } 
 /// <summary>Name</summary> 
 public static string ViewInstalledInformation_NameTextLabel { get { return T("ViewInstalledInformation.NameTextLabel"); } } 
 /// <summary>Installation date</summary> 
 public static string ViewInstalledInformation_DateTextLabel { get { return T("ViewInstalledInformation.DateTextLabel"); } } 
 /// <summary>Installed by</summary> 
 public static string ViewInstalledInformation_UserTextLabel { get { return T("ViewInstalledInformation.UserTextLabel"); } } 
 /// <summary>Author</summary> 
 public static string ViewInstalledInformation_AuthorTextLabel { get { return T("ViewInstalledInformation.AuthorTextLabel"); } } 
 /// <summary>Version</summary> 
 public static string ViewInstalledInformation_VersionTextLabel { get { return T("ViewInstalledInformation.VersionTextLabel"); } } 
 /// <summary>Trial info</summary> 
 public static string ViewInstalledInformation_TrialInfoFieldGroupLabel { get { return T("ViewInstalledInformation.TrialInfoFieldGroupLabel"); } } 
 /// <summary>Trial information</summary> 
 public static string ViewInstalledInformation_TrialInformationLabel { get { return T("ViewInstalledInformation.TrialInformationLabel"); } } 
 /// <summary>This is a commercial package, available for free in the trial period. When the trial period has expired functionality may be degraded, unless you choose to purchase a license.</summary> 
 public static string ViewInstalledInformation_TrialInformationText { get { return T("ViewInstalledInformation.TrialInformationText"); } } 
 /// <summary>Trial expiration date</summary> 
 public static string ViewInstalledInformation_TrialExpireLabel { get { return T("ViewInstalledInformation.TrialExpireLabel"); } } 
 /// <summary>Uninstall</summary> 
 public static string ViewInstalledInformation_Toolbar_UninstallLabel { get { return T("ViewInstalledInformation.Toolbar.UninstallLabel"); } } 
 /// <summary>Purchase this!</summary> 
 public static string ViewInstalledInformation_Toolbar_PurchaseLabel { get { return T("ViewInstalledInformation.Toolbar.PurchaseLabel"); } } 
 /// <summary>Already Uninstalled</summary> 
 public static string ViewInstalledInformation_ShowError_MessageTitle { get { return T("ViewInstalledInformation.ShowError.MessageTitle"); } } 
 /// <summary>The package is already uninstalled, cannot uninstall the selected package.</summary> 
 public static string ViewInstalledInformation_ShowError_MessageMessage { get { return T("ViewInstalledInformation.ShowError.MessageMessage"); } } 
 /// <summary>Install Package</summary> 
 public static string InstallRemotePackage_Step1_LayoutLabel { get { return T("InstallRemotePackage.Step1.LayoutLabel"); } } 
 /// <summary>This is a trial/payment package</summary> 
 public static string InstallRemotePackage_Step1_HeadingTitle { get { return T("InstallRemotePackage.Step1.HeadingTitle"); } } 
 /// <summary>This package is subject to payment - please examine the EULA on the next screen for details about trial period and payment terms.</summary> 
 public static string InstallRemotePackage_Step1_HeadingDescription { get { return T("InstallRemotePackage.Step1.HeadingDescription"); } } 
 /// <summary>Install Package</summary> 
 public static string InstallRemotePackage_Step2_LayoutLabel { get { return T("InstallRemotePackage.Step2.LayoutLabel"); } } 
 /// <summary>License agreement</summary> 
 public static string InstallRemotePackage_Step2_HeadingTitle { get { return T("InstallRemotePackage.Step2.HeadingTitle"); } } 
 /// <summary>If you accept the terms of the agreement, click the check box below. You must accept the agreement to install.</summary> 
 public static string InstallRemotePackage_Step2_HeadingDescription { get { return T("InstallRemotePackage.Step2.HeadingDescription"); } } 
 /// <summary>I accept the license agreement</summary> 
 public static string InstallRemotePackage_Step2_IAcceptItemLabel { get { return T("InstallRemotePackage.Step2.IAcceptItemLabel"); } } 
 /// <summary>You must accept the terms of the license agreement before you can proceed.</summary> 
 public static string InstallRemotePackage_Step2_AcceptMissing { get { return T("InstallRemotePackage.Step2.AcceptMissing"); } } 
 /// <summary>Install Package</summary> 
 public static string InstallRemotePackage_Step3_LayoutLabel { get { return T("InstallRemotePackage.Step3.LayoutLabel"); } } 
 /// <summary>Download and validate package</summary> 
 public static string InstallRemotePackage_Step3_HeadingTitle { get { return T("InstallRemotePackage.Step3.HeadingTitle"); } } 
 /// <summary>The package will be downloaded and validated. Please note that this may take several minutes. Click Next to continue.</summary> 
 public static string InstallRemotePackage_Step3_HeadingDescription { get { return T("InstallRemotePackage.Step3.HeadingDescription"); } } 
 /// <summary>Install Local Package</summary> 
 public static string InstallRemotePackage_Step4_LayoutLabel { get { return T("InstallRemotePackage.Step4.LayoutLabel"); } } 
 /// <summary>Ready to install</summary> 
 public static string InstallRemotePackage_Step4_HeadingTitle { get { return T("InstallRemotePackage.Step4.HeadingTitle"); } } 
 /// <summary>Ready to install the package. Please note that the installation may take several minutes. Click Next to continue.</summary> 
 public static string InstallRemotePackage_Step4_HeadingDescription { get { return T("InstallRemotePackage.Step4.HeadingDescription"); } } 
 /// <summary>Ready to install</summary> 
 public static string InstallRemotePackage_Step4_NonUninstallableHeadingTitle { get { return T("InstallRemotePackage.Step4.NonUninstallableHeadingTitle"); } } 
 /// <summary>Ready to install the package. Please note that the installation may take several minutes. Also note that this package can not be uninstalled. Click Next to continue.</summary> 
 public static string InstallRemotePackage_Step4_NonUninstallableHeadingDescription { get { return T("InstallRemotePackage.Step4.NonUninstallableHeadingDescription"); } } 
 /// <summary>Package Installed</summary> 
 public static string InstallRemotePackage_Step5_LayoutLabel { get { return T("InstallRemotePackage.Step5.LayoutLabel"); } } 
 /// <summary>Package installed successfully</summary> 
 public static string InstallRemotePackage_Step5_HeadingTitle { get { return T("InstallRemotePackage.Step5.HeadingTitle"); } } 
 /// <summary>Package installed successfully.</summary> 
 public static string InstallRemotePackage_Step5_HeadingDescription { get { return T("InstallRemotePackage.Step5.HeadingDescription"); } } 
 /// <summary>Package installation failed</summary> 
 public static string InstallRemotePackage_ShowError_LayoutLabel { get { return T("InstallRemotePackage.ShowError.LayoutLabel"); } } 
 /// <summary>Package Installation Failed</summary> 
 public static string InstallRemotePackage_ShowError_InfoTableCaption { get { return T("InstallRemotePackage.ShowError.InfoTableCaption"); } } 
 /// <summary>Message</summary> 
 public static string InstallRemotePackage_ShowError_MessageTitle { get { return T("InstallRemotePackage.ShowError.MessageTitle"); } } 
 /// <summary>The package Did Not Validate</summary> 
 public static string InstallRemotePackage_ShowWarning_LayoutLabel { get { return T("InstallRemotePackage.ShowWarning.LayoutLabel"); } } 
 /// <summary>The package did not validate</summary> 
 public static string InstallRemotePackage_ShowWarning_InfoTableCaption { get { return T("InstallRemotePackage.ShowWarning.InfoTableCaption"); } } 
 /// <summary>Install Local Package</summary> 
 public static string InstallLocalPackage_Step1_LayoutLabel { get { return T("InstallLocalPackage.Step1.LayoutLabel"); } } 
 /// <summary>Path to the local package</summary> 
 public static string InstallLocalPackage_Step1_FieldGroupLabel { get { return T("InstallLocalPackage.Step1.FieldGroupLabel"); } } 
 /// <summary>Package file</summary> 
 public static string InstallLocalPackage_Step1_FileUploadLabel { get { return T("InstallLocalPackage.Step1.FileUploadLabel"); } } 
 /// <summary>Browse to and select the local package file</summary> 
 public static string InstallLocalPackage_Step1_FileUploadHelp { get { return T("InstallLocalPackage.Step1.FileUploadHelp"); } } 
 /// <summary>Install Local Package</summary> 
 public static string InstallLocalPackage_Step2_LayoutLabel { get { return T("InstallLocalPackage.Step2.LayoutLabel"); } } 
 /// <summary>Ready to install</summary> 
 public static string InstallLocalPackage_Step2_HeadingTitle { get { return T("InstallLocalPackage.Step2.HeadingTitle"); } } 
 /// <summary>Ready to install the package. Please note that the installation may take several minutes. Click Next to continue.</summary> 
 public static string InstallLocalPackage_Step2_HeadingDescription { get { return T("InstallLocalPackage.Step2.HeadingDescription"); } } 
 /// <summary>Package Installed</summary> 
 public static string InstallLocalPackage_Step3_LayoutLabel { get { return T("InstallLocalPackage.Step3.LayoutLabel"); } } 
 /// <summary>Package installed successfully</summary> 
 public static string InstallLocalPackage_Step3_HeadingTitle { get { return T("InstallLocalPackage.Step3.HeadingTitle"); } } 
 /// <summary>Package installed successfully.</summary> 
 public static string InstallLocalPackage_Step3_HeadingDescription { get { return T("InstallLocalPackage.Step3.HeadingDescription"); } } 
 /// <summary>Package Installation Failed</summary> 
 public static string InstallLocalPackage_ShowError_LayoutLabel { get { return T("InstallLocalPackage.ShowError.LayoutLabel"); } } 
 /// <summary>Package installation failed</summary> 
 public static string InstallLocalPackage_ShowError_InfoTableCaption { get { return T("InstallLocalPackage.ShowError.InfoTableCaption"); } } 
 /// <summary>Message</summary> 
 public static string InstallLocalPackage_ShowError_MessageTitle { get { return T("InstallLocalPackage.ShowError.MessageTitle"); } } 
 /// <summary>The package Did Not Validate</summary> 
 public static string InstallLocalPackage_ShowWarning_LayoutLabel { get { return T("InstallLocalPackage.ShowWarning.LayoutLabel"); } } 
 /// <summary>The package did not validate</summary> 
 public static string InstallLocalPackage_ShowWarning_InfoTableCaption { get { return T("InstallLocalPackage.ShowWarning.InfoTableCaption"); } } 
 /// <summary>Uninstall Package</summary> 
 public static string UninstallRemotePackage_Step1_LayoutLabel { get { return T("UninstallRemotePackage.Step1.LayoutLabel"); } } 
 /// <summary>Ready to check uninstallation process</summary> 
 public static string UninstallRemotePackage_Step1_HeadingTitle { get { return T("UninstallRemotePackage.Step1.HeadingTitle"); } } 
 /// <summary>Ready to check the uninstall process of the package. Click Next to continue.</summary> 
 public static string UninstallRemotePackage_Step1_HeadingDescription { get { return T("UninstallRemotePackage.Step1.HeadingDescription"); } } 
 /// <summary>Uninstall Package</summary> 
 public static string UninstallRemotePackage_Step2_LayoutLabel { get { return T("UninstallRemotePackage.Step2.LayoutLabel"); } } 
 /// <summary>Ready to uninstall</summary> 
 public static string UninstallRemotePackage_Step2_HeadingTitle { get { return T("UninstallRemotePackage.Step2.HeadingTitle"); } } 
 /// <summary>Ready to uninstall the package. Please note that the installation may take several minutes. Click Next to continue.</summary> 
 public static string UninstallRemotePackage_Step2_HeadingDescription { get { return T("UninstallRemotePackage.Step2.HeadingDescription"); } } 
 /// <summary>Package Uninstalled</summary> 
 public static string UninstallRemotePackage_Step3_LayoutLabel { get { return T("UninstallRemotePackage.Step3.LayoutLabel"); } } 
 /// <summary>Package uninstalled successfully</summary> 
 public static string UninstallRemotePackage_Step3_HeadingTitle { get { return T("UninstallRemotePackage.Step3.HeadingTitle"); } } 
 /// <summary>Package uninstalled successfully.</summary> 
 public static string UninstallRemotePackage_Step3_HeadingDescription { get { return T("UninstallRemotePackage.Step3.HeadingDescription"); } } 
 /// <summary>Package Uninstallation Failed</summary> 
 public static string UninstallRemotePackage_ShowError_LayoutLabel { get { return T("UninstallRemotePackage.ShowError.LayoutLabel"); } } 
 /// <summary>Package uninstallation failed</summary> 
 public static string UninstallRemotePackage_ShowError_InfoTableCaption { get { return T("UninstallRemotePackage.ShowError.InfoTableCaption"); } } 
 /// <summary>Message</summary> 
 public static string UninstallRemotePackage_ShowError_MessageTitle { get { return T("UninstallRemotePackage.ShowError.MessageTitle"); } } 
 /// <summary>Uninstall Package</summary> 
 public static string UninstallRemotePackage_ShowUnregistre_LayoutLabel { get { return T("UninstallRemotePackage.ShowUnregistre.LayoutLabel"); } } 
 /// <summary>Registration of uninstallation failed</summary> 
 public static string UninstallRemotePackage_ShowUnregistre_HeadingTitle { get { return T("UninstallRemotePackage.ShowUnregistre.HeadingTitle"); } } 
 /// <summary>The registration of uninstallation failed. Contact the package vendor for manual unregistration.</summary> 
 public static string UninstallRemotePackage_ShowUnregistre_HeadingDescription { get { return T("UninstallRemotePackage.ShowUnregistre.HeadingDescription"); } } 
 /// <summary>Uninstall Local Package</summary> 
 public static string UninstallLocalPackage_Step1_LayoutLabel { get { return T("UninstallLocalPackage.Step1.LayoutLabel"); } } 
 /// <summary>Ready to check uninstallation process</summary> 
 public static string UninstallLocalPackage_Step1_HeadingTitle { get { return T("UninstallLocalPackage.Step1.HeadingTitle"); } } 
 /// <summary>Ready to check the uninstall process of the package. Click Next to continue.</summary> 
 public static string UninstallLocalPackage_Step1_HeadingDescription { get { return T("UninstallLocalPackage.Step1.HeadingDescription"); } } 
 /// <summary>Uninstall Local Package</summary> 
 public static string UninstallLocalPackage_Step2_LayoutLabel { get { return T("UninstallLocalPackage.Step2.LayoutLabel"); } } 
 /// <summary>Ready to uninstall</summary> 
 public static string UninstallLocalPackage_Step2_HeadingTitle { get { return T("UninstallLocalPackage.Step2.HeadingTitle"); } } 
 /// <summary>Ready to uninstall the package. Please note that the installation may take several minutes. Click Next to continue.</summary> 
 public static string UninstallLocalPackage_Step2_HeadingDescription { get { return T("UninstallLocalPackage.Step2.HeadingDescription"); } } 
 /// <summary>Package Uninstalled</summary> 
 public static string UninstallLocalPackage_Step3_LayoutLabel { get { return T("UninstallLocalPackage.Step3.LayoutLabel"); } } 
 /// <summary>Package uninstalled successfully</summary> 
 public static string UninstallLocalPackage_Step3_HeadingTitle { get { return T("UninstallLocalPackage.Step3.HeadingTitle"); } } 
 /// <summary>Package uninstalled successfully.</summary> 
 public static string UninstallLocalPackage_Step3_HeadingDescription { get { return T("UninstallLocalPackage.Step3.HeadingDescription"); } } 
 /// <summary>Package Uninstallation Failed</summary> 
 public static string UninstallLocalPackage_ShowError_LayoutLabel { get { return T("UninstallLocalPackage.ShowError.LayoutLabel"); } } 
 /// <summary>Package uninstallation failed</summary> 
 public static string UninstallLocalPackage_ShowError_InfoTableCaption { get { return T("UninstallLocalPackage.ShowError.InfoTableCaption"); } } 
 /// <summary>Message</summary> 
 public static string UninstallLocalPackage_ShowError_MessageTitle { get { return T("UninstallLocalPackage.ShowError.MessageTitle"); } } 
 /// <summary>New Package Source</summary> 
 public static string AddPackageSource_Step1_LayoutLabel { get { return T("AddPackageSource.Step1.LayoutLabel"); } } 
 /// <summary>Package source data</summary> 
 public static string AddPackageSource_Step1_FieldGroupLabel { get { return T("AddPackageSource.Step1.FieldGroupLabel"); } } 
 /// <summary>Package web service URL</summary> 
 public static string AddPackageSource_Step1_UrlLabel { get { return T("AddPackageSource.Step1.UrlLabel"); } } 
 /// <summary>Packages can be hosted on remote servers. The package web service URL will be validated in the next step.</summary> 
 public static string AddPackageSource_Step1_UrlHelp { get { return T("AddPackageSource.Step1.UrlHelp"); } } 
 /// <summary>The entered text was not a valid URL</summary> 
 public static string AddPackageSource_Step1_UrlNotValid { get { return T("AddPackageSource.Step1.UrlNotValid"); } } 
 /// <summary>The server is not a Composite C1 package server</summary> 
 public static string AddPackageSource_Step1_UrlNonPackageServer { get { return T("AddPackageSource.Step1.UrlNonPackageServer"); } } 
 /// <summary>Add Package Server Source</summary> 
 public static string AddPackageSource_Step2_LayoutLabel { get { return T("AddPackageSource.Step2.LayoutLabel"); } } 
 /// <summary>Server URL is valid</summary> 
 public static string AddPackageSource_Step2_HeadingTitle { get { return T("AddPackageSource.Step2.HeadingTitle"); } } 
 /// <summary>Note that the HTTP protocol is used on this connection. This implies that all information will be send unencrypted. Click Finish to add the source.</summary> 
 public static string AddPackageSource_Step2_HeadingNoHttpsDescription { get { return T("AddPackageSource.Step2.HeadingNoHttpsDescription"); } } 
 /// <summary>Click Finish to add the source.</summary> 
 public static string AddPackageSource_Step2_HeadingWithHttpsDescription { get { return T("AddPackageSource.Step2.HeadingWithHttpsDescription"); } } 
 /// <summary>Delete Confirmation</summary> 
 public static string DeletePackageSource_Step1_LayoutLabel { get { return T("DeletePackageSource.Step1.LayoutLabel"); } } 
 /// <summary>Delete the selected server source</summary> 
 public static string DeletePackageSource_Step1_Text { get { return T("DeletePackageSource.Step1.Text"); } } 
 /// <summary>Trial Period Has Expired</summary> 
 public static string ConfirmLicense_ExpiredTitle { get { return T("ConfirmLicense.ExpiredTitle"); } } 
 /// <summary>The trial period of the package has expired. You need to obtain a valid license.</summary> 
 public static string ConfirmLicense_ExpiredMessage { get { return T("ConfirmLicense.ExpiredMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PageElementProvider {
 /// <summary>Add New Page</summary> 
 public static string AddNewPageStep1_DialogLabel { get { return T("AddNewPageStep1.DialogLabel"); } } 
 /// <summary>General settings</summary> 
 public static string GeneralSettings_FieldGroupLabel { get { return T("GeneralSettings.FieldGroupLabel"); } } 
 /// <summary>Publication settings</summary> 
 public static string PublicationSettings_FieldGroupLabel { get { return T("PublicationSettings.FieldGroupLabel"); } } 
 /// <summary>Advanced settings</summary> 
 public static string AdvancedSettings_FieldGroupLabel { get { return T("AdvancedSettings.FieldGroupLabel"); } } 
 /// <summary>Page title</summary> 
 public static string AddNewPageStep1_LabelTitle { get { return T("AddNewPageStep1.LabelTitle"); } } 
 /// <summary>The entry specified in this field is shown in the browser window title bar. The field is used by search engines and sitemaps</summary> 
 public static string AddNewPageStep1_LabelTitleHelp { get { return T("AddNewPageStep1.LabelTitleHelp"); } } 
 /// <summary>Description</summary> 
 public static string AddNewPageStep1_LabelAbstract { get { return T("AddNewPageStep1.LabelAbstract"); } } 
 /// <summary>Use this field for at short description of the page</summary> 
 public static string AddNewPageStep1_LabelAbstractHelp { get { return T("AddNewPageStep1.LabelAbstractHelp"); } } 
 /// <summary>Page type</summary> 
 public static string AddNewPageStep1_LabelTemplate { get { return T("AddNewPageStep1.LabelTemplate"); } } 
 /// <summary>The page type selection influences the behavior and features of your page, like &apos;a normal page&apos; or &apos;a blog&apos;. The options available depend on features installed.</summary> 
 public static string AddNewPageStep1_HelpTemplate { get { return T("AddNewPageStep1.HelpTemplate"); } } 
 /// <summary>Position</summary> 
 public static string AddNewPageStep1_LabelPosition { get { return T("AddNewPageStep1.LabelPosition"); } } 
 /// <summary>Select where in the content tree you want the page to be placed.</summary> 
 public static string AddNewPageStep1_HelpPosition { get { return T("AddNewPageStep1.HelpPosition"); } } 
 /// <summary>Insert at the top</summary> 
 public static string AddNewPageStep1_LabelAddToTop { get { return T("AddNewPageStep1.LabelAddToTop"); } } 
 /// <summary>Insert at the bottom</summary> 
 public static string AddNewPageStep1_LabelAddToBottom { get { return T("AddNewPageStep1.LabelAddToBottom"); } } 
 /// <summary>Insert alphabetically</summary> 
 public static string AddNewPageStep1_LabelAddAlphabetic { get { return T("AddNewPageStep1.LabelAddAlphabetic"); } } 
 /// <summary>Select position...</summary> 
 public static string AddNewPageStep1_LabelAddBelowOtherPage { get { return T("AddNewPageStep1.LabelAddBelowOtherPage"); } } 
 /// <summary>Advanced settings</summary> 
 public static string AddNewPageStep2_LabelFieldGroup { get { return T("AddNewPageStep2.LabelFieldGroup"); } } 
 /// <summary>URL title</summary> 
 public static string AddNewPageStep2_LabelUrlTitle { get { return T("AddNewPageStep2.LabelUrlTitle"); } } 
 /// <summary>The entry specified in this field is shown in the browser address bar. The field is used by search engines</summary> 
 public static string AddNewPageStep2_HelpUrlTitle { get { return T("AddNewPageStep2.HelpUrlTitle"); } } 
 /// <summary>Menu title</summary> 
 public static string AddNewPageStep2_LabelMenuTitle { get { return T("AddNewPageStep2.LabelMenuTitle"); } } 
 /// <summary>The entry specified in this field can be used in the navigation on the website</summary> 
 public static string AddNewPageStep2_HelpMenuTitle { get { return T("AddNewPageStep2.HelpMenuTitle"); } } 
 /// <summary>Select detailed page position</summary> 
 public static string AddNewPageStep2_LabelPositionSelectorPanel { get { return T("AddNewPageStep2.LabelPositionSelectorPanel"); } } 
 /// <summary>Position below</summary> 
 public static string AddNewPageStep2_LabelPositionSelector { get { return T("AddNewPageStep2.LabelPositionSelector"); } } 
 /// <summary></summary> 
 public static string AddNewPageStep2_HelpPositionSelector { get { return T("AddNewPageStep2.HelpPositionSelector"); } } 
 /// <summary>The specified title is too long. Make it shorter and try again</summary> 
 public static string AddNewPageStep1_TitleTooLong { get { return T("AddNewPageStep1.TitleTooLong"); } } 
 /// <summary>The specified menu title is too long. Make it shorter and try again</summary> 
 public static string AddNewPageStep1_MenuTitleTooLong { get { return T("AddNewPageStep1.MenuTitleTooLong"); } } 
 /// <summary>Settings</summary> 
 public static string EditPage_LabelPaneSettings { get { return T("EditPage.LabelPaneSettings"); } } 
 /// <summary>Status</summary> 
 public static string EditPage_LabelPublicationState { get { return T("EditPage.LabelPublicationState"); } } 
 /// <summary>Send the page to another status</summary> 
 public static string EditPage_HelpPublicationState { get { return T("EditPage.HelpPublicationState"); } } 
 /// <summary>Page title</summary> 
 public static string EditPage_LabelPageTitle { get { return T("EditPage.LabelPageTitle"); } } 
 /// <summary>The entry specified in this field is shown in the browser window title bar. The field is used by search engines and sitemaps</summary> 
 public static string EditPage_LabelPageTitleHelp { get { return T("EditPage.LabelPageTitleHelp"); } } 
 /// <summary>Menu title</summary> 
 public static string EditPage_LabelMenuTitle { get { return T("EditPage.LabelMenuTitle"); } } 
 /// <summary>The entry specified in this field can be used in the navigation on the website</summary> 
 public static string EditPage_HelpMenuTitle { get { return T("EditPage.HelpMenuTitle"); } } 
 /// <summary>URL title</summary> 
 public static string EditPage_LabelUrlTitle { get { return T("EditPage.LabelUrlTitle"); } } 
 /// <summary>URL title was rewritten</summary> 
 public static string EditPage_UrlTitleFormattedTitle { get { return T("EditPage.UrlTitleFormattedTitle"); } } 
 /// <summary>According to the current URL replacement rules, URL title was changed to &apos;{0}&apos;</summary> 
 public static string EditPage_UrlTitleFormattedMessage(string parameter0) { return string.Format(T("EditPage.UrlTitleFormattedMessage"), parameter0); } 
 /// <summary>The entry specified in this field is shown in the browser address bar as a part of the URL address. The field is used by search engines</summary> 
 public static string EditPage_HelpUrlTitle { get { return T("EditPage.HelpUrlTitle"); } } 
 /// <summary>Friendly URL</summary> 
 public static string EditPage_LabelFriendlyUrl { get { return T("EditPage.LabelFriendlyUrl"); } } 
 /// <summary>The entry specified in this field is a shorter version of the actual page URL and redirects to it, when entered in the browser address bar. Note that some servers may have to be configured to support this feature.</summary> 
 public static string EditPage_HelpFriendlyUrl { get { return T("EditPage.HelpFriendlyUrl"); } } 
 /// <summary>Description</summary> 
 public static string EditPage_LabelAbstract { get { return T("EditPage.LabelAbstract"); } } 
 /// <summary>Use this field for a short description of the page</summary> 
 public static string EditPage_LabelAbstractHelp { get { return T("EditPage.LabelAbstractHelp"); } } 
 /// <summary>Publish date</summary> 
 public static string EditPage_LabelPublishDate { get { return T("EditPage.LabelPublishDate"); } } 
 /// <summary>Specify at which date and time you want the page to be published. At the specified time the page will automatically be published to the site</summary> 
 public static string EditPage_HelpPublishDate { get { return T("EditPage.HelpPublishDate"); } } 
 /// <summary>Unpublish date</summary> 
 public static string EditPage_LabelUnpublishDate { get { return T("EditPage.LabelUnpublishDate"); } } 
 /// <summary>Specify at which date and time you want the page to be unpublished. At the specified time the page will automatically be removed from the site</summary> 
 public static string EditPage_HelpUnpublishDate { get { return T("EditPage.HelpUnpublishDate"); } } 
 /// <summary>Content</summary> 
 public static string EditPage_LabelContent { get { return T("EditPage.LabelContent"); } } 
 /// <summary>Preview</summary> 
 public static string EditPage_LabelPreview { get { return T("EditPage.LabelPreview"); } } 
 /// <summary>Page type</summary> 
 public static string EditPage_PageTypeSelectorLabel { get { return T("EditPage.PageTypeSelectorLabel"); } } 
 /// <summary>The page type selection defines the role of the page, like &apos;a normal page&apos; or &apos;a blog&apos;. The options available depend on features installed.</summary> 
 public static string EditPage_PageTypeSelectorHelp { get { return T("EditPage.PageTypeSelectorHelp"); } } 
 /// <summary>{0} characters maximum</summary> 
 public static string EditPage_MaxLength(string parameter0) { return string.Format(T("EditPage.MaxLength"), parameter0); } 
 /// <summary>Delete page?</summary> 
 public static string DeletePage_LabelFieldGroup { get { return T("DeletePage.LabelFieldGroup"); } } 
 /// <summary>Delete page and all subpages</summary> 
 public static string DeletePageStep1_Title { get { return T("DeletePageStep1.Title"); } } 
 /// <summary>All subpages will also be deleted. Continue?</summary> 
 public static string DeletePageStep1_Description { get { return T("DeletePageStep1.Description"); } } 
 /// <summary>Delete page &apos;{0}&apos;?</summary> 
 public static string DeletePageStep2_Text(string parameter0) { return string.Format(T("DeletePageStep2.Text"), parameter0); } 
 /// <summary>Another page is using the specified URL title. URL titles must be unique among pages with the same parent.</summary> 
 public static string UrlTitleNotUniqueError { get { return T("UrlTitleNotUniqueError"); } } 
 /// <summary>The specified URL title contains invalid characters. Since this field is used to build the web address for the page, certain special characters (like question mark, slash and dot) are not allowed. You can use letters, digits and dash.</summary> 
 public static string UrlTitleNotValidError { get { return T("UrlTitleNotValidError"); } } 
 /// <summary>The specified URL title is too long. Make it shorter and try again</summary> 
 public static string UrlTitleTooLong { get { return T("UrlTitleTooLong"); } } 
 /// <summary>Another page is using the specified Friendly URL. Friendly URL&apos;s must be unique.</summary> 
 public static string FriendlyUrlNotUniqueError { get { return T("FriendlyUrlNotUniqueError"); } } 
 /// <summary>The title can not be empty.</summary> 
 public static string TitleMissingError { get { return T("TitleMissingError"); } } 
 /// <summary>Page not saved</summary> 
 public static string PageSaveValidationFailedTitle { get { return T("PageSaveValidationFailedTitle"); } } 
 /// <summary>The page did not validate and has not been saved. Please examine field messages.</summary> 
 public static string PageSaveValidationFailedMessage { get { return T("PageSaveValidationFailedMessage"); } } 
 /// <summary>Websites</summary> 
 public static string PageElementProvider_RootLabel { get { return T("PageElementProvider.RootLabel"); } } 
 /// <summary>Websites</summary> 
 public static string PageElementProvider_RootLabelToolTip { get { return T("PageElementProvider.RootLabelToolTip"); } } 
 /// <summary>Add Website...</summary> 
 public static string PageElementProvider_AddPageAtRoot { get { return T("PageElementProvider.AddPageAtRoot"); } } 
 /// <summary>Add new homepage</summary> 
 public static string PageElementProvider_AddPageAtRootToolTip { get { return T("PageElementProvider.AddPageAtRootToolTip"); } } 
 /// <summary>List Unpublished Pages</summary> 
 public static string PageElementProvider_ViewUnpublishedItems { get { return T("PageElementProvider.ViewUnpublishedItems"); } } 
 /// <summary>Get an overview of pages and page folder data that haven&apos;t been published yet.</summary> 
 public static string PageElementProvider_ViewUnpublishedItemsToolTip { get { return T("PageElementProvider.ViewUnpublishedItemsToolTip"); } } 
 /// <summary>Unpublished content</summary> 
 public static string PageElementProvider_ViewUnpublishedItems_document_title { get { return T("PageElementProvider.ViewUnpublishedItems-document-title"); } } 
 /// <summary>The list below displays pages and page data which are currently being edited or are ready to be approved / published.</summary> 
 public static string PageElementProvider_ViewUnpublishedItems_document_description { get { return T("PageElementProvider.ViewUnpublishedItems-document-description"); } } 
 /// <summary>Edit Page</summary> 
 public static string PageElementProvider_EditPage { get { return T("PageElementProvider.EditPage"); } } 
 /// <summary>Edit selected page</summary> 
 public static string PageElementProvider_EditPageToolTip { get { return T("PageElementProvider.EditPageToolTip"); } } 
 /// <summary>Delete</summary> 
 public static string PageElementProvider_Delete { get { return T("PageElementProvider.Delete"); } } 
 /// <summary>Delete the selected page</summary> 
 public static string PageElementProvider_DeleteToolTip { get { return T("PageElementProvider.DeleteToolTip"); } } 
 /// <summary>Translate Page</summary> 
 public static string PageElementProvider_LocalizePage { get { return T("PageElementProvider.LocalizePage"); } } 
 /// <summary>Translate selected page</summary> 
 public static string PageElementProvider_LocalizePageToolTip { get { return T("PageElementProvider.LocalizePageToolTip"); } } 
 /// <summary>Add Page...</summary> 
 public static string PageElementProvider_AddSubPage { get { return T("PageElementProvider.AddSubPage"); } } 
 /// <summary>Add new page below the selected</summary> 
 public static string PageElementProvider_AddSubPageToolTip { get { return T("PageElementProvider.AddSubPageToolTip"); } } 
 /// <summary>Browse Published Page</summary> 
 public static string PageElementProvider_ViewPublicPage { get { return T("PageElementProvider.ViewPublicPage"); } } 
 /// <summary>View last published version</summary> 
 public static string PageElementProvider_ViewPublicToolTip { get { return T("PageElementProvider.ViewPublicToolTip"); } } 
 /// <summary>Browse Saved Page</summary> 
 public static string PageElementProvider_ViewDraftPage { get { return T("PageElementProvider.ViewDraftPage"); } } 
 /// <summary>View recent changes</summary> 
 public static string PageElementProvider_ViewDraftToolTip { get { return T("PageElementProvider.ViewDraftToolTip"); } } 
 /// <summary>Show page local orderings</summary> 
 public static string PageElementProvider_DisplayLocalOrderingLabel { get { return T("PageElementProvider.DisplayLocalOrderingLabel"); } } 
 /// <summary>Show page local orderings</summary> 
 public static string PageElementProvider_DisplayLocalOrderingToolTip { get { return T("PageElementProvider.DisplayLocalOrderingToolTip"); } } 
 /// <summary>Not yet approved or published</summary> 
 public static string PageElementProvider_DisabledPage { get { return T("PageElementProvider.DisabledPage"); } } 
 /// <summary>Website Template required</summary> 
 public static string PageElementProvider_MissingTemplateTitle { get { return T("PageElementProvider.MissingTemplateTitle"); } } 
 /// <summary>To create a page, a Website Template is required, but none has been created yet. You can create one under the Layout perspective.</summary> 
 public static string PageElementProvider_MissingTemplateMessage { get { return T("PageElementProvider.MissingTemplateMessage"); } } 
 /// <summary>Language required</summary> 
 public static string PageElementProvider_MissingActiveLanguageTitle { get { return T("PageElementProvider.MissingActiveLanguageTitle"); } } 
 /// <summary>To add a page, you should firstly add at least one language. It can be done in the &apos;System&apos; perspective.</summary> 
 public static string PageElementProvider_MissingActiveLanguageMessage { get { return T("PageElementProvider.MissingActiveLanguageMessage"); } } 
 /// <summary>No page type available</summary> 
 public static string PageElementProvider_NoPageTypesAvailableTitle { get { return T("PageElementProvider.NoPageTypesAvailableTitle"); } } 
 /// <summary>You should create at least one page type first</summary> 
 public static string PageElementProvider_NoPageTypesAvailableMessage { get { return T("PageElementProvider.NoPageTypesAvailableMessage"); } } 
 /// <summary>Page type required</summary> 
 public static string PageElementProvider_MissingPageTypeTitle { get { return T("PageElementProvider.MissingPageTypeTitle"); } } 
 /// <summary>To create a homepage, a page type without the &quot;only subpages&quot; restriction is required, but none have been added yet. You can add one under the Layout perspective.</summary> 
 public static string PageElementProvider_MissingPageTypeHomepageMessage { get { return T("PageElementProvider.MissingPageTypeHomepageMessage"); } } 
 /// <summary>To create a subpage, a page type without the the only homepages restriction is required, but none have been added yet. You can add one under the Layout perspective.</summary> 
 public static string PageElementProvider_MissingPageTypeSubpageMessage { get { return T("PageElementProvider.MissingPageTypeSubpageMessage"); } } 
 /// <summary>Unable to add a page!</summary> 
 public static string PageElementProvider_RuleDontAllowPageAddTitle { get { return T("PageElementProvider.RuleDontAllowPageAddTitle"); } } 
 /// <summary>The rules that define availability for Page Types prohibit adding a page here.</summary> 
 public static string PageElementProvider_RuleDontAllowPageAddMessage { get { return T("PageElementProvider.RuleDontAllowPageAddMessage"); } } 
 /// <summary>Manage host name</summary> 
 public static string ManageHostNames_Add_DialogLabel { get { return T("ManageHostNames.Add.DialogLabel"); } } 
 /// <summary>Add host name association to page</summary> 
 public static string ManageHostNames_Add_HeadingTitle { get { return T("ManageHostNames.Add.HeadingTitle"); } } 
 /// <summary>You can associate a host name (or a domain name) to a page by specifying it in the field below. Please note that the DNS settings for the specified host name must also be configured, which is done outside this system.</summary> 
 public static string ManageHostNames_Add_HeadingDescription { get { return T("ManageHostNames.Add.HeadingDescription"); } } 
 /// <summary>Host name association to page</summary> 
 public static string ManageHostNames_Add_FieldGroupLabel { get { return T("ManageHostNames.Add.FieldGroupLabel"); } } 
 /// <summary>Host name</summary> 
 public static string ManageHostNames_Add_HostNameTextBoxLabel { get { return T("ManageHostNames.Add.HostNameTextBoxLabel"); } } 
 /// <summary>Specify the host name (like &apos;www.composite.net&apos; or &apos;composite.net&apos;) you want to associate with this page</summary> 
 public static string ManageHostNames_Add_HostNametextBoxHelp { get { return T("ManageHostNames.Add.HostNametextBoxHelp"); } } 
 /// <summary>The syntax of the host name is not valid</summary> 
 public static string ManageHostNames_Add_InvalidHostNameSyntaxError { get { return T("ManageHostNames.Add.InvalidHostNameSyntaxError"); } } 
 /// <summary>This host name is already associated to a page. You must remove the existing association first.</summary> 
 public static string ManageHostNames_Add_HostNameNotUniqueError { get { return T("ManageHostNames.Add.HostNameNotUniqueError"); } } 
 /// <summary>Manage host name</summary> 
 public static string ManageHostNames_Remove_DialogLabel { get { return T("ManageHostNames.Remove.DialogLabel"); } } 
 /// <summary>Remove host name association from page</summary> 
 public static string ManageHostNames_Remove_FieldGroupLabel { get { return T("ManageHostNames.Remove.FieldGroupLabel"); } } 
 /// <summary>Host names to remove</summary> 
 public static string ManageHostNames_Remove_MultiSelectorLabel { get { return T("ManageHostNames.Remove.MultiSelectorLabel"); } } 
 /// <summary>The host names you select will no longer be associated with the page</summary> 
 public static string ManageHostNames_Remove_MultiSelectorHelp { get { return T("ManageHostNames.Remove.MultiSelectorHelp"); } } 
 /// <summary>The selected page is not published</summary> 
 public static string Preview_PublishedPage_NotPublishedTitle { get { return T("Preview.PublishedPage.NotPublishedTitle"); } } 
 /// <summary>The selected page is not published</summary> 
 public static string Preview_PublishedPage_NotPublishedMessage { get { return T("Preview.PublishedPage.NotPublishedMessage"); } } 
 /// <summary>Please confirm deletion of all sub pages</summary> 
 public static string DeletePageWorkflow_MissingConfirmErrorMessage { get { return T("DeletePageWorkflow.MissingConfirmErrorMessage"); } } 
 /// <summary>Cascade delete error</summary> 
 public static string DeletePageWorkflow_CascadeDeleteErrorTitle { get { return T("DeletePageWorkflow.CascadeDeleteErrorTitle"); } } 
 /// <summary>The page is referenced by another type that does not allow cascade deletes. This operation is halted</summary> 
 public static string DeletePageWorkflow_CascadeDeleteErrorMessage { get { return T("DeletePageWorkflow.CascadeDeleteErrorMessage"); } } 
 /// <summary>Can not delete page</summary> 
 public static string DeletePageWorkflow_HasCompositionsTitle { get { return T("DeletePageWorkflow.HasCompositionsTitle"); } } 
 /// <summary>This page has one or more page folders or metadata fields defined on it. Delete these first.</summary> 
 public static string DeletePageWorkflow_HasCompositionsMessage { get { return T("DeletePageWorkflow.HasCompositionsMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PageTemplateElementProvider {
 /// <summary>Page Templates</summary> 
 public static string PageTemplateElementProvider_RootLabel { get { return T("PageTemplateElementProvider.RootLabel"); } } 
 /// <summary>You can find the sites XHTML templates here</summary> 
 public static string PageTemplateElementProvider_RootLabelToolTip { get { return T("PageTemplateElementProvider.RootLabelToolTip"); } } 
 /// <summary>Add Template</summary> 
 public static string PageTemplateElementProvider_AddTemplate { get { return T("PageTemplateElementProvider.AddTemplate"); } } 
 /// <summary>Add new template</summary> 
 public static string PageTemplateElementProvider_AddTemplateToolTip { get { return T("PageTemplateElementProvider.AddTemplateToolTip"); } } 
 /// <summary>Delete</summary> 
 public static string PageTemplateElementProvider_DeleteTemplate { get { return T("PageTemplateElementProvider.DeleteTemplate"); } } 
 /// <summary>Delete this item</summary> 
 public static string PageTemplateElementProvider_DeleteTemplateToolTip { get { return T("PageTemplateElementProvider.DeleteTemplateToolTip"); } } 
 /// <summary>Shared Code</summary> 
 public static string PageTemplateElementProvider_SharedCodeFolder_Title { get { return T("PageTemplateElementProvider.SharedCodeFolder.Title"); } } 
 /// <summary>Files used by layout files</summary> 
 public static string PageTemplateElementProvider_SharedCodeFolder_ToolTip { get { return T("PageTemplateElementProvider.SharedCodeFolder.ToolTip"); } } 
 /// <summary>Edit</summary> 
 public static string EditSharedCodeFile_Label { get { return T("EditSharedCodeFile.Label"); } } 
 /// <summary>Edit the file</summary> 
 public static string EditSharedCodeFile_ToolTip { get { return T("EditSharedCodeFile.ToolTip"); } } 
 /// <summary>Edit XML Template</summary> 
 public static string PageTemplateElementProvider_EditXmlTemplate { get { return T("PageTemplateElementProvider.EditXmlTemplate"); } } 
 /// <summary>Edit the selected XML template</summary> 
 public static string PageTemplateElementProvider_EditXmlTemplateToolTip { get { return T("PageTemplateElementProvider.EditXmlTemplateToolTip"); } } 
 /// <summary>Add New XML Page Template</summary> 
 public static string AddNewXmlPageTemplate_LabelDialog { get { return T("AddNewXmlPageTemplate.LabelDialog"); } } 
 /// <summary>XML Template</summary> 
 public static string AddNewXmlPageTemplate_LabelFieldGroup { get { return T("AddNewXmlPageTemplate.LabelFieldGroup"); } } 
 /// <summary>Template Title</summary> 
 public static string AddNewXmlPageTemplate_LabelTemplateTitle { get { return T("AddNewXmlPageTemplate.LabelTemplateTitle"); } } 
 /// <summary>The title identifies this template in lists. Consider selecting a short but meaningful name.</summary> 
 public static string AddNewXmlPageTemplate_LabelTemplateTitleHelp { get { return T("AddNewXmlPageTemplate.LabelTemplateTitleHelp"); } } 
 /// <summary>Copy from</summary> 
 public static string AddNewXmlPageTemplate_LabelCopyFrom { get { return T("AddNewXmlPageTemplate.LabelCopyFrom"); } } 
 /// <summary>You can copy the markup from another XML Page Template by selecting it in this list.</summary> 
 public static string AddNewXmlPageTemplate_LabelCopyFromHelp { get { return T("AddNewXmlPageTemplate.LabelCopyFromHelp"); } } 
 /// <summary>(New template)</summary> 
 public static string AddNewXmlPageTemplate_LabelCopyFromEmptyOption { get { return T("AddNewXmlPageTemplate.LabelCopyFromEmptyOption"); } } 
 /// <summary>Title already used</summary> 
 public static string AddNewXmlPageTemplateWorkflow_TitleInUseTitle { get { return T("AddNewXmlPageTemplateWorkflow.TitleInUseTitle"); } } 
 /// <summary>The title is too long (used as part of the XML filename).</summary> 
 public static string AddNewXmlPageTemplateWorkflow_TitleTooLong { get { return T("AddNewXmlPageTemplateWorkflow.TitleTooLong"); } } 
 /// <summary>Markup Code</summary> 
 public static string EditXmlPageTemplate_LabelMarkUpCode { get { return T("EditXmlPageTemplate.LabelMarkUpCode"); } } 
 /// <summary>Template Info</summary> 
 public static string EditXmlPageTemplate_LabelTemplateIdentification { get { return T("EditXmlPageTemplate.LabelTemplateIdentification"); } } 
 /// <summary>Template Title</summary> 
 public static string EditXmlPageTemplate_LabelTemplateTitle { get { return T("EditXmlPageTemplate.LabelTemplateTitle"); } } 
 /// <summary>The title identifies this template in lists. Consider selecting a short but meaningful name.</summary> 
 public static string EditXmlPageTemplate_LabelTemplateTitleHelp { get { return T("EditXmlPageTemplate.LabelTemplateTitleHelp"); } } 
 /// <summary>Unable to Save Template</summary> 
 public static string EditXmlPageTemplateWorkflow_InvalidXmlTitle { get { return T("EditXmlPageTemplateWorkflow.InvalidXmlTitle"); } } 
 /// <summary>The page template markup did not validate. {0}</summary> 
 public static string EditXmlPageTemplateWorkflow_InvalidXmlMessage(string parameter0) { return string.Format(T("EditXmlPageTemplateWorkflow.InvalidXmlMessage"), parameter0); } 
 /// <summary>Cannot rename a template - the file with the name &apos;{0}&apos; already exists.</summary> 
 public static string EditXmlPageTemplateWorkflow_CannotRenameFileExists(string parameter0) { return string.Format(T("EditXmlPageTemplateWorkflow.CannotRenameFileExists"), parameter0); } 
 /// <summary>Title already used</summary> 
 public static string EditXmlPageTemplateWorkflow_TitleInUseTitle { get { return T("EditXmlPageTemplateWorkflow.TitleInUseTitle"); } } 
 /// <summary>Delete This Page Template?</summary> 
 public static string DeletePageTemplateStep1_LabelFieldGroup { get { return T("DeletePageTemplateStep1.LabelFieldGroup"); } } 
 /// <summary>Delete page template?</summary> 
 public static string DeletePageTemplateStep1_Text { get { return T("DeletePageTemplateStep1.Text"); } } 
 /// <summary>Cascade Delete Error</summary> 
 public static string DeletePageTemplateWorkflow_CascadeDeleteErrorTitle { get { return T("DeletePageTemplateWorkflow.CascadeDeleteErrorTitle"); } } 
 /// <summary>The type is referenced by another type that does not allow cascade deletes. This operation is halted.</summary> 
 public static string DeletePageTemplateWorkflow_CascadeDeleteErrorMessage { get { return T("DeletePageTemplateWorkflow.CascadeDeleteErrorMessage"); } } 
 /// <summary>There are {0} page[s] referencing this template: {1}</summary> 
 public static string DeletePageTemplateWorkflow_PageReference(string parameter0,string parameter1) { return string.Format(T("DeletePageTemplateWorkflow.PageReference"), parameter0,parameter1); } 
 /// <summary>There are {0} page type[s] referencing this template: {1}</summary> 
 public static string DeletePageTemplateWorkflow_PageTypeReference(string parameter0,string parameter1) { return string.Format(T("DeletePageTemplateWorkflow.PageTypeReference"), parameter0,parameter1); } 
 /// <summary>Add New Page Template</summary> 
 public static string AddNewPageTemplate_LabelDialog { get { return T("AddNewPageTemplate.LabelDialog"); } } 
 /// <summary>New page template</summary> 
 public static string AddNewPageTemplate_LabelFieldGroup { get { return T("AddNewPageTemplate.LabelFieldGroup"); } } 
 /// <summary>Choose one of the possible types of page templates</summary> 
 public static string AddNewPageTemplate_TemplateTypeHelp { get { return T("AddNewPageTemplate.TemplateTypeHelp"); } } 
 /// <summary>Template type</summary> 
 public static string AddNewPageTemplate_TemplateTypeLabel { get { return T("AddNewPageTemplate.TemplateTypeLabel"); } } 
 /// <summary>Razor</summary> 
 public static string AddNewPageTemplate_TemplateType_Razor { get { return T("AddNewPageTemplate.TemplateType.Razor"); } } 
 /// <summary>Master Page</summary> 
 public static string AddNewPageTemplate_TemplateType_MasterPage { get { return T("AddNewPageTemplate.TemplateType.MasterPage"); } } 
 /// <summary>XML</summary> 
 public static string AddNewPageTemplate_TemplateType_XML { get { return T("AddNewPageTemplate.TemplateType.XML"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PageTemplateFeatureElementProvider {
 /// <summary>Page Template Features</summary> 
 public static string ElementProvider_RootLabel { get { return T("ElementProvider.RootLabel"); } } 
 /// <summary>Here you can find features - snippets of HTML and functionality - included in the website templates.</summary> 
 public static string ElementProvider_RootToolTip { get { return T("ElementProvider.RootToolTip"); } } 
 /// <summary>Add Template Feature</summary> 
 public static string ElementProvider_AddTemplateFeature { get { return T("ElementProvider.AddTemplateFeature"); } } 
 /// <summary>Add a new page template feature</summary> 
 public static string ElementProvider_AddTemplateFeatureToolTip { get { return T("ElementProvider.AddTemplateFeatureToolTip"); } } 
 /// <summary>Delete Template Feature</summary> 
 public static string ElementProvider_DeleteTemplateFeature { get { return T("ElementProvider.DeleteTemplateFeature"); } } 
 /// <summary>Delete this template feature</summary> 
 public static string ElementProvider_DeleteTemplateFeatureToolTip { get { return T("ElementProvider.DeleteTemplateFeatureToolTip"); } } 
 /// <summary>Edit Template Feature</summary> 
 public static string ElementProvider_EditTemplateFeature { get { return T("ElementProvider.EditTemplateFeature"); } } 
 /// <summary>Edit the selected template feature</summary> 
 public static string ElementProvider_EditTemplateFeatureToolTip { get { return T("ElementProvider.EditTemplateFeatureToolTip"); } } 
 /// <summary>Use Visual Editor</summary> 
 public static string ElementProvider_EditVisually { get { return T("ElementProvider.EditVisually"); } } 
 /// <summary>When enabled the visual editor will be used to manage this feature</summary> 
 public static string ElementProvider_EditVisuallyToolTip { get { return T("ElementProvider.EditVisuallyToolTip"); } } 
 /// <summary>Add New Page Template Feature</summary> 
 public static string AddWorkflow_LabelDialog { get { return T("AddWorkflow.LabelDialog"); } } 
 /// <summary>Page Template Feature</summary> 
 public static string AddWorkflow_LabelFieldGroup { get { return T("AddWorkflow.LabelFieldGroup"); } } 
 /// <summary>Feature name</summary> 
 public static string AddWorkflow_LabelTemplateFeatureName { get { return T("AddWorkflow.LabelTemplateFeatureName"); } } 
 /// <summary>The name is used to identify this feature when included in templates</summary> 
 public static string AddWorkflow_LabelTemplateFeatureNameHelp { get { return T("AddWorkflow.LabelTemplateFeatureNameHelp"); } } 
 /// <summary>Editor type</summary> 
 public static string AddWorkflow_LabelTemplateFeatureEditorType { get { return T("AddWorkflow.LabelTemplateFeatureEditorType"); } } 
 /// <summary>Choose which type of editor to use when maintaining this feature. You can always switch the editor type in the tree later.</summary> 
 public static string AddWorkflow_LabelTemplateFeatureEditorTypeHelp { get { return T("AddWorkflow.LabelTemplateFeatureEditorTypeHelp"); } } 
 /// <summary>Visual Editor</summary> 
 public static string AddWorkflow_LabelTemplateFeatureEditorType_html { get { return T("AddWorkflow.LabelTemplateFeatureEditorType.html"); } } 
 /// <summary>Markup Editor</summary> 
 public static string AddWorkflow_LabelTemplateFeatureEditorType_xml { get { return T("AddWorkflow.LabelTemplateFeatureEditorType.xml"); } } 
 /// <summary>The name is already used by another feature</summary> 
 public static string AddWorkflow_NameInUse { get { return T("AddWorkflow.NameInUse"); } } 
 /// <summary>The title is too long (max 50 characters)</summary> 
 public static string AddWorkflow_NameTooLong { get { return T("AddWorkflow.NameTooLong"); } } 
 /// <summary>The name must be usable in a file name - you have invalid characters you need to remove</summary> 
 public static string AddWorkflow_NameNotValidInFilename { get { return T("AddWorkflow.NameNotValidInFilename"); } } 
 /// <summary>Delete This Page Template Feature?</summary> 
 public static string DeleteWorkflow_Title { get { return T("DeleteWorkflow.Title"); } } 
 /// <summary>If this feature is in use by page templates, this action could lead to errors.</summary> 
 public static string DeleteWorkflow_Text { get { return T("DeleteWorkflow.Text"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PageTypeElementProvider {
 /// <summary>Page Types</summary> 
 public static string PageType_Tree_Root_Label { get { return T("PageType.Tree.Root.Label"); } } 
 /// <summary>Placeholder Content</summary> 
 public static string PageType_Tree_DefaultContentElement_Label { get { return T("PageType.Tree.DefaultContentElement.Label"); } } 
 /// <summary>Metadata Fields</summary> 
 public static string PageType_Tree_MetaDataFieldsElement_Label { get { return T("PageType.Tree.MetaDataFieldsElement.Label"); } } 
 /// <summary>Add Page Type</summary> 
 public static string PageType_Tree_AddNewPageType_Label { get { return T("PageType.Tree.AddNewPageType.Label"); } } 
 /// <summary>Add new page type</summary> 
 public static string PageType_Tree_AddNewPageType_ToolTip { get { return T("PageType.Tree.AddNewPageType.ToolTip"); } } 
 /// <summary>Edit Page Type</summary> 
 public static string PageType_Tree_EditPageType_Label { get { return T("PageType.Tree.EditPageType.Label"); } } 
 /// <summary>Edit selected page type</summary> 
 public static string PageType_Tree_EditPageType_ToolTip { get { return T("PageType.Tree.EditPageType.ToolTip"); } } 
 /// <summary>Delete Page Type</summary> 
 public static string PageType_Tree_DeletePageType_Label { get { return T("PageType.Tree.DeletePageType.Label"); } } 
 /// <summary>Delete selected page type</summary> 
 public static string PageType_Tree_DeletePageType_ToolTip { get { return T("PageType.Tree.DeletePageType.ToolTip"); } } 
 /// <summary>Add Default Content</summary> 
 public static string PageType_Tree_AddDefaultPageContent_Label { get { return T("PageType.Tree.AddDefaultPageContent.Label"); } } 
 /// <summary>Add placeholder default content</summary> 
 public static string PageType_Tree_AddDefaultPageContent_ToolTip { get { return T("PageType.Tree.AddDefaultPageContent.ToolTip"); } } 
 /// <summary>Edit Default Content</summary> 
 public static string PageType_Tree_EditDefaultPageContent_Label { get { return T("PageType.Tree.EditDefaultPageContent.Label"); } } 
 /// <summary>Edit placeholder default content</summary> 
 public static string PageType_Tree_EditDefaultPageContent_ToolTip { get { return T("PageType.Tree.EditDefaultPageContent.ToolTip"); } } 
 /// <summary>Delete Default Content</summary> 
 public static string PageType_Tree_DeleteDefaultPageContent_Label { get { return T("PageType.Tree.DeleteDefaultPageContent.Label"); } } 
 /// <summary>Delete default content</summary> 
 public static string PageType_Tree_DeleteDefaultPageContent_ToolTip { get { return T("PageType.Tree.DeleteDefaultPageContent.ToolTip"); } } 
 /// <summary>Add Metadata Field</summary> 
 public static string PageType_Tree_AddMetaDataField_Label { get { return T("PageType.Tree.AddMetaDataField.Label"); } } 
 /// <summary>Add new Metadata field</summary> 
 public static string PageType_Tree_AddMetaDataField_ToolTip { get { return T("PageType.Tree.AddMetaDataField.ToolTip"); } } 
 /// <summary>Edit Metadata Field</summary> 
 public static string PageType_Tree_EditMetaDataField_Label { get { return T("PageType.Tree.EditMetaDataField.Label"); } } 
 /// <summary>Edit selected Metadata field</summary> 
 public static string PageType_Tree_EditMetaDataField_ToolTip { get { return T("PageType.Tree.EditMetaDataField.ToolTip"); } } 
 /// <summary>Delete Metadata Field</summary> 
 public static string PageType_Tree_DeleteMetaDataField_Label { get { return T("PageType.Tree.DeleteMetaDataField.Label"); } } 
 /// <summary>Delete selected Metadata field</summary> 
 public static string PageType_Tree_DeleteMetaDataField_ToolTip { get { return T("PageType.Tree.DeleteMetaDataField.ToolTip"); } } 
 /// <summary>Add New Page Type</summary> 
 public static string PageType_AddNewPageTypeWorkflow_Layout_Label { get { return T("PageType.AddNewPageTypeWorkflow.Layout.Label"); } } 
 /// <summary>New page type settings</summary> 
 public static string PageType_AddNewPageTypeWorkflow_FieldGroup_Label { get { return T("PageType.AddNewPageTypeWorkflow.FieldGroup.Label"); } } 
 /// <summary>Name</summary> 
 public static string PageType_AddNewPageTypeWorkflow_NameTextBox_Label { get { return T("PageType.AddNewPageTypeWorkflow.NameTextBox.Label"); } } 
 /// <summary>The name of the new page type</summary> 
 public static string PageType_AddNewPageTypeWorkflow_NameTextBox_Help { get { return T("PageType.AddNewPageTypeWorkflow.NameTextBox.Help"); } } 
 /// <summary>Description</summary> 
 public static string PageType_AddNewPageTypeWorkflow_DescriptionTextArea_Label { get { return T("PageType.AddNewPageTypeWorkflow.DescriptionTextArea.Label"); } } 
 /// <summary>The description of the new page type</summary> 
 public static string PageType_AddNewPageTypeWorkflow_DescriptionTextArea_Help { get { return T("PageType.AddNewPageTypeWorkflow.DescriptionTextArea.Help"); } } 
 /// <summary>Settings</summary> 
 public static string PageType_EditPageTypeWorkflow_SettingsPlaceHolder_Label { get { return T("PageType.EditPageTypeWorkflow.SettingsPlaceHolder.Label"); } } 
 /// <summary>Page type settings</summary> 
 public static string PageType_EditPageTypeWorkflow_SettingsFieldGroup_Label { get { return T("PageType.EditPageTypeWorkflow.SettingsFieldGroup.Label"); } } 
 /// <summary>Name</summary> 
 public static string PageType_EditPageTypeWorkflow_NameTextBox_Label { get { return T("PageType.EditPageTypeWorkflow.NameTextBox.Label"); } } 
 /// <summary>The name of the page type</summary> 
 public static string PageType_EditPageTypeWorkflow_NameTextBox_Help { get { return T("PageType.EditPageTypeWorkflow.NameTextBox.Help"); } } 
 /// <summary>Description</summary> 
 public static string PageType_EditPageTypeWorkflow_DescriptionTextArea_Label { get { return T("PageType.EditPageTypeWorkflow.DescriptionTextArea.Label"); } } 
 /// <summary>The description of the page type</summary> 
 public static string PageType_EditPageTypeWorkflow_DescriptionTextArea_Help { get { return T("PageType.EditPageTypeWorkflow.DescriptionTextArea.Help"); } } 
 /// <summary>Available</summary> 
 public static string PageType_EditPageTypeWorkflow_AvailableCheckBox_Label { get { return T("PageType.EditPageTypeWorkflow.AvailableCheckBox.Label"); } } 
 /// <summary>Unchecking this will make this page non-selectable on any page</summary> 
 public static string PageType_EditPageTypeWorkflow_AvailableCheckBox_Help { get { return T("PageType.EditPageTypeWorkflow.AvailableCheckBox.Help"); } } 
 /// <summary>Preset menu title</summary> 
 public static string PageType_EditPageTypeWorkflow_PresetMenuTitleCheckBox_Label { get { return T("PageType.EditPageTypeWorkflow.PresetMenuTitleCheckBox.Label"); } } 
 /// <summary>If this is checked a default value for the menu title on pages is preset</summary> 
 public static string PageType_EditPageTypeWorkflow_PresetMenuTitleCheckBox_Help { get { return T("PageType.EditPageTypeWorkflow.PresetMenuTitleCheckBox.Help"); } } 
 /// <summary>Default child page type</summary> 
 public static string PageType_EditPageTypeWorkflow_DefaultChildPageTypeKeySelector_Label { get { return T("PageType.EditPageTypeWorkflow.DefaultChildPageTypeKeySelector.Label"); } } 
 /// <summary>Select a page type to be the default page type for child pages created with this page type</summary> 
 public static string PageType_EditPageTypeWorkflow_DefaultChildPageTypeKeySelector_Help { get { return T("PageType.EditPageTypeWorkflow.DefaultChildPageTypeKeySelector.Help"); } } 
 /// <summary>[None]</summary> 
 public static string PageType_EditPageTypeWorkflow_DefaultChildPageTypeKeySelector_NoneSelectedLabel { get { return T("PageType.EditPageTypeWorkflow.DefaultChildPageTypeKeySelector.NoneSelectedLabel"); } } 
 /// <summary>Layout</summary> 
 public static string PageType_EditPageTypeWorkflow_PageTemplatePlaceHolder_Label { get { return T("PageType.EditPageTypeWorkflow.PageTemplatePlaceHolder.Label"); } } 
 /// <summary>Layout</summary> 
 public static string PageType_EditPageTypeWorkflow_PageTemplateRestrictionFieldGroup_Label { get { return T("PageType.EditPageTypeWorkflow.PageTemplateRestrictionFieldGroup.Label"); } } 
 /// <summary>Layout restrictions</summary> 
 public static string PageType_EditPageTypeWorkflow_PageTemplateRestrictionMultiKeySelector_Label { get { return T("PageType.EditPageTypeWorkflow.PageTemplateRestrictionMultiKeySelector.Label"); } } 
 /// <summary>Select layouts to be only available when editing pages of this page type. If none is selected (default), all will be available.</summary> 
 public static string PageType_EditPageTypeWorkflow_PageTemplateRestrictionMultiKeySelector_Help { get { return T("PageType.EditPageTypeWorkflow.PageTemplateRestrictionMultiKeySelector.Help"); } } 
 /// <summary>Default layout</summary> 
 public static string PageType_EditPageTypeWorkflow_DefaultPageTemplateKeySelector_Label { get { return T("PageType.EditPageTypeWorkflow.DefaultPageTemplateKeySelector.Label"); } } 
 /// <summary>Select a layout to be the default layout for pages created with this page type</summary> 
 public static string PageType_EditPageTypeWorkflow_DefaultPageTemplateKeySelector_Help { get { return T("PageType.EditPageTypeWorkflow.DefaultPageTemplateKeySelector.Help"); } } 
 /// <summary>[None]</summary> 
 public static string PageType_EditPageTypeWorkflow_DefaultPageTemplateKeySelector_NoneSelectedLabel { get { return T("PageType.EditPageTypeWorkflow.DefaultPageTemplateKeySelector.NoneSelectedLabel"); } } 
 /// <summary>Availability</summary> 
 public static string PageType_EditPageTypeWorkflow_AvailabilityPlaceHolder_Label { get { return T("PageType.EditPageTypeWorkflow.AvailabilityPlaceHolder.Label"); } } 
 /// <summary>Availability</summary> 
 public static string PageType_EditPageTypeWorkflow_AvailabilityFieldGroup_Label { get { return T("PageType.EditPageTypeWorkflow.AvailabilityFieldGroup.Label"); } } 
 /// <summary>Homepage relation</summary> 
 public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_Label { get { return T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.Label"); } } 
 /// <summary>Homepage relation</summary> 
 public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_Help { get { return T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.Help"); } } 
 /// <summary>No restrictions</summary> 
 public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_NoRestrictionLabel { get { return T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.NoRestrictionLabel"); } } 
 /// <summary>Only sub pages</summary> 
 public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_OnlySubPagesLabel { get { return T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.OnlySubPagesLabel"); } } 
 /// <summary>Only home pages</summary> 
 public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_OnlyHomePagesLabel { get { return T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.OnlyHomePagesLabel"); } } 
 /// <summary>Page type parent restriction</summary> 
 public static string PageType_EditPageTypeWorkflow_PageTypeChildRestrictionMultiKeySelector_Label { get { return T("PageType.EditPageTypeWorkflow.PageTypeChildRestrictionMultiKeySelector.Label"); } } 
 /// <summary>Only allow this page type as for child pages with the selected page types</summary> 
 public static string PageType_EditPageTypeWorkflow_PageTypeChildRestrictionMultiKeySelector_Help { get { return T("PageType.EditPageTypeWorkflow.PageTypeChildRestrictionMultiKeySelector.Help"); } } 
 /// <summary>DataFolders / Applications</summary> 
 public static string PageType_EditPageTypeWorkflow_DataFolderApplicationPlaceHolder_Label { get { return T("PageType.EditPageTypeWorkflow.DataFolderApplicationPlaceHolder.Label"); } } 
 /// <summary>Data folders</summary> 
 public static string PageType_EditPageTypeWorkflow_DataFolderFieldGroup_Label { get { return T("PageType.EditPageTypeWorkflow.DataFolderFieldGroup.Label"); } } 
 /// <summary>Data folders</summary> 
 public static string PageType_EditPageTypeWorkflow_DataFolderMultiKeySelector_Label { get { return T("PageType.EditPageTypeWorkflow.DataFolderMultiKeySelector.Label"); } } 
 /// <summary>Select the data folders that should automatically be added to pages using this page type</summary> 
 public static string PageType_EditPageTypeWorkflow_DataFolderMultiKeySelector_Help { get { return T("PageType.EditPageTypeWorkflow.DataFolderMultiKeySelector.Help"); } } 
 /// <summary>Applications</summary> 
 public static string PageType_EditPageTypeWorkflow_ApplicationFieldGroup_Label { get { return T("PageType.EditPageTypeWorkflow.ApplicationFieldGroup.Label"); } } 
 /// <summary>Applications</summary> 
 public static string PageType_EditPageTypeWorkflow_ApplicationMultiKeySelector_Label { get { return T("PageType.EditPageTypeWorkflow.ApplicationMultiKeySelector.Label"); } } 
 /// <summary>Select the applications that should automatically be added to pages using this page type</summary> 
 public static string PageType_EditPageTypeWorkflow_ApplicationMultiKeySelector_Help { get { return T("PageType.EditPageTypeWorkflow.ApplicationMultiKeySelector.Help"); } } 
 /// <summary>The default layout is not one of the selected restricted layouts</summary> 
 public static string PageType_EditPageTypeWorkflow_ValidationError_DefaultTemplateNotInRestrictions { get { return T("PageType.EditPageTypeWorkflow.ValidationError.DefaultTemplateNotInRestrictions"); } } 
 /// <summary>Page type parent restrictions are not allowed with home pages only</summary> 
 public static string PageType_EditPageTypeWorkflow_ValidationError_HomepageRelationConflictsWithParentRestrictions { get { return T("PageType.EditPageTypeWorkflow.ValidationError.HomepageRelationConflictsWithParentRestrictions"); } } 
 /// <summary>Delete This Page Type?</summary> 
 public static string PageType_DeletePageTypeWorkflow_Confirm_Layout_Label { get { return T("PageType.DeletePageTypeWorkflow.Confirm.Layout.Label"); } } 
 /// <summary>Delete the page type {0}?</summary> 
 public static string PageType_DeletePageTypeWorkflow_Confirm_Layout_Messeage(string parameter0) { return string.Format(T("PageType.DeletePageTypeWorkflow.Confirm.Layout.Messeage"), parameter0); } 
 /// <summary>Page Type in Use</summary> 
 public static string PageType_DeletePageTypeWorkflow_PagesRefering_Layout_Label { get { return T("PageType.DeletePageTypeWorkflow.PagesRefering.Layout.Label"); } } 
 /// <summary>The page type {0} is in use and it is not possible to delete it</summary> 
 public static string PageType_DeletePageTypeWorkflow_PagesRefering_Layout_Message(string parameter0) { return string.Format(T("PageType.DeletePageTypeWorkflow.PagesRefering.Layout.Message"), parameter0); } 
 /// <summary>Add Default Content</summary> 
 public static string PageType_AddPageTypeDefaultPageContentWorkflow_Layout_Label { get { return T("PageType.AddPageTypeDefaultPageContentWorkflow.Layout.Label"); } } 
 /// <summary>Choose placeholder</summary> 
 public static string PageType_AddPageTypeDefaultPageContentWorkflow_FieldGroup_Label { get { return T("PageType.AddPageTypeDefaultPageContentWorkflow.FieldGroup.Label"); } } 
 /// <summary>Placeholder ID</summary> 
 public static string PageType_AddPageTypeDefaultPageContentWorkflow_PlaceHolderIdTextBox_Label { get { return T("PageType.AddPageTypeDefaultPageContentWorkflow.PlaceHolderIdTextBox.Label"); } } 
 /// <summary>The ID of the placeholder. You can write a non-existing ID and create the placeholder afterwards (by editing Page Template markup).</summary> 
 public static string PageType_AddPageTypeDefaultPageContentWorkflow_PlaceHolderIdTextBox_Help { get { return T("PageType.AddPageTypeDefaultPageContentWorkflow.PlaceHolderIdTextBox.Help"); } } 
 /// <summary>No templates with {0}</summary> 
 public static string PageType_AddPageTypeDefaultPageContentWorkflow_NonExistingPlaceholderId_Title(string parameter0) { return string.Format(T("PageType.AddPageTypeDefaultPageContentWorkflow.NonExistingPlaceholderId.Title"), parameter0); } 
 /// <summary>Please note that the Placeholder ID you specified &apos;{0}&apos;, is currently not in any Layout Template.</summary> 
 public static string PageType_AddPageTypeDefaultPageContentWorkflow_NonExistingPlaceholderId_Message(string parameter0) { return string.Format(T("PageType.AddPageTypeDefaultPageContentWorkflow.NonExistingPlaceholderId.Message"), parameter0); } 
 /// <summary>Edit default content</summary> 
 public static string PageType_EditPageTypeDefaultPageContentWorkflow_Layout_Label { get { return T("PageType.EditPageTypeDefaultPageContentWorkflow.Layout.Label"); } } 
 /// <summary>Settings</summary> 
 public static string PageType_EditPageTypeDefaultPageContentWorkflow_SettingsPlaceHolder_Label { get { return T("PageType.EditPageTypeDefaultPageContentWorkflow.SettingsPlaceHolder.Label"); } } 
 /// <summary>Placeholder Info</summary> 
 public static string PageType_EditPageTypeDefaultPageContentWorkflow_SettingsFieldGroup_Label { get { return T("PageType.EditPageTypeDefaultPageContentWorkflow.SettingsFieldGroup.Label"); } } 
 /// <summary>Placeholder ID</summary> 
 public static string PageType_EditPageTypeDefaultPageContentWorkflow_PlaceHolderIdTextBox_Label { get { return T("PageType.EditPageTypeDefaultPageContentWorkflow.PlaceHolderIdTextBox.Label"); } } 
 /// <summary>The ID of the placeholder. You can write a non-existing ID and create the placeholder afterwards (edit Page Template markup).</summary> 
 public static string PageType_EditPageTypeDefaultPageContentWorkflow_PlaceHolderIdTextBox_Help { get { return T("PageType.EditPageTypeDefaultPageContentWorkflow.PlaceHolderIdTextBox.Help"); } } 
 /// <summary>Content</summary> 
 public static string PageType_EditPageTypeDefaultPageContentWorkflow_ContentXhtmlEditor_Label { get { return T("PageType.EditPageTypeDefaultPageContentWorkflow.ContentXhtmlEditor.Label"); } } 
 /// <summary>Add Metadata Field</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_Layout_Label { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.Layout.Label"); } } 
 /// <summary></summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_FieldGroup_Label { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.FieldGroup.Label"); } } 
 /// <summary>Programmatic name</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_NameTextBox_Label { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.NameTextBox.Label"); } } 
 /// <summary>The unique name of the Metadata field. This can not be changed later!</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_NameTextBox_Help { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.NameTextBox.Help"); } } 
 /// <summary>Show with label</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_LabelTextBox_Label { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.LabelTextBox.Label"); } } 
 /// <summary>The label of the Metadata field. Used for UI.</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_LabelTextBox_Help { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.LabelTextBox.Help"); } } 
 /// <summary>Metadata type</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_MetaDataTypeKeySelector_Label { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.MetaDataTypeKeySelector.Label"); } } 
 /// <summary>The Metadata type</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_MetaDataTypeKeySelector_Help { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.MetaDataTypeKeySelector.Help"); } } 
 /// <summary>Display on tab</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_MetaDataContainerKeySelector_Label { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.MetaDataContainerKeySelector.Label"); } } 
 /// <summary>Select the tab to display the Metadata when editing a page.</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_MetaDataContainerKeySelector_Help { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.MetaDataContainerKeySelector.Help"); } } 
 /// <summary>Add Metadata default values</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_AddingDefaultMetaData_Title { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.AddingDefaultMetaData.Title"); } } 
 /// <summary>The field name with another type is already used.</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataFieldNameAlreadyUsed { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataFieldNameAlreadyUsed"); } } 
 /// <summary>Delete This Metadata Field?</summary> 
 public static string PageType_DeletePageTypeMetaDataFieldWorkflow_Confirm_Layout_Label { get { return T("PageType.DeletePageTypeMetaDataFieldWorkflow.Confirm.Layout.Label"); } } 
 /// <summary>Delete the Metadata field {0}? Warning: all its existing Metadata items will also be deleted</summary> 
 public static string PageType_DeletePageTypeMetaDataFieldWorkflow_Confirm_Layout_Message(string parameter0) { return string.Format(T("PageType.DeletePageTypeMetaDataFieldWorkflow.Confirm.Layout.Message"), parameter0); } 
 /// <summary>Edit Metadata Field</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_Layout_Label { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.Layout.Label"); } } 
 /// <summary>Metadata field settings</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_FieldGroup_Label { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.FieldGroup.Label"); } } 
 /// <summary>Label</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_LabelTextBox_Label { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.LabelTextBox.Label"); } } 
 /// <summary>The label of the Metadata field. Used for UI</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_LabelTextBox_Help { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.LabelTextBox.Help"); } } 
 /// <summary>Tab</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_MetaDataContainerKeySelector_Label { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.MetaDataContainerKeySelector.Label"); } } 
 /// <summary>Select the tab to put the Metadata when editing a page</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_MetaDataContainerKeySelector_Help { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.MetaDataContainerKeySelector.Help"); } } 
 /// <summary>Metatype</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_MetaTypeName_Label { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.MetaTypeName.Label"); } } 
 /// <summary>The name of the metatype.</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_MetaTypeName_Help { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.MetaTypeName.Help"); } } 
 /// <summary>The Metadata type is used another place with same name but different label</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataFieldNameAlreadyUsed { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataFieldNameAlreadyUsed"); } } 
 /// <summary>There exists one or more definitions with the same name, container change is not allowed</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataContainerChangeNotAllowed { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataContainerChangeNotAllowed"); } } 
 /// <summary>Metadata type has been deleted</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataTypeNotExisting_Title { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataTypeNotExisting.Title"); } } 
 /// <summary>The Metadata type has been deleted from the system and can no longer be added to any page types</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataTypeNotExisting_Message { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataTypeNotExisting.Message"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_RazorFunction {
 /// <summary>Razor Functions</summary> 
 public static string RootElement_Label { get { return T("RootElement.Label"); } } 
 /// <summary>Razor functions</summary> 
 public static string RootElement_ToolTip { get { return T("RootElement.ToolTip"); } } 
 /// <summary>Add Razor Function</summary> 
 public static string AddNewRazorFunction_Label { get { return T("AddNewRazorFunction.Label"); } } 
 /// <summary>Add a new Razor function</summary> 
 public static string AddNewRazorFunction_ToolTip { get { return T("AddNewRazorFunction.ToolTip"); } } 
 /// <summary>Edit</summary> 
 public static string EditRazorFunction_Label { get { return T("EditRazorFunction.Label"); } } 
 /// <summary>Edit Razor Function</summary> 
 public static string EditRazorFunction_ToolTip { get { return T("EditRazorFunction.ToolTip"); } } 
 /// <summary>Delete</summary> 
 public static string DeleteRazorFunction_Label { get { return T("DeleteRazorFunction.Label"); } } 
 /// <summary>Delete this Razor function</summary> 
 public static string DeleteRazorFunction_ToolTip { get { return T("DeleteRazorFunction.ToolTip"); } } 
 /// <summary>Add Razor Function</summary> 
 public static string AddNewRazorFunction_LabelDialog { get { return T("AddNewRazorFunction.LabelDialog"); } } 
 /// <summary>New Razor function</summary> 
 public static string AddNewRazorFunction_LabelFieldGroup { get { return T("AddNewRazorFunction.LabelFieldGroup"); } } 
 /// <summary>Name</summary> 
 public static string AddNewRazorFunction_LabelName { get { return T("AddNewRazorFunction.LabelName"); } } 
 /// <summary></summary> 
 public static string AddNewRazorFunction_HelpName { get { return T("AddNewRazorFunction.HelpName"); } } 
 /// <summary>Namespace</summary> 
 public static string AddNewRazorFunction_LabelNamespace { get { return T("AddNewRazorFunction.LabelNamespace"); } } 
 /// <summary></summary> 
 public static string AddNewRazorFunction_HelpNamespace { get { return T("AddNewRazorFunction.HelpNamespace"); } } 
 /// <summary>Copy from</summary> 
 public static string AddNewRazorFunction_LabelCopyFrom { get { return T("AddNewRazorFunction.LabelCopyFrom"); } } 
 /// <summary>You can copy the code from another Razor function by selecting it in this list.</summary> 
 public static string AddNewRazorFunction_LabelCopyFromHelp { get { return T("AddNewRazorFunction.LabelCopyFromHelp"); } } 
 /// <summary>(New Razor function)</summary> 
 public static string AddNewRazorFunction_LabelCopyFromEmptyOption { get { return T("AddNewRazorFunction.LabelCopyFromEmptyOption"); } } 
 /// <summary>A C1 function with the same name already exists.</summary> 
 public static string AddNewRazorFunctionWorkflow_DuplicateName { get { return T("AddNewRazorFunctionWorkflow.DuplicateName"); } } 
 /// <summary>The function name is empty</summary> 
 public static string AddNewRazorFunctionWorkflow_EmptyName { get { return T("AddNewRazorFunctionWorkflow.EmptyName"); } } 
 /// <summary>The function namespace is empty</summary> 
 public static string AddNewRazorFunctionWorkflow_NamespaceEmpty { get { return T("AddNewRazorFunctionWorkflow.NamespaceEmpty"); } } 
 /// <summary>The namespace must be like A.B.C - not starting or ending with a period (.)</summary> 
 public static string AddNewRazorFunctionWorkflow_InvalidNamespace { get { return T("AddNewRazorFunctionWorkflow.InvalidNamespace"); } } 
 /// <summary>The total length of the name and the namespace is too long (used to name the .cshtml file).</summary> 
 public static string AddNewRazorFunctionWorkflow_TotalNameTooLang { get { return T("AddNewRazorFunctionWorkflow.TotalNameTooLang"); } } 
 /// <summary>Validation Error</summary> 
 public static string EditRazorFunctionWorkflow_Validation_DialogTitle { get { return T("EditRazorFunctionWorkflow.Validation.DialogTitle"); } } 
 /// <summary>Compilation failed: {0}</summary> 
 public static string EditRazorFunctionWorkflow_Validation_CompilationFailed(string parameter0) { return string.Format(T("EditRazorFunctionWorkflow.Validation.CompilationFailed"), parameter0); } 
 /// <summary>Razor function should inherit &apos;{0}&apos;</summary> 
 public static string EditRazorFunctionWorkflow_Validation_IncorrectBaseClass(string parameter0) { return string.Format(T("EditRazorFunctionWorkflow.Validation.IncorrectBaseClass"), parameter0); } 
 /// <summary>Delete Razor Function?</summary> 
 public static string DeleteRazorFunctionWorkflow_ConfirmDeleteTitle { get { return T("DeleteRazorFunctionWorkflow.ConfirmDeleteTitle"); } } 
 /// <summary>Delete the selected Razor function?</summary> 
 public static string DeleteRazorFunctionWorkflow_ConfirmDeleteMessage { get { return T("DeleteRazorFunctionWorkflow.ConfirmDeleteMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.RazorFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_RazorPageTemplate {
 /// <summary>Edit Razor File</summary> 
 public static string EditRazorFileAction_Label { get { return T("EditRazorFileAction.Label"); } } 
 /// <summary>Edit the cshtml file</summary> 
 public static string EditRazorFileAction_ToolTip { get { return T("EditRazorFileAction.ToolTip"); } } 
 /// <summary>Edit Razor Template</summary> 
 public static string EditRazorTemplateAction_Label { get { return T("EditRazorTemplateAction.Label"); } } 
 /// <summary>Edit the cshtml file behind the template</summary> 
 public static string EditRazorTemplateAction_ToolTip { get { return T("EditRazorTemplateAction.ToolTip"); } } 
 /// <summary>Delete</summary> 
 public static string DeleteRazorPageTemplateAction_Label { get { return T("DeleteRazorPageTemplateAction.Label"); } } 
 /// <summary>Delete page template</summary> 
 public static string DeleteRazorPageTemplateAction_ToolTip { get { return T("DeleteRazorPageTemplateAction.ToolTip"); } } 
 /// <summary>Add New Razor Template</summary> 
 public static string AddNewRazorPageTemplate_LabelDialog { get { return T("AddNewRazorPageTemplate.LabelDialog"); } } 
 /// <summary>Razor Template</summary> 
 public static string AddNewRazorPageTemplate_LabelFieldGroup { get { return T("AddNewRazorPageTemplate.LabelFieldGroup"); } } 
 /// <summary>Template Title</summary> 
 public static string AddNewRazorPageTemplate_LabelTemplateTitle { get { return T("AddNewRazorPageTemplate.LabelTemplateTitle"); } } 
 /// <summary>The title identifies this template in lists. Consider selecting a short but meaningful name.</summary> 
 public static string AddNewRazorPageTemplate_LabelTemplateTitleHelp { get { return T("AddNewRazorPageTemplate.LabelTemplateTitleHelp"); } } 
 /// <summary>Copy from</summary> 
 public static string AddNewRazorPageTemplate_LabelCopyFrom { get { return T("AddNewRazorPageTemplate.LabelCopyFrom"); } } 
 /// <summary>You can copy the markup from another Layout Template by selecting it in this list.</summary> 
 public static string AddNewRazorPageTemplate_LabelCopyFromHelp { get { return T("AddNewRazorPageTemplate.LabelCopyFromHelp"); } } 
 /// <summary>(New template)</summary> 
 public static string AddNewRazorPageTemplate_LabelCopyFromEmptyOption { get { return T("AddNewRazorPageTemplate.LabelCopyFromEmptyOption"); } } 
 /// <summary>Title already used</summary> 
 public static string AddNewRazorPageTemplateWorkflow_TitleInUseTitle { get { return T("AddNewRazorPageTemplateWorkflow.TitleInUseTitle"); } } 
 /// <summary>The title is too long (used as part of the .cshtml filename).</summary> 
 public static string AddNewRazorPageTemplateWorkflow_TitleTooLong { get { return T("AddNewRazorPageTemplateWorkflow.TitleTooLong"); } } 
 /// <summary>Validation error</summary> 
 public static string EditTemplate_Validation_DialogTitle { get { return T("EditTemplate.Validation.DialogTitle"); } } 
 /// <summary>Compilation failed: {0}</summary> 
 public static string EditTemplate_Validation_CompilationFailed(string parameter0) { return string.Format(T("EditTemplate.Validation.CompilationFailed"), parameter0); } 
 /// <summary>Page template class does not inherit &apos;{0}&apos;</summary> 
 public static string EditTemplate_Validation_IncorrectBaseClass(string parameter0) { return string.Format(T("EditTemplate.Validation.IncorrectBaseClass"), parameter0); } 
 /// <summary>Failed to evaluate page template property &apos;{0}&apos;. Excepton: {1}</summary> 
 public static string EditTemplate_Validation_PropertyError(string parameter0,string parameter1) { return string.Format(T("EditTemplate.Validation.PropertyError"), parameter0,parameter1); } 
 /// <summary>It is not allowed to change template id through current workflow. Original template id is &apos;{0}&apos;</summary> 
 public static string EditTemplate_Validation_TemplateIdChanged(string parameter0) { return string.Format(T("EditTemplate.Validation.TemplateIdChanged"), parameter0); } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.RazorPageTemplate", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_SqlFunction {
 /// <summary>SQL Functions</summary> 
 public static string SqlFunctionElementProvider_RootLabel { get { return T("SqlFunctionElementProvider.RootLabel"); } } 
 /// <summary>Add Connections and then queries to connections</summary> 
 public static string SqlFunctionElementProvider_RootLabelToolTip { get { return T("SqlFunctionElementProvider.RootLabelToolTip"); } } 
 /// <summary>Add SQL Connection</summary> 
 public static string SqlFunctionElementProvider_AddConnection { get { return T("SqlFunctionElementProvider.AddConnection"); } } 
 /// <summary>Add new SQL connection</summary> 
 public static string SqlFunctionElementProvider_AddConnectionToolTip { get { return T("SqlFunctionElementProvider.AddConnectionToolTip"); } } 
 /// <summary>Edit</summary> 
 public static string SqlFunctionElementProvider_EditConnection { get { return T("SqlFunctionElementProvider.EditConnection"); } } 
 /// <summary>Edit SQL connection</summary> 
 public static string SqlFunctionElementProvider_EditConnectionToolTip { get { return T("SqlFunctionElementProvider.EditConnectionToolTip"); } } 
 /// <summary>Delete</summary> 
 public static string SqlFunctionElementProvider_DeleteConnection { get { return T("SqlFunctionElementProvider.DeleteConnection"); } } 
 /// <summary>Delete SQL connection</summary> 
 public static string SqlFunctionElementProvider_DeleteConnectionToolTip { get { return T("SqlFunctionElementProvider.DeleteConnectionToolTip"); } } 
 /// <summary>Add New SQL Query</summary> 
 public static string SqlFunctionElementProvider_AddQuery { get { return T("SqlFunctionElementProvider.AddQuery"); } } 
 /// <summary>Add a new SQL XML Provider</summary> 
 public static string SqlFunctionElementProvider_AddQueryToolTip { get { return T("SqlFunctionElementProvider.AddQueryToolTip"); } } 
 /// <summary>Edit</summary> 
 public static string SqlFunctionElementProvider_EditQuery { get { return T("SqlFunctionElementProvider.EditQuery"); } } 
 /// <summary>Edit SQL Query</summary> 
 public static string SqlFunctionElementProvider_EditQueryToolTip { get { return T("SqlFunctionElementProvider.EditQueryToolTip"); } } 
 /// <summary>Delete</summary> 
 public static string SqlFunctionElementProvider_DeleteQuery { get { return T("SqlFunctionElementProvider.DeleteQuery"); } } 
 /// <summary>Delete SQL Query</summary> 
 public static string SqlFunctionElementProvider_DeleteQueryToolTip { get { return T("SqlFunctionElementProvider.DeleteQueryToolTip"); } } 
 /// <summary>Add New SQL Query</summary> 
 public static string AddNewSqlFunction_LabelDialog { get { return T("AddNewSqlFunction.LabelDialog"); } } 
 /// <summary>Function naming</summary> 
 public static string AddNewSqlFunction_LabelNamingPanel { get { return T("AddNewSqlFunction.LabelNamingPanel"); } } 
 /// <summary>Name</summary> 
 public static string AddNewSqlFunction_LabelName { get { return T("AddNewSqlFunction.LabelName"); } } 
 /// <summary></summary> 
 public static string AddNewSqlFunction_HelpName { get { return T("AddNewSqlFunction.HelpName"); } } 
 /// <summary>Namespace</summary> 
 public static string AddNewSqlFunction_LabelNamespace { get { return T("AddNewSqlFunction.LabelNamespace"); } } 
 /// <summary></summary> 
 public static string AddNewSqlFunction_HelpNamespace { get { return T("AddNewSqlFunction.HelpNamespace"); } } 
 /// <summary>SQL command text</summary> 
 public static string AddNewSqlFunction_LabelQueryCOmmand { get { return T("AddNewSqlFunction.LabelQueryCOmmand"); } } 
 /// <summary></summary> 
 public static string AddNewSqlFunction_HelpQueryCOmmand { get { return T("AddNewSqlFunction.HelpQueryCOmmand"); } } 
 /// <summary>Is a Stored Procedure</summary> 
 public static string AddEditSqlFunction_LabelIsStoredProcedure { get { return T("AddEditSqlFunction.LabelIsStoredProcedure"); } } 
 /// <summary>Yes, the command is a procedure</summary> 
 public static string AddEditSqlFunction_LabelIsStoredProcedureCheckBox { get { return T("AddEditSqlFunction.LabelIsStoredProcedureCheckBox"); } } 
 /// <summary>Returns result as XML</summary> 
 public static string AddEditSqlFunction_LabelReturnsXml { get { return T("AddEditSqlFunction.LabelReturnsXml"); } } 
 /// <summary>Yes, the command returns XML</summary> 
 public static string AddEditSqlFunction_LabelReturnsXmlCheckBox { get { return T("AddEditSqlFunction.LabelReturnsXmlCheckBox"); } } 
 /// <summary>Is a query</summary> 
 public static string AddEditSqlFunction_LabelIsQuery { get { return T("AddEditSqlFunction.LabelIsQuery"); } } 
 /// <summary>Yes, the command returns data</summary> 
 public static string AddEditSqlFunction_LabelIsQueryCheckBox { get { return T("AddEditSqlFunction.LabelIsQueryCheckBox"); } } 
 /// <summary>SQL Command behaviour</summary> 
 public static string AddEditSqlFunction_LabelCommandBehaviour { get { return T("AddEditSqlFunction.LabelCommandBehaviour"); } } 
 /// <summary>SQL Connection settings</summary> 
 public static string AddEditSqlFunctionConnection_LabelFieldGroup { get { return T("AddEditSqlFunctionConnection.LabelFieldGroup"); } } 
 /// <summary>SQL Command</summary> 
 public static string AddEditSqlFunction_LabelSqlEditor { get { return T("AddEditSqlFunction.LabelSqlEditor"); } } 
 /// <summary>Add New SQL Connection</summary> 
 public static string AddNewSqlFunctionConnection_LabelDialog { get { return T("AddNewSqlFunctionConnection.LabelDialog"); } } 
 /// <summary>Name</summary> 
 public static string AddNewSqlFunctionConnection_LabelName { get { return T("AddNewSqlFunctionConnection.LabelName"); } } 
 /// <summary></summary> 
 public static string AddNewSqlFunctionConnection_HelpName { get { return T("AddNewSqlFunctionConnection.HelpName"); } } 
 /// <summary>Connection String</summary> 
 public static string AddNewSqlFunctionConnection_LabelConnectionString { get { return T("AddNewSqlFunctionConnection.LabelConnectionString"); } } 
 /// <summary></summary> 
 public static string AddNewSqlFunctionConnection_HelpConnectionString { get { return T("AddNewSqlFunctionConnection.HelpConnectionString"); } } 
 /// <summary>MS SQL Server</summary> 
 public static string AddNewSqlFunctionConnection_LabelIsMSSQL { get { return T("AddNewSqlFunctionConnection.LabelIsMSSQL"); } } 
 /// <summary>Database is a MS SQL Server</summary> 
 public static string AddNewSqlFunctionConnection_LabelIsMSSQLCheckBox { get { return T("AddNewSqlFunctionConnection.LabelIsMSSQLCheckBox"); } } 
 /// <summary>Input Parameters</summary> 
 public static string EditSqlFunction_LabelInputParameters { get { return T("EditSqlFunction.LabelInputParameters"); } } 
 /// <summary>Settings</summary> 
 public static string EditSqlFunction_LabelSettings { get { return T("EditSqlFunction.LabelSettings"); } } 
 /// <summary>Function name and description</summary> 
 public static string EditSqlFunction_LabelNamingAndDescription { get { return T("EditSqlFunction.LabelNamingAndDescription"); } } 
 /// <summary>Name</summary> 
 public static string EditSqlFunction_LabelName { get { return T("EditSqlFunction.LabelName"); } } 
 /// <summary></summary> 
 public static string EditSqlFunction_HelpName { get { return T("EditSqlFunction.HelpName"); } } 
 /// <summary>Namespace</summary> 
 public static string EditSqlFunction_LabelNamespace { get { return T("EditSqlFunction.LabelNamespace"); } } 
 /// <summary></summary> 
 public static string EditSqlFunction_HelpNamespace { get { return T("EditSqlFunction.HelpNamespace"); } } 
 /// <summary>Description</summary> 
 public static string EditSqlFunction_LabelDescription { get { return T("EditSqlFunction.LabelDescription"); } } 
 /// <summary></summary> 
 public static string EditSqlFunction_HelpDescription { get { return T("EditSqlFunction.HelpDescription"); } } 
 /// <summary>Preview</summary> 
 public static string EditSqlFunction_LabelPreview { get { return T("EditSqlFunction.LabelPreview"); } } 
 /// <summary>Name</summary> 
 public static string EditSqlFunctionConnection_LabelName { get { return T("EditSqlFunctionConnection.LabelName"); } } 
 /// <summary></summary> 
 public static string EditSqlFunctionConnection_HelpName { get { return T("EditSqlFunctionConnection.HelpName"); } } 
 /// <summary>Connection String</summary> 
 public static string EditSqlFunctionConnection_LabelConnectionString { get { return T("EditSqlFunctionConnection.LabelConnectionString"); } } 
 /// <summary></summary> 
 public static string EditSqlFunctionConnection_HelpConnectionString { get { return T("EditSqlFunctionConnection.HelpConnectionString"); } } 
 /// <summary>MS SQL Server</summary> 
 public static string EditSqlFunctionConnection_LabelIsMSSQL { get { return T("EditSqlFunctionConnection.LabelIsMSSQL"); } } 
 /// <summary>Database is a MS SQL Server</summary> 
 public static string EditSqlFunctionConnection_LabelIsMSSQLCheckBox { get { return T("EditSqlFunctionConnection.LabelIsMSSQLCheckBox"); } } 
 /// <summary>Delete This SQL Connection?</summary> 
 public static string DeleteSqlConnection_LabelFieldGroup { get { return T("DeleteSqlConnection.LabelFieldGroup"); } } 
 /// <summary>Delete this SQL connection?</summary> 
 public static string DeleteSqlConnection_Text { get { return T("DeleteSqlConnection.Text"); } } 
 /// <summary>Delete This SQL Function?</summary> 
 public static string DeleteSqlFunction_LabelFieldGroup { get { return T("DeleteSqlFunction.LabelFieldGroup"); } } 
 /// <summary>Delete this SQL function?</summary> 
 public static string DeleteSqlFunction_Text { get { return T("DeleteSqlFunction.Text"); } } 
 /// <summary>Cascade Delete Error</summary> 
 public static string CascadeDeleteErrorTitle { get { return T("CascadeDeleteErrorTitle"); } } 
 /// <summary>The type is referenced by another type that does not allow cascade deletes. This operation is halted</summary> 
 public static string CascadeDeleteErrorMessage { get { return T("CascadeDeleteErrorMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_StandardFunctions {
 /// <summary>Loads an ASP.NET User Control</summary> 
 public static string Composite_AspNet_LoadUserControl_description { get { return T("Composite.AspNet.LoadUserControl.description"); } } 
 /// <summary>The path to the User Controls .ascx file, like “~/Controls/MyControl.ascx”</summary> 
 public static string Composite_AspNet_LoadUserControl_param_Path_help { get { return T("Composite.AspNet.LoadUserControl.param.Path.help"); } } 
 /// <summary>Path</summary> 
 public static string Composite_AspNet_LoadUserControl_param_Path_label { get { return T("Composite.AspNet.LoadUserControl.param.Path.label"); } } 
 /// <summary>Lets you specify constant boolean value</summary> 
 public static string Composite_Constant_Boolean_description { get { return T("Composite.Constant.Boolean.description"); } } 
 /// <summary></summary> 
 public static string Composite_Constant_Boolean_param_Constant_help { get { return T("Composite.Constant.Boolean.param.Constant.help"); } } 
 /// <summary>Value</summary> 
 public static string Composite_Constant_Boolean_param_Constant_label { get { return T("Composite.Constant.Boolean.param.Constant.label"); } } 
 /// <summary>Lets you specify constant date and time value</summary> 
 public static string Composite_Constant_DateTime_description { get { return T("Composite.Constant.DateTime.description"); } } 
 /// <summary></summary> 
 public static string Composite_Constant_DateTime_param_Constant_help { get { return T("Composite.Constant.DateTime.param.Constant.help"); } } 
 /// <summary>Value</summary> 
 public static string Composite_Constant_DateTime_param_Constant_label { get { return T("Composite.Constant.DateTime.param.Constant.label"); } } 
 /// <summary>Lets you specify constant decimal value</summary> 
 public static string Composite_Constant_Decimal_description { get { return T("Composite.Constant.Decimal.description"); } } 
 /// <summary></summary> 
 public static string Composite_Constant_Decimal_param_Constant_help { get { return T("Composite.Constant.Decimal.param.Constant.help"); } } 
 /// <summary>Value</summary> 
 public static string Composite_Constant_Decimal_param_Constant_label { get { return T("Composite.Constant.Decimal.param.Constant.label"); } } 
 /// <summary>Lets you specify constant Guid value</summary> 
 public static string Composite_Constant_Guid_description { get { return T("Composite.Constant.Guid.description"); } } 
 /// <summary></summary> 
 public static string Composite_Constant_Guid_param_Constant_help { get { return T("Composite.Constant.Guid.param.Constant.help"); } } 
 /// <summary>Value</summary> 
 public static string Composite_Constant_Guid_param_Constant_label { get { return T("Composite.Constant.Guid.param.Constant.label"); } } 
 /// <summary>Lets you specify constant integer value</summary> 
 public static string Composite_Constant_Integer_description { get { return T("Composite.Constant.Integer.description"); } } 
 /// <summary></summary> 
 public static string Composite_Constant_Integer_param_Constant_help { get { return T("Composite.Constant.Integer.param.Constant.help"); } } 
 /// <summary>Value</summary> 
 public static string Composite_Constant_Integer_param_Constant_label { get { return T("Composite.Constant.Integer.param.Constant.label"); } } 
 /// <summary>Lets you specify constant string value</summary> 
 public static string Composite_Constant_String_description { get { return T("Composite.Constant.String.description"); } } 
 /// <summary></summary> 
 public static string Composite_Constant_String_param_Constant_help { get { return T("Composite.Constant.String.param.Constant.help"); } } 
 /// <summary>Value</summary> 
 public static string Composite_Constant_String_param_Constant_label { get { return T("Composite.Constant.String.param.Constant.label"); } } 
 /// <summary>Lets you visually specify a Xhtml document constant</summary> 
 public static string Composite_Constant_XhtmlDocument_description { get { return T("Composite.Constant.XhtmlDocument.description"); } } 
 /// <summary></summary> 
 public static string Composite_Constant_XhtmlDocument_param_Constant_help { get { return T("Composite.Constant.XhtmlDocument.param.Constant.help"); } } 
 /// <summary>Value</summary> 
 public static string Composite_Constant_XhtmlDocument_param_Constant_label { get { return T("Composite.Constant.XhtmlDocument.param.Constant.label"); } } 
 /// <summary>Adds a new instance of the given type.</summary> 
 public static string Composite_IDataGenerated_AddDataInstance_description { get { return T("Composite.IDataGenerated.AddDataInstance.description"); } } 
 /// <summary>Updates instance(s) with the given values.</summary> 
 public static string Composite_IDataGenerated_UpdateDataInstance_description { get { return T("Composite.IDataGenerated.UpdateDataInstance.description"); } } 
 /// <summary></summary> 
 public static string Composite_IDataGenerated_UpdateDataInstance_param_Filter_help { get { return T("Composite.IDataGenerated.UpdateDataInstance.param.Filter.help"); } } 
 /// <summary>Filter</summary> 
 public static string Composite_IDataGenerated_UpdateDataInstance_param_Filter_label { get { return T("Composite.IDataGenerated.UpdateDataInstance.param.Filter.label"); } } 
 /// <summary>Deletes instance(s) with the given filter.</summary> 
 public static string Composite_IDataGenerated_DeleteDataInstance_description { get { return T("Composite.IDataGenerated.DeleteDataInstance.description"); } } 
 /// <summary></summary> 
 public static string Composite_IDataGenerated_DeleteDataInstance_param_Filter_help { get { return T("Composite.IDataGenerated.DeleteDataInstance.param.Filter.help"); } } 
 /// <summary>Filter</summary> 
 public static string Composite_IDataGenerated_DeleteDataInstance_param_Filter_label { get { return T("Composite.IDataGenerated.DeleteDataInstance.param.Filter.label"); } } 
 /// <summary>Creates a DataReference based on a key value.</summary> 
 public static string Composite_IDataGenerated_GetDataReference_description { get { return T("Composite.IDataGenerated.GetDataReference.description"); } } 
 /// <summary>The key value of the data to reference.</summary> 
 public static string Composite_IDataGenerated_GetDataReference_param_KeyValue_help { get { return T("Composite.IDataGenerated.GetDataReference.param.KeyValue.help"); } } 
 /// <summary>Key value</summary> 
 public static string Composite_IDataGenerated_GetDataReference_param_KeyValue_label { get { return T("Composite.IDataGenerated.GetDataReference.param.KeyValue.label"); } } 
 /// <summary>Creates a NullableDataReference based on a key value. The default value is &apos;null&apos;, no reference.</summary> 
 public static string Composite_IDataGenerated_GetNullableDataReference_description { get { return T("Composite.IDataGenerated.GetNullableDataReference.description"); } } 
 /// <summary>The key value of the data to reference.</summary> 
 public static string Composite_IDataGenerated_GetNullableDataReference_param_KeyValue_help { get { return T("Composite.IDataGenerated.GetNullableDataReference.param.KeyValue.help"); } } 
 /// <summary>Key value</summary> 
 public static string Composite_IDataGenerated_GetNullableDataReference_param_KeyValue_label { get { return T("Composite.IDataGenerated.GetNullableDataReference.param.KeyValue.label"); } } 
 /// <summary>Converts a DataReference into a single element filter. This filter will select a maximum of one item.</summary> 
 public static string Composite_IDataGenerated_Filter_DataReferenceFilter_description { get { return T("Composite.IDataGenerated.Filter.DataReferenceFilter.description"); } } 
 /// <summary>The Data Reference to use when selecting data.</summary> 
 public static string Composite_IDataGenerated_Filter_DataReferenceFilter_param_DataReference_help { get { return T("Composite.IDataGenerated.Filter.DataReferenceFilter.param.DataReference.help"); } } 
 /// <summary>Data Reference</summary> 
 public static string Composite_IDataGenerated_Filter_DataReferenceFilter_param_DataReference_label { get { return T("Composite.IDataGenerated.Filter.DataReferenceFilter.param.DataReference.label"); } } 
 /// <summary>Lets you select data based on its reference to the currently rendered page.</summary> 
 public static string Composite_IDataGenerated_Filter_ActivePageReferenceFilter_description { get { return T("Composite.IDataGenerated.Filter.ActivePageReferenceFilter.description"); } } 
 /// <summary>Select what relation the current page must have with the data you wish to retrieve.</summary> 
 public static string Composite_IDataGenerated_Filter_ActivePageReferenceFilter_param_SitemapScope_help { get { return T("Composite.IDataGenerated.Filter.ActivePageReferenceFilter.param.SitemapScope.help"); } } 
 /// <summary>Page scope</summary> 
 public static string Composite_IDataGenerated_Filter_ActivePageReferenceFilter_param_SitemapScope_label { get { return T("Composite.IDataGenerated.Filter.ActivePageReferenceFilter.param.SitemapScope.label"); } } 
 /// <summary>Defines an “and” or “or” query, combining two other filters.</summary> 
 public static string Composite_IDataGenerated_Filter_CompoundFilter_description { get { return T("Composite.IDataGenerated.Filter.CompoundFilter.description"); } } 
 /// <summary>And / or filter</summary> 
 public static string Composite_IDataGenerated_Filter_CompoundFilter_param_IsAndQuery_label { get { return T("Composite.IDataGenerated.Filter.CompoundFilter.param.IsAndQuery.label"); } } 
 /// <summary>If you select “And” both filters are applied to the data. Selecting “Or” will give you the data that matches just one of the filters.</summary> 
 public static string Composite_IDataGenerated_Filter_CompoundFilter_param_IsAndQuery_help { get { return T("Composite.IDataGenerated.Filter.CompoundFilter.param.IsAndQuery.help"); } } 
 /// <summary>One of the two filters (the one to evaluate first)</summary> 
 public static string Composite_IDataGenerated_Filter_CompoundFilter_param_Left_help { get { return T("Composite.IDataGenerated.Filter.CompoundFilter.param.Left.help"); } } 
 /// <summary>Left filter</summary> 
 public static string Composite_IDataGenerated_Filter_CompoundFilter_param_Left_label { get { return T("Composite.IDataGenerated.Filter.CompoundFilter.param.Left.label"); } } 
 /// <summary>One of the two filters (the one to evaluate last)</summary> 
 public static string Composite_IDataGenerated_Filter_CompoundFilter_param_Right_help { get { return T("Composite.IDataGenerated.Filter.CompoundFilter.param.Right.help"); } } 
 /// <summary>Right filter</summary> 
 public static string Composite_IDataGenerated_Filter_CompoundFilter_param_Right_label { get { return T("Composite.IDataGenerated.Filter.CompoundFilter.param.Right.label"); } } 
 /// <summary>Lets you specify a filter on data by specifying requirements for the individual fields. If you set requirements on multiple fields, they are all enforced (and query).</summary> 
 public static string Composite_IDataGenerated_Filter_FieldPredicatesFilter_description { get { return T("Composite.IDataGenerated.Filter.FieldPredicatesFilter.description"); } } 
 /// <summary>Retrieves an XML representation of the data. </summary> 
 public static string Composite_IDataGenerated_GetXml_description { get { return T("Composite.IDataGenerated.GetXml.description"); } } 
 /// <summary>Element name</summary> 
 public static string Composite_IDataGenerated_GetXml_param_ElementName_label { get { return T("Composite.IDataGenerated.GetXml.param.ElementName.label"); } } 
 /// <summary>Element namespace</summary> 
 public static string Composite_IDataGenerated_GetXml_param_ElementNamespace_label { get { return T("Composite.IDataGenerated.GetXml.param.ElementNamespace.label"); } } 
 /// <summary></summary> 
 public static string Composite_IDataGenerated_GetXml_param_Filter_help { get { return T("Composite.IDataGenerated.GetXml.param.Filter.help"); } } 
 /// <summary>Filter</summary> 
 public static string Composite_IDataGenerated_GetXml_param_Filter_label { get { return T("Composite.IDataGenerated.GetXml.param.Filter.label"); } } 
 /// <summary>When selected the data XML will be preceded by a &lt;PagingInfo /&gt; element detailing number of pages, items and more.</summary> 
 public static string Composite_IDataGenerated_GetXml_param_IncludePagingInfo_help { get { return T("Composite.IDataGenerated.GetXml.param.IncludePagingInfo.help"); } } 
 /// <summary>Include paging info</summary> 
 public static string Composite_IDataGenerated_GetXml_param_IncludePagingInfo_label { get { return T("Composite.IDataGenerated.GetXml.param.IncludePagingInfo.label"); } } 
 /// <summary>The field to order data by</summary> 
 public static string Composite_IDataGenerated_GetXml_param_OrderByField_help { get { return T("Composite.IDataGenerated.GetXml.param.OrderByField.help"); } } 
 /// <summary>Order by</summary> 
 public static string Composite_IDataGenerated_GetXml_param_OrderByField_label { get { return T("Composite.IDataGenerated.GetXml.param.OrderByField.label"); } } 
 /// <summary>When set to true results are delivered in ascending order, otherwise descending order is used. Default is ascending order.</summary> 
 public static string Composite_IDataGenerated_GetXml_param_OrderAscending_help { get { return T("Composite.IDataGenerated.GetXml.param.OrderAscending.help"); } } 
 /// <summary>Order ascending</summary> 
 public static string Composite_IDataGenerated_GetXml_param_OrderAscending_label { get { return T("Composite.IDataGenerated.GetXml.param.OrderAscending.label"); } } 
 /// <summary>If the number of data elements exceed the page size you can use paging to move to the other pages. See the Page size parameter.</summary> 
 public static string Composite_IDataGenerated_GetXml_param_PageNumber_help { get { return T("Composite.IDataGenerated.GetXml.param.PageNumber.help"); } } 
 /// <summary>Page number</summary> 
 public static string Composite_IDataGenerated_GetXml_param_PageNumber_label { get { return T("Composite.IDataGenerated.GetXml.param.PageNumber.label"); } } 
 /// <summary>The number of items to display on one page – the maximum number of elements to return. </summary> 
 public static string Composite_IDataGenerated_GetXml_param_PageSize_help { get { return T("Composite.IDataGenerated.GetXml.param.PageSize.help"); } } 
 /// <summary>Page size</summary> 
 public static string Composite_IDataGenerated_GetXml_param_PageSize_label { get { return T("Composite.IDataGenerated.GetXml.param.PageSize.label"); } } 
 /// <summary>The data fields to output in the XML. Fewer fields can yield faster renderings.</summary> 
 public static string Composite_IDataGenerated_GetXml_param_PropertyNames_help { get { return T("Composite.IDataGenerated.GetXml.param.PropertyNames.help"); } } 
 /// <summary>Selected fields</summary> 
 public static string Composite_IDataGenerated_GetXml_param_PropertyNames_label { get { return T("Composite.IDataGenerated.GetXml.param.PropertyNames.label"); } } 
 /// <summary>If you include reference data in the &apos;Selected properties&apos; setting, you can use this option to control how the referenced data is included. &apos;Inline&apos; is easy to use, but may bloat the size of the XML document.</summary> 
 public static string Composite_IDataGenerated_GetXml_param_ShowReferencesInline_help { get { return T("Composite.IDataGenerated.GetXml.param.ShowReferencesInline.help"); } } 
 /// <summary>Show reference data inline</summary> 
 public static string Composite_IDataGenerated_GetXml_param_ShowReferencesInline_label { get { return T("Composite.IDataGenerated.GetXml.param.ShowReferencesInline.label"); } } 
 /// <summary>When true data can be ordered randomly. Specify the number of random results you require by setting the &apos;Page size&apos;. If a filter is specified, this is applied before the random selection. If you specify an &apos;Order by&apos; value, you should specify a low &apos;Page size&apos; or the randomization will become void.</summary> 
 public static string Composite_IDataGenerated_GetXml_param_Randomized_help { get { return T("Composite.IDataGenerated.GetXml.param.Randomized.help"); } } 
 /// <summary>Randomized</summary> 
 public static string Composite_IDataGenerated_GetXml_param_Randomized_label { get { return T("Composite.IDataGenerated.GetXml.param.Randomized.label"); } } 
 /// <summary>Determines if result XML has to be cached, and what priority those cache records should have</summary> 
 public static string Composite_IDataGenerated_GetXml_param_CachePriority_help { get { return T("Composite.IDataGenerated.GetXml.param.CachePriority.help"); } } 
 /// <summary>Cache Priority</summary> 
 public static string Composite_IDataGenerated_GetXml_param_CachePriority_label { get { return T("Composite.IDataGenerated.GetXml.param.CachePriority.label"); } } 
 /// <summary>Fetches the ID of the current page or a page relative to the current page.</summary> 
 public static string Composite_Pages_GetPageId_description { get { return T("Composite.Pages.GetPageId.description"); } } 
 /// <summary>What page to get id from. The default is from the current page.</summary> 
 public static string Composite_Pages_GetPageId_param_SitemapScope_help { get { return T("Composite.Pages.GetPageId.param.SitemapScope.help"); } } 
 /// <summary>Page association</summary> 
 public static string Composite_Pages_GetPageId_param_SitemapScope_label { get { return T("Composite.Pages.GetPageId.param.SitemapScope.label"); } } 
 /// <summary>Quick and raw sitemap xhtml.</summary> 
 public static string Composite_Pages_QuickSitemap_description { get { return T("Composite.Pages.QuickSitemap.description"); } } 
 /// <summary>Returns a hierarchical XML structure of pages. When executed as part of a page rendering XML elements representing the current and ancestor pages will be appended the attributes isopen=”true” and iscurrent=”true”</summary> 
 public static string Composite_Pages_SitemapXml_description { get { return T("Composite.Pages.SitemapXml.description"); } } 
 /// <summary>Source page</summary> 
 public static string Composite_Pages_SitemapXml_param_SourcePage_label { get { return T("Composite.Pages.SitemapXml.param.SourcePage.label"); } } 
 /// <summary>By default the source page is the page currently being rendered. Specify a value if you want to get sitemap information relative to another page. The source page controls how page elements are annotated with &apos;isopen&apos; and &apos;iscurrent&apos; and is the starting point when calculating the page scope.</summary> 
 public static string Composite_Pages_SitemapXml_param_SourcePage_help { get { return T("Composite.Pages.SitemapXml.param.SourcePage.help"); } } 
 /// <summary>Page scope</summary> 
 public static string Composite_Pages_SitemapXml_param_SitemapScope_label { get { return T("Composite.Pages.SitemapXml.param.SitemapScope.label"); } } 
 /// <summary>The scope of pages to extract from the sitemap. The default is &apos;all pages&apos;. You can use this parameter to extract the structure you need to complete your task.</summary> 
 public static string Composite_Pages_SitemapXml_param_SitemapScope_help { get { return T("Composite.Pages.SitemapXml.param.SitemapScope.help"); } } 
 /// <summary>Gets information about current page in all the languages.</summary> 
 public static string Composite_Pages_GetForeignPageInfo_description { get { return T("Composite.Pages.GetForeignPageInfo.description"); } } 
 /// <summary>Defines a &apos;cache zone&apos; around a function call or markup (typically containing function calls). This function can be used to enhance page rendering performance by caching sections of a web page. The &apos;Object Cache Id&apos; value should be unique to the content being cached.</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_description { get { return T("Composite.Utils.Caching.PageObjectCache.description"); } } 
 /// <summary>Object to cache</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_ObjectToCache_label { get { return T("Composite.Utils.Caching.PageObjectCache.param.ObjectToCache.label"); } } 
 /// <summary>What you want to cache - this can be a single function call or a section of markup containing one or more function calls.</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_ObjectToCache_help { get { return T("Composite.Utils.Caching.PageObjectCache.param.ObjectToCache.help"); } } 
 /// <summary>Unique cache id</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_ObjectCacheId_label { get { return T("Composite.Utils.Caching.PageObjectCache.param.ObjectCacheId.label"); } } 
 /// <summary>Specify an ID unique to the content being cached. This value is used - in conjunction with the Page scope - to define a unique cache key.</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_ObjectCacheId_help { get { return T("Composite.Utils.Caching.PageObjectCache.param.ObjectCacheId.help"); } } 
 /// <summary>Page scope</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_SitemapScope_label { get { return T("Composite.Utils.Caching.PageObjectCache.param.SitemapScope.label"); } } 
 /// <summary>The page scope the cached data should be shared on. By default the page scope is &apos;this website&apos;, but you can change it to page specific caching and more.</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_SitemapScope_help { get { return T("Composite.Utils.Caching.PageObjectCache.param.SitemapScope.help"); } } 
 /// <summary>Cache duration (seconds)</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_SecondsToCache_label { get { return T("Composite.Utils.Caching.PageObjectCache.param.SecondsToCache.label"); } } 
 /// <summary>The number of seconds the cached object should be reused. Default is 1 minute (60 seconds).</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_SecondsToCache_help { get { return T("Composite.Utils.Caching.PageObjectCache.param.SecondsToCache.help"); } } 
 /// <summary>Language specific</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_LanguageSpecific_label { get { return T("Composite.Utils.Caching.PageObjectCache.param.LanguageSpecific.label"); } } 
 /// <summary>Choose if the cached object should be uniquely cached per website language or commonly shared among languages.</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_LanguageSpecific_help { get { return T("Composite.Utils.Caching.PageObjectCache.param.LanguageSpecific.help"); } } 
 /// <summary>AreEqual</summary> 
 public static string Composite_Utils_Compare_AreEqual_description { get { return T("Composite.Utils.Compare.AreEqual.description"); } } 
 /// <summary>Compares two objects for equality. Returns true if the two objects are equal.</summary> 
 public static string Composite_Utils_Compare_AreEqual_param_ValueA_help { get { return T("Composite.Utils.Compare.AreEqual.param.ValueA.help"); } } 
 /// <summary>Value A to compare.</summary> 
 public static string Composite_Utils_Compare_AreEqual_param_ValueA_label { get { return T("Composite.Utils.Compare.AreEqual.param.ValueA.label"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Compare_AreEqual_param_ValueB_help { get { return T("Composite.Utils.Compare.AreEqual.param.ValueB.help"); } } 
 /// <summary>Value B to compare.</summary> 
 public static string Composite_Utils_Compare_AreEqual_param_ValueB_label { get { return T("Composite.Utils.Compare.AreEqual.param.ValueB.label"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Compare_IsLessThan_description { get { return T("Composite.Utils.Compare.IsLessThan.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Compare_IsLessThan_param_ValueA_help { get { return T("Composite.Utils.Compare.IsLessThan.param.ValueA.help"); } } 
 /// <summary>Value A to compare.</summary> 
 public static string Composite_Utils_Compare_IsLessThan_param_ValueA_label { get { return T("Composite.Utils.Compare.IsLessThan.param.ValueA.label"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Compare_IsLessThan_param_ValueB_help { get { return T("Composite.Utils.Compare.IsLessThan.param.ValueB.help"); } } 
 /// <summary>Value B to compare.</summary> 
 public static string Composite_Utils_Compare_IsLessThan_param_ValueB_label { get { return T("Composite.Utils.Compare.IsLessThan.param.ValueB.label"); } } 
 /// <summary>Reads a string from the application configuration file (web.config or app.config)</summary> 
 public static string Composite_Utils_Configuration_AppSettingsValue_description { get { return T("Composite.Utils.Configuration.AppSettingsValue.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Configuration_AppSettingsValue_param_KeyName_help { get { return T("Composite.Utils.Configuration.AppSettingsValue.param.KeyName.help"); } } 
 /// <summary>Key Name</summary> 
 public static string Composite_Utils_Configuration_AppSettingsValue_param_KeyName_label { get { return T("Composite.Utils.Configuration.AppSettingsValue.param.KeyName.label"); } } 
 /// <summary>Add a number of days to the current date and get the resulting date.</summary> 
 public static string Composite_Utils_Date_AddDays_description { get { return T("Composite.Utils.Date.AddDays.description"); } } 
 /// <summary>Specify a negative or positive number of days to add to the current date.</summary> 
 public static string Composite_Utils_Date_AddDays_param_DaysToAdd_help { get { return T("Composite.Utils.Date.AddDays.param.DaysToAdd.help"); } } 
 /// <summary>Days to add</summary> 
 public static string Composite_Utils_Date_AddDays_param_DaysToAdd_label { get { return T("Composite.Utils.Date.AddDays.param.DaysToAdd.label"); } } 
 /// <summary>The current date and time</summary> 
 public static string Composite_Utils_Date_Now_description { get { return T("Composite.Utils.Date.Now.description"); } } 
 /// <summary>Returns an input parameter from executing function context. Use this in developing to copy an input value to a new function call.</summary> 
 public static string Composite_Utils_GetInputParameter_description { get { return T("Composite.Utils.GetInputParameter.description"); } } 
 /// <summary>Specify the name of the input parameter which value you wish to use here.</summary> 
 public static string Composite_Utils_GetInputParameter_param_InputParameterName_help { get { return T("Composite.Utils.GetInputParameter.param.InputParameterName.help"); } } 
 /// <summary>Parameter name</summary> 
 public static string Composite_Utils_GetInputParameter_param_InputParameterName_label { get { return T("Composite.Utils.GetInputParameter.param.InputParameterName.label"); } } 
 /// <summary>Parses a string into an object. The type of object depends on the receiver. Using this function to deliver a value to a DateTime parameter, will make the system parse the string as a DateTime etc.</summary> 
 public static string Composite_Utils_ParseStringToObject_description { get { return T("Composite.Utils.ParseStringToObject.description"); } } 
 /// <summary>Specify the string to parse. Note that the string must be formatted in a way that can be converted into the type of object that is expected.</summary> 
 public static string Composite_Utils_ParseStringToObject_param_StringToParse_help { get { return T("Composite.Utils.ParseStringToObject.param.StringToParse.help"); } } 
 /// <summary>String to parse</summary> 
 public static string Composite_Utils_ParseStringToObject_param_StringToParse_label { get { return T("Composite.Utils.ParseStringToObject.param.StringToParse.label"); } } 
 /// <summary>Returns a new random Guid.</summary> 
 public static string Composite_Utils_Guid_NewGuid_description { get { return T("Composite.Utils.Guid.NewGuid.description"); } } 
 /// <summary>A list of all cultures</summary> 
 public static string Composite_Utils_Globalization_AllCultures_description { get { return T("Composite.Utils.Globalization.AllCultures.description"); } } 
 /// <summary>The culture for the current user / request.</summary> 
 public static string Composite_Utils_Globalization_CurrentCulture_description { get { return T("Composite.Utils.Globalization.CurrentCulture.description"); } } 
 /// <summary>Returns the sum from a list of integers</summary> 
 public static string Composite_Utils_Integer_Sum_description { get { return T("Composite.Utils.Integer.Sum.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Integer_Sum_param_Ints_help { get { return T("Composite.Utils.Integer.Sum.param.Ints.help"); } } 
 /// <summary>Integer list</summary> 
 public static string Composite_Utils_Integer_Sum_param_Ints_label { get { return T("Composite.Utils.Integer.Sum.param.Ints.label"); } } 
 /// <summary>Check if a boolean is true or false. </summary> 
 public static string Composite_Utils_Predicates_BoolEquals_description { get { return T("Composite.Utils.Predicates.BoolEquals.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_BoolEquals_param_Value_help { get { return T("Composite.Utils.Predicates.BoolEquals.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_BoolEquals_param_Value_label { get { return T("Composite.Utils.Predicates.BoolEquals.param.Value.label"); } } 
 /// <summary>Check if a date equals a certain value</summary> 
 public static string Composite_Utils_Predicates_DateTimeEquals_description { get { return T("Composite.Utils.Predicates.DateTimeEquals.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_DateTimeEquals_param_Value_help { get { return T("Composite.Utils.Predicates.DateTimeEquals.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_DateTimeEquals_param_Value_label { get { return T("Composite.Utils.Predicates.DateTimeEquals.param.Value.label"); } } 
 /// <summary>Check if a date is greater than a certain value</summary> 
 public static string Composite_Utils_Predicates_DateTimeGreaterThan_description { get { return T("Composite.Utils.Predicates.DateTimeGreaterThan.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_DateTimeGreaterThan_param_Value_help { get { return T("Composite.Utils.Predicates.DateTimeGreaterThan.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_DateTimeGreaterThan_param_Value_label { get { return T("Composite.Utils.Predicates.DateTimeGreaterThan.param.Value.label"); } } 
 /// <summary>Check if a date is less than a certain value</summary> 
 public static string Composite_Utils_Predicates_DateTimeLessThan_description { get { return T("Composite.Utils.Predicates.DateTimeLessThan.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_DateTimeLessThan_param_Value_help { get { return T("Composite.Utils.Predicates.DateTimeLessThan.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_DateTimeLessThan_param_Value_label { get { return T("Composite.Utils.Predicates.DateTimeLessThan.param.Value.label"); } } 
 /// <summary>Check is a decimal has a certain value</summary> 
 public static string Composite_Utils_Predicates_DecimalEquals_description { get { return T("Composite.Utils.Predicates.DecimalEquals.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_DecimalEquals_param_Value_help { get { return T("Composite.Utils.Predicates.DecimalEquals.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_DecimalEquals_param_Value_label { get { return T("Composite.Utils.Predicates.DecimalEquals.param.Value.label"); } } 
 /// <summary>Check if a decimal is greater than a certain value</summary> 
 public static string Composite_Utils_Predicates_DecimalGreaterThan_description { get { return T("Composite.Utils.Predicates.DecimalGreaterThan.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_DecimalGreaterThan_param_Value_help { get { return T("Composite.Utils.Predicates.DecimalGreaterThan.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_DecimalGreaterThan_param_Value_label { get { return T("Composite.Utils.Predicates.DecimalGreaterThan.param.Value.label"); } } 
 /// <summary>Check if a decimal is less than a certain value</summary> 
 public static string Composite_Utils_Predicates_DecimalLessThan_description { get { return T("Composite.Utils.Predicates.DecimalLessThan.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_DecimalLessThan_param_Value_help { get { return T("Composite.Utils.Predicates.DecimalLessThan.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_DecimalLessThan_param_Value_label { get { return T("Composite.Utils.Predicates.DecimalLessThan.param.Value.label"); } } 
 /// <summary>Check if a Guid equals a certain value</summary> 
 public static string Composite_Utils_Predicates_GuidEquals_description { get { return T("Composite.Utils.Predicates.GuidEquals.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_GuidEquals_param_Value_help { get { return T("Composite.Utils.Predicates.GuidEquals.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_GuidEquals_param_Value_label { get { return T("Composite.Utils.Predicates.GuidEquals.param.Value.label"); } } 
 /// <summary>Check if a Guid exists in a comma separated string list</summary> 
 public static string Composite_Utils_Predicates_GuidInCommaSeparatedList_description { get { return T("Composite.Utils.Predicates.GuidInCommaSeparatedList.description"); } } 
 /// <summary>List of Guid</summary> 
 public static string Composite_Utils_Predicates_GuidInCommaSeparatedList_param_CommaSeparatedGuids_label { get { return T("Composite.Utils.Predicates.GuidInCommaSeparatedList.param.CommaSeparatedGuids.label"); } } 
 /// <summary>A string containing zero or more Guids separated by commas</summary> 
 public static string Composite_Utils_Predicates_GuidInCommaSeparatedList_param_CommaSeparatedGuids_help { get { return T("Composite.Utils.Predicates.GuidInCommaSeparatedList.param.CommaSeparatedGuids.help"); } } 
 /// <summary>Check if a string field matches one of the terms in a comma separated string list</summary> 
 public static string Composite_Utils_Predicates_StringInCommaSeparatedList_description { get { return T("Composite.Utils.Predicates.StringInCommaSeparatedList.description"); } } 
 /// <summary>Search terms</summary> 
 public static string Composite_Utils_Predicates_StringInCommaSeparatedList_param_CommaSeparatedSearchTerms_label { get { return T("Composite.Utils.Predicates.StringInCommaSeparatedList.param.CommaSeparatedSearchTerms.label"); } } 
 /// <summary>A string containing search terms separated by commas, like &apos;c1,cms,linq&apos;</summary> 
 public static string Composite_Utils_Predicates_StringInCommaSeparatedList_param_CommaSeparatedSearchTerms_help { get { return T("Composite.Utils.Predicates.StringInCommaSeparatedList.param.CommaSeparatedSearchTerms.help"); } } 
 /// <summary>Ignore case</summary> 
 public static string Composite_Utils_Predicates_StringInCommaSeparatedList_param_IgnoreCase_label { get { return T("Composite.Utils.Predicates.StringInCommaSeparatedList.param.IgnoreCase.label"); } } 
 /// <summary>When &apos;false&apos;, casing of the words must match exactly. Default is &apos;true&apos;, case insensitive search</summary> 
 public static string Composite_Utils_Predicates_StringInCommaSeparatedList_param_IgnoreCase_help { get { return T("Composite.Utils.Predicates.StringInCommaSeparatedList.param.IgnoreCase.help"); } } 
 /// <summary>Check if a string field matches one of the strings in the supplied list</summary> 
 public static string Composite_Utils_Predicates_StringInList_description { get { return T("Composite.Utils.Predicates.StringInList.description"); } } 
 /// <summary>Search terms</summary> 
 public static string Composite_Utils_Predicates_StringInList_param_SearchTerms_label { get { return T("Composite.Utils.Predicates.StringInList.param.SearchTerms.label"); } } 
 /// <summary>A list of strings to match up against the searched string field.</summary> 
 public static string Composite_Utils_Predicates_StringInList_param_SearchTerms_help { get { return T("Composite.Utils.Predicates.StringInList.param.SearchTerms.help"); } } 
 /// <summary>Ignore case</summary> 
 public static string Composite_Utils_Predicates_StringInList_param_IgnoreCase_label { get { return T("Composite.Utils.Predicates.StringInList.param.IgnoreCase.label"); } } 
 /// <summary>When &apos;false&apos;, casing of the words must match exactly. Default is &apos;true&apos;, case insensitive search</summary> 
 public static string Composite_Utils_Predicates_StringInList_param_IgnoreCase_help { get { return T("Composite.Utils.Predicates.StringInList.param.IgnoreCase.help"); } } 
 /// <summary>Check if an integer equals a certain value</summary> 
 public static string Composite_Utils_Predicates_IntegerEquals_description { get { return T("Composite.Utils.Predicates.IntegerEquals.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_IntegerEquals_param_Value_help { get { return T("Composite.Utils.Predicates.IntegerEquals.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_IntegerEquals_param_Value_label { get { return T("Composite.Utils.Predicates.IntegerEquals.param.Value.label"); } } 
 /// <summary>Check if a integer is greater than a certain value</summary> 
 public static string Composite_Utils_Predicates_IntegerGreaterThan_description { get { return T("Composite.Utils.Predicates.IntegerGreaterThan.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_IntegerGreaterThan_param_Value_help { get { return T("Composite.Utils.Predicates.IntegerGreaterThan.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_IntegerGreaterThan_param_Value_label { get { return T("Composite.Utils.Predicates.IntegerGreaterThan.param.Value.label"); } } 
 /// <summary>Check if a integer is less than a certain value</summary> 
 public static string Composite_Utils_Predicates_IntegerLessThan_description { get { return T("Composite.Utils.Predicates.IntegerLessThan.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_IntegerLessThan_param_Value_help { get { return T("Composite.Utils.Predicates.IntegerLessThan.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_IntegerLessThan_param_Value_label { get { return T("Composite.Utils.Predicates.IntegerLessThan.param.Value.label"); } } 
 /// <summary>Check if a string contains a certain value</summary> 
 public static string Composite_Utils_Predicates_StringContains_description { get { return T("Composite.Utils.Predicates.StringContains.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_StringContains_param_Value_help { get { return T("Composite.Utils.Predicates.StringContains.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_StringContains_param_Value_label { get { return T("Composite.Utils.Predicates.StringContains.param.Value.label"); } } 
 /// <summary>Check if a string ends with a certain value</summary> 
 public static string Composite_Utils_Predicates_StringEndsWith_description { get { return T("Composite.Utils.Predicates.StringEndsWith.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_StringEndsWith_param_Value_help { get { return T("Composite.Utils.Predicates.StringEndsWith.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_StringEndsWith_param_Value_label { get { return T("Composite.Utils.Predicates.StringEndsWith.param.Value.label"); } } 
 /// <summary>Check if a string equals a certain value</summary> 
 public static string Composite_Utils_Predicates_StringEquals_description { get { return T("Composite.Utils.Predicates.StringEquals.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_StringEquals_param_Value_help { get { return T("Composite.Utils.Predicates.StringEquals.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_StringEquals_param_Value_label { get { return T("Composite.Utils.Predicates.StringEquals.param.Value.label"); } } 
 /// <summary>Check if a string starts with a certain value</summary> 
 public static string Composite_Utils_Predicates_StringStartsWith_description { get { return T("Composite.Utils.Predicates.StringStartsWith.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_StringStartsWith_param_Value_help { get { return T("Composite.Utils.Predicates.StringStartsWith.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_StringStartsWith_param_Value_label { get { return T("Composite.Utils.Predicates.StringStartsWith.param.Value.label"); } } 
 /// <summary>Check if a Guid equals a certain value</summary> 
 public static string Composite_Utils_Predicates_NullableGuidEquals_description { get { return T("Composite.Utils.Predicates.NullableGuidEquals.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_NullableGuidEquals_param_Value_help { get { return T("Composite.Utils.Predicates.NullableGuidEquals.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_NullableGuidEquals_param_Value_label { get { return T("Composite.Utils.Predicates.NullableGuidEquals.param.Value.label"); } } 
 /// <summary>Check if a nullable Guid has no value</summary> 
 public static string Composite_Utils_Predicates_NullableGuidNoValue_description { get { return T("Composite.Utils.Predicates.NullableGuidNoValue.description"); } } 
 /// <summary>Check if an integer equals a certain value</summary> 
 public static string Composite_Utils_Predicates_NullableIntegerEquals_description { get { return T("Composite.Utils.Predicates.NullableIntegerEquals.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_NullableIntegerEquals_param_Value_help { get { return T("Composite.Utils.Predicates.NullableIntegerEquals.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_NullableIntegerEquals_param_Value_label { get { return T("Composite.Utils.Predicates.NullableIntegerEquals.param.Value.label"); } } 
 /// <summary>Check if an nullable integer has no value</summary> 
 public static string Composite_Utils_Predicates_NullableIntegerNoValue_description { get { return T("Composite.Utils.Predicates.NullableIntegerNoValue.description"); } } 
 /// <summary>Check if a string has no value</summary> 
 public static string Composite_Utils_Predicates_StringNoValue_description { get { return T("Composite.Utils.Predicates.StringNoValue.description"); } } 
 /// <summary>Check if a boolean is true or false. </summary> 
 public static string Composite_Utils_Predicates_NullableBoolEquals_description { get { return T("Composite.Utils.Predicates.NullableBoolEquals.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_NullableBoolEquals_param_Value_help { get { return T("Composite.Utils.Predicates.NullableBoolEquals.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_NullableBoolEquals_param_Value_label { get { return T("Composite.Utils.Predicates.NullableBoolEquals.param.Value.label"); } } 
 /// <summary>Check if a nullable boolean has no value</summary> 
 public static string Composite_Utils_Predicates_NullableBoolNoValue_description { get { return T("Composite.Utils.Predicates.NullableBoolNoValue.description"); } } 
 /// <summary>Check if a date equals a certain value</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeEquals_description { get { return T("Composite.Utils.Predicates.NullableDateTimeEquals.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeEquals_param_Value_help { get { return T("Composite.Utils.Predicates.NullableDateTimeEquals.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeEquals_param_Value_label { get { return T("Composite.Utils.Predicates.NullableDateTimeEquals.param.Value.label"); } } 
 /// <summary>Check if a date is greater than a certain value</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeGreaterThan_description { get { return T("Composite.Utils.Predicates.NullableDateTimeGreaterThan.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeGreaterThan_param_Value_help { get { return T("Composite.Utils.Predicates.NullableDateTimeGreaterThan.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeGreaterThan_param_Value_label { get { return T("Composite.Utils.Predicates.NullableDateTimeGreaterThan.param.Value.label"); } } 
 /// <summary>Check if a date is less than a certain value</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeLessThan_description { get { return T("Composite.Utils.Predicates.NullableDateTimeLessThan.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeLessThan_param_Value_help { get { return T("Composite.Utils.Predicates.NullableDateTimeLessThan.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeLessThan_param_Value_label { get { return T("Composite.Utils.Predicates.NullableDateTimeLessThan.param.Value.label"); } } 
 /// <summary>Check if a nullable date has no value</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeNoValue_description { get { return T("Composite.Utils.Predicates.NullableDateTimeNoValue.description"); } } 
 /// <summary>Check is a decimal has a certain value</summary> 
 public static string Composite_Utils_Predicates_NullableDecimalEquals_description { get { return T("Composite.Utils.Predicates.NullableDecimalEquals.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Predicates_NullableDecimalEquals_param_Value_help { get { return T("Composite.Utils.Predicates.NullableDecimalEquals.param.Value.help"); } } 
 /// <summary>The value to compare with</summary> 
 public static string Composite_Utils_Predicates_NullableDecimalEquals_param_Value_label { get { return T("Composite.Utils.Predicates.NullableDecimalEquals.param.Value.label"); } } 
 /// <summary>Check is a nullable decimal has no value</summary> 
 public static string Composite_Utils_Predicates_NullableDecimalNoValue_description { get { return T("Composite.Utils.Predicates.NullableDecimalNoValue.description"); } } 
 /// <summary>Joins a list of strings to a single string</summary> 
 public static string Composite_Utils_String_Join_description { get { return T("Composite.Utils.String.Join.description"); } } 
 /// <summary>The separator to insert between strings.</summary> 
 public static string Composite_Utils_String_Join_param_Separator_help { get { return T("Composite.Utils.String.Join.param.Separator.help"); } } 
 /// <summary>Separator</summary> 
 public static string Composite_Utils_String_Join_param_Separator_label { get { return T("Composite.Utils.String.Join.param.Separator.label"); } } 
 /// <summary>The list of strings to join</summary> 
 public static string Composite_Utils_String_Join_param_Strings_help { get { return T("Composite.Utils.String.Join.param.Strings.help"); } } 
 /// <summary>Strings to join</summary> 
 public static string Composite_Utils_String_Join_param_Strings_label { get { return T("Composite.Utils.String.Join.param.Strings.label"); } } 
 /// <summary>Joins two strings to a simple string</summary> 
 public static string Composite_Utils_String_JoinTwo_description { get { return T("Composite.Utils.String.JoinTwo.description"); } } 
 /// <summary>The string to put first</summary> 
 public static string Composite_Utils_String_JoinTwo_param_StringA_help { get { return T("Composite.Utils.String.JoinTwo.param.StringA.help"); } } 
 /// <summary>String A</summary> 
 public static string Composite_Utils_String_JoinTwo_param_StringA_label { get { return T("Composite.Utils.String.JoinTwo.param.StringA.label"); } } 
 /// <summary>The string to put last</summary> 
 public static string Composite_Utils_String_JoinTwo_param_StringB_help { get { return T("Composite.Utils.String.JoinTwo.param.StringB.help"); } } 
 /// <summary>String B</summary> 
 public static string Composite_Utils_String_JoinTwo_param_StringB_label { get { return T("Composite.Utils.String.JoinTwo.param.StringB.label"); } } 
 /// <summary>A string to insert in between String A and String B. Default is no separator</summary> 
 public static string Composite_Utils_String_JoinTwo_param_Separator_help { get { return T("Composite.Utils.String.JoinTwo.param.Separator.help"); } } 
 /// <summary>Separator</summary> 
 public static string Composite_Utils_String_JoinTwo_param_Separator_label { get { return T("Composite.Utils.String.JoinTwo.param.Separator.label"); } } 
 /// <summary>Splits a string into a list of string.</summary> 
 public static string Composite_Utils_String_Split_description { get { return T("Composite.Utils.String.Split.description"); } } 
 /// <summary>The separator to use when splitting the string. Default is comma (&quot;,&quot;)</summary> 
 public static string Composite_Utils_String_Split_param_Separator_help { get { return T("Composite.Utils.String.Split.param.Separator.help"); } } 
 /// <summary>Separator</summary> 
 public static string Composite_Utils_String_Split_param_Separator_label { get { return T("Composite.Utils.String.Split.param.Separator.label"); } } 
 /// <summary>The string you wish to split into a list.</summary> 
 public static string Composite_Utils_String_Split_param_String_help { get { return T("Composite.Utils.String.Split.param.String.help"); } } 
 /// <summary>String to split</summary> 
 public static string Composite_Utils_String_Split_param_String_label { get { return T("Composite.Utils.String.Split.param.String.label"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Validation_DateTimeNotNullValidation_description { get { return T("Composite.Utils.Validation.DateTimeNotNullValidation.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Validation_DecimalNotNullValidation_description { get { return T("Composite.Utils.Validation.DecimalNotNullValidation.description"); } } 
 /// <summary>Validates the precision of digits (the number of decimals the user has specified)</summary> 
 public static string Composite_Utils_Validation_DecimalPrecisionValidation_description { get { return T("Composite.Utils.Validation.DecimalPrecisionValidation.description"); } } 
 /// <summary>The maximum number of digits to allow on the decimal</summary> 
 public static string Composite_Utils_Validation_DecimalPrecisionValidation_param_MaxDigits_help { get { return T("Composite.Utils.Validation.DecimalPrecisionValidation.param.MaxDigits.help"); } } 
 /// <summary>Max number of decimal digits</summary> 
 public static string Composite_Utils_Validation_DecimalPrecisionValidation_param_MaxDigits_label { get { return T("Composite.Utils.Validation.DecimalPrecisionValidation.param.MaxDigits.label"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Validation_GuidNotNullValidation_description { get { return T("Composite.Utils.Validation.GuidNotNullValidation.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Validation_Int32NotNullValidation_description { get { return T("Composite.Utils.Validation.Int32NotNullValidation.description"); } } 
 /// <summary>Validates than an integer is within a certain range.</summary> 
 public static string Composite_Utils_Validation_IntegerRangeValidation_description { get { return T("Composite.Utils.Validation.IntegerRangeValidation.description"); } } 
 /// <summary>The maximum number allowed in this field.</summary> 
 public static string Composite_Utils_Validation_IntegerRangeValidation_param_max_help { get { return T("Composite.Utils.Validation.IntegerRangeValidation.param.max.help"); } } 
 /// <summary>Maximum number</summary> 
 public static string Composite_Utils_Validation_IntegerRangeValidation_param_max_label { get { return T("Composite.Utils.Validation.IntegerRangeValidation.param.max.label"); } } 
 /// <summary>The minimum number allowed in this field.</summary> 
 public static string Composite_Utils_Validation_IntegerRangeValidation_param_min_help { get { return T("Composite.Utils.Validation.IntegerRangeValidation.param.min.help"); } } 
 /// <summary>Minimum number</summary> 
 public static string Composite_Utils_Validation_IntegerRangeValidation_param_min_label { get { return T("Composite.Utils.Validation.IntegerRangeValidation.param.min.label"); } } 
 /// <summary>Validates that a string conforms to the specified regular expression</summary> 
 public static string Composite_Utils_Validation_RegularExpressionValidation_description { get { return T("Composite.Utils.Validation.RegularExpressionValidation.description"); } } 
 /// <summary>The regular expression pattern to use</summary> 
 public static string Composite_Utils_Validation_RegularExpressionValidation_param_pattern_help { get { return T("Composite.Utils.Validation.RegularExpressionValidation.param.pattern.help"); } } 
 /// <summary>RegEx pattern</summary> 
 public static string Composite_Utils_Validation_RegularExpressionValidation_param_pattern_label { get { return T("Composite.Utils.Validation.RegularExpressionValidation.param.pattern.label"); } } 
 /// <summary>Validates that the length of a string is within the specified range</summary> 
 public static string Composite_Utils_Validation_StringLengthValidation_description { get { return T("Composite.Utils.Validation.StringLengthValidation.description"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Validation_StringLengthValidation_param_max_help { get { return T("Composite.Utils.Validation.StringLengthValidation.param.max.help"); } } 
 /// <summary>Maximum length</summary> 
 public static string Composite_Utils_Validation_StringLengthValidation_param_max_label { get { return T("Composite.Utils.Validation.StringLengthValidation.param.max.label"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Validation_StringLengthValidation_param_min_help { get { return T("Composite.Utils.Validation.StringLengthValidation.param.min.help"); } } 
 /// <summary>Minimum length</summary> 
 public static string Composite_Utils_Validation_StringLengthValidation_param_min_label { get { return T("Composite.Utils.Validation.StringLengthValidation.param.min.label"); } } 
 /// <summary></summary> 
 public static string Composite_Utils_Validation_StringNotNullValidation_description { get { return T("Composite.Utils.Validation.StringNotNullValidation.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Client_BrowserPlatform_description { get { return T("Composite.Web.Client.BrowserPlatform.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Client_BrowserString_description { get { return T("Composite.Web.Client.BrowserString.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Client_BrowserType_description { get { return T("Composite.Web.Client.BrowserType.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Client_BrowserVersion_description { get { return T("Composite.Web.Client.BrowserVersion.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Client_EcmaScriptVersion_description { get { return T("Composite.Web.Client.EcmaScriptVersion.description"); } } 
 /// <summary>True if the current request is identified as coming from a crawler (search engine).</summary> 
 public static string Composite_Web_Client_IsCrawler_description { get { return T("Composite.Web.Client.IsCrawler.description"); } } 
 /// <summary>True if the current request is identified as coming from a mobile device.</summary> 
 public static string Composite_Web_Client_IsMobileDevice_description { get { return T("Composite.Web.Client.IsMobileDevice.description"); } } 
 /// <summary>Common HTML meta tags you probably want in yout html head</summary> 
 public static string Composite_Web_Html_Template_CommonMetaTags_description { get { return T("Composite.Web.Html.Template.CommonMetaTags.description"); } } 
 /// <summary>Content-Type</summary> 
 public static string Composite_Web_Html_Template_CommonMetaTags_param_ContentType_label { get { return T("Composite.Web.Html.Template.CommonMetaTags.param.ContentType.label"); } } 
 /// <summary>By default this is &apos;text/html; charset=utf-8&apos;. If you serve something else you should overwrite this.</summary> 
 public static string Composite_Web_Html_Template_CommonMetaTags_param_ContentType_help { get { return T("Composite.Web.Html.Template.CommonMetaTags.param.ContentType.help"); } } 
 /// <summary>Designer</summary> 
 public static string Composite_Web_Html_Template_CommonMetaTags_param_Designer_label { get { return T("Composite.Web.Html.Template.CommonMetaTags.param.Designer.label"); } } 
 /// <summary>Who designed this website? Show it in the &apos;Designer&apos; meta tag. Default is not to emit the meta tag.</summary> 
 public static string Composite_Web_Html_Template_CommonMetaTags_param_Designer_help { get { return T("Composite.Web.Html.Template.CommonMetaTags.param.Designer.help"); } } 
 /// <summary>Show generator</summary> 
 public static string Composite_Web_Html_Template_CommonMetaTags_param_ShowGenerator_label { get { return T("Composite.Web.Html.Template.CommonMetaTags.param.ShowGenerator.label"); } } 
 /// <summary>Show the world you support Composite C1 - free open source!</summary> 
 public static string Composite_Web_Html_Template_CommonMetaTags_param_ShowGenerator_help { get { return T("Composite.Web.Html.Template.CommonMetaTags.param.ShowGenerator.help"); } } 
 /// <summary>Appends a lang=&apos;(language code)&apos; attribute the the parent element, reflecting the language of the current page. You can put this just below the &lt;html /&gt; tag.</summary> 
 public static string Composite_Web_Html_Template_LangAttribute_description { get { return T("Composite.Web.Html.Template.LangAttribute.description"); } } 
 /// <summary>Includes a named Page Template Feature at this location. Page Template Features can contain HTML and functional snippets and are managed on the Layout perspective.</summary> 
 public static string Composite_Web_Html_Template_PageTemplateFeature_description { get { return T("Composite.Web.Html.Template.PageTemplateFeature.description"); } } 
 /// <summary>Feature name</summary> 
 public static string Composite_Web_Html_Template_PageTemplateFeature_param_FeatureName_label { get { return T("Composite.Web.Html.Template.PageTemplateFeature.param.FeatureName.label"); } } 
 /// <summary>The name of the Page Template Feature you wish to include.</summary> 
 public static string Composite_Web_Html_Template_PageTemplateFeature_param_FeatureName_help { get { return T("Composite.Web.Html.Template.PageTemplateFeature.param.FeatureName.help"); } } 
 /// <summary>Emits the &apos;definitive title&apos; of the current page; the same value that ends up in the page title tag. This title may originate from the page being rendered or from a C1 Function/ASP.NET control which changed the title to match specific data being featured on the page.</summary> 
 public static string Composite_Web_Html_Template_HtmlTitleValue_description { get { return T("Composite.Web.Html.Template.HtmlTitleValue.description"); } } 
 /// <summary>Prefix to be removed</summary> 
 public static string Composite_Web_Html_Template_HtmlTitleValue_param_PrefixToRemove_label { get { return T("Composite.Web.Html.Template.HtmlTitleValue.param.PrefixToRemove.label"); } } 
 /// <summary>If the HTML title has a prefix value you wish to get rid of, specify the prefix here. If the prefix is not found in the title, this value is ignored.</summary> 
 public static string Composite_Web_Html_Template_HtmlTitleValue_param_PrefixToRemove_help { get { return T("Composite.Web.Html.Template.HtmlTitleValue.param.PrefixToRemove.help"); } } 
 /// <summary>Postfix to be removed</summary> 
 public static string Composite_Web_Html_Template_HtmlTitleValue_param_PostfixToRemove_label { get { return T("Composite.Web.Html.Template.HtmlTitleValue.param.PostfixToRemove.label"); } } 
 /// <summary>If the HTML title has a postfix value you wish to get rid of, specify the postfix here. If the postfix is not found in the title, this value is ignored.</summary> 
 public static string Composite_Web_Html_Template_HtmlTitleValue_param_PostfixToRemove_help { get { return T("Composite.Web.Html.Template.HtmlTitleValue.param.PostfixToRemove.help"); } } 
 /// <summary>Emits the &apos;definitive description&apos; of the current page; the same value that ends up in the page meta description tag. This value may originate from the page being rendered or from a C1 Function/ASP.NET control which changed the description to match specific data being featured on the page.</summary> 
 public static string Composite_Web_Html_Template_MetaDescriptionValue_description { get { return T("Composite.Web.Html.Template.MetaDescriptionValue.description"); } } 
 /// <summary>Element to wrap description</summary> 
 public static string Composite_Web_Html_Template_MetaDescriptionValue_param_Element_label { get { return T("Composite.Web.Html.Template.MetaDescriptionValue.param.Element.label"); } } 
 /// <summary>To have the description wrapped in an element (like &lt;p class=&quot;description&quot; /&gt;) specify it here. The element with only be emitted when a description text exist.</summary> 
 public static string Composite_Web_Html_Template_MetaDescriptionValue_param_Element_help { get { return T("Composite.Web.Html.Template.MetaDescriptionValue.param.Element.help"); } } 
 /// <summary>Gets a value from the current users cookie collection.</summary> 
 public static string Composite_Web_Request_CookieValue_description { get { return T("Composite.Web.Request.CookieValue.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_CookieValue_param_CookieName_help { get { return T("Composite.Web.Request.CookieValue.param.CookieName.help"); } } 
 /// <summary>Cookie name</summary> 
 public static string Composite_Web_Request_CookieValue_param_CookieName_label { get { return T("Composite.Web.Request.CookieValue.param.CookieName.label"); } } 
 /// <summary>If the user does not have this cookie, use this field to specify what value to default to.</summary> 
 public static string Composite_Web_Request_CookieValue_param_FallbackValue_help { get { return T("Composite.Web.Request.CookieValue.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_CookieValue_param_FallbackValue_label { get { return T("Composite.Web.Request.CookieValue.param.FallbackValue.label"); } } 
 /// <summary>Gets a boolean value from a form post (HTTP POST)</summary> 
 public static string Composite_Web_Request_FormPostBoolValue_description { get { return T("Composite.Web.Request.FormPostBoolValue.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_FormPostBoolValue_param_FallbackValue_help { get { return T("Composite.Web.Request.FormPostBoolValue.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_FormPostBoolValue_param_FallbackValue_label { get { return T("Composite.Web.Request.FormPostBoolValue.param.FallbackValue.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_FormPostBoolValue_param_ParameterName_help { get { return T("Composite.Web.Request.FormPostBoolValue.param.ParameterName.help"); } } 
 /// <summary>Parameter name</summary> 
 public static string Composite_Web_Request_FormPostBoolValue_param_ParameterName_label { get { return T("Composite.Web.Request.FormPostBoolValue.param.ParameterName.label"); } } 
 /// <summary>Gets a decimal value from a form post (HTTP POST)</summary> 
 public static string Composite_Web_Request_FormPostDecimalValue_description { get { return T("Composite.Web.Request.FormPostDecimalValue.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_FormPostDecimalValue_param_FallbackValue_help { get { return T("Composite.Web.Request.FormPostDecimalValue.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_FormPostDecimalValue_param_FallbackValue_label { get { return T("Composite.Web.Request.FormPostDecimalValue.param.FallbackValue.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_FormPostDecimalValue_param_ParameterName_help { get { return T("Composite.Web.Request.FormPostDecimalValue.param.ParameterName.help"); } } 
 /// <summary>Parameter name</summary> 
 public static string Composite_Web_Request_FormPostDecimalValue_param_ParameterName_label { get { return T("Composite.Web.Request.FormPostDecimalValue.param.ParameterName.label"); } } 
 /// <summary>Gets a Guid value from a form post (HTTP POST)</summary> 
 public static string Composite_Web_Request_FormPostGuidValue_description { get { return T("Composite.Web.Request.FormPostGuidValue.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_FormPostGuidValue_param_FallbackValue_help { get { return T("Composite.Web.Request.FormPostGuidValue.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_FormPostGuidValue_param_FallbackValue_label { get { return T("Composite.Web.Request.FormPostGuidValue.param.FallbackValue.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_FormPostGuidValue_param_ParameterName_help { get { return T("Composite.Web.Request.FormPostGuidValue.param.ParameterName.help"); } } 
 /// <summary>Parameter name</summary> 
 public static string Composite_Web_Request_FormPostGuidValue_param_ParameterName_label { get { return T("Composite.Web.Request.FormPostGuidValue.param.ParameterName.label"); } } 
 /// <summary>Gets a integer value from a form post (HTTP POST)</summary> 
 public static string Composite_Web_Request_FormPostIntegerValue_description { get { return T("Composite.Web.Request.FormPostIntegerValue.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_FormPostIntegerValue_param_FallbackValue_help { get { return T("Composite.Web.Request.FormPostIntegerValue.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_FormPostIntegerValue_param_FallbackValue_label { get { return T("Composite.Web.Request.FormPostIntegerValue.param.FallbackValue.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_FormPostIntegerValue_param_ParameterName_help { get { return T("Composite.Web.Request.FormPostIntegerValue.param.ParameterName.help"); } } 
 /// <summary>Parameter name</summary> 
 public static string Composite_Web_Request_FormPostIntegerValue_param_ParameterName_label { get { return T("Composite.Web.Request.FormPostIntegerValue.param.ParameterName.label"); } } 
 /// <summary>Gets a string value from a form post (HTTP POST)</summary> 
 public static string Composite_Web_Request_FormPostValue_description { get { return T("Composite.Web.Request.FormPostValue.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_FormPostValue_param_FallbackValue_help { get { return T("Composite.Web.Request.FormPostValue.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_FormPostValue_param_FallbackValue_label { get { return T("Composite.Web.Request.FormPostValue.param.FallbackValue.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_FormPostValue_param_ParameterName_help { get { return T("Composite.Web.Request.FormPostValue.param.ParameterName.help"); } } 
 /// <summary>Parameter name</summary> 
 public static string Composite_Web_Request_FormPostValue_param_ParameterName_label { get { return T("Composite.Web.Request.FormPostValue.param.ParameterName.label"); } } 
 /// <summary>Gets a date and time value from a form post (HTTP POST). The incoming date string is expected to be XML formatted (like “2003-09-26T13:30:00”)</summary> 
 public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_description { get { return T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.description"); } } 
 /// <summary>The value to use if the post did not contain the specified parameter name.</summary> 
 public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_param_FallbackValue_help { get { return T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_param_FallbackValue_label { get { return T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.param.FallbackValue.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_param_ParameterName_help { get { return T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.param.ParameterName.help"); } } 
 /// <summary>Parameter name</summary> 
 public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_param_ParameterName_label { get { return T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.param.ParameterName.label"); } } 
 /// <summary>Gets a boolean value from a Url parameter (HTTP GET)</summary> 
 public static string Composite_Web_Request_QueryStringBoolValue_description { get { return T("Composite.Web.Request.QueryStringBoolValue.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_QueryStringBoolValue_param_FallbackValue_help { get { return T("Composite.Web.Request.QueryStringBoolValue.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_QueryStringBoolValue_param_FallbackValue_label { get { return T("Composite.Web.Request.QueryStringBoolValue.param.FallbackValue.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_QueryStringBoolValue_param_ParameterName_help { get { return T("Composite.Web.Request.QueryStringBoolValue.param.ParameterName.help"); } } 
 /// <summary>Parameter name</summary> 
 public static string Composite_Web_Request_QueryStringBoolValue_param_ParameterName_label { get { return T("Composite.Web.Request.QueryStringBoolValue.param.ParameterName.label"); } } 
 /// <summary>Gets a decimal value from a Url parameter (HTTP GET)</summary> 
 public static string Composite_Web_Request_QueryStringDecimalValue_description { get { return T("Composite.Web.Request.QueryStringDecimalValue.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_QueryStringDecimalValue_param_FallbackValue_help { get { return T("Composite.Web.Request.QueryStringDecimalValue.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_QueryStringDecimalValue_param_FallbackValue_label { get { return T("Composite.Web.Request.QueryStringDecimalValue.param.FallbackValue.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_QueryStringDecimalValue_param_ParameterName_help { get { return T("Composite.Web.Request.QueryStringDecimalValue.param.ParameterName.help"); } } 
 /// <summary>Parameter name</summary> 
 public static string Composite_Web_Request_QueryStringDecimalValue_param_ParameterName_label { get { return T("Composite.Web.Request.QueryStringDecimalValue.param.ParameterName.label"); } } 
 /// <summary>Gets a Guid value from a Url parameter (HTTP GET)</summary> 
 public static string Composite_Web_Request_QueryStringGuidValue_description { get { return T("Composite.Web.Request.QueryStringGuidValue.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_QueryStringGuidValue_param_FallbackValue_help { get { return T("Composite.Web.Request.QueryStringGuidValue.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_QueryStringGuidValue_param_FallbackValue_label { get { return T("Composite.Web.Request.QueryStringGuidValue.param.FallbackValue.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_QueryStringGuidValue_param_ParameterName_help { get { return T("Composite.Web.Request.QueryStringGuidValue.param.ParameterName.help"); } } 
 /// <summary>Parameter name</summary> 
 public static string Composite_Web_Request_QueryStringGuidValue_param_ParameterName_label { get { return T("Composite.Web.Request.QueryStringGuidValue.param.ParameterName.label"); } } 
 /// <summary>Gets a integer value from a Url parameter (HTTP GET)</summary> 
 public static string Composite_Web_Request_QueryStringIntegerValue_description { get { return T("Composite.Web.Request.QueryStringIntegerValue.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_QueryStringIntegerValue_param_FallbackValue_help { get { return T("Composite.Web.Request.QueryStringIntegerValue.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_QueryStringIntegerValue_param_FallbackValue_label { get { return T("Composite.Web.Request.QueryStringIntegerValue.param.FallbackValue.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_QueryStringIntegerValue_param_ParameterName_help { get { return T("Composite.Web.Request.QueryStringIntegerValue.param.ParameterName.help"); } } 
 /// <summary>Parameter name</summary> 
 public static string Composite_Web_Request_QueryStringIntegerValue_param_ParameterName_label { get { return T("Composite.Web.Request.QueryStringIntegerValue.param.ParameterName.label"); } } 
 /// <summary>Gets a string value from a Url parameter (HTTP GET)</summary> 
 public static string Composite_Web_Request_QueryStringValue_description { get { return T("Composite.Web.Request.QueryStringValue.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_QueryStringValue_param_FallbackValue_help { get { return T("Composite.Web.Request.QueryStringValue.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_QueryStringValue_param_FallbackValue_label { get { return T("Composite.Web.Request.QueryStringValue.param.FallbackValue.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_QueryStringValue_param_ParameterName_help { get { return T("Composite.Web.Request.QueryStringValue.param.ParameterName.help"); } } 
 /// <summary>Parameter name</summary> 
 public static string Composite_Web_Request_QueryStringValue_param_ParameterName_label { get { return T("Composite.Web.Request.QueryStringValue.param.ParameterName.label"); } } 
 /// <summary>Gets a date and time value from a Url parameter (HTTP GET). The incoming date string is expected to be XML formatted (like “2003-09-26T13:30:00”)</summary> 
 public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_description { get { return T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.description"); } } 
 /// <summary>The value to use if the Url did not contain the specified parameter name.</summary> 
 public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_param_FallbackValue_help { get { return T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_param_FallbackValue_label { get { return T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.param.FallbackValue.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_param_ParameterName_help { get { return T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.param.ParameterName.help"); } } 
 /// <summary>Parameter name</summary> 
 public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_param_ParameterName_label { get { return T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.param.ParameterName.label"); } } 
 /// <summary>Returns additional information passed in a URL along with the page link.</summary> 
 public static string Composite_Web_Request_PathInfo_description { get { return T("Composite.Web.Request.PathInfo.description"); } } 
 /// <summary>The segment of the path info to retrieve, using the format &apos;/(0)/(1)/(2)/...&apos;. Specify -1 to get the entire string.</summary> 
 public static string Composite_Web_Request_PathInfo_param_Segment_help { get { return T("Composite.Web.Request.PathInfo.param.Segment.help"); } } 
 /// <summary>Segment</summary> 
 public static string Composite_Web_Request_PathInfo_param_Segment_label { get { return T("Composite.Web.Request.PathInfo.param.Segment.label"); } } 
 /// <summary>When true, Composite C1 will be instructed to accept any path info string. Default is true.</summary> 
 public static string Composite_Web_Request_PathInfo_param_AutoApprove_help { get { return T("Composite.Web.Request.PathInfo.param.AutoApprove.help"); } } 
 /// <summary>AutoApprove</summary> 
 public static string Composite_Web_Request_PathInfo_param_AutoApprove_label { get { return T("Composite.Web.Request.PathInfo.param.AutoApprove.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_PathInfo_param_FallbackValue_help { get { return T("Composite.Web.Request.PathInfo.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_PathInfo_param_FallbackValue_label { get { return T("Composite.Web.Request.PathInfo.param.FallbackValue.label"); } } 
 /// <summary>Extracts an integer value from a PathInfo segment.</summary> 
 public static string Composite_Web_Request_PathInfoInt_description { get { return T("Composite.Web.Request.PathInfoInt.description"); } } 
 /// <summary>The segment of the path info to retrieve, using the format &apos;/(0)/(1)/(2)/...&apos;.</summary> 
 public static string Composite_Web_Request_PathInfoInt_param_Segment_help { get { return T("Composite.Web.Request.PathInfoInt.param.Segment.help"); } } 
 /// <summary>Segment</summary> 
 public static string Composite_Web_Request_PathInfoInt_param_Segment_label { get { return T("Composite.Web.Request.PathInfoInt.param.Segment.label"); } } 
 /// <summary>When true, Composite C1 will be instructed to accept any path info string. Default is true.</summary> 
 public static string Composite_Web_Request_PathInfoInt_param_AutoApprove_help { get { return T("Composite.Web.Request.PathInfoInt.param.AutoApprove.help"); } } 
 /// <summary>AutoApprove</summary> 
 public static string Composite_Web_Request_PathInfoInt_param_AutoApprove_label { get { return T("Composite.Web.Request.PathInfoInt.param.AutoApprove.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_PathInfoInt_param_FallbackValue_help { get { return T("Composite.Web.Request.PathInfoInt.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_PathInfoInt_param_FallbackValue_label { get { return T("Composite.Web.Request.PathInfoInt.param.FallbackValue.label"); } } 
 /// <summary>Extracts a GUID from a PathInfo segment.</summary> 
 public static string Composite_Web_Request_PathInfoGuid_description { get { return T("Composite.Web.Request.PathInfoGuid.description"); } } 
 /// <summary>The segment of the path info to retrieve, using the format &apos;/(0)/(1)/(2)/...&apos;. </summary> 
 public static string Composite_Web_Request_PathInfoGuid_param_Segment_help { get { return T("Composite.Web.Request.PathInfoGuid.param.Segment.help"); } } 
 /// <summary>Segment</summary> 
 public static string Composite_Web_Request_PathInfoGuid_param_Segment_label { get { return T("Composite.Web.Request.PathInfoGuid.param.Segment.label"); } } 
 /// <summary>When true, Composite C1 will be instructed to accept any path info string. Default is true.</summary> 
 public static string Composite_Web_Request_PathInfoGuid_param_AutoApprove_help { get { return T("Composite.Web.Request.PathInfoGuid.param.AutoApprove.help"); } } 
 /// <summary>AutoApprove</summary> 
 public static string Composite_Web_Request_PathInfoGuid_param_AutoApprove_label { get { return T("Composite.Web.Request.PathInfoGuid.param.AutoApprove.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_PathInfoGuid_param_FallbackValue_help { get { return T("Composite.Web.Request.PathInfoGuid.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_PathInfoGuid_param_FallbackValue_label { get { return T("Composite.Web.Request.PathInfoGuid.param.FallbackValue.label"); } } 
 /// <summary>Notifies the system of PathInfo being used, so that the request is not redirected to the &apos;Page not found&apos; page.</summary> 
 public static string Composite_Web_Request_RegisterPathInfoUsage_description { get { return T("Composite.Web.Request.RegisterPathInfoUsage.description"); } } 
 /// <summary>Retrieves a variable from the current users session as a string.</summary> 
 public static string Composite_Web_Request_SessionVariable_description { get { return T("Composite.Web.Request.SessionVariable.description"); } } 
 /// <summary>The value to use if the session variable was not found</summary> 
 public static string Composite_Web_Request_SessionVariable_param_FallbackValue_help { get { return T("Composite.Web.Request.SessionVariable.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Request_SessionVariable_param_FallbackValue_label { get { return T("Composite.Web.Request.SessionVariable.param.FallbackValue.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Request_SessionVariable_param_VariableName_help { get { return T("Composite.Web.Request.SessionVariable.param.VariableName.help"); } } 
 /// <summary>Variable name</summary> 
 public static string Composite_Web_Request_SessionVariable_param_VariableName_label { get { return T("Composite.Web.Request.SessionVariable.param.VariableName.label"); } } 
 /// <summary>Redirects the website visitor to another URL. URL redirects are suppressed when this function executes inside the C1 console.</summary> 
 public static string Composite_Web_Response_Redirect_description { get { return T("Composite.Web.Response.Redirect.description"); } } 
 /// <summary>The URL the user should be redirected to, either absolute (http://contoso.com/default.aspx) or relative (/Login.aspx)).</summary> 
 public static string Composite_Web_Response_Redirect_param_Url_help { get { return T("Composite.Web.Response.Redirect.param.Url.help"); } } 
 /// <summary>URL</summary> 
 public static string Composite_Web_Response_Redirect_param_Url_label { get { return T("Composite.Web.Response.Redirect.param.Url.label"); } } 
 /// <summary>Sets a cookie value for the current user</summary> 
 public static string Composite_Web_Response_SetCookieValue_description { get { return T("Composite.Web.Response.SetCookieValue.description"); } } 
 /// <summary>The name of the cookie to set / overwrite</summary> 
 public static string Composite_Web_Response_SetCookieValue_param_CookieName_help { get { return T("Composite.Web.Response.SetCookieValue.param.CookieName.help"); } } 
 /// <summary>Cookie name</summary> 
 public static string Composite_Web_Response_SetCookieValue_param_CookieName_label { get { return T("Composite.Web.Response.SetCookieValue.param.CookieName.label"); } } 
 /// <summary>The value to store in the cookie</summary> 
 public static string Composite_Web_Response_SetCookieValue_param_Value_help { get { return T("Composite.Web.Response.SetCookieValue.param.Value.help"); } } 
 /// <summary>Cookie value</summary> 
 public static string Composite_Web_Response_SetCookieValue_param_Value_label { get { return T("Composite.Web.Response.SetCookieValue.param.Value.label"); } } 
 /// <summary>When the cookie should expire (stop to exist). The default value is &apos;session&apos;, when the user closes the browser.</summary> 
 public static string Composite_Web_Response_SetCookieValue_param_Expires_help { get { return T("Composite.Web.Response.SetCookieValue.param.Expires.help"); } } 
 /// <summary>Expiration</summary> 
 public static string Composite_Web_Response_SetCookieValue_param_Expires_label { get { return T("Composite.Web.Response.SetCookieValue.param.Expires.label"); } } 
 /// <summary>Sets the maximum number of seconds the current page should be publicly cached on the server. To ensure that the page response is not cached set the &quot;Maximum seconds&quot; to &quot;0&quot;. If multiple sources set the server cache duration, the smallest number is used. Note that the file &quot;~/Renderers/Page.aspx&quot; contains a default value for cache duration – you can edit this file to change the default.</summary> 
 public static string Composite_Web_Response_SetServerPageCacheDuration_description { get { return T("Composite.Web.Response.SetServerPageCacheDuration.description"); } } 
 /// <summary>The maximum number of seconds the page currently being rendered should be publicly cached. A high value yield good performance, a low value make changes show up faster. A value of &apos;0&apos; ensure that all visitors get a unique response.</summary> 
 public static string Composite_Web_Response_SetServerPageCacheDuration_param_MaxSeconds_help { get { return T("Composite.Web.Response.SetServerPageCacheDuration.param.MaxSeconds.help"); } } 
 /// <summary>Maximum seconds</summary> 
 public static string Composite_Web_Response_SetServerPageCacheDuration_param_MaxSeconds_label { get { return T("Composite.Web.Response.SetServerPageCacheDuration.param.MaxSeconds.label"); } } 
 /// <summary>Sets a session variable for the current user</summary> 
 public static string Composite_Web_Response_SetSessionVariable_description { get { return T("Composite.Web.Response.SetSessionVariable.description"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Response_SetSessionVariable_param_Value_help { get { return T("Composite.Web.Response.SetSessionVariable.param.Value.help"); } } 
 /// <summary>Value</summary> 
 public static string Composite_Web_Response_SetSessionVariable_param_Value_label { get { return T("Composite.Web.Response.SetSessionVariable.param.Value.label"); } } 
 /// <summary>The name of the session variable to set.</summary> 
 public static string Composite_Web_Response_SetSessionVariable_param_VariableName_help { get { return T("Composite.Web.Response.SetSessionVariable.param.VariableName.help"); } } 
 /// <summary>Variable name</summary> 
 public static string Composite_Web_Response_SetSessionVariable_param_VariableName_label { get { return T("Composite.Web.Response.SetSessionVariable.param.VariableName.label"); } } 
 /// <summary>Gets the web application virtual path. Typically this is &apos;&apos; - the empty string, when running in the website root, but if Composite C1 is running in a sub folder this can be &apos;/MySubfolder&apos;. You can use this value to prefix URL&apos;s so they will work no matter is Composite C1 is running is a subfolder or not. Sample XSLT usage: &lt;img src=&quot;{/in:inputs/in:result[@name=&apos;ApplicationPath&apos;]}/images/myImage.png&quot; /&gt;</summary> 
 public static string Composite_Web_Server_ApplicationPath_description { get { return T("Composite.Web.Server.ApplicationPath.description"); } } 
 /// <summary>Gets an IIS application variable</summary> 
 public static string Composite_Web_Server_ApplicationVariable_description { get { return T("Composite.Web.Server.ApplicationVariable.description"); } } 
 /// <summary>Value to use if the application variable was not located</summary> 
 public static string Composite_Web_Server_ApplicationVariable_param_FallbackValue_help { get { return T("Composite.Web.Server.ApplicationVariable.param.FallbackValue.help"); } } 
 /// <summary>Fallback value</summary> 
 public static string Composite_Web_Server_ApplicationVariable_param_FallbackValue_label { get { return T("Composite.Web.Server.ApplicationVariable.param.FallbackValue.label"); } } 
 /// <summary></summary> 
 public static string Composite_Web_Server_ApplicationVariable_param_VariableName_help { get { return T("Composite.Web.Server.ApplicationVariable.param.VariableName.help"); } } 
 /// <summary>Variable name</summary> 
 public static string Composite_Web_Server_ApplicationVariable_param_VariableName_label { get { return T("Composite.Web.Server.ApplicationVariable.param.VariableName.label"); } } 
 /// <summary>Gets the value of an IIS Server variable</summary> 
 public static string Composite_Web_Server_ServerVariable_description { get { return T("Composite.Web.Server.ServerVariable.description"); } } 
 /// <summary>The IIS Server variable to get.</summary> 
 public static string Composite_Web_Server_ServerVariable_param_VariableName_help { get { return T("Composite.Web.Server.ServerVariable.param.VariableName.help"); } } 
 /// <summary>Variable name</summary> 
 public static string Composite_Web_Server_ServerVariable_param_VariableName_label { get { return T("Composite.Web.Server.ServerVariable.param.VariableName.label"); } } 
 /// <summary>Loads a local XML file given a relative path</summary> 
 public static string Composite_Xml_LoadFile_description { get { return T("Composite.Xml.LoadFile.description"); } } 
 /// <summary>The relative path of the XML file to load</summary> 
 public static string Composite_Xml_LoadFile_param_RelativePath_help { get { return T("Composite.Xml.LoadFile.param.RelativePath.help"); } } 
 /// <summary>Relative path</summary> 
 public static string Composite_Xml_LoadFile_param_RelativePath_label { get { return T("Composite.Xml.LoadFile.param.RelativePath.label"); } } 
 /// <summary>Loads a local XHTML file given a relative path</summary> 
 public static string Composite_Xml_LoadXhtmlFile_description { get { return T("Composite.Xml.LoadXhtmlFile.description"); } } 
 /// <summary>The relative path of the XHTML file to load</summary> 
 public static string Composite_Xml_LoadXhtmlFile_param_RelativePath_help { get { return T("Composite.Xml.LoadXhtmlFile.param.RelativePath.help"); } } 
 /// <summary>Relative path</summary> 
 public static string Composite_Xml_LoadXhtmlFile_param_RelativePath_label { get { return T("Composite.Xml.LoadXhtmlFile.param.RelativePath.label"); } } 
 /// <summary>Loads a remote XML file given a Url</summary> 
 public static string Composite_Xml_LoadUrl_description { get { return T("Composite.Xml.LoadUrl.description"); } } 
 /// <summary></summary> 
 public static string Composite_Xml_LoadUrl_param_Url_help { get { return T("Composite.Xml.LoadUrl.param.Url.help"); } } 
 /// <summary>Url</summary> 
 public static string Composite_Xml_LoadUrl_param_Url_label { get { return T("Composite.Xml.LoadUrl.param.Url.label"); } } 
 /// <summary>Time period in seconds for which the result should is cached. Default is 0 (no caching).</summary> 
 public static string Composite_Xml_LoadUrl_param_CacheTime_help { get { return T("Composite.Xml.LoadUrl.param.CacheTime.help"); } } 
 /// <summary>Seconds to cache</summary> 
 public static string Composite_Xml_LoadUrl_param_CacheTime_label { get { return T("Composite.Xml.LoadUrl.param.CacheTime.label"); } } 
 /// <summary>Provides localized date formatting functions for XSLT use. </summary> 
 public static string Composite_Xslt_Extensions_DateFormatting_description { get { return T("Composite.Xslt.Extensions.DateFormatting.description"); } } 
 /// <summary>Provides globalization functions for XSLT use.</summary> 
 public static string Composite_Xslt_Extensions_Globalization_description { get { return T("Composite.Xslt.Extensions.Globalization.description"); } } 
 /// <summary>Provides functions that parse encoded XML documents or XHTML fragments into nodes. Use this extension when you have XML or XHTML as a string and need to copy it to the output or do transformations on it.</summary> 
 public static string Composite_Xslt_Extensions_MarkupParser_description { get { return T("Composite.Xslt.Extensions.MarkupParser.description"); } } 
 /// <summary>Sends an e-mail. Remember to configure SMTP server connection in the web.config file.</summary> 
 public static string Composite_Mail_SendMail_description { get { return T("Composite.Mail.SendMail.description"); } } 
 /// <summary>From</summary> 
 public static string Composite_Mail_SendMail_param_From_label { get { return T("Composite.Mail.SendMail.param.From.label"); } } 
 /// <summary>Sender&apos;s address.</summary> 
 public static string Composite_Mail_SendMail_param_From_help { get { return T("Composite.Mail.SendMail.param.From.help"); } } 
 /// <summary>To</summary> 
 public static string Composite_Mail_SendMail_param_To_label { get { return T("Composite.Mail.SendMail.param.To.label"); } } 
 /// <summary>Recipient. A list of comma separated email addresses.</summary> 
 public static string Composite_Mail_SendMail_param_To_help { get { return T("Composite.Mail.SendMail.param.To.help"); } } 
 /// <summary>Subject</summary> 
 public static string Composite_Mail_SendMail_param_Subject_label { get { return T("Composite.Mail.SendMail.param.Subject.label"); } } 
 /// <summary>Email subject.</summary> 
 public static string Composite_Mail_SendMail_param_Subject_help { get { return T("Composite.Mail.SendMail.param.Subject.help"); } } 
 /// <summary>Body</summary> 
 public static string Composite_Mail_SendMail_param_Body_label { get { return T("Composite.Mail.SendMail.param.Body.label"); } } 
 /// <summary>Email body.</summary> 
 public static string Composite_Mail_SendMail_param_Body_help { get { return T("Composite.Mail.SendMail.param.Body.help"); } } 
 /// <summary>IsHtml</summary> 
 public static string Composite_Mail_SendMail_param_IsHtml_label { get { return T("Composite.Mail.SendMail.param.IsHtml.label"); } } 
 /// <summary>Defines whether email to be sent is an HTML email or a text email.</summary> 
 public static string Composite_Mail_SendMail_param_IsHtml_help { get { return T("Composite.Mail.SendMail.param.IsHtml.help"); } } 
 /// <summary>CC</summary> 
 public static string Composite_Mail_SendMail_param_CC_label { get { return T("Composite.Mail.SendMail.param.CC.label"); } } 
 /// <summary>Carbon Copy. A list of comma separated email addresses that are secondary recipients of a message.</summary> 
 public static string Composite_Mail_SendMail_param_CC_help { get { return T("Composite.Mail.SendMail.param.CC.help"); } } 
 /// <summary>ReplyTo</summary> 
 public static string Composite_Mail_SendMail_param_ReplyTo_label { get { return T("Composite.Mail.SendMail.param.ReplyTo.label"); } } 
 /// <summary>Address that should be used to reply to the message.</summary> 
 public static string Composite_Mail_SendMail_param_ReplyTo_help { get { return T("Composite.Mail.SendMail.param.ReplyTo.help"); } } 
 /// <summary>BCC</summary> 
 public static string Composite_Mail_SendMail_param_BCC_label { get { return T("Composite.Mail.SendMail.param.BCC.label"); } } 
 /// <summary>Blind Carbon Copy. A list of recipients which will receive a mail but their individual email addresses will be concealed from the complete list of recipients.</summary> 
 public static string Composite_Mail_SendMail_param_BCC_help { get { return T("Composite.Mail.SendMail.param.BCC.help"); } } 
 /// <summary>Attachment</summary> 
 public static string Composite_Mail_SendMail_param_Attachment_label { get { return T("Composite.Mail.SendMail.param.Attachment.label"); } } 
 /// <summary>List of attached files. \n     Format it the following [{name}=]{filepath}[,{mime-type] [ | .... ].  \n     File path can be either relative or absolute path f.e. &quot;C:\someimage.jpg&quot; or &quot;/coolpicture.jpg&quot;  \n     If file path starts with &quot;Composite/&quot;, it will be recognized as a path to Composite media, f.e. &apos;Composite/MediaArchive:someImage.gif&apos; \n      \n     Examples:  \n        /attachment.jpg \n       image.jpg=/attachment.jpg \n       image.jpg=/attachment.jpg,image/jpg \n       image1.jpg=/attachment1.jpg,image/jpg|image2.jpg=/attachment2.jpg,image/jpg</summary> 
 public static string Composite_Mail_SendMail_param_Attachment_help { get { return T("Composite.Mail.SendMail.param.Attachment.help"); } } 
 /// <summary>AttachmentFromMedia</summary> 
 public static string Composite_Mail_SendMail_param_AttachmentFromMedia_label { get { return T("Composite.Mail.SendMail.param.AttachmentFromMedia.label"); } } 
 /// <summary>A file from media library to be attached.</summary> 
 public static string Composite_Mail_SendMail_param_AttachmentFromMedia_help { get { return T("Composite.Mail.SendMail.param.AttachmentFromMedia.help"); } } 
 /// <summary>Filters images by it&apos;s folder path</summary> 
 public static string Composite_Data_Types_IImageFile_MediaFolderFilter_description { get { return T("Composite.Data.Types.IImageFile.MediaFolderFilter.description"); } } 
 /// <summary>Media Folder</summary> 
 public static string Composite_Data_Types_IImageFile_MediaFolderFilter_param_MediaFolder_label { get { return T("Composite.Data.Types.IImageFile.MediaFolderFilter.param.MediaFolder.label"); } } 
 /// <summary>A reference to a media folder</summary> 
 public static string Composite_Data_Types_IImageFile_MediaFolderFilter_param_MediaFolder_help { get { return T("Composite.Data.Types.IImageFile.MediaFolderFilter.param.MediaFolder.help"); } } 
 /// <summary>Include Subfolders</summary> 
 public static string Composite_Data_Types_IImageFile_MediaFolderFilter_param_IncludeSubfolders_label { get { return T("Composite.Data.Types.IImageFile.MediaFolderFilter.param.IncludeSubfolders.label"); } } 
 /// <summary>Determines whether images from subfolders should be included.</summary> 
 public static string Composite_Data_Types_IImageFile_MediaFolderFilter_param_IncludeSubfolders_help { get { return T("Composite.Data.Types.IImageFile.MediaFolderFilter.param.IncludeSubfolders.help"); } } 
 /// <summary>Filters images by it&apos;s folder path</summary> 
 public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_description { get { return T("Composite.Data.Types.IMediaFile.MediaFolderFilter.description"); } } 
 /// <summary>Media Folder</summary> 
 public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_param_MediaFolder_label { get { return T("Composite.Data.Types.IMediaFile.MediaFolderFilter.param.MediaFolder.label"); } } 
 /// <summary>A reference to a media folder</summary> 
 public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_param_MediaFolder_help { get { return T("Composite.Data.Types.IMediaFile.MediaFolderFilter.param.MediaFolder.help"); } } 
 /// <summary>Include Subfolders</summary> 
 public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_param_IncludeSubfolders_label { get { return T("Composite.Data.Types.IMediaFile.MediaFolderFilter.param.IncludeSubfolders.label"); } } 
 /// <summary>Determines whether media files from subfolders should be included.</summary> 
 public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_param_IncludeSubfolders_help { get { return T("Composite.Data.Types.IMediaFile.MediaFolderFilter.param.IncludeSubfolders.help"); } } 
 /// <summary>Converts an enumerable of XElements to a Dictionary using named attributes for keys and values.</summary> 
 public static string Composite_Utils_Dictionary_XElementsToDictionary_description { get { return T("Composite.Utils.Dictionary.XElementsToDictionary.description"); } } 
 /// <summary>XElements</summary> 
 public static string Composite_Utils_Dictionary_XElementsToDictionary_param_XElements_label { get { return T("Composite.Utils.Dictionary.XElementsToDictionary.param.XElements.label"); } } 
 /// <summary>An enumerable of XElements that will be used to create a dictionary from.</summary> 
 public static string Composite_Utils_Dictionary_XElementsToDictionary_param_XElements_help { get { return T("Composite.Utils.Dictionary.XElementsToDictionary.param.XElements.help"); } } 
 /// <summary>Key Attribute Name</summary> 
 public static string Composite_Utils_Dictionary_XElementsToDictionary_param_KeyAttributeName_label { get { return T("Composite.Utils.Dictionary.XElementsToDictionary.param.KeyAttributeName.label"); } } 
 /// <summary>The name of the attribute on each XElement which value will be used for keys in the dictionary.</summary> 
 public static string Composite_Utils_Dictionary_XElementsToDictionary_param_KeyAttributeName_help { get { return T("Composite.Utils.Dictionary.XElementsToDictionary.param.KeyAttributeName.help"); } } 
 /// <summary>Value Attribute Name</summary> 
 public static string Composite_Utils_Dictionary_XElementsToDictionary_param_ValueAttributeName_label { get { return T("Composite.Utils.Dictionary.XElementsToDictionary.param.ValueAttributeName.label"); } } 
 /// <summary>The name of the attribute on each XElement which value will be used for values in the dictionary.</summary> 
 public static string Composite_Utils_Dictionary_XElementsToDictionary_param_ValueAttributeName_help { get { return T("Composite.Utils.Dictionary.XElementsToDictionary.param.ValueAttributeName.help"); } } 
 /// <summary>Converts an enumerable of objects to a Dictionary using named property names for keys and values.</summary> 
 public static string Composite_Utils_Dictionary_EnumerableToDictionary_description { get { return T("Composite.Utils.Dictionary.EnumerableToDictionary.description"); } } 
 /// <summary>Objects</summary> 
 public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_Elements_label { get { return T("Composite.Utils.Dictionary.EnumerableToDictionary.param.Elements.label"); } } 
 /// <summary>An enumerable of objects that will be used to create a dictionary from.</summary> 
 public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_Elements_help { get { return T("Composite.Utils.Dictionary.EnumerableToDictionary.param.Elements.help"); } } 
 /// <summary>Key Property Name</summary> 
 public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_KeyPropertyName_label { get { return T("Composite.Utils.Dictionary.EnumerableToDictionary.param.KeyPropertyName.label"); } } 
 /// <summary>The name of the property on each object which value will be used for keys in the dictionary.</summary> 
 public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_KeyPropertyName_help { get { return T("Composite.Utils.Dictionary.EnumerableToDictionary.param.KeyPropertyName.help"); } } 
 /// <summary>Value Property Name</summary> 
 public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_ValuePropertyName_label { get { return T("Composite.Utils.Dictionary.EnumerableToDictionary.param.ValuePropertyName.label"); } } 
 /// <summary>The name of the property on each object which value will be used for values in the dictionary.</summary> 
 public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_ValuePropertyName_help { get { return T("Composite.Utils.Dictionary.EnumerableToDictionary.param.ValuePropertyName.help"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.StandardFunctions", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_UserControlFunction {
 /// <summary>User Control Functions</summary> 
 public static string RootElement_Label { get { return T("RootElement.Label"); } } 
 /// <summary>Functions based on .ascx controls</summary> 
 public static string RootElement_ToolTip { get { return T("RootElement.ToolTip"); } } 
 /// <summary>Add User Control Function</summary> 
 public static string AddNewUserControlFunction_Label { get { return T("AddNewUserControlFunction.Label"); } } 
 /// <summary>Add a new User Control function</summary> 
 public static string AddNewUserControlFunction_ToolTip { get { return T("AddNewUserControlFunction.ToolTip"); } } 
 /// <summary>Edit</summary> 
 public static string EditUserControlFunction_Label { get { return T("EditUserControlFunction.Label"); } } 
 /// <summary>Edit the User Control Function</summary> 
 public static string EditUserControlFunction_ToolTip { get { return T("EditUserControlFunction.ToolTip"); } } 
 /// <summary>Delete</summary> 
 public static string DeleteUserControlFunction_Label { get { return T("DeleteUserControlFunction.Label"); } } 
 /// <summary>Delete the User Control function</summary> 
 public static string DeleteUserControlFunction_ToolTip { get { return T("DeleteUserControlFunction.ToolTip"); } } 
 /// <summary>Add User Control Function</summary> 
 public static string AddNewUserControlFunction_LabelDialog { get { return T("AddNewUserControlFunction.LabelDialog"); } } 
 /// <summary>New User Control function</summary> 
 public static string AddNewUserControlFunction_LabelFieldGroup { get { return T("AddNewUserControlFunction.LabelFieldGroup"); } } 
 /// <summary>Name</summary> 
 public static string AddNewUserControlFunction_LabelName { get { return T("AddNewUserControlFunction.LabelName"); } } 
 /// <summary></summary> 
 public static string AddNewUserControlFunction_HelpName { get { return T("AddNewUserControlFunction.HelpName"); } } 
 /// <summary>Namespace</summary> 
 public static string AddNewUserControlFunction_LabelNamespace { get { return T("AddNewUserControlFunction.LabelNamespace"); } } 
 /// <summary></summary> 
 public static string AddNewUserControlFunction_HelpNamespace { get { return T("AddNewUserControlFunction.HelpNamespace"); } } 
 /// <summary>Copy from</summary> 
 public static string AddNewUserControlFunction_LabelCopyFrom { get { return T("AddNewUserControlFunction.LabelCopyFrom"); } } 
 /// <summary>You can copy the code from another User Control function by selecting it in this list.</summary> 
 public static string AddNewUserControlFunction_LabelCopyFromHelp { get { return T("AddNewUserControlFunction.LabelCopyFromHelp"); } } 
 /// <summary>(New User Control function)</summary> 
 public static string AddNewUserControlFunction_LabelCopyFromEmptyOption { get { return T("AddNewUserControlFunction.LabelCopyFromEmptyOption"); } } 
 /// <summary>A C1 function with the same name already exists.</summary> 
 public static string AddNewUserControlFunctionWorkflow_DuplicateName { get { return T("AddNewUserControlFunctionWorkflow.DuplicateName"); } } 
 /// <summary>Function name is empty</summary> 
 public static string AddNewUserControlFunctionWorkflow_EmptyName { get { return T("AddNewUserControlFunctionWorkflow.EmptyName"); } } 
 /// <summary>Function namespace is empty</summary> 
 public static string AddNewUserControlFunctionWorkflow_NamespaceEmpty { get { return T("AddNewUserControlFunctionWorkflow.NamespaceEmpty"); } } 
 /// <summary>Namespace must be like A.B.C - not start and end with .</summary> 
 public static string AddNewUserControlFunctionWorkflow_InvalidNamespace { get { return T("AddNewUserControlFunctionWorkflow.InvalidNamespace"); } } 
 /// <summary>The total length of the name and the namespace is too long (used to name the ASCX file).</summary> 
 public static string AddNewUserControlFunctionWorkflow_TotalNameTooLang { get { return T("AddNewUserControlFunctionWorkflow.TotalNameTooLang"); } } 
 /// <summary>Validation Error</summary> 
 public static string EditUserControlFunctionWorkflow_Validation_DialogTitle { get { return T("EditUserControlFunctionWorkflow.Validation.DialogTitle"); } } 
 /// <summary>Compilation failed: {0}</summary> 
 public static string EditUserControlFunctionWorkflow_Validation_CompilationFailed(string parameter0) { return string.Format(T("EditUserControlFunctionWorkflow.Validation.CompilationFailed"), parameter0); } 
 /// <summary>The User Control function should inherit &apos;{0}&apos;</summary> 
 public static string EditUserControlFunctionWorkflow_Validation_IncorrectBaseClass(string parameter0) { return string.Format(T("EditUserControlFunctionWorkflow.Validation.IncorrectBaseClass"), parameter0); } 
 /// <summary>Delete User Control Function?</summary> 
 public static string DeleteUserControlFunctionWorkflow_ConfirmDeleteTitle { get { return T("DeleteUserControlFunctionWorkflow.ConfirmDeleteTitle"); } } 
 /// <summary>Delete the selected User Control?</summary> 
 public static string DeleteUserControlFunctionWorkflow_ConfirmDeleteMessage { get { return T("DeleteUserControlFunctionWorkflow.ConfirmDeleteMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.UserControlFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_UserGroupElementProvider {
 /// <summary>User Groups</summary> 
 public static string UserGroupElementProvider_RootLabel { get { return T("UserGroupElementProvider.RootLabel"); } } 
 /// <summary>User Groups</summary> 
 public static string UserGroupElementProvider_RootToolTip { get { return T("UserGroupElementProvider.RootToolTip"); } } 
 /// <summary>Add User Group...</summary> 
 public static string UserGroupElementProvider_AddNewUserGroupLabel { get { return T("UserGroupElementProvider.AddNewUserGroupLabel"); } } 
 /// <summary>Add new User Group</summary> 
 public static string UserGroupElementProvider_AddNewUserGroupToolTip { get { return T("UserGroupElementProvider.AddNewUserGroupToolTip"); } } 
 /// <summary>Edit User Group</summary> 
 public static string UserGroupElementProvider_EditUserGroupLabel { get { return T("UserGroupElementProvider.EditUserGroupLabel"); } } 
 /// <summary>Edit User Group</summary> 
 public static string UserGroupElementProvider_EditUserGroupToolTip { get { return T("UserGroupElementProvider.EditUserGroupToolTip"); } } 
 /// <summary>Delete User Group</summary> 
 public static string UserGroupElementProvider_DeleteUserGroupLabel { get { return T("UserGroupElementProvider.DeleteUserGroupLabel"); } } 
 /// <summary>Delete User Group</summary> 
 public static string UserGroupElementProvider_DeleteUserGroupToolTip { get { return T("UserGroupElementProvider.DeleteUserGroupToolTip"); } } 
 /// <summary>Add User Group</summary> 
 public static string AddNewUserGroup_AddNewUserGroupStep1_LabelFieldGroup { get { return T("AddNewUserGroup.AddNewUserGroupStep1.LabelFieldGroup"); } } 
 /// <summary>User group name</summary> 
 public static string AddNewUserGroup_AddNewUserGroupStep1_UserGroupNameLabel { get { return T("AddNewUserGroup.AddNewUserGroupStep1.UserGroupNameLabel"); } } 
 /// <summary>The name of the new user group</summary> 
 public static string AddNewUserGroup_AddNewUserGroupStep1_UserGroupNameHelp { get { return T("AddNewUserGroup.AddNewUserGroupStep1.UserGroupNameHelp"); } } 
 /// <summary>A user group with the same name already exists</summary> 
 public static string AddNewUserGroup_AddNewUserGroupStep1_UserGroupNameAlreadyExists { get { return T("AddNewUserGroup.AddNewUserGroupStep1.UserGroupNameAlreadyExists"); } } 
 /// <summary>Edit User Group</summary> 
 public static string EditUserGroup_EditUserGroupStep1_LabelFieldGroup { get { return T("EditUserGroup.EditUserGroupStep1.LabelFieldGroup"); } } 
 /// <summary>User group name</summary> 
 public static string EditUserGroup_EditUserGroupStep1_UserGroupNameLabel { get { return T("EditUserGroup.EditUserGroupStep1.UserGroupNameLabel"); } } 
 /// <summary>The name of the user group</summary> 
 public static string EditUserGroup_EditUserGroupStep1_UserGroupNameHelp { get { return T("EditUserGroup.EditUserGroupStep1.UserGroupNameHelp"); } } 
 /// <summary>A user group with the same name already exists</summary> 
 public static string EditUserGroup_EditUserGroupStep1_UserGroupNameAlreadyExists { get { return T("EditUserGroup.EditUserGroupStep1.UserGroupNameAlreadyExists"); } } 
 /// <summary>Perspectives</summary> 
 public static string EditUserGroup_EditUserGroupStep1_ActivePerspectiveFieldLabel { get { return T("EditUserGroup.EditUserGroupStep1.ActivePerspectiveFieldLabel"); } } 
 /// <summary>Perspectives</summary> 
 public static string EditUserGroup_EditUserGroupStep1_ActivePerspectiveMultiSelectLabel { get { return T("EditUserGroup.EditUserGroupStep1.ActivePerspectiveMultiSelectLabel"); } } 
 /// <summary>Select which perspectives the user gets access to view</summary> 
 public static string EditUserGroup_EditUserGroupStep1_ActivePerspectiveMultiSelectHelp { get { return T("EditUserGroup.EditUserGroupStep1.ActivePerspectiveMultiSelectHelp"); } } 
 /// <summary>Global permissions</summary> 
 public static string EditUserGroup_EditUserGroupStep1_GlobalPermissionsFieldLabel { get { return T("EditUserGroup.EditUserGroupStep1.GlobalPermissionsFieldLabel"); } } 
 /// <summary>Global permissions</summary> 
 public static string EditUserGroup_EditUserGroupStep1_GlobalPermissionsMultiSelectLabel { get { return T("EditUserGroup.EditUserGroupStep1.GlobalPermissionsMultiSelectLabel"); } } 
 /// <summary>The Administrate permission grants the user group access to manage user group permissions and execute other administrative tasks.</summary> 
 public static string EditUserGroup_EditUserGroupStep1_GlobalPermissionsMultiSelectHelp { get { return T("EditUserGroup.EditUserGroupStep1.GlobalPermissionsMultiSelectHelp"); } } 
 /// <summary>User Group Has Users</summary> 
 public static string DeleteUserGroup_DeleteUserGroupInitialStep_UserGroupHasUsersTitle { get { return T("DeleteUserGroup.DeleteUserGroupInitialStep.UserGroupHasUsersTitle"); } } 
 /// <summary>You cannot delete a user group that has users.</summary> 
 public static string DeleteUserGroup_DeleteUserGroupInitialStep_UserGroupHasUsersMessage { get { return T("DeleteUserGroup.DeleteUserGroupInitialStep.UserGroupHasUsersMessage"); } } 
 /// <summary>Delete User Group</summary> 
 public static string DeleteUserGroup_DeleteUserGroupStep1_LabelFieldGroup { get { return T("DeleteUserGroup.DeleteUserGroupStep1.LabelFieldGroup"); } } 
 /// <summary>Delete the selected user group?</summary> 
 public static string DeleteUserGroup_DeleteUserGroupStep1_Text { get { return T("DeleteUserGroup.DeleteUserGroupStep1.Text"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.UserGroupElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_VisualFunction {
 /// <summary>Delete Visual Function?</summary> 
 public static string DeleteStep1_FieldGroupLabel { get { return T("DeleteStep1.FieldGroupLabel"); } } 
 /// <summary>Are you sure you wish to delete the selected function?</summary> 
 public static string DeleteStep1_Text { get { return T("DeleteStep1.Text"); } } 
 /// <summary>Add Visual Function</summary> 
 public static string AddNew_DialogLabel { get { return T("AddNew.DialogLabel"); } } 
 /// <summary>No Datatypes to Visualize</summary> 
 public static string AddNew_NoTypesExistsErrorTitle { get { return T("AddNew.NoTypesExistsErrorTitle"); } } 
 /// <summary>No datatypes have been created yet. You must first create a datatype to visualize before you can create a visualization.</summary> 
 public static string AddNew_NoTypesExistsErrorMessage { get { return T("AddNew.NoTypesExistsErrorMessage"); } } 
 /// <summary>No Data to Visualize and Preview</summary> 
 public static string AddNew_NoDataExistsErrorTitle { get { return T("AddNew.NoDataExistsErrorTitle"); } } 
 /// <summary>Data must exist before you can create a rendering. Add some data to this type and try again.</summary> 
 public static string AddNew_NoDataExistsErrorMessage { get { return T("AddNew.NoDataExistsErrorMessage"); } } 
 /// <summary>No Templates</summary> 
 public static string AddNew_NoPageTemplatesExistsErrorTitle { get { return T("AddNew.NoPageTemplatesExistsErrorTitle"); } } 
 /// <summary>At least one template must exist before you can create a rendering. Create one template and try again.</summary> 
 public static string AddNew_NoPageTemplatesExistsErrorMessage { get { return T("AddNew.NoPageTemplatesExistsErrorMessage"); } } 
 /// <summary>A Language Is Required</summary> 
 public static string AddNew_MissingActiveLanguageTitle { get { return T("AddNew.MissingActiveLanguageTitle"); } } 
 /// <summary>To create a visual function a language is required, but no languages have been added yet. You can add one under the System perspective.</summary> 
 public static string AddNew_MissingActiveLanguageMessage { get { return T("AddNew.MissingActiveLanguageMessage"); } } 
 /// <summary>Select datatype to visualize</summary> 
 public static string AddNewStep1_FieldGroupLabel { get { return T("AddNewStep1.FieldGroupLabel"); } } 
 /// <summary>Datatype</summary> 
 public static string AddNewStep1_TypeSelectorLabel { get { return T("AddNewStep1.TypeSelectorLabel"); } } 
 /// <summary></summary> 
 public static string AddNewStep1_TypeSelectorHelp { get { return T("AddNewStep1.TypeSelectorHelp"); } } 
 /// <summary>Visual function naming</summary> 
 public static string AddNewStep2_FieldGroupLabel { get { return T("AddNewStep2.FieldGroupLabel"); } } 
 /// <summary>Function name</summary> 
 public static string AddNewStep2_FuncitonNameLabel { get { return T("AddNewStep2.FuncitonNameLabel"); } } 
 /// <summary></summary> 
 public static string AddNewStep2_FuncitonNameHelp { get { return T("AddNewStep2.FuncitonNameHelp"); } } 
 /// <summary>Function namespace</summary> 
 public static string AddNewStep2_FuncitonNamespaceLabel { get { return T("AddNewStep2.FuncitonNamespaceLabel"); } } 
 /// <summary></summary> 
 public static string AddNewStep2_FuncitonNamespaceHelp { get { return T("AddNewStep2.FuncitonNamespaceHelp"); } } 
 /// <summary>Visual Function Settings</summary> 
 public static string Edit_PlaceHolderLabel { get { return T("Edit.PlaceHolderLabel"); } } 
 /// <summary>Visual function</summary> 
 public static string Edit_HeadingTitel { get { return T("Edit.HeadingTitel"); } } 
 /// <summary>Visual function settings</summary> 
 public static string Edit_FieldGroupLabel { get { return T("Edit.FieldGroupLabel"); } } 
 /// <summary>Function name</summary> 
 public static string Edit_FunctionNameLabel { get { return T("Edit.FunctionNameLabel"); } } 
 /// <summary>The name of the function. Names must be unique with a namespace.</summary> 
 public static string Edit_FunctionNameHelp { get { return T("Edit.FunctionNameHelp"); } } 
 /// <summary>Function namespace</summary> 
 public static string Edit_FunctionNamespaceLabel { get { return T("Edit.FunctionNamespaceLabel"); } } 
 /// <summary>The &apos;package&apos; this function belongs to.</summary> 
 public static string Edit_FunctionNamespaceHelp { get { return T("Edit.FunctionNamespaceHelp"); } } 
 /// <summary>Description</summary> 
 public static string Edit_FunctionDescriptionLabel { get { return T("Edit.FunctionDescriptionLabel"); } } 
 /// <summary>A description of the function that can help people understand what it does.</summary> 
 public static string Edit_FunctionDescriptionHelp { get { return T("Edit.FunctionDescriptionHelp"); } } 
 /// <summary>Item list length</summary> 
 public static string Edit_ItemListLenghtLabel { get { return T("Edit.ItemListLenghtLabel"); } } 
 /// <summary>The maximum number of items to show.</summary> 
 public static string Edit_ItemListLenghtHelp { get { return T("Edit.ItemListLenghtHelp"); } } 
 /// <summary>Item sorting</summary> 
 public static string Edit_ItemSortingLabel { get { return T("Edit.ItemSortingLabel"); } } 
 /// <summary>Select which field to use when sorting the list. Use &apos;(random)&apos; to pick randomly from the list.</summary> 
 public static string Edit_ItemSortingHelp { get { return T("Edit.ItemSortingHelp"); } } 
 /// <summary>List sort order</summary> 
 public static string Edit_ListSortingLabel { get { return T("Edit.ListSortingLabel"); } } 
 /// <summary>Ascending</summary> 
 public static string Edit_ListSortingTrueLabel { get { return T("Edit.ListSortingTrueLabel"); } } 
 /// <summary>Descending</summary> 
 public static string Edit_ListSortingFalseLabel { get { return T("Edit.ListSortingFalseLabel"); } } 
 /// <summary>Select the sorted order. Ascending order is alphabetically, chronological. This field is ignored when &apos;(random)&apos; sorting is active.</summary> 
 public static string Edit_ListSortingHelp { get { return T("Edit.ListSortingHelp"); } } 
 /// <summary>Preview template</summary> 
 public static string Edit_PreviewTemplateLabel { get { return T("Edit.PreviewTemplateLabel"); } } 
 /// <summary>This information is only used when previewing the function.</summary> 
 public static string Edit_PreviewTemplateHelp { get { return T("Edit.PreviewTemplateHelp"); } } 
 /// <summary>Visual Layout</summary> 
 public static string Edit_WYSIWYGLayoutLabel { get { return T("Edit.WYSIWYGLayoutLabel"); } } 
 /// <summary>Preview</summary> 
 public static string Edit_LabelPreview { get { return T("Edit.LabelPreview"); } } 
 /// <summary>No templates</summary> 
 public static string Edit_NoPageTemplatesExistsErrorTitle { get { return T("Edit.NoPageTemplatesExistsErrorTitle"); } } 
 /// <summary>At least one template must exist before you can edit a rendering. Create one template and try again.</summary> 
 public static string Edit_NoPageTemplatesExistsErrorMessage { get { return T("Edit.NoPageTemplatesExistsErrorMessage"); } } 
 /// <summary>A language is required</summary> 
 public static string Edit_MissingActiveLanguageTitle { get { return T("Edit.MissingActiveLanguageTitle"); } } 
 /// <summary>To edit a visual function a language is required, but no languages have been added yet. You can add one under the System perspective.</summary> 
 public static string Edit_MissingActiveLanguageMessage { get { return T("Edit.MissingActiveLanguageMessage"); } } 
 /// <summary>Select a visual function</summary> 
 public static string Select_FieldGroupLabel { get { return T("Select.FieldGroupLabel"); } } 
 /// <summary>Select a function</summary> 
 public static string Select_FunctionFunctionsLabel { get { return T("Select.FunctionFunctionsLabel"); } } 
 /// <summary>Select a visual function to edit or delete</summary> 
 public static string Select_FunctionFunctionsHelp { get { return T("Select.FunctionFunctionsHelp"); } } 
 /// <summary>Another function with this name exists. Names must be unique.</summary> 
 public static string AddVisualFunctionWorkflow_FunctionNameValidatoinErrorMessage { get { return T("AddVisualFunctionWorkflow.FunctionNameValidatoinErrorMessage"); } } 
 /// <summary>Another function with this name exists. Names must be unique.</summary> 
 public static string EditVisualFunctionWorkflow_FunctionNameValidatoinErrorMessage { get { return T("EditVisualFunctionWorkflow.FunctionNameValidatoinErrorMessage"); } } 
 /// <summary>Visual Functions</summary> 
 public static string VisualFunctionElementProvider_RootFolderLabel { get { return T("VisualFunctionElementProvider.RootFolderLabel"); } } 
 /// <summary>Visual functions</summary> 
 public static string VisualFunctionElementProvider_RootFolderToolTip { get { return T("VisualFunctionElementProvider.RootFolderToolTip"); } } 
 /// <summary>Add Visual Function</summary> 
 public static string VisualFunctionElementProvider_AddNewLabel { get { return T("VisualFunctionElementProvider.AddNewLabel"); } } 
 /// <summary>Add new visual function</summary> 
 public static string VisualFunctionElementProvider_AddNewToolTip { get { return T("VisualFunctionElementProvider.AddNewToolTip"); } } 
 /// <summary>Edit Visual Function</summary> 
 public static string VisualFunctionElementProvider_EditLabel { get { return T("VisualFunctionElementProvider.EditLabel"); } } 
 /// <summary>Edit visual function</summary> 
 public static string VisualFunctionElementProvider_EditToolTip { get { return T("VisualFunctionElementProvider.EditToolTip"); } } 
 /// <summary>Delete Visual Function</summary> 
 public static string VisualFunctionElementProvider_DeleteLabel { get { return T("VisualFunctionElementProvider.DeleteLabel"); } } 
 /// <summary>Delete visual function</summary> 
 public static string VisualFunctionElementProvider_DeleteToolTip { get { return T("VisualFunctionElementProvider.DeleteToolTip"); } } 
 /// <summary>Another function with this name exists. Names must be unique.</summary> 
 public static string VisualFunctionElementProvider_FunctionNameNotUniqueError { get { return T("VisualFunctionElementProvider.FunctionNameNotUniqueError"); } } 
 /// <summary>New visual function</summary> 
 public static string VisualFunctionElementProviderHelper_AddNewLabel { get { return T("VisualFunctionElementProviderHelper.AddNewLabel"); } } 
 /// <summary>New visual function</summary> 
 public static string VisualFunctionElementProviderHelper_AddNewToolTip { get { return T("VisualFunctionElementProviderHelper.AddNewToolTip"); } } 
 /// <summary>Edit visual function</summary> 
 public static string VisualFunctionElementProviderHelper_EditLabel { get { return T("VisualFunctionElementProviderHelper.EditLabel"); } } 
 /// <summary>Edit visual function</summary> 
 public static string VisualFunctionElementProviderHelper_EditToolTip { get { return T("VisualFunctionElementProviderHelper.EditToolTip"); } } 
 /// <summary>Delete visual function</summary> 
 public static string VisualFunctionElementProviderHelper_DeleteLabel { get { return T("VisualFunctionElementProviderHelper.DeleteLabel"); } } 
 /// <summary>Delete visual function</summary> 
 public static string VisualFunctionElementProviderHelper_DeleteToolTip { get { return T("VisualFunctionElementProviderHelper.DeleteToolTip"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_WebsiteFileElementProvider {
 /// <summary>/</summary> 
 public static string WebsiteFilesRootElement_Label { get { return T("WebsiteFilesRootElement.Label"); } } 
 /// <summary>/</summary> 
 public static string LayoutResourcesRootElement_Label { get { return T("LayoutResourcesRootElement.Label"); } } 
 /// <summary>Layout</summary> 
 public static string LayoutResourcesKeyNameLabel { get { return T("LayoutResourcesKeyNameLabel"); } } 
 /// <summary>Delete File?</summary> 
 public static string DeleteFile_LabelFieldGroup { get { return T("DeleteFile.LabelFieldGroup"); } } 
 /// <summary>Delete file?</summary> 
 public static string DeleteFile_Text { get { return T("DeleteFile.Text"); } } 
 /// <summary>Delete Folder?</summary> 
 public static string DeleteFolder_LabelFieldGroup { get { return T("DeleteFolder.LabelFieldGroup"); } } 
 /// <summary>Delete folder?</summary> 
 public static string DeleteFolder_Text { get { return T("DeleteFolder.Text"); } } 
 /// <summary>Add New Folder</summary> 
 public static string AddNewFolder_LabelFieldGroup { get { return T("AddNewFolder.LabelFieldGroup"); } } 
 /// <summary>Folder name</summary> 
 public static string AddNewFolder_Text { get { return T("AddNewFolder.Text"); } } 
 /// <summary>Enter the name of the new folder</summary> 
 public static string AddNewFolder_Help { get { return T("AddNewFolder.Help"); } } 
 /// <summary>A folder with the same name already exists</summary> 
 public static string AddNewFolder_Error_FolderExist { get { return T("AddNewFolder.Error.FolderExist"); } } 
 /// <summary>Add New File</summary> 
 public static string AddNewFile_LabelFieldGroup { get { return T("AddNewFile.LabelFieldGroup"); } } 
 /// <summary>File name</summary> 
 public static string AddNewFile_Text { get { return T("AddNewFile.Text"); } } 
 /// <summary>Enter the name of the new file</summary> 
 public static string AddNewFile_Help { get { return T("AddNewFile.Help"); } } 
 /// <summary>A file with the same name already exists</summary> 
 public static string AddNewFile_Error_FileExist { get { return T("AddNewFile.Error.FileExist"); } } 
 /// <summary>Upload File</summary> 
 public static string UploadNewWebsiteFile_LabelFieldGroup { get { return T("UploadNewWebsiteFile.LabelFieldGroup"); } } 
 /// <summary>Select file</summary> 
 public static string UploadNewWebsiteFile_LabelFile { get { return T("UploadNewWebsiteFile.LabelFile"); } } 
 /// <summary>Select file to upload</summary> 
 public static string UploadNewWebsiteFile_HelpFile { get { return T("UploadNewWebsiteFile.HelpFile"); } } 
 /// <summary>Overwrite existing file</summary> 
 public static string UploadNewWebsiteFile_ConfirmOverwriteTitle { get { return T("UploadNewWebsiteFile.ConfirmOverwriteTitle"); } } 
 /// <summary>A file with the same name already exists, overwrite?</summary> 
 public static string UploadNewWebsiteFile_ConfirmOverwriteDescription { get { return T("UploadNewWebsiteFile.ConfirmOverwriteDescription"); } } 
 /// <summary>Wrong File Type</summary> 
 public static string UploadFile_Error_WrongTypeTitle { get { return T("UploadFile.Error.WrongTypeTitle"); } } 
 /// <summary>Wrong file type</summary> 
 public static string UploadFile_Error_WrongTypeMessage { get { return T("UploadFile.Error.WrongTypeMessage"); } } 
 /// <summary>New Folder</summary> 
 public static string AddWebsiteFolderTitle { get { return T("AddWebsiteFolderTitle"); } } 
 /// <summary>Add new folder</summary> 
 public static string AddWebsiteFolderToolTip { get { return T("AddWebsiteFolderToolTip"); } } 
 /// <summary>New File</summary> 
 public static string AddWebsiteFileTitle { get { return T("AddWebsiteFileTitle"); } } 
 /// <summary>Create new file</summary> 
 public static string AddWebsiteFileToolTip { get { return T("AddWebsiteFileToolTip"); } } 
 /// <summary>Delete File</summary> 
 public static string DeleteWebsiteFileTitle { get { return T("DeleteWebsiteFileTitle"); } } 
 /// <summary>Delete file</summary> 
 public static string DeleteWebsiteFileToolTip { get { return T("DeleteWebsiteFileToolTip"); } } 
 /// <summary>Download</summary> 
 public static string DownloadFileTitle { get { return T("DownloadFileTitle"); } } 
 /// <summary>Download file</summary> 
 public static string DownloadFileToolTip { get { return T("DownloadFileToolTip"); } } 
 /// <summary>Delete Folder</summary> 
 public static string DeleteWebsiteFolderTitle { get { return T("DeleteWebsiteFolderTitle"); } } 
 /// <summary>Delete folder</summary> 
 public static string DeleteWebsiteFolderToolTip { get { return T("DeleteWebsiteFolderToolTip"); } } 
 /// <summary>Edit File</summary> 
 public static string EditWebsiteFileTitle { get { return T("EditWebsiteFileTitle"); } } 
 /// <summary>Edit file</summary> 
 public static string EditWebsiteFileToolTip { get { return T("EditWebsiteFileToolTip"); } } 
 /// <summary>Upload File</summary> 
 public static string UploadWebsiteFileTitle { get { return T("UploadWebsiteFileTitle"); } } 
 /// <summary>Upload file</summary> 
 public static string UploadWebsiteFileToolTip { get { return T("UploadWebsiteFileToolTip"); } } 
 /// <summary>Show in &quot;{0}&quot;</summary> 
 public static string AddFolderToWhiteListTitle(string parameter0) { return string.Format(T("AddFolderToWhiteListTitle"), parameter0); } 
 /// <summary>Control if this folder should be visible in &quot;{0}&quot;</summary> 
 public static string AddFolderToWhiteListToolTip(string parameter0) { return string.Format(T("AddFolderToWhiteListToolTip"), parameter0); } 
 /// <summary>Show in &quot;{0}&quot;</summary> 
 public static string RemoveFolderFromWhiteListTitle(string parameter0) { return string.Format(T("RemoveFolderFromWhiteListTitle"), parameter0); } 
 /// <summary>Control if this folder should be visible in &quot;{0}&quot;</summary> 
 public static string RemoveFolderFromWhiteListToolTip(string parameter0) { return string.Format(T("RemoveFolderFromWhiteListToolTip"), parameter0); } 
 /// <summary>Error</summary> 
 public static string DeleteWebsiteFileWorkflow_DeleteErrorTitle { get { return T("DeleteWebsiteFileWorkflow.DeleteErrorTitle"); } } 
 /// <summary>Could not delete the file</summary> 
 public static string DeleteWebsiteFileWorkflow_DeleteErrorMessage { get { return T("DeleteWebsiteFileWorkflow.DeleteErrorMessage"); } } 
 /// <summary>Error</summary> 
 public static string DeleteWebsiteFolderWorkflow_DeleteErrorTitle { get { return T("DeleteWebsiteFolderWorkflow.DeleteErrorTitle"); } } 
 /// <summary>Could not delete the folder</summary> 
 public static string DeleteWebsiteFolderWorkflow_DeleteErrorMessage { get { return T("DeleteWebsiteFolderWorkflow.DeleteErrorMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_XsltBasedFunction {
 /// <summary>XSLT Functions</summary> 
 public static string Plugins_XsltBasedFunctionProviderElementProvider_RootFolderLabel { get { return T("Plugins.XsltBasedFunctionProviderElementProvider.RootFolderLabel"); } } 
 /// <summary>XSLT functions</summary> 
 public static string Plugins_XsltBasedFunctionProviderElementProvider_RootFolderToolTip { get { return T("Plugins.XsltBasedFunctionProviderElementProvider.RootFolderToolTip"); } } 
 /// <summary>An XSLT function with the same name already exists.</summary> 
 public static string AddNewXsltFunctionWorkflow_DuplicateName { get { return T("AddNewXsltFunctionWorkflow.DuplicateName"); } } 
 /// <summary>Method name must be non-empty</summary> 
 public static string AddNewXsltFunctionWorkflow_MethodEmpty { get { return T("AddNewXsltFunctionWorkflow.MethodEmpty"); } } 
 /// <summary>Namespace must be non-empty</summary> 
 public static string AddNewXsltFunctionWorkflow_NamespaceEmpty { get { return T("AddNewXsltFunctionWorkflow.NamespaceEmpty"); } } 
 /// <summary>Namespace must be like A.B.C - not start and end with .</summary> 
 public static string AddNewXsltFunctionWorkflow_InvalidNamespace { get { return T("AddNewXsltFunctionWorkflow.InvalidNamespace"); } } 
 /// <summary>A language is required</summary> 
 public static string AddNewXsltFunctionWorkflow_MissingActiveLanguageTitle { get { return T("AddNewXsltFunctionWorkflow.MissingActiveLanguageTitle"); } } 
 /// <summary>To create a XSLT function a language is required, but no languages have been added yet. You can add one under the System perspective.</summary> 
 public static string AddNewXsltFunctionWorkflow_MissingActiveLanguageMessage { get { return T("AddNewXsltFunctionWorkflow.MissingActiveLanguageMessage"); } } 
 /// <summary>A page is required</summary> 
 public static string AddNewXsltFunctionWorkflow_MissingPageTitle { get { return T("AddNewXsltFunctionWorkflow.MissingPageTitle"); } } 
 /// <summary>To create a XSLT function at least one page has to be added.</summary> 
 public static string AddNewXsltFunctionWorkflow_MissingPageMessage { get { return T("AddNewXsltFunctionWorkflow.MissingPageMessage"); } } 
 /// <summary>The total length of the name and the namespace is too long (used to name the XSL file).</summary> 
 public static string AddNewXsltFunctionWorkflow_TotalNameTooLang { get { return T("AddNewXsltFunctionWorkflow.TotalNameTooLang"); } } 
 /// <summary>Delete XSLT Function?</summary> 
 public static string DeleteXsltFunctionWorkflow_ConfirmDeleteTitle { get { return T("DeleteXsltFunctionWorkflow.ConfirmDeleteTitle"); } } 
 /// <summary>Delete the selected XSLT?</summary> 
 public static string DeleteXsltFunctionWorkflow_ConfirmDeleteMessage { get { return T("DeleteXsltFunctionWorkflow.ConfirmDeleteMessage"); } } 
 /// <summary>Cascade Delete Error</summary> 
 public static string DeleteXsltFunctionWorkflow_CascadeDeleteErrorTitle { get { return T("DeleteXsltFunctionWorkflow.CascadeDeleteErrorTitle"); } } 
 /// <summary>The type is referenced by another type that does not allow cascade deletes. This operation is halted</summary> 
 public static string DeleteXsltFunctionWorkflow_CascadeDeleteErrorMessage { get { return T("DeleteXsltFunctionWorkflow.CascadeDeleteErrorMessage"); } } 
 /// <summary>An XSLT function with the same name already exists.</summary> 
 public static string EditXsltFunctionWorkflow_DuplicateName { get { return T("EditXsltFunctionWorkflow.DuplicateName"); } } 
 /// <summary>The method name must be non-empty</summary> 
 public static string EditXsltFunctionWorkflow_EmptyMethodName { get { return T("EditXsltFunctionWorkflow.EmptyMethodName"); } } 
 /// <summary>The namespace must be non-empty</summary> 
 public static string EditXsltFunctionWorkflow_NamespaceEmpty { get { return T("EditXsltFunctionWorkflow.NamespaceEmpty"); } } 
 /// <summary>The namespace must be like A.B.C - not start and end with &apos;.&apos; (period)</summary> 
 public static string EditXsltFunctionWorkflow_InvalidNamespace { get { return T("EditXsltFunctionWorkflow.InvalidNamespace"); } } 
 /// <summary>XslFilePath must start with \ or /</summary> 
 public static string EditXsltFunctionWorkflow_InvalidFileName { get { return T("EditXsltFunctionWorkflow.InvalidFileName"); } } 
 /// <summary>Invalid function name</summary> 
 public static string EditXsltFunctionWorkflow_InvalidName { get { return T("EditXsltFunctionWorkflow.InvalidName"); } } 
 /// <summary>Cannot rename the function, file &apos;{0}&apos; already exists.</summary> 
 public static string EditXsltFunctionWorkflow_CannotRenameFileExists(string parameter0) { return string.Format(T("EditXsltFunctionWorkflow.CannotRenameFileExists"), parameter0); } 
 /// <summary>The total length of the name and the namespace is too long (used to name the XSL file).</summary> 
 public static string EditXsltFunctionWorkflow_TotalNameTooLang { get { return T("EditXsltFunctionWorkflow.TotalNameTooLang"); } } 
 /// <summary>Duplicate local function names</summary> 
 public static string EditXsltFunctionWorkflow_SameLocalFunctionNameClashTitle { get { return T("EditXsltFunctionWorkflow.SameLocalFunctionNameClashTitle"); } } 
 /// <summary>Two or more function calls has the same local name. Change the names so that all are different.</summary> 
 public static string EditXsltFunctionWorkflow_SameLocalFunctionNameClashMessage { get { return T("EditXsltFunctionWorkflow.SameLocalFunctionNameClashMessage"); } } 
 /// <summary>Add XSLT Function</summary> 
 public static string XsltBasedFunctionProviderElementProvider_Add { get { return T("XsltBasedFunctionProviderElementProvider.Add"); } } 
 /// <summary>Add new XSLT function</summary> 
 public static string XsltBasedFunctionProviderElementProvider_AddToolTip { get { return T("XsltBasedFunctionProviderElementProvider.AddToolTip"); } } 
 /// <summary>Edit</summary> 
 public static string XsltBasedFunctionProviderElementProvider_Edit { get { return T("XsltBasedFunctionProviderElementProvider.Edit"); } } 
 /// <summary>Edit XSLT function</summary> 
 public static string XsltBasedFunctionProviderElementProvider_EditToolTip { get { return T("XsltBasedFunctionProviderElementProvider.EditToolTip"); } } 
 /// <summary>Delete</summary> 
 public static string XsltBasedFunctionProviderElementProvider_Delete { get { return T("XsltBasedFunctionProviderElementProvider.Delete"); } } 
 /// <summary>Delete XSLT function</summary> 
 public static string XsltBasedFunctionProviderElementProvider_DeleteToolTip { get { return T("XsltBasedFunctionProviderElementProvider.DeleteToolTip"); } } 
 /// <summary>Add New XSLT Function</summary> 
 public static string AddNewXsltFunctionStep1_LabelDialog { get { return T("AddNewXsltFunctionStep1.LabelDialog"); } } 
 /// <summary>New Xslt function</summary> 
 public static string AddNewXsltFunctionStep1_LabelFieldGroup { get { return T("AddNewXsltFunctionStep1.LabelFieldGroup"); } } 
 /// <summary>Name</summary> 
 public static string AddNewXsltFunctionStep1_LabelName { get { return T("AddNewXsltFunctionStep1.LabelName"); } } 
 /// <summary></summary> 
 public static string AddNewXsltFunctionStep1_HelpName { get { return T("AddNewXsltFunctionStep1.HelpName"); } } 
 /// <summary>Namespace</summary> 
 public static string AddNewXsltFunctionStep1_LabelNamespace { get { return T("AddNewXsltFunctionStep1.LabelNamespace"); } } 
 /// <summary></summary> 
 public static string AddNewXsltFunctionStep1_HelpNamespace { get { return T("AddNewXsltFunctionStep1.HelpNamespace"); } } 
 /// <summary>Output type</summary> 
 public static string AddNewXsltFunctionStep1_LabelOutputType { get { return T("AddNewXsltFunctionStep1.LabelOutputType"); } } 
 /// <summary>Copy from</summary> 
 public static string AddNewXsltFunctionStep1_LabelCopyFrom { get { return T("AddNewXsltFunctionStep1.LabelCopyFrom"); } } 
 /// <summary>(New XSLT function)</summary> 
 public static string AddNewXsltFunctionStep1_LabelCopyFromEmptyOption { get { return T("AddNewXsltFunctionStep1.LabelCopyFromEmptyOption"); } } 
 /// <summary>Settings</summary> 
 public static string EditXsltFunction_LabelSettings { get { return T("EditXsltFunction.LabelSettings"); } } 
 /// <summary>Name</summary> 
 public static string EditXsltFunction_LabelName { get { return T("EditXsltFunction.LabelName"); } } 
 /// <summary></summary> 
 public static string EditXsltFunction_HelpName { get { return T("EditXsltFunction.HelpName"); } } 
 /// <summary>Namespace</summary> 
 public static string EditXsltFunction_LabelNamespace { get { return T("EditXsltFunction.LabelNamespace"); } } 
 /// <summary></summary> 
 public static string EditXsltFunction_HelpNamespace { get { return T("EditXsltFunction.HelpNamespace"); } } 
 /// <summary>Description</summary> 
 public static string EditXsltFunction_LabelDescription { get { return T("EditXsltFunction.LabelDescription"); } } 
 /// <summary></summary> 
 public static string EditXsltFunction_HelpDescription { get { return T("EditXsltFunction.HelpDescription"); } } 
 /// <summary>Debug</summary> 
 public static string EditXsltFunction_LabelDebug { get { return T("EditXsltFunction.LabelDebug"); } } 
 /// <summary>Page</summary> 
 public static string EditXsltFunction_LabelPage { get { return T("EditXsltFunction.LabelPage"); } } 
 /// <summary>When debugging, this page is used as context for the rendering.</summary> 
 public static string EditXsltFunction_HelpPage { get { return T("EditXsltFunction.HelpPage"); } } 
 /// <summary>Administrative</summary> 
 public static string EditXsltFunction_LabelAdminitrativeScope { get { return T("EditXsltFunction.LabelAdminitrativeScope"); } } 
 /// <summary>Public</summary> 
 public static string EditXsltFunction_LabelPublicScope { get { return T("EditXsltFunction.LabelPublicScope"); } } 
 /// <summary>Data scope</summary> 
 public static string EditXsltFunction_LabelPageDataScope { get { return T("EditXsltFunction.LabelPageDataScope"); } } 
 /// <summary>Choose public or development version as context for the rendering.</summary> 
 public static string EditXsltFunction_HelpPageDataScope { get { return T("EditXsltFunction.HelpPageDataScope"); } } 
 /// <summary>Language</summary> 
 public static string EditXsltFunction_LabelActiveLocales { get { return T("EditXsltFunction.LabelActiveLocales"); } } 
 /// <summary>Select language to be used while debugging the function.</summary> 
 public static string EditXsltFunction_HelpActiveLocales { get { return T("EditXsltFunction.HelpActiveLocales"); } } 
 /// <summary>Output type</summary> 
 public static string EditXsltFunction_OutputType { get { return T("EditXsltFunction.OutputType"); } } 
 /// <summary>Input Parameters</summary> 
 public static string EditXsltFunction_LabelInputParameters { get { return T("EditXsltFunction.LabelInputParameters"); } } 
 /// <summary>Function Calls</summary> 
 public static string EditXsltFunction_LabelFunctionCalls { get { return T("EditXsltFunction.LabelFunctionCalls"); } } 
 /// <summary>Template</summary> 
 public static string EditXsltFunction_LabelTemplate { get { return T("EditXsltFunction.LabelTemplate"); } } 
 /// <summary>Preview</summary> 
 public static string EditXsltFunction_LabelPreview { get { return T("EditXsltFunction.LabelPreview"); } } 
 /// <summary>A Language Is Required</summary> 
 public static string EditXsltFunctionWorkflow_MissingActiveLanguageTitle { get { return T("EditXsltFunctionWorkflow.MissingActiveLanguageTitle"); } } 
 /// <summary>To edit a XSLT function a language is required, but no languages have been added yet. You can add one under the System perspective.</summary> 
 public static string EditXsltFunctionWorkflow_MissingActiveLanguageMessage { get { return T("EditXsltFunctionWorkflow.MissingActiveLanguageMessage"); } } 
 /// <summary>A Page Is Required</summary> 
 public static string EditXsltFunctionWorkflow_MissingPageTitle { get { return T("EditXsltFunctionWorkflow.MissingPageTitle"); } } 
 /// <summary>To edit a XSLT function at least one page has to be added.</summary> 
 public static string EditXsltFunctionWorkflow_MissingPageMessage { get { return T("EditXsltFunctionWorkflow.MissingPageMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_FormControl_FunctionCallsDesigner {
 /// <summary>Function Properties</summary> 
 public static string DialogTitle { get { return T("DialogTitle"); } } 
 /// <summary>Function result local name</summary> 
 public static string FunctionLocalNameGroupLabel { get { return T("FunctionLocalNameGroupLabel"); } } 
 /// <summary>Local name</summary> 
 public static string FunctionLocalNameLabel { get { return T("FunctionLocalNameLabel"); } } 
 /// <summary>If you include a function multiple times this field can help you distinguish the individual results by their local name. </summary> 
 public static string FunctionLocalNameHelp { get { return T("FunctionLocalNameHelp"); } } 
 /// <summary>Parameter Value</summary> 
 public static string ParameterValueLabel { get { return T("ParameterValueLabel"); } } 
 /// <summary>Select Function</summary> 
 public static string AddNewFunctionDialogLabel { get { return T("AddNewFunctionDialogLabel"); } } 
 /// <summary>Select Function</summary> 
 public static string SetNewFunctionDialogLabel { get { return T("SetNewFunctionDialogLabel"); } } 
 /// <summary>Value for parameter &apos;{0}&apos;</summary> 
 public static string ComplexFunctionCallDialogLabel(string parameter0) { return string.Format(T("ComplexFunctionCallDialogLabel"), parameter0); } 
 /// <summary>Parameter Type</summary> 
 public static string ParameterTypeLabel { get { return T("ParameterTypeLabel"); } } 
 /// <summary>Parameter Name</summary> 
 public static string ParameterNameLabel { get { return T("ParameterNameLabel"); } } 
 /// <summary>Return type</summary> 
 public static string ReturnTypeLabel { get { return T("ReturnTypeLabel"); } } 
 /// <summary>Validation failed</summary> 
 public static string ValidationFailedAlertTitle { get { return T("ValidationFailedAlertTitle"); } } 
 /// <summary>Function &apos;{0}&apos; does not exist.</summary> 
 public static string FunctionNotFound(string parameter0) { return string.Format(T("FunctionNotFound"), parameter0); } 
 /// <summary>Required parameter &apos;{0}&apos; has not been defined.</summary> 
 public static string RequiredParameterNotDefined(string parameter0) { return string.Format(T("RequiredParameterNotDefined"), parameter0); } 
 /// <summary>Incorrect type cast. Parameter name: &apos;{0}&apos;, function name: &apos;{1}&apos;.</summary> 
 public static string IncorrectTypeCast(string parameter0,string parameter1) { return string.Format(T("IncorrectTypeCast"), parameter0,parameter1); } 
 /// <summary>Default</summary> 
 public static string ParameterTypeDefaultLabel { get { return T("ParameterTypeDefaultLabel"); } } 
 /// <summary>Constant</summary> 
 public static string ParameterTypeConstantLabel { get { return T("ParameterTypeConstantLabel"); } } 
 /// <summary>Input Parameter</summary> 
 public static string ParameterTypeInputParameterLabel { get { return T("ParameterTypeInputParameterLabel"); } } 
 /// <summary>Function</summary> 
 public static string ParameterTypeFunctionLabel { get { return T("ParameterTypeFunctionLabel"); } } 
 /// <summary>Add New</summary> 
 public static string AddNewButtonLabel { get { return T("AddNewButtonLabel"); } } 
 /// <summary>Delete</summary> 
 public static string DeleteButtonLabel { get { return T("DeleteButtonLabel"); } } 
 /// <summary>Set New</summary> 
 public static string SetNewButtonLabel { get { return T("SetNewButtonLabel"); } } 
 /// <summary>Source</summary> 
 public static string ToolBar_LabelSource { get { return T("ToolBar.LabelSource"); } } 
 /// <summary>Design</summary> 
 public static string ToolBar_LabelDesign { get { return T("ToolBar.LabelDesign"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.FormControl.FunctionCallsDesigner", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_FormControl_FunctionParameterDesigner {
 /// <summary>Add New</summary> 
 public static string AddNewButtonLabel { get { return T("AddNewButtonLabel"); } } 
 /// <summary>Delete</summary> 
 public static string DeleteButtonLabel { get { return T("DeleteButtonLabel"); } } 
 /// <summary>List of input parameters</summary> 
 public static string TreeRootNodeLabel { get { return T("TreeRootNodeLabel"); } } 
 /// <summary>Parameter naming and help</summary> 
 public static string ParameterNamingGroupLabel { get { return T("ParameterNamingGroupLabel"); } } 
 /// <summary>Parameter name</summary> 
 public static string Name { get { return T("Name"); } } 
 /// <summary>The name of the parameter. The name is used by the system to identify this parameter. Names must be unique and may not contain spaces and other special characters. Use names like &apos;Title&apos;, &apos;StartDate&apos;, &apos;LargeImage&apos; etc.</summary> 
 public static string NameHelp { get { return T("NameHelp"); } } 
 /// <summary>Label</summary> 
 public static string Label { get { return T("Label"); } } 
 /// <summary>The text that users should see when specifying a value for this parameter. This is the &apos;human name&apos; for the parameter.</summary> 
 public static string LabelHelp { get { return T("LabelHelp"); } } 
 /// <summary>Help</summary> 
 public static string Help { get { return T("Help"); } } 
 /// <summary>Write a short text that tells the user what to do with the parameter.</summary> 
 public static string HelpHelp { get { return T("HelpHelp"); } } 
 /// <summary>Parameter type and values</summary> 
 public static string ParameterTypeValueGroupLabel { get { return T("ParameterTypeValueGroupLabel"); } } 
 /// <summary>Parameter type</summary> 
 public static string Type { get { return T("Type"); } } 
 /// <summary>The type of this parameter.</summary> 
 public static string TypeHelp { get { return T("TypeHelp"); } } 
 /// <summary>Default value</summary> 
 public static string DefaultValue { get { return T("DefaultValue"); } } 
 /// <summary>You can specify a default value for this parameter. If a parameter has a default value, users are not required to specify it when calling the function.</summary> 
 public static string DefaultValueHelp { get { return T("DefaultValueHelp"); } } 
 /// <summary>Specify default value</summary> 
 public static string DefaultValueSpecify { get { return T("DefaultValueSpecify"); } } 
 /// <summary>Edit default value</summary> 
 public static string DefaultValueEdit { get { return T("DefaultValueEdit"); } } 
 /// <summary>Parameter Default Value</summary> 
 public static string DefaultValueDialogLabel { get { return T("DefaultValueDialogLabel"); } } 
 /// <summary>Test value</summary> 
 public static string TestValue { get { return T("TestValue"); } } 
 /// <summary>When previewing you can test with different input parameter values using this field. If this is left blank, the default value will be used for previews.</summary> 
 public static string TestValueHelp { get { return T("TestValueHelp"); } } 
 /// <summary>Specify test value</summary> 
 public static string TestValueSpecify { get { return T("TestValueSpecify"); } } 
 /// <summary>Edit test value</summary> 
 public static string TestValueEdit { get { return T("TestValueEdit"); } } 
 /// <summary>Parameter Test Value</summary> 
 public static string TestValueDialogLabel { get { return T("TestValueDialogLabel"); } } 
 /// <summary>Parameter presentation</summary> 
 public static string ParameterPresentationGroupLabel { get { return T("ParameterPresentationGroupLabel"); } } 
 /// <summary>Widget</summary> 
 public static string Widget { get { return T("Widget"); } } 
 /// <summary>You can select which type of input widget (like a textbox) to use when specifying a value for this parameter. Widgets are only available for simple types.</summary> 
 public static string WidgetHelp { get { return T("WidgetHelp"); } } 
 /// <summary>(no widget specified)</summary> 
 public static string NoWidgetSpecifiedLabel { get { return T("NoWidgetSpecifiedLabel"); } } 
 /// <summary>Parameter Widget</summary> 
 public static string WidgetDialogLabel { get { return T("WidgetDialogLabel"); } } 
 /// <summary>Position</summary> 
 public static string Position { get { return T("Position"); } } 
 /// <summary>Last</summary> 
 public static string PositionLast { get { return T("PositionLast"); } } 
 /// <summary>The position of the parameter. This controls the order of the parameters.</summary> 
 public static string PositionHelp { get { return T("PositionHelp"); } } 
 /// <summary>Remember to specify a widget...</summary> 
 public static string SpecifyWidgetTip { get { return T("SpecifyWidgetTip"); } } 
 /// <summary>The specified name is not valid.</summary> 
 public static string FieldNameSyntaxInvalid { get { return T("FieldNameSyntaxInvalid"); } } 
 /// <summary>Can not save... Another parameter has the same name. Please change the name.</summary> 
 public static string CannotSave { get { return T("CannotSave"); } } 
 /// <summary>Invalid name. Parameter names can not contain spaces. You can write a readable name in the Label field below.</summary> 
 public static string SpaceInNameError { get { return T("SpaceInNameError"); } } 
 /// <summary>Parameter names can not be empty. Please specify a name.</summary> 
 public static string NameEmptyError { get { return T("NameEmptyError"); } } 
 /// <summary>Another parameter uses this name. Parameter names must be unique.</summary> 
 public static string NameAlreadyInUseError { get { return T("NameAlreadyInUseError"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.FormControl.FunctionParameterDesigner", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_FormControl_TypeFieldDesigner {
 /// <summary>Basic</summary> 
 public static string BasicTabLabel { get { return T("BasicTabLabel"); } } 
 /// <summary>Advanced</summary> 
 public static string AdvancedTabLabel { get { return T("AdvancedTabLabel"); } } 
 /// <summary>Add New</summary> 
 public static string AddNewButtonLabel { get { return T("AddNewButtonLabel"); } } 
 /// <summary>Delete</summary> 
 public static string DeleteButtonLabel { get { return T("DeleteButtonLabel"); } } 
 /// <summary>Datatype Fields</summary> 
 public static string LabelDataTypeFields { get { return T("LabelDataTypeFields"); } } 
 /// <summary>Field properties</summary> 
 public static string FieldDetailsGroupLabel { get { return T("FieldDetailsGroupLabel"); } } 
 /// <summary>Name</summary> 
 public static string Name { get { return T("Name"); } } 
 /// <summary>The name of the field is used by the system to identify this field. Names must be unique and can not contain spaces and other special characters. Use names like &apos;Title&apos;, &apos;StartDate&apos;, &apos;LargeImage&apos; etc.</summary> 
 public static string NameHelp { get { return T("NameHelp"); } } 
 /// <summary>Label</summary> 
 public static string Label { get { return T("Label"); } } 
 /// <summary>Label text are showed to users when adding a new item based on the datatype.</summary> 
 public static string LabelHelp { get { return T("LabelHelp"); } } 
 /// <summary>Help</summary> 
 public static string Help { get { return T("Help"); } } 
 /// <summary>Use this entry for a short help text to the user.</summary> 
 public static string HelpHelp { get { return T("HelpHelp"); } } 
 /// <summary>Field type and requirements</summary> 
 public static string FieldTypeGroupLabel { get { return T("FieldTypeGroupLabel"); } } 
 /// <summary>Field type</summary> 
 public static string FieldType { get { return T("FieldType"); } } 
 /// <summary>Select a data type for the field. The type determine which kind of data the field can hold.</summary> 
 public static string FieldTypeHelp { get { return T("FieldTypeHelp"); } } 
 /// <summary>String</summary> 
 public static string System_String { get { return T("System.String"); } } 
 /// <summary>Integer</summary> 
 public static string System_Int32 { get { return T("System.Int32"); } } 
 /// <summary>Decimal number</summary> 
 public static string System_Decimal { get { return T("System.Decimal"); } } 
 /// <summary>Date</summary> 
 public static string System_DateTime { get { return T("System.DateTime"); } } 
 /// <summary>Boolean</summary> 
 public static string System_Boolean { get { return T("System.Boolean"); } } 
 /// <summary>Unique Identifier (GUID)</summary> 
 public static string System_Guid { get { return T("System.Guid"); } } 
 /// <summary>Data reference</summary> 
 public static string Reference { get { return T("Reference"); } } 
 /// <summary>Use this field to further configure your selected type.</summary> 
 public static string TypeDetailsHelp { get { return T("TypeDetailsHelp"); } } 
 /// <summary>Optional</summary> 
 public static string Optional { get { return T("Optional"); } } 
 /// <summary>Optional fields may be left blank.</summary> 
 public static string OptionalHelp { get { return T("OptionalHelp"); } } 
 /// <summary>No</summary> 
 public static string OptionalFalseLabel { get { return T("OptionalFalseLabel"); } } 
 /// <summary>Yes</summary> 
 public static string OptionalTrueLabel { get { return T("OptionalTrueLabel"); } } 
 /// <summary>Validation rules</summary> 
 public static string ValidationRules { get { return T("ValidationRules"); } } 
 /// <summary>You can specify strict rules on the data that is entered in this field, i.e. &quot;must be at least 5 characters long&quot;, &quot;must be a valid e-mail address&quot;, &quot;must be a date in the past&quot; etc.</summary> 
 public static string ValidationRulesHelp { get { return T("ValidationRulesHelp"); } } 
 /// <summary>Add validation rules...</summary> 
 public static string ValidationRulesAdd { get { return T("ValidationRulesAdd"); } } 
 /// <summary>Edit validation rules</summary> 
 public static string ValidationRulesEdit { get { return T("ValidationRulesEdit"); } } 
 /// <summary>Field Validation Rules Configuration</summary> 
 public static string ValidationRulesDialogLabel { get { return T("ValidationRulesDialogLabel"); } } 
 /// <summary>Field validation</summary> 
 public static string FieldValidationGroupLabel { get { return T("FieldValidationGroupLabel"); } } 
 /// <summary>Form field presentation</summary> 
 public static string FieldPresentationGroupLabel { get { return T("FieldPresentationGroupLabel"); } } 
 /// <summary>Structural presentation</summary> 
 public static string FieldStructureGroupLabel { get { return T("FieldStructureGroupLabel"); } } 
 /// <summary>Widget type</summary> 
 public static string Widget { get { return T("Widget"); } } 
 /// <summary>You can select which type of input widget (like a textbox) to use when editing this field.</summary> 
 public static string WidgetHelp { get { return T("WidgetHelp"); } } 
 /// <summary>Field Widget Configuration</summary> 
 public static string WidgetDialogLabel { get { return T("WidgetDialogLabel"); } } 
 /// <summary>Position</summary> 
 public static string Position { get { return T("Position"); } } 
 /// <summary>Last</summary> 
 public static string PositionLast { get { return T("PositionLast"); } } 
 /// <summary>The position of the field. This controls the order of the fields.</summary> 
 public static string PositionHelp { get { return T("PositionHelp"); } } 
 /// <summary>Tree grouping</summary> 
 public static string GroupByPriority { get { return T("GroupByPriority"); } } 
 /// <summary>(no grouping)...</summary> 
 public static string GroupByPriorityNone { get { return T("GroupByPriorityNone"); } } 
 /// <summary>Group by this field</summary> 
 public static string GroupByPriorityFirst { get { return T("GroupByPriorityFirst"); } } 
 /// <summary>Group as {0}. priority</summary> 
 public static string GroupByPriorityN(string parameter0) { return string.Format(T("GroupByPriorityN"), parameter0); } 
 /// <summary>You can specify that a field should be used to group data - this can improve readability when viewing long lists. Use priority when multiple fields are used for grouping.</summary> 
 public static string GroupByPriorityHelp { get { return T("GroupByPriorityHelp"); } } 
 /// <summary>Tree ordering</summary> 
 public static string TreeOrdering { get { return T("TreeOrdering"); } } 
 /// <summary>(no ordering)...</summary> 
 public static string TreeOrderingNone { get { return T("TreeOrderingNone"); } } 
 /// <summary>Order ascending (A-Z)</summary> 
 public static string TreeOrderingFirstAscending { get { return T("TreeOrderingFirstAscending"); } } 
 /// <summary>Order descending (Z-A)</summary> 
 public static string TreeOrderingFirstDescending { get { return T("TreeOrderingFirstDescending"); } } 
 /// <summary>Order {0}. ascending</summary> 
 public static string TreeOrderingNAscending(string parameter0) { return string.Format(T("TreeOrderingNAscending"), parameter0); } 
 /// <summary>Order {0}. descending</summary> 
 public static string TreeOrderingNDescending(string parameter0) { return string.Format(T("TreeOrderingNDescending"), parameter0); } 
 /// <summary>You can specify that a field should be used to order data in the tree view - this can improve readability when a field is used to position elements on the website.</summary> 
 public static string TreeOrderingHelp { get { return T("TreeOrderingHelp"); } } 
 /// <summary>Is title field</summary> 
 public static string IsTitleField { get { return T("IsTitleField"); } } 
 /// <summary>Check this if you wish this field to be used as the title field. Title fields are used when listing data, like in the tree to the left.</summary> 
 public static string IsTitleFieldHelp { get { return T("IsTitleFieldHelp"); } } 
 /// <summary>Use this as title field in lists</summary> 
 public static string IsTitleFieldLabel { get { return T("IsTitleFieldLabel"); } } 
 /// <summary>Field default value</summary> 
 public static string DefaultValueGroupLabel { get { return T("DefaultValueGroupLabel"); } } 
 /// <summary>Default value</summary> 
 public static string DefaultValue { get { return T("DefaultValue"); } } 
 /// <summary>You can define a default value for this field.</summary> 
 public static string DefaultValueHelp { get { return T("DefaultValueHelp"); } } 
 /// <summary>Field default value configuration</summary> 
 public static string DefaultValueDialogLabel { get { return T("DefaultValueDialogLabel"); } } 
 /// <summary>String maximum length</summary> 
 public static string StringMaximumLength { get { return T("StringMaximumLength"); } } 
 /// <summary>16 character maximum</summary> 
 public static string _16CharMax { get { return T("16CharMax"); } } 
 /// <summary>32 character maximum</summary> 
 public static string _32CharMax { get { return T("32CharMax"); } } 
 /// <summary>64 character maximum</summary> 
 public static string _64CharMax { get { return T("64CharMax"); } } 
 /// <summary>128 character maximum</summary> 
 public static string _128CharMax { get { return T("128CharMax"); } } 
 /// <summary>256 character maximum</summary> 
 public static string _256CharMax { get { return T("256CharMax"); } } 
 /// <summary>512 character maximum</summary> 
 public static string _512CharMax { get { return T("512CharMax"); } } 
 /// <summary>1024 character maximum</summary> 
 public static string _1024CharMax { get { return T("1024CharMax"); } } 
 /// <summary>Unlimited length</summary> 
 public static string Unlimited { get { return T("Unlimited"); } } 
 /// <summary>Decimal number format</summary> 
 public static string DecimalNumberFormat { get { return T("DecimalNumberFormat"); } } 
 /// <summary>1 decimal place</summary> 
 public static string _1DecimalPlace { get { return T("1DecimalPlace"); } } 
 /// <summary>2 decimal place</summary> 
 public static string _2DecimalPlace { get { return T("2DecimalPlace"); } } 
 /// <summary>3 decimal place</summary> 
 public static string _3DecimalPlace { get { return T("3DecimalPlace"); } } 
 /// <summary>4 decimal place</summary> 
 public static string _4DecimalPlace { get { return T("4DecimalPlace"); } } 
 /// <summary>Reference Type</summary> 
 public static string ReferenceType { get { return T("ReferenceType"); } } 
 /// <summary>The specified name is not valid.</summary> 
 public static string FieldNameSyntaxInvalid { get { return T("FieldNameSyntaxInvalid"); } } 
 /// <summary>Can not save... Another Field has the same name. Please change the name.</summary> 
 public static string CannotSave { get { return T("CannotSave"); } } 
 /// <summary>Invalid name. Data field names can not contain spaces. You can write a readable name in the Label field below.</summary> 
 public static string SpaceInNameError { get { return T("SpaceInNameError"); } } 
 /// <summary>Data field names can not be empty. Please specify a name.</summary> 
 public static string NameEmptyError { get { return T("NameEmptyError"); } } 
 /// <summary>Another field uses this name. Data field names must be unique.</summary> 
 public static string NameAlreadyInUseError { get { return T("NameAlreadyInUseError"); } } 
 /// <summary>The selected type can not be optional.</summary> 
 public static string NotAnOptionalTypeError { get { return T("NotAnOptionalTypeError"); } } 
 /// <summary>Remember to specify a widget...</summary> 
 public static string NoWidgetSelected { get { return T("NoWidgetSelected"); } } 
 /// <summary>(no widget specified)</summary> 
 public static string NoWidgetSelectedLabel { get { return T("NoWidgetSelectedLabel"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.FormControl.TypeFieldDesigner", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_PageBrowser {
 /// <summary>Page Source</summary> 
 public static string Menu_ViewSource { get { return T("Menu.ViewSource"); } } 
 /// <summary>Back</summary> 
 public static string ContextMenu_Back { get { return T("ContextMenu.Back"); } } 
 /// <summary>Forward</summary> 
 public static string ContextMenu_Forward { get { return T("ContextMenu.Forward"); } } 
 /// <summary>Refresh</summary> 
 public static string ContextMenu_Refresh { get { return T("ContextMenu.Refresh"); } } 
 /// <summary>View Page Source</summary> 
 public static string ContextMenu_ViewSource { get { return T("ContextMenu.ViewSource"); } } 
 /// <summary>Go back one page</summary> 
 public static string ToolBarButton_Back_ToolTip { get { return T("ToolBarButton.Back.ToolTip"); } } 
 /// <summary>Go forward one page</summary> 
 public static string ToolBarButton_Forward_ToolTip { get { return T("ToolBarButton.Forward.ToolTip"); } } 
 /// <summary>Refresh page</summary> 
 public static string ToolBarButton_Refresh_ToolTip { get { return T("ToolBarButton.Refresh.ToolTip"); } } 
 /// <summary>Go to the address in the location bar</summary> 
 public static string ToolBarButton_Go_ToolTip { get { return T("ToolBarButton.Go.ToolTip"); } } 
 /// <summary>Go to the Start page</summary> 
 public static string ToolBarButton_Home_ToolTip { get { return T("ToolBarButton.Home.ToolTip"); } } 
 /// <summary>Access denied</summary> 
 public static string AddressBar_Invalid_DialogTitle_External { get { return T("AddressBar.Invalid.DialogTitle.External"); } } 
 /// <summary>External URL cannot loaded.</summary> 
 public static string AddressBar_Invalid_DialogText_External { get { return T("AddressBar.Invalid.DialogText.External"); } } 
 /// <summary>Bad URL</summary> 
 public static string AddressBar_Invalid_DialogTitle_BadRequest { get { return T("AddressBar.Invalid.DialogTitle.BadRequest"); } } 
 /// <summary>The URL is invalid and cannot be loaded.</summary> 
 public static string AddressBar_Invalid_DialogText_BadRequest { get { return T("AddressBar.Invalid.DialogText.BadRequest"); } } 
 /// <summary>Not authorized</summary> 
 public static string AddressBar_Invalid_DialogTitle_Unauthorized { get { return T("AddressBar.Invalid.DialogTitle.Unauthorized"); } } 
 /// <summary>You are not authorized to view the page on specified URL.</summary> 
 public static string AddressBar_Invalid_DialogText_Unauthorized { get { return T("AddressBar.Invalid.DialogText.Unauthorized"); } } 
 /// <summary>Page not found</summary> 
 public static string AddressBar_Invalid_DialogTitle_NotFound { get { return T("AddressBar.Invalid.DialogTitle.NotFound"); } } 
 /// <summary>Page not found on the specified URL.</summary> 
 public static string AddressBar_Invalid_DialogText_NotFound { get { return T("AddressBar.Invalid.DialogText.NotFound"); } } 
 /// <summary>Server error</summary> 
 public static string AddressBar_Invalid_DialogTitle_InternalError { get { return T("AddressBar.Invalid.DialogTitle.InternalError"); } } 
 /// <summary>The server has reported an error on the specified URL. The page cannot be loaded.</summary> 
 public static string AddressBar_Invalid_DialogText_InternalError { get { return T("AddressBar.Invalid.DialogText.InternalError"); } } 
 /// <summary>Page not loaded</summary> 
 public static string AddressBar_Invalid_DialogTitle_Default { get { return T("AddressBar.Invalid.DialogTitle.Default"); } } 
 /// <summary>An error prevents the URL from being loaded.</summary> 
 public static string AddressBar_Invalid_DialogText_Default { get { return T("AddressBar.Invalid.DialogText.Default"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.PageBrowser", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_SEOAssistant {
 /// <summary>SEO Assistant</summary> 
 public static string SEOAssistant { get { return T("SEOAssistant"); } } 
 /// <summary>Generate a page preview to compute the SEO indication.</summary> 
 public static string IntroText { get { return T("IntroText"); } } 
 /// <summary>Result</summary> 
 public static string TabResult { get { return T("TabResult"); } } 
 /// <summary>Keywords</summary> 
 public static string TabKeywords { get { return T("TabKeywords"); } } 
 /// <summary>Keywords found in page preview:</summary> 
 public static string ResultHeading { get { return T("ResultHeading"); } } 
 /// <summary>No keywords configured.</summary> 
 public static string NoKeywordsWarning { get { return T("NoKeywordsWarning"); } } 
 /// <summary>Keyword in title</summary> 
 public static string isInTitle { get { return T("isInTitle"); } } 
 /// <summary>Keyword in URL</summary> 
 public static string isInURL { get { return T("isInURL"); } } 
 /// <summary>Keyword in menu title</summary> 
 public static string isInMenuTitle { get { return T("isInMenuTitle"); } } 
 /// <summary>Keyword in description</summary> 
 public static string isInDescription { get { return T("isInDescription"); } } 
 /// <summary>Keyword in heading</summary> 
 public static string isInHeading { get { return T("isInHeading"); } } 
 /// <summary>Keyword in content</summary> 
 public static string isInContent { get { return T("isInContent"); } } 
 /// <summary>No keywords found in page preview</summary> 
 public static string NoKeywords { get { return T("NoKeywords"); } } 
 /// <summary>Failed to analyze the keywords because the markup is not valid</summary> 
 public static string IncorrectHtml { get { return T("IncorrectHtml"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.SEOAssistant", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_SourceEditor {
 /// <summary>Retrieved on SourceEditorBinding startup to make sure strings are loaded :)</summary> 
 public static string Preload_Key { get { return T("Preload.Key"); } } 
 /// <summary>Invalid XHTML</summary> 
 public static string Invalid_HTML_DialogTitle { get { return T("Invalid.HTML.DialogTitle"); } } 
 /// <summary>The root &lt;html&gt; tag is missing.</summary> 
 public static string Invalid_HTML_MissingHtml { get { return T("Invalid.HTML.MissingHtml"); } } 
 /// <summary>The &lt;head&gt; tag is missing.</summary> 
 public static string Invalid_HTML_MissingHead { get { return T("Invalid.HTML.MissingHead"); } } 
 /// <summary>The &lt;body&gt; tag is missing.</summary> 
 public static string Invalid_HTML_MissingBody { get { return T("Invalid.HTML.MissingBody"); } } 
 /// <summary>The &lt;head&gt; tag must precede &lt;body&gt;.</summary> 
 public static string Invalid_HTML_HeadBodyIndex { get { return T("Invalid.HTML.HeadBodyIndex"); } } 
 /// <summary>The root namespace is wrong.</summary> 
 public static string Invalid_HTML_NamespaceURI { get { return T("Invalid.HTML.NamespaceURI"); } } 
 /// <summary>Only one &lt;body&gt; tag allowed.</summary> 
 public static string Invalid_HTML_MultipleBody { get { return T("Invalid.HTML.MultipleBody"); } } 
 /// <summary>Only one &lt;head&gt; tag allowed.</summary> 
 public static string Invalid_HTML_MultipleHead { get { return T("Invalid.HTML.MultipleHead"); } } 
 /// <summary>Source format aborted</summary> 
 public static string Format_XML_ErrorDialog_Title { get { return T("Format.XML.ErrorDialog.Title"); } } 
 /// <summary>XML source formatting requires a well-formed document structure.</summary> 
 public static string Format_XML_ErrorDialog_Text { get { return T("Format.XML.ErrorDialog.Text"); } } 
 /// <summary>Plain Edit</summary> 
 public static string Switch_PlainEdit_Label { get { return T("Switch.PlainEdit.Label"); } } 
 /// <summary>No syntax highlight, faster performance</summary> 
 public static string Switch_PlainEdit_ToolTip { get { return T("Switch.PlainEdit.ToolTip"); } } 
 /// <summary>Colored Edit</summary> 
 public static string Switch_ColoredEdit_Label { get { return T("Switch.ColoredEdit.Label"); } } 
 /// <summary>Syntax highlight, slower performance</summary> 
 public static string Switch_ColoredEdit_ToolTip { get { return T("Switch.ColoredEdit.ToolTip"); } } 
 /// <summary>Insert</summary> 
 public static string Toolbar_Insert_Label { get { return T("Toolbar.Insert.Label"); } } 
 /// <summary>Format</summary> 
 public static string Toolbar_Format_Label { get { return T("Toolbar.Format.Label"); } } 
 /// <summary>Format XML source</summary> 
 public static string Toolbar_Format_ToolTip { get { return T("Toolbar.Format.ToolTip"); } } 
 /// <summary>Page URL</summary> 
 public static string Insert_PageURL_Label { get { return T("Insert.PageURL.Label"); } } 
 /// <summary>Image URL</summary> 
 public static string Insert_ImageURL_Label { get { return T("Insert.ImageURL.Label"); } } 
 /// <summary>Media URL</summary> 
 public static string Insert_MediaURL_Label { get { return T("Insert.MediaURL.Label"); } } 
 /// <summary>Frontend URL</summary> 
 public static string Insert_FrontendURL_Label { get { return T("Insert.FrontendURL.Label"); } } 
 /// <summary>Function Markup</summary> 
 public static string Insert_FunctionMarkup_Label { get { return T("Insert.FunctionMarkup.Label"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.SourceEditor", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_UrlConfiguration {
 /// <summary>URL Configuration</summary> 
 public static string Tree_ConfigurationElementLabel { get { return T("Tree.ConfigurationElementLabel"); } } 
 /// <summary>This section allows configuring shorter and friendlier urls</summary> 
 public static string Tree_ConfigurationElementToolTip { get { return T("Tree.ConfigurationElementToolTip"); } } 
 /// <summary>Edit URL Configuration</summary> 
 public static string Tree_ConfigurationElementEditLabel { get { return T("Tree.ConfigurationElementEditLabel"); } } 
 /// <summary>Edit URL Configuration</summary> 
 public static string Tree_ConfigurationElementEditToolTip { get { return T("Tree.ConfigurationElementEditToolTip"); } } 
 /// <summary>Hostnames</summary> 
 public static string Tree_HostnamesFolderLabel { get { return T("Tree.HostnamesFolderLabel"); } } 
 /// <summary>Here you can map a hostname to a site</summary> 
 public static string Tree_HostnamesFolderToolTip { get { return T("Tree.HostnamesFolderToolTip"); } } 
 /// <summary>Add Hostname</summary> 
 public static string Tree_AddHostnameLabel { get { return T("Tree.AddHostnameLabel"); } } 
 /// <summary>Add a new hostname mapping</summary> 
 public static string Tree_AddHostnameToolTip { get { return T("Tree.AddHostnameToolTip"); } } 
 /// <summary>Edit Hostname</summary> 
 public static string Tree_EditHostnameLabel { get { return T("Tree.EditHostnameLabel"); } } 
 /// <summary>Edit this hostname mapping</summary> 
 public static string Tree_EditHostnameToolTip { get { return T("Tree.EditHostnameToolTip"); } } 
 /// <summary>Delete Hostname</summary> 
 public static string Tree_DeleteHostnameLabel { get { return T("Tree.DeleteHostnameLabel"); } } 
 /// <summary>Delete this hostname mapping</summary> 
 public static string Tree_DeleteHostnameToolTip { get { return T("Tree.DeleteHostnameToolTip"); } } 
 /// <summary>UrlConfiguration</summary> 
 public static string Tree_UrlConfigurationLabel { get { return T("Tree.UrlConfigurationLabel"); } } 
 /// <summary>URL Configuration</summary> 
 public static string UrlConfiguration_Title { get { return T("UrlConfiguration.Title"); } } 
 /// <summary>Page URL Suffix</summary> 
 public static string UrlConfiguration_PageUrlSuffix_Label { get { return T("UrlConfiguration.PageUrlSuffix.Label"); } } 
 /// <summary>A string that will be appended to all page urls. F.e. &apos;.aspx&apos; or &apos;.html&apos;, leaving this field empty will produce extensionless urls</summary> 
 public static string UrlConfiguration_PageUrlSuffix_Help { get { return T("UrlConfiguration.PageUrlSuffix.Help"); } } 
 /// <summary>New Hostname</summary> 
 public static string HostnameBinding_AddNewHostnameTitle { get { return T("HostnameBinding.AddNewHostnameTitle"); } } 
 /// <summary>Hostname</summary> 
 public static string HostnameBinding_Hostname_Label { get { return T("HostnameBinding.Hostname.Label"); } } 
 /// <summary>Hostname to which current url building rules will be applied</summary> 
 public static string HostnameBinding_Hostname_Help { get { return T("HostnameBinding.Hostname.Help"); } } 
 /// <summary>Page</summary> 
 public static string HostnameBinding_Page_Label { get { return T("HostnameBinding.Page.Label"); } } 
 /// <summary>Root page that will be the default page for the current hostname</summary> 
 public static string HostnameBinding_Page_Help { get { return T("HostnameBinding.Page.Help"); } } 
 /// <summary>URL</summary> 
 public static string HostnameBinding_IncludeHomepageUrlTitle_Label { get { return T("HostnameBinding.IncludeHomepageUrlTitle.Label"); } } 
 /// <summary>Include homepage URL Title</summary> 
 public static string HostnameBinding_IncludeHomepageUrlTitle_ItemLabel { get { return T("HostnameBinding.IncludeHomepageUrlTitle.ItemLabel"); } } 
 /// <summary>Determines whether root page&apos;s title should be a part of url. Not having it checked produces shorter urls</summary> 
 public static string HostnameBinding_IncludeHomepageUrlTitle_Help { get { return T("HostnameBinding.IncludeHomepageUrlTitle.Help"); } } 
 /// <summary>Include language URL mapping</summary> 
 public static string HostnameBinding_IncludeLanguageUrlMapping_ItemLabel { get { return T("HostnameBinding.IncludeLanguageUrlMapping.ItemLabel"); } } 
 /// <summary>Determines whether language code should be a part of a url</summary> 
 public static string HostnameBinding_IncludeLanguageUrlMapping_Help { get { return T("HostnameBinding.IncludeLanguageUrlMapping.Help"); } } 
 /// <summary>Custom 404 Page</summary> 
 public static string HostnameBinding_Custom404Page_Label { get { return T("HostnameBinding.Custom404Page.Label"); } } 
 /// <summary>Url to which request will be redirected in the case there&apos;s a request to non-existent c1 page</summary> 
 public static string HostnameBinding_Custom404Page_Help { get { return T("HostnameBinding.Custom404Page.Help"); } } 
 /// <summary>Alias hostnames</summary> 
 public static string HostnameBinding_Aliases_Label { get { return T("HostnameBinding.Aliases.Label"); } } 
 /// <summary>Hostnames from which all requests will be redirected to the current hostname</summary> 
 public static string HostnameBinding_Aliases_Help { get { return T("HostnameBinding.Aliases.Help"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.UrlConfiguration", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_VisualEditor {
 /// <summary>Retrieved on VisualEditorBinding startup to make sure strings are loaded :)</summary> 
 public static string Preload_Key { get { return T("Preload.Key"); } } 
 /// <summary>Strong text</summary> 
 public static string ToolBar_ToolTipStrong { get { return T("ToolBar.ToolTipStrong"); } } 
 /// <summary>Emphasize text</summary> 
 public static string ToolBar_ToolTipEmphasize { get { return T("ToolBar.ToolTipEmphasize"); } } 
 /// <summary>Underline text</summary> 
 public static string ToolBar_ToolTipUnderline { get { return T("ToolBar.ToolTipUnderline"); } } 
 /// <summary>Strike text</summary> 
 public static string ToolBar_ToolTipStrike { get { return T("ToolBar.ToolTipStrike"); } } 
 /// <summary>Align left</summary> 
 public static string ToolBar_ToolTipAlignLeft { get { return T("ToolBar.ToolTipAlignLeft"); } } 
 /// <summary>Align right</summary> 
 public static string ToolBar_ToolTipAlignRight { get { return T("ToolBar.ToolTipAlignRight"); } } 
 /// <summary>Justify left</summary> 
 public static string ToolBar_ToolTipJustifyLeft { get { return T("ToolBar.ToolTipJustifyLeft"); } } 
 /// <summary>Justify right</summary> 
 public static string ToolBar_ToolTipJustifyRight { get { return T("ToolBar.ToolTipJustifyRight"); } } 
 /// <summary>Justify center</summary> 
 public static string ToolBar_ToolTipJustifyCenter { get { return T("ToolBar.ToolTipJustifyCenter"); } } 
 /// <summary>Justify full</summary> 
 public static string ToolBar_ToolTipJustifyFull { get { return T("ToolBar.ToolTipJustifyFull"); } } 
 /// <summary>Unordered list</summary> 
 public static string ToolBar_ToolTipUnorderedList { get { return T("ToolBar.ToolTipUnorderedList"); } } 
 /// <summary>Ordered list</summary> 
 public static string ToolBar_ToolTipOrderedList { get { return T("ToolBar.ToolTipOrderedList"); } } 
 /// <summary>Link</summary> 
 public static string ToolBar_ToolTipLink { get { return T("ToolBar.ToolTipLink"); } } 
 /// <summary>Delete link</summary> 
 public static string ToolBar_ToolTipDeleteLink { get { return T("ToolBar.ToolTipDeleteLink"); } } 
 /// <summary>Cleanup messy code</summary> 
 public static string ToolBar_ToolTipCleanup { get { return T("ToolBar.ToolTipCleanup"); } } 
 /// <summary>Undo</summary> 
 public static string ToolBar_ToolTipUndo { get { return T("ToolBar.ToolTipUndo"); } } 
 /// <summary>Redo</summary> 
 public static string ToolBar_ToolTipRedo { get { return T("ToolBar.ToolTipRedo"); } } 
 /// <summary>Source</summary> 
 public static string ToolBar_LabelSource { get { return T("ToolBar.LabelSource"); } } 
 /// <summary>Visual</summary> 
 public static string ToolBar_LabelWysiwyg { get { return T("ToolBar.LabelWysiwyg"); } } 
 /// <summary>Paragraph</summary> 
 public static string FormatSelector_LabelParagraph { get { return T("FormatSelector.LabelParagraph"); } } 
 /// <summary>Address</summary> 
 public static string FormatSelector_LabelAddress { get { return T("FormatSelector.LabelAddress"); } } 
 /// <summary>Blockquote</summary> 
 public static string FormatSelector_LabelBlockQuote { get { return T("FormatSelector.LabelBlockQuote"); } } 
 /// <summary>Division</summary> 
 public static string FormatSelector_LabelDivision { get { return T("FormatSelector.LabelDivision"); } } 
 /// <summary>Heading 1</summary> 
 public static string FormatSelector_LabelHeading1 { get { return T("FormatSelector.LabelHeading1"); } } 
 /// <summary>Heading 2</summary> 
 public static string FormatSelector_LabelHeading2 { get { return T("FormatSelector.LabelHeading2"); } } 
 /// <summary>Heading 3</summary> 
 public static string FormatSelector_LabelHeading3 { get { return T("FormatSelector.LabelHeading3"); } } 
 /// <summary>Heading 4</summary> 
 public static string FormatSelector_LabelHeading4 { get { return T("FormatSelector.LabelHeading4"); } } 
 /// <summary>Heading 5</summary> 
 public static string FormatSelector_LabelHeading5 { get { return T("FormatSelector.LabelHeading5"); } } 
 /// <summary>Heading 6</summary> 
 public static string FormatSelector_LabelHeading6 { get { return T("FormatSelector.LabelHeading6"); } } 
 /// <summary>(None)</summary> 
 public static string ClassSelector_LabelNone { get { return T("ClassSelector.LabelNone"); } } 
 /// <summary>Insert</summary> 
 public static string ContextMenu_LabelInsert { get { return T("ContextMenu.LabelInsert"); } } 
 /// <summary>Paste</summary> 
 public static string ContextMenu_LabelPaste { get { return T("ContextMenu.LabelPaste"); } } 
 /// <summary>Link</summary> 
 public static string ContextMenu_LabelLink { get { return T("ContextMenu.LabelLink"); } } 
 /// <summary>Unlink</summary> 
 public static string ContextMenu_LabelUnLink { get { return T("ContextMenu.LabelUnLink"); } } 
 /// <summary>Link Properties</summary> 
 public static string ContextMenu_LabelLinkProperties { get { return T("ContextMenu.LabelLinkProperties"); } } 
 /// <summary>Table…</summary> 
 public static string ContextMenu_LabelTable { get { return T("ContextMenu.LabelTable"); } } 
 /// <summary>Manage Table</summary> 
 public static string ContextMenu_LabelTableManage { get { return T("ContextMenu.LabelTableManage"); } } 
 /// <summary>Image…</summary> 
 public static string ContextMenu_LabelImage { get { return T("ContextMenu.LabelImage"); } } 
 /// <summary>As Simple Text…</summary> 
 public static string ContextMenu_LabelAsText { get { return T("ContextMenu.LabelAsText"); } } 
 /// <summary>Field</summary> 
 public static string ContextMenu_LabelField { get { return T("ContextMenu.LabelField"); } } 
 /// <summary>Delete Field</summary> 
 public static string ContextMenu_LabelFieldDelete { get { return T("ContextMenu.LabelFieldDelete"); } } 
 /// <summary>Function…</summary> 
 public static string ContextMenu_LabelRendering { get { return T("ContextMenu.LabelRendering"); } } 
 /// <summary>Character…</summary> 
 public static string ContextMenu_LabelCharacter { get { return T("ContextMenu.LabelCharacter"); } } 
 /// <summary>Image Properties…</summary> 
 public static string ContextMenu_LabelImageProperties { get { return T("ContextMenu.LabelImageProperties"); } } 
 /// <summary>Function Properties…</summary> 
 public static string ContextMenu_LabelRenderingProperties { get { return T("ContextMenu.LabelRenderingProperties"); } } 
 /// <summary>Cut Row</summary> 
 public static string ContextMenu_LabelCutRow { get { return T("ContextMenu.LabelCutRow"); } } 
 /// <summary>Copy Row</summary> 
 public static string ContextMenu_LabelCopyRow { get { return T("ContextMenu.LabelCopyRow"); } } 
 /// <summary>Paste Row</summary> 
 public static string ContextMenu_LabelPasteRow { get { return T("ContextMenu.LabelPasteRow"); } } 
 /// <summary>Before</summary> 
 public static string ContextMenu_LabelBefore { get { return T("ContextMenu.LabelBefore"); } } 
 /// <summary>After</summary> 
 public static string ContextMenu_LabelAfter { get { return T("ContextMenu.LabelAfter"); } } 
 /// <summary>Table Properties</summary> 
 public static string ContextMenu_LabelTableProperties { get { return T("ContextMenu.LabelTableProperties"); } } 
 /// <summary>Cell Properties</summary> 
 public static string ContextMenu_LabelCellProperties { get { return T("ContextMenu.LabelCellProperties"); } } 
 /// <summary>Row Properties</summary> 
 public static string ContextMenu_LabelRowProperties { get { return T("ContextMenu.LabelRowProperties"); } } 
 /// <summary>Insert Row</summary> 
 public static string ContextMenu_LabelInsertRow { get { return T("ContextMenu.LabelInsertRow"); } } 
 /// <summary>Delete Row</summary> 
 public static string ContextMenu_LabelDeleteRow { get { return T("ContextMenu.LabelDeleteRow"); } } 
 /// <summary>Insert Column</summary> 
 public static string ContextMenu_LabelInsertcolumn { get { return T("ContextMenu.LabelInsertcolumn"); } } 
 /// <summary>Delete Column</summary> 
 public static string ContextMenu_LabelDeleteColumn { get { return T("ContextMenu.LabelDeleteColumn"); } } 
 /// <summary>Merge Table Cells</summary> 
 public static string ContextMenu_LabelMergeTableCells { get { return T("ContextMenu.LabelMergeTableCells"); } } 
 /// <summary>Split Merged Cells</summary> 
 public static string ContextMenu_LabelSplitMergedCells { get { return T("ContextMenu.LabelSplitMergedCells"); } } 
 /// <summary>Delete Table</summary> 
 public static string ContextMenu_LabelDeleteTable { get { return T("ContextMenu.LabelDeleteTable"); } } 
 /// <summary>Align Image</summary> 
 public static string ContextMenu_LabelAlignImage { get { return T("ContextMenu.LabelAlignImage"); } } 
 /// <summary>Right</summary> 
 public static string ContextMenu_LabelAlignImageRight { get { return T("ContextMenu.LabelAlignImageRight"); } } 
 /// <summary>Left</summary> 
 public static string ContextMenu_LabelAlignImageLeft { get { return T("ContextMenu.LabelAlignImageLeft"); } } 
 /// <summary>None</summary> 
 public static string ContextMenu_LabelAlignImageNone { get { return T("ContextMenu.LabelAlignImageNone"); } } 
 /// <summary>Source code error</summary> 
 public static string ContentError_DialogTitle { get { return T("ContentError.DialogTitle"); } } 
 /// <summary>Error in source code:</summary> 
 public static string ContentError_DialogText { get { return T("ContentError.DialogText"); } } 
 /// <summary>No placeholders in template.</summary> 
 public static string TemplateTree_NoTemplateWarning { get { return T("TemplateTree.NoTemplateWarning"); } } 
 /// <summary>Basic</summary> 
 public static string LabelTabBasic { get { return T("LabelTabBasic"); } } 
 /// <summary>Advanced</summary> 
 public static string LabelTabAdvanced { get { return T("LabelTabAdvanced"); } } 
 /// <summary>Presentation</summary> 
 public static string LabelPresentation { get { return T("LabelPresentation"); } } 
 /// <summary>Class</summary> 
 public static string LabelClass { get { return T("LabelClass"); } } 
 /// <summary>The class attribute specifies a CSS classname for an element.</summary> 
 public static string HelpClass { get { return T("HelpClass"); } } 
 /// <summary>ID</summary> 
 public static string LabelId { get { return T("LabelId"); } } 
 /// <summary>The id attribute can be used by JavaScript or CSS to make changes to an element.</summary> 
 public static string HelpId { get { return T("HelpId"); } } 
 /// <summary>Clipboard disabled</summary> 
 public static string MozSecurityNote_LabelSecurityStuff { get { return T("MozSecurityNote.LabelSecurityStuff"); } } 
 /// <summary>For security reasons, access to the clipboard was blocked by your browser. Please use standard keyboard shortcuts. For a technical description of, how to configure your browser for use with Composite C1, press the &quot;More Info&quot; button.</summary> 
 public static string MozSecurityNote_TextSecurityStuff { get { return T("MozSecurityNote.TextSecurityStuff"); } } 
 /// <summary>Insert Link</summary> 
 public static string Link_LabelInsertLink { get { return T("Link.LabelInsertLink"); } } 
 /// <summary>Link Properties</summary> 
 public static string Link_LabelLinkProperties { get { return T("Link.LabelLinkProperties"); } } 
 /// <summary>URL</summary> 
 public static string Link_LinkDestination { get { return T("Link.LinkDestination"); } } 
 /// <summary>Role</summary> 
 public static string Link_LinkRole { get { return T("Link.LinkRole"); } } 
 /// <summary>Title</summary> 
 public static string Link_TitleText { get { return T("Link.TitleText"); } } 
 /// <summary>Target</summary> 
 public static string Link_LinkTarget { get { return T("Link.LinkTarget"); } } 
 /// <summary>Open in new window</summary> 
 public static string Link_LinkTarget_LabelCheckBox { get { return T("Link.LinkTarget.LabelCheckBox"); } } 
 /// <summary>The title text is rendered as a tooltip when the mouse hovers over the link. This can be used to let your customers know where the link is going without disturbing the flow of your text.</summary> 
 public static string Link_TitleTextToolTip { get { return T("Link.TitleTextToolTip"); } } 
 /// <summary>Link properties</summary> 
 public static string Link_LabelLink { get { return T("Link.LabelLink"); } } 
 /// <summary>Cell type</summary> 
 public static string Tables_Cell_CellType { get { return T("Tables.Cell.CellType"); } } 
 /// <summary>Cell width</summary> 
 public static string Tables_Cell_LabelWidth { get { return T("Tables.Cell.LabelWidth"); } } 
 /// <summary>Horizontal alignment</summary> 
 public static string Tables_Cell_HorizontalAlignment { get { return T("Tables.Cell.HorizontalAlignment"); } } 
 /// <summary>Vertical alignment</summary> 
 public static string Tables_Cell_VerticalAlignment { get { return T("Tables.Cell.VerticalAlignment"); } } 
 /// <summary>Apply changes to</summary> 
 public static string Tables_Cell_ApplyTo { get { return T("Tables.Cell.ApplyTo"); } } 
 /// <summary>Cell Properties</summary> 
 public static string Tables_Cell_LabelCellProperties { get { return T("Tables.Cell.LabelCellProperties"); } } 
 /// <summary>Layout</summary> 
 public static string Tables_Cell_LabelLayout { get { return T("Tables.Cell.LabelLayout"); } } 
 /// <summary>Data Cell</summary> 
 public static string Tables_Cell_LabelDataCell { get { return T("Tables.Cell.LabelDataCell"); } } 
 /// <summary>Header Cell</summary> 
 public static string Tables_Cell_LabelHeaderCell { get { return T("Tables.Cell.LabelHeaderCell"); } } 
 /// <summary>Left</summary> 
 public static string Tables_Cell_LabelLeft { get { return T("Tables.Cell.LabelLeft"); } } 
 /// <summary>Right</summary> 
 public static string Tables_Cell_LabelRight { get { return T("Tables.Cell.LabelRight"); } } 
 /// <summary>Top</summary> 
 public static string Tables_Cell_LabelTop { get { return T("Tables.Cell.LabelTop"); } } 
 /// <summary>Center</summary> 
 public static string Tables_Cell_LabelCenter { get { return T("Tables.Cell.LabelCenter"); } } 
 /// <summary>Bottom</summary> 
 public static string Tables_Cell_LabelBottom { get { return T("Tables.Cell.LabelBottom"); } } 
 /// <summary>Scope</summary> 
 public static string Tables_Cell_LabelScope { get { return T("Tables.Cell.LabelScope"); } } 
 /// <summary>Current cell</summary> 
 public static string Tables_Cell_LabelCurrentCell { get { return T("Tables.Cell.LabelCurrentCell"); } } 
 /// <summary>All cells in row</summary> 
 public static string Tables_Cell_LabelAllRowCells { get { return T("Tables.Cell.LabelAllRowCells"); } } 
 /// <summary>All cells in table</summary> 
 public static string Tables_Cell_LabelAllTableCells { get { return T("Tables.Cell.LabelAllTableCells"); } } 
 /// <summary>Columns</summary> 
 public static string Tables_Merge_Columns { get { return T("Tables.Merge.Columns"); } } 
 /// <summary>Rows</summary> 
 public static string Tables_Merge_Rows { get { return T("Tables.Merge.Rows"); } } 
 /// <summary>Merge Table Cells</summary> 
 public static string Tables_Merge_LabelMergeCells { get { return T("Tables.Merge.LabelMergeCells"); } } 
 /// <summary>Row in table part</summary> 
 public static string Tables_Row_Rows { get { return T("Tables.Row.Rows"); } } 
 /// <summary>Horizontal Alignment</summary> 
 public static string Tables_Row_HorizontalAlignment { get { return T("Tables.Row.HorizontalAlignment"); } } 
 /// <summary>Vertical Alignment</summary> 
 public static string Tables_Row_VerticalAlignment { get { return T("Tables.Row.VerticalAlignment"); } } 
 /// <summary>Apply changes to</summary> 
 public static string Tables_Row_ApplyTo { get { return T("Tables.Row.ApplyTo"); } } 
 /// <summary>Row Properties</summary> 
 public static string Tables_Row_LabelRowProperties { get { return T("Tables.Row.LabelRowProperties"); } } 
 /// <summary>Layout</summary> 
 public static string Tables_Row_LabelLayout { get { return T("Tables.Row.LabelLayout"); } } 
 /// <summary>Table Head</summary> 
 public static string Tables_Row_LabelTableHead { get { return T("Tables.Row.LabelTableHead"); } } 
 /// <summary>Table Body</summary> 
 public static string Tables_Row_LabelTableBody { get { return T("Tables.Row.LabelTableBody"); } } 
 /// <summary>Table Foot</summary> 
 public static string Tables_Row_LabelTableFoot { get { return T("Tables.Row.LabelTableFoot"); } } 
 /// <summary>Left</summary> 
 public static string Tables_Row_LabelLeft { get { return T("Tables.Row.LabelLeft"); } } 
 /// <summary>Center</summary> 
 public static string Tables_Row_LabelCenter { get { return T("Tables.Row.LabelCenter"); } } 
 /// <summary>Right</summary> 
 public static string Tables_Row_LabelRight { get { return T("Tables.Row.LabelRight"); } } 
 /// <summary>Top</summary> 
 public static string Tables_Row_LabelTop { get { return T("Tables.Row.LabelTop"); } } 
 /// <summary>Bottom</summary> 
 public static string Tables_Row_LabelBottom { get { return T("Tables.Row.LabelBottom"); } } 
 /// <summary>Scope</summary> 
 public static string Tables_Row_LabelScope { get { return T("Tables.Row.LabelScope"); } } 
 /// <summary>Current row</summary> 
 public static string Tables_Row_LabelCurrentRow { get { return T("Tables.Row.LabelCurrentRow"); } } 
 /// <summary>Odd rows in table</summary> 
 public static string Tables_Row_LabelOddRows { get { return T("Tables.Row.LabelOddRows"); } } 
 /// <summary>Even rows in table</summary> 
 public static string Tables_Row_LabelEvenRows { get { return T("Tables.Row.LabelEvenRows"); } } 
 /// <summary>All rows in table</summary> 
 public static string Tables_Row_LabelAllRows { get { return T("Tables.Row.LabelAllRows"); } } 
 /// <summary>Insert Table</summary> 
 public static string Tables_Table_TitleInsert { get { return T("Tables.Table.TitleInsert"); } } 
 /// <summary>Table Properties</summary> 
 public static string Tables_Table_TitleUpdate { get { return T("Tables.Table.TitleUpdate"); } } 
 /// <summary>Columns</summary> 
 public static string Tables_Table_Columns { get { return T("Tables.Table.Columns"); } } 
 /// <summary>Rows</summary> 
 public static string Tables_Table_Rows { get { return T("Tables.Table.Rows"); } } 
 /// <summary>Summary</summary> 
 public static string Tables_Table_Summary { get { return T("Tables.Table.Summary"); } } 
 /// <summary>The summary explains the table content and structure so that people using non-visual browsers (such as blind people) may better understand it. This is especially important for tables without captions.</summary> 
 public static string Tables_Table_SummaryHelp { get { return T("Tables.Table.SummaryHelp"); } } 
 /// <summary>Table layout</summary> 
 public static string Tables_Table_LabelLayout { get { return T("Tables.Table.LabelLayout"); } } 
 /// <summary>Table description</summary> 
 public static string Tables_Table_LabelMeta { get { return T("Tables.Table.LabelMeta"); } } 
 /// <summary>Source</summary> 
 public static string Image_Source { get { return T("Image.Source"); } } 
 /// <summary>Alternate text</summary> 
 public static string Image_AlternativeText { get { return T("Image.AlternativeText"); } } 
 /// <summary>The alternate text is displayed as visible text in browsers where images cannot be rendered normally. This may be the case for mobile phone browsers and special browsers for the visually impaired. The alt attribute should clearly describe the content of the image.</summary> 
 public static string Image_AlternativeTextToolTip { get { return T("Image.AlternativeTextToolTip"); } } 
 /// <summary>Title text</summary> 
 public static string Image_TitleText { get { return T("Image.TitleText"); } } 
 /// <summary>The title text is rendered as a tooltip when the mouse hovers over the image. An image that might be confusing for the viewer can be instantly clarified by a title.</summary> 
 public static string Image_TitleTextToolTip { get { return T("Image.TitleTextToolTip"); } } 
 /// <summary>Image properties</summary> 
 public static string Image_LabelImage { get { return T("Image.LabelImage"); } } 
 /// <summary>Insert Image</summary> 
 public static string Image_LabelInsertImage { get { return T("Image.LabelInsertImage"); } } 
 /// <summary>Image Properties</summary> 
 public static string Image_LabelImageProperties { get { return T("Image.LabelImageProperties"); } } 
 /// <summary>Maximum Width</summary> 
 public static string Image_MaxWidth { get { return T("Image.MaxWidth"); } } 
 /// <summary>If the width of the image is bigger that the specified value, it will be downsized to the specified value.</summary> 
 public static string Image_MaxWidthToolTip { get { return T("Image.MaxWidthToolTip"); } } 
 /// <summary>Maximum Height</summary> 
 public static string Image_MaxHeight { get { return T("Image.MaxHeight"); } } 
 /// <summary>If the height of the image is bigger that the specified value, it will be downsized to the specified value.</summary> 
 public static string Image_MaxHeightToolTip { get { return T("Image.MaxHeightToolTip"); } } 
 /// <summary>Select Character</summary> 
 public static string CharMap_LabelSelectSpecialChar { get { return T("CharMap.LabelSelectSpecialChar"); } } 
 /// <summary>General</summary> 
 public static string CharMap_LabelGeneral { get { return T("CharMap.LabelGeneral"); } } 
 /// <summary>Alphabetical</summary> 
 public static string CharMap_LabelAlphabetical { get { return T("CharMap.LabelAlphabetical"); } } 
 /// <summary>Math &amp; Symbols</summary> 
 public static string CharMap_LabelMathSymbols { get { return T("CharMap.LabelMathSymbols"); } } 
 /// <summary>Common</summary> 
 public static string CharMap_LabelCommon { get { return T("CharMap.LabelCommon"); } } 
 /// <summary>Quotation</summary> 
 public static string CharMap_LabelQuotation { get { return T("CharMap.LabelQuotation"); } } 
 /// <summary>Currency</summary> 
 public static string CharMap_LabelCurrency { get { return T("CharMap.LabelCurrency"); } } 
 /// <summary>Latin</summary> 
 public static string CharMap_LabelLatin { get { return T("CharMap.LabelLatin"); } } 
 /// <summary>Greek</summary> 
 public static string CharMap_LabelGreek { get { return T("CharMap.LabelGreek"); } } 
 /// <summary>Math and Logic</summary> 
 public static string CharMap_LabelMathAndLogic { get { return T("CharMap.LabelMathAndLogic"); } } 
 /// <summary>Symbols</summary> 
 public static string CharMap_LabelSymbols { get { return T("CharMap.LabelSymbols"); } } 
 /// <summary>Arrows</summary> 
 public static string CharMap_LabelArrows { get { return T("CharMap.LabelArrows"); } } 
 /// <summary>Paste as Text</summary> 
 public static string TextPaste_Label { get { return T("TextPaste.Label"); } } 
 /// <summary>Paste content here. Then press OK.</summary> 
 public static string TextPaste_PasteHereContent { get { return T("TextPaste.PasteHereContent"); } } 
 /// <summary>How to spell check ...</summary> 
 public static string SpellCheck_InfoLabel { get { return T("SpellCheck.InfoLabel"); } } 
 /// <summary>How to spell check in the Visual Editor</summary> 
 public static string SpellCheck_InfoCaption { get { return T("SpellCheck.InfoCaption"); } } 
 /// <summary>To get suggestions for a misspelled word, press your SHIFT key down when you invoke the context menu.</summary> 
 public static string SpellCheck_InfoText { get { return T("SpellCheck.InfoText"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.VisualEditor", key);
        }
} 

	}
}


