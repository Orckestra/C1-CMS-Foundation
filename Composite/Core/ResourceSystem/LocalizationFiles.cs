
 
 
 
 

 
 
 
 
 
 


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
	public static class LocalizationFiles
	{
		
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_C1Console_SecurityViolation {
 /// <summary>&quot;Security violation&quot;</summary> 
 public static string LayoutLabel { get { return T("LayoutLabel"); } } 
 /// <summary>&quot;Not allowed&quot;</summary> 
 public static string Title { get { return T("Title"); } } 
 /// <summary>&quot;You do not have permission to execute the action. Contact your administrator for more information.&quot;</summary> 
 public static string Description { get { return T("Description"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.C1Console.SecurityViolation", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_C1Console_Trees {
 /// <summary>&quot;Error in tree&quot;</summary> 
 public static string KeyFacade_ErrorTreeNode_Label { get { return T("KeyFacade.ErrorTreeNode.Label"); } } 
 /// <summary>&quot;Show Message&quot;</summary> 
 public static string KeyFacade_ErrorTreeNode_ShowMessage_Label { get { return T("KeyFacade.ErrorTreeNode.ShowMessage.Label"); } } 
 /// <summary>&quot;Show Error Message&quot;</summary> 
 public static string KeyFacade_ErrorTreeNode_ShowMessage_ToolTip { get { return T("KeyFacade.ErrorTreeNode.ShowMessage.ToolTip"); } } 
 /// <summary>&quot;Error message&quot;</summary> 
 public static string KeyFacade_ErrorTreeNode_ShowMessage_Title { get { return T("KeyFacade.ErrorTreeNode.ShowMessage.Title"); } } 
 /// <summary>&quot;Unknown exception happened: &apos;{0}&apos;&quot;</summary> 
 public static string TreeValidationError_Common_UnknownException(object parameter0) { return string.Format(T("TreeValidationError.Common.UnknownException"), parameter0); } 
 /// <summary>&quot;Unknown element &apos;{0}&apos;&quot;</summary> 
 public static string TreeValidationError_Common_UnknownElement(object parameter0) { return string.Format(T("TreeValidationError.Common.UnknownElement"), parameter0); } 
 /// <summary>&quot;The required attribute &apos;{0}&apos; is missing&quot;</summary> 
 public static string TreeValidationError_Common_MissingAttribute(object parameter0) { return string.Format(T("TreeValidationError.Common.MissingAttribute"), parameter0); } 
 /// <summary>&quot;The attribute &apos;{0}&apos; has a value that is not allowed&quot;</summary> 
 public static string TreeValidationError_Common_WrongAttributeValue(object parameter0) { return string.Format(T("TreeValidationError.Common.WrongAttributeValue"), parameter0); } 
 /// <summary>&quot;The type &apos;{0}&apos; does not contain a property named &apos;{1}&apos;&quot;</summary> 
 public static string TreeValidationError_Common_MissingProperty(object parameter0,object parameter1) { return string.Format(T("TreeValidationError.Common.MissingProperty"), parameter0,parameter1); } 
 /// <summary>&quot;The type &apos;{0}&apos; could not be found&quot;</summary> 
 public static string TreeValidationError_Common_UnknownInterfaceType(object parameter0) { return string.Format(T("TreeValidationError.Common.UnknownInterfaceType"), parameter0); } 
 /// <summary>&quot;The type &apos;{0}&apos; does not implement the interface &apos;{1}&apos;&quot;</summary> 
 public static string TreeValidationError_Common_NotImplementingIData(object parameter0,object parameter1) { return string.Format(T("TreeValidationError.Common.NotImplementingIData"), parameter0,parameter1); } 
 /// <summary>&quot;The value &apos;{0}&apos; is not allowed as a permission type value&quot;</summary> 
 public static string TreeValidationError_Common_WrongPermissionValue(object parameter0) { return string.Format(T("TreeValidationError.Common.WrongPermissionValue"), parameter0); } 
 /// <summary>&quot;The value &apos;{0}&apos; is not allowed as a location value&quot;</summary> 
 public static string TreeValidationError_Common_WrongLocationValue(object parameter0) { return string.Format(T("TreeValidationError.Common.WrongLocationValue"), parameter0); } 
 /// <summary>&quot;No function markup provided as a child element&quot;</summary> 
 public static string TreeValidationError_Common_MissingFunctionMarkup { get { return T("TreeValidationError.Common.MissingFunctionMarkup"); } } 
 /// <summary>&quot;The function could not be created for the provided function markup&quot;</summary> 
 public static string TreeValidationError_Common_WrongFunctionMarkup { get { return T("TreeValidationError.Common.WrongFunctionMarkup"); } } 
 /// <summary>&quot;Missing root element in tree markup&quot;</summary> 
 public static string TreeValidationError_Markup_NoRootElement { get { return T("TreeValidationError.Markup.NoRootElement"); } } 
 /// <summary>&quot;Syntax error: {0} at line {1} position {2}&quot;</summary> 
 public static string TreeValidationError_Markup_SchemaError(object parameter0,object parameter1,object parameter2) { return string.Format(T("TreeValidationError.Markup.SchemaError"), parameter0,parameter1,parameter2); } 
 /// <summary>&quot;The attachment point &apos;{0}&apos; is unknown&quot;</summary> 
 public static string TreeValidationError_AutoAttachments_UnknownAttachmentPoint(object parameter0) { return string.Format(T("TreeValidationError.AutoAttachments.UnknownAttachmentPoint"), parameter0); } 
 /// <summary>&quot;The attachment position &apos;{0}&apos; is unknown&quot;</summary> 
 public static string TreeValidationError_AutoAttachments_UnknownAttachmentPosition(object parameter0) { return string.Format(T("TreeValidationError.AutoAttachments.UnknownAttachmentPosition"), parameter0); } 
 /// <summary>&quot;No elements are allowed in trees that are used with data attached trees&quot;</summary> 
 public static string TreeValidationError_DataAttachments_NoElementsAllowed { get { return T("TreeValidationError.DataAttachments.NoElementsAllowed"); } } 
 /// <summary>&quot;ShareRootElementById is only allowed if the tree has a single named attachment point&quot;</summary> 
 public static string TreeValidationError_ElementRoot_ShareRootElementByIdNotAllowed { get { return T("TreeValidationError.ElementRoot.ShareRootElementByIdNotAllowed"); } } 
 /// <summary>&quot;The value of the Id is not allowed. The Id should be non-empty, not start with NodeAutoId_ and not be RootTreeNode&quot;</summary> 
 public static string TreeValidationError_SimpleElement_WrongIdValue { get { return T("TreeValidationError.SimpleElement.WrongIdValue"); } } 
 /// <summary>&quot;The id value &apos;{0}&apos; has already been used in this tree&quot;</summary> 
 public static string TreeValidationError_SimpleElement_AlreadyUsedId(object parameter0) { return string.Format(T("TreeValidationError.SimpleElement.AlreadyUsedId"), parameter0); } 
 /// <summary>&quot;The data interface &apos;{0}&apos; is used more than once as a child under the same parent element and this is not allowed&quot;</summary> 
 public static string TreeValidationError_DataElementsTreeNode_SameInterfaceUsedTwice(object parameter0) { return string.Format(T("TreeValidationError.DataElementsTreeNode.SameInterfaceUsedTwice"), parameter0); } 
 /// <summary>&quot;The same interface &apos;{0}&apos; is used as parent type as parent filter and this is not allowed&quot;</summary> 
 public static string TreeValidationError_DataElementsTreeNode_SameParentFilterInterfaceUsedTwice(object parameter0) { return string.Format(T("TreeValidationError.DataElementsTreeNode.SameParentFilterInterfaceUsedTwice"), parameter0); } 
 /// <summary>&quot;More than one parent filter is pointing to the interface &apos;{0}&apos;. Change the Display value to Lazy&quot;</summary> 
 public static string TreeValidationError_DataElementsTreeNode_MoreThanOnParentFilterIsPointingToMe(object parameter0) { return string.Format(T("TreeValidationError.DataElementsTreeNode.MoreThanOnParentFilterIsPointingToMe"), parameter0); } 
 /// <summary>&quot;Type attribute is missing&quot;</summary> 
 public static string TreeValidationError_DataFolderElements_MissingInterfaceType { get { return T("TreeValidationError.DataFolderElements.MissingInterfaceType"); } } 
 /// <summary>&quot;The interface type &apos;{0}&apos; does not match the parent elements interface type &apos;{1}&apos;&quot;</summary> 
 public static string TreeValidationError_DataFolderElements_WrongInterfaceType(object parameter0,object parameter1) { return string.Format(T("TreeValidationError.DataFolderElements.WrongInterfaceType"), parameter0,parameter1); } 
 /// <summary>&quot;DateFormat attribute requires that the property &apos;{0}&apos; should be of type &apos;{1}&apos; but is type &apos;{2}&apos;&quot;</summary> 
 public static string TreeValidationError_DataFolderElements_DateFormetNotAllowed(object parameter0,object parameter1,object parameter2) { return string.Format(T("TreeValidationError.DataFolderElements.DateFormetNotAllowed"), parameter0,parameter1,parameter2); } 
 /// <summary>&quot;The property &apos;{0}&apos; is of type Date and this requires the DateFormat attribute to be present&quot;</summary> 
 public static string TreeValidationError_DataFolderElements_DateFormetIsMissing(object parameter0) { return string.Format(T("TreeValidationError.DataFolderElements.DateFormetIsMissing"), parameter0); } 
 /// <summary>&quot;Ranges and first-letter-only not allowed at the same time&quot;</summary> 
 public static string TreeValidationError_DataFolderElements_RangesAndFirstLetterOnlyNotAllowed { get { return T("TreeValidationError.DataFolderElements.RangesAndFirstLetterOnlyNotAllowed"); } } 
 /// <summary>&quot;First-letter-only requires that the property &apos;{0}&apos; should be of type &apos;{1}&apos; but is type &apos;{2}&apos;&quot;</summary> 
 public static string TreeValidationError_DataFolderElements_WrongFirstLetterOnlyPropertyType(object parameter0,object parameter1,object parameter2) { return string.Format(T("TreeValidationError.DataFolderElements.WrongFirstLetterOnlyPropertyType"), parameter0,parameter1,parameter2); } 
 /// <summary>&quot;Only data child elements with the same interface type as the folder grouping (&apos;{0}&apos;) are allowed&quot;</summary> 
 public static string TreeValidationError_DataFolderElements_WrongDateChildInterfaceType(object parameter0) { return string.Format(T("TreeValidationError.DataFolderElements.WrongDateChildInterfaceType"), parameter0); } 
 /// <summary>&quot;Switching from the interface type &apos;{0}&apos; to a different interface type &apos;{1}&apos; is not allowed in the same folder grouping group&quot;</summary> 
 public static string TreeValidationError_DataFolderElements_InterfaceTypeSwitchNotAllowed(object parameter0,object parameter1) { return string.Format(T("TreeValidationError.DataFolderElements.InterfaceTypeSwitchNotAllowed"), parameter0,parameter1); } 
 /// <summary>&quot;Using the field name &apos;{0}&apos; twice in the same grouping tree is not allowed&quot;</summary> 
 public static string TreeValidationError_DataFolderElements_SameFieldUsedTwice(object parameter0) { return string.Format(T("TreeValidationError.DataFolderElements.SameFieldUsedTwice"), parameter0); } 
 /// <summary>&quot;Maximum one parent id filter node can be used on data elements used in groupings&quot;</summary> 
 public static string TreeValidationError_DataFolderElements_TooManyParentIdFilters { get { return T("TreeValidationError.DataFolderElements.TooManyParentIdFilters"); } } 
 /// <summary>&quot;The type &apos;{0}&apos; is not in the parent tree of this node or specified as an attachment points type&quot;</summary> 
 public static string TreeValidationError_ParentIdFilterNode_TypeIsNotInParentTree(object parameter0) { return string.Format(T("TreeValidationError.ParentIdFilterNode.TypeIsNotInParentTree"), parameter0); } 
 /// <summary>&quot;The operator &apos;{0}&apos; is unknown or not supported&quot;</summary> 
 public static string TreeValidationError_FieldFilter_UnknownOperatorName(object parameter0) { return string.Format(T("TreeValidationError.FieldFilter.UnknownOperatorName"), parameter0); } 
 /// <summary>&quot;The string value &apos;{0}&apos; could not be converted to the type &apos;{1}&apos;&quot;</summary> 
 public static string TreeValidationError_FieldFilter_ValueCouldNotBeConverted(object parameter0,object parameter1) { return string.Format(T("TreeValidationError.FieldFilter.ValueCouldNotBeConverted"), parameter0,parameter1); } 
 /// <summary>&quot;The operator &apos;{0}&apos; is not supported for the type &apos;{1}&apos;&quot;</summary> 
 public static string TreeValidationError_FieldFilter_OperatorNotSupportedForType(object parameter0,object parameter1) { return string.Format(T("TreeValidationError.FieldFilter.OperatorNotSupportedForType"), parameter0,parameter1); } 
 /// <summary>&quot;Function markup is missing&quot;</summary> 
 public static string TreeValidationError_FunctionFilter_MissingFunctionMarkup { get { return T("TreeValidationError.FunctionFilter.MissingFunctionMarkup"); } } 
 /// <summary>&quot;The function could not be created for the provided function markup&quot;</summary> 
 public static string TreeValidationError_FunctionFilter_WrongFunctionMarkup { get { return T("TreeValidationError.FunctionFilter.WrongFunctionMarkup"); } } 
 /// <summary>&quot;The function does not return value of the type &apos;{0}&apos;&quot;</summary> 
 public static string TreeValidationError_FunctionFilter_WrongReturnValue(object parameter0) { return string.Format(T("TreeValidationError.FunctionFilter.WrongReturnValue"), parameter0); } 
 /// <summary>&quot;The return type of the expression returned by the function is &apos;{0}&apos;, &apos;{1}&apos; was expected&quot;</summary> 
 public static string TreeValidationError_FunctionFilter_WrongFunctionReturnType(object parameter0,object parameter1) { return string.Format(T("TreeValidationError.FunctionFilter.WrongFunctionReturnType"), parameter0,parameter1); } 
 /// <summary>&quot;The parameter count of expression returned by the function is &apos;{0}&apos;, 1 was expected&quot;</summary> 
 public static string TreeValidationError_FunctionFilter_WrongFunctionParameterCount(object parameter0) { return string.Format(T("TreeValidationError.FunctionFilter.WrongFunctionParameterCount"), parameter0); } 
 /// <summary>&quot;The expressions parameter type returned by the function is &apos;{0}&apos;, &apos;{1}&apos; was expected&quot;</summary> 
 public static string TreeValidationError_FunctionFilter_WrongFunctionParameterType(object parameter0,object parameter1) { return string.Format(T("TreeValidationError.FunctionFilter.WrongFunctionParameterType"), parameter0,parameter1); } 
 /// <summary>&quot;The function does not return value of the type &apos;{0}&apos;&quot;</summary> 
 public static string TreeValidationError_ReportFunctionAction_WrongReturnValue(object parameter0) { return string.Format(T("TreeValidationError.ReportFunctionAction.WrongReturnValue"), parameter0); } 
 /// <summary>&quot;The file &apos;{0}&apos; does not exist&quot;</summary> 
 public static string TreeValidationError_GenericAddDataAction_MissingMarkupFile(object parameter0) { return string.Format(T("TreeValidationError.GenericAddDataAction.MissingMarkupFile"), parameter0); } 
 /// <summary>&quot;The custom markup path &apos;{0}&apos; is wrongly formatted. Use ~/Dir1/Dir2/File.xml&quot;</summary> 
 public static string TreeValidationError_GenericAddDataAction_BadMarkupPath(object parameter0) { return string.Format(T("TreeValidationError.GenericAddDataAction.BadMarkupPath"), parameter0); } 
 /// <summary>&quot;The edit data action only applies to elements that produce data elements&quot;</summary> 
 public static string TreeValidationError_GenericEditDataAction_OwnerIsNotDataNode { get { return T("TreeValidationError.GenericEditDataAction.OwnerIsNotDataNode"); } } 
 /// <summary>&quot;The file &apos;{0}&apos; does not exist&quot;</summary> 
 public static string TreeValidationError_GenericEditDataAction_MissingMarkupFile(object parameter0) { return string.Format(T("TreeValidationError.GenericEditDataAction.MissingMarkupFile"), parameter0); } 
 /// <summary>&quot;The custom markup path &apos;{0}&apos; is wrongly formatted. Use ~/Dir1/Dir2/File.xml&quot;</summary> 
 public static string TreeValidationError_GenericEditDataAction_BadMarkupPath(object parameter0) { return string.Format(T("TreeValidationError.GenericEditDataAction.BadMarkupPath"), parameter0); } 
 /// <summary>&quot;The delete data action only applies to elements that produce data elements&quot;</summary> 
 public static string TreeValidationError_GenericDeleteDataAction_OwnerIsNotDataNode { get { return T("TreeValidationError.GenericDeleteDataAction.OwnerIsNotDataNode"); } } 
 /// <summary>&quot;The dialog type &apos;{0}&apos; is not supported&quot;</summary> 
 public static string TreeValidationError_MessageBoxAction_UnknownDialogType(object parameter0) { return string.Format(T("TreeValidationError.MessageBoxAction.UnknownDialogType"), parameter0); } 
 /// <summary>&quot;Too many &apos;{0}&apos; elements, only one is allowed&quot;</summary> 
 public static string TreeValidationError_CustomUrlAction_TooManyPostParameterElements(object parameter0) { return string.Format(T("TreeValidationError.CustomUrlAction.TooManyPostParameterElements"), parameter0); } 
 /// <summary>&quot;The view type &apos;{0}&apos; is not supported&quot;</summary> 
 public static string TreeValidationError_CustomUrlAction_UnknownViewType(object parameter0) { return string.Format(T("TreeValidationError.CustomUrlAction.UnknownViewType"), parameter0); } 
 /// <summary>&quot;The direction value &apos;{0}&apos; is wrong, should be either &apos;ascending&apos; or &apos;descending&apos;&quot;</summary> 
 public static string TreeValidationError_FieldOrderBy_UnknownDirection(object parameter0) { return string.Format(T("TreeValidationError.FieldOrderBy.UnknownDirection"), parameter0); } 
 /// <summary>&quot;The type &apos;{0}&apos; does not contain a field named &apos;{1}&apos;&quot;</summary> 
 public static string TreeValidationError_FieldOrderBy_UnknownField(object parameter0,object parameter1) { return string.Format(T("TreeValidationError.FieldOrderBy.UnknownField"), parameter0,parameter1); } 
 /// <summary>&quot;&apos;{0}&apos; is in wrong format, use the format: {1}&quot;</summary> 
 public static string TreeValidationError_DataFieldValueHelper_WrongFormat(object parameter0,object parameter1) { return string.Format(T("TreeValidationError.DataFieldValueHelper.WrongFormat"), parameter0,parameter1); } 
 /// <summary>&quot;The interface &apos;{0}&apos; is not contained in the current element or any of its parents&quot;</summary> 
 public static string TreeValidationError_DataFieldValueHelper_InterfaceNotInParentTree(object parameter0) { return string.Format(T("TreeValidationError.DataFieldValueHelper.InterfaceNotInParentTree"), parameter0); } 
 /// <summary>&quot;The range value is wrongly formatted&quot;</summary> 
 public static string TreeValidationError_Range_WrongFormat { get { return T("TreeValidationError.Range.WrongFormat"); } } 
 /// <summary>&quot;The property &apos;{0}&apos; is of type &apos;{1}&apos; which does not support ranges&quot;</summary> 
 public static string TreeValidationError_Range_UnsupportedType(object parameter0,object parameter1) { return string.Format(T("TreeValidationError.Range.UnsupportedType"), parameter0,parameter1); } 
 /// <summary>&quot;The value first value ({0}) in a range should be lesser than second value ({1})&quot;</summary> 
 public static string TreeValidationError_Range_MinMaxError(object parameter0,object parameter1) { return string.Format(T("TreeValidationError.Range.MinMaxError"), parameter0,parameter1); } 
 /// <summary>&quot;The max value of a range should be less than the min value of the succeeding range&quot;</summary> 
 public static string TreeValidationError_Range_NextRangeError { get { return T("TreeValidationError.Range.NextRangeError"); } } 
 /// <summary>&quot;From {0} to {1}&quot;</summary> 
 public static string TreeRanges_IntRange_Closed(object parameter0,object parameter1) { return string.Format(T("TreeRanges.IntRange.Closed"), parameter0,parameter1); } 
 /// <summary>&quot;{0} or less&quot;</summary> 
 public static string TreeRanges_IntRange_MinOpenEnded(object parameter0) { return string.Format(T("TreeRanges.IntRange.MinOpenEnded"), parameter0); } 
 /// <summary>&quot;{0} or more&quot;</summary> 
 public static string TreeRanges_IntRange_MaxOpenEnded(object parameter0) { return string.Format(T("TreeRanges.IntRange.MaxOpenEnded"), parameter0); } 
 /// <summary>&quot;Other&quot;</summary> 
 public static string TreeRanges_IntRange_Other { get { return T("TreeRanges.IntRange.Other"); } } 
 /// <summary>&quot;From {0} to {1}&quot;</summary> 
 public static string TreeRanges_StringRange_Closed(object parameter0,object parameter1) { return string.Format(T("TreeRanges.StringRange.Closed"), parameter0,parameter1); } 
 /// <summary>&quot;{0} and before&quot;</summary> 
 public static string TreeRanges_StringRange_MinOpenEnded(object parameter0) { return string.Format(T("TreeRanges.StringRange.MinOpenEnded"), parameter0); } 
 /// <summary>&quot;{0} and after&quot;</summary> 
 public static string TreeRanges_StringRange_MaxOpenEnded(object parameter0) { return string.Format(T("TreeRanges.StringRange.MaxOpenEnded"), parameter0); } 
 /// <summary>&quot;Other&quot;</summary> 
 public static string TreeRanges_StringRange_Other { get { return T("TreeRanges.StringRange.Other"); } } 
 /// <summary>&quot;Add&quot;</summary> 
 public static string GenericAddDataAction_DefaultLabel { get { return T("GenericAddDataAction.DefaultLabel"); } } 
 /// <summary>&quot;Edit&quot;</summary> 
 public static string GenericEditDataAction_DefaultLabel { get { return T("GenericEditDataAction.DefaultLabel"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string GenericDeleteDataAction_DefaultLabel { get { return T("GenericDeleteDataAction.DefaultLabel"); } } 
 /// <summary>&quot;Cascade delete error&quot;</summary> 
 public static string TreeGenericDelete_CascadeDeleteErrorTitle { get { return T("TreeGenericDelete.CascadeDeleteErrorTitle"); } } 
 /// <summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
 public static string TreeGenericDelete_CascadeDeleteErrorMessage { get { return T("TreeGenericDelete.CascadeDeleteErrorMessage"); } } 
 /// <summary>&quot;Delete Data?&quot;</summary> 
 public static string TreeGenericDeleteConfirm_LabelFieldGroup { get { return T("TreeGenericDeleteConfirm.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string TreeGenericDeleteConfirm_Text { get { return T("TreeGenericDeleteConfirm.Text"); } } 
 /// <summary>&quot;Delete data?&quot;</summary> 
 public static string TreeGenericDeleteConfirmDeletingRelatedData_LabelFieldGroup { get { return T("TreeGenericDeleteConfirmDeletingRelatedData.LabelFieldGroup"); } } 
 /// <summary>&quot;There is some referenced data that will also be deleted, do you want to continue?&quot;</summary> 
 public static string TreeGenericDeleteConfirmDeletingRelatedData_ConfirmationText { get { return T("TreeGenericDeleteConfirmDeletingRelatedData.ConfirmationText"); } } 
 /// <summary>&quot;Add&quot;</summary> 
 public static string TreeAddTreeDefinitionWorkflow_AddNew_Label { get { return T("TreeAddTreeDefinitionWorkflow.AddNew.Label"); } } 
 /// <summary>&quot;Add new tree definition&quot;</summary> 
 public static string TreeAddTreeDefinitionWorkflow_AddNew_ToolTip { get { return T("TreeAddTreeDefinitionWorkflow.AddNew.ToolTip"); } } 
 /// <summary>&quot;Add new tree definition&quot;</summary> 
 public static string TreeAddTreeDefinition_Layout_Label { get { return T("TreeAddTreeDefinition.Layout.Label"); } } 
 /// <summary>&quot;Add new tree definition&quot;</summary> 
 public static string TreeAddTreeDefinition_FieldGroup_Label { get { return T("TreeAddTreeDefinition.FieldGroup.Label"); } } 
 /// <summary>&quot;Definition name&quot;</summary> 
 public static string TreeAddTreeDefinition_NameTextBox_Label { get { return T("TreeAddTreeDefinition.NameTextBox.Label"); } } 
 /// <summary>&quot;Definition name&quot;</summary> 
 public static string TreeAddTreeDefinition_NameTextBox_Help { get { return T("TreeAddTreeDefinition.NameTextBox.Help"); } } 
 /// <summary>&quot;Template&quot;</summary> 
 public static string TreeAddTreeDefinition_TemplateSelector_Label { get { return T("TreeAddTreeDefinition.TemplateSelector.Label"); } } 
 /// <summary>&quot;Select a template to start with&quot;</summary> 
 public static string TreeAddTreeDefinition_TemplateSelector_Help { get { return T("TreeAddTreeDefinition.TemplateSelector.Help"); } } 
 /// <summary>&quot;Position&quot;</summary> 
 public static string TreeAddTreeDefinition_PositionSelector_Label { get { return T("TreeAddTreeDefinition.PositionSelector.Label"); } } 
 /// <summary>&quot;Position&quot;</summary> 
 public static string TreeAddTreeDefinition_PositionSelector_Help { get { return T("TreeAddTreeDefinition.PositionSelector.Help"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string TreeDeleteTreeDefinitionWorkflow_Delete_Label { get { return T("TreeDeleteTreeDefinitionWorkflow.Delete.Label"); } } 
 /// <summary>&quot;Delete tree definition&quot;</summary> 
 public static string TreeDeleteTreeDefinitionWorkflow_Delete_ToolTip { get { return T("TreeDeleteTreeDefinitionWorkflow.Delete.ToolTip"); } } 
 /// <summary>&quot;Delete tree definition&quot;</summary> 
 public static string TreeDeleteTreeDefinition_Layout_Label { get { return T("TreeDeleteTreeDefinition.Layout.Label"); } } 
 /// <summary>&quot;Delete selected tree definition&quot;</summary> 
 public static string TreeDeleteTreeDefinition_Title { get { return T("TreeDeleteTreeDefinition.Title"); } } 
 /// <summary>&quot;Delete selected tree definition?&quot;</summary> 
 public static string TreeDeleteTreeDefinition_Description { get { return T("TreeDeleteTreeDefinition.Description"); } } 
 /// <summary>&quot;Edit&quot;</summary> 
 public static string TreeDeleteTreeDefinitionWorkflow_Edit_Label { get { return T("TreeDeleteTreeDefinitionWorkflow.Edit.Label"); } } 
 /// <summary>&quot;Edit tree definition&quot;</summary> 
 public static string TreeDeleteTreeDefinitionWorkflow_Edit_ToolTip { get { return T("TreeDeleteTreeDefinitionWorkflow.Edit.ToolTip"); } } 
 /// <summary>&quot;Add Application&quot;</summary> 
 public static string AddApplicationWorkflow_AddApplication_Label { get { return T("AddApplicationWorkflow.AddApplication.Label"); } } 
 /// <summary>&quot;Add new application&quot;</summary> 
 public static string AddApplicationWorkflow_AddApplication_ToolTip { get { return T("AddApplicationWorkflow.AddApplication.ToolTip"); } } 
 /// <summary>&quot;Add application&quot;</summary> 
 public static string AddApplication_Layout_Label { get { return T("AddApplication.Layout.Label"); } } 
 /// <summary>&quot;Select application&quot;</summary> 
 public static string AddApplication_FieldGroup_Label { get { return T("AddApplication.FieldGroup.Label"); } } 
 /// <summary>&quot;Application&quot;</summary> 
 public static string AddApplication_TreeIdSelector_Label { get { return T("AddApplication.TreeIdSelector.Label"); } } 
 /// <summary>&quot;Select the application that you wish to add&quot;</summary> 
 public static string AddApplication_TreeIdSelector_Help { get { return T("AddApplication.TreeIdSelector.Help"); } } 
 /// <summary>&quot;Position&quot;</summary> 
 public static string AddApplication_PositionSelector_Label { get { return T("AddApplication.PositionSelector.Label"); } } 
 /// <summary>&quot;The position to insert this application&quot;</summary> 
 public static string AddApplication_PositionSelector_Help { get { return T("AddApplication.PositionSelector.Help"); } } 
 /// <summary>&quot;No applications&quot;</summary> 
 public static string AddApplication_NoTrees_Title { get { return T("AddApplication.NoTrees.Title"); } } 
 /// <summary>&quot;You have added all available applications&quot;</summary> 
 public static string AddApplication_NoTrees_Message { get { return T("AddApplication.NoTrees.Message"); } } 
 /// <summary>&quot;Remove Application&quot;</summary> 
 public static string RemoveApplicationWorkflow_RemoveApplication_Label { get { return T("RemoveApplicationWorkflow.RemoveApplication.Label"); } } 
 /// <summary>&quot;Remove existing application&quot;</summary> 
 public static string RemoveApplicationWorkflow_RemoveApplication_ToolTip { get { return T("RemoveApplicationWorkflow.RemoveApplication.ToolTip"); } } 
 /// <summary>&quot;Remove application&quot;</summary> 
 public static string RemoveApplication_Layout_Label { get { return T("RemoveApplication.Layout.Label"); } } 
 /// <summary>&quot;Remove application&quot;</summary> 
 public static string RemoveApplication_FieldGroup_Label { get { return T("RemoveApplication.FieldGroup.Label"); } } 
 /// <summary>&quot;Application&quot;</summary> 
 public static string RemoveApplication_TreeIdSelector_Label { get { return T("RemoveApplication.TreeIdSelector.Label"); } } 
 /// <summary>&quot;Select the application that you wish to remove&quot;</summary> 
 public static string RemoveApplication_TreeIdSelector_Help { get { return T("RemoveApplication.TreeIdSelector.Help"); } } 
 /// <summary>&quot;No applications&quot;</summary> 
 public static string RemoveApplication_NoTrees_Title { get { return T("RemoveApplication.NoTrees.Title"); } } 
 /// <summary>&quot;You have removed all available applications&quot;</summary> 
 public static string RemoveApplication_NoTrees_Message { get { return T("RemoveApplication.NoTrees.Message"); } } 
 /// <summary>&quot;Translate data&quot;</summary> 
 public static string LocalizeDataWorkflow_LocalizeDataLabel { get { return T("LocalizeDataWorkflow.LocalizeDataLabel"); } } 
 /// <summary>&quot;Translate data&quot;</summary> 
 public static string LocalizeDataWorkflow_LocalizeDataToolTip { get { return T("LocalizeDataWorkflow.LocalizeDataToolTip"); } } 
 /// <summary>&quot;Not yet approved or published&quot;</summary> 
 public static string LocalizeDataWorkflow_DisabledData { get { return T("LocalizeDataWorkflow.DisabledData"); } } 
 /// <summary>&quot;Failed to translate data&quot;</summary> 
 public static string LocalizeData_ShowError_Layout_Label { get { return T("LocalizeData.ShowError.Layout.Label"); } } 
 /// <summary>&quot;Translation errors&quot;</summary> 
 public static string LocalizeData_ShowError_InfoTable_Caption { get { return T("LocalizeData.ShowError.InfoTable.Caption"); } } 
 /// <summary>&quot;The following fields has a reference to a data type. You should translate these data items before you can translate this data item&quot;</summary> 
 public static string LocalizeData_ShowError_Description { get { return T("LocalizeData.ShowError.Description"); } } 
 /// <summary>&quot;The field &apos;{0}&apos; is referencing data of type &apos;{1}&apos; with the label &apos;{2}&apos;&quot;</summary> 
 public static string LocalizeData_ShowError_FieldErrorFormat(object parameter0,object parameter1,object parameter2) { return string.Format(T("LocalizeData.ShowError.FieldErrorFormat"), parameter0,parameter1,parameter2); } 
 /// <summary>&quot;This data has already been translated. The translated version belongs to a different group.&quot;</summary> 
 public static string LocalizeData_ShowError_AlreadyTranslated { get { return T("LocalizeData.ShowError.AlreadyTranslated"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.C1Console.Trees", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_C1Console_Users {
 /// <summary>&quot;Change Password...&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_ElementActionLabel { get { return T("ChangeOwnPasswordWorkflow.ElementActionLabel"); } } 
 /// <summary>&quot;Change your password&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_ElementActionToolTip { get { return T("ChangeOwnPasswordWorkflow.ElementActionToolTip"); } } 
 /// <summary>&quot;Change Password&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_Label { get { return T("ChangeOwnPasswordWorkflow.Dialog.Label"); } } 
 /// <summary>&quot;Existing password&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_ExistingPassword_Label { get { return T("ChangeOwnPasswordWorkflow.Dialog.ExistingPassword.Label"); } } 
 /// <summary>&quot;For security reasons you must present your existing password before you can continue.&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_ExistingPassword_Help { get { return T("ChangeOwnPasswordWorkflow.Dialog.ExistingPassword.Help"); } } 
 /// <summary>&quot;New password&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_NewPassword_Label { get { return T("ChangeOwnPasswordWorkflow.Dialog.NewPassword.Label"); } } 
 /// <summary>&quot;The password specified in this field must match the confirmation below.&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_NewPassword_Help { get { return T("ChangeOwnPasswordWorkflow.Dialog.NewPassword.Help"); } } 
 /// <summary>&quot;Confirm new password&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_NewPasswordConfirmed_Label { get { return T("ChangeOwnPasswordWorkflow.Dialog.NewPasswordConfirmed.Label"); } } 
 /// <summary>&quot;The password specified in this field must match the one specified above.&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_NewPasswordConfirmed_Help { get { return T("ChangeOwnPasswordWorkflow.Dialog.NewPasswordConfirmed.Help"); } } 
 /// <summary>&quot;The specified password is incorrect.&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_Validation_IncorrectPassword { get { return T("ChangeOwnPasswordWorkflow.Dialog.Validation.IncorrectPassword"); } } 
 /// <summary>&quot;The new passwords you typed do not match.&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_Validation_NewPasswordFieldsNotMatch { get { return T("ChangeOwnPasswordWorkflow.Dialog.Validation.NewPasswordFieldsNotMatch"); } } 
 /// <summary>&quot;The old and the new passwords are the same.&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_Validation_PasswordsAreTheSame { get { return T("ChangeOwnPasswordWorkflow.Dialog.Validation.PasswordsAreTheSame"); } } 
 /// <summary>&quot;The new password may not be an empty string.&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_Validation_NewPasswordIsEmpty { get { return T("ChangeOwnPasswordWorkflow.Dialog.Validation.NewPasswordIsEmpty"); } } 
 /// <summary>&quot;The new password must be at least {0} characters long.&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_Dialog_Validation_NewPasswordTooShort(object parameter0) { return string.Format(T("ChangeOwnPasswordWorkflow.Dialog.Validation.NewPasswordTooShort"), parameter0); } 
 /// <summary>&quot;Password change isn&apos;t supported.&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_NotSupportedErrorLabel { get { return T("ChangeOwnPasswordWorkflow.NotSupportedErrorLabel"); } } 
 /// <summary>&quot;Password change isn&apos;t supported in current configuration.&quot;</summary> 
 public static string ChangeOwnPasswordWorkflow_NotSupportedErrorText { get { return T("ChangeOwnPasswordWorkflow.NotSupportedErrorText"); } } 
 /// <summary>&quot;Regional Settings...&quot;</summary> 
 public static string ChangeOwnCultureWorkflow_ElementActionLabel { get { return T("ChangeOwnCultureWorkflow.ElementActionLabel"); } } 
 /// <summary>&quot;Set the C1 Console language and formatting of numbers, times and dates&quot;</summary> 
 public static string ChangeOwnCultureWorkflow_ElementActionToolTip { get { return T("ChangeOwnCultureWorkflow.ElementActionToolTip"); } } 
 /// <summary>&quot;Regional Settings and Language&quot;</summary> 
 public static string ChangeOwnCultureWorkflow_Dialog_Label { get { return T("ChangeOwnCultureWorkflow.Dialog.Label"); } } 
 /// <summary>&quot;Regional settings&quot;</summary> 
 public static string ChangeOwnCultureWorkflow_Dialog_CultureSelector_Label { get { return T("ChangeOwnCultureWorkflow.Dialog.CultureSelector.Label"); } } 
 /// <summary>&quot;To change the way numbers, dates, and hours are displayed, select an entry from the list.&quot;</summary> 
 public static string ChangeOwnCultureWorkflow_Dialog_CultureSelector_Help { get { return T("ChangeOwnCultureWorkflow.Dialog.CultureSelector.Help"); } } 
 /// <summary>&quot;C1 Console language&quot;</summary> 
 public static string ChangeOwnCultureWorkflow_Dialog_C1ConsoleLanguageSelector_Label { get { return T("ChangeOwnCultureWorkflow.Dialog.C1ConsoleLanguageSelector.Label"); } } 
 /// <summary>&quot;Select the language to be used for labels, help texts, dialogs etc. The available options here are limited to languages installed. You may install more languages via the Package system, see Composite.Localization.&quot;</summary> 
 public static string ChangeOwnCultureWorkflow_Dialog_C1ConsoleLanguageSelector_Help { get { return T("ChangeOwnCultureWorkflow.Dialog.C1ConsoleLanguageSelector.Help"); } } 
 /// <summary>&quot;Change application language&quot;</summary> 
 public static string ChangeOwnCultureWorkflow_Dialog_Confirm_Title { get { return T("ChangeOwnCultureWorkflow.Dialog.Confirm.Title"); } } 
 /// <summary>&quot;Are your sure you wish to change the settings? The application will restart and all your unsaved changes will be lost.&quot;</summary> 
 public static string ChangeOwnCultureWorkflow_Dialog_Confirm_Text { get { return T("ChangeOwnCultureWorkflow.Dialog.Confirm.Text"); } } 
 /// <summary>&quot;Administrators&quot;</summary> 
 public static string AdministratorAutoCreator_DefaultGroupName { get { return T("AdministratorAutoCreator.DefaultGroupName"); } } 
 /// <summary>&quot;Translation...&quot;</summary> 
 public static string ChangeForeignLocaleWorkflow_ActionLabel { get { return T("ChangeForeignLocaleWorkflow.ActionLabel"); } } 
 /// <summary>&quot;Change source language&quot;</summary> 
 public static string ChangeForeignLocaleWorkflow_ActionToolTip { get { return T("ChangeForeignLocaleWorkflow.ActionToolTip"); } } 
 /// <summary>&quot;None&quot;</summary> 
 public static string ChangeForeignLocaleWorkflow_NoForeignLocaleLabel { get { return T("ChangeForeignLocaleWorkflow.NoForeignLocaleLabel"); } } 
 /// <summary>&quot;Translation&quot;</summary> 
 public static string ChangeForeignLocaleWorkflow_Dialog_Label { get { return T("ChangeForeignLocaleWorkflow.Dialog.Label"); } } 
 /// <summary>&quot;Select language to translate from&quot;</summary> 
 public static string ChangeForeignLocaleWorkflow_FieldGroup_Label { get { return T("ChangeForeignLocaleWorkflow.FieldGroup.Label"); } } 
 /// <summary>&quot;Multiple languages not installed&quot;</summary> 
 public static string ChangeForeignLocaleWorkflow_NoOrOneActiveLocales_Title { get { return T("ChangeForeignLocaleWorkflow.NoOrOneActiveLocales.Title"); } } 
 /// <summary>&quot;Two or more languages must be installed in order to support translations. Administrators can add more languages in the &apos;System&apos; perspective.&quot;</summary> 
 public static string ChangeForeignLocaleWorkflow_NoOrOneActiveLocales_Description { get { return T("ChangeForeignLocaleWorkflow.NoOrOneActiveLocales.Description"); } } 
 /// <summary>&quot;From-language&quot;</summary> 
 public static string ChangeForeignLocaleWorkflow_ForeignCultureSelector_Label { get { return T("ChangeForeignLocaleWorkflow.ForeignCultureSelector.Label"); } } 
 /// <summary>&quot;Pages written in the from-language will be indicated by globe icons in the Content tree. The associated &quot;Translate Page&quot; action imports the page into the current working language.&quot;</summary> 
 public static string ChangeForeignLocaleWorkflow_ForeignCultureSelector_Help { get { return T("ChangeForeignLocaleWorkflow.ForeignCultureSelector.Help"); } } 
 /// <summary>&quot;The active language has been changed&quot;</summary> 
 public static string ChangeOwnActiveLocaleWorkflow_CloseAllViews_Message { get { return T("ChangeOwnActiveLocaleWorkflow.CloseAllViews.Message"); } } 
 /// <summary>&quot;Password should be at least {0} characters long.&quot;</summary> 
 public static string PasswordRules_MinimumLength(object parameter0) { return string.Format(T("PasswordRules.MinimumLength"), parameter0); } 
 /// <summary>&quot;Password should not match any of the previously used {0} passwords.&quot;</summary> 
 public static string PasswordRules_EnforcePasswordHistory(object parameter0) { return string.Format(T("PasswordRules.EnforcePasswordHistory"), parameter0); } 
 /// <summary>&quot;Password should contain 3/4 of the following items: uppercase letters, lowercase letters, numbers, symbols.&quot;</summary> 
 public static string PasswordRules_DifferentCharacterGroups { get { return T("PasswordRules.DifferentCharacterGroups"); } } 
 /// <summary>&quot;Password should not be based on a user name.&quot;</summary> 
 public static string PasswordRules_DoNotUseUserName { get { return T("PasswordRules.DoNotUseUserName"); } } 
 /// <summary>&quot;Confirmation password mismatch&quot;</summary> 
 public static string ChangePasswordForm_ConfirmationPasswordMimatch { get { return T("ChangePasswordForm.ConfirmationPasswordMimatch"); } } 
 /// <summary>&quot;Username&quot;</summary> 
 public static string ChangePasswordForm_Username { get { return T("ChangePasswordForm.Username"); } } 
 /// <summary>&quot;Old Password&quot;</summary> 
 public static string ChangePasswordForm_OldPassword { get { return T("ChangePasswordForm.OldPassword"); } } 
 /// <summary>&quot;NewPassword&quot;</summary> 
 public static string ChangePasswordForm_NewPassword { get { return T("ChangePasswordForm.NewPassword"); } } 
 /// <summary>&quot;Confirm Password&quot;</summary> 
 public static string ChangePasswordForm_ConfirmPassword { get { return T("ChangePasswordForm.ConfirmPassword"); } } 
 /// <summary>&quot;Change Password&quot;</summary> 
 public static string ChangePasswordForm_ChangePasswordButton { get { return T("ChangePasswordForm.ChangePasswordButton"); } } 
 /// <summary>&quot;Password is older than {0} days. Please change your password.&quot;</summary> 
 public static string ChangePasswordForm_PasswordExpiredMessage(object parameter0) { return string.Format(T("ChangePasswordForm.PasswordExpiredMessage"), parameter0); } 
 /// <summary>&quot;The old password is incorrect.&quot;</summary> 
 public static string ChangePasswordForm_IncorrectOldPassword { get { return T("ChangePasswordForm.IncorrectOldPassword"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.C1Console.Users", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Core_PackageSystem_PackageFragmentInstallers {
 /// <summary>&quot;The package composite version requirements does not match the current composite version&quot;</summary> 
 public static string PackageManager_CompositeVersionMisMatch { get { return T("PackageManager.CompositeVersionMisMatch"); } } 
 /// <summary>&quot;Package is already installed&quot;</summary> 
 public static string PackageManager_PackageAlreadyInstalled { get { return T("PackageManager.PackageAlreadyInstalled"); } } 
 /// <summary>&quot;A newer version of the package is already installed&quot;</summary> 
 public static string PackageManager_NewerVersionInstalled { get { return T("PackageManager.NewerVersionInstalled"); } } 
 /// <summary>&quot;Could not locate the package directory path &apos;{0}&apos;&quot;</summary> 
 public static string PackageManager_MissingPackageDirectory(object parameter0) { return string.Format(T("PackageManager.MissingPackageDirectory"), parameter0); } 
 /// <summary>&quot;The package is marked as non uninstallable&quot;</summary> 
 public static string PackageManager_Uninstallable { get { return T("PackageManager.Uninstallable"); } } 
 /// <summary>&quot;Could not locate the package zip file path &apos;{0}&apos;&quot;</summary> 
 public static string PackageManager_MissingZipFile(object parameter0) { return string.Format(T("PackageManager.MissingZipFile"), parameter0); } 
 /// <summary>&quot;Could not locate the package uninstall file path &apos;{0}&apos;&quot;</summary> 
 public static string PackageManager_MissingUninstallFile(object parameter0) { return string.Format(T("PackageManager.MissingUninstallFile"), parameter0); } 
 /// <summary>&quot;Missing &apos;{0}&apos; element.&quot;</summary> 
 public static string PackageManager_MissingElement(object parameter0) { return string.Format(T("PackageManager.MissingElement"), parameter0); } 
 /// <summary>&quot;Missing &apos;{0}&apos; attribute.&quot;</summary> 
 public static string PackageManager_MissingAttribute(object parameter0) { return string.Format(T("PackageManager.MissingAttribute"), parameter0); } 
 /// <summary>&quot;&apos;{0}&apos; attribute value is not a valid value.&quot;</summary> 
 public static string PackageManager_InvalidAttributeValue(object parameter0) { return string.Format(T("PackageManager.InvalidAttributeValue"), parameter0); } 
 /// <summary>&quot;&apos;{0}&apos; element value is not a valid value&quot;</summary> 
 public static string PackageManager_InvalidElementValue(object parameter0) { return string.Format(T("PackageManager.InvalidElementValue"), parameter0); } 
 /// <summary>&quot;Expected exactly two elements, &apos;{0}&apos; and &apos;{1}&apos;&quot;</summary> 
 public static string ConfigurationTransformationPackageFragmentInstaller_ExpectedExactlyTwoElements(object parameter0,object parameter1) { return string.Format(T("ConfigurationTransformationPackageFragmentInstaller.ExpectedExactlyTwoElements"), parameter0,parameter1); } 
 /// <summary>&quot;Missing &apos;{0}&apos; element.&quot;</summary> 
 public static string ConfigurationTransformationPackageFragmentInstaller_MissingElement(object parameter0) { return string.Format(T("ConfigurationTransformationPackageFragmentInstaller.MissingElement"), parameter0); } 
 /// <summary>&quot;Missing &apos;{0}&apos; attribute.&quot;</summary> 
 public static string ConfigurationTransformationPackageFragmentInstaller_MissingAttribute(object parameter0) { return string.Format(T("ConfigurationTransformationPackageFragmentInstaller.MissingAttribute"), parameter0); } 
 /// <summary>&quot;The path &apos;{0}&apos; does not exist in the ZIP.&quot;</summary> 
 public static string ConfigurationTransformationPackageFragmentInstaller_PathDoesNotExist(object parameter0) { return string.Format(T("ConfigurationTransformationPackageFragmentInstaller.PathDoesNotExist"), parameter0); } 
 /// <summary>&quot;Unable to parse ZIP&apos;ed XSLT file &apos;{0}&apos;. {1}&quot;</summary> 
 public static string ConfigurationTransformationPackageFragmentInstaller_UnableToParsXslt(object parameter0,object parameter1) { return string.Format(T("ConfigurationTransformationPackageFragmentInstaller.UnableToParsXslt"), parameter0,parameter1); } 
 /// <summary>&quot;The XSLT file &apos;{0}&apos; will generate an invalid Configuration file. {1}&quot;</summary> 
 public static string ConfigurationTransformationPackageFragmentInstaller_XsltWillGeneratedInvalid(object parameter0,object parameter1) { return string.Format(T("ConfigurationTransformationPackageFragmentInstaller.XsltWillGeneratedInvalid"), parameter0,parameter1); } 
 /// <summary>&quot;Only one &apos;Types&apos; element allowed&quot;</summary> 
 public static string DataPackageFragmentInstaller_OnlyOneElement { get { return T("DataPackageFragmentInstaller.OnlyOneElement"); } } 
 /// <summary>&quot;Missing &apos;Types&apos; element&quot;</summary> 
 public static string DataPackageFragmentInstaller_MissingElement { get { return T("DataPackageFragmentInstaller.MissingElement"); } } 
 /// <summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
 public static string DataPackageFragmentInstaller_MissingAttribute(object parameter0) { return string.Format(T("DataPackageFragmentInstaller.MissingAttribute"), parameter0); } 
 /// <summary>&quot;Wrong DataScopeIdentifier ({0}) name in the configuration&quot;</summary> 
 public static string DataPackageFragmentInstaller_WrongDataScopeIdentifier(object parameter0) { return string.Format(T("DataPackageFragmentInstaller.WrongDataScopeIdentifier"), parameter0); } 
 /// <summary>&quot;Wrong culture ({0}) name in the configuration&quot;</summary> 
 public static string DataPackageFragmentInstaller_WrongLocale(object parameter0) { return string.Format(T("DataPackageFragmentInstaller.WrongLocale"), parameter0); } 
 /// <summary>&quot;Missing file &apos;{0}&apos; in the package zip&quot;</summary> 
 public static string DataPackageFragmentInstaller_MissingFile(object parameter0) { return string.Format(T("DataPackageFragmentInstaller.MissingFile"), parameter0); } 
 /// <summary>&quot;The data interface type &apos;{0}&apos; has not been configured in the system&quot;</summary> 
 public static string DataPackageFragmentInstaller_TypeNotConfigured(object parameter0) { return string.Format(T("DataPackageFragmentInstaller.TypeNotConfigured"), parameter0); } 
 /// <summary>&quot;The data interface type &apos;{0}&apos; does not inherit the interface &apos;{1}&apos;&quot;</summary> 
 public static string DataPackageFragmentInstaller_TypeNotInheriting(object parameter0,object parameter1) { return string.Format(T("DataPackageFragmentInstaller.TypeNotInheriting"), parameter0,parameter1); } 
 /// <summary>&quot;The data interface type &apos;{0}&apos; does not have a property named &apos;{1}&apos;&quot;</summary> 
 public static string DataPackageFragmentInstaller_MissingProperty(object parameter0,object parameter1) { return string.Format(T("DataPackageFragmentInstaller.MissingProperty"), parameter0,parameter1); } 
 /// <summary>&quot;The data interface type &apos;{0}&apos; does not have a writable property named &apos;{1}&apos;&quot;</summary> 
 public static string DataPackageFragmentInstaller_MissingWritableProperty(object parameter0,object parameter1) { return string.Format(T("DataPackageFragmentInstaller.MissingWritableProperty"), parameter0,parameter1); } 
 /// <summary>&quot;Could not convert the value &apos;{0}&apos; to the type &apos;{1}&apos;&quot;</summary> 
 public static string DataPackageFragmentInstaller_ConversionFailed(object parameter0,object parameter1) { return string.Format(T("DataPackageFragmentInstaller.ConversionFailed"), parameter0,parameter1); } 
 /// <summary>&quot;The property &apos;{0}&apos; on the interface &apos;{1}&apos; is missing a value.&quot;</summary> 
 public static string DataPackageFragmentInstaller_MissingPropertyVaule(object parameter0,object parameter1) { return string.Format(T("DataPackageFragmentInstaller.MissingPropertyVaule"), parameter0,parameter1); } 
 /// <summary>&quot;Data type &apos;{0}&apos;: {1} record(s) already installed&quot;</summary> 
 public static string DataPackageFragmentInstaller_DataExists(object parameter0,object parameter1) { return string.Format(T("DataPackageFragmentInstaller.DataExists"), parameter0,parameter1); } 
 /// <summary>&quot;Missing data type descriptor for the type {0}&quot;</summary> 
 public static string DataPackageFragmentInstaller_MissingTypeDescriptor(object parameter0) { return string.Format(T("DataPackageFragmentInstaller.MissingTypeDescriptor"), parameter0); } 
 /// <summary>&quot;The data type &apos;{0}&apos; is not localized but a locale is specified in the configuration&quot;</summary> 
 public static string DataPackageFragmentInstaller_TypeNonLocalizedWithLocale(object parameter0) { return string.Format(T("DataPackageFragmentInstaller.TypeNonLocalizedWithLocale"), parameter0); } 
 /// <summary>&quot;The data type &apos;{0}&apos; is localized but no locale is specified in the configuration&quot;</summary> 
 public static string DataPackageFragmentInstaller_TypeLocalizedWithoutLocale(object parameter0) { return string.Format(T("DataPackageFragmentInstaller.TypeLocalizedWithoutLocale"), parameter0); } 
 /// <summary>&quot;Referenced data missing. Type: {0}, {1}: &apos;{2}&apos;&quot;</summary> 
 public static string DataPackageFragmentInstaller_ReferencedDataMissing(object parameter0,object parameter1,object parameter2) { return string.Format(T("DataPackageFragmentInstaller.ReferencedDataMissing"), parameter0,parameter1,parameter2); } 
 /// <summary>&quot;Only one &apos;Types&apos; element allowed&quot;</summary> 
 public static string DataPackageFragmentUninstaller_OnlyOneElement { get { return T("DataPackageFragmentUninstaller.OnlyOneElement"); } } 
 /// <summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
 public static string DataPackageFragmentUninstaller_MissingAttribute(object parameter0) { return string.Format(T("DataPackageFragmentUninstaller.MissingAttribute"), parameter0); } 
 /// <summary>&quot;The data type &apos;{0}&apos; does not contain a key property named &apos;{1}&apos;&quot;</summary> 
 public static string DataPackageFragmentUninstaller_MissingKeyProperty(object parameter0,object parameter1) { return string.Format(T("DataPackageFragmentUninstaller.MissingKeyProperty"), parameter0,parameter1); } 
 /// <summary>&quot;Data item &apos;{0}&apos; of type {1} is referenced from a data item &apos;{2}&apos; of type &apos;{3}&apos;&quot;</summary> 
 public static string DataPackageFragmentUninstaller_DataIsReferenced(object parameter0,object parameter1,object parameter2,object parameter3) { return string.Format(T("DataPackageFragmentUninstaller.DataIsReferenced"), parameter0,parameter1,parameter2,parameter3); } 
 /// <summary>&quot;Page type &apos;{0}&apos; is referenced by page &apos;{1}&apos;&quot;</summary> 
 public static string DataPackageFragmentUninstaller_PageTypeIsReferenced(object parameter0,object parameter1) { return string.Format(T("DataPackageFragmentUninstaller.PageTypeIsReferenced"), parameter0,parameter1); } 
 /// <summary>&quot;Only one &apos;Types&apos; element allowed&quot;</summary> 
 public static string DataTypePackageFragmentInstaller_OnlyOneElement { get { return T("DataTypePackageFragmentInstaller.OnlyOneElement"); } } 
 /// <summary>&quot;Missing &apos;Types&apos; element&quot;</summary> 
 public static string DataTypePackageFragmentInstaller_MissingElement { get { return T("DataTypePackageFragmentInstaller.MissingElement"); } } 
 /// <summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
 public static string DataTypePackageFragmentInstaller_MissingAttribute(object parameter0) { return string.Format(T("DataTypePackageFragmentInstaller.MissingAttribute"), parameter0); } 
 /// <summary>&quot;The data interface type &apos;{0}&apos; has not been configured in the system&quot;</summary> 
 public static string DataTypePackageFragmentInstaller_TypeNotConfigured(object parameter0) { return string.Format(T("DataTypePackageFragmentInstaller.TypeNotConfigured"), parameter0); } 
 /// <summary>&quot;The data interface type &apos;{0}&apos; does not inherit the interface &apos;{1}&apos;&quot;</summary> 
 public static string DataTypePackageFragmentInstaller_TypeNotInheriting(object parameter0,object parameter1) { return string.Format(T("DataTypePackageFragmentInstaller.TypeNotInheriting"), parameter0,parameter1); } 
 /// <summary>&quot;The interface type &apos;{0}&apos; is already exists in the system&quot;</summary> 
 public static string DataTypePackageFragmentInstaller_TypeExists(object parameter0) { return string.Format(T("DataTypePackageFragmentInstaller.TypeExists"), parameter0); } 
 /// <summary>&quot;Failed to build a data type descriptor for interface &apos;{0}&apos;&quot;</summary> 
 public static string DataTypePackageFragmentInstaller_InterfaceCodeError(object parameter0) { return string.Format(T("DataTypePackageFragmentInstaller.InterfaceCodeError"), parameter0); } 
 /// <summary>&quot;Only one &apos;Types&apos; element allowed&quot;</summary> 
 public static string DataTypePackageFragmentUninstaller_OnlyOneElement { get { return T("DataTypePackageFragmentUninstaller.OnlyOneElement"); } } 
 /// <summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
 public static string DataTypePackageFragmentUninstaller_MissingAttribute(object parameter0) { return string.Format(T("DataTypePackageFragmentUninstaller.MissingAttribute"), parameter0); } 
 /// <summary>&quot;Wrong attribute format in the configuration&quot;</summary> 
 public static string DataTypePackageFragmentUninstaller_WrongAttributeFormat { get { return T("DataTypePackageFragmentUninstaller.WrongAttributeFormat"); } } 
 /// <summary>&quot;Only one &apos;Types&apos; element allowed&quot;</summary> 
 public static string DynamicDataTypePackageFragmentInstaller_OnlyOneElement { get { return T("DynamicDataTypePackageFragmentInstaller.OnlyOneElement"); } } 
 /// <summary>&quot;Missing &apos;Types&apos; element&quot;</summary> 
 public static string DynamicDataTypePackageFragmentInstaller_MissingElement { get { return T("DynamicDataTypePackageFragmentInstaller.MissingElement"); } } 
 /// <summary>&quot;Error xml parsing the dataTypeDescriptor attribute&quot;</summary> 
 public static string DynamicDataTypePackageFragmentInstaller_DataTypeDescriptorParseError { get { return T("DynamicDataTypePackageFragmentInstaller.DataTypeDescriptorParseError"); } } 
 /// <summary>&quot;Error while deserializing a DataType. Error text: {0}.&quot;</summary> 
 public static string DynamicDataTypePackageFragmentInstaller_DataTypeDescriptorDeserializeError(object parameter0) { return string.Format(T("DynamicDataTypePackageFragmentInstaller.DataTypeDescriptorDeserializeError"), parameter0); } 
 /// <summary>&quot;Cannot find a referenced type &apos;{0}&apos;.&quot;</summary> 
 public static string DynamicDataTypePackageFragmentInstaller_MissingReferencedType(object parameter0) { return string.Format(T("DynamicDataTypePackageFragmentInstaller.MissingReferencedType"), parameter0); } 
 /// <summary>&quot;The interface type &apos;{0}&apos; is already exists in the system&quot;</summary> 
 public static string DynamicDataTypePackageFragmentInstaller_TypeExists(object parameter0) { return string.Format(T("DynamicDataTypePackageFragmentInstaller.TypeExists"), parameter0); } 
 /// <summary>&quot;Only one &apos;Types&apos; element allowed&quot;</summary> 
 public static string DynamicDataTypePackageFragmentUninstaller_OnlyOneElement { get { return T("DynamicDataTypePackageFragmentUninstaller.OnlyOneElement"); } } 
 /// <summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
 public static string DynamicDataTypePackageFragmentUninstaller_MissingAttribute(object parameter0) { return string.Format(T("DynamicDataTypePackageFragmentUninstaller.MissingAttribute"), parameter0); } 
 /// <summary>&quot;Wrong attribute format in the configuration&quot;</summary> 
 public static string DynamicDataTypePackageFragmentUninstaller_WrongAttributeFormat { get { return T("DynamicDataTypePackageFragmentUninstaller.WrongAttributeFormat"); } } 
 /// <summary>&quot;Only one &apos;Files&apos; element allowed&quot;</summary> 
 public static string FilePackageFragmentInstaller_OnlyOneFilesElement { get { return T("FilePackageFragmentInstaller.OnlyOneFilesElement"); } } 
 /// <summary>&quot;Only one &apos;Directories&apos; element allowed&quot;</summary> 
 public static string FilePackageFragmentInstaller_OnlyOneDirectoriesElement { get { return T("FilePackageFragmentInstaller.OnlyOneDirectoriesElement"); } } 
 /// <summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
 public static string FilePackageFragmentInstaller_MissingAttribute(object parameter0) { return string.Format(T("FilePackageFragmentInstaller.MissingAttribute"), parameter0); } 
 /// <summary>&quot;The &apos;deleteTargetDirectory&apos; attribute can only be applied to directories, not files&quot;</summary> 
 public static string FilePackageFragmentInstaller_DeleteTargetDirectoryNotAllowed { get { return T("FilePackageFragmentInstaller.DeleteTargetDirectoryNotAllowed"); } } 
 /// <summary>&quot;Wrong attribute value format, bool value expected&quot;</summary> 
 public static string FilePackageFragmentInstaller_WrongAttributeBoolFormat { get { return T("FilePackageFragmentInstaller.WrongAttributeBoolFormat"); } } 
 /// <summary>&quot;The install zip-file does not contain the file &apos;{0}&apos;&quot;</summary> 
 public static string FilePackageFragmentInstaller_MissingFile(object parameter0) { return string.Format(T("FilePackageFragmentInstaller.MissingFile"), parameter0); } 
 /// <summary>&quot;The file &apos;{0}&apos; already exists&quot;</summary> 
 public static string FilePackageFragmentInstaller_FileExists(object parameter0) { return string.Format(T("FilePackageFragmentInstaller.FileExists"), parameter0); } 
 /// <summary>&quot;File &apos;{0}&apos; marked as &apos;Read Only&apos; and therefore cannot be overwritten.&quot;</summary> 
 public static string FilePackageFragmentInstaller_FileReadOnly(object parameter0) { return string.Format(T("FilePackageFragmentInstaller.FileReadOnly"), parameter0); } 
 /// <summary>&quot;The &apos;assemblyLoad&apos; attribute can only be applied to files, not directories&quot;</summary> 
 public static string FilePackageFragmentInstaller_AssemblyLoadNotAllowed { get { return T("FilePackageFragmentInstaller.AssemblyLoadNotAllowed"); } } 
 /// <summary>&quot;The &apos;onlyUpdate&apos; attribute can only be applied to files, not directories&quot;</summary> 
 public static string FilePackageFragmentInstaller_OnlyUpdateNotAllowed { get { return T("FilePackageFragmentInstaller.OnlyUpdateNotAllowed"); } } 
 /// <summary>&quot;The &apos;onlyUpdate&apos; attribute is not allowed in combination with the &apos;loadAssembly&apos; attribute&quot;</summary> 
 public static string FilePackageFragmentInstaller_OnlyUpdateNotAllowedWithLoadAssemlby { get { return T("FilePackageFragmentInstaller.OnlyUpdateNotAllowedWithLoadAssemlby"); } } 
 /// <summary>&quot;The &apos;onlyUpdate&apos; and &apos;onlyAdd&apos; attributes are now allowed on the same element&quot;</summary> 
 public static string FilePackageFragmentInstaller_OnlyUpdateAndOnlyAddNotAllowed { get { return T("FilePackageFragmentInstaller.OnlyUpdateAndOnlyAddNotAllowed"); } } 
 /// <summary>&quot;The &apos;onlyAdd&apos; and &apos;allowOverwrite&apos; attributes are now allowed on the same element&quot;</summary> 
 public static string FilePackageFragmentInstaller_OnlyAddAndAllowOverwriteNotAllowed { get { return T("FilePackageFragmentInstaller.OnlyAddAndAllowOverwriteNotAllowed"); } } 
 /// <summary>&quot;The install zip-file does not contain the directory &apos;{0}&apos;&quot;</summary> 
 public static string FilePackageFragmentInstaller_MissingDirectory(object parameter0) { return string.Format(T("FilePackageFragmentInstaller.MissingDirectory"), parameter0); } 
 /// <summary>&quot;Uninstall.xml contains file pathes, binded to the original website location, and therefore the package cannot be uninstalled safely.&quot;</summary> 
 public static string FilePackageFragmentInstaller_WrongBasePath { get { return T("FilePackageFragmentInstaller.WrongBasePath"); } } 
 /// <summary>&quot;Only one &apos;Files&apos; element allowed&quot;</summary> 
 public static string FilePackageFragmentUninstaller_OnlyOneFilesElement { get { return T("FilePackageFragmentUninstaller.OnlyOneFilesElement"); } } 
 /// <summary>&quot;Only one &apos;Areas&apos; element allowed&quot;</summary> 
 public static string VirtualElementProviderNodePackageFragmentInstaller_OnlyOneElement { get { return T("VirtualElementProviderNodePackageFragmentInstaller.OnlyOneElement"); } } 
 /// <summary>&quot;Could not find the type &apos;{0}&apos;&quot;</summary> 
 public static string VirtualElementProviderNodePackageFragmentInstaller_MissingType(object parameter0) { return string.Format(T("VirtualElementProviderNodePackageFragmentInstaller.MissingType"), parameter0); } 
 /// <summary>&quot;Could not find the icon &apos;{0}&apos;&quot;</summary> 
 public static string VirtualElementProviderNodePackageFragmentInstaller_MissingIcon(object parameter0) { return string.Format(T("VirtualElementProviderNodePackageFragmentInstaller.MissingIcon"), parameter0); } 
 /// <summary>&quot;Only one &apos;Areas&apos; element allowed&quot;</summary> 
 public static string VirtualElementProviderNodePackageFragmentUninstaller_OnlyOneElement { get { return T("VirtualElementProviderNodePackageFragmentUninstaller.OnlyOneElement"); } } 
 /// <summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
 public static string VirtualElementProviderNodePackageFragmentUninstaller_MissingAttribute(object parameter0) { return string.Format(T("VirtualElementProviderNodePackageFragmentUninstaller.MissingAttribute"), parameter0); } 
 /// <summary>&quot;File &apos;{0}&apos; not found&quot;</summary> 
 public static string FileXslTransformationPackageFragmentInstaller_FileNotFound(object parameter0) { return string.Format(T("FileXslTransformationPackageFragmentInstaller.FileNotFound"), parameter0); } 
 /// <summary>&quot;File &apos;{0}&apos; marked as &apos;Read Only&apos; and therefore cannot be overwritten.&quot;</summary> 
 public static string FileXslTransformationPackageFragmentInstaller_FileReadOnly(object parameter0) { return string.Format(T("FileXslTransformationPackageFragmentInstaller.FileReadOnly"), parameter0); } 
 /// <summary>&quot;File &apos;{0}&apos; was marked as &apos;Read Only&apos;. This file attribute was explicitly removed and the file was updated normally.&quot;</summary> 
 public static string FileXslTransformationPackageFragmentInstaller_FileReadOnlyOverride(object parameter0) { return string.Format(T("FileXslTransformationPackageFragmentInstaller.FileReadOnlyOverride"), parameter0); } 
 /// <summary>&quot;Only one &apos;PackageVersions&apos; element allowed&quot;</summary> 
 public static string PackageVersionBumperFragmentInstaller_OnlyOneElement { get { return T("PackageVersionBumperFragmentInstaller.OnlyOneElement"); } } 
 /// <summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
 public static string PackageVersionBumperFragmentInstaller_MissingAttribute(object parameter0) { return string.Format(T("PackageVersionBumperFragmentInstaller.MissingAttribute"), parameter0); } 
 /// <summary>&quot;Wrong attribute value format, Guid value expected&quot;</summary> 
 public static string PackageVersionBumperFragmentInstaller_WrongAttributeGuidFormat { get { return T("PackageVersionBumperFragmentInstaller.WrongAttributeGuidFormat"); } } 
 /// <summary>&quot;The package id duplicate: &apos;{0}&apos;&quot;</summary> 
 public static string PackageVersionBumperFragmentInstaller_PackageIdDuplicate(object parameter0) { return string.Format(T("PackageVersionBumperFragmentInstaller.PackageIdDuplicate"), parameter0); } 
 /// <summary>&quot;Wrong attribute value format, Version value expected (x.y.z)&quot;</summary> 
 public static string PackageVersionBumperFragmentInstaller_WrongAttributeVersionFormat { get { return T("PackageVersionBumperFragmentInstaller.WrongAttributeVersionFormat"); } } 
 /// <summary>&quot;Only one &apos;PackageVersions&apos; element allowed&quot;</summary> 
 public static string PackageVersionBumperFragmentUninstaller_OnlyOneElement { get { return T("PackageVersionBumperFragmentUninstaller.OnlyOneElement"); } } 
 /// <summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
 public static string PackageVersionBumperFragmentUninstaller_MissingAttribute(object parameter0) { return string.Format(T("PackageVersionBumperFragmentUninstaller.MissingAttribute"), parameter0); } 
 /// <summary>&quot;Wrong attribute value format, Guid value expected&quot;</summary> 
 public static string PackageVersionBumperFragmentUninstaller_WrongAttributeGuidFormat { get { return T("PackageVersionBumperFragmentUninstaller.WrongAttributeGuidFormat"); } } 
 /// <summary>&quot;The package id duplicate: &apos;{0}&apos;&quot;</summary> 
 public static string PackageVersionBumperFragmentUninstaller_PackageIdDuplicate(object parameter0) { return string.Format(T("PackageVersionBumperFragmentUninstaller.PackageIdDuplicate"), parameter0); } 
 /// <summary>&quot;Wrong attribute value format, Version value expected (x.y.z)&quot;</summary> 
 public static string PackageVersionBumperFragmentUninstaller_WrongAttributeVersionFormat { get { return T("PackageVersionBumperFragmentUninstaller.WrongAttributeVersionFormat"); } } 
 /// <summary>&quot;A public RSA key is missing in the package configuration&quot;</summary> 
 public static string PackageLicenseFragmentInstaller_MissingPublicKeyElement { get { return T("PackageLicenseFragmentInstaller.MissingPublicKeyElement"); } } 
 /// <summary>&quot;File &apos;{0}&apos; does not exist.&quot;</summary> 
 public static string FileModifyPackageFragmentInstaller_FileDoesNotExist(object parameter0) { return string.Format(T("FileModifyPackageFragmentInstaller.FileDoesNotExist"), parameter0); } 
 /// <summary>&quot;Invalid license key&quot;</summary> 
 public static string License_InvalidKeyTitle { get { return T("License.InvalidKeyTitle"); } } 
 /// <summary>&quot;The license key is invalid. You need to obtain a valid license key.&quot;</summary> 
 public static string License_InvalidKeyMessage { get { return T("License.InvalidKeyMessage"); } } 
 /// <summary>&quot;Trial period has expired&quot;</summary> 
 public static string License_ExpiredTitle { get { return T("License.ExpiredTitle"); } } 
 /// <summary>&quot;The trial period of the package has expired. You need to obtain a valid license.&quot;</summary> 
 public static string License_ExpiredMessage { get { return T("License.ExpiredMessage"); } } 
 /// <summary>&quot;Failed to get license information. ProductId: {0}&quot;</summary> 
 public static string License_Failed(object parameter0) { return string.Format(T("License.Failed"), parameter0); } 
 /// <summary>&quot;The Windows user under which this C1 instance is running does not have write permission to file or folder &apos;{0}&apos;.&quot;</summary> 
 public static string NotEnoughNtfsPermissions(object parameter0) { return string.Format(T("NotEnoughNtfsPermissions"), parameter0); } 
 /// <summary>&quot;Only one &apos;{0}&apos; element allowed&quot;</summary> 
 public static string PackageFragmentInstaller_OnlyOneElementAllowed(object parameter0) { return string.Format(T("PackageFragmentInstaller.OnlyOneElementAllowed"), parameter0); } 
 /// <summary>&quot;Unexpected element name &apos;{0}&apos;, only allowed element name is &apos;{1}&apos;&quot;</summary> 
 public static string PackageFragmentInstaller_IncorrectElement(object parameter0,object parameter1) { return string.Format(T("PackageFragmentInstaller.IncorrectElement"), parameter0,parameter1); } 
 /// <summary>&quot;Missing &apos;{0}&apos; attribute.&quot;</summary> 
 public static string PackageFragmentInstaller_MissingAttribute(object parameter0) { return string.Format(T("PackageFragmentInstaller.MissingAttribute"), parameter0); } 
 /// <summary>&quot;Missing element &apos;{0}&apos;.&quot;</summary> 
 public static string PackageFragmentInstaller_MissingElement(object parameter0) { return string.Format(T("PackageFragmentInstaller.MissingElement"), parameter0); } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Cultures {
 /// <summary>&quot;Afrikaans, South Africa&quot;</summary> 
 public static string af_ZA { get { return T("af-ZA"); } } 
 /// <summary>&quot;Albanian, Albania&quot;</summary> 
 public static string sq_AL { get { return T("sq-AL"); } } 
 /// <summary>&quot;Arabic, Algeria&quot;</summary> 
 public static string ar_DZ { get { return T("ar-DZ"); } } 
 /// <summary>&quot;Arabic, Bahrain&quot;</summary> 
 public static string ar_BH { get { return T("ar-BH"); } } 
 /// <summary>&quot;Arabic, Egypt&quot;</summary> 
 public static string ar_EG { get { return T("ar-EG"); } } 
 /// <summary>&quot;Arabic, Iraq&quot;</summary> 
 public static string ar_IQ { get { return T("ar-IQ"); } } 
 /// <summary>&quot;Arabic, Jordan&quot;</summary> 
 public static string ar_JO { get { return T("ar-JO"); } } 
 /// <summary>&quot;Arabic, Kuwait&quot;</summary> 
 public static string ar_KW { get { return T("ar-KW"); } } 
 /// <summary>&quot;Arabic, Lebanon&quot;</summary> 
 public static string ar_LB { get { return T("ar-LB"); } } 
 /// <summary>&quot;Arabic, Libya&quot;</summary> 
 public static string ar_LY { get { return T("ar-LY"); } } 
 /// <summary>&quot;Arabic, Morocco&quot;</summary> 
 public static string ar_MA { get { return T("ar-MA"); } } 
 /// <summary>&quot;Arabic, Oman&quot;</summary> 
 public static string ar_OM { get { return T("ar-OM"); } } 
 /// <summary>&quot;Arabic, Qatar&quot;</summary> 
 public static string ar_QA { get { return T("ar-QA"); } } 
 /// <summary>&quot;Arabic, Saudi Arabia&quot;</summary> 
 public static string ar_SA { get { return T("ar-SA"); } } 
 /// <summary>&quot;Arabic, Syria&quot;</summary> 
 public static string ar_SY { get { return T("ar-SY"); } } 
 /// <summary>&quot;Arabic, Tunisia&quot;</summary> 
 public static string ar_TN { get { return T("ar-TN"); } } 
 /// <summary>&quot;Arabic, U.A.E.&quot;</summary> 
 public static string ar_AE { get { return T("ar-AE"); } } 
 /// <summary>&quot;Arabic, Yemen&quot;</summary> 
 public static string ar_YE { get { return T("ar-YE"); } } 
 /// <summary>&quot;Armenian, Armenia&quot;</summary> 
 public static string hy_AM { get { return T("hy-AM"); } } 
 /// <summary>&quot;Azeri, Cyrillic Azerbaijan&quot;</summary> 
 public static string az_Cyrl_AZ { get { return T("az-Cyrl-AZ"); } } 
 /// <summary>&quot;Azeri, Latin Azerbaijan&quot;</summary> 
 public static string az_Latn_AZ { get { return T("az-Latn-AZ"); } } 
 /// <summary>&quot;Basque, Basque&quot;</summary> 
 public static string eu_ES { get { return T("eu-ES"); } } 
 /// <summary>&quot;Belarusian, Belarus&quot;</summary> 
 public static string be_BY { get { return T("be-BY"); } } 
 /// <summary>&quot;Bosnian, Bosnia and Herzegovina&quot;</summary> 
 public static string bs_Latn_BA { get { return T("bs-Latn-BA"); } } 
 /// <summary>&quot;Bosnian (Cyrillic) (Bosnia and Herzegovina)&quot;</summary> 
 public static string bs_Cyrl_BA { get { return T("bs-Cyrl-BA"); } } 
 /// <summary>&quot;Bulgarian, Bulgaria&quot;</summary> 
 public static string bg_BG { get { return T("bg-BG"); } } 
 /// <summary>&quot;Catalan, Catalan&quot;</summary> 
 public static string ca_ES { get { return T("ca-ES"); } } 
 /// <summary>&quot;Chinese, Hong Kong S.A.R.&quot;</summary> 
 public static string zh_HK { get { return T("zh-HK"); } } 
 /// <summary>&quot;Chinese, Macao S.A.R.&quot;</summary> 
 public static string zh_MO { get { return T("zh-MO"); } } 
 /// <summary>&quot;Chinese, People&apos;s Republic of China&quot;</summary> 
 public static string zh_CN { get { return T("zh-CN"); } } 
 /// <summary>&quot;Chinese, Singapore&quot;</summary> 
 public static string zh_SG { get { return T("zh-SG"); } } 
 /// <summary>&quot;Chinese, Taiwan&quot;</summary> 
 public static string zh_TW { get { return T("zh-TW"); } } 
 /// <summary>&quot;Croatian, Bosnia and Herzegovina&quot;</summary> 
 public static string hr_BA { get { return T("hr-BA"); } } 
 /// <summary>&quot;Croatian, Croatia&quot;</summary> 
 public static string hr_HR { get { return T("hr-HR"); } } 
 /// <summary>&quot;Czech, Czech Republic&quot;</summary> 
 public static string cs_CZ { get { return T("cs-CZ"); } } 
 /// <summary>&quot;Danish&quot;</summary> 
 public static string da_DK { get { return T("da-DK"); } } 
 /// <summary>&quot;Divehi, Maldives&quot;</summary> 
 public static string dv_MV { get { return T("dv-MV"); } } 
 /// <summary>&quot;Dutch, Belgium&quot;</summary> 
 public static string nl_BE { get { return T("nl-BE"); } } 
 /// <summary>&quot;Dutch&quot;</summary> 
 public static string nl_NL { get { return T("nl-NL"); } } 
 /// <summary>&quot;English, Australia&quot;</summary> 
 public static string en_AU { get { return T("en-AU"); } } 
 /// <summary>&quot;English, Belize&quot;</summary> 
 public static string en_BZ { get { return T("en-BZ"); } } 
 /// <summary>&quot;English, Canada&quot;</summary> 
 public static string en_CA { get { return T("en-CA"); } } 
 /// <summary>&quot;English, Caribbean&quot;</summary> 
 public static string en_029 { get { return T("en-029"); } } 
 /// <summary>&quot;English, Ireland&quot;</summary> 
 public static string en_IE { get { return T("en-IE"); } } 
 /// <summary>&quot;English, Jamaica&quot;</summary> 
 public static string en_JM { get { return T("en-JM"); } } 
 /// <summary>&quot;English, New Zealand&quot;</summary> 
 public static string en_NZ { get { return T("en-NZ"); } } 
 /// <summary>&quot;English, Republic of the Philippines&quot;</summary> 
 public static string en_PH { get { return T("en-PH"); } } 
 /// <summary>&quot;English, South Africa&quot;</summary> 
 public static string en_ZA { get { return T("en-ZA"); } } 
 /// <summary>&quot;English, Trinidad and Tobago&quot;</summary> 
 public static string en_TT { get { return T("en-TT"); } } 
 /// <summary>&quot;English, UK&quot;</summary> 
 public static string en_GB { get { return T("en-GB"); } } 
 /// <summary>&quot;English, US&quot;</summary> 
 public static string en_US { get { return T("en-US"); } } 
 /// <summary>&quot;English, Zimbabwe&quot;</summary> 
 public static string en_ZW { get { return T("en-ZW"); } } 
 /// <summary>&quot;Estonian, Estonia&quot;</summary> 
 public static string et_EE { get { return T("et-EE"); } } 
 /// <summary>&quot;Faroese, Faroe Islands&quot;</summary> 
 public static string fo_FO { get { return T("fo-FO"); } } 
 /// <summary>&quot;Filipino, Philippines&quot;</summary> 
 public static string fil_PH { get { return T("fil-PH"); } } 
 /// <summary>&quot;Finnish&quot;</summary> 
 public static string fi_FI { get { return T("fi-FI"); } } 
 /// <summary>&quot;French, Belgium&quot;</summary> 
 public static string fr_BE { get { return T("fr-BE"); } } 
 /// <summary>&quot;French, Canada&quot;</summary> 
 public static string fr_CA { get { return T("fr-CA"); } } 
 /// <summary>&quot;French&quot;</summary> 
 public static string fr_FR { get { return T("fr-FR"); } } 
 /// <summary>&quot;French, Luxembourg&quot;</summary> 
 public static string fr_LU { get { return T("fr-LU"); } } 
 /// <summary>&quot;French, Principality of Monaco&quot;</summary> 
 public static string fr_MC { get { return T("fr-MC"); } } 
 /// <summary>&quot;French, Switzerland&quot;</summary> 
 public static string fr_CH { get { return T("fr-CH"); } } 
 /// <summary>&quot;Frisian, Netherlands&quot;</summary> 
 public static string fy_NL { get { return T("fy-NL"); } } 
 /// <summary>&quot;Gaelic, United Kingdom&quot;</summary> 
 public static string gd_GB { get { return T("gd-GB"); } } 
 /// <summary>&quot;Galician, Galician&quot;</summary> 
 public static string gl_ES { get { return T("gl-ES"); } } 
 /// <summary>&quot;Georgian, Georgia&quot;</summary> 
 public static string ka_GE { get { return T("ka-GE"); } } 
 /// <summary>&quot;German, Austria&quot;</summary> 
 public static string de_AT { get { return T("de-AT"); } } 
 /// <summary>&quot;German&quot;</summary> 
 public static string de_DE { get { return T("de-DE"); } } 
 /// <summary>&quot;German, Liechtenstein&quot;</summary> 
 public static string de_LI { get { return T("de-LI"); } } 
 /// <summary>&quot;German, Luxembourg&quot;</summary> 
 public static string de_LU { get { return T("de-LU"); } } 
 /// <summary>&quot;German, Switzerland&quot;</summary> 
 public static string de_CH { get { return T("de-CH"); } } 
 /// <summary>&quot;Greek, Greece&quot;</summary> 
 public static string el_GR { get { return T("el-GR"); } } 
 /// <summary>&quot;Greenlandic&quot;</summary> 
 public static string kl_GL { get { return T("kl-GL"); } } 
 /// <summary>&quot;Gujarati, India&quot;</summary> 
 public static string gu_IN { get { return T("gu-IN"); } } 
 /// <summary>&quot;Hebrew, Israel&quot;</summary> 
 public static string he_IL { get { return T("he-IL"); } } 
 /// <summary>&quot;Hindi, India&quot;</summary> 
 public static string hi_IN { get { return T("hi-IN"); } } 
 /// <summary>&quot;Hungarian, Hungary&quot;</summary> 
 public static string hu_HU { get { return T("hu-HU"); } } 
 /// <summary>&quot;Icelandic, Iceland&quot;</summary> 
 public static string is_IS { get { return T("is-IS"); } } 
 /// <summary>&quot;Indonesian, Indonesia&quot;</summary> 
 public static string id_ID { get { return T("id-ID"); } } 
 /// <summary>&quot;Inuktitut (Latin) (Canada)&quot;</summary> 
 public static string iu_Latn_CA { get { return T("iu-Latn-CA"); } } 
 /// <summary>&quot;Irish, Ireland&quot;</summary> 
 public static string ga_IE { get { return T("ga-IE"); } } 
 /// <summary>&quot;Italian&quot;</summary> 
 public static string it_IT { get { return T("it-IT"); } } 
 /// <summary>&quot;Italian, Switzerland&quot;</summary> 
 public static string it_CH { get { return T("it-CH"); } } 
 /// <summary>&quot;Japanese, Japan&quot;</summary> 
 public static string ja_JP { get { return T("ja-JP"); } } 
 /// <summary>&quot;Kannada, India&quot;</summary> 
 public static string kn_IN { get { return T("kn-IN"); } } 
 /// <summary>&quot;Kazakh, Kazakhstan&quot;</summary> 
 public static string kk_KZ { get { return T("kk-KZ"); } } 
 /// <summary>&quot;Kiswahili, Kenya&quot;</summary> 
 public static string sw_KE { get { return T("sw-KE"); } } 
 /// <summary>&quot;Konkani, India&quot;</summary> 
 public static string kok_IN { get { return T("kok-IN"); } } 
 /// <summary>&quot;Korean, Korea&quot;</summary> 
 public static string ko_KR { get { return T("ko-KR"); } } 
 /// <summary>&quot;Kyrgyz, Kyrgyzstan&quot;</summary> 
 public static string ky_KG { get { return T("ky-KG"); } } 
 /// <summary>&quot;Latvian, Latvia&quot;</summary> 
 public static string lv_LV { get { return T("lv-LV"); } } 
 /// <summary>&quot;Lithuanian, Lithuania&quot;</summary> 
 public static string lt_LT { get { return T("lt-LT"); } } 
 /// <summary>&quot;Luxembourgish, Luxembourg&quot;</summary> 
 public static string lb_LU { get { return T("lb-LU"); } } 
 /// <summary>&quot;Macedonian, Former Yugoslav Republic of Macedonia&quot;</summary> 
 public static string mk_MK { get { return T("mk-MK"); } } 
 /// <summary>&quot;Malay, Brunei Darussalam&quot;</summary> 
 public static string ms_BN { get { return T("ms-BN"); } } 
 /// <summary>&quot;Malay, Malaysia&quot;</summary> 
 public static string ms_MY { get { return T("ms-MY"); } } 
 /// <summary>&quot;Maltese, Malta&quot;</summary> 
 public static string mt_MT { get { return T("mt-MT"); } } 
 /// <summary>&quot;Maori, New Zealand&quot;</summary> 
 public static string mi_NZ { get { return T("mi-NZ"); } } 
 /// <summary>&quot;Mapudungun, Chile&quot;</summary> 
 public static string arn_CL { get { return T("arn-CL"); } } 
 /// <summary>&quot;Marathi, India&quot;</summary> 
 public static string mr_IN { get { return T("mr-IN"); } } 
 /// <summary>&quot;Mohawk, Canada&quot;</summary> 
 public static string moh_CA { get { return T("moh-CA"); } } 
 /// <summary>&quot;Mongolian, Cyrillic Mongolia&quot;</summary> 
 public static string mn_MN { get { return T("mn-MN"); } } 
 /// <summary>&quot;Norwegian Bokmål&quot;</summary> 
 public static string nb_NO { get { return T("nb-NO"); } } 
 /// <summary>&quot;Norwegian Nynorsk, Norway&quot;</summary> 
 public static string nn_NO { get { return T("nn-NO"); } } 
 /// <summary>&quot;Persian, Iran&quot;</summary> 
 public static string fa_IR { get { return T("fa-IR"); } } 
 /// <summary>&quot;Polish, Poland&quot;</summary> 
 public static string pl_PL { get { return T("pl-PL"); } } 
 /// <summary>&quot;Portuguese, Brazil&quot;</summary> 
 public static string pt_BR { get { return T("pt-BR"); } } 
 /// <summary>&quot;Portuguese, Portugal&quot;</summary> 
 public static string pt_PT { get { return T("pt-PT"); } } 
 /// <summary>&quot;Punjabi, India&quot;</summary> 
 public static string pa_IN { get { return T("pa-IN"); } } 
 /// <summary>&quot;Quechua, Bolivia&quot;</summary> 
 public static string quz_BO { get { return T("quz-BO"); } } 
 /// <summary>&quot;Quechua, Ecuador&quot;</summary> 
 public static string quz_EC { get { return T("quz-EC"); } } 
 /// <summary>&quot;Quechua, Peru&quot;</summary> 
 public static string quz_PE { get { return T("quz-PE"); } } 
 /// <summary>&quot;Romanian, Romania&quot;</summary> 
 public static string ro_RO { get { return T("ro-RO"); } } 
 /// <summary>&quot;Romansh, Switzerland&quot;</summary> 
 public static string rm_CH { get { return T("rm-CH"); } } 
 /// <summary>&quot;Russian, Russia&quot;</summary> 
 public static string ru_RU { get { return T("ru-RU"); } } 
 /// <summary>&quot;Sami (Inari) (Finland)&quot;</summary> 
 public static string smn_FI { get { return T("smn-FI"); } } 
 /// <summary>&quot;Sami (Lule) (Norway)&quot;</summary> 
 public static string smj_NO { get { return T("smj-NO"); } } 
 /// <summary>&quot;Sami (Lule) (Sweden)&quot;</summary> 
 public static string smj_SE { get { return T("smj-SE"); } } 
 /// <summary>&quot;Sami (Northern) (Finland)&quot;</summary> 
 public static string se_FI { get { return T("se-FI"); } } 
 /// <summary>&quot;Sami (Northern) (Norway)&quot;</summary> 
 public static string se_NO { get { return T("se-NO"); } } 
 /// <summary>&quot;Sami&quot;</summary> 
 public static string se_SE { get { return T("se-SE"); } } 
 /// <summary>&quot;Sami (Skolt) (Finland)&quot;</summary> 
 public static string sms_FI { get { return T("sms-FI"); } } 
 /// <summary>&quot;Sami (Southern) (Norway)&quot;</summary> 
 public static string sma_NO { get { return T("sma-NO"); } } 
 /// <summary>&quot;Sami (Southern) (Sweden)&quot;</summary> 
 public static string sma_SE { get { return T("sma-SE"); } } 
 /// <summary>&quot;Sanskrit, India&quot;</summary> 
 public static string sa_IN { get { return T("sa-IN"); } } 
 /// <summary>&quot;Serbian, Cyrillic (Bosnia and Herzegovina)&quot;</summary> 
 public static string sr_Cyrl_BA { get { return T("sr-Cyrl-BA"); } } 
 /// <summary>&quot;Serbian, Cyrillic (Montenegro)&quot;</summary> 
 public static string sr_Cyrl_ME { get { return T("sr-Cyrl-ME"); } } 
 /// <summary>&quot;Serbian, Cyrillic (Serbia and Montenegro - former)&quot;</summary> 
 public static string sr_Cyrl_CS { get { return T("sr-Cyrl-CS"); } } 
 /// <summary>&quot;Serbian, Cyrillic (Serbia)&quot;</summary> 
 public static string sr_Cyrl_RS { get { return T("sr-Cyrl-RS"); } } 
 /// <summary>&quot;Serbian, Latin (Bosnia and Herzegovina)&quot;</summary> 
 public static string sr_Latn_BA { get { return T("sr-Latn-BA"); } } 
 /// <summary>&quot;Serbian, Latin (Montenegro)&quot;</summary> 
 public static string sr_Latn_ME { get { return T("sr-Latn-ME"); } } 
 /// <summary>&quot;Serbian, Latin (Serbia and Montenegro - former)&quot;</summary> 
 public static string sr_Latn_CS { get { return T("sr-Latn-CS"); } } 
 /// <summary>&quot;Serbian, Latin (Serbia)&quot;</summary> 
 public static string sr_Latn_RS { get { return T("sr-Latn-RS"); } } 
 /// <summary>&quot;Sesotho sa Leboa, South Africa&quot;</summary> 
 public static string ns_ZA { get { return T("ns-ZA"); } } 
 /// <summary>&quot;Setswana, South Africa&quot;</summary> 
 public static string tn_ZA { get { return T("tn-ZA"); } } 
 /// <summary>&quot;Slovak, Slovakia&quot;</summary> 
 public static string sk_SK { get { return T("sk-SK"); } } 
 /// <summary>&quot;Slovenian, Slovenia&quot;</summary> 
 public static string sl_SI { get { return T("sl-SI"); } } 
 /// <summary>&quot;Spanish, Argentina&quot;</summary> 
 public static string es_AR { get { return T("es-AR"); } } 
 /// <summary>&quot;Spanish, Bolivia&quot;</summary> 
 public static string es_BO { get { return T("es-BO"); } } 
 /// <summary>&quot;Spanish, Chile&quot;</summary> 
 public static string es_CL { get { return T("es-CL"); } } 
 /// <summary>&quot;Spanish, Colombia&quot;</summary> 
 public static string es_CO { get { return T("es-CO"); } } 
 /// <summary>&quot;Spanish, Costa Rica&quot;</summary> 
 public static string es_CR { get { return T("es-CR"); } } 
 /// <summary>&quot;Spanish, Dominican Republic&quot;</summary> 
 public static string es_DO { get { return T("es-DO"); } } 
 /// <summary>&quot;Spanish, Ecuador&quot;</summary> 
 public static string es_EC { get { return T("es-EC"); } } 
 /// <summary>&quot;Spanish, El Salvador&quot;</summary> 
 public static string es_SV { get { return T("es-SV"); } } 
 /// <summary>&quot;Spanish, Guatemala&quot;</summary> 
 public static string es_GT { get { return T("es-GT"); } } 
 /// <summary>&quot;Spanish, Honduras&quot;</summary> 
 public static string es_HN { get { return T("es-HN"); } } 
 /// <summary>&quot;Spanish, Mexico&quot;</summary> 
 public static string es_MX { get { return T("es-MX"); } } 
 /// <summary>&quot;Spanish, Nicaragua&quot;</summary> 
 public static string es_NI { get { return T("es-NI"); } } 
 /// <summary>&quot;Spanish, Panama&quot;</summary> 
 public static string es_PA { get { return T("es-PA"); } } 
 /// <summary>&quot;Spanish, Paraguay&quot;</summary> 
 public static string es_PY { get { return T("es-PY"); } } 
 /// <summary>&quot;Spanish, Peru&quot;</summary> 
 public static string es_PE { get { return T("es-PE"); } } 
 /// <summary>&quot;Spanish, Puerto Rico&quot;</summary> 
 public static string es_PR { get { return T("es-PR"); } } 
 /// <summary>&quot;Spanish&quot;</summary> 
 public static string es_ES { get { return T("es-ES"); } } 
 /// <summary>&quot;Spanish, Uruguay&quot;</summary> 
 public static string es_UY { get { return T("es-UY"); } } 
 /// <summary>&quot;Spanish, Venezuela&quot;</summary> 
 public static string es_VE { get { return T("es-VE"); } } 
 /// <summary>&quot;Swedish, Finland&quot;</summary> 
 public static string sv_FI { get { return T("sv-FI"); } } 
 /// <summary>&quot;Swedish&quot;</summary> 
 public static string sv_SE { get { return T("sv-SE"); } } 
 /// <summary>&quot;Syriac, Syria&quot;</summary> 
 public static string syr_SY { get { return T("syr-SY"); } } 
 /// <summary>&quot;Tamil, India&quot;</summary> 
 public static string ta_IN { get { return T("ta-IN"); } } 
 /// <summary>&quot;Tatar, Russia&quot;</summary> 
 public static string tt_RU { get { return T("tt-RU"); } } 
 /// <summary>&quot;Telugu, India&quot;</summary> 
 public static string te_IN { get { return T("te-IN"); } } 
 /// <summary>&quot;Thai, Thailand&quot;</summary> 
 public static string th_TH { get { return T("th-TH"); } } 
 /// <summary>&quot;Turkish, Turkey&quot;</summary> 
 public static string tr_TR { get { return T("tr-TR"); } } 
 /// <summary>&quot;Ukrainian, Ukraine&quot;</summary> 
 public static string uk_UA { get { return T("uk-UA"); } } 
 /// <summary>&quot;Urdu, Islamic Republic of Pakistan&quot;</summary> 
 public static string ur_PK { get { return T("ur-PK"); } } 
 /// <summary>&quot;Uzbek, Cyrillic Uzbekistan&quot;</summary> 
 public static string uz_Cyrl_UZ { get { return T("uz-Cyrl-UZ"); } } 
 /// <summary>&quot;Uzbek, Latin Uzbekistan&quot;</summary> 
 public static string uz_Latn_UZ { get { return T("uz-Latn-UZ"); } } 
 /// <summary>&quot;Vietnamese, Vietnam&quot;</summary> 
 public static string vi_VN { get { return T("vi-VN"); } } 
 /// <summary>&quot;Welsh, United Kingdom&quot;</summary> 
 public static string cy_GB { get { return T("cy-GB"); } } 
 /// <summary>&quot;Xhosa, South Africa&quot;</summary> 
 public static string xh_ZA { get { return T("xh-ZA"); } } 
 /// <summary>&quot;Zulu, South Africa&quot;</summary> 
 public static string zu_ZA { get { return T("zu-ZA"); } } 
 /// <summary>&quot;Alsatian, France&quot;</summary> 
 public static string gsw_FR { get { return T("gsw-FR"); } } 
 /// <summary>&quot;Amharic, Ethiopia&quot;</summary> 
 public static string am_ET { get { return T("am-ET"); } } 
 /// <summary>&quot;Assamese, India&quot;</summary> 
 public static string as_IN { get { return T("as-IN"); } } 
 /// <summary>&quot;Bashkir, Russia&quot;</summary> 
 public static string ba_RU { get { return T("ba-RU"); } } 
 /// <summary>&quot;Bengali, Bangladesh&quot;</summary> 
 public static string bn_BD { get { return T("bn-BD"); } } 
 /// <summary>&quot;Bengali, India&quot;</summary> 
 public static string bn_IN { get { return T("bn-IN"); } } 
 /// <summary>&quot;Breton, France&quot;</summary> 
 public static string br_FR { get { return T("br-FR"); } } 
 /// <summary>&quot;Corsican, France&quot;</summary> 
 public static string co_FR { get { return T("co-FR"); } } 
 /// <summary>&quot;Dari, Afghanistan&quot;</summary> 
 public static string prs_AF { get { return T("prs-AF"); } } 
 /// <summary>&quot;English, India&quot;</summary> 
 public static string en_IN { get { return T("en-IN"); } } 
 /// <summary>&quot;English, Malaysia&quot;</summary> 
 public static string en_MY { get { return T("en-MY"); } } 
 /// <summary>&quot;English, Singapore&quot;</summary> 
 public static string en_SG { get { return T("en-SG"); } } 
 /// <summary>&quot;Hausa (Latin) (Nigeria)&quot;</summary> 
 public static string ha_Latn_NG { get { return T("ha-Latn-NG"); } } 
 /// <summary>&quot;Igbo, Nigeria&quot;</summary> 
 public static string ig_NG { get { return T("ig-NG"); } } 
 /// <summary>&quot;Inuktitut, Canada&quot;</summary> 
 public static string iu_Cans_CA { get { return T("iu-Cans-CA"); } } 
 /// <summary>&quot;Khmer, Cambodia&quot;</summary> 
 public static string km_KH { get { return T("km-KH"); } } 
 /// <summary>&quot;K&apos;iche, Guatemala&quot;</summary> 
 public static string qut_GT { get { return T("qut-GT"); } } 
 /// <summary>&quot;Kinyarwanda, Rwanda&quot;</summary> 
 public static string rw_RW { get { return T("rw-RW"); } } 
 /// <summary>&quot;Lao, Lao P.D.R.&quot;</summary> 
 public static string lo_LA { get { return T("lo-LA"); } } 
 /// <summary>&quot;Lower Sorbian, Germany&quot;</summary> 
 public static string dsb_DE { get { return T("dsb-DE"); } } 
 /// <summary>&quot;Malayalam, India&quot;</summary> 
 public static string ml_IN { get { return T("ml-IN"); } } 
 /// <summary>&quot;Mongolian (Traditional Mongolian) (People&apos;s Republic of China)&quot;</summary> 
 public static string mn_Mong_CN { get { return T("mn-Mong-CN"); } } 
 /// <summary>&quot;Nepali, Nepal&quot;</summary> 
 public static string ne_NP { get { return T("ne-NP"); } } 
 /// <summary>&quot;Occitan, France&quot;</summary> 
 public static string oc_FR { get { return T("oc-FR"); } } 
 /// <summary>&quot;Oriya, India&quot;</summary> 
 public static string or_IN { get { return T("or-IN"); } } 
 /// <summary>&quot;Pashto, Afghanistan&quot;</summary> 
 public static string ps_AF { get { return T("ps-AF"); } } 
 /// <summary>&quot;Sesotho sa Leboa, South Africa&quot;</summary> 
 public static string nso_ZA { get { return T("nso-ZA"); } } 
 /// <summary>&quot;Sinhala, Sri Lanka&quot;</summary> 
 public static string si_LK { get { return T("si-LK"); } } 
 /// <summary>&quot;Spanish, United States&quot;</summary> 
 public static string es_US { get { return T("es-US"); } } 
 /// <summary>&quot;Tajik (Cyrillic) (Tajikistan)&quot;</summary> 
 public static string tg_Cyrl_TJ { get { return T("tg-Cyrl-TJ"); } } 
 /// <summary>&quot;Tamazight (Latin) (Algeria)&quot;</summary> 
 public static string tzm_Latn_DZ { get { return T("tzm-Latn-DZ"); } } 
 /// <summary>&quot;Tibetan, People&apos;s Republic of China&quot;</summary> 
 public static string bo_CN { get { return T("bo-CN"); } } 
 /// <summary>&quot;Turkmen, Turkmenistan&quot;</summary> 
 public static string tk_TM { get { return T("tk-TM"); } } 
 /// <summary>&quot;Uighur, People&apos;s Republic of China&quot;</summary> 
 public static string ug_CN { get { return T("ug-CN"); } } 
 /// <summary>&quot;Upper Sorbian, Germany&quot;</summary> 
 public static string hsb_DE { get { return T("hsb-DE"); } } 
 /// <summary>&quot;Wolof, Senegal&quot;</summary> 
 public static string wo_SN { get { return T("wo-SN"); } } 
 /// <summary>&quot;Yakut, Russia&quot;</summary> 
 public static string sah_RU { get { return T("sah-RU"); } } 
 /// <summary>&quot;Yi, People&apos;s Republic of China&quot;</summary> 
 public static string ii_CN { get { return T("ii-CN"); } } 
 /// <summary>&quot;Yoruba, Nigeria&quot;</summary> 
 public static string yo_NG { get { return T("yo-NG"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Cultures", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_EntityTokenLocked {
 /// <summary>&quot;This item is currently being edited&quot;</summary> 
 public static string LayoutLabel { get { return T("LayoutLabel"); } } 
 /// <summary>&quot;Information&quot;</summary> 
 public static string LockedByUsername_FieldGroupLabel { get { return T("LockedByUsername.FieldGroupLabel"); } } 
 /// <summary>&quot;The item is edited by:&quot;</summary> 
 public static string LockedByUsername_Label { get { return T("LockedByUsername.Label"); } } 
 /// <summary>&quot;Another user is editing this item. Press OK to proceed or cancel to abort.&quot;</summary> 
 public static string LockedByUsername_Help { get { return T("LockedByUsername.Help"); } } 
 /// <summary>&quot;You are editing this item in another tab - continue?&quot;</summary> 
 public static string SameUserHeading_Title { get { return T("SameUserHeading.Title"); } } 
 /// <summary>&quot;Press OK to proceed opening the item or Cancel to abort.&quot;</summary> 
 public static string SameUserHeading_Description { get { return T("SameUserHeading.Description"); } } 
 /// <summary>&quot;Another user is editing this item - continue?&quot;</summary> 
 public static string AnotherUserHeading_Title { get { return T("AnotherUserHeading.Title"); } } 
 /// <summary>&quot;If the item is changed simultaneously by multiple users changes may get lost. Press OK to proceed or cancel to abort.&quot;</summary> 
 public static string AnotherUserHeading_Description { get { return T("AnotherUserHeading.Description"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.EntityTokenLocked", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_GeneratedTypes {
 /// <summary>&quot;One or more types are referencing this type. Renaming is not possible&quot;</summary> 
 public static string TypesAreReferencing { get { return T("TypesAreReferencing"); } } 
 /// <summary>&quot;The type name &apos;{0}&apos; appears in the namespace &apos;{1}&apos; - this is not allowed&quot;</summary> 
 public static string TypeNameInNamespace(object parameter0,object parameter1) { return string.Format(T("TypeNameInNamespace"), parameter0,parameter1); } 
 /// <summary>&quot;A type with the same name already exists&quot;</summary> 
 public static string TypesNameClash { get { return T("TypesNameClash"); } } 
 /// <summary>&quot;No fields added&quot;</summary> 
 public static string MissingFields { get { return T("MissingFields"); } } 
 /// <summary>&quot;The type name &apos;{0}&apos; is not a valid identifier.&quot;</summary> 
 public static string TypeNameIsInvalidIdentifier(object parameter0) { return string.Format(T("TypeNameIsInvalidIdentifier"), parameter0); } 
 /// <summary>&quot;The field name &apos;{0}&apos; can not be used&quot;</summary> 
 public static string FieldNameCannotBeUsed(object parameter0) { return string.Format(T("FieldNameCannotBeUsed"), parameter0); } 
 /// <summary>&quot;The specified &apos;Type namespace&apos; is already in use as a &apos;Type name&apos; (namespace + name). Consider changing the name of &apos;{0}&apos; to &apos;{0}.Item&apos;.&quot;</summary> 
 public static string NameSpaceIsTypeTypeName(object parameter0) { return string.Format(T("NameSpaceIsTypeTypeName"), parameter0); } 
 /// <summary>&quot;Type name belongs to a reserved namespace.&quot;</summary> 
 public static string NamespaceIsReserved { get { return T("NamespaceIsReserved"); } } 
 /// <summary>&quot;Cannot add a data type since it will cause some compilation errors.&quot;</summary> 
 public static string CompileErrorWhileAddingType { get { return T("CompileErrorWhileAddingType"); } } 
 /// <summary>&quot;Cannot change a data type since it will cause some compilation errors.&quot;</summary> 
 public static string CompileErrorWhileChangingType { get { return T("CompileErrorWhileChangingType"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.GeneratedTypes", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Management {
 /// <summary>&quot;Edit Permissions&quot;</summary> 
 public static string ManageUserPermissions_ManageUserPermissionsOnBranchLabel { get { return T("ManageUserPermissions.ManageUserPermissionsOnBranchLabel"); } } 
 /// <summary>&quot;Edit Permissions&quot;</summary> 
 public static string ManageUserPermissions_ManageUserPermissionsOnItemLabel { get { return T("ManageUserPermissions.ManageUserPermissionsOnItemLabel"); } } 
 /// <summary>&quot;Global Permissions&quot;</summary> 
 public static string ManageUserPermissions_ManageGlobalUserPermissionsLabel { get { return T("ManageUserPermissions.ManageGlobalUserPermissionsLabel"); } } 
 /// <summary>&quot;Manage user permissions&quot;</summary> 
 public static string ManageUserPermissions_ManageUserPermissionsToolTip { get { return T("ManageUserPermissions.ManageUserPermissionsToolTip"); } } 
 /// <summary>&quot;Metadata&quot;</summary> 
 public static string DataCompositionVisabilityFacade_DefaultContainerLabel { get { return T("DataCompositionVisabilityFacade.DefaultContainerLabel"); } } 
 /// <summary>&quot;Delete User?&quot;</summary> 
 public static string Website_Forms_Administrative_DeleteUserStep1_LabelFieldGroup { get { return T("Website.Forms.Administrative.DeleteUserStep1.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete the selected user?&quot;</summary> 
 public static string Website_Forms_Administrative_DeleteUserStep1_Text { get { return T("Website.Forms.Administrative.DeleteUserStep1.Text"); } } 
 /// <summary>&quot;Cascade delete error&quot;</summary> 
 public static string DeleteUserWorkflow_CascadeDeleteErrorTitle { get { return T("DeleteUserWorkflow.CascadeDeleteErrorTitle"); } } 
 /// <summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
 public static string DeleteUserWorkflow_CascadeDeleteErrorMessage { get { return T("DeleteUserWorkflow.CascadeDeleteErrorMessage"); } } 
 /// <summary>&quot;Cannot delete a user&quot;</summary> 
 public static string DeleteUserWorkflow_DeleteSelfTitle { get { return T("DeleteUserWorkflow.DeleteSelfTitle"); } } 
 /// <summary>&quot;You can not delete an account you logged in as.&quot;</summary> 
 public static string DeleteUserWorkflow_DeleteSelfErrorMessage { get { return T("DeleteUserWorkflow.DeleteSelfErrorMessage"); } } 
 /// <summary>&quot;Select Function&quot;</summary> 
 public static string Website_Function_SelectDialog_Title { get { return T("Website.Function.SelectDialog.Title"); } } 
 /// <summary>&quot;Select Widget&quot;</summary> 
 public static string Website_Widget_SelectDialog_Title { get { return T("Website.Widget.SelectDialog.Title"); } } 
 /// <summary>&quot;Select Page or File&quot;</summary> 
 public static string Website_ContentLink_SelectDialog_Title { get { return T("Website.ContentLink.SelectDialog.Title"); } } 
 /// <summary>&quot;Select Page&quot;</summary> 
 public static string Website_Page_SelectDialog_Title { get { return T("Website.Page.SelectDialog.Title"); } } 
 /// <summary>&quot;Select Frontend File&quot;</summary> 
 public static string Website_FrontendFile_SelectDialog_Title { get { return T("Website.FrontendFile.SelectDialog.Title"); } } 
 /// <summary>&quot;Select Media&quot;</summary> 
 public static string Website_Media_SelectDialog_Title { get { return T("Website.Media.SelectDialog.Title"); } } 
 /// <summary>&quot;Select Image&quot;</summary> 
 public static string Website_Image_SelectDialog_Title { get { return T("Website.Image.SelectDialog.Title"); } } 
 /// <summary>&quot;Select Folder&quot;</summary> 
 public static string Website_Folder_SelectDialog_Title { get { return T("Website.Folder.SelectDialog.Title"); } } 
 /// <summary>&quot;General settings&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_LabelFieldGroup { get { return T("Website.Forms.Administrative.EditUserStep1.LabelFieldGroup"); } } 
 /// <summary>&quot;User name&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_UserNameLabel { get { return T("Website.Forms.Administrative.EditUserStep1.UserNameLabel"); } } 
 /// <summary>&quot;User names can not be changed. This is a &apos;read only&apos; field.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_UserNameHelp { get { return T("Website.Forms.Administrative.EditUserStep1.UserNameHelp"); } } 
 /// <summary>&quot;Password&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_PasswordLabel { get { return T("Website.Forms.Administrative.EditUserStep1.PasswordLabel"); } } 
 /// <summary>&quot;The password has to be more than 6 characters long.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_PasswordHelp { get { return T("Website.Forms.Administrative.EditUserStep1.PasswordHelp"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_NameLabel { get { return T("Website.Forms.Administrative.EditUserStep1.NameLabel"); } } 
 /// <summary>&quot;The full name of the person using this account.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_NameHelp { get { return T("Website.Forms.Administrative.EditUserStep1.NameHelp"); } } 
 /// <summary>&quot;Email&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_EmailLabel { get { return T("Website.Forms.Administrative.EditUserStep1.EmailLabel"); } } 
 /// <summary>&quot;The e-mail address of the user (optional).&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_EmailHelp { get { return T("Website.Forms.Administrative.EditUserStep1.EmailHelp"); } } 
 /// <summary>&quot;Folder&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_GroupLabel { get { return T("Website.Forms.Administrative.EditUserStep1.GroupLabel"); } } 
 /// <summary>&quot;If you enter a folder name that does not already exist a new folder will be created.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_GroupHelp { get { return T("Website.Forms.Administrative.EditUserStep1.GroupHelp"); } } 
 /// <summary>&quot;C1 Console Localization&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_LabelLocalizationFieldGroup { get { return T("Website.Forms.Administrative.EditUserStep1.LabelLocalizationFieldGroup"); } } 
 /// <summary>&quot;Regional settings&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_CultureLabel { get { return T("Website.Forms.Administrative.EditUserStep1.CultureLabel"); } } 
 /// <summary>&quot;To change the way numbers, dates, and hours are displayed, select an entry from the list.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_CultureHelp { get { return T("Website.Forms.Administrative.EditUserStep1.CultureHelp"); } } 
 /// <summary>&quot;C1 Console Language&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_C1ConsoleLanguageLabel { get { return T("Website.Forms.Administrative.EditUserStep1.C1ConsoleLanguageLabel"); } } 
 /// <summary>&quot;Select the language to be used for labels, help texts, dialogs etc. The available options here are limited to languages installed. You may install more languages via the Package system, see Composite.Localization.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_C1ConsoleLanguageHelp { get { return T("Website.Forms.Administrative.EditUserStep1.C1ConsoleLanguageHelp"); } } 
 /// <summary>&quot;Perspectives&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActivePerspectiveFieldLabel { get { return T("Website.Forms.Administrative.EditUserStep1.ActivePerspectiveFieldLabel"); } } 
 /// <summary>&quot;Visible perspectives&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActivePerspectiveMultiSelectLabel { get { return T("Website.Forms.Administrative.EditUserStep1.ActivePerspectiveMultiSelectLabel"); } } 
 /// <summary>&quot;Select which perspectives should be visible when the user starts the C1 Console.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActivePerspectiveMultiSelectHelp { get { return T("Website.Forms.Administrative.EditUserStep1.ActivePerspectiveMultiSelectHelp"); } } 
 /// <summary>&quot;Global permissions&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_GlobalPermissionsFieldLabel { get { return T("Website.Forms.Administrative.EditUserStep1.GlobalPermissionsFieldLabel"); } } 
 /// <summary>&quot;Global permissions&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_GlobalPermissionsMultiSelectLabel { get { return T("Website.Forms.Administrative.EditUserStep1.GlobalPermissionsMultiSelectLabel"); } } 
 /// <summary>&quot;The Administrate permission grants the user access to manage user permissions and execute other administrative tasks. The Configure permission grants access to super user tasks.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_GlobalPermissionsMultiSelectHelp { get { return T("Website.Forms.Administrative.EditUserStep1.GlobalPermissionsMultiSelectHelp"); } } 
 /// <summary>&quot;The removal of your own administrative permission has been ignored. You still have administrative privileges.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_GlobalPermissions_IgnoredOwnAdministrativeRemoval { get { return T("Website.Forms.Administrative.EditUserStep1.GlobalPermissions.IgnoredOwnAdministrativeRemoval"); } } 
 /// <summary>&quot;Data language access&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActiveLocalesFieldLabel { get { return T("Website.Forms.Administrative.EditUserStep1.ActiveLocalesFieldLabel"); } } 
 /// <summary>&quot;Data Languages&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActiveLocalesMultiSelectLabel { get { return T("Website.Forms.Administrative.EditUserStep1.ActiveLocalesMultiSelectLabel"); } } 
 /// <summary>&quot;User has access to manage data in the selected languages.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActiveLocalesMultiSelectHelp { get { return T("Website.Forms.Administrative.EditUserStep1.ActiveLocalesMultiSelectHelp"); } } 
 /// <summary>&quot;Active content language&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActiveLocaleLabel { get { return T("Website.Forms.Administrative.EditUserStep1.ActiveLocaleLabel"); } } 
 /// <summary>&quot;The content language this user will edit.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActiveLocaleHelp { get { return T("Website.Forms.Administrative.EditUserStep1.ActiveLocaleHelp"); } } 
 /// <summary>&quot;The selected language is not checked in the data language section.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_ActiveLocaleNotChecked { get { return T("Website.Forms.Administrative.EditUserStep1.ActiveLocaleNotChecked"); } } 
 /// <summary>&quot;You must select at least one active language.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_NoActiveLocaleSelected { get { return T("Website.Forms.Administrative.EditUserStep1.NoActiveLocaleSelected"); } } 
 /// <summary>&quot;General&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_GenerelTabLabel { get { return T("Website.Forms.Administrative.EditUserStep1.GenerelTabLabel"); } } 
 /// <summary>&quot;Permissions&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_PermissionsTabLabel { get { return T("Website.Forms.Administrative.EditUserStep1.PermissionsTabLabel"); } } 
 /// <summary>&quot;Perspectives&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_PerspectivesTabLabel { get { return T("Website.Forms.Administrative.EditUserStep1.PerspectivesTabLabel"); } } 
 /// <summary>&quot;User Groups&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_UserGroupsFieldLabel { get { return T("Website.Forms.Administrative.EditUserStep1.UserGroupsFieldLabel"); } } 
 /// <summary>&quot;Select the user groups that the selected user should be a member of.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_UserGroupsMultiSelectHelp { get { return T("Website.Forms.Administrative.EditUserStep1.UserGroupsMultiSelectHelp"); } } 
 /// <summary>&quot;Is Locked&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_IsLockedLabel { get { return T("Website.Forms.Administrative.EditUserStep1.IsLockedLabel"); } } 
 /// <summary>&quot;User can not log in&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_IsLockedItemLabel { get { return T("Website.Forms.Administrative.EditUserStep1.IsLockedItemLabel"); } } 
 /// <summary>&quot;When checked the user will be forbidden from logging in.&quot;</summary> 
 public static string Website_Forms_Administrative_EditUserStep1_IsLockedHelp { get { return T("Website.Forms.Administrative.EditUserStep1.IsLockedHelp"); } } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string EditUserWorkflow_EditErrorTitle { get { return T("EditUserWorkflow.EditErrorTitle"); } } 
 /// <summary>&quot;You can not delete your own access rights to &apos;System&apos; perspective.&quot;</summary> 
 public static string EditUserWorkflow_EditOwnAccessToSystemPerspective { get { return T("EditUserWorkflow.EditOwnAccessToSystemPerspective"); } } 
 /// <summary>&quot;You can not lock your own account.&quot;</summary> 
 public static string EditUserWorkflow_LockingOwnUserAccount { get { return T("EditUserWorkflow.LockingOwnUserAccount"); } } 
 /// <summary>&quot;Users&quot;</summary> 
 public static string UserElementProvider_RootLabel { get { return T("UserElementProvider.RootLabel"); } } 
 /// <summary>&quot;Users&quot;</summary> 
 public static string UserElementProvider_RootToolTip { get { return T("UserElementProvider.RootToolTip"); } } 
 /// <summary>&quot;Add User...&quot;</summary> 
 public static string UserElementProvider_AddUserLabel { get { return T("UserElementProvider.AddUserLabel"); } } 
 /// <summary>&quot;Add new user&quot;</summary> 
 public static string UserElementProvider_AddUserToolTip { get { return T("UserElementProvider.AddUserToolTip"); } } 
 /// <summary>&quot;Edit User&quot;</summary> 
 public static string UserElementProvider_EditUserLabel { get { return T("UserElementProvider.EditUserLabel"); } } 
 /// <summary>&quot;Edit selected user&quot;</summary> 
 public static string UserElementProvider_EditUserToolTip { get { return T("UserElementProvider.EditUserToolTip"); } } 
 /// <summary>&quot;Delete User&quot;</summary> 
 public static string UserElementProvider_DeleteUserLabel { get { return T("UserElementProvider.DeleteUserLabel"); } } 
 /// <summary>&quot;Delete the selected user&quot;</summary> 
 public static string UserElementProvider_DeleteUserToolTip { get { return T("UserElementProvider.DeleteUserToolTip"); } } 
 /// <summary>&quot;Warning&quot;</summary> 
 public static string UserElementProvider_ChangeOtherActiveLocaleTitle { get { return T("UserElementProvider.ChangeOtherActiveLocaleTitle"); } } 
 /// <summary>&quot;You have change the active language for a user that is currently logged on. The users console will be reloaded and data might be lost.&quot;</summary> 
 public static string UserElementProvider_ChangeOtherActiveLocaleMessage { get { return T("UserElementProvider.ChangeOtherActiveLocaleMessage"); } } 
 /// <summary>&quot;Cleanup Required&quot;</summary> 
 public static string UserElementProvider_ChangeOtherActiveLocaleDialogTitle { get { return T("UserElementProvider.ChangeOtherActiveLocaleDialogTitle"); } } 
 /// <summary>&quot;This requires a stage cleanup. Active editors will be saved and closed.&quot;</summary> 
 public static string UserElementProvider_ChangeOtherActiveLocaleDialogText { get { return T("UserElementProvider.ChangeOtherActiveLocaleDialogText"); } } 
 /// <summary>&quot;A user with the same name already exists&quot;</summary> 
 public static string AddNewUserWorkflow_UsernameDuplicateError { get { return T("AddNewUserWorkflow.UsernameDuplicateError"); } } 
 /// <summary>&quot;Add New User&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_LabelFieldGroup { get { return T("Website.Forms.Administrative.AddNewUserStep1.LabelFieldGroup"); } } 
 /// <summary>&quot;User name&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_UserNameLabel { get { return T("Website.Forms.Administrative.AddNewUserStep1.UserNameLabel"); } } 
 /// <summary>&quot;When you have created a new user the username cannot be changed.&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_UserNameHelp { get { return T("Website.Forms.Administrative.AddNewUserStep1.UserNameHelp"); } } 
 /// <summary>&quot;Password&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_PasswordLabel { get { return T("Website.Forms.Administrative.AddNewUserStep1.PasswordLabel"); } } 
 /// <summary>&quot;The password has to be more than 6 characters long.&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_PasswordHelp { get { return T("Website.Forms.Administrative.AddNewUserStep1.PasswordHelp"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_NameLabel { get { return T("Website.Forms.Administrative.AddNewUserStep1.NameLabel"); } } 
 /// <summary>&quot;The full name of the person using this account.&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_NameHelp { get { return T("Website.Forms.Administrative.AddNewUserStep1.NameHelp"); } } 
 /// <summary>&quot;Email address&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_EmailLabel { get { return T("Website.Forms.Administrative.AddNewUserStep1.EmailLabel"); } } 
 /// <summary>&quot;The e-mail address of the user (optional).&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_EmailHelp { get { return T("Website.Forms.Administrative.AddNewUserStep1.EmailHelp"); } } 
 /// <summary>&quot;Folder&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_GroupLabel { get { return T("Website.Forms.Administrative.AddNewUserStep1.GroupLabel"); } } 
 /// <summary>&quot;If you enter a folder name that does not already exist a new folder will be created.&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_GroupHelp { get { return T("Website.Forms.Administrative.AddNewUserStep1.GroupHelp"); } } 
 /// <summary>&quot;Regional settings&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_CultureLabel { get { return T("Website.Forms.Administrative.AddNewUserStep1.CultureLabel"); } } 
 /// <summary>&quot;To change the way numbers, dates, and hours are displayed, select an entry from the list.&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_CultureHelp { get { return T("Website.Forms.Administrative.AddNewUserStep1.CultureHelp"); } } 
 /// <summary>&quot;C1 Console Language&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_C1ConsoleLanguageLabel { get { return T("Website.Forms.Administrative.AddNewUserStep1.C1ConsoleLanguageLabel"); } } 
 /// <summary>&quot;Select the language to be used for labels, help texts, dialogs etc. The available options here are limited to languages installed. You may install more languages via the Package system, see Composite.Localization.&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewUserStep1_C1ConsoleLanguageHelp { get { return T("Website.Forms.Administrative.AddNewUserStep1.C1ConsoleLanguageHelp"); } } 
 /// <summary>&quot;A language is required&quot;</summary> 
 public static string UserElementProvider_MissingActiveLanguageTitle { get { return T("UserElementProvider.MissingActiveLanguageTitle"); } } 
 /// <summary>&quot;To create a user a language is required, but no languages have been added yet. You can add one under the System perspective.&quot;</summary> 
 public static string UserElementProvider_MissingActiveLanguageMessage { get { return T("UserElementProvider.MissingActiveLanguageMessage"); } } 
 /// <summary>&quot;User with the same login already exist&quot;</summary> 
 public static string UserElementProvider_UserLoginIsAlreadyUsed { get { return T("UserElementProvider.UserLoginIsAlreadyUsed"); } } 
 /// <summary>&quot;Add Datafolder&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderTypeLabel { get { return T("AssociatedDataElementProviderHelper.AddDataFolderTypeLabel"); } } 
 /// <summary>&quot;Add datafolder&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderTypeToolTip { get { return T("AssociatedDataElementProviderHelper.AddDataFolderTypeToolTip"); } } 
 /// <summary>&quot;Add Data&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddAssociatedDataLabel { get { return T("AssociatedDataElementProviderHelper.AddAssociatedDataLabel"); } } 
 /// <summary>&quot;Add data&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddAssociatedDataToolTip { get { return T("AssociatedDataElementProviderHelper.AddAssociatedDataToolTip"); } } 
 /// <summary>&quot;Edit Data&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditAssociatedDataLabel { get { return T("AssociatedDataElementProviderHelper.EditAssociatedDataLabel"); } } 
 /// <summary>&quot;Edit data&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditAssociatedDataToolTip { get { return T("AssociatedDataElementProviderHelper.EditAssociatedDataToolTip"); } } 
 /// <summary>&quot;Delete Data&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteAssociatedDataLabel { get { return T("AssociatedDataElementProviderHelper.DeleteAssociatedDataLabel"); } } 
 /// <summary>&quot;Delete data&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteAssociatedDataToolTip { get { return T("AssociatedDataElementProviderHelper.DeleteAssociatedDataToolTip"); } } 
 /// <summary>&quot;Localize&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_LocalizeData { get { return T("AssociatedDataElementProviderHelper.LocalizeData"); } } 
 /// <summary>&quot;Localize data&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_LocalizeDataToolTip { get { return T("AssociatedDataElementProviderHelper.LocalizeDataToolTip"); } } 
 /// <summary>&quot;Not yet approved or published&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_DisabledData { get { return T("AssociatedDataElementProviderHelper.DisabledData"); } } 
 /// <summary>&quot;Add Datafolder&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExSelectType_FieldLabel { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExSelectType.FieldLabel"); } } 
 /// <summary>&quot;Datafolder type&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExSelectType_SelectorLabel { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExSelectType.SelectorLabel"); } } 
 /// <summary>&quot;Create new datatype or use an existing datatype (if present).&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExSelectType_SelectorHelp { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExSelectType.SelectorHelp"); } } 
 /// <summary>&quot;Settings&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelNewType { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelNewType"); } } 
 /// <summary>&quot;Type name&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelTypeName { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelTypeName"); } } 
 /// <summary>&quot;The technical name of the data type (ex. Product). This is used to identify this type in code and should not be changed once used externally.&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HelpTypeName { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HelpTypeName"); } } 
 /// <summary>&quot;Type namespace&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelTypeNamespace { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelTypeNamespace"); } } 
 /// <summary>&quot;The namespace (module / category name) of the type. This is used to identify this type in code and should not be changed.&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HelpTypeNamespace { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HelpTypeNamespace"); } } 
 /// <summary>&quot;Title&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelTypeTitle { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelTypeTitle"); } } 
 /// <summary>&quot;Use this entry to specify a user friendly name. You can change this field as you like.&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HelpTypeTitle { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HelpTypeTitle"); } } 
 /// <summary>&quot;Fields&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelFields { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelFields"); } } 
 /// <summary>&quot;Services&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_ServicesLabel { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.ServicesLabel"); } } 
 /// <summary>&quot;Has publishing&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HasPublishing { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HasPublishing"); } } 
 /// <summary>&quot;Has localization&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HasLocalization { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HasLocalization"); } } 
 /// <summary>&quot;No page datafolders exists&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExWorkflow_NoTypesTitle { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoTypesTitle"); } } 
 /// <summary>&quot;No page datafolders have been created yet. You can create a page datafolder in the &apos;Data&apos; perspective.&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExWorkflow_NoTypesMessage { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoTypesMessage"); } } 
 /// <summary>&quot;No Unused Page Datafolders Exist&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExWorkflow_NoUnusedTypesTitle { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoUnusedTypesTitle"); } } 
 /// <summary>&quot;All available page datafolders have been added already. To create a new page datafolder go to the &apos;Data&apos; perspective.&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExWorkflow_NoUnusedTypesMessage { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoUnusedTypesMessage"); } } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_ErrorTitle { get { return T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.ErrorTitle"); } } 
 /// <summary>&quot;Select existing data folder type to add&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderSelectType_FieldLabel { get { return T("AssociatedDataElementProviderHelper.AddDataFolderSelectType.FieldLabel"); } } 
 /// <summary>&quot;Existing data folder types&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderSelectType_SelectorLabel { get { return T("AssociatedDataElementProviderHelper.AddDataFolderSelectType.SelectorLabel"); } } 
 /// <summary>&quot;Select existing data folder type to add&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddDataFolderSelectType_SelectorHelp { get { return T("AssociatedDataElementProviderHelper.AddDataFolderSelectType.SelectorHelp"); } } 
 /// <summary>&quot;Remove Metadata Field&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_RemoveMetaDataTypeLabel { get { return T("AssociatedDataElementProviderHelper.RemoveMetaDataTypeLabel"); } } 
 /// <summary>&quot;Remove metadata field&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_RemoveMetaDataTypeToolTip { get { return T("AssociatedDataElementProviderHelper.RemoveMetaDataTypeToolTip"); } } 
 /// <summary>&quot;Remove Datafolder from Page&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_LabelFieldGroup { get { return T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.LabelFieldGroup"); } } 
 /// <summary>&quot;Data cleanup&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_FieldGroupLabel { get { return T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.FieldGroupLabel"); } } 
 /// <summary>&quot;Delete data&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_DeleteFolderDataLabel { get { return T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.DeleteFolderDataLabel"); } } 
 /// <summary>&quot;Yes, delete folder data&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_DeleteFolderDataCheckBoxLabel { get { return T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.DeleteFolderDataCheckBoxLabel"); } } 
 /// <summary>&quot;If you want data in this folder to stay in the database, you should uncheck this option.&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_DeleteFolderDataHelp { get { return T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.DeleteFolderDataHelp"); } } 
 /// <summary>&quot;Add Metadata Field&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataSelectType_LayoutLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataSelectType.LayoutLabel"); } } 
 /// <summary>&quot;Add Metadata Field&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataTypeLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataTypeLabel"); } } 
 /// <summary>&quot;Add metadata field&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataTypeToolTip { get { return T("AssociatedDataElementProviderHelper.AddMetaDataTypeToolTip"); } } 
 /// <summary>&quot;Select existing metadata type to add&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataSelectType_FieldLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataSelectType.FieldLabel"); } } 
 /// <summary>&quot;Existing metadata types&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataSelectType_SelectorLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataSelectType.SelectorLabel"); } } 
 /// <summary>&quot;Select existing metadata type to add&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataSelectType_SelectorHelp { get { return T("AssociatedDataElementProviderHelper.AddMetaDataSelectType.SelectorHelp"); } } 
 /// <summary>&quot;No page metadata types exists&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_NoTypesTitle { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.NoTypesTitle"); } } 
 /// <summary>&quot;No page metatypes have been created yet. You can create a Page metatype in the &apos;Data&apos; perspective.&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_NoTypesMessage { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.NoTypesMessage"); } } 
 /// <summary>&quot;Metadata field group naming&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_NamingFieldLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.NamingFieldLabel"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_FieldGroupNameLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.FieldGroupNameLabel"); } } 
 /// <summary>&quot;Enter a unique name identifying this metadata field group&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_FieldGroupNameHelp { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.FieldGroupNameHelp"); } } 
 /// <summary>&quot;Label&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_FieldGroupLabelLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.FieldGroupLabelLabel"); } } 
 /// <summary>&quot;Enter a user friendly label for this metadata field group&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_FieldGroupLabelHelp { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.FieldGroupLabelHelp"); } } 
 /// <summary>&quot;Metadata field group visibility&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_VisabilityFieldLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.VisabilityFieldLabel"); } } 
 /// <summary>&quot;Tab&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_ContainerSelectorLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.ContainerSelectorLabel"); } } 
 /// <summary>&quot;Select the tab for which this metadata should exists&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_ContainerSelectorHelp { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.ContainerSelectorHelp"); } } 
 /// <summary>&quot;Start display from&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_StartDisplaySelectorLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.StartDisplaySelectorLabel"); } } 
 /// <summary>&quot;Start display from&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_StartDisplaySelectorHelp { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.StartDisplaySelectorHelp"); } } 
 /// <summary>&quot;Inherit display&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_InheritDisplaySelectorLabel { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.InheritDisplaySelectorLabel"); } } 
 /// <summary>&quot;Inherit display&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_InheritDisplaySelectorHelp { get { return T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.InheritDisplaySelectorHelp"); } } 
 /// <summary>&quot;The metadata field group has no items in scope&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_NoItems_Title { get { return T("AssociatedDataElementProviderHelper.NoItems.Title"); } } 
 /// <summary>&quot;There are currently no items within the specified display range. Press Previous to change the display range or Finish to create the metadata field group.&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_NoItems_Description { get { return T("AssociatedDataElementProviderHelper.NoItems.Description"); } } 
 /// <summary>&quot;This item&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption0 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption0"); } } 
 /// <summary>&quot;Children&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption1 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption1"); } } 
 /// <summary>&quot;2nd generation descendants&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption2 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption2"); } } 
 /// <summary>&quot;3rd generation descendants&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption3 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption3"); } } 
 /// <summary>&quot;4th generation descendants&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption4 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption4"); } } 
 /// <summary>&quot;5th generation descendants&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption5 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption5"); } } 
 /// <summary>&quot;Do not inherit&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption0 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption0"); } } 
 /// <summary>&quot;Inherit 1 generation&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption1 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption1"); } } 
 /// <summary>&quot;Inherit 2 generations&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption2 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption2"); } } 
 /// <summary>&quot;Inherit 3 generations&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption3 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption3"); } } 
 /// <summary>&quot;Always inherit&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption4 { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption4"); } } 
 /// <summary>&quot;The field group name is in use&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_FieldGroupNameNotValid { get { return T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.FieldGroupNameNotValid"); } } 
 /// <summary>&quot;Remove Metadata Field Group&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteMetaDataSelectType_LayoutLabel { get { return T("AssociatedDataElementProviderHelper.DeleteMetaDataSelectType.LayoutLabel"); } } 
 /// <summary>&quot;Select a metadata field group to remove&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteMetaDataSelectFieldGroupName_FieldLabel { get { return T("AssociatedDataElementProviderHelper.DeleteMetaDataSelectFieldGroupName.FieldLabel"); } } 
 /// <summary>&quot;Field group&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteMetaDataSelectFieldGroupName_SelectorLabel { get { return T("AssociatedDataElementProviderHelper.DeleteMetaDataSelectFieldGroupName.SelectorLabel"); } } 
 /// <summary>&quot;Select a metadata field group to remove&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteMetaDataSelectFieldGroupName_SelectorHelp { get { return T("AssociatedDataElementProviderHelper.DeleteMetaDataSelectFieldGroupName.SelectorHelp"); } } 
 /// <summary>&quot;Edit Metadata Field&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataTypeLabel { get { return T("AssociatedDataElementProviderHelper.EditMetaDataTypeLabel"); } } 
 /// <summary>&quot;Edit metadata field&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataTypeToolTip { get { return T("AssociatedDataElementProviderHelper.EditMetaDataTypeToolTip"); } } 
 /// <summary>&quot;Edit Page Metadata Field&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_Layout_Label { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.Layout.Label"); } } 
 /// <summary>&quot;Page metadata field settings&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_FieldGroup_Label { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.FieldGroup.Label"); } } 
 /// <summary>&quot;Label&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_LabelTextBox_Label { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.LabelTextBox.Label"); } } 
 /// <summary>&quot;The label of the metadata field. Used when editing pages&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_LabelTextBox_Help { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.LabelTextBox.Help"); } } 
 /// <summary>&quot;Tab&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataContainerSelector_Label { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataContainerSelector.Label"); } } 
 /// <summary>&quot;Select the tab for which this metadata should exists&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataContainerSelector_Help { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataContainerSelector.Help"); } } 
 /// <summary>&quot;Start display from&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_StartDisplaySelectorLabel { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.StartDisplaySelectorLabel"); } } 
 /// <summary>&quot;Start display from&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_StartDisplaySelectorHelp { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.StartDisplaySelectorHelp"); } } 
 /// <summary>&quot;Inherit display&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_InheritDisplaySelectorLabel { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.InheritDisplaySelectorLabel"); } } 
 /// <summary>&quot;Inherit display&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_InheritDisplaySelectorHelp { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.InheritDisplaySelectorHelp"); } } 
 /// <summary>&quot;Metadata field&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataDefinitionSelector_Label { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataDefinitionSelector.Label"); } } 
 /// <summary>&quot;Select the metadata field to edit&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataDefinitionSelector_Help { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataDefinitionSelector.Help"); } } 
 /// <summary>&quot;No Metadata Fields to Edit&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_NoMetaDataDefinitionsExists_Title { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.NoMetaDataDefinitionsExists.Title"); } } 
 /// <summary>&quot;There is no metadata fields defined on this item to edit&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_NoMetaDataDefinitionsExists_Message { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.NoMetaDataDefinitionsExists.Message"); } } 
 /// <summary>&quot;The metadata type is used another place with same name but different label&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataFieldNameAlreadyUsed { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataFieldNameAlreadyUsed"); } } 
 /// <summary>&quot;There exists one or more definitions with the same name, container change is not allowed&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataContainerChangeNotAllowed { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataContainerChangeNotAllowed"); } } 
 /// <summary>&quot;Press finish to save&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_NoDefaultValuesNeeded_Title { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.NoDefaultValuesNeeded.Title"); } } 
 /// <summary>&quot;All required information has been gathered. Press Finish to update the metadata field&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_NoDefaultValuesNeeded_Description { get { return T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.NoDefaultValuesNeeded.Description"); } } 
 /// <summary>&quot;No Metadata Fields to Remove&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteMetaDataWorkflow_NoDefinedTypesExists_Title { get { return T("AssociatedDataElementProviderHelper.DeleteMetaDataWorkflow.NoDefinedTypesExists.Title"); } } 
 /// <summary>&quot;There is no metadata fields defined on this item to remove&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_DeleteMetaDataWorkflow_NoDefinedTypesExists_Message { get { return T("AssociatedDataElementProviderHelper.DeleteMetaDataWorkflow.NoDefinedTypesExists.Message"); } } 
 /// <summary>&quot;Cascade delete error&quot;</summary> 
 public static string DeleteAssociatedDataWorkflow_CascadeDeleteErrorTitle { get { return T("DeleteAssociatedDataWorkflow.CascadeDeleteErrorTitle"); } } 
 /// <summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
 public static string DeleteAssociatedDataWorkflow_CascadeDeleteErrorMessage { get { return T("DeleteAssociatedDataWorkflow.CascadeDeleteErrorMessage"); } } 
 /// <summary>&quot;Settings&quot;</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelNewType { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelNewType"); } } 
 /// <summary>&quot;Type name&quot;</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelTypeName { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelTypeName"); } } 
 /// <summary>&quot;The name of the new type that you are creating (ex. product)&quot;</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HelpTypeName { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HelpTypeName"); } } 
 /// <summary>&quot;Type namespace&quot;</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelTypeNamespace { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelTypeNamespace"); } } 
 /// <summary>&quot;The name of the module, category or namespace that you are creating&quot;</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HelpTypeNamespace { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HelpTypeNamespace"); } } 
 /// <summary>&quot;Title&quot;</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelTypeTitle { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelTypeTitle"); } } 
 /// <summary>&quot;Use this entry to specify a user friendly name&quot;</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HelpTypeTitle { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HelpTypeTitle"); } } 
 /// <summary>&quot;Fields&quot;</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelFields { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelFields"); } } 
 /// <summary>&quot;Services&quot;</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_ServicesLabel { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.ServicesLabel"); } } 
 /// <summary>&quot;Has versioning&quot;</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HasVersioning { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HasVersioning"); } } 
 /// <summary>&quot;Has publishing&quot;</summary> 
 public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HasPublishing { get { return T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HasPublishing"); } } 
 /// <summary>&quot;Delete Data?&quot;</summary> 
 public static string Website_Forms_Administrative_DeleteAssociatedTypeDataStep1_FieldGroupLabel { get { return T("Website.Forms.Administrative.DeleteAssociatedTypeDataStep1.FieldGroupLabel"); } } 
 /// <summary>&quot;Delete data?&quot;</summary> 
 public static string Website_Forms_Administrative_DeleteAssociatedTypeDataStep1_Text { get { return T("Website.Forms.Administrative.DeleteAssociatedTypeDataStep1.Text"); } } 
 /// <summary>&quot;Add page data&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedDataWorkflow_FieldGroupLabel { get { return T("Website.Forms.Administrative.AddAssociatedDataWorkflow.FieldGroupLabel"); } } 
 /// <summary>&quot;Select a datatype to add&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedDataWorkflow_TypeSelectorLabel { get { return T("Website.Forms.Administrative.AddAssociatedDataWorkflow.TypeSelectorLabel"); } } 
 /// <summary>&quot;Select one of the existing types to add data to&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedDataWorkflow_TypeSelectorHelp { get { return T("Website.Forms.Administrative.AddAssociatedDataWorkflow.TypeSelectorHelp"); } } 
 /// <summary>&quot;Add page datatype&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeWorkflow_FieldGroupLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeWorkflow.FieldGroupLabel"); } } 
 /// <summary>&quot;Select type to add&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAddExisting_TypeSelectorLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeAddExisting.TypeSelectorLabel"); } } 
 /// <summary>&quot;Select one of the existing types in the system&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAddExisting_TypeSelectorHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeAddExisting.TypeSelectorHelp"); } } 
 /// <summary>&quot;Select a foreign key&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAddExistingSelectForeignKey_KeySelectorLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeAddExistingSelectForeignKey.KeySelectorLabel"); } } 
 /// <summary>&quot;Select one of the fields from the type to use as foreign key&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAddExistingSelectForeignKey_KeySelectorHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeAddExistingSelectForeignKey.KeySelectorHelp"); } } 
 /// <summary>&quot;Add a&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAddingTypeSelection_KeySelectorLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeAddingTypeSelection.KeySelectorLabel"); } } 
 /// <summary>&quot;Creating a new type or using an existing type&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAddingTypeSelection_KeySelectorHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeAddingTypeSelection.KeySelectorHelp"); } } 
 /// <summary>&quot;Select type:&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAssociationTypeSelection_KeySelectorLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeAssociationTypeSelection.KeySelectorLabel"); } } 
 /// <summary>&quot;Regular data is a new type that are created under a page. Metadata is a new field that are created on a page&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeAssociationTypeSelection_KeySelectorHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeAssociationTypeSelection.KeySelectorHelp"); } } 
 /// <summary>&quot;Rule name&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeRuleNameLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeRuleNameLabel"); } } 
 /// <summary>&quot;Rule name are saved with the metadata and are a part of the metadata key. The name must be unique.&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeRuleNameHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeRuleNameHelp"); } } 
 /// <summary>&quot;Rule label&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeRuleLabelLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeRuleLabelLabel"); } } 
 /// <summary>&quot;Rule label is used as a user friendly name for the instance. Can be localized&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeRuleHelpHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeRuleHelpHelp"); } } 
 /// <summary>&quot;Select composition container&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ContainerKeySelectorLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ContainerKeySelectorLabel"); } } 
 /// <summary>&quot;Select container for the new rule.&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ContainerKeySelectorHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ContainerKeySelectorHelp"); } } 
 /// <summary>&quot;Select composition scope&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeKeySelectorLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeKeySelectorLabel"); } } 
 /// <summary>&quot;Select the scope for the new composition&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeKeySelectorHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeKeySelectorHelp"); } } 
 /// <summary>&quot;Levels&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeLevelsScopeSelection_LevelsLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeLevelsScopeSelection.LevelsLabel"); } } 
 /// <summary>&quot;The depth of sub pages in which the composition will be visible&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeLevelsScopeSelection_LevelsHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeLevelsScopeSelection.LevelsHelp"); } } 
 /// <summary>&quot;Confirm new datatype:&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_AssociationTypeLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.AssociationTypeLabel"); } } 
 /// <summary>&quot;Metadata is a new field that are created on a page&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_AssociationTypeHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.AssociationTypeHelp"); } } 
 /// <summary>&quot;Composition scope rule name&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeRuleNameLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeRuleNameLabel"); } } 
 /// <summary>&quot;Rule name are saved with the metadata and are a part of the metadata key. The name must be unique.&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeRuleNameHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeRuleNameHelp"); } } 
 /// <summary>&quot;Composition scope rule label&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeRuleLabelLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeRuleLabelLabel"); } } 
 /// <summary>&quot;Rule label is used as a user friendly name for the instance. Can be localized&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeRuleHelpHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeRuleHelpHelp"); } } 
 /// <summary>&quot;Composition scope&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeLabel"); } } 
 /// <summary>&quot;This is the scope in which the new composition will be visible when editing pages&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeHelp"); } } 
 /// <summary>&quot;Adding type&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_AddingTypeLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.AddingTypeLabel"); } } 
 /// <summary>&quot;Create a new type or use an existing type&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_AddingTypeHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.AddingTypeHelp"); } } 
 /// <summary>&quot;Existing type name&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_ExistingTypeNameLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.ExistingTypeNameLabel"); } } 
 /// <summary>&quot;The name of the selected existing type in the system to use&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_ExistingTypeNameHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.ExistingTypeNameHelp"); } } 
 /// <summary>&quot;Foreign key field name&quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_ForeignKeyFieldNameLabel { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.ForeignKeyFieldNameLabel"); } } 
 /// <summary>&quot;The name of the field of the existing type to use as a foreign key &quot;</summary> 
 public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_ForeignKeyFieldNameHelp { get { return T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.ForeignKeyFieldNameHelp"); } } 
 /// <summary>&quot;Remove Datafolder&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_RemoveAssociatedTypeLabel { get { return T("AssociatedDataElementProviderHelper.RemoveAssociatedTypeLabel"); } } 
 /// <summary>&quot;Remove datafolder&quot;</summary> 
 public static string AssociatedDataElementProviderHelper_RemoveAssociatedTypeToolTip { get { return T("AssociatedDataElementProviderHelper.RemoveAssociatedTypeToolTip"); } } 
 /// <summary>&quot;Remove page datatype&quot;</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedType_FieldGroupLabel { get { return T("Website.Forms.Administrative.RemoveAssociatedType.FieldGroupLabel"); } } 
 /// <summary>&quot;Remove page datatype&quot;</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeFinalInfo_AssociationTypeLabel { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeFinalInfo.AssociationTypeLabel"); } } 
 /// <summary>&quot;Composition scope rule name&quot;</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeFinalInfo_CompositionScopeRuleNameLabel { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeFinalInfo.CompositionScopeRuleNameLabel"); } } 
 /// <summary>&quot;Select a rule&quot;</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectRuleName_KeySelectorLabel { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeSelectRuleName.KeySelectorLabel"); } } 
 /// <summary>&quot;The name of the rule to remove&quot;</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectRuleName_KeySelectorHelp { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeSelectRuleName.KeySelectorHelp"); } } 
 /// <summary>&quot;Select page datatype&quot;</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectAssociationType_KeySelectorLabel { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeSelectAssociationType.KeySelectorLabel"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectAssociationType_KeySelectorHelp { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeSelectAssociationType.KeySelectorHelp"); } } 
 /// <summary>&quot;Select datatype&quot;</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectType_TypeSelectorLabel { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeSelectType.TypeSelectorLabel"); } } 
 /// <summary>&quot;Select one of the existing types&quot;</summary> 
 public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectType_TypeSelectorHelp { get { return T("Website.Forms.Administrative.RemoveAssociatedTypeSelectType.TypeSelectorHelp"); } } 
 /// <summary>&quot;Virtual root&quot;</summary> 
 public static string VirtualElementProviderElementProvider_ID01 { get { return T("VirtualElementProviderElementProvider.ID01"); } } 
 /// <summary>&quot;Users and Permissions&quot;</summary> 
 public static string VirtualElementProviderElementProvider_PermissionsPerspective { get { return T("VirtualElementProviderElementProvider.PermissionsPerspective"); } } 
 /// <summary>&quot;Users&quot;</summary> 
 public static string VirtualElementProviderElementProvider_UserPerspective { get { return T("VirtualElementProviderElementProvider.UserPerspective"); } } 
 /// <summary>&quot;Developer Apps&quot;</summary> 
 public static string VirtualElementProviderElementProvider_DeveloperApplicationPerspective { get { return T("VirtualElementProviderElementProvider.DeveloperApplicationPerspective"); } } 
 /// <summary>&quot;User Groups&quot;</summary> 
 public static string VirtualElementProviderElementProvider_UserGroupPerspective { get { return T("VirtualElementProviderElementProvider.UserGroupPerspective"); } } 
 /// <summary>&quot;System&quot;</summary> 
 public static string VirtualElementProviderElementProvider_SystemPerspective { get { return T("VirtualElementProviderElementProvider.SystemPerspective"); } } 
 /// <summary>&quot;Content&quot;</summary> 
 public static string VirtualElementProviderElementProvider_ContentPerspective { get { return T("VirtualElementProviderElementProvider.ContentPerspective"); } } 
 /// <summary>&quot;Data&quot;</summary> 
 public static string VirtualElementProviderElementProvider_DatasPerspective { get { return T("VirtualElementProviderElementProvider.DatasPerspective"); } } 
 /// <summary>&quot;Layout&quot;</summary> 
 public static string VirtualElementProviderElementProvider_DesignPerspective { get { return T("VirtualElementProviderElementProvider.DesignPerspective"); } } 
 /// <summary>&quot;Functions&quot;</summary> 
 public static string VirtualElementProviderElementProvider_FunctionsPerspective { get { return T("VirtualElementProviderElementProvider.FunctionsPerspective"); } } 
 /// <summary>&quot;All Media Files&quot;</summary> 
 public static string VirtualElementProviderElementProvider_MediaFilePerspective { get { return T("VirtualElementProviderElementProvider.MediaFilePerspective"); } } 
 /// <summary>&quot;Media&quot;</summary> 
 public static string VirtualElementProviderElementProvider_MediaPerspective { get { return T("VirtualElementProviderElementProvider.MediaPerspective"); } } 
 /// <summary>&quot;All Functions&quot;</summary> 
 public static string VirtualElementProviderElementProvider_ReadOnlyFunctionPerspective { get { return T("VirtualElementProviderElementProvider.ReadOnlyFunctionPerspective"); } } 
 /// <summary>&quot;All Widget Functions&quot;</summary> 
 public static string VirtualElementProviderElementProvider_ReadOnlyWidgetFunctionPerspective { get { return T("VirtualElementProviderElementProvider.ReadOnlyWidgetFunctionPerspective"); } } 
 /// <summary>&quot;SQL Functions&quot;</summary> 
 public static string VirtualElementProviderElementProvider_SqlFunctionPerspective { get { return T("VirtualElementProviderElementProvider.SqlFunctionPerspective"); } } 
 /// <summary>&quot;Xslt Based Functions&quot;</summary> 
 public static string VirtualElementProviderElementProvider_XsltBasedFunctionPerspective { get { return T("VirtualElementProviderElementProvider.XsltBasedFunctionPerspective"); } } 
 /// <summary>&quot;Broadcast Message&quot;</summary> 
 public static string VirtualElementProviderElementProvider_RootActions_SendMessageLabel { get { return T("VirtualElementProviderElementProvider.RootActions.SendMessageLabel"); } } 
 /// <summary>&quot;Send a message to all running consoles&quot;</summary> 
 public static string VirtualElementProviderElementProvider_RootActions_SendMessageTooltip { get { return T("VirtualElementProviderElementProvider.RootActions.SendMessageTooltip"); } } 
 /// <summary>&quot;Restart server&quot;</summary> 
 public static string VirtualElementProviderElementProvider_RootActions_RestartApplicationLabel { get { return T("VirtualElementProviderElementProvider.RootActions.RestartApplicationLabel"); } } 
 /// <summary>&quot;Restart the server&quot;</summary> 
 public static string VirtualElementProviderElementProvider_RootActions_RestartApplicationTooltip { get { return T("VirtualElementProviderElementProvider.RootActions.RestartApplicationTooltip"); } } 
 /// <summary>&quot;Broadcast Message to All {applicationname} Consoles&quot;</summary> 
 public static string SendMessageToConsolesWorkflow_Layout_Label { get { return T("SendMessageToConsolesWorkflow.Layout.Label"); } } 
 /// <summary>&quot;Title&quot;</summary> 
 public static string SendMessageToConsolesWorkflow_TitleTextBox_Label { get { return T("SendMessageToConsolesWorkflow.TitleTextBox.Label"); } } 
 /// <summary>&quot;Dialog title of broadcast message&quot;</summary> 
 public static string SendMessageToConsolesWorkflow_TitleTextBox_Help { get { return T("SendMessageToConsolesWorkflow.TitleTextBox.Help"); } } 
 /// <summary>&quot;Message&quot;</summary> 
 public static string SendMessageToConsolesWorkflow_MessageTextArea_Label { get { return T("SendMessageToConsolesWorkflow.MessageTextArea.Label"); } } 
 /// <summary>&quot;The message to broadcast&quot;</summary> 
 public static string SendMessageToConsolesWorkflow_MessageTextArea_Help { get { return T("SendMessageToConsolesWorkflow.MessageTextArea.Help"); } } 
 /// <summary>&quot;Login&quot;</summary> 
 public static string LoginWebRequestHandler_Login { get { return T("LoginWebRequestHandler.Login"); } } 
 /// <summary>&quot;Login to {0}&quot;</summary> 
 public static string LoginWebRequestHandler_Header(object parameter0) { return string.Format(T("LoginWebRequestHandler.Header"), parameter0); } 
 /// <summary>&quot;Incorrect user name or password&quot;</summary> 
 public static string LoginWebRequestHandler_LoginFailed { get { return T("LoginWebRequestHandler.LoginFailed"); } } 
 /// <summary>&quot;Password&quot;</summary> 
 public static string LoginWebRequestHandler_Password { get { return T("LoginWebRequestHandler.Password"); } } 
 /// <summary>&quot;Username&quot;</summary> 
 public static string LoginWebRequestHandler_Username { get { return T("LoginWebRequestHandler.Username"); } } 
 /// <summary>&quot;Log in as another user.&quot;</summary> 
 public static string LoginWebRequestHandler_LogInAsOtherUser { get { return T("LoginWebRequestHandler.LogInAsOtherUser"); } } 
 /// <summary>&quot;Wrong username or password.&quot;</summary> 
 public static string LoginWebRequestHandler_WrongUserNameOrPassword { get { return T("LoginWebRequestHandler.WrongUserNameOrPassword"); } } 
 /// <summary>&quot;The supplied Windows login, {0}\{1} is not registered in the user database. You must use a different login.&quot;</summary> 
 public static string LoginWebRequestHandler_UserNameNotRegistered(object parameter0,object parameter1) { return string.Format(T("LoginWebRequestHandler.UserNameNotRegistered"), parameter0,parameter1); } 
 /// <summary>&quot;The type {0} is not an interface.&quot;</summary> 
 public static string DataInterfaceValidator_TypeNotAnInterface(object parameter0) { return string.Format(T("DataInterfaceValidator.TypeNotAnInterface"), parameter0); } 
 /// <summary>&quot;The interface type {0} does not implement the interface {1}.&quot;</summary> 
 public static string DataInterfaceValidator_TypeDoesNotImplementInterface(object parameter0,object parameter1) { return string.Format(T("DataInterfaceValidator.TypeDoesNotImplementInterface"), parameter0,parameter1); } 
 /// <summary>&quot;The property {0} on the interface type {1} is not a accepted type.&quot;</summary> 
 public static string DataInterfaceValidator_NotAcceptedType(object parameter0,object parameter1) { return string.Format(T("DataInterfaceValidator.NotAcceptedType"), parameter0,parameter1); } 
 /// <summary>&quot;The interface {0} is not a valid IData interface.&quot;</summary> 
 public static string DataInterfaceValidator_NotValidIDataInterface(object parameter0) { return string.Format(T("DataInterfaceValidator.NotValidIDataInterface"), parameter0); } 
 /// <summary>&quot;Cascade delete error&quot;</summary> 
 public static string DeleteMediaFileWorkflow_CascadeDeleteErrorTitle { get { return T("DeleteMediaFileWorkflow.CascadeDeleteErrorTitle"); } } 
 /// <summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
 public static string DeleteMediaFileWorkflow_CascadeDeleteErrorMessage { get { return T("DeleteMediaFileWorkflow.CascadeDeleteErrorMessage"); } } 
 /// <summary>&quot;Cascade delete error&quot;</summary> 
 public static string DeleteMediaFolderWorkflow_CascadeDeleteErrorTitle { get { return T("DeleteMediaFolderWorkflow.CascadeDeleteErrorTitle"); } } 
 /// <summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
 public static string DeleteMediaFolderWorkflow_CascadeDeleteErrorMessage { get { return T("DeleteMediaFolderWorkflow.CascadeDeleteErrorMessage"); } } 
 /// <summary>&quot;Add folders and files to the media archive&quot;</summary> 
 public static string MediaFileProviderElementProvider_RootToolTip { get { return T("MediaFileProviderElementProvider.RootToolTip"); } } 
 /// <summary>&quot;Add Folder&quot;</summary> 
 public static string MediaFileProviderElementProvider_AddMediaFolder { get { return T("MediaFileProviderElementProvider.AddMediaFolder"); } } 
 /// <summary>&quot;Add new media folder&quot;</summary> 
 public static string MediaFileProviderElementProvider_AddMediaFolderToolTip { get { return T("MediaFileProviderElementProvider.AddMediaFolderToolTip"); } } 
 /// <summary>&quot;Upload File&quot;</summary> 
 public static string MediaFileProviderElementProvider_AddMediaFile { get { return T("MediaFileProviderElementProvider.AddMediaFile"); } } 
 /// <summary>&quot;Add new media file&quot;</summary> 
 public static string MediaFileProviderElementProvider_AddMediaFileToolTip { get { return T("MediaFileProviderElementProvider.AddMediaFileToolTip"); } } 
 /// <summary>&quot;Delete File&quot;</summary> 
 public static string MediaFileProviderElementProvider_DeleteMediaFile { get { return T("MediaFileProviderElementProvider.DeleteMediaFile"); } } 
 /// <summary>&quot;Delete the selected media file&quot;</summary> 
 public static string MediaFileProviderElementProvider_DeleteMediaFileToolTip { get { return T("MediaFileProviderElementProvider.DeleteMediaFileToolTip"); } } 
 /// <summary>&quot;Delete Folder&quot;</summary> 
 public static string MediaFileProviderElementProvider_DeleteMediaFolder { get { return T("MediaFileProviderElementProvider.DeleteMediaFolder"); } } 
 /// <summary>&quot;Delete the media folder and all items under it.&quot;</summary> 
 public static string MediaFileProviderElementProvider_DeleteMediaFolderToolTip { get { return T("MediaFileProviderElementProvider.DeleteMediaFolderToolTip"); } } 
 /// <summary>&quot;Download&quot;</summary> 
 public static string MediaFileProviderElementProvider_Download { get { return T("MediaFileProviderElementProvider.Download"); } } 
 /// <summary>&quot;Download file&quot;</summary> 
 public static string MediaFileProviderElementProvider_DownloadToolTip { get { return T("MediaFileProviderElementProvider.DownloadToolTip"); } } 
 /// <summary>&quot;File Properties&quot;</summary> 
 public static string MediaFileProviderElementProvider_EditMediaFile { get { return T("MediaFileProviderElementProvider.EditMediaFile"); } } 
 /// <summary>&quot;Rename the selected media file&quot;</summary> 
 public static string MediaFileProviderElementProvider_EditMediaFileToolTip { get { return T("MediaFileProviderElementProvider.EditMediaFileToolTip"); } } 
 /// <summary>&quot;Edit text&quot;</summary> 
 public static string MediaFileProviderElementProvider_EditMediaFileTextContent { get { return T("MediaFileProviderElementProvider.EditMediaFileTextContent"); } } 
 /// <summary>&quot;Edit text content&quot;</summary> 
 public static string MediaFileProviderElementProvider_EditMediaFileTextContentToolTip { get { return T("MediaFileProviderElementProvider.EditMediaFileTextContentToolTip"); } } 
 /// <summary>&quot;Image Editor&quot;</summary> 
 public static string MediaFileProviderElementProvider_EditImage { get { return T("MediaFileProviderElementProvider.EditImage"); } } 
 /// <summary>&quot;Open the selected media file in the image editor&quot;</summary> 
 public static string MediaFileProviderElementProvider_EditImageToolTip { get { return T("MediaFileProviderElementProvider.EditImageToolTip"); } } 
 /// <summary>&quot;Folder Properties&quot;</summary> 
 public static string MediaFileProviderElementProvider_EditMediaFolder { get { return T("MediaFileProviderElementProvider.EditMediaFolder"); } } 
 /// <summary>&quot;Edit media folder properties&quot;</summary> 
 public static string MediaFileProviderElementProvider_EditMediaFolderToolTip { get { return T("MediaFileProviderElementProvider.EditMediaFolderToolTip"); } } 
 /// <summary>&quot;Replace File&quot;</summary> 
 public static string MediaFileProviderElementProvider_ChangeMediaFile { get { return T("MediaFileProviderElementProvider.ChangeMediaFile"); } } 
 /// <summary>&quot;Replace the selected with another media file&quot;</summary> 
 public static string MediaFileProviderElementProvider_ChangeMediaFileToolTip { get { return T("MediaFileProviderElementProvider.ChangeMediaFileToolTip"); } } 
 /// <summary>&quot;Upload Multiple&quot;</summary> 
 public static string MediaFileProviderElementProvider_UploadZipFile { get { return T("MediaFileProviderElementProvider.UploadZipFile"); } } 
 /// <summary>&quot;Upload Zip file&quot;</summary> 
 public static string MediaFileProviderElementProvider_UploadZipFileToolTip { get { return T("MediaFileProviderElementProvider.UploadZipFileToolTip"); } } 
 /// <summary>&quot;Media Item&quot;</summary> 
 public static string MediaFileProviderElementProvider_MediaFileItemToolTip { get { return T("MediaFileProviderElementProvider.MediaFileItemToolTip"); } } 
 /// <summary>&quot;Organize folders and files&quot;</summary> 
 public static string MediaFileProviderElementProvider_OrganizedFilesAndFoldersToolTip { get { return T("MediaFileProviderElementProvider.OrganizedFilesAndFoldersToolTip"); } } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string MediaFileProviderElementProvider_ErrorMessageTitle { get { return T("MediaFileProviderElementProvider.ErrorMessageTitle"); } } 
 /// <summary>&quot;File &apos;{0}&apos; already exists in folder &apos;{1}&apos;&quot;</summary> 
 public static string MediaFileProviderElementProvider_FileAlreadyExistsMessage(object parameter0,object parameter1) { return string.Format(T("MediaFileProviderElementProvider.FileAlreadyExistsMessage"), parameter0,parameter1); } 
 /// <summary>&quot;Failure&quot;</summary> 
 public static string UploadNewMediaFileWorkflow_UploadFailure { get { return T("UploadNewMediaFileWorkflow.UploadFailure"); } } 
 /// <summary>&quot;The uploaded file must be of the same type as the original. The file you uploaded is of a different type.&quot;</summary> 
 public static string UploadNewMediaFileWorkflow_UploadFailureMessage { get { return T("UploadNewMediaFileWorkflow.UploadFailureMessage"); } } 
 /// <summary>&quot;Show Graph&quot;</summary> 
 public static string RelationshipGraphActionExecutor_ShowGraph { get { return T("RelationshipGraphActionExecutor.ShowGraph"); } } 
 /// <summary>&quot;Show relationship graph&quot;</summary> 
 public static string RelationshipGraphActionExecutor_ShowGraphToolTip { get { return T("RelationshipGraphActionExecutor.ShowGraphToolTip"); } } 
 /// <summary>&quot;Show Oriented Graph&quot;</summary> 
 public static string RelationshipGraphActionExecutor_ShowOrientedGraph { get { return T("RelationshipGraphActionExecutor.ShowOrientedGraph"); } } 
 /// <summary>&quot;Show Oriented Relationship graph&quot;</summary> 
 public static string RelationshipGraphActionExecutor_ShowOrientedGraphToolTip { get { return T("RelationshipGraphActionExecutor.ShowOrientedGraphToolTip"); } } 
 /// <summary>&quot;Show Element Information&quot;</summary> 
 public static string ShowElementInformationActionExecutor_ShowElementInformation_Label { get { return T("ShowElementInformationActionExecutor.ShowElementInformation.Label"); } } 
 /// <summary>&quot;Show Element Information&quot;</summary> 
 public static string ShowElementInformationActionExecutor_ShowElementInformation_ToolTip { get { return T("ShowElementInformationActionExecutor.ShowElementInformation.ToolTip"); } } 
 /// <summary>&quot;Search elements&quot;</summary> 
 public static string RelationshipGraphActionExecutor_Search { get { return T("RelationshipGraphActionExecutor.Search"); } } 
 /// <summary>&quot;Search for elements&quot;</summary> 
 public static string RelationshipGraphActionExecutor_SearchToolTip { get { return T("RelationshipGraphActionExecutor.SearchToolTip"); } } 
 /// <summary>&quot;Search elements&quot;</summary> 
 public static string RelationshipGraphActionExecutor_SearchElements { get { return T("RelationshipGraphActionExecutor.SearchElements"); } } 
 /// <summary>&quot;Search for elements&quot;</summary> 
 public static string RelationshipGraphActionExecutor_SearchElementsToolTip { get { return T("RelationshipGraphActionExecutor.SearchElementsToolTip"); } } 
 /// <summary>&quot;Version No.&quot;</summary> 
 public static string Website_General_LabelVersionNumber { get { return T("Website.General.LabelVersionNumber"); } } 
 /// <summary>&quot;Restart?&quot;</summary> 
 public static string Website_Application_DialogReload_Title { get { return T("Website.Application.DialogReload.Title"); } } 
 /// <summary>&quot;Restart {applicationname}? All unsaved changes will be lost.&quot;</summary> 
 public static string Website_Application_DialogReload_Text { get { return T("Website.Application.DialogReload.Text"); } } 
 /// <summary>&quot;Save Resource?&quot;</summary> 
 public static string WebSite_Application_DialogSaveResource_Title { get { return T("WebSite.Application.DialogSaveResource.Title"); } } 
 /// <summary>&quot;&quot;${resourcename}&quot; has been modified. Save changes?&quot;</summary> 
 public static string WebSite_Application_DialogSaveResource_Text { get { return T("WebSite.Application.DialogSaveResource.Text"); } } 
 /// <summary>&quot;Save Resources?&quot;</summary> 
 public static string Website_Dialogs_SaveAll_LabelSaveResources { get { return T("Website.Dialogs.SaveAll.LabelSaveResources"); } } 
 /// <summary>&quot;Unsaved resources&quot;</summary> 
 public static string Website_Dialogs_SaveAll_LabelUnsavedResources { get { return T("Website.Dialogs.SaveAll.LabelUnsavedResources"); } } 
 /// <summary>&quot;Yes&quot;</summary> 
 public static string Website_Dialogs_LabelYes { get { return T("Website.Dialogs.LabelYes"); } } 
 /// <summary>&quot;No&quot;</summary> 
 public static string Website_Dialogs_LabelNo { get { return T("Website.Dialogs.LabelNo"); } } 
 /// <summary>&quot;OK&quot;</summary> 
 public static string Website_Dialogs_LabelAccept { get { return T("Website.Dialogs.LabelAccept"); } } 
 /// <summary>&quot;Cancel&quot;</summary> 
 public static string Website_Dialogs_LabelCancel { get { return T("Website.Dialogs.LabelCancel"); } } 
 /// <summary>&quot;More Info&quot;</summary> 
 public static string Website_Dialogs_LabelDisclosure { get { return T("Website.Dialogs.LabelDisclosure"); } } 
 /// <summary>&quot;About {applicationname}&quot;</summary> 
 public static string Website_Dialogs_About_Title { get { return T("Website.Dialogs.About.Title"); } } 
 /// <summary>&quot;Credits&quot;</summary> 
 public static string Website_Dialogs_About_LabelCredits { get { return T("Website.Dialogs.About.LabelCredits"); } } 
 /// <summary>&quot;Back&quot;</summary> 
 public static string Website_Dialogs_About_LabelBack { get { return T("Website.Dialogs.About.LabelBack"); } } 
 /// <summary>&quot;Credits&quot;</summary> 
 public static string Website_Dialogs_About_LabelCredits2 { get { return T("Website.Dialogs.About.LabelCredits2"); } } 
 /// <summary>&quot;No access&quot;</summary> 
 public static string Website_Dialogs_NoAccessTitle { get { return T("Website.Dialogs.NoAccessTitle"); } } 
 /// <summary>&quot;You have not been granted access rights to the system. Please contact your administrator.&quot;</summary> 
 public static string Website_Dialogs_NoAccessText { get { return T("Website.Dialogs.NoAccessText"); } } 
 /// <summary>&quot;Unit&quot;</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_Unit { get { return T("Website.Dialogs.ImageEditor.ScaleImage.Unit"); } } 
 /// <summary>&quot;Width&quot;</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_Width { get { return T("Website.Dialogs.ImageEditor.ScaleImage.Width"); } } 
 /// <summary>&quot;Height&quot;</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_Height { get { return T("Website.Dialogs.ImageEditor.ScaleImage.Height"); } } 
 /// <summary>&quot;Scale Image&quot;</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_LabelScaleImage { get { return T("Website.Dialogs.ImageEditor.ScaleImage.LabelScaleImage"); } } 
 /// <summary>&quot;Dimensions&quot;</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_LabelDimensions { get { return T("Website.Dialogs.ImageEditor.ScaleImage.LabelDimensions"); } } 
 /// <summary>&quot;Image Size&quot;</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_LabelImageSize { get { return T("Website.Dialogs.ImageEditor.ScaleImage.LabelImageSize"); } } 
 /// <summary>&quot;Fixed Ratio&quot;</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_LabelFixedRatio { get { return T("Website.Dialogs.ImageEditor.ScaleImage.LabelFixedRatio"); } } 
 /// <summary>&quot;Free Resize&quot;</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_LabelFreeResize { get { return T("Website.Dialogs.ImageEditor.ScaleImage.LabelFreeResize"); } } 
 /// <summary>&quot;Pixels&quot;</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_LabelPixels { get { return T("Website.Dialogs.ImageEditor.ScaleImage.LabelPixels"); } } 
 /// <summary>&quot;Percent&quot;</summary> 
 public static string Website_Dialogs_ImageEditor_ScaleImage_LabelPercent { get { return T("Website.Dialogs.ImageEditor.ScaleImage.LabelPercent"); } } 
 /// <summary>&quot;Login screen&quot;</summary> 
 public static string Website_Dialogs_Options_LoginScreen { get { return T("Website.Dialogs.Options.LoginScreen"); } } 
 /// <summary>&quot;Options&quot;</summary> 
 public static string Website_Dialogs_Options_LabelOptions { get { return T("Website.Dialogs.Options.LabelOptions"); } } 
 /// <summary>&quot;General&quot;</summary> 
 public static string Website_Dialogs_Options_LabelGeneral { get { return T("Website.Dialogs.Options.LabelGeneral"); } } 
 /// <summary>&quot;Advanced&quot;</summary> 
 public static string Website_Dialogs_Options_LabelAdvanced { get { return T("Website.Dialogs.Options.LabelAdvanced"); } } 
 /// <summary>&quot;Login Preferences&quot;</summary> 
 public static string Website_Dialogs_Options_LabelLoginPreferences { get { return T("Website.Dialogs.Options.LabelLoginPreferences"); } } 
 /// <summary>&quot;Fake login screen&quot;</summary> 
 public static string Website_Dialogs_Options_LabelFakeLoginScreen { get { return T("Website.Dialogs.Options.LabelFakeLoginScreen"); } } 
 /// <summary>&quot;No login screen&quot;</summary> 
 public static string Website_Dialogs_Options_LabelNoLoginScreen { get { return T("Website.Dialogs.Options.LabelNoLoginScreen"); } } 
 /// <summary>&quot;Error in web service method &quot;</summary> 
 public static string Website_Dialogs_WebServices_Error { get { return T("Website.Dialogs.WebServices.Error"); } } 
 /// <summary>&quot;Web Service Error&quot;</summary> 
 public static string Website_Dialogs_WebServices_LabelWebServiceError { get { return T("Website.Dialogs.WebServices.LabelWebServiceError"); } } 
 /// <summary>&quot;Insert Where?&quot;</summary> 
 public static string Website_Dialogs_SystemTree_DetailedPaste_Title { get { return T("Website.Dialogs.SystemTree.DetailedPaste.Title"); } } 
 /// <summary>&quot;Position&quot;</summary> 
 public static string Website_Dialogs_SystemTree_DetailedPaste_LabelPosition { get { return T("Website.Dialogs.SystemTree.DetailedPaste.LabelPosition"); } } 
 /// <summary>&quot;Insert before&quot;</summary> 
 public static string Website_Dialogs_SystemTree_DetailedPaste_LabelInsertBefore { get { return T("Website.Dialogs.SystemTree.DetailedPaste.LabelInsertBefore"); } } 
 /// <summary>&quot;Insert after&quot;</summary> 
 public static string Website_Dialogs_SystemTree_DetailedPaste_LabelInsertAfter { get { return T("Website.Dialogs.SystemTree.DetailedPaste.LabelInsertAfter"); } } 
 /// <summary>&quot;Basic view&quot;</summary> 
 public static string Website_Dialogs_EditFunction_BasicView { get { return T("Website.Dialogs.EditFunction.BasicView"); } } 
 /// <summary>&quot;Advanced view&quot;</summary> 
 public static string Website_Dialogs_EditFunction_AdvancedView { get { return T("Website.Dialogs.EditFunction.AdvancedView"); } } 
 /// <summary>&quot;This function has no parameters&quot;</summary> 
 public static string Website_Dialogs_EditFunction_BasicView_NoParameters { get { return T("Website.Dialogs.EditFunction.BasicView.NoParameters"); } } 
 /// <summary>&quot;Edit image&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelTitle { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelTitle"); } } 
 /// <summary>&quot;File&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelFile { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelFile"); } } 
 /// <summary>&quot;Save&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelSave { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelSave"); } } 
 /// <summary>&quot;Save As...&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelSaveAs { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelSaveAs"); } } 
 /// <summary>&quot;Revert&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelRevert { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRevert"); } } 
 /// <summary>&quot;View&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelView { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelView"); } } 
 /// <summary>&quot;Zoom&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelZoom { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelZoom"); } } 
 /// <summary>&quot;Zoom In&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelZoomIn { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelZoomIn"); } } 
 /// <summary>&quot;Zoom Out&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelZoomOut { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelZoomOut"); } } 
 /// <summary>&quot;800%&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label800 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label800"); } } 
 /// <summary>&quot;400%&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label400 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label400"); } } 
 /// <summary>&quot;200%&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label200 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label200"); } } 
 /// <summary>&quot;100%&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label100 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label100"); } } 
 /// <summary>&quot;50%&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label50 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label50"); } } 
 /// <summary>&quot;25%&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label25 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label25"); } } 
 /// <summary>&quot;12%&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label12 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label12"); } } 
 /// <summary>&quot;Image&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelImage { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelImage"); } } 
 /// <summary>&quot;Transform&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelTransform { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelTransform"); } } 
 /// <summary>&quot;Flip Horizontally&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelFlipHorizontal { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelFlipHorizontal"); } } 
 /// <summary>&quot;Flip Vertically&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelFlipVertical { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelFlipVertical"); } } 
 /// <summary>&quot;Rotate 90 Degrees CW&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelRotate90CW { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRotate90CW"); } } 
 /// <summary>&quot;Rotate 90 Degrees CCW&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelRotate90CCW { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRotate90CCW"); } } 
 /// <summary>&quot;Rotate 180 Degrees&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelRotate180 { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRotate180"); } } 
 /// <summary>&quot;Scale Image...&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelScale { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelScale"); } } 
 /// <summary>&quot;Crop Image&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelCrop { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelCrop"); } } 
 /// <summary>&quot;Select&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBox_ToolTipSelect { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBox.ToolTipSelect"); } } 
 /// <summary>&quot;Zoom&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBox_ToolTipZoom { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBox.ToolTipZoom"); } } 
 /// <summary>&quot;Save&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelSave { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelSave"); } } 
 /// <summary>&quot;Scale image&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelScale { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelScale"); } } 
 /// <summary>&quot;Crop image&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelCrop { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelCrop"); } } 
 /// <summary>&quot;Undo&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelUndo { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelUndo"); } } 
 /// <summary>&quot;Redo&quot;</summary> 
 public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelRedo { get { return T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelRedo"); } } 
 /// <summary>&quot;Permissions&quot;</summary> 
 public static string Website_Content_Views_Editors_PermissionEditor_LabelTitle { get { return T("Website.Content.Views.Editors.PermissionEditor.LabelTitle"); } } 
 /// <summary>&quot;Users&quot;</summary> 
 public static string Website_Content_Views_Editors_PermissionEditor_LabelTabUsers { get { return T("Website.Content.Views.Editors.PermissionEditor.LabelTabUsers"); } } 
 /// <summary>&quot;User Groups&quot;</summary> 
 public static string Website_Content_Views_Editors_PermissionEditor_LabelTabUserGroups { get { return T("Website.Content.Views.Editors.PermissionEditor.LabelTabUserGroups"); } } 
 /// <summary>&quot;Save&quot;</summary> 
 public static string Website_Content_Views_Editors_PermissionEditor_LabelButtonSave { get { return T("Website.Content.Views.Editors.PermissionEditor.LabelButtonSave"); } } 
 /// <summary>&quot;Go back one page&quot;</summary> 
 public static string Website_Content_Views_Help_ToolTipBack { get { return T("Website.Content.Views.Help.ToolTipBack"); } } 
 /// <summary>&quot;Go forward one page&quot;</summary> 
 public static string Website_Content_Views_Help_ToolTipForward { get { return T("Website.Content.Views.Help.ToolTipForward"); } } 
 /// <summary>&quot;Refresh page&quot;</summary> 
 public static string Website_Content_Views_Help_ToolTipRefresh { get { return T("Website.Content.Views.Help.ToolTipRefresh"); } } 
 /// <summary>&quot;Contents&quot;</summary> 
 public static string Website_Content_Views_Help_LabelContents { get { return T("Website.Content.Views.Help.LabelContents"); } } 
 /// <summary>&quot;Help contents&quot;</summary> 
 public static string Website_Content_Views_Help_ToolTipContents { get { return T("Website.Content.Views.Help.ToolTipContents"); } } 
 /// <summary>&quot;Collapse All&quot;</summary> 
 public static string Website_Content_Views_SystemView_ToolTipCollapseAll { get { return T("Website.Content.Views.SystemView.ToolTipCollapseAll"); } } 
 /// <summary>&quot;Link with Editor&quot;</summary> 
 public static string Website_Content_Views_SystemView_ToolTipLinkWithEditor { get { return T("Website.Content.Views.SystemView.ToolTipLinkWithEditor"); } } 
 /// <summary>&quot;New Search...&quot;</summary> 
 public static string Website_Content_Views_Search_Search_LabelNewSearch { get { return T("Website.Content.Views.Search.Search.LabelNewSearch"); } } 
 /// <summary>&quot;Formatted&quot;</summary> 
 public static string Website_Content_Views_ViewSource_LabelFormatted { get { return T("Website.Content.Views.ViewSource.LabelFormatted"); } } 
 /// <summary>&quot;Raw&quot;</summary> 
 public static string Website_Content_Views_ViewSource_LabelRaw { get { return T("Website.Content.Views.ViewSource.LabelRaw"); } } 
 /// <summary>&quot;Server Log&quot;</summary> 
 public static string ServerLog_Element_Label { get { return T("ServerLog.Element.Label"); } } 
 /// <summary>&quot;The server log contain security and system health related messages.&quot;</summary> 
 public static string ServerLog_Element_Tooltip { get { return T("ServerLog.Element.Tooltip"); } } 
 /// <summary>&quot;View Server Log&quot;</summary> 
 public static string ServerLog_Element_View_Label { get { return T("ServerLog.Element.View.Label"); } } 
 /// <summary>&quot;View recent server events&quot;</summary> 
 public static string ServerLog_Element_View_Tooltip { get { return T("ServerLog.Element.View.Tooltip"); } } 
 /// <summary>&quot;Server Log&quot;</summary> 
 public static string ServerLog_LabelTitle { get { return T("ServerLog.LabelTitle"); } } 
 /// <summary>&quot;Delete old&quot;</summary> 
 public static string ServerLog_LabelButtonDeleteOld { get { return T("ServerLog.LabelButtonDeleteOld"); } } 
 /// <summary>&quot;Refresh&quot;</summary> 
 public static string ServerLog_LabelButtonRefresh { get { return T("ServerLog.LabelButtonRefresh"); } } 
 /// <summary>&quot;No log data available...&quot;</summary> 
 public static string ServerLog_EmptyLabel { get { return T("ServerLog.EmptyLabel"); } } 
 /// <summary>&quot;Date&quot;</summary> 
 public static string ServerLog_LogEntry_DateLabel { get { return T("ServerLog.LogEntry.DateLabel"); } } 
 /// <summary>&quot;Message&quot;</summary> 
 public static string ServerLog_LogEntry_MessageLabel { get { return T("ServerLog.LogEntry.MessageLabel"); } } 
 /// <summary>&quot;Title&quot;</summary> 
 public static string ServerLog_LogEntry_TitleLabel { get { return T("ServerLog.LogEntry.TitleLabel"); } } 
 /// <summary>&quot;EventType&quot;</summary> 
 public static string ServerLog_LogEntry_EventTypeLabel { get { return T("ServerLog.LogEntry.EventTypeLabel"); } } 
 /// <summary>&quot;Verbose&quot;</summary> 
 public static string ServerLog_Severity_Verbose { get { return T("ServerLog.Severity.Verbose"); } } 
 /// <summary>&quot;Information&quot;</summary> 
 public static string ServerLog_Severity_Information { get { return T("ServerLog.Severity.Information"); } } 
 /// <summary>&quot;Warning&quot;</summary> 
 public static string ServerLog_Severity_Warning { get { return T("ServerLog.Severity.Warning"); } } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string ServerLog_Severity_Error { get { return T("ServerLog.Severity.Error"); } } 
 /// <summary>&quot;Critical&quot;</summary> 
 public static string ServerLog_Severity_Critical { get { return T("ServerLog.Severity.Critical"); } } 
 /// <summary>&quot;Refresh&quot;</summary> 
 public static string FunctionDocumentation_LabelButtonRefresh { get { return T("FunctionDocumentation.LabelButtonRefresh"); } } 
 /// <summary>&quot;Print&quot;</summary> 
 public static string FunctionDocumentation_LabelButtonPrint { get { return T("FunctionDocumentation.LabelButtonPrint"); } } 
 /// <summary>&quot;Execution Ended&quot;</summary> 
 public static string Website_FlowUICompleted_ExecutionEndedTitle { get { return T("Website.FlowUICompleted.ExecutionEndedTitle"); } } 
 /// <summary>&quot;The action executed in this window has ended.&quot;</summary> 
 public static string Website_FlowUICompleted_ExecutionEndedMessage { get { return T("Website.FlowUICompleted.ExecutionEndedMessage"); } } 
 /// <summary>&quot;Server Error&quot;</summary> 
 public static string Website_ServerError_ServerErrorTitle { get { return T("Website.ServerError.ServerErrorTitle"); } } 
 /// <summary>&quot;An unfortunate error has occurred.&quot;</summary> 
 public static string Website_ServerError_ServerErrorMessage { get { return T("Website.ServerError.ServerErrorMessage"); } } 
 /// <summary>&quot;Details&quot;</summary> 
 public static string Website_ServerError_ServerErrorDetails { get { return T("Website.ServerError.ServerErrorDetails"); } } 
 /// <summary>&quot;License Violation&quot;</summary> 
 public static string Website_LicenseViolation_LicenseViolationTitle { get { return T("Website.LicenseViolation.LicenseViolationTitle"); } } 
 /// <summary>&quot;The requested action is in violates with your current license.&quot;</summary> 
 public static string Website_LicenseViolation_LicenseViolationMessage { get { return T("Website.LicenseViolation.LicenseViolationMessage"); } } 
 /// <summary>&quot;Flash options&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelFlashOptions { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelFlashOptions"); } } 
 /// <summary>&quot;High&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelHigh { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelHigh"); } } 
 /// <summary>&quot;Low&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelLow { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelLow"); } } 
 /// <summary>&quot;Autohigh&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelAutohigh { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelAutohigh"); } } 
 /// <summary>&quot;Autolow&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelAutolow { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelAutolow"); } } 
 /// <summary>&quot;Best&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelBest { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelBest"); } } 
 /// <summary>&quot;Window&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelWindow { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelWindow"); } } 
 /// <summary>&quot;Opaque&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelOpaque { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelOpaque"); } } 
 /// <summary>&quot;Transparent&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelTransparent { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelTransparent"); } } 
 /// <summary>&quot;Showall&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelShowall { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelShowall"); } } 
 /// <summary>&quot;Noborder&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelNoborder { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelNoborder"); } } 
 /// <summary>&quot;Exactfit&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelExactfit { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelExactfit"); } } 
 /// <summary>&quot;Auto play&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelAutoPlay { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelAutoPlay"); } } 
 /// <summary>&quot;Loop&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelLoop { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelLoop"); } } 
 /// <summary>&quot;Show menu&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelShowMenu { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelShowMenu"); } } 
 /// <summary>&quot;SWLiveConnect&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelSWLiveConnect { get { return T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelSWLiveConnect"); } } 
 /// <summary>&quot;Quicktime options&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelQuickTimeOptions { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelQuickTimeOptions"); } } 
 /// <summary>&quot;Loop&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelLoop { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelLoop"); } } 
 /// <summary>&quot;Cache&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelCache { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelCache"); } } 
 /// <summary>&quot;No correction&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelNoCorrection { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelNoCorrection"); } } 
 /// <summary>&quot;Kiosk mode&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelKioskMode { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelKioskMode"); } } 
 /// <summary>&quot;Play every frame&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelPlayEveryFrame { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelPlayEveryFrame"); } } 
 /// <summary>&quot;Auto play&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelAutoPlay { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelAutoPlay"); } } 
 /// <summary>&quot;Controller&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelController { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelController"); } } 
 /// <summary>&quot;Enable Javascript&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelEnableJavaScript { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelEnableJavaScript"); } } 
 /// <summary>&quot;AutoHREF&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelAutoHRef { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelAutoHRef"); } } 
 /// <summary>&quot;Target cache&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelTargetCache { get { return T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelTargetCache"); } } 
 /// <summary>&quot;Shockwave options&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelShockWaveOptions { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelShockWaveOptions"); } } 
 /// <summary>&quot;High&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelHigh { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelHigh"); } } 
 /// <summary>&quot;Low&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelLow { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelLow"); } } 
 /// <summary>&quot;Autohigh&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelAutoHigh { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelAutoHigh"); } } 
 /// <summary>&quot;Autolow&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelAutoLow { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelAutoLow"); } } 
 /// <summary>&quot;Best&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelBest { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelBest"); } } 
 /// <summary>&quot;Window&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelWindow { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelWindow"); } } 
 /// <summary>&quot;Opaque&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelOpaque { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelOpaque"); } } 
 /// <summary>&quot;Transparent&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelTransparent { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelTransparent"); } } 
 /// <summary>&quot;Showall&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelShowAll { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelShowAll"); } } 
 /// <summary>&quot;Noborder&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelNoBorder { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelNoBorder"); } } 
 /// <summary>&quot;Exactfit&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelExactFit { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelExactFit"); } } 
 /// <summary>&quot;Auto play&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelAutoPlay { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelAutoPlay"); } } 
 /// <summary>&quot;Loop&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelLoop { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelLoop"); } } 
 /// <summary>&quot;Show menu&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelShowMenu { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelShowMenu"); } } 
 /// <summary>&quot;SWLiveConnect&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelSWLiveConnect { get { return T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelSWLiveConnect"); } } 
 /// <summary>&quot;Quicktime options&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelQuickTimeOptions { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelQuickTimeOptions"); } } 
 /// <summary>&quot;Auto Start&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelAutoStart { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelAutoStart"); } } 
 /// <summary>&quot;Show menu&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelShowMenu { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelShowMenu"); } } 
 /// <summary>&quot;Invoke URLs&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelInvokeURLs { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelInvokeURLs"); } } 
 /// <summary>&quot;Stretch to fit&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelStretchToFit { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelStretchToFit"); } } 
 /// <summary>&quot;Enabled&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelEnabled { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelEnabled"); } } 
 /// <summary>&quot;Fullscreen&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelFullScreen { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelFullScreen"); } } 
 /// <summary>&quot;Mute&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelMute { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelMute"); } } 
 /// <summary>&quot;Windowless video&quot;</summary> 
 public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelWindowLessVideo { get { return T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelWindowLessVideo"); } } 
 /// <summary>&quot;Save&quot;</summary> 
 public static string Website_App_LabelSave { get { return T("Website.App.LabelSave"); } } 
 /// <summary>&quot;Save and Publish&quot;</summary> 
 public static string Website_App_LabelSaveAndPublish { get { return T("Website.App.LabelSaveAndPublish"); } } 
 /// <summary>&quot;Close Tab&quot;</summary> 
 public static string Website_App_LabelCloseTab { get { return T("Website.App.LabelCloseTab"); } } 
 /// <summary>&quot;Close Others&quot;</summary> 
 public static string Website_App_LabelCloseOthers { get { return T("Website.App.LabelCloseOthers"); } } 
 /// <summary>&quot;Refresh View&quot;</summary> 
 public static string Website_App_LabelRefreshView { get { return T("Website.App.LabelRefreshView"); } } 
 /// <summary>&quot;Make Dirty&quot;</summary> 
 public static string Website_App_LabelMakeDirty { get { return T("Website.App.LabelMakeDirty"); } } 
 /// <summary>&quot;View Source&quot;</summary> 
 public static string Website_App_LabelViewSource { get { return T("Website.App.LabelViewSource"); } } 
 /// <summary>&quot;View Generated&quot;</summary> 
 public static string Website_App_LabelViewGenerated { get { return T("Website.App.LabelViewGenerated"); } } 
 /// <summary>&quot;View Serialized&quot;</summary> 
 public static string Website_App_LabelViewSerialized { get { return T("Website.App.LabelViewSerialized"); } } 
 /// <summary>&quot;Close&quot;</summary> 
 public static string Website_App_LabelClose { get { return T("Website.App.LabelClose"); } } 
 /// <summary>&quot;File&quot;</summary> 
 public static string Website_App_LabelFile { get { return T("Website.App.LabelFile"); } } 
 /// <summary>&quot;Close&quot;</summary> 
 public static string Website_App_LabelFileClose { get { return T("Website.App.LabelFileClose"); } } 
 /// <summary>&quot;Close All&quot;</summary> 
 public static string Website_App_LabelFileCloseAll { get { return T("Website.App.LabelFileCloseAll"); } } 
 /// <summary>&quot;Save All...&quot;</summary> 
 public static string Website_App_LabelFileSaveAll { get { return T("Website.App.LabelFileSaveAll"); } } 
 /// <summary>&quot;Sign out&quot;</summary> 
 public static string Website_App_LabelFileExit { get { return T("Website.App.LabelFileExit"); } } 
 /// <summary>&quot;View&quot;</summary> 
 public static string Website_App_LabelView { get { return T("Website.App.LabelView"); } } 
 /// <summary>&quot;Composite Start&quot;</summary> 
 public static string Website_App_LabelViewCompositeStart { get { return T("Website.App.LabelViewCompositeStart"); } } 
 /// <summary>&quot;System Log&quot;</summary> 
 public static string Website_App_LabelSystemLog { get { return T("Website.App.LabelSystemLog"); } } 
 /// <summary>&quot;Developer Panel&quot;</summary> 
 public static string Website_App_LabelDeveloperPanel { get { return T("Website.App.LabelDeveloperPanel"); } } 
 /// <summary>&quot;Tools&quot;</summary> 
 public static string Website_App_LabelTools { get { return T("Website.App.LabelTools"); } } 
 /// <summary>&quot;Help&quot;</summary> 
 public static string Website_App_LabelHelp { get { return T("Website.App.LabelHelp"); } } 
 /// <summary>&quot;Settings&quot;</summary> 
 public static string Website_App_LabelSettings { get { return T("Website.App.LabelSettings"); } } 
 /// <summary>&quot;Help Contents&quot;</summary> 
 public static string Website_App_LabelHelpContents { get { return T("Website.App.LabelHelpContents"); } } 
 /// <summary>&quot;Provide Feedback...&quot;</summary> 
 public static string Website_App_LabelFeedback { get { return T("Website.App.LabelFeedback"); } } 
 /// <summary>&quot;About {applicationname}&quot;</summary> 
 public static string Website_App_LabelAbout { get { return T("Website.App.LabelAbout"); } } 
 /// <summary>&quot;Cut&quot;</summary> 
 public static string Website_App_LabelCut { get { return T("Website.App.LabelCut"); } } 
 /// <summary>&quot;Copy&quot;</summary> 
 public static string Website_App_LabelCopy { get { return T("Website.App.LabelCopy"); } } 
 /// <summary>&quot;Paste&quot;</summary> 
 public static string Website_App_LabelPaste { get { return T("Website.App.LabelPaste"); } } 
 /// <summary>&quot;Refresh&quot;</summary> 
 public static string Website_App_LabelRefresh { get { return T("Website.App.LabelRefresh"); } } 
 /// <summary>&quot;Only first {0} elements are shown in the tree.&quot;</summary> 
 public static string Website_App_LimitedElementsShown(object parameter0) { return string.Format(T("Website.App.LimitedElementsShown"), parameter0); } 
 /// <summary>&quot;Loading...&quot;</summary> 
 public static string Website_App_LabelLoading { get { return T("Website.App.LabelLoading"); } } 
 /// <summary>&quot;Loaded&quot;</summary> 
 public static string Website_App_LabelLoaded { get { return T("Website.App.LabelLoaded"); } } 
 /// <summary>&quot;Saved&quot;</summary> 
 public static string Website_App_LabelSaved { get { return T("Website.App.LabelSaved"); } } 
 /// <summary>&quot;Minimize&quot;</summary> 
 public static string Website_App_ToolTipMinimize { get { return T("Website.App.ToolTipMinimize"); } } 
 /// <summary>&quot;Maximize&quot;</summary> 
 public static string Website_App_ToolTipMaximize { get { return T("Website.App.ToolTipMaximize"); } } 
 /// <summary>&quot;Restore&quot;</summary> 
 public static string Website_App_ToolTipUnMaximize { get { return T("Website.App.ToolTipUnMaximize"); } } 
 /// <summary>&quot;Restore&quot;</summary> 
 public static string Website_App_ToolTipUnMinimize { get { return T("Website.App.ToolTipUnMinimize"); } } 
 /// <summary>&quot;Close&quot;</summary> 
 public static string Website_App_ToolTipClose { get { return T("Website.App.ToolTipClose"); } } 
 /// <summary>&quot;Opening {0}...&quot;</summary> 
 public static string Website_App_StatusBar_Opening(object parameter0) { return string.Format(T("Website.App.StatusBar.Opening"), parameter0); } 
 /// <summary>&quot;Refreshing {0}...&quot;</summary> 
 public static string Website_App_StatusBar_Refreshing(object parameter0) { return string.Format(T("Website.App.StatusBar.Refreshing"), parameter0); } 
 /// <summary>&quot;Loading {0}...&quot;</summary> 
 public static string Website_App_StatusBar_Loading(object parameter0) { return string.Format(T("Website.App.StatusBar.Loading"), parameter0); } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string Website_App_StatusBar_Error { get { return T("Website.App.StatusBar.Error"); } } 
 /// <summary>&quot;Warning&quot;</summary> 
 public static string Website_App_StatusBar_Warn { get { return T("Website.App.StatusBar.Warn"); } } 
 /// <summary>&quot;Working...&quot;</summary> 
 public static string Website_App_StatusBar_Busy { get { return T("Website.App.StatusBar.Busy"); } } 
 /// <summary>&quot;Ready!&quot;</summary> 
 public static string Website_App_StatusBar_Ready { get { return T("Website.App.StatusBar.Ready"); } } 
 /// <summary>&quot;Error in&quot;</summary> 
 public static string Website_App_StatusBar_ErrorInField { get { return T("Website.App.StatusBar.ErrorInField"); } } 
 /// <summary>&quot;Add New Media File&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_Layout_Label { get { return T("Website.Forms.Administrative.AddNewMediaFile.Layout.Label"); } } 
 /// <summary>&quot;Filename&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_FileUpload_Label { get { return T("Website.Forms.Administrative.AddNewMediaFile.FileUpload.Label"); } } 
 /// <summary>&quot;Select the file to upload&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_FileUpload_Help { get { return T("Website.Forms.Administrative.AddNewMediaFile.FileUpload.Help"); } } 
 /// <summary>&quot;Allow overwrite&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_OverwriteCheckBox_Label { get { return T("Website.Forms.Administrative.AddNewMediaFile.OverwriteCheckBox.Label"); } } 
 /// <summary>&quot;Replace existing file&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_OverwriteCheckBox_Help { get { return T("Website.Forms.Administrative.AddNewMediaFile.OverwriteCheckBox.Help"); } } 
 /// <summary>&quot;Filename&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_FilenameTextBox_Label { get { return T("Website.Forms.Administrative.AddNewMediaFile.FilenameTextBox.Label"); } } 
 /// <summary>&quot;The name of the file in the media library&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_FilenameTextBox_Help { get { return T("Website.Forms.Administrative.AddNewMediaFile.FilenameTextBox.Help"); } } 
 /// <summary>&quot;Title&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_TitleTextBox_Label { get { return T("Website.Forms.Administrative.AddNewMediaFile.TitleTextBox.Label"); } } 
 /// <summary>&quot;Use this field for an image title&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_TitleTextBox_Help { get { return T("Website.Forms.Administrative.AddNewMediaFile.TitleTextBox.Help"); } } 
 /// <summary>&quot;Description&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_DescriptionTextBox_Label { get { return T("Website.Forms.Administrative.AddNewMediaFile.DescriptionTextBox.Label"); } } 
 /// <summary>&quot;Use this field for a short description of the image&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_DescriptionTextBox_Help { get { return T("Website.Forms.Administrative.AddNewMediaFile.DescriptionTextBox.Help"); } } 
 /// <summary>&quot;Please select a file to upload&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_MissingUploadedFile_Message { get { return T("Website.Forms.Administrative.AddNewMediaFile.MissingUploadedFile.Message"); } } 
 /// <summary>&quot;A file with the same name exists. Check allow overwrite or change the filename&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_FileExists_Message { get { return T("Website.Forms.Administrative.AddNewMediaFile.FileExists.Message"); } } 
 /// <summary>&quot;The total length of the filename (folder and filename) is too long&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFile_TotalFilenameToLong_Message { get { return T("Website.Forms.Administrative.AddNewMediaFile.TotalFilenameToLong.Message"); } } 
 /// <summary>&quot;Add New Media Folder&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_Label_AddNewMediaFolder { get { return T("Website.Forms.Administrative.AddNewMediaFolder.Label.AddNewMediaFolder"); } } 
 /// <summary>&quot;Folder Name&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_LabelFolderName { get { return T("Website.Forms.Administrative.AddNewMediaFolder.LabelFolderName"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_HelpFolderName { get { return T("Website.Forms.Administrative.AddNewMediaFolder.HelpFolderName"); } } 
 /// <summary>&quot;Title&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_LabelTitle { get { return T("Website.Forms.Administrative.AddNewMediaFolder.LabelTitle"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_HelpTitle { get { return T("Website.Forms.Administrative.AddNewMediaFolder.HelpTitle"); } } 
 /// <summary>&quot;Description&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_LabelDescription { get { return T("Website.Forms.Administrative.AddNewMediaFolder.LabelDescription"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_HelpDescription { get { return T("Website.Forms.Administrative.AddNewMediaFolder.HelpDescription"); } } 
 /// <summary>&quot;The folder already exists&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_FolderNameAlreadyUsed { get { return T("Website.Forms.Administrative.AddNewMediaFolder.FolderNameAlreadyUsed"); } } 
 /// <summary>&quot;The total length of the folder name is too long&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_FolderNameTooLong { get { return T("Website.Forms.Administrative.AddNewMediaFolder.FolderNameTooLong"); } } 
 /// <summary>&quot;The folder name can not only be &apos;/&apos; or &apos;\&apos;&quot;</summary> 
 public static string Website_Forms_Administrative_AddNewMediaFolder_FolderNotOnlySlash { get { return T("Website.Forms.Administrative.AddNewMediaFolder.FolderNotOnlySlash"); } } 
 /// <summary>&quot;Upload Multiple Files via a Zip File&quot;</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_LabelDialog { get { return T("Website.Forms.Administrative.AddZipMediaFile.LabelDialog"); } } 
 /// <summary>&quot;Zip file&quot;</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_LabelFile { get { return T("Website.Forms.Administrative.AddZipMediaFile.LabelFile"); } } 
 /// <summary>&quot;Create a Zip file (right click local folder and select Send to -&gt; Compressed folder) and select it using the Browse button&quot;</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_HelpFile { get { return T("Website.Forms.Administrative.AddZipMediaFile.HelpFile"); } } 
 /// <summary>&quot;Create folders&quot;</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_LabelRecreateStructure { get { return T("Website.Forms.Administrative.AddZipMediaFile.LabelRecreateStructure"); } } 
 /// <summary>&quot;Selecting this option will copy the exact folder structure from your Zip file&quot;</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_HelpRecreateStructure { get { return T("Website.Forms.Administrative.AddZipMediaFile.HelpRecreateStructure"); } } 
 /// <summary>&quot;Extract folders from Zip file&quot;</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_LabelRecreateStructureCheckBox { get { return T("Website.Forms.Administrative.AddZipMediaFile.LabelRecreateStructureCheckBox"); } } 
 /// <summary>&quot;Overwrite existing&quot;</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_LabelOverwriteExsisting { get { return T("Website.Forms.Administrative.AddZipMediaFile.LabelOverwriteExsisting"); } } 
 /// <summary>&quot;Selecting this option will overwrite existing files in the media archive with matching file names&quot;</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_HelpOverwriteExsisting { get { return T("Website.Forms.Administrative.AddZipMediaFile.HelpOverwriteExsisting"); } } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_Error_Title { get { return T("Website.Forms.Administrative.AddZipMediaFile.Error.Title"); } } 
 /// <summary>&quot;Overwrite existing files&quot;</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_LabelOverwriteExsistingCheckBox { get { return T("Website.Forms.Administrative.AddZipMediaFile.LabelOverwriteExsistingCheckBox"); } } 
 /// <summary>&quot;Please select a file to upload&quot;</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_MissingUploadedFile_Message { get { return T("Website.Forms.Administrative.AddZipMediaFile.MissingUploadedFile.Message"); } } 
 /// <summary>&quot;Please use the normal upload command to upload .docx files&quot;</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_CannotUploadDocxFile { get { return T("Website.Forms.Administrative.AddZipMediaFile.CannotUploadDocxFile"); } } 
 /// <summary>&quot;The selected file was not a correct zip file&quot;</summary> 
 public static string Website_Forms_Administrative_AddZipMediaFile_WrongUploadedFile_Message { get { return T("Website.Forms.Administrative.AddZipMediaFile.WrongUploadedFile.Message"); } } 
 /// <summary>&quot;Function search&quot;</summary> 
 public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelFunctionSearch { get { return T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelFunctionSearch"); } } 
 /// <summary>&quot;Keyword&quot;</summary> 
 public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelKeyword { get { return T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelKeyword"); } } 
 /// <summary>&quot;Write a keyword to search for.&quot;</summary> 
 public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelKeywordHelp { get { return T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelKeywordHelp"); } } 
 /// <summary>&quot;Return type&quot;</summary> 
 public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelReturnType { get { return T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelReturnType"); } } 
 /// <summary>&quot;Select a return type to search for.&quot;</summary> 
 public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelReturnTypeHelp { get { return T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelReturnTypeHelp"); } } 
 /// <summary>&quot;Delete This File?&quot;</summary> 
 public static string Website_Forms_Administrative_DeleteMediaFile_LabelFieldGroup { get { return T("Website.Forms.Administrative.DeleteMediaFile.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete this file?&quot;</summary> 
 public static string Website_Forms_Administrative_DeleteMediaFile_Text { get { return T("Website.Forms.Administrative.DeleteMediaFile.Text"); } } 
 /// <summary>&quot;Deleting a file&quot;</summary> 
 public static string Website_Forms_Administrative_DeleteMediaFile_DeleteDataConfirmationHeader { get { return T("Website.Forms.Administrative.DeleteMediaFile.DeleteDataConfirmationHeader"); } } 
 /// <summary>&quot;There is some referenced data that will also be deleted, do you want to continue?&quot;</summary> 
 public static string Website_Forms_Administrative_DeleteMediaFile_DeleteDataConfirmationText { get { return T("Website.Forms.Administrative.DeleteMediaFile.DeleteDataConfirmationText"); } } 
 /// <summary>&quot;Delete This Folder?&quot;</summary> 
 public static string Website_Forms_Administrative_DeleteMediaFolder_LabelFieldGroup { get { return T("Website.Forms.Administrative.DeleteMediaFolder.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete this folder?&quot;</summary> 
 public static string Website_Forms_Administrative_DeleteMediaFolder_Text { get { return T("Website.Forms.Administrative.DeleteMediaFolder.Text"); } } 
 /// <summary>&quot;This folder contains one or more files or subfolders. Deleting this folder will also delete all sub files and folders. Delete this folder?&quot;</summary> 
 public static string Website_Forms_Administrative_DeleteMediaFolder_HasChildringText { get { return T("Website.Forms.Administrative.DeleteMediaFolder.HasChildringText"); } } 
 /// <summary>&quot;Media Properties&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_LabelFieldGroup { get { return T("Website.Forms.Administrative.EditMediaFile.LabelFieldGroup"); } } 
 /// <summary>&quot;Title&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_LabelTitle { get { return T("Website.Forms.Administrative.EditMediaFile.LabelTitle"); } } 
 /// <summary>&quot;A human friendly short text describing the content of the media file&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_HelpTitle { get { return T("Website.Forms.Administrative.EditMediaFile.HelpTitle"); } } 
 /// <summary>&quot;File Name&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_LabelFileName { get { return T("Website.Forms.Administrative.EditMediaFile.LabelFileName"); } } 
 /// <summary>&quot;The file name to use when the media file is downloaded.&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_HelpFileName { get { return T("Website.Forms.Administrative.EditMediaFile.HelpFileName"); } } 
 /// <summary>&quot;Description&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_LabelDescription { get { return T("Website.Forms.Administrative.EditMediaFile.LabelDescription"); } } 
 /// <summary>&quot;A description of the media file content&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_HelpDescription { get { return T("Website.Forms.Administrative.EditMediaFile.HelpDescription"); } } 
 /// <summary>&quot;The total length of the filename (folder and filename) is too long&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_TotalFilenameToLong_Message { get { return T("Website.Forms.Administrative.EditMediaFile.TotalFilenameToLong.Message"); } } 
 /// <summary>&quot;A file with the same name already exists in this folder.&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFile_FileExists_Message { get { return T("Website.Forms.Administrative.EditMediaFile.FileExists.Message"); } } 
 /// <summary>&quot;Folder Properties&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_LabelFieldGroup { get { return T("Website.Forms.Administrative.EditMediaFolder.LabelFieldGroup"); } } 
 /// <summary>&quot;Folder Name&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_LabelFolderName { get { return T("Website.Forms.Administrative.EditMediaFolder.LabelFolderName"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_HelpFolderName { get { return T("Website.Forms.Administrative.EditMediaFolder.HelpFolderName"); } } 
 /// <summary>&quot;Title&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_LabelTitle { get { return T("Website.Forms.Administrative.EditMediaFolder.LabelTitle"); } } 
 /// <summary>&quot;Use this field for a folder title&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_HelpTitle { get { return T("Website.Forms.Administrative.EditMediaFolder.HelpTitle"); } } 
 /// <summary>&quot;Description&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_LabelDescription { get { return T("Website.Forms.Administrative.EditMediaFolder.LabelDescription"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_HelpDescription { get { return T("Website.Forms.Administrative.EditMediaFolder.HelpDescription"); } } 
 /// <summary>&quot;The folder contains a file where the total length of the filename and the new folder name is too long&quot;</summary> 
 public static string Website_Forms_Administrative_EditMediaFolder_TotalFilenameToLong_Message { get { return T("Website.Forms.Administrative.EditMediaFolder.TotalFilenameToLong.Message"); } } 
 /// <summary>&quot;Draft&quot;</summary> 
 public static string Website_Forms_Administrative_EditPage_DraftTransition { get { return T("Website.Forms.Administrative.EditPage.DraftTransition"); } } 
 /// <summary>&quot;Awaiting Approval&quot;</summary> 
 public static string Website_Forms_Administrative_EditPage_AwaitingApprovalTransition { get { return T("Website.Forms.Administrative.EditPage.AwaitingApprovalTransition"); } } 
 /// <summary>&quot;Awaiting Publication&quot;</summary> 
 public static string Website_Forms_Administrative_EditPage_AwaitingPublicationTransition { get { return T("Website.Forms.Administrative.EditPage.AwaitingPublicationTransition"); } } 
 /// <summary>&quot;Saved, but not published&quot;</summary> 
 public static string Website_Forms_Administrative_EditPage_PublishDatePreventPublishTitle { get { return T("Website.Forms.Administrative.EditPage.PublishDatePreventPublishTitle"); } } 
 /// <summary>&quot;Your page has been saved, but not published since you have a future publish date set on the &apos;Settings&apos; tab.&quot;</summary> 
 public static string Website_Forms_Administrative_EditPage_PublishDatePreventPublish { get { return T("Website.Forms.Administrative.EditPage.PublishDatePreventPublish"); } } 
 /// <summary>&quot;Search&quot;</summary> 
 public static string Website_Forms_Administrative_ElementKeywordSearch_LabelFieldGroup { get { return T("Website.Forms.Administrative.ElementKeywordSearch.LabelFieldGroup"); } } 
 /// <summary>&quot;Keyword&quot;</summary> 
 public static string Website_Forms_Administrative_ElementKeywordSearch_LabelKeyword { get { return T("Website.Forms.Administrative.ElementKeywordSearch.LabelKeyword"); } } 
 /// <summary>&quot;Write a keyword to search for.&quot;</summary> 
 public static string Website_Forms_Administrative_ElementKeywordSearch_LabelSearchKeyword { get { return T("Website.Forms.Administrative.ElementKeywordSearch.LabelSearchKeyword"); } } 
 /// <summary>&quot;Upload New Media File&quot;</summary> 
 public static string Website_Forms_Administrative_UploadMediaFile_LabelFieldGroup { get { return T("Website.Forms.Administrative.UploadMediaFile.LabelFieldGroup"); } } 
 /// <summary>&quot;File name:&quot;</summary> 
 public static string Website_Forms_Administrative_UploadMediaFile_LabelFile { get { return T("Website.Forms.Administrative.UploadMediaFile.LabelFile"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Website_Forms_Administrative_UploadMediaFile_HelpFile { get { return T("Website.Forms.Administrative.UploadMediaFile.HelpFile"); } } 
 /// <summary>&quot;File missing or empty&quot;</summary> 
 public static string Website_Forms_Administrative_UploadMediaFile_EmptyFileErrorTitle { get { return T("Website.Forms.Administrative.UploadMediaFile.EmptyFileErrorTitle"); } } 
 /// <summary>&quot;No file data was received. Please use the browse button and ensure that the selected file is not empty.&quot;</summary> 
 public static string Website_Forms_Administrative_UploadMediaFile_EmptyFileErrorMessage { get { return T("Website.Forms.Administrative.UploadMediaFile.EmptyFileErrorMessage"); } } 
 /// <summary>&quot;Upload New Media File to Existing File&quot;</summary> 
 public static string Website_Forms_Administrative_UploadNewMediaFile_LabelFieldGroup { get { return T("Website.Forms.Administrative.UploadNewMediaFile.LabelFieldGroup"); } } 
 /// <summary>&quot;File name:&quot;</summary> 
 public static string Website_Forms_Administrative_UploadNewMediaFile_LabelFile { get { return T("Website.Forms.Administrative.UploadNewMediaFile.LabelFile"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Website_Forms_Administrative_UploadNewMediaFile_HelpFile { get { return T("Website.Forms.Administrative.UploadNewMediaFile.HelpFile"); } } 
 /// <summary>&quot;Save&quot;</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_Document_LabelSave { get { return T("Website.Forms.Administrative.AdministrativeTemplates.Document.LabelSave"); } } 
 /// <summary>&quot;Save As...&quot;</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_Document_LabelSaveAs { get { return T("Website.Forms.Administrative.AdministrativeTemplates.Document.LabelSaveAs"); } } 
 /// <summary>&quot;Previous&quot;</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_Wizard_LabelPrevious { get { return T("Website.Forms.Administrative.AdministrativeTemplates.Wizard.LabelPrevious"); } } 
 /// <summary>&quot;Next&quot;</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_Wizard_LabelNext { get { return T("Website.Forms.Administrative.AdministrativeTemplates.Wizard.LabelNext"); } } 
 /// <summary>&quot;Finish&quot;</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_Wizard_LabelFinish { get { return T("Website.Forms.Administrative.AdministrativeTemplates.Wizard.LabelFinish"); } } 
 /// <summary>&quot;Cancel&quot;</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_Wizard_LabelCancel { get { return T("Website.Forms.Administrative.AdministrativeTemplates.Wizard.LabelCancel"); } } 
 /// <summary>&quot;OK&quot;</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_DataDialog_LabelOk { get { return T("Website.Forms.Administrative.AdministrativeTemplates.DataDialog.LabelOk"); } } 
 /// <summary>&quot;Cancel&quot;</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_DataDialog_LabelCancel { get { return T("Website.Forms.Administrative.AdministrativeTemplates.DataDialog.LabelCancel"); } } 
 /// <summary>&quot;OK&quot;</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_ConfirmDialog_LabelOk { get { return T("Website.Forms.Administrative.AdministrativeTemplates.ConfirmDialog.LabelOk"); } } 
 /// <summary>&quot;Cancel&quot;</summary> 
 public static string Website_Forms_Administrative_AdministrativeTemplates_ConfirmDialog_LabelCancel { get { return T("Website.Forms.Administrative.AdministrativeTemplates.ConfirmDialog.LabelCancel"); } } 
 /// <summary>&quot;Input&quot;</summary> 
 public static string Website_Misc_SourceCodeViewer_LabelInput { get { return T("Website.Misc.SourceCodeViewer.LabelInput"); } } 
 /// <summary>&quot;Output&quot;</summary> 
 public static string Website_Misc_SourceCodeViewer_LabelOutput { get { return T("Website.Misc.SourceCodeViewer.LabelOutput"); } } 
 /// <summary>&quot;Not allowed.&quot;</summary> 
 public static string Website_Misc_Trees_DialogTitle_PasteNotAllowed { get { return T("Website.Misc.Trees.DialogTitle.PasteNotAllowed"); } } 
 /// <summary>&quot;Paste not allowed in this context.&quot;</summary> 
 public static string Website_Misc_Trees_DialogText_PasteNotAllowed { get { return T("Website.Misc.Trees.DialogText.PasteNotAllowed"); } } 
 /// <summary>&quot;Not allowed&quot;</summary> 
 public static string Website_Misc_Trees_DialogTitle_PasteTypeNotAllowed { get { return T("Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"); } } 
 /// <summary>&quot;Folder won&apos;t accept document type.&quot;</summary> 
 public static string Website_Misc_Trees_DialogText_PasteTypeNotAllowed { get { return T("Website.Misc.Trees.DialogText.PasteTypeNotAllowed"); } } 
 /// <summary>&quot;Edit Selections&quot;</summary> 
 public static string Website_Misc_MultiSelector_LabelEditSelections { get { return T("Website.Misc.MultiSelector.LabelEditSelections"); } } 
 /// <summary>&quot;Version information&quot;</summary> 
 public static string GenericVersionProcessController_Version { get { return T("GenericVersionProcessController.Version"); } } 
 /// <summary>&quot;Show version information&quot;</summary> 
 public static string GenericVersionProcessController_VersionToolTip { get { return T("GenericVersionProcessController.VersionToolTip"); } } 
 /// <summary>&quot;Select a value...&quot;</summary> 
 public static string AspNetUiControl_Selector_SelectValueLabel { get { return T("AspNetUiControl.Selector.SelectValueLabel"); } } 
 /// <summary>&quot;&lt; broken reference &gt;...&quot;</summary> 
 public static string AspNetUiControl_Selector_BrokenReference { get { return T("AspNetUiControl.Selector.BrokenReference"); } } 
 /// <summary>&quot;(no selection)&quot;</summary> 
 public static string AspNetUiControl_Selector_NoSelection { get { return T("AspNetUiControl.Selector.NoSelection"); } } 
 /// <summary>&quot;No matches for &apos;{0}&apos;&quot;</summary> 
 public static string AspNetUiControl_Selector_NoMatchesFor(object parameter0) { return string.Format(T("AspNetUiControl.Selector.NoMatchesFor"), parameter0); } 
 /// <summary>&quot;This field contains a broken reference&quot;</summary> 
 public static string Validation_BrokenReference { get { return T("Validation.BrokenReference"); } } 
 /// <summary>&quot;This field is required.&quot;</summary> 
 public static string Validation_RequiredField { get { return T("Validation.RequiredField"); } } 
 /// <summary>&quot;Only {0} digit(s) after decimal point allowed&quot;</summary> 
 public static string Validation_Decimal_SymbolsAfterPointAllowed(object parameter0) { return string.Format(T("Validation.Decimal.SymbolsAfterPointAllowed"), parameter0); } 
 /// <summary>&quot;Only {0} digit(s) before decimal point allowed&quot;</summary> 
 public static string Validation_Decimal_SymbolsBeforePointAllowed(object parameter0) { return string.Format(T("Validation.Decimal.SymbolsBeforePointAllowed"), parameter0); } 
 /// <summary>&quot;Invalid date string: &apos;{0}&apos;. Use the format &apos;{1}&apos;.&quot;</summary> 
 public static string Validation_DateTime_InvalidDateFormat(object parameter0,object parameter1) { return string.Format(T("Validation.DateTime.InvalidDateFormat"), parameter0,parameter1); } 
 /// <summary>&quot;The specified value is either too big or too small. The acceptable range is from -2,147,483,648 to 2,147,483,647&quot;</summary> 
 public static string Validation_Int32_Overflow { get { return T("Validation.Int32.Overflow"); } } 
 /// <summary>&quot;Page Browser&quot;</summary> 
 public static string Browser_Label { get { return T("Browser.Label"); } } 
 /// <summary>&quot;Browse unpublished pages&quot;</summary> 
 public static string Browser_ToolTip { get { return T("Browser.ToolTip"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Management", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_NameValidation {
 /// <summary>&quot;Name can not be an empty string&quot;</summary> 
 public static string EmptyName { get { return T("EmptyName"); } } 
 /// <summary>&quot;Namespace can not be an empty string&quot;</summary> 
 public static string EmptyNamespace { get { return T("EmptyNamespace"); } } 
 /// <summary>&quot;Namespace can not contain the same name part multiple times&quot;</summary> 
 public static string DuplicateElementNamespace { get { return T("DuplicateElementNamespace"); } } 
 /// <summary>&quot;The name &apos;{0}&apos; is not a valid identifier&quot;</summary> 
 public static string InvalidIdentifier(object parameter0) { return string.Format(T("InvalidIdentifier"), parameter0); } 
 /// <summary>&quot;The name &apos;{0}&apos; is not a valid identifier. Identifiers may not start with digits.&quot;</summary> 
 public static string InvalidIdentifierDigit(object parameter0) { return string.Format(T("InvalidIdentifierDigit"), parameter0); } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.NameValidation", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Permissions {
 /// <summary>&quot;Read&quot;</summary> 
 public static string ReadLabel { get { return T("ReadLabel"); } } 
 /// <summary>&quot;Edit&quot;</summary> 
 public static string EditLabel { get { return T("EditLabel"); } } 
 /// <summary>&quot;Add&quot;</summary> 
 public static string AddLabel { get { return T("AddLabel"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string DeleteLabel { get { return T("DeleteLabel"); } } 
 /// <summary>&quot;Approve&quot;</summary> 
 public static string ApproveLabel { get { return T("ApproveLabel"); } } 
 /// <summary>&quot;Publish&quot;</summary> 
 public static string PublishLabel { get { return T("PublishLabel"); } } 
 /// <summary>&quot;Configure&quot;</summary> 
 public static string ConfigureLabel { get { return T("ConfigureLabel"); } } 
 /// <summary>&quot;Administrate&quot;</summary> 
 public static string AdministrateLabel { get { return T("AdministrateLabel"); } } 
 /// <summary>&quot;ClearPermissions&quot;</summary> 
 public static string ClearPermissionsLabel { get { return T("ClearPermissionsLabel"); } } 
 /// <summary>&quot;This operation would remove your administrative permissions from this entity. You can not remove your own administrative permissions.&quot;</summary> 
 public static string AdminLockoutMessage { get { return T("AdminLockoutMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Permissions", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_AllFunctionsElementProvider {
 /// <summary>&quot;All Functions&quot;</summary> 
 public static string Plugins_AllFunctionsElementProvider_FunctionRootFolderLabel { get { return T("Plugins.AllFunctionsElementProvider.FunctionRootFolderLabel"); } } 
 /// <summary>&quot;All functions&quot;</summary> 
 public static string Plugins_AllFunctionsElementProvider_FunctionRootFolderToolTip { get { return T("Plugins.AllFunctionsElementProvider.FunctionRootFolderToolTip"); } } 
 /// <summary>&quot;All Widget Functions&quot;</summary> 
 public static string Plugins_AllFunctionsElementProvider_WidgetFunctionRootFolderLabel { get { return T("Plugins.AllFunctionsElementProvider.WidgetFunctionRootFolderLabel"); } } 
 /// <summary>&quot;All widget functions&quot;</summary> 
 public static string Plugins_AllFunctionsElementProvider_WidgetFunctionRootFolderToolTip { get { return T("Plugins.AllFunctionsElementProvider.WidgetFunctionRootFolderToolTip"); } } 
 /// <summary>&quot;Generate Documentation&quot;</summary> 
 public static string AllFunctionsElementProvider_GenerateDocumentation { get { return T("AllFunctionsElementProvider.GenerateDocumentation"); } } 
 /// <summary>&quot;Generate documentation for all functions below this folder&quot;</summary> 
 public static string AllFunctionsElementProvider_GenerateDocumentationTooltip { get { return T("AllFunctionsElementProvider.GenerateDocumentationTooltip"); } } 
 /// <summary>&quot;Information&quot;</summary> 
 public static string AllFunctionsElementProvider_ViewFunctionInformation { get { return T("AllFunctionsElementProvider.ViewFunctionInformation"); } } 
 /// <summary>&quot;View function information&quot;</summary> 
 public static string AllFunctionsElementProvider_ViewFunctionInformationTooltip { get { return T("AllFunctionsElementProvider.ViewFunctionInformationTooltip"); } } 
 /// <summary>&quot;Test: {0}&quot;</summary> 
 public static string FunctionTesterWorkflow_Layout_Label(object parameter0) { return string.Format(T("FunctionTesterWorkflow.Layout.Label"), parameter0); } 
 /// <summary>&quot;Functions&quot;</summary> 
 public static string FunctionTesterWorkflow_FunctionCalls_Label { get { return T("FunctionTesterWorkflow.FunctionCalls.Label"); } } 
 /// <summary>&quot;Results&quot;</summary> 
 public static string FunctionTesterWorkflow_Preview_Label { get { return T("FunctionTesterWorkflow.Preview.Label"); } } 
 /// <summary>&quot;Runtime&quot;</summary> 
 public static string FunctionTesterWorkflow_Runtime_FieldGroup_Label { get { return T("FunctionTesterWorkflow.Runtime.FieldGroup.Label"); } } 
 /// <summary>&quot;Settings&quot;</summary> 
 public static string FunctionTesterWorkflow_DebugFieldGroup_Label { get { return T("FunctionTesterWorkflow.DebugFieldGroup.Label"); } } 
 /// <summary>&quot;Page&quot;</summary> 
 public static string FunctionTesterWorkflow_DebugPage_Label { get { return T("FunctionTesterWorkflow.DebugPage.Label"); } } 
 /// <summary>&quot;When executing the function, this page is used as current page&quot;</summary> 
 public static string FunctionTesterWorkflow_DebugPage_Help { get { return T("FunctionTesterWorkflow.DebugPage.Help"); } } 
 /// <summary>&quot;Data scope&quot;</summary> 
 public static string FunctionTesterWorkflow_DebugPageDataScope_Label { get { return T("FunctionTesterWorkflow.DebugPageDataScope.Label"); } } 
 /// <summary>&quot;When executing the function, this is used as current data scope&quot;</summary> 
 public static string FunctionTesterWorkflow_DebugPageDataScope_Help { get { return T("FunctionTesterWorkflow.DebugPageDataScope.Help"); } } 
 /// <summary>&quot;Language&quot;</summary> 
 public static string FunctionTesterWorkflow_DebugActiveLocale_Label { get { return T("FunctionTesterWorkflow.DebugActiveLocale.Label"); } } 
 /// <summary>&quot;When executing the function, this is used as the current language&quot;</summary> 
 public static string FunctionTesterWorkflow_DebugActiveLocale_Help { get { return T("FunctionTesterWorkflow.DebugActiveLocale.Help"); } } 
 /// <summary>&quot;Administrative&quot;</summary> 
 public static string FunctionTesterWorkflow_AdminitrativeScope_Label { get { return T("FunctionTesterWorkflow.AdminitrativeScope.Label"); } } 
 /// <summary>&quot;Public&quot;</summary> 
 public static string FunctionTesterWorkflow_PublicScope_Label { get { return T("FunctionTesterWorkflow.PublicScope.Label"); } } 
 /// <summary>&quot;Test Function&quot;</summary> 
 public static string AllFunctionsElementProvider_FunctionTester_Label { get { return T("AllFunctionsElementProvider.FunctionTester.Label"); } } 
 /// <summary>&quot;Test function&quot;</summary> 
 public static string AllFunctionsElementProvider_FunctionTester_ToolTip { get { return T("AllFunctionsElementProvider.FunctionTester.ToolTip"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_GeneratedDataTypesElementProvider {
 /// <summary>&quot;Global Datatypes&quot;</summary> 
 public static string GlobalDataFolderLabel { get { return T("GlobalDataFolderLabel"); } } 
 /// <summary>&quot;Global datatypes&quot;</summary> 
 public static string GlobalDataFolderToolTip { get { return T("GlobalDataFolderToolTip"); } } 
 /// <summary>&quot;Website Items&quot;</summary> 
 public static string GlobalDataFolderLabel_OnlyGlobalData { get { return T("GlobalDataFolderLabel_OnlyGlobalData"); } } 
 /// <summary>&quot;Website Items (Data)&quot;</summary> 
 public static string GlobalDataFolderToolTip_OnlyGlobalData { get { return T("GlobalDataFolderToolTip_OnlyGlobalData"); } } 
 /// <summary>&quot;Page Datafolders&quot;</summary> 
 public static string PageDataFolderDataFolderLabel { get { return T("PageDataFolderDataFolderLabel"); } } 
 /// <summary>&quot;Page datafolders&quot;</summary> 
 public static string PageDataFolderDataFolderToolTip { get { return T("PageDataFolderDataFolderToolTip"); } } 
 /// <summary>&quot;Page Metatypes&quot;</summary> 
 public static string PageMetaDataFolderLabel { get { return T("PageMetaDataFolderLabel"); } } 
 /// <summary>&quot;Page metatypes&quot;</summary> 
 public static string PageMetaDataFolderToolTip { get { return T("PageMetaDataFolderToolTip"); } } 
 /// <summary>&quot;Add Datatype&quot;</summary> 
 public static string Add { get { return T("Add"); } } 
 /// <summary>&quot;Add new global datatype&quot;</summary> 
 public static string AddToolTip { get { return T("AddToolTip"); } } 
 /// <summary>&quot;List Unpublished Data&quot;</summary> 
 public static string ViewUnpublishedItems { get { return T("ViewUnpublishedItems"); } } 
 /// <summary>&quot;Get an overview of data that haven&apos;t been published yet&quot;</summary> 
 public static string ViewUnpublishedItemsToolTip { get { return T("ViewUnpublishedItemsToolTip"); } } 
 /// <summary>&quot;Unpublished data&quot;</summary> 
 public static string ViewUnpublishedItems_document_title { get { return T("ViewUnpublishedItems-document-title"); } } 
 /// <summary>&quot;The list below display data items which are currently being edited or are ready to be approved / published.&quot;</summary> 
 public static string ViewUnpublishedItems_document_description { get { return T("ViewUnpublishedItems-document-description"); } } 
 /// <summary>&quot;No unpublished data.&quot;</summary> 
 public static string ViewUnpublishedItems_document_empty_label { get { return T("ViewUnpublishedItems-document-empty-label"); } } 
 /// <summary>&quot;Add Datafolder&quot;</summary> 
 public static string AddDataFolder { get { return T("AddDataFolder"); } } 
 /// <summary>&quot;Add new datafolder&quot;</summary> 
 public static string AddDataFolderToolTip { get { return T("AddDataFolderToolTip"); } } 
 /// <summary>&quot;Add Metatype&quot;</summary> 
 public static string AddMetaDataLabel { get { return T("AddMetaDataLabel"); } } 
 /// <summary>&quot;Add metatype&quot;</summary> 
 public static string AddMetaDataToolTip { get { return T("AddMetaDataToolTip"); } } 
 /// <summary>&quot;Edit Datatype&quot;</summary> 
 public static string Edit { get { return T("Edit"); } } 
 /// <summary>&quot;Edit selected datatype&quot;</summary> 
 public static string EditToolTip { get { return T("EditToolTip"); } } 
 /// <summary>&quot;Edit&quot;</summary> 
 public static string EditDataFolderTypeLabel { get { return T("EditDataFolderTypeLabel"); } } 
 /// <summary>&quot;Edit selected datafolder&quot;</summary> 
 public static string EditDataFolderTypeToolTip { get { return T("EditDataFolderTypeToolTip"); } } 
 /// <summary>&quot;Edit&quot;</summary> 
 public static string EditMetaDataTypeLabel { get { return T("EditMetaDataTypeLabel"); } } 
 /// <summary>&quot;Edit selected metadata&quot;</summary> 
 public static string EditMetaDataTypeToolTip { get { return T("EditMetaDataTypeToolTip"); } } 
 /// <summary>&quot;Delete Datatype&quot;</summary> 
 public static string Delete { get { return T("Delete"); } } 
 /// <summary>&quot;Delete selected datatype&quot;</summary> 
 public static string DeleteToolTip { get { return T("DeleteToolTip"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string DeleteDataFolderTypeLabel { get { return T("DeleteDataFolderTypeLabel"); } } 
 /// <summary>&quot;Delete selected datafolder&quot;</summary> 
 public static string DeleteDataFolderTypeToolTip { get { return T("DeleteDataFolderTypeToolTip"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string DeleteMetaDataTypeLabel { get { return T("DeleteMetaDataTypeLabel"); } } 
 /// <summary>&quot;Delete selected metadata&quot;</summary> 
 public static string DeleteMetaDataTypeToolTip { get { return T("DeleteMetaDataTypeToolTip"); } } 
 /// <summary>&quot;Edit Form Markup&quot;</summary> 
 public static string EditFormMarkup { get { return T("EditFormMarkup"); } } 
 /// <summary>&quot;Modify the layout of the data form using markup&quot;</summary> 
 public static string EditFormMarkupToolTip { get { return T("EditFormMarkupToolTip"); } } 
 /// <summary>&quot;Enable Localization&quot;</summary> 
 public static string EnableLocalization { get { return T("EnableLocalization"); } } 
 /// <summary>&quot;Enable localization&quot;</summary> 
 public static string EnableLocalizationToolTip { get { return T("EnableLocalizationToolTip"); } } 
 /// <summary>&quot;Disable Localization&quot;</summary> 
 public static string DisableLocalization { get { return T("DisableLocalization"); } } 
 /// <summary>&quot;Disable localization&quot;</summary> 
 public static string DisableLocalizationToolTip { get { return T("DisableLocalizationToolTip"); } } 
 /// <summary>&quot;Not yet approved or published&quot;</summary> 
 public static string DisabledData { get { return T("DisabledData"); } } 
 /// <summary>&quot;(undefined [{0}])&quot;</summary> 
 public static string UndefinedLabelTemplate(object parameter0) { return string.Format(T("UndefinedLabelTemplate"), parameter0); } 
 /// <summary>&quot;(undefined)&quot;</summary> 
 public static string UndefinedDataLavelTemplate { get { return T("UndefinedDataLavelTemplate"); } } 
 /// <summary>&quot;Show in Content perspective&quot;</summary> 
 public static string ShowInContent { get { return T("ShowInContent"); } } 
 /// <summary>&quot;Show in Content perspective&quot;</summary> 
 public static string ShowInContentToolTip { get { return T("ShowInContentToolTip"); } } 
 /// <summary>&quot;Add Data&quot;</summary> 
 public static string AddData { get { return T("AddData"); } } 
 /// <summary>&quot;Add new data&quot;</summary> 
 public static string AddDataToolTip { get { return T("AddDataToolTip"); } } 
 /// <summary>&quot;Edit Data&quot;</summary> 
 public static string EditData { get { return T("EditData"); } } 
 /// <summary>&quot;Edit selected data&quot;</summary> 
 public static string EditDataToolTip { get { return T("EditDataToolTip"); } } 
 /// <summary>&quot;Delete Data&quot;</summary> 
 public static string DeleteData { get { return T("DeleteData"); } } 
 /// <summary>&quot;Delete selected data&quot;</summary> 
 public static string DeleteDataToolTip { get { return T("DeleteDataToolTip"); } } 
 /// <summary>&quot;Translate Data&quot;</summary> 
 public static string LocalizeData { get { return T("LocalizeData"); } } 
 /// <summary>&quot;Translate selected data&quot;</summary> 
 public static string LocalizeDataToolTip { get { return T("LocalizeDataToolTip"); } } 
 /// <summary>&quot;Draft&quot;</summary> 
 public static string DraftTransition { get { return T("DraftTransition"); } } 
 /// <summary>&quot;Awaiting Approval&quot;</summary> 
 public static string AwaitingApprovalTransition { get { return T("AwaitingApprovalTransition"); } } 
 /// <summary>&quot;Publication settings&quot;</summary> 
 public static string PublicationSettings_FieldGroupLabel { get { return T("PublicationSettings.FieldGroupLabel"); } } 
 /// <summary>&quot;Status&quot;</summary> 
 public static string PublicationStatus_Label { get { return T("PublicationStatus.Label"); } } 
 /// <summary>&quot;Send the data to another publication status.&quot;</summary> 
 public static string PublicationStatus_Help { get { return T("PublicationStatus.Help"); } } 
 /// <summary>&quot;Publish date&quot;</summary> 
 public static string PublishDate_Label { get { return T("PublishDate.Label"); } } 
 /// <summary>&quot;Specify at which date and time you want the data to be published automatically.&quot;</summary> 
 public static string PublishDate_Help { get { return T("PublishDate.Help"); } } 
 /// <summary>&quot;Unpublish date&quot;</summary> 
 public static string UnpublishDate_Label { get { return T("UnpublishDate.Label"); } } 
 /// <summary>&quot;Specify at which date and time you want the data to be unpublished automatically.&quot;</summary> 
 public static string UnpublishDate_Help { get { return T("UnpublishDate.Help"); } } 
 /// <summary>&quot;New Datatype&quot;</summary> 
 public static string AddNewInterfaceTypeStep1_DocumentTitle { get { return T("AddNewInterfaceTypeStep1.DocumentTitle"); } } 
 /// <summary>&quot;New Page Metatype&quot;</summary> 
 public static string AddNewCompositionTypeWorkflow_DocumentTitle { get { return T("AddNewCompositionTypeWorkflow.DocumentTitle"); } } 
 /// <summary>&quot;New Page Datafolder&quot;</summary> 
 public static string AddNewAggregationTypeWorkflow_DocumentTitle { get { return T("AddNewAggregationTypeWorkflow.DocumentTitle"); } } 
 /// <summary>&quot;Settings&quot;</summary> 
 public static string EditorCommon_SettingsTab { get { return T("EditorCommon.SettingsTab"); } } 
 /// <summary>&quot;Type title&quot;</summary> 
 public static string EditorCommon_LabelTitleGroup { get { return T("EditorCommon.LabelTitleGroup"); } } 
 /// <summary>&quot;Programmatic naming and services&quot;</summary> 
 public static string EditorCommon_LabelProgrammaticNamingAndServices { get { return T("EditorCommon.LabelProgrammaticNamingAndServices"); } } 
 /// <summary>&quot;Programmatic naming&quot;</summary> 
 public static string EditorCommon_LabelProgrammaticNaming { get { return T("EditorCommon.LabelProgrammaticNaming"); } } 
 /// <summary>&quot;Type name&quot;</summary> 
 public static string EditorCommon_LabelTypeName { get { return T("EditorCommon.LabelTypeName"); } } 
 /// <summary>&quot;The technical name of the data type (ex. Product). This is used to identify this type in code and should not be changed once used externally.&quot;</summary> 
 public static string EditorCommon_HelpTypeName { get { return T("EditorCommon.HelpTypeName"); } } 
 /// <summary>&quot;Type namespace&quot;</summary> 
 public static string EditorCommon_LabelTypeNamespace { get { return T("EditorCommon.LabelTypeNamespace"); } } 
 /// <summary>&quot;The namespace (module / category name) of the type. This is used to identify this type in code and should not be changed once used externally.&quot;</summary> 
 public static string EditorCommon_HelpTypeNamespace { get { return T("EditorCommon.HelpTypeNamespace"); } } 
 /// <summary>&quot;Title&quot;</summary> 
 public static string EditorCommon_LabelTitle { get { return T("EditorCommon.LabelTitle"); } } 
 /// <summary>&quot;Use this entry to specify a user friendly name. This name is used in most UI.&quot;</summary> 
 public static string EditorCommon_HelpTitle { get { return T("EditorCommon.HelpTitle"); } } 
 /// <summary>&quot;Fields&quot;</summary> 
 public static string EditorCommon_LabelFields { get { return T("EditorCommon.LabelFields"); } } 
 /// <summary>&quot;Key field type&quot;</summary> 
 public static string EditorCommon_KeyFieldTypeLabel { get { return T("EditorCommon.KeyFieldTypeLabel"); } } 
 /// <summary>&quot;The type of the primary key. Use the default &apos;Guid&apos; type for optimal performance and &apos;RandomString&apos; for shorter data urls.&quot;</summary> 
 public static string EditorCommon_KeyFieldTypeHelp { get { return T("EditorCommon.KeyFieldTypeHelp"); } } 
 /// <summary>&quot;Guid&quot;</summary> 
 public static string EditorCommon_KeyFieldType_Guid { get { return T("EditorCommon.KeyFieldType.Guid"); } } 
 /// <summary>&quot;Random String, 4 characters long&quot;</summary> 
 public static string EditorCommon_KeyFieldType_RandomString4 { get { return T("EditorCommon.KeyFieldType.RandomString4"); } } 
 /// <summary>&quot;Random String, 8 characters long&quot;</summary> 
 public static string EditorCommon_KeyFieldType_RandomString8 { get { return T("EditorCommon.KeyFieldType.RandomString8"); } } 
 /// <summary>&quot;Services&quot;</summary> 
 public static string EditorCommon_ServicesLabel { get { return T("EditorCommon.ServicesLabel"); } } 
 /// <summary>&quot;Short URL name&quot;</summary> 
 public static string EditorCommon_InternalUrlPrefixLabel { get { return T("EditorCommon.InternalUrlPrefixLabel"); } } 
 /// <summary>&quot;When specified, allows data items of the current type to be referenced in content. The internal links will have format &apos;~/{ShortURLName}({id})&apos;, f.e. &apos;~/product(aIkH34F)&quot;</summary> 
 public static string EditorCommon_InternalUrlPrefixHelp { get { return T("EditorCommon.InternalUrlPrefixHelp"); } } 
 /// <summary>&quot;Has caching&quot;</summary> 
 public static string EditorCommon_HasCaching { get { return T("EditorCommon.HasCaching"); } } 
 /// <summary>&quot;Has publishing&quot;</summary> 
 public static string EditorCommon_HasPublishing { get { return T("EditorCommon.HasPublishing"); } } 
 /// <summary>&quot;Is localizable data&quot;</summary> 
 public static string EditorCommon_HasLocalization { get { return T("EditorCommon.HasLocalization"); } } 
 /// <summary>&quot;Delete Data?&quot;</summary> 
 public static string DeleteGeneratedDataStep1_LabelFieldGroup { get { return T("DeleteGeneratedDataStep1.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete data?&quot;</summary> 
 public static string DeleteGeneratedDataStep1_Text { get { return T("DeleteGeneratedDataStep1.Text"); } } 
 /// <summary>&quot;There is some referenced data that will also be deleted, do you want to continue?&quot;</summary> 
 public static string DeleteDataConfirmationText { get { return T("DeleteDataConfirmationText"); } } 
 /// <summary>&quot;Delete Datatype&quot;</summary> 
 public static string DeleteGeneratedInterfaceStep1_LabelFieldGroup { get { return T("DeleteGeneratedInterfaceStep1.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete the datatype&quot;</summary> 
 public static string DeleteGeneratedInterfaceStep1_Text { get { return T("DeleteGeneratedInterfaceStep1.Text"); } } 
 /// <summary>&quot;Cascade delete error&quot;</summary> 
 public static string CascadeDeleteErrorTitle { get { return T("CascadeDeleteErrorTitle"); } } 
 /// <summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
 public static string CascadeDeleteErrorMessage { get { return T("CascadeDeleteErrorMessage"); } } 
 /// <summary>&quot;Delete Datatype&quot;</summary> 
 public static string DeleteAggregationTypeWorkflow_LabelFieldGroup { get { return T("DeleteAggregationTypeWorkflow.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete the datatype&quot;</summary> 
 public static string DeleteAggregationTypeWorkflow_Text { get { return T("DeleteAggregationTypeWorkflow.Text"); } } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string DeleteAggregationTypeWorkflow_ErrorTitle { get { return T("DeleteAggregationTypeWorkflow.ErrorTitle"); } } 
 /// <summary>&quot;Cannot delete type &apos;{0}&apos; since it is used by a page type.&quot;</summary> 
 public static string DeleteAggregationTypeWorkflow_IsUsedByPageType(object parameter0) { return string.Format(T("DeleteAggregationTypeWorkflow.IsUsedByPageType"), parameter0); } 
 /// <summary>&quot;Delete Datatype&quot;</summary> 
 public static string DeleteCompositionTypeWorkflow_LabelFieldGroup { get { return T("DeleteCompositionTypeWorkflow.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete the datatype&quot;</summary> 
 public static string DeleteCompositionTypeWorkflow_Text { get { return T("DeleteCompositionTypeWorkflow.Text"); } } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string DeleteCompositionTypeWorkflow_ErrorTitle { get { return T("DeleteCompositionTypeWorkflow.ErrorTitle"); } } 
 /// <summary>&quot;Cannot delete type &apos;{0}&apos; since there&apos;re types that referenced to it.&quot;</summary> 
 public static string DeleteCompositionTypeWorkflow_TypeIsReferenced(object parameter0) { return string.Format(T("DeleteCompositionTypeWorkflow.TypeIsReferenced"), parameter0); } 
 /// <summary>&quot;Cannot delete type &apos;{0}&apos; since it is used by a page type.&quot;</summary> 
 public static string DeleteCompositionTypeWorkflow_IsUsedByPageType(object parameter0) { return string.Format(T("DeleteCompositionTypeWorkflow.IsUsedByPageType"), parameter0); } 
 /// <summary>&quot;To Xml&quot;</summary> 
 public static string ToXmlLabel { get { return T("ToXmlLabel"); } } 
 /// <summary>&quot;To Xml&quot;</summary> 
 public static string ToXmlToolTip { get { return T("ToXmlToolTip"); } } 
 /// <summary>&quot;Enable Localization&quot;</summary> 
 public static string EnableTypeLocalizationWorkflow_Dialog_Label { get { return T("EnableTypeLocalizationWorkflow.Dialog.Label"); } } 
 /// <summary>&quot;Enable localization&quot;</summary> 
 public static string EnableTypeLocalizationWorkflow_Step1_FieldGroup_Label { get { return T("EnableTypeLocalizationWorkflow.Step1.FieldGroup.Label"); } } 
 /// <summary>&quot;Move existing data to ...&quot;</summary> 
 public static string EnableTypeLocalizationWorkflow_Step1_CultureSelector_Label { get { return T("EnableTypeLocalizationWorkflow.Step1.CultureSelector.Label"); } } 
 /// <summary>&quot;When you enable &apos;localization&apos; on a data type, all data must belong to a language. Select the language existing data should now be moved to.&quot;</summary> 
 public static string EnableTypeLocalizationWorkflow_Step1_CultureSelector_Help { get { return T("EnableTypeLocalizationWorkflow.Step1.CultureSelector.Help"); } } 
 /// <summary>&quot;Confirmation&quot;</summary> 
 public static string EnableTypeLocalizationWorkflow_Step2_Title { get { return T("EnableTypeLocalizationWorkflow.Step2.Title"); } } 
 /// <summary>&quot;Data type will be localized and data copied to selected locale. Click Finish to continue.&quot;</summary> 
 public static string EnableTypeLocalizationWorkflow_Step2_Description { get { return T("EnableTypeLocalizationWorkflow.Step2.Description"); } } 
 /// <summary>&quot;Warning&quot;</summary> 
 public static string EnableTypeLocalizationWorkflow_Step3_Title { get { return T("EnableTypeLocalizationWorkflow.Step3.Title"); } } 
 /// <summary>&quot;There&apos;s some datatypes which have references to the type. While localizing the data will be copied to all languages in order to prevent appearing of broken references.&quot;</summary> 
 public static string EnableTypeLocalizationWorkflow_Step3_Description { get { return T("EnableTypeLocalizationWorkflow.Step3.Description"); } } 
 /// <summary>&quot;Missing active locales&quot;</summary> 
 public static string EnableTypeLocalizationWorkflow_Abort_Title { get { return T("EnableTypeLocalizationWorkflow.Abort.Title"); } } 
 /// <summary>&quot;There are no added active locales. Add at least one before localization this datatype.&quot;</summary> 
 public static string EnableTypeLocalizationWorkflow_Abort_Description { get { return T("EnableTypeLocalizationWorkflow.Abort.Description"); } } 
 /// <summary>&quot;Disable Localization&quot;</summary> 
 public static string DisableTypeLocalizationWorkflow_Dialog_Label { get { return T("DisableTypeLocalizationWorkflow.Dialog.Label"); } } 
 /// <summary>&quot;Disable localization&quot;</summary> 
 public static string DisableTypeLocalizationWorkflow_Step1_FieldGroup_Label { get { return T("DisableTypeLocalizationWorkflow.Step1.FieldGroup.Label"); } } 
 /// <summary>&quot;Keep data from ...&quot;</summary> 
 public static string DisableTypeLocalizationWorkflow_Step1_CultureSelector_Label { get { return T("DisableTypeLocalizationWorkflow.Step1.CultureSelector.Label"); } } 
 /// <summary>&quot;When localization is disabled on a datatype only one translation can be kept. Data from other languages will be lost.&quot;</summary> 
 public static string DisableTypeLocalizationWorkflow_Step1_CultureSelector_Help { get { return T("DisableTypeLocalizationWorkflow.Step1.CultureSelector.Help"); } } 
 /// <summary>&quot;Confirmation&quot;</summary> 
 public static string DisableTypeLocalizationWorkflow_Step2_Title { get { return T("DisableTypeLocalizationWorkflow.Step2.Title"); } } 
 /// <summary>&quot;All data from other locales than the one selected will be lost. Click Finish to continue.&quot;</summary> 
 public static string DisableTypeLocalizationWorkflow_Step2_Description { get { return T("DisableTypeLocalizationWorkflow.Step2.Description"); } } 
 /// <summary>&quot;Failed to translate data&quot;</summary> 
 public static string LocalizeDataWorkflow_ShowError_LayoutLabel { get { return T("LocalizeDataWorkflow.ShowError.LayoutLabel"); } } 
 /// <summary>&quot;Translation errors&quot;</summary> 
 public static string LocalizeDataWorkflow_ShowError_InfoTableCaption { get { return T("LocalizeDataWorkflow.ShowError.InfoTableCaption"); } } 
 /// <summary>&quot;This data has already been translated. The translated version belongs to a different group.&quot;</summary> 
 public static string LocalizeDataWorkflow_ShowError_AlreadyTranslated { get { return T("LocalizeDataWorkflow.ShowError.AlreadyTranslated"); } } 
 /// <summary>&quot;The following fields has a reference to a data type. You should translate these data items before you can translate this data item&quot;</summary> 
 public static string LocalizeDataWorkflow_ShowError_Description { get { return T("LocalizeDataWorkflow.ShowError.Description"); } } 
 /// <summary>&quot;The field &apos;{0}&apos; is referencing data of type &apos;{1}&apos; with the label &apos;{2}&apos;&quot;</summary> 
 public static string LocalizeDataWorkflow_ShowError_FieldErrorFormat(object parameter0,object parameter1,object parameter2) { return string.Format(T("LocalizeDataWorkflow.ShowError.FieldErrorFormat"), parameter0,parameter1,parameter2); } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string AddNewInterfaceTypeStep1_ErrorTitle { get { return T("AddNewInterfaceTypeStep1.ErrorTitle"); } } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string EditInterfaceTypeStep1_ErrorTitle { get { return T("EditInterfaceTypeStep1.ErrorTitle"); } } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string AddNewCompositionTypeWorkflow_ErrorTitle { get { return T("AddNewCompositionTypeWorkflow.ErrorTitle"); } } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string EditCompositionTypeWorkflow_ErrorTitle { get { return T("EditCompositionTypeWorkflow.ErrorTitle"); } } 
 /// <summary>&quot;XML Result&quot;</summary> 
 public static string DataTypeDescriptorToXmlLabel { get { return T("DataTypeDescriptorToXmlLabel"); } } 
 /// <summary>&quot;This type has custom form markup&quot;</summary> 
 public static string FormMarkupInfo_Dialog_Label { get { return T("FormMarkupInfo.Dialog.Label"); } } 
 /// <summary>&quot;Your field changes will not affect the form for editing data. Do &apos;{0}&apos; to change the form or delete the file &apos;{1}&apos;.&quot;</summary> 
 public static string FormMarkupInfo_Message(object parameter0,object parameter1) { return string.Format(T("FormMarkupInfo.Message"), parameter0,parameter1); } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_GenericPublishProcessController {
 /// <summary>&quot;Send to Draft&quot;</summary> 
 public static string SendToDraft { get { return T("SendToDraft"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string SendToDraftToolTip { get { return T("SendToDraftToolTip"); } } 
 /// <summary>&quot;Publish&quot;</summary> 
 public static string Publish { get { return T("Publish"); } } 
 /// <summary>&quot;Publish to site&quot;</summary> 
 public static string PublishToolTip { get { return T("PublishToolTip"); } } 
 /// <summary>&quot;Unpublish&quot;</summary> 
 public static string Unpublish { get { return T("Unpublish"); } } 
 /// <summary>&quot;Set to draft status and remove the published version&quot;</summary> 
 public static string UnpublishToolTip { get { return T("UnpublishToolTip"); } } 
 /// <summary>&quot;Send for Approval&quot;</summary> 
 public static string SendForApproval { get { return T("SendForApproval"); } } 
 /// <summary>&quot;Send for approval&quot;</summary> 
 public static string SendForApprovalToolTip { get { return T("SendForApprovalToolTip"); } } 
 /// <summary>&quot;Send for Publication&quot;</summary> 
 public static string SendForPublication { get { return T("SendForPublication"); } } 
 /// <summary>&quot;Send for publication&quot;</summary> 
 public static string SendForPublicationToolTip { get { return T("SendForPublicationToolTip"); } } 
 /// <summary>&quot;Undo Changes&quot;</summary> 
 public static string UndoPublishedChanges { get { return T("UndoPublishedChanges"); } } 
 /// <summary>&quot;Undo unpublished changes&quot;</summary> 
 public static string UndoPublishedChangesToolTip { get { return T("UndoPublishedChangesToolTip"); } } 
 /// <summary>&quot;Action Not Possible&quot;</summary> 
 public static string ValidationErrorTitle { get { return T("ValidationErrorTitle"); } } 
 /// <summary>&quot;The data did not validate with the following errors:&quot;</summary> 
 public static string ValidationErrorMessage { get { return T("ValidationErrorMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_LocalizationElementProvider {
 /// <summary>&quot;Languages&quot;</summary> 
 public static string ElementProvider_RootFolderLabel { get { return T("ElementProvider.RootFolderLabel"); } } 
 /// <summary>&quot;Explore and manage installed languages&quot;</summary> 
 public static string ElementProvider_RootFolderToolTip { get { return T("ElementProvider.RootFolderToolTip"); } } 
 /// <summary>&quot;Default&quot;</summary> 
 public static string ElementProvider_DefaultLabel { get { return T("ElementProvider.DefaultLabel"); } } 
 /// <summary>&quot;No Languages Available&quot;</summary> 
 public static string AddSystemLocaleWorkflow_NoMoreLocalesTitle { get { return T("AddSystemLocaleWorkflow.NoMoreLocalesTitle"); } } 
 /// <summary>&quot;You have installed all possible languages.&quot;</summary> 
 public static string AddSystemLocaleWorkflow_NoMoreLocalesMessage { get { return T("AddSystemLocaleWorkflow.NoMoreLocalesMessage"); } } 
 /// <summary>&quot;Add Language&quot;</summary> 
 public static string AddSystemLocaleWorkflow_AddElementActionLabel { get { return T("AddSystemLocaleWorkflow.AddElementActionLabel"); } } 
 /// <summary>&quot;Add new language&quot;</summary> 
 public static string AddSystemLocaleWorkflow_AddElementActionToolTip { get { return T("AddSystemLocaleWorkflow.AddElementActionToolTip"); } } 
 /// <summary>&quot;Add Language&quot;</summary> 
 public static string AddSystemLocaleWorkflow_Dialog_Label { get { return T("AddSystemLocaleWorkflow.Dialog.Label"); } } 
 /// <summary>&quot;Languages&quot;</summary> 
 public static string AddSystemLocaleWorkflow_CultureSelector_Label { get { return T("AddSystemLocaleWorkflow.CultureSelector.Label"); } } 
 /// <summary>&quot;The list of available, uninstalled languages. Language packages may be installed for additional options.&quot;</summary> 
 public static string AddSystemLocaleWorkflow_CultureSelector_Help { get { return T("AddSystemLocaleWorkflow.CultureSelector.Help"); } } 
 /// <summary>&quot;URL mapping name&quot;</summary> 
 public static string AddSystemLocaleWorkflow_UrlMappingName_Label { get { return T("AddSystemLocaleWorkflow.UrlMappingName.Label"); } } 
 /// <summary>&quot;This string will be inserted into the URL of pages published in a given language. The website &quot;default&quot; language may leave this entry blank.&quot;</summary> 
 public static string AddSystemLocaleWorkflow_UrlMappingName_Help { get { return T("AddSystemLocaleWorkflow.UrlMappingName.Help"); } } 
 /// <summary>&quot;User access&quot;</summary> 
 public static string AddSystemLocaleWorkflow_AllUsersAccess_Label { get { return T("AddSystemLocaleWorkflow.AllUsersAccess.Label"); } } 
 /// <summary>&quot;Give access to all users&quot;</summary> 
 public static string AddSystemLocaleWorkflow_AllUsersAccess_ItemLabel { get { return T("AddSystemLocaleWorkflow.AllUsersAccess.ItemLabel"); } } 
 /// <summary>&quot;If checked, the language will be made available to all registered users for viewing and editing&quot;</summary> 
 public static string AddSystemLocaleWorkflow_AllUsersAccess_Help { get { return T("AddSystemLocaleWorkflow.AllUsersAccess.Help"); } } 
 /// <summary>&quot;URL mapping name is already in use&quot;</summary> 
 public static string AddSystemLocaleWorkflow_UrlMappingName_InUseMessage { get { return T("AddSystemLocaleWorkflow.UrlMappingName.InUseMessage"); } } 
 /// <summary>&quot;Edit Language&quot;</summary> 
 public static string EditSystemLocaleWorkflow_EditElementActionLabel { get { return T("EditSystemLocaleWorkflow.EditElementActionLabel"); } } 
 /// <summary>&quot;Edit language&quot;</summary> 
 public static string EditSystemLocaleWorkflow_EditElementActionToolTip { get { return T("EditSystemLocaleWorkflow.EditElementActionToolTip"); } } 
 /// <summary>&quot;Edit Language&quot;</summary> 
 public static string EditSystemLocaleWorkflow_Dialog_Label { get { return T("EditSystemLocaleWorkflow.Dialog.Label"); } } 
 /// <summary>&quot;Language properties&quot;</summary> 
 public static string EditSystemLocaleWorkflow_FieldGroup_Label { get { return T("EditSystemLocaleWorkflow.FieldGroup.Label"); } } 
 /// <summary>&quot;URL mapping name&quot;</summary> 
 public static string EditSystemLocaleWorkflow_UrlMappingName_Label { get { return T("EditSystemLocaleWorkflow.UrlMappingName.Label"); } } 
 /// <summary>&quot;URL mapping name&quot;</summary> 
 public static string EditSystemLocaleWorkflow_UrlMappingName_Help { get { return T("EditSystemLocaleWorkflow.UrlMappingName.Help"); } } 
 /// <summary>&quot;URL mapping name is already in use&quot;</summary> 
 public static string EditSystemLocaleWorkflow_UrlMappingName_InUseMessage { get { return T("EditSystemLocaleWorkflow.UrlMappingName.InUseMessage"); } } 
 /// <summary>&quot;Set as Default&quot;</summary> 
 public static string DefineDefaultActiveLocaleWorkflow_ElementActionLabel { get { return T("DefineDefaultActiveLocaleWorkflow.ElementActionLabel"); } } 
 /// <summary>&quot;Set as default language&quot;</summary> 
 public static string DefineDefaultActiveLocaleWorkflow_ElementActionToolTip { get { return T("DefineDefaultActiveLocaleWorkflow.ElementActionToolTip"); } } 
 /// <summary>&quot;Remove Language&quot;</summary> 
 public static string RemoveSystemLocaleWorkflow_RemoveElementActionLabel { get { return T("RemoveSystemLocaleWorkflow.RemoveElementActionLabel"); } } 
 /// <summary>&quot;Remove language&quot;</summary> 
 public static string RemoveSystemLocaleWorkflow_RemoveElementActionToolTip { get { return T("RemoveSystemLocaleWorkflow.RemoveElementActionToolTip"); } } 
 /// <summary>&quot;Remove Language?&quot;</summary> 
 public static string RemoveSystemLocaleWorkflow_Dialog_Label { get { return T("RemoveSystemLocaleWorkflow.Dialog.Label"); } } 
 /// <summary>&quot;Cannot Remove Last Language&quot;</summary> 
 public static string RemoveSystemLocaleWorkflow_Abort_Title { get { return T("RemoveSystemLocaleWorkflow.Abort.Title"); } } 
 /// <summary>&quot;You are about to remove a language that is the only language for one or more users. Please add other languages to these users and try again.&quot;</summary> 
 public static string RemoveSystemLocaleWorkflow_Abort_Description { get { return T("RemoveSystemLocaleWorkflow.Abort.Description"); } } 
 /// <summary>&quot;Remove this language?&quot;</summary> 
 public static string RemoveSystemLocaleWorkflow_Confirm_Description { get { return T("RemoveSystemLocaleWorkflow.Confirm.Description"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_MasterPagePageTemplate {
 /// <summary>&quot;Add New Master Page&quot;</summary> 
 public static string AddNewMasterPagePageTemplateWorkflow_LabelDialog { get { return T("AddNewMasterPagePageTemplateWorkflow.LabelDialog"); } } 
 /// <summary>&quot;Edit Master Page&quot;</summary> 
 public static string EditMasterPageAction_Label { get { return T("EditMasterPageAction.Label"); } } 
 /// <summary>&quot;Edit source code of the master page&quot;</summary> 
 public static string EditMasterPageAction_ToolTip { get { return T("EditMasterPageAction.ToolTip"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string DeleteMasterPageAction_Label { get { return T("DeleteMasterPageAction.Label"); } } 
 /// <summary>&quot;Delete page template&quot;</summary> 
 public static string DeleteMasterPageAction_ToolTip { get { return T("DeleteMasterPageAction.ToolTip"); } } 
 /// <summary>&quot;Validation error&quot;</summary> 
 public static string EditTemplate_Validation_DialogTitle { get { return T("EditTemplate.Validation.DialogTitle"); } } 
 /// <summary>&quot;Compilation failed: {0}&quot;</summary> 
 public static string EditTemplate_Validation_CompilationFailed(object parameter0) { return string.Format(T("EditTemplate.Validation.CompilationFailed"), parameter0); } 
 /// <summary>&quot;Page template class does not inherit &apos;{0}&apos;&quot;</summary> 
 public static string EditTemplate_Validation_IncorrectBaseClass(object parameter0) { return string.Format(T("EditTemplate.Validation.IncorrectBaseClass"), parameter0); } 
 /// <summary>&quot;Failed to evaluate page template property &apos;{0}&apos;. Exception: {1}&quot;</summary> 
 public static string EditTemplate_Validation_PropertyError(object parameter0,object parameter1) { return string.Format(T("EditTemplate.Validation.PropertyError"), parameter0,parameter1); } 
 /// <summary>&quot;It is not allowed to change the template ID through the current workflow. The original template ID is &apos;{0}&apos;&quot;</summary> 
 public static string EditTemplate_Validation_TemplateIdChanged(object parameter0) { return string.Format(T("EditTemplate.Validation.TemplateIdChanged"), parameter0); } 
 /// <summary>&quot;Add New Master Page Template&quot;</summary> 
 public static string AddNewMasterPagePageTemplate_LabelDialog { get { return T("AddNewMasterPagePageTemplate.LabelDialog"); } } 
 /// <summary>&quot;Template Title&quot;</summary> 
 public static string AddNewMasterPagePageTemplate_LabelTemplateTitle { get { return T("AddNewMasterPagePageTemplate.LabelTemplateTitle"); } } 
 /// <summary>&quot;The title identifies this template in lists. Consider selecting a short but meaningful name.&quot;</summary> 
 public static string AddNewMasterPagePageTemplate_LabelTemplateTitleHelp { get { return T("AddNewMasterPagePageTemplate.LabelTemplateTitleHelp"); } } 
 /// <summary>&quot;Copy from&quot;</summary> 
 public static string AddNewMasterPagePageTemplate_LabelCopyFrom { get { return T("AddNewMasterPagePageTemplate.LabelCopyFrom"); } } 
 /// <summary>&quot;You can copy the markup from another Layout Template by selecting it in this list.&quot;</summary> 
 public static string AddNewMasterPagePageTemplate_LabelCopyFromHelp { get { return T("AddNewMasterPagePageTemplate.LabelCopyFromHelp"); } } 
 /// <summary>&quot;(New template)&quot;</summary> 
 public static string AddNewMasterPagePageTemplate_LabelCopyFromEmptyOption { get { return T("AddNewMasterPagePageTemplate.LabelCopyFromEmptyOption"); } } 
 /// <summary>&quot;Title already used&quot;</summary> 
 public static string AddNewMasterPagePageTemplateWorkflow_TitleInUseTitle { get { return T("AddNewMasterPagePageTemplateWorkflow.TitleInUseTitle"); } } 
 /// <summary>&quot;The title is too long (used as part of a filename).&quot;</summary> 
 public static string AddNewMasterPagePageTemplateWorkflow_TitleTooLong { get { return T("AddNewMasterPagePageTemplateWorkflow.TitleTooLong"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.MasterPagePageTemplate", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_MethodBasedFunctionProviderElementProvider {
 /// <summary>&quot;C# Functions&quot;</summary> 
 public static string RootFolderLabel { get { return T("RootFolderLabel"); } } 
 /// <summary>&quot;Method functions&quot;</summary> 
 public static string RootFolderToolTip { get { return T("RootFolderToolTip"); } } 
 /// <summary>&quot;Delete This Function&quot;</summary> 
 public static string DeleteFunction_LabelFieldGroup { get { return T("DeleteFunction.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete this function&quot;</summary> 
 public static string DeleteFunction_Text { get { return T("DeleteFunction.Text"); } } 
 /// <summary>&quot;Add External C# function&quot;</summary> 
 public static string Add { get { return T("Add"); } } 
 /// <summary>&quot;Add an external C# method based function.&quot;</summary> 
 public static string AddToolTip { get { return T("AddToolTip"); } } 
 /// <summary>&quot;Add Inline C# function&quot;</summary> 
 public static string Create { get { return T("Create"); } } 
 /// <summary>&quot;Add an inline C# method based function.&quot;</summary> 
 public static string CreateToolTip { get { return T("CreateToolTip"); } } 
 /// <summary>&quot;Edit&quot;</summary> 
 public static string Edit { get { return T("Edit"); } } 
 /// <summary>&quot;Edit Function.&quot;</summary> 
 public static string EditToolTip { get { return T("EditToolTip"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string Delete { get { return T("Delete"); } } 
 /// <summary>&quot;Delete Function.&quot;</summary> 
 public static string DeleteToolTip { get { return T("DeleteToolTip"); } } 
 /// <summary>&quot;Type&quot;</summary> 
 public static string AddNewMethodBasedFunctionStep1_LabelType { get { return T("AddNewMethodBasedFunctionStep1.LabelType"); } } 
 /// <summary>&quot;The type that contains the method in question&quot;</summary> 
 public static string AddNewMethodBasedFunctionStep1_LabelTypeHelp { get { return T("AddNewMethodBasedFunctionStep1.LabelTypeHelp"); } } 
 /// <summary>&quot;Method name&quot;</summary> 
 public static string AddNewMethodBasedFunctionStep2_LabelMethodName { get { return T("AddNewMethodBasedFunctionStep2.LabelMethodName"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewMethodBasedFunctionStep2_HelpMethodName { get { return T("AddNewMethodBasedFunctionStep2.HelpMethodName"); } } 
 /// <summary>&quot;Method Name&quot;</summary> 
 public static string AddNewMethodBasedFunctionStep3_LabelMethodName { get { return T("AddNewMethodBasedFunctionStep3.LabelMethodName"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewMethodBasedFunctionStep3_HelpMethodName { get { return T("AddNewMethodBasedFunctionStep3.HelpMethodName"); } } 
 /// <summary>&quot;Namespace Name&quot;</summary> 
 public static string AddNewMethodBasedFunctionStep3_LabelNamespaceName { get { return T("AddNewMethodBasedFunctionStep3.LabelNamespaceName"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewMethodBasedFunctionStep3_HelpNamespaceName { get { return T("AddNewMethodBasedFunctionStep3.HelpNamespaceName"); } } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string AddNewMethodBasedFunctionStep3_LabelError { get { return T("AddNewMethodBasedFunctionStep3.LabelError"); } } 
 /// <summary>&quot;Cascade delete error&quot;</summary> 
 public static string CascadeDeleteErrorTitle { get { return T("CascadeDeleteErrorTitle"); } } 
 /// <summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
 public static string CascadeDeleteErrorMessage { get { return T("CascadeDeleteErrorMessage"); } } 
 /// <summary>&quot;Could not find type&quot;</summary> 
 public static string AddFunction_CouldNotFindType { get { return T("AddFunction.CouldNotFindType"); } } 
 /// <summary>&quot;The type does not contain any valid method&quot;</summary> 
 public static string AddFunction_TypeHasNoValidMethod { get { return T("AddFunction.TypeHasNoValidMethod"); } } 
 /// <summary>&quot;The type is marked as either abstract or static. Calling methods on abstract or static types is not supported.&quot;</summary> 
 public static string AddFunction_TypeIsAbstractOrStatic { get { return T("AddFunction.TypeIsAbstractOrStatic"); } } 
 /// <summary>&quot;The type must not have overloads&quot;</summary> 
 public static string AddFunction_TypeMustNotHaveOverloads { get { return T("AddFunction.TypeMustNotHaveOverloads"); } } 
 /// <summary>&quot;Method name must be non-empty&quot;</summary> 
 public static string AddFunction_MethodNameIsEmpty { get { return T("AddFunction.MethodNameIsEmpty"); } } 
 /// <summary>&quot;Namespace must be like A.B.C - not start and end with .&quot;</summary> 
 public static string AddFunction_InvalidNamespace { get { return T("AddFunction.InvalidNamespace"); } } 
 /// <summary>&quot;The function name &apos;{0}&apos; is already used&quot;</summary> 
 public static string AddFunction_NameAlreadyUsed(object parameter0) { return string.Format(T("AddFunction.NameAlreadyUsed"), parameter0); } 
 /// <summary>&quot;Edit Method Based Query&quot;</summary> 
 public static string EditMethodBasedFunction_LabelFieldGroup { get { return T("EditMethodBasedFunction.LabelFieldGroup"); } } 
 /// <summary>&quot;Method Name&quot;</summary> 
 public static string EditMethodBasedFunction_LabelMethodName { get { return T("EditMethodBasedFunction.LabelMethodName"); } } 
 /// <summary>&quot;The name that the function should be know under.&quot;</summary> 
 public static string EditMethodBasedFunction_LabelMethodNameHelp { get { return T("EditMethodBasedFunction.LabelMethodNameHelp"); } } 
 /// <summary>&quot;Namespace Name&quot;</summary> 
 public static string EditMethodBasedFunction_LabelNamespaceName { get { return T("EditMethodBasedFunction.LabelNamespaceName"); } } 
 /// <summary>&quot;The namespace to place the method under.&quot;</summary> 
 public static string EditMethodBasedFunction_LabelNamespaceNameHelp { get { return T("EditMethodBasedFunction.LabelNamespaceNameHelp"); } } 
 /// <summary>&quot;Type&quot;</summary> 
 public static string EditMethodBasedFunction_LabelType { get { return T("EditMethodBasedFunction.LabelType"); } } 
 /// <summary>&quot;The type that contains the method in question.&quot;</summary> 
 public static string EditMethodBasedFunction_LabelTypeHelp { get { return T("EditMethodBasedFunction.LabelTypeHelp"); } } 
 /// <summary>&quot;Method&quot;</summary> 
 public static string EditMethodBasedFunction_LabelMethod { get { return T("EditMethodBasedFunction.LabelMethod"); } } 
 /// <summary>&quot;The method to invoke on the type.&quot;</summary> 
 public static string EditMethodBasedFunction_LabelMethodHelp { get { return T("EditMethodBasedFunction.LabelMethodHelp"); } } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string EditMethodBasedFunction_LabelError { get { return T("EditMethodBasedFunction.LabelError"); } } 
 /// <summary>&quot;Method name must be non-empty&quot;</summary> 
 public static string EditFunction_MethodNameEmpty { get { return T("EditFunction.MethodNameEmpty"); } } 
 /// <summary>&quot;Namespace must not start and end with . - example A.B.C&quot;</summary> 
 public static string EditFunction_InvalidNamespace { get { return T("EditFunction.InvalidNamespace"); } } 
 /// <summary>&quot;Could not find type&quot;</summary> 
 public static string EditFunction_TypeNotFound { get { return T("EditFunction.TypeNotFound"); } } 
 /// <summary>&quot;The type does not contain the method&quot;</summary> 
 public static string EditFunction_MethodNotInType { get { return T("EditFunction.MethodNotInType"); } } 
 /// <summary>&quot;The type does not contain any valid method&quot;</summary> 
 public static string EditFunction_NoValidMethod { get { return T("EditFunction.NoValidMethod"); } } 
 /// <summary>&quot;The type must not have overloads&quot;</summary> 
 public static string EditFunction_MethodOverloadsNotAllowed { get { return T("EditFunction.MethodOverloadsNotAllowed"); } } 
 /// <summary>&quot;Settings&quot;</summary> 
 public static string AddInlineFunctionWorkflow_FieldGroup_Label { get { return T("AddInlineFunctionWorkflow.FieldGroup.Label"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string AddInlineFunctionWorkflow_MethodName_Label { get { return T("AddInlineFunctionWorkflow.MethodName.Label"); } } 
 /// <summary>&quot;The name of the method you want to create&quot;</summary> 
 public static string AddInlineFunctionWorkflow_MethodName_Help { get { return T("AddInlineFunctionWorkflow.MethodName.Help"); } } 
 /// <summary>&quot;Namespace&quot;</summary> 
 public static string AddInlineFunctionWorkflow_MethodNamespace_Label { get { return T("AddInlineFunctionWorkflow.MethodNamespace.Label"); } } 
 /// <summary>&quot;The namespace of the method you want to create&quot;</summary> 
 public static string AddInlineFunctionWorkflow_MethodNamespace_Help { get { return T("AddInlineFunctionWorkflow.MethodNamespace.Help"); } } 
 /// <summary>&quot;Description&quot;</summary> 
 public static string AddInlineFunctionWorkflow_MethodDescription_Label { get { return T("AddInlineFunctionWorkflow.MethodDescription.Label"); } } 
 /// <summary>&quot;A short description of the function&quot;</summary> 
 public static string AddInlineFunctionWorkflow_MethodDescription_Help { get { return T("AddInlineFunctionWorkflow.MethodDescription.Help"); } } 
 /// <summary>&quot;Template&quot;</summary> 
 public static string AddInlineFunctionWorkflow_InlineFunctionMethodTemplate_Label { get { return T("AddInlineFunctionWorkflow.InlineFunctionMethodTemplate.Label"); } } 
 /// <summary>&quot;Select the template that you want to use for the new method.&quot;</summary> 
 public static string AddInlineFunctionWorkflow_InlineFunctionMethodTemplate_Help { get { return T("AddInlineFunctionWorkflow.InlineFunctionMethodTemplate.Help"); } } 
 /// <summary>&quot;Settings&quot;</summary> 
 public static string EditInlineFunctionWorkflow_FieldGroup_Label { get { return T("EditInlineFunctionWorkflow.FieldGroup.Label"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string EditInlineFunctionWorkflow_MethodName_Label { get { return T("EditInlineFunctionWorkflow.MethodName.Label"); } } 
 /// <summary>&quot;The name of the method you want to create&quot;</summary> 
 public static string EditInlineFunctionWorkflow_MethodName_Help { get { return T("EditInlineFunctionWorkflow.MethodName.Help"); } } 
 /// <summary>&quot;Namespace&quot;</summary> 
 public static string EditInlineFunctionWorkflow_MethodNamespace_Label { get { return T("EditInlineFunctionWorkflow.MethodNamespace.Label"); } } 
 /// <summary>&quot;The namespace of the method you want to create&quot;</summary> 
 public static string EditInlineFunctionWorkflow_MethodNamespace_Help { get { return T("EditInlineFunctionWorkflow.MethodNamespace.Help"); } } 
 /// <summary>&quot;Description&quot;</summary> 
 public static string EditInlineFunctionWorkflow_MethodDescription_Label { get { return T("EditInlineFunctionWorkflow.MethodDescription.Label"); } } 
 /// <summary>&quot;A short description of the function&quot;</summary> 
 public static string EditInlineFunctionWorkflow_MethodDescription_Help { get { return T("EditInlineFunctionWorkflow.MethodDescription.Help"); } } 
 /// <summary>&quot;Debug&quot;</summary> 
 public static string EditInlineFunctionWorkflow_DebugFieldGroup_Label { get { return T("EditInlineFunctionWorkflow.DebugFieldGroup.Label"); } } 
 /// <summary>&quot;Page&quot;</summary> 
 public static string EditInlineFunctionWorkflow_DebugPage_Label { get { return T("EditInlineFunctionWorkflow.DebugPage.Label"); } } 
 /// <summary>&quot;When debugging, this page is used as current page&quot;</summary> 
 public static string EditInlineFunctionWorkflow_DebugPage_Help { get { return T("EditInlineFunctionWorkflow.DebugPage.Help"); } } 
 /// <summary>&quot;Data scope&quot;</summary> 
 public static string EditInlineFunctionWorkflow_DebugPageDataScope_Label { get { return T("EditInlineFunctionWorkflow.DebugPageDataScope.Label"); } } 
 /// <summary>&quot;When debugging, this is used as current data scope&quot;</summary> 
 public static string EditInlineFunctionWorkflow_DebugPageDataScope_Help { get { return T("EditInlineFunctionWorkflow.DebugPageDataScope.Help"); } } 
 /// <summary>&quot;Language&quot;</summary> 
 public static string EditInlineFunctionWorkflow_DebugActiveLocale_Label { get { return T("EditInlineFunctionWorkflow.DebugActiveLocale.Label"); } } 
 /// <summary>&quot;When debugging, this is used as the current language&quot;</summary> 
 public static string EditInlineFunctionWorkflow_DebugActiveLocale_Help { get { return T("EditInlineFunctionWorkflow.DebugActiveLocale.Help"); } } 
 /// <summary>&quot;Source&quot;</summary> 
 public static string EditInlineFunctionWorkflow_Code_Label { get { return T("EditInlineFunctionWorkflow.Code.Label"); } } 
 /// <summary>&quot;Assembly References&quot;</summary> 
 public static string EditInlineFunctionWorkflow_AssembliesFieldGroup_Label { get { return T("EditInlineFunctionWorkflow.AssembliesFieldGroup.Label"); } } 
 /// <summary>&quot;Preview&quot;</summary> 
 public static string EditInlineFunctionWorkflow_Preview_Label { get { return T("EditInlineFunctionWorkflow.Preview.Label"); } } 
 /// <summary>&quot;Input Parameters&quot;</summary> 
 public static string EditInlineFunctionWorkflow_ParameterFieldGroup_Label { get { return T("EditInlineFunctionWorkflow.ParameterFieldGroup.Label"); } } 
 /// <summary>&quot;Administrative&quot;</summary> 
 public static string EditInlineFunctionWorkflow_AdminitrativeScope_Label { get { return T("EditInlineFunctionWorkflow.AdminitrativeScope.Label"); } } 
 /// <summary>&quot;Public&quot;</summary> 
 public static string EditInlineFunctionWorkflow_PublicScope_Label { get { return T("EditInlineFunctionWorkflow.PublicScope.Label"); } } 
 /// <summary>&quot;Empty method&quot;</summary> 
 public static string InlineFunctionMethodTemplate_Clean { get { return T("InlineFunctionMethodTemplate.Clean"); } } 
 /// <summary>&quot;Method with parameters&quot;</summary> 
 public static string InlineFunctionMethodTemplate_WithParameters { get { return T("InlineFunctionMethodTemplate.WithParameters"); } } 
 /// <summary>&quot;Method using data connection&quot;</summary> 
 public static string InlineFunctionMethodTemplate_DataConnection { get { return T("InlineFunctionMethodTemplate.DataConnection"); } } 
 /// <summary>&quot;A public static class named {0} is missing from the code. This class should contain the function method.&quot;</summary> 
 public static string CSharpInlineFunction_OnMissingContainerType(object parameter0) { return string.Format(T("CSharpInlineFunction.OnMissingContainerType"), parameter0); } 
 /// <summary>&quot;The namespace in the code &apos;{0}&apos; does not match the given function namespace &apos;{1}&apos;.&quot;</summary> 
 public static string CSharpInlineFunction_OnNamespaceMismatch(object parameter0,object parameter1) { return string.Format(T("CSharpInlineFunction.OnNamespaceMismatch"), parameter0,parameter1); } 
 /// <summary>&quot;The given function name &apos;{0}&apos; was not found or not public static in the class &apos;{1}&apos;.&quot;</summary> 
 public static string CSharpInlineFunction_OnMissionMethod(object parameter0,object parameter1) { return string.Format(T("CSharpInlineFunction.OnMissionMethod"), parameter0,parameter1); } 
 /// <summary>&quot;The parameter &apos;{0}&apos; has not been added to &apos;Input Parameters&apos; - to call your function you need to add the parameter and give it either a test or default value.&quot;</summary> 
 public static string CSharpInlineFunction_MissingParameterDefinition(object parameter0) { return string.Format(T("CSharpInlineFunction.MissingParameterDefinition"), parameter0); } 
 /// <summary>&quot;The parameter &apos;{0}&apos; is expecting test value of type &apos;{1}&apos;, got value of type &apos;{2}&apos;.&quot;</summary> 
 public static string CSharpInlineFunction_WrongParameterTestValueType(object parameter0,object parameter1,object parameter2) { return string.Format(T("CSharpInlineFunction.WrongParameterTestValueType"), parameter0,parameter1,parameter2); } 
 /// <summary>&quot;The parameter &apos;{0}&apos; defined on &apos;Input Parameters&apos; must have a test or default value before your function can be evaluated.&quot;</summary> 
 public static string CSharpInlineFunction_MissingParameterTestOrDefaultValue(object parameter0) { return string.Format(T("CSharpInlineFunction.MissingParameterTestOrDefaultValue"), parameter0); } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PackageElementProvider {
 /// <summary>&quot;Packages&quot;</summary> 
 public static string RootFolderLabel { get { return T("RootFolderLabel"); } } 
 /// <summary>&quot;Explore and manage installed packages&quot;</summary> 
 public static string RootFolderToolTip { get { return T("RootFolderToolTip"); } } 
 /// <summary>&quot;Available Packages&quot;</summary> 
 public static string AvailablePackagesFolderLabel { get { return T("AvailablePackagesFolderLabel"); } } 
 /// <summary>&quot;Available packages&quot;</summary> 
 public static string AvailablePackagesFolderToolTip { get { return T("AvailablePackagesFolderToolTip"); } } 
 /// <summary>&quot;Installed Packages&quot;</summary> 
 public static string InstalledPackageFolderLabel { get { return T("InstalledPackageFolderLabel"); } } 
 /// <summary>&quot;Installed packages&quot;</summary> 
 public static string InstalledPackageFolderToolTip { get { return T("InstalledPackageFolderToolTip"); } } 
 /// <summary>&quot;Local Packages&quot;</summary> 
 public static string LocalPackagesFolderLabel { get { return T("LocalPackagesFolderLabel"); } } 
 /// <summary>&quot;Local packages&quot;</summary> 
 public static string LocalPackagesFolderToolTip { get { return T("LocalPackagesFolderToolTip"); } } 
 /// <summary>&quot;Package Sources&quot;</summary> 
 public static string PackageSourcesFolderLabel { get { return T("PackageSourcesFolderLabel"); } } 
 /// <summary>&quot;Package sources&quot;</summary> 
 public static string PackageSourcesFolderToolTip { get { return T("PackageSourcesFolderToolTip"); } } 
 /// <summary>&quot;Package Info&quot;</summary> 
 public static string ViewAvailableInformationLabel { get { return T("ViewAvailableInformationLabel"); } } 
 /// <summary>&quot;View package information&quot;</summary> 
 public static string ViewAvailableInformationToolTip { get { return T("ViewAvailableInformationToolTip"); } } 
 /// <summary>&quot;Package Info&quot;</summary> 
 public static string ViewInstalledInformationLabel { get { return T("ViewInstalledInformationLabel"); } } 
 /// <summary>&quot;View package information&quot;</summary> 
 public static string ViewInstalledInformationToolTip { get { return T("ViewInstalledInformationToolTip"); } } 
 /// <summary>&quot;Install Local Package...&quot;</summary> 
 public static string InstallLocalPackageLabel { get { return T("InstallLocalPackageLabel"); } } 
 /// <summary>&quot;Install package from local file system&quot;</summary> 
 public static string InstallLocalPackageToolTip { get { return T("InstallLocalPackageToolTip"); } } 
 /// <summary>&quot;Add Package Source&quot;</summary> 
 public static string AddPackageSourceLabel { get { return T("AddPackageSourceLabel"); } } 
 /// <summary>&quot;Add package source&quot;</summary> 
 public static string AddPackageSourceToolTip { get { return T("AddPackageSourceToolTip"); } } 
 /// <summary>&quot;Delete Package Source&quot;</summary> 
 public static string DeletePackageSourceLabel { get { return T("DeletePackageSourceLabel"); } } 
 /// <summary>&quot;Delete package source&quot;</summary> 
 public static string DeletePackageSourceToolTip { get { return T("DeletePackageSourceToolTip"); } } 
 /// <summary>&quot;Clear Cache&quot;</summary> 
 public static string ClearServerCacheLabel { get { return T("ClearServerCacheLabel"); } } 
 /// <summary>&quot;Clear cache to get the newest packages&quot;</summary> 
 public static string ClearServerCacheToolTip { get { return T("ClearServerCacheToolTip"); } } 
 /// <summary>&quot;Package Info&quot;</summary> 
 public static string ViewAvailableInformation_FieldGroupLabel { get { return T("ViewAvailableInformation.FieldGroupLabel"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string ViewAvailableInformation_NameTextLabel { get { return T("ViewAvailableInformation.NameTextLabel"); } } 
 /// <summary>&quot;Description&quot;</summary> 
 public static string ViewAvailableInformation_DescriptionTextLabel { get { return T("ViewAvailableInformation.DescriptionTextLabel"); } } 
 /// <summary>&quot;Author&quot;</summary> 
 public static string ViewAvailableInformation_AuthorTextLabel { get { return T("ViewAvailableInformation.AuthorTextLabel"); } } 
 /// <summary>&quot;Free Trial Info&quot;</summary> 
 public static string ViewAvailableInformation_TrialInfoFieldGroupLabel { get { return T("ViewAvailableInformation.TrialInfoFieldGroupLabel"); } } 
 /// <summary>&quot;Trial information&quot;</summary> 
 public static string ViewAvailableInformation_TrialInformationLabel { get { return T("ViewAvailableInformation.TrialInformationLabel"); } } 
 /// <summary>&quot;This is a commercial package, available for free in the trial period. When the trial period has expired functionality may be degraded, unless you choose to purchase a license.&quot;</summary> 
 public static string ViewAvailableInformation_TrialInformationText { get { return T("ViewAvailableInformation.TrialInformationText"); } } 
 /// <summary>&quot;Free trial period (days)&quot;</summary> 
 public static string ViewAvailableInformation_TrialDaysLabel { get { return T("ViewAvailableInformation.TrialDaysLabel"); } } 
 /// <summary>&quot;Installation Info&quot;</summary> 
 public static string ViewAvailableInformation_InstallationInfoFieldGroupLabel { get { return T("ViewAvailableInformation.InstallationInfoFieldGroupLabel"); } } 
 /// <summary>&quot;Version&quot;</summary> 
 public static string ViewAvailableInformation_VersionTextLabel { get { return T("ViewAvailableInformation.VersionTextLabel"); } } 
 /// <summary>&quot;Technical Description&quot;</summary> 
 public static string ViewAvailableInformation_TechicalDescriptionTextLabel { get { return T("ViewAvailableInformation.TechicalDescriptionTextLabel"); } } 
 /// <summary>&quot;Source&quot;</summary> 
 public static string ViewAvailableInformation_PackageSourceTextLabel { get { return T("ViewAvailableInformation.PackageSourceTextLabel"); } } 
 /// <summary>&quot;Price (USD)&quot;</summary> 
 public static string ViewAvailableInformation_PriceTextLabel { get { return T("ViewAvailableInformation.PriceTextLabel"); } } 
 /// <summary>&quot;Install&quot;</summary> 
 public static string ViewAvailableInformation_Toolbar_InstallLabel { get { return T("ViewAvailableInformation.Toolbar.InstallLabel"); } } 
 /// <summary>&quot;Read more&quot;</summary> 
 public static string ViewAvailableInformation_Toolbar_ReadMoreLabel { get { return T("ViewAvailableInformation.Toolbar.ReadMoreLabel"); } } 
 /// <summary>&quot;Already Installed&quot;</summary> 
 public static string ViewAvailableInformation_ShowError_MessageTitle { get { return T("ViewAvailableInformation.ShowError.MessageTitle"); } } 
 /// <summary>&quot;The package is already installed, cannot install the selected package.&quot;</summary> 
 public static string ViewAvailableInformation_ShowError_MessageMessage { get { return T("ViewAvailableInformation.ShowError.MessageMessage"); } } 
 /// <summary>&quot;Package server did not respond&quot;</summary> 
 public static string ViewAvailableInformation_ShowServerError_MessageTitle { get { return T("ViewAvailableInformation.ShowServerError.MessageTitle"); } } 
 /// <summary>&quot;The package server did not respond, try again or contact the system administrator&quot;</summary> 
 public static string ViewAvailableInformation_ShowServerError_MessageMessage { get { return T("ViewAvailableInformation.ShowServerError.MessageMessage"); } } 
 /// <summary>&quot;Package Info&quot;</summary> 
 public static string ViewInstalledInformation_FieldGroupLabel { get { return T("ViewInstalledInformation.FieldGroupLabel"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string ViewInstalledInformation_NameTextLabel { get { return T("ViewInstalledInformation.NameTextLabel"); } } 
 /// <summary>&quot;Installation date&quot;</summary> 
 public static string ViewInstalledInformation_DateTextLabel { get { return T("ViewInstalledInformation.DateTextLabel"); } } 
 /// <summary>&quot;Installed by&quot;</summary> 
 public static string ViewInstalledInformation_UserTextLabel { get { return T("ViewInstalledInformation.UserTextLabel"); } } 
 /// <summary>&quot;Author&quot;</summary> 
 public static string ViewInstalledInformation_AuthorTextLabel { get { return T("ViewInstalledInformation.AuthorTextLabel"); } } 
 /// <summary>&quot;Version&quot;</summary> 
 public static string ViewInstalledInformation_VersionTextLabel { get { return T("ViewInstalledInformation.VersionTextLabel"); } } 
 /// <summary>&quot;Trial info&quot;</summary> 
 public static string ViewInstalledInformation_TrialInfoFieldGroupLabel { get { return T("ViewInstalledInformation.TrialInfoFieldGroupLabel"); } } 
 /// <summary>&quot;Trial information&quot;</summary> 
 public static string ViewInstalledInformation_TrialInformationLabel { get { return T("ViewInstalledInformation.TrialInformationLabel"); } } 
 /// <summary>&quot;This is a commercial package, available for free in the trial period. When the trial period has expired functionality may be degraded, unless you choose to purchase a license.&quot;</summary> 
 public static string ViewInstalledInformation_TrialInformationText { get { return T("ViewInstalledInformation.TrialInformationText"); } } 
 /// <summary>&quot;Trial expiration date&quot;</summary> 
 public static string ViewInstalledInformation_TrialExpireLabel { get { return T("ViewInstalledInformation.TrialExpireLabel"); } } 
 /// <summary>&quot;Uninstall&quot;</summary> 
 public static string ViewInstalledInformation_Toolbar_UninstallLabel { get { return T("ViewInstalledInformation.Toolbar.UninstallLabel"); } } 
 /// <summary>&quot;Purchase this!&quot;</summary> 
 public static string ViewInstalledInformation_Toolbar_PurchaseLabel { get { return T("ViewInstalledInformation.Toolbar.PurchaseLabel"); } } 
 /// <summary>&quot;Already Uninstalled&quot;</summary> 
 public static string ViewInstalledInformation_ShowError_MessageTitle { get { return T("ViewInstalledInformation.ShowError.MessageTitle"); } } 
 /// <summary>&quot;The package is already uninstalled, cannot uninstall the selected package.&quot;</summary> 
 public static string ViewInstalledInformation_ShowError_MessageMessage { get { return T("ViewInstalledInformation.ShowError.MessageMessage"); } } 
 /// <summary>&quot;Install Package&quot;</summary> 
 public static string InstallRemotePackage_Step1_LayoutLabel { get { return T("InstallRemotePackage.Step1.LayoutLabel"); } } 
 /// <summary>&quot;This is a trial/payment package&quot;</summary> 
 public static string InstallRemotePackage_Step1_HeadingTitle { get { return T("InstallRemotePackage.Step1.HeadingTitle"); } } 
 /// <summary>&quot;This package is subject to payment - please examine the EULA on the next screen for details about trial period and payment terms.&quot;</summary> 
 public static string InstallRemotePackage_Step1_HeadingDescription { get { return T("InstallRemotePackage.Step1.HeadingDescription"); } } 
 /// <summary>&quot;Install Package&quot;</summary> 
 public static string InstallRemotePackage_Step2_LayoutLabel { get { return T("InstallRemotePackage.Step2.LayoutLabel"); } } 
 /// <summary>&quot;License agreement&quot;</summary> 
 public static string InstallRemotePackage_Step2_HeadingTitle { get { return T("InstallRemotePackage.Step2.HeadingTitle"); } } 
 /// <summary>&quot;If you accept the terms of the agreement, click the check box below. You must accept the agreement to install.&quot;</summary> 
 public static string InstallRemotePackage_Step2_HeadingDescription { get { return T("InstallRemotePackage.Step2.HeadingDescription"); } } 
 /// <summary>&quot;I accept the license agreement&quot;</summary> 
 public static string InstallRemotePackage_Step2_IAcceptItemLabel { get { return T("InstallRemotePackage.Step2.IAcceptItemLabel"); } } 
 /// <summary>&quot;You must accept the terms of the license agreement before you can proceed.&quot;</summary> 
 public static string InstallRemotePackage_Step2_AcceptMissing { get { return T("InstallRemotePackage.Step2.AcceptMissing"); } } 
 /// <summary>&quot;Install Package&quot;</summary> 
 public static string InstallRemotePackage_Step3_LayoutLabel { get { return T("InstallRemotePackage.Step3.LayoutLabel"); } } 
 /// <summary>&quot;Download and validate package&quot;</summary> 
 public static string InstallRemotePackage_Step3_HeadingTitle { get { return T("InstallRemotePackage.Step3.HeadingTitle"); } } 
 /// <summary>&quot;The package will be downloaded and validated. Please note that this may take several minutes. Click Next to continue.&quot;</summary> 
 public static string InstallRemotePackage_Step3_HeadingDescription { get { return T("InstallRemotePackage.Step3.HeadingDescription"); } } 
 /// <summary>&quot;Install Local Package&quot;</summary> 
 public static string InstallRemotePackage_Step4_LayoutLabel { get { return T("InstallRemotePackage.Step4.LayoutLabel"); } } 
 /// <summary>&quot;Ready to install&quot;</summary> 
 public static string InstallRemotePackage_Step4_HeadingTitle { get { return T("InstallRemotePackage.Step4.HeadingTitle"); } } 
 /// <summary>&quot;Ready to install the package. Please note that the installation may take several minutes. Click Next to continue.&quot;</summary> 
 public static string InstallRemotePackage_Step4_HeadingDescription { get { return T("InstallRemotePackage.Step4.HeadingDescription"); } } 
 /// <summary>&quot;Ready to install&quot;</summary> 
 public static string InstallRemotePackage_Step4_NonUninstallableHeadingTitle { get { return T("InstallRemotePackage.Step4.NonUninstallableHeadingTitle"); } } 
 /// <summary>&quot;Ready to install the package. Please note that the installation may take several minutes. Also note that this package can not be uninstalled. Click Next to continue.&quot;</summary> 
 public static string InstallRemotePackage_Step4_NonUninstallableHeadingDescription { get { return T("InstallRemotePackage.Step4.NonUninstallableHeadingDescription"); } } 
 /// <summary>&quot;Package Installed&quot;</summary> 
 public static string InstallRemotePackage_Step5_LayoutLabel { get { return T("InstallRemotePackage.Step5.LayoutLabel"); } } 
 /// <summary>&quot;Package installed successfully&quot;</summary> 
 public static string InstallRemotePackage_Step5_HeadingTitle { get { return T("InstallRemotePackage.Step5.HeadingTitle"); } } 
 /// <summary>&quot;Package installed successfully.&quot;</summary> 
 public static string InstallRemotePackage_Step5_HeadingDescription { get { return T("InstallRemotePackage.Step5.HeadingDescription"); } } 
 /// <summary>&quot;Package installation failed&quot;</summary> 
 public static string InstallRemotePackage_ShowError_LayoutLabel { get { return T("InstallRemotePackage.ShowError.LayoutLabel"); } } 
 /// <summary>&quot;Package Installation Failed&quot;</summary> 
 public static string InstallRemotePackage_ShowError_InfoTableCaption { get { return T("InstallRemotePackage.ShowError.InfoTableCaption"); } } 
 /// <summary>&quot;Message&quot;</summary> 
 public static string InstallRemotePackage_ShowError_MessageTitle { get { return T("InstallRemotePackage.ShowError.MessageTitle"); } } 
 /// <summary>&quot;The package Did Not Validate&quot;</summary> 
 public static string InstallRemotePackage_ShowWarning_LayoutLabel { get { return T("InstallRemotePackage.ShowWarning.LayoutLabel"); } } 
 /// <summary>&quot;The package did not validate&quot;</summary> 
 public static string InstallRemotePackage_ShowWarning_InfoTableCaption { get { return T("InstallRemotePackage.ShowWarning.InfoTableCaption"); } } 
 /// <summary>&quot;Install Local Package&quot;</summary> 
 public static string InstallLocalPackage_Step1_LayoutLabel { get { return T("InstallLocalPackage.Step1.LayoutLabel"); } } 
 /// <summary>&quot;Package file&quot;</summary> 
 public static string InstallLocalPackage_Step1_FileUploadLabel { get { return T("InstallLocalPackage.Step1.FileUploadLabel"); } } 
 /// <summary>&quot;Browse to and select the local package file&quot;</summary> 
 public static string InstallLocalPackage_Step1_FileUploadHelp { get { return T("InstallLocalPackage.Step1.FileUploadHelp"); } } 
 /// <summary>&quot;Install Local Package&quot;</summary> 
 public static string InstallLocalPackage_Step2_LayoutLabel { get { return T("InstallLocalPackage.Step2.LayoutLabel"); } } 
 /// <summary>&quot;Ready to install&quot;</summary> 
 public static string InstallLocalPackage_Step2_HeadingTitle { get { return T("InstallLocalPackage.Step2.HeadingTitle"); } } 
 /// <summary>&quot;Ready to install the package. Please note that the installation may take several minutes. Click Next to continue.&quot;</summary> 
 public static string InstallLocalPackage_Step2_HeadingDescription { get { return T("InstallLocalPackage.Step2.HeadingDescription"); } } 
 /// <summary>&quot;Package Installed&quot;</summary> 
 public static string InstallLocalPackage_Step3_LayoutLabel { get { return T("InstallLocalPackage.Step3.LayoutLabel"); } } 
 /// <summary>&quot;Package installed successfully&quot;</summary> 
 public static string InstallLocalPackage_Step3_HeadingTitle { get { return T("InstallLocalPackage.Step3.HeadingTitle"); } } 
 /// <summary>&quot;Package installed successfully.&quot;</summary> 
 public static string InstallLocalPackage_Step3_HeadingDescription { get { return T("InstallLocalPackage.Step3.HeadingDescription"); } } 
 /// <summary>&quot;Package Installation Failed&quot;</summary> 
 public static string InstallLocalPackage_ShowError_LayoutLabel { get { return T("InstallLocalPackage.ShowError.LayoutLabel"); } } 
 /// <summary>&quot;Package installation failed&quot;</summary> 
 public static string InstallLocalPackage_ShowError_InfoTableCaption { get { return T("InstallLocalPackage.ShowError.InfoTableCaption"); } } 
 /// <summary>&quot;Message&quot;</summary> 
 public static string InstallLocalPackage_ShowError_MessageTitle { get { return T("InstallLocalPackage.ShowError.MessageTitle"); } } 
 /// <summary>&quot;The package Did Not Validate&quot;</summary> 
 public static string InstallLocalPackage_ShowWarning_LayoutLabel { get { return T("InstallLocalPackage.ShowWarning.LayoutLabel"); } } 
 /// <summary>&quot;The package did not validate&quot;</summary> 
 public static string InstallLocalPackage_ShowWarning_InfoTableCaption { get { return T("InstallLocalPackage.ShowWarning.InfoTableCaption"); } } 
 /// <summary>&quot;Uninstall Package&quot;</summary> 
 public static string UninstallRemotePackage_Step1_LayoutLabel { get { return T("UninstallRemotePackage.Step1.LayoutLabel"); } } 
 /// <summary>&quot;Ready to check uninstallation process&quot;</summary> 
 public static string UninstallRemotePackage_Step1_HeadingTitle { get { return T("UninstallRemotePackage.Step1.HeadingTitle"); } } 
 /// <summary>&quot;Ready to check the uninstall process of the package. Click Next to continue.&quot;</summary> 
 public static string UninstallRemotePackage_Step1_HeadingDescription { get { return T("UninstallRemotePackage.Step1.HeadingDescription"); } } 
 /// <summary>&quot;Uninstall Package&quot;</summary> 
 public static string UninstallRemotePackage_Step2_LayoutLabel { get { return T("UninstallRemotePackage.Step2.LayoutLabel"); } } 
 /// <summary>&quot;Ready to uninstall&quot;</summary> 
 public static string UninstallRemotePackage_Step2_HeadingTitle { get { return T("UninstallRemotePackage.Step2.HeadingTitle"); } } 
 /// <summary>&quot;Ready to uninstall the package. Please note that the installation may take several minutes. Click Next to continue.&quot;</summary> 
 public static string UninstallRemotePackage_Step2_HeadingDescription { get { return T("UninstallRemotePackage.Step2.HeadingDescription"); } } 
 /// <summary>&quot;Package Uninstalled&quot;</summary> 
 public static string UninstallRemotePackage_Step3_LayoutLabel { get { return T("UninstallRemotePackage.Step3.LayoutLabel"); } } 
 /// <summary>&quot;Package uninstalled successfully&quot;</summary> 
 public static string UninstallRemotePackage_Step3_HeadingTitle { get { return T("UninstallRemotePackage.Step3.HeadingTitle"); } } 
 /// <summary>&quot;Package uninstalled successfully.&quot;</summary> 
 public static string UninstallRemotePackage_Step3_HeadingDescription { get { return T("UninstallRemotePackage.Step3.HeadingDescription"); } } 
 /// <summary>&quot;Package Uninstallation Failed&quot;</summary> 
 public static string UninstallRemotePackage_ShowError_LayoutLabel { get { return T("UninstallRemotePackage.ShowError.LayoutLabel"); } } 
 /// <summary>&quot;Package uninstallation failed&quot;</summary> 
 public static string UninstallRemotePackage_ShowError_InfoTableCaption { get { return T("UninstallRemotePackage.ShowError.InfoTableCaption"); } } 
 /// <summary>&quot;Message&quot;</summary> 
 public static string UninstallRemotePackage_ShowError_MessageTitle { get { return T("UninstallRemotePackage.ShowError.MessageTitle"); } } 
 /// <summary>&quot;Uninstall Package&quot;</summary> 
 public static string UninstallRemotePackage_ShowUnregistre_LayoutLabel { get { return T("UninstallRemotePackage.ShowUnregistre.LayoutLabel"); } } 
 /// <summary>&quot;Registration of uninstallation failed&quot;</summary> 
 public static string UninstallRemotePackage_ShowUnregistre_HeadingTitle { get { return T("UninstallRemotePackage.ShowUnregistre.HeadingTitle"); } } 
 /// <summary>&quot;The registration of uninstallation failed. Contact the package vendor for manual unregistration.&quot;</summary> 
 public static string UninstallRemotePackage_ShowUnregistre_HeadingDescription { get { return T("UninstallRemotePackage.ShowUnregistre.HeadingDescription"); } } 
 /// <summary>&quot;Uninstall Local Package&quot;</summary> 
 public static string UninstallLocalPackage_Step1_LayoutLabel { get { return T("UninstallLocalPackage.Step1.LayoutLabel"); } } 
 /// <summary>&quot;Ready to check uninstallation process&quot;</summary> 
 public static string UninstallLocalPackage_Step1_HeadingTitle { get { return T("UninstallLocalPackage.Step1.HeadingTitle"); } } 
 /// <summary>&quot;Ready to check the uninstall process of the package. Click Next to continue.&quot;</summary> 
 public static string UninstallLocalPackage_Step1_HeadingDescription { get { return T("UninstallLocalPackage.Step1.HeadingDescription"); } } 
 /// <summary>&quot;Uninstall Local Package&quot;</summary> 
 public static string UninstallLocalPackage_Step2_LayoutLabel { get { return T("UninstallLocalPackage.Step2.LayoutLabel"); } } 
 /// <summary>&quot;Ready to uninstall&quot;</summary> 
 public static string UninstallLocalPackage_Step2_HeadingTitle { get { return T("UninstallLocalPackage.Step2.HeadingTitle"); } } 
 /// <summary>&quot;Ready to uninstall the package. Please note that the installation may take several minutes. Click Next to continue.&quot;</summary> 
 public static string UninstallLocalPackage_Step2_HeadingDescription { get { return T("UninstallLocalPackage.Step2.HeadingDescription"); } } 
 /// <summary>&quot;Package Uninstalled&quot;</summary> 
 public static string UninstallLocalPackage_Step3_LayoutLabel { get { return T("UninstallLocalPackage.Step3.LayoutLabel"); } } 
 /// <summary>&quot;Package uninstalled successfully&quot;</summary> 
 public static string UninstallLocalPackage_Step3_HeadingTitle { get { return T("UninstallLocalPackage.Step3.HeadingTitle"); } } 
 /// <summary>&quot;Package uninstalled successfully.&quot;</summary> 
 public static string UninstallLocalPackage_Step3_HeadingDescription { get { return T("UninstallLocalPackage.Step3.HeadingDescription"); } } 
 /// <summary>&quot;Package Uninstallation Failed&quot;</summary> 
 public static string UninstallLocalPackage_ShowError_LayoutLabel { get { return T("UninstallLocalPackage.ShowError.LayoutLabel"); } } 
 /// <summary>&quot;Package uninstallation failed&quot;</summary> 
 public static string UninstallLocalPackage_ShowError_InfoTableCaption { get { return T("UninstallLocalPackage.ShowError.InfoTableCaption"); } } 
 /// <summary>&quot;Message&quot;</summary> 
 public static string UninstallLocalPackage_ShowError_MessageTitle { get { return T("UninstallLocalPackage.ShowError.MessageTitle"); } } 
 /// <summary>&quot;New Package Source&quot;</summary> 
 public static string AddPackageSource_Step1_LayoutLabel { get { return T("AddPackageSource.Step1.LayoutLabel"); } } 
 /// <summary>&quot;Package source data&quot;</summary> 
 public static string AddPackageSource_Step1_FieldGroupLabel { get { return T("AddPackageSource.Step1.FieldGroupLabel"); } } 
 /// <summary>&quot;Package web service URL&quot;</summary> 
 public static string AddPackageSource_Step1_UrlLabel { get { return T("AddPackageSource.Step1.UrlLabel"); } } 
 /// <summary>&quot;Packages can be hosted on remote servers. The package web service URL will be validated in the next step.&quot;</summary> 
 public static string AddPackageSource_Step1_UrlHelp { get { return T("AddPackageSource.Step1.UrlHelp"); } } 
 /// <summary>&quot;The entered text was not a valid URL&quot;</summary> 
 public static string AddPackageSource_Step1_UrlNotValid { get { return T("AddPackageSource.Step1.UrlNotValid"); } } 
 /// <summary>&quot;The server is not a Composite C1 package server&quot;</summary> 
 public static string AddPackageSource_Step1_UrlNonPackageServer { get { return T("AddPackageSource.Step1.UrlNonPackageServer"); } } 
 /// <summary>&quot;Add Package Server Source&quot;</summary> 
 public static string AddPackageSource_Step2_LayoutLabel { get { return T("AddPackageSource.Step2.LayoutLabel"); } } 
 /// <summary>&quot;Server URL is valid&quot;</summary> 
 public static string AddPackageSource_Step2_HeadingTitle { get { return T("AddPackageSource.Step2.HeadingTitle"); } } 
 /// <summary>&quot;Note that the HTTP protocol is used on this connection. This implies that all information will be send unencrypted. Click Finish to add the source.&quot;</summary> 
 public static string AddPackageSource_Step2_HeadingNoHttpsDescription { get { return T("AddPackageSource.Step2.HeadingNoHttpsDescription"); } } 
 /// <summary>&quot;Click Finish to add the source.&quot;</summary> 
 public static string AddPackageSource_Step2_HeadingWithHttpsDescription { get { return T("AddPackageSource.Step2.HeadingWithHttpsDescription"); } } 
 /// <summary>&quot;Delete Confirmation&quot;</summary> 
 public static string DeletePackageSource_Step1_LayoutLabel { get { return T("DeletePackageSource.Step1.LayoutLabel"); } } 
 /// <summary>&quot;Delete the selected server source&quot;</summary> 
 public static string DeletePackageSource_Step1_Text { get { return T("DeletePackageSource.Step1.Text"); } } 
 /// <summary>&quot;Trial Period Has Expired&quot;</summary> 
 public static string ConfirmLicense_ExpiredTitle { get { return T("ConfirmLicense.ExpiredTitle"); } } 
 /// <summary>&quot;The trial period of the package has expired. You need to obtain a valid license.&quot;</summary> 
 public static string ConfirmLicense_ExpiredMessage { get { return T("ConfirmLicense.ExpiredMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PageElementProvider {
 /// <summary>&quot;Add New Page&quot;</summary> 
 public static string AddNewPageStep1_DialogLabel { get { return T("AddNewPageStep1.DialogLabel"); } } 
 /// <summary>&quot;General settings&quot;</summary> 
 public static string GeneralSettings_FieldGroupLabel { get { return T("GeneralSettings.FieldGroupLabel"); } } 
 /// <summary>&quot;Publication settings&quot;</summary> 
 public static string PublicationSettings_FieldGroupLabel { get { return T("PublicationSettings.FieldGroupLabel"); } } 
 /// <summary>&quot;Advanced settings&quot;</summary> 
 public static string AdvancedSettings_FieldGroupLabel { get { return T("AdvancedSettings.FieldGroupLabel"); } } 
 /// <summary>&quot;Page title&quot;</summary> 
 public static string AddNewPageStep1_LabelTitle { get { return T("AddNewPageStep1.LabelTitle"); } } 
 /// <summary>&quot;The entry specified in this field is shown in the browser window title bar. The field is used by search engines and sitemaps&quot;</summary> 
 public static string AddNewPageStep1_LabelTitleHelp { get { return T("AddNewPageStep1.LabelTitleHelp"); } } 
 /// <summary>&quot;Description&quot;</summary> 
 public static string AddNewPageStep1_LabelAbstract { get { return T("AddNewPageStep1.LabelAbstract"); } } 
 /// <summary>&quot;Use this field for at short description of the page&quot;</summary> 
 public static string AddNewPageStep1_LabelAbstractHelp { get { return T("AddNewPageStep1.LabelAbstractHelp"); } } 
 /// <summary>&quot;Page type&quot;</summary> 
 public static string AddNewPageStep1_LabelTemplate { get { return T("AddNewPageStep1.LabelTemplate"); } } 
 /// <summary>&quot;The page type selection influences the behavior and features of your page, like &apos;a normal page&apos; or &apos;a blog&apos;. The options available depend on features installed.&quot;</summary> 
 public static string AddNewPageStep1_HelpTemplate { get { return T("AddNewPageStep1.HelpTemplate"); } } 
 /// <summary>&quot;Position&quot;</summary> 
 public static string AddNewPageStep1_LabelPosition { get { return T("AddNewPageStep1.LabelPosition"); } } 
 /// <summary>&quot;Select where in the content tree you want the page to be placed.&quot;</summary> 
 public static string AddNewPageStep1_HelpPosition { get { return T("AddNewPageStep1.HelpPosition"); } } 
 /// <summary>&quot;Insert at the top&quot;</summary> 
 public static string AddNewPageStep1_LabelAddToTop { get { return T("AddNewPageStep1.LabelAddToTop"); } } 
 /// <summary>&quot;Insert at the bottom&quot;</summary> 
 public static string AddNewPageStep1_LabelAddToBottom { get { return T("AddNewPageStep1.LabelAddToBottom"); } } 
 /// <summary>&quot;Insert alphabetically&quot;</summary> 
 public static string AddNewPageStep1_LabelAddAlphabetic { get { return T("AddNewPageStep1.LabelAddAlphabetic"); } } 
 /// <summary>&quot;Select position...&quot;</summary> 
 public static string AddNewPageStep1_LabelAddBelowOtherPage { get { return T("AddNewPageStep1.LabelAddBelowOtherPage"); } } 
 /// <summary>&quot;URL title&quot;</summary> 
 public static string AddNewPageStep2_LabelUrlTitle { get { return T("AddNewPageStep2.LabelUrlTitle"); } } 
 /// <summary>&quot;The entry specified in this field is shown in the browser address bar. The field is used by search engines&quot;</summary> 
 public static string AddNewPageStep2_HelpUrlTitle { get { return T("AddNewPageStep2.HelpUrlTitle"); } } 
 /// <summary>&quot;Menu title&quot;</summary> 
 public static string AddNewPageStep2_LabelMenuTitle { get { return T("AddNewPageStep2.LabelMenuTitle"); } } 
 /// <summary>&quot;The entry specified in this field can be used in the navigation on the website&quot;</summary> 
 public static string AddNewPageStep2_HelpMenuTitle { get { return T("AddNewPageStep2.HelpMenuTitle"); } } 
 /// <summary>&quot;Select detailed page position&quot;</summary> 
 public static string AddNewPageStep2_LabelPositionSelectorPanel { get { return T("AddNewPageStep2.LabelPositionSelectorPanel"); } } 
 /// <summary>&quot;Position below&quot;</summary> 
 public static string AddNewPageStep2_LabelPositionSelector { get { return T("AddNewPageStep2.LabelPositionSelector"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewPageStep2_HelpPositionSelector { get { return T("AddNewPageStep2.HelpPositionSelector"); } } 
 /// <summary>&quot;The specified title is too long. Make it shorter and try again&quot;</summary> 
 public static string AddNewPageStep1_TitleTooLong { get { return T("AddNewPageStep1.TitleTooLong"); } } 
 /// <summary>&quot;The specified menu title is too long. Make it shorter and try again&quot;</summary> 
 public static string AddNewPageStep1_MenuTitleTooLong { get { return T("AddNewPageStep1.MenuTitleTooLong"); } } 
 /// <summary>&quot;Settings&quot;</summary> 
 public static string EditPage_LabelPaneSettings { get { return T("EditPage.LabelPaneSettings"); } } 
 /// <summary>&quot;Status&quot;</summary> 
 public static string EditPage_LabelPublicationState { get { return T("EditPage.LabelPublicationState"); } } 
 /// <summary>&quot;Send the page to another status&quot;</summary> 
 public static string EditPage_HelpPublicationState { get { return T("EditPage.HelpPublicationState"); } } 
 /// <summary>&quot;Page title&quot;</summary> 
 public static string EditPage_LabelPageTitle { get { return T("EditPage.LabelPageTitle"); } } 
 /// <summary>&quot;The entry specified in this field is shown in the browser window title bar. The field is used by search engines and sitemaps&quot;</summary> 
 public static string EditPage_LabelPageTitleHelp { get { return T("EditPage.LabelPageTitleHelp"); } } 
 /// <summary>&quot;Menu title&quot;</summary> 
 public static string EditPage_LabelMenuTitle { get { return T("EditPage.LabelMenuTitle"); } } 
 /// <summary>&quot;The entry specified in this field can be used in the navigation on the website&quot;</summary> 
 public static string EditPage_HelpMenuTitle { get { return T("EditPage.HelpMenuTitle"); } } 
 /// <summary>&quot;URL title&quot;</summary> 
 public static string EditPage_LabelUrlTitle { get { return T("EditPage.LabelUrlTitle"); } } 
 /// <summary>&quot;URL title was rewritten&quot;</summary> 
 public static string EditPage_UrlTitleFormattedTitle { get { return T("EditPage.UrlTitleFormattedTitle"); } } 
 /// <summary>&quot;According to the current URL replacement rules, URL title was changed to &apos;{0}&apos;&quot;</summary> 
 public static string EditPage_UrlTitleFormattedMessage(object parameter0) { return string.Format(T("EditPage.UrlTitleFormattedMessage"), parameter0); } 
 /// <summary>&quot;The entry specified in this field is shown in the browser address bar as a part of the URL address. The field is used by search engines&quot;</summary> 
 public static string EditPage_HelpUrlTitle { get { return T("EditPage.HelpUrlTitle"); } } 
 /// <summary>&quot;Friendly URL&quot;</summary> 
 public static string EditPage_LabelFriendlyUrl { get { return T("EditPage.LabelFriendlyUrl"); } } 
 /// <summary>&quot;The entry specified in this field is a shorter version of the actual page URL and redirects to it, when entered in the browser address bar. Note that some servers may have to be configured to support this feature.&quot;</summary> 
 public static string EditPage_HelpFriendlyUrl { get { return T("EditPage.HelpFriendlyUrl"); } } 
 /// <summary>&quot;Description&quot;</summary> 
 public static string EditPage_LabelAbstract { get { return T("EditPage.LabelAbstract"); } } 
 /// <summary>&quot;Use this field for a short description of the page&quot;</summary> 
 public static string EditPage_LabelAbstractHelp { get { return T("EditPage.LabelAbstractHelp"); } } 
 /// <summary>&quot;Publish date&quot;</summary> 
 public static string EditPage_LabelPublishDate { get { return T("EditPage.LabelPublishDate"); } } 
 /// <summary>&quot;Specify at which date and time you want the page to be published automatically.&quot;</summary> 
 public static string EditPage_HelpPublishDate { get { return T("EditPage.HelpPublishDate"); } } 
 /// <summary>&quot;Unpublish date&quot;</summary> 
 public static string EditPage_LabelUnpublishDate { get { return T("EditPage.LabelUnpublishDate"); } } 
 /// <summary>&quot;Specify at which date and time you want the page to be unpublished automatically.&quot;</summary> 
 public static string EditPage_HelpUnpublishDate { get { return T("EditPage.HelpUnpublishDate"); } } 
 /// <summary>&quot;Content&quot;</summary> 
 public static string EditPage_LabelContent { get { return T("EditPage.LabelContent"); } } 
 /// <summary>&quot;Preview&quot;</summary> 
 public static string EditPage_LabelPreview { get { return T("EditPage.LabelPreview"); } } 
 /// <summary>&quot;Page type&quot;</summary> 
 public static string EditPage_PageTypeSelectorLabel { get { return T("EditPage.PageTypeSelectorLabel"); } } 
 /// <summary>&quot;The page type selection defines the role of the page, like &apos;a normal page&apos; or &apos;a blog&apos;. The options available depend on features installed.&quot;</summary> 
 public static string EditPage_PageTypeSelectorHelp { get { return T("EditPage.PageTypeSelectorHelp"); } } 
 /// <summary>&quot;{0} characters maximum&quot;</summary> 
 public static string EditPage_MaxLength(object parameter0) { return string.Format(T("EditPage.MaxLength"), parameter0); } 
 /// <summary>&quot;Delete page?&quot;</summary> 
 public static string DeletePage_LabelFieldGroup { get { return T("DeletePage.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete page and all subpages&quot;</summary> 
 public static string DeletePageStep1_Title { get { return T("DeletePageStep1.Title"); } } 
 /// <summary>&quot;All subpages will also be deleted. Continue?&quot;</summary> 
 public static string DeletePageStep1_Description { get { return T("DeletePageStep1.Description"); } } 
 /// <summary>&quot;Delete page &apos;{0}&apos;?&quot;</summary> 
 public static string DeletePageStep2_Text(object parameter0) { return string.Format(T("DeletePageStep2.Text"), parameter0); } 
 /// <summary>&quot;Another page is using the specified URL title. URL titles must be unique among pages with the same parent.&quot;</summary> 
 public static string UrlTitleNotUniqueError { get { return T("UrlTitleNotUniqueError"); } } 
 /// <summary>&quot;The specified URL title contains invalid characters. Since this field is used to build the web address for the page, certain special characters (like question mark, slash and dot) are not allowed. You can use letters, digits and dash.&quot;</summary> 
 public static string UrlTitleNotValidError { get { return T("UrlTitleNotValidError"); } } 
 /// <summary>&quot;The specified URL title is too long. Make it shorter and try again&quot;</summary> 
 public static string UrlTitleTooLong { get { return T("UrlTitleTooLong"); } } 
 /// <summary>&quot;Another page is using the specified Friendly URL. Friendly URL&apos;s must be unique.&quot;</summary> 
 public static string FriendlyUrlNotUniqueError { get { return T("FriendlyUrlNotUniqueError"); } } 
 /// <summary>&quot;The title can not be empty.&quot;</summary> 
 public static string TitleMissingError { get { return T("TitleMissingError"); } } 
 /// <summary>&quot;Page not saved&quot;</summary> 
 public static string PageSaveValidationFailedTitle { get { return T("PageSaveValidationFailedTitle"); } } 
 /// <summary>&quot;The page did not validate and has not been saved. Please examine field messages.&quot;</summary> 
 public static string PageSaveValidationFailedMessage { get { return T("PageSaveValidationFailedMessage"); } } 
 /// <summary>&quot;Websites&quot;</summary> 
 public static string PageElementProvider_RootLabel { get { return T("PageElementProvider.RootLabel"); } } 
 /// <summary>&quot;Websites&quot;</summary> 
 public static string PageElementProvider_RootLabelToolTip { get { return T("PageElementProvider.RootLabelToolTip"); } } 
 /// <summary>&quot;Add Website...&quot;</summary> 
 public static string PageElementProvider_AddPageAtRoot { get { return T("PageElementProvider.AddPageAtRoot"); } } 
 /// <summary>&quot;Add new homepage&quot;</summary> 
 public static string PageElementProvider_AddPageAtRootToolTip { get { return T("PageElementProvider.AddPageAtRootToolTip"); } } 
 /// <summary>&quot;List Unpublished Pages&quot;</summary> 
 public static string PageElementProvider_ViewUnpublishedItems { get { return T("PageElementProvider.ViewUnpublishedItems"); } } 
 /// <summary>&quot;Get an overview of pages and page folder data that haven&apos;t been published yet.&quot;</summary> 
 public static string PageElementProvider_ViewUnpublishedItemsToolTip { get { return T("PageElementProvider.ViewUnpublishedItemsToolTip"); } } 
 /// <summary>&quot;Unpublished content&quot;</summary> 
 public static string PageElementProvider_ViewUnpublishedItems_document_title { get { return T("PageElementProvider.ViewUnpublishedItems-document-title"); } } 
 /// <summary>&quot;The list below displays pages and page data which are currently being edited or are ready to be approved / published.&quot;</summary> 
 public static string PageElementProvider_ViewUnpublishedItems_document_description { get { return T("PageElementProvider.ViewUnpublishedItems-document-description"); } } 
 /// <summary>&quot;Edit Page&quot;</summary> 
 public static string PageElementProvider_EditPage { get { return T("PageElementProvider.EditPage"); } } 
 /// <summary>&quot;Edit selected page&quot;</summary> 
 public static string PageElementProvider_EditPageToolTip { get { return T("PageElementProvider.EditPageToolTip"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string PageElementProvider_Delete { get { return T("PageElementProvider.Delete"); } } 
 /// <summary>&quot;Delete the selected page&quot;</summary> 
 public static string PageElementProvider_DeleteToolTip { get { return T("PageElementProvider.DeleteToolTip"); } } 
 /// <summary>&quot;Translate Page&quot;</summary> 
 public static string PageElementProvider_LocalizePage { get { return T("PageElementProvider.LocalizePage"); } } 
 /// <summary>&quot;Translate selected page&quot;</summary> 
 public static string PageElementProvider_LocalizePageToolTip { get { return T("PageElementProvider.LocalizePageToolTip"); } } 
 /// <summary>&quot;Add Page...&quot;</summary> 
 public static string PageElementProvider_AddSubPage { get { return T("PageElementProvider.AddSubPage"); } } 
 /// <summary>&quot;Add new page below the selected&quot;</summary> 
 public static string PageElementProvider_AddSubPageToolTip { get { return T("PageElementProvider.AddSubPageToolTip"); } } 
 /// <summary>&quot;Show page local orderings&quot;</summary> 
 public static string PageElementProvider_DisplayLocalOrderingLabel { get { return T("PageElementProvider.DisplayLocalOrderingLabel"); } } 
 /// <summary>&quot;Show page local orderings&quot;</summary> 
 public static string PageElementProvider_DisplayLocalOrderingToolTip { get { return T("PageElementProvider.DisplayLocalOrderingToolTip"); } } 
 /// <summary>&quot;Not yet approved or published&quot;</summary> 
 public static string PageElementProvider_DisabledPage { get { return T("PageElementProvider.DisabledPage"); } } 
 /// <summary>&quot;Website Template required&quot;</summary> 
 public static string PageElementProvider_MissingTemplateTitle { get { return T("PageElementProvider.MissingTemplateTitle"); } } 
 /// <summary>&quot;You should create a &apos;Page Template&apos; first. Go to the &apos;Layout&apos; perspective and create one.&quot;</summary> 
 public static string PageElementProvider_MissingTemplateMessage { get { return T("PageElementProvider.MissingTemplateMessage"); } } 
 /// <summary>&quot;Language required&quot;</summary> 
 public static string PageElementProvider_MissingActiveLanguageTitle { get { return T("PageElementProvider.MissingActiveLanguageTitle"); } } 
 /// <summary>&quot;To add a page, you should firstly add at least one language. It can be done in the &apos;System&apos; perspective.&quot;</summary> 
 public static string PageElementProvider_MissingActiveLanguageMessage { get { return T("PageElementProvider.MissingActiveLanguageMessage"); } } 
 /// <summary>&quot;No page type available&quot;</summary> 
 public static string PageElementProvider_NoPageTypesAvailableTitle { get { return T("PageElementProvider.NoPageTypesAvailableTitle"); } } 
 /// <summary>&quot;You should create a &apos;Page Type&apos; first. Go to the &apos;Layout&apos; perspective and create one.&quot;</summary> 
 public static string PageElementProvider_NoPageTypesAvailableMessage { get { return T("PageElementProvider.NoPageTypesAvailableMessage"); } } 
 /// <summary>&quot;Page type required&quot;</summary> 
 public static string PageElementProvider_MissingPageTypeTitle { get { return T("PageElementProvider.MissingPageTypeTitle"); } } 
 /// <summary>&quot;To create a homepage, a page type without the &quot;only subpages&quot; restriction is required, but none have been added yet. You can add one under the Layout perspective.&quot;</summary> 
 public static string PageElementProvider_MissingPageTypeHomepageMessage { get { return T("PageElementProvider.MissingPageTypeHomepageMessage"); } } 
 /// <summary>&quot;To create a subpage, a page type without the the only homepages restriction is required, but none have been added yet. You can add one under the Layout perspective.&quot;</summary> 
 public static string PageElementProvider_MissingPageTypeSubpageMessage { get { return T("PageElementProvider.MissingPageTypeSubpageMessage"); } } 
 /// <summary>&quot;Unable to add a page!&quot;</summary> 
 public static string PageElementProvider_RuleDontAllowPageAddTitle { get { return T("PageElementProvider.RuleDontAllowPageAddTitle"); } } 
 /// <summary>&quot;The rules that define availability for Page Types prohibit adding a page here.&quot;</summary> 
 public static string PageElementProvider_RuleDontAllowPageAddMessage { get { return T("PageElementProvider.RuleDontAllowPageAddMessage"); } } 
 /// <summary>&quot;Manage host name&quot;</summary> 
 public static string ManageHostNames_Add_DialogLabel { get { return T("ManageHostNames.Add.DialogLabel"); } } 
 /// <summary>&quot;Add host name association to page&quot;</summary> 
 public static string ManageHostNames_Add_HeadingTitle { get { return T("ManageHostNames.Add.HeadingTitle"); } } 
 /// <summary>&quot;You can associate a host name (or a domain name) to a page by specifying it in the field below. Please note that the DNS settings for the specified host name must also be configured, which is done outside this system.&quot;</summary> 
 public static string ManageHostNames_Add_HeadingDescription { get { return T("ManageHostNames.Add.HeadingDescription"); } } 
 /// <summary>&quot;Host name association to page&quot;</summary> 
 public static string ManageHostNames_Add_FieldGroupLabel { get { return T("ManageHostNames.Add.FieldGroupLabel"); } } 
 /// <summary>&quot;Host name&quot;</summary> 
 public static string ManageHostNames_Add_HostNameTextBoxLabel { get { return T("ManageHostNames.Add.HostNameTextBoxLabel"); } } 
 /// <summary>&quot;Specify the host name (like &apos;www.composite.net&apos; or &apos;composite.net&apos;) you want to associate with this page&quot;</summary> 
 public static string ManageHostNames_Add_HostNametextBoxHelp { get { return T("ManageHostNames.Add.HostNametextBoxHelp"); } } 
 /// <summary>&quot;The syntax of the host name is not valid&quot;</summary> 
 public static string ManageHostNames_Add_InvalidHostNameSyntaxError { get { return T("ManageHostNames.Add.InvalidHostNameSyntaxError"); } } 
 /// <summary>&quot;This host name is already associated to a page. You must remove the existing association first.&quot;</summary> 
 public static string ManageHostNames_Add_HostNameNotUniqueError { get { return T("ManageHostNames.Add.HostNameNotUniqueError"); } } 
 /// <summary>&quot;Manage host name&quot;</summary> 
 public static string ManageHostNames_Remove_DialogLabel { get { return T("ManageHostNames.Remove.DialogLabel"); } } 
 /// <summary>&quot;Remove host name association from page&quot;</summary> 
 public static string ManageHostNames_Remove_FieldGroupLabel { get { return T("ManageHostNames.Remove.FieldGroupLabel"); } } 
 /// <summary>&quot;Host names to remove&quot;</summary> 
 public static string ManageHostNames_Remove_MultiSelectorLabel { get { return T("ManageHostNames.Remove.MultiSelectorLabel"); } } 
 /// <summary>&quot;The host names you select will no longer be associated with the page&quot;</summary> 
 public static string ManageHostNames_Remove_MultiSelectorHelp { get { return T("ManageHostNames.Remove.MultiSelectorHelp"); } } 
 /// <summary>&quot;Please confirm deletion of all sub pages&quot;</summary> 
 public static string DeletePageWorkflow_MissingConfirmErrorMessage { get { return T("DeletePageWorkflow.MissingConfirmErrorMessage"); } } 
 /// <summary>&quot;Cascade delete error&quot;</summary> 
 public static string DeletePageWorkflow_CascadeDeleteErrorTitle { get { return T("DeletePageWorkflow.CascadeDeleteErrorTitle"); } } 
 /// <summary>&quot;The page is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
 public static string DeletePageWorkflow_CascadeDeleteErrorMessage { get { return T("DeletePageWorkflow.CascadeDeleteErrorMessage"); } } 
 /// <summary>&quot;Can not delete page&quot;</summary> 
 public static string DeletePageWorkflow_HasCompositionsTitle { get { return T("DeletePageWorkflow.HasCompositionsTitle"); } } 
 /// <summary>&quot;This page has one or more page folders or metadata fields defined on it. Delete these first.&quot;</summary> 
 public static string DeletePageWorkflow_HasCompositionsMessage { get { return T("DeletePageWorkflow.HasCompositionsMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PageTemplateElementProvider {
 /// <summary>&quot;Page Templates&quot;</summary> 
 public static string PageTemplateElementProvider_RootLabel { get { return T("PageTemplateElementProvider.RootLabel"); } } 
 /// <summary>&quot;You can find the sites XHTML templates here&quot;</summary> 
 public static string PageTemplateElementProvider_RootLabelToolTip { get { return T("PageTemplateElementProvider.RootLabelToolTip"); } } 
 /// <summary>&quot;Add Template&quot;</summary> 
 public static string PageTemplateElementProvider_AddTemplate { get { return T("PageTemplateElementProvider.AddTemplate"); } } 
 /// <summary>&quot;Add new template&quot;</summary> 
 public static string PageTemplateElementProvider_AddTemplateToolTip { get { return T("PageTemplateElementProvider.AddTemplateToolTip"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string PageTemplateElementProvider_DeleteTemplate { get { return T("PageTemplateElementProvider.DeleteTemplate"); } } 
 /// <summary>&quot;Delete this item&quot;</summary> 
 public static string PageTemplateElementProvider_DeleteTemplateToolTip { get { return T("PageTemplateElementProvider.DeleteTemplateToolTip"); } } 
 /// <summary>&quot;Shared Code&quot;</summary> 
 public static string PageTemplateElementProvider_SharedCodeFolder_Title { get { return T("PageTemplateElementProvider.SharedCodeFolder.Title"); } } 
 /// <summary>&quot;Files used by layout files&quot;</summary> 
 public static string PageTemplateElementProvider_SharedCodeFolder_ToolTip { get { return T("PageTemplateElementProvider.SharedCodeFolder.ToolTip"); } } 
 /// <summary>&quot;Edit&quot;</summary> 
 public static string EditSharedCodeFile_Label { get { return T("EditSharedCodeFile.Label"); } } 
 /// <summary>&quot;Edit the file&quot;</summary> 
 public static string EditSharedCodeFile_ToolTip { get { return T("EditSharedCodeFile.ToolTip"); } } 
 /// <summary>&quot;Edit XML Template&quot;</summary> 
 public static string PageTemplateElementProvider_EditXmlTemplate { get { return T("PageTemplateElementProvider.EditXmlTemplate"); } } 
 /// <summary>&quot;Edit the selected XML template&quot;</summary> 
 public static string PageTemplateElementProvider_EditXmlTemplateToolTip { get { return T("PageTemplateElementProvider.EditXmlTemplateToolTip"); } } 
 /// <summary>&quot;Add New XML Page Template&quot;</summary> 
 public static string AddNewXmlPageTemplate_LabelDialog { get { return T("AddNewXmlPageTemplate.LabelDialog"); } } 
 /// <summary>&quot;Template Title&quot;</summary> 
 public static string AddNewXmlPageTemplate_LabelTemplateTitle { get { return T("AddNewXmlPageTemplate.LabelTemplateTitle"); } } 
 /// <summary>&quot;The title identifies this template in lists. Consider selecting a short but meaningful name.&quot;</summary> 
 public static string AddNewXmlPageTemplate_LabelTemplateTitleHelp { get { return T("AddNewXmlPageTemplate.LabelTemplateTitleHelp"); } } 
 /// <summary>&quot;Copy from&quot;</summary> 
 public static string AddNewXmlPageTemplate_LabelCopyFrom { get { return T("AddNewXmlPageTemplate.LabelCopyFrom"); } } 
 /// <summary>&quot;You can copy the markup from another XML Page Template by selecting it in this list.&quot;</summary> 
 public static string AddNewXmlPageTemplate_LabelCopyFromHelp { get { return T("AddNewXmlPageTemplate.LabelCopyFromHelp"); } } 
 /// <summary>&quot;(New template)&quot;</summary> 
 public static string AddNewXmlPageTemplate_LabelCopyFromEmptyOption { get { return T("AddNewXmlPageTemplate.LabelCopyFromEmptyOption"); } } 
 /// <summary>&quot;Title already used&quot;</summary> 
 public static string AddNewXmlPageTemplateWorkflow_TitleInUseTitle { get { return T("AddNewXmlPageTemplateWorkflow.TitleInUseTitle"); } } 
 /// <summary>&quot;The title is too long (used as part of the XML filename).&quot;</summary> 
 public static string AddNewXmlPageTemplateWorkflow_TitleTooLong { get { return T("AddNewXmlPageTemplateWorkflow.TitleTooLong"); } } 
 /// <summary>&quot;Markup Code&quot;</summary> 
 public static string EditXmlPageTemplate_LabelMarkUpCode { get { return T("EditXmlPageTemplate.LabelMarkUpCode"); } } 
 /// <summary>&quot;Template Info&quot;</summary> 
 public static string EditXmlPageTemplate_LabelTemplateIdentification { get { return T("EditXmlPageTemplate.LabelTemplateIdentification"); } } 
 /// <summary>&quot;Template Title&quot;</summary> 
 public static string EditXmlPageTemplate_LabelTemplateTitle { get { return T("EditXmlPageTemplate.LabelTemplateTitle"); } } 
 /// <summary>&quot;The title identifies this template in lists. Consider selecting a short but meaningful name.&quot;</summary> 
 public static string EditXmlPageTemplate_LabelTemplateTitleHelp { get { return T("EditXmlPageTemplate.LabelTemplateTitleHelp"); } } 
 /// <summary>&quot;Unable to Save Template&quot;</summary> 
 public static string EditXmlPageTemplateWorkflow_InvalidXmlTitle { get { return T("EditXmlPageTemplateWorkflow.InvalidXmlTitle"); } } 
 /// <summary>&quot;The page template markup did not validate. {0}&quot;</summary> 
 public static string EditXmlPageTemplateWorkflow_InvalidXmlMessage(object parameter0) { return string.Format(T("EditXmlPageTemplateWorkflow.InvalidXmlMessage"), parameter0); } 
 /// <summary>&quot;Cannot rename a template - the file with the name &apos;{0}&apos; already exists.&quot;</summary> 
 public static string EditXmlPageTemplateWorkflow_CannotRenameFileExists(object parameter0) { return string.Format(T("EditXmlPageTemplateWorkflow.CannotRenameFileExists"), parameter0); } 
 /// <summary>&quot;Title already used&quot;</summary> 
 public static string EditXmlPageTemplateWorkflow_TitleInUseTitle { get { return T("EditXmlPageTemplateWorkflow.TitleInUseTitle"); } } 
 /// <summary>&quot;Delete This Page Template?&quot;</summary> 
 public static string DeletePageTemplateStep1_LabelFieldGroup { get { return T("DeletePageTemplateStep1.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete page template?&quot;</summary> 
 public static string DeletePageTemplateStep1_Text { get { return T("DeletePageTemplateStep1.Text"); } } 
 /// <summary>&quot;Cascade Delete Error&quot;</summary> 
 public static string DeletePageTemplateWorkflow_CascadeDeleteErrorTitle { get { return T("DeletePageTemplateWorkflow.CascadeDeleteErrorTitle"); } } 
 /// <summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted.&quot;</summary> 
 public static string DeletePageTemplateWorkflow_CascadeDeleteErrorMessage { get { return T("DeletePageTemplateWorkflow.CascadeDeleteErrorMessage"); } } 
 /// <summary>&quot;There are {0} page[s] referencing this template: {1}&quot;</summary> 
 public static string DeletePageTemplateWorkflow_PageReference(object parameter0,object parameter1) { return string.Format(T("DeletePageTemplateWorkflow.PageReference"), parameter0,parameter1); } 
 /// <summary>&quot;There are {0} page type[s] referencing this template: {1}&quot;</summary> 
 public static string DeletePageTemplateWorkflow_PageTypeReference(object parameter0,object parameter1) { return string.Format(T("DeletePageTemplateWorkflow.PageTypeReference"), parameter0,parameter1); } 
 /// <summary>&quot;Add New Page Template&quot;</summary> 
 public static string AddNewPageTemplate_LabelDialog { get { return T("AddNewPageTemplate.LabelDialog"); } } 
 /// <summary>&quot;Choose one of the possible types of page templates&quot;</summary> 
 public static string AddNewPageTemplate_TemplateTypeHelp { get { return T("AddNewPageTemplate.TemplateTypeHelp"); } } 
 /// <summary>&quot;Template type&quot;</summary> 
 public static string AddNewPageTemplate_TemplateTypeLabel { get { return T("AddNewPageTemplate.TemplateTypeLabel"); } } 
 /// <summary>&quot;Razor&quot;</summary> 
 public static string AddNewPageTemplate_TemplateType_Razor { get { return T("AddNewPageTemplate.TemplateType.Razor"); } } 
 /// <summary>&quot;Master Page&quot;</summary> 
 public static string AddNewPageTemplate_TemplateType_MasterPage { get { return T("AddNewPageTemplate.TemplateType.MasterPage"); } } 
 /// <summary>&quot;XML&quot;</summary> 
 public static string AddNewPageTemplate_TemplateType_XML { get { return T("AddNewPageTemplate.TemplateType.XML"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PageTemplateFeatureElementProvider {
 /// <summary>&quot;Page Template Features&quot;</summary> 
 public static string ElementProvider_RootLabel { get { return T("ElementProvider.RootLabel"); } } 
 /// <summary>&quot;Here you can find features - snippets of HTML and functionality - included in the website templates.&quot;</summary> 
 public static string ElementProvider_RootToolTip { get { return T("ElementProvider.RootToolTip"); } } 
 /// <summary>&quot;Add Template Feature&quot;</summary> 
 public static string ElementProvider_AddTemplateFeature { get { return T("ElementProvider.AddTemplateFeature"); } } 
 /// <summary>&quot;Add a new page template feature&quot;</summary> 
 public static string ElementProvider_AddTemplateFeatureToolTip { get { return T("ElementProvider.AddTemplateFeatureToolTip"); } } 
 /// <summary>&quot;Delete Template Feature&quot;</summary> 
 public static string ElementProvider_DeleteTemplateFeature { get { return T("ElementProvider.DeleteTemplateFeature"); } } 
 /// <summary>&quot;Delete this template feature&quot;</summary> 
 public static string ElementProvider_DeleteTemplateFeatureToolTip { get { return T("ElementProvider.DeleteTemplateFeatureToolTip"); } } 
 /// <summary>&quot;Edit Template Feature&quot;</summary> 
 public static string ElementProvider_EditTemplateFeature { get { return T("ElementProvider.EditTemplateFeature"); } } 
 /// <summary>&quot;Edit the selected template feature&quot;</summary> 
 public static string ElementProvider_EditTemplateFeatureToolTip { get { return T("ElementProvider.EditTemplateFeatureToolTip"); } } 
 /// <summary>&quot;Use Visual Editor&quot;</summary> 
 public static string ElementProvider_EditVisually { get { return T("ElementProvider.EditVisually"); } } 
 /// <summary>&quot;When enabled the visual editor will be used to manage this feature&quot;</summary> 
 public static string ElementProvider_EditVisuallyToolTip { get { return T("ElementProvider.EditVisuallyToolTip"); } } 
 /// <summary>&quot;Add New Page Template Feature&quot;</summary> 
 public static string AddWorkflow_LabelDialog { get { return T("AddWorkflow.LabelDialog"); } } 
 /// <summary>&quot;Feature name&quot;</summary> 
 public static string AddWorkflow_LabelTemplateFeatureName { get { return T("AddWorkflow.LabelTemplateFeatureName"); } } 
 /// <summary>&quot;The name is used to identify this feature when included in templates&quot;</summary> 
 public static string AddWorkflow_LabelTemplateFeatureNameHelp { get { return T("AddWorkflow.LabelTemplateFeatureNameHelp"); } } 
 /// <summary>&quot;Editor type&quot;</summary> 
 public static string AddWorkflow_LabelTemplateFeatureEditorType { get { return T("AddWorkflow.LabelTemplateFeatureEditorType"); } } 
 /// <summary>&quot;Choose which type of editor to use when maintaining this feature. You can always switch the editor type in the tree later.&quot;</summary> 
 public static string AddWorkflow_LabelTemplateFeatureEditorTypeHelp { get { return T("AddWorkflow.LabelTemplateFeatureEditorTypeHelp"); } } 
 /// <summary>&quot;Visual Editor&quot;</summary> 
 public static string AddWorkflow_LabelTemplateFeatureEditorType_html { get { return T("AddWorkflow.LabelTemplateFeatureEditorType.html"); } } 
 /// <summary>&quot;Markup Editor&quot;</summary> 
 public static string AddWorkflow_LabelTemplateFeatureEditorType_xml { get { return T("AddWorkflow.LabelTemplateFeatureEditorType.xml"); } } 
 /// <summary>&quot;The name is already used by another feature&quot;</summary> 
 public static string AddWorkflow_NameInUse { get { return T("AddWorkflow.NameInUse"); } } 
 /// <summary>&quot;The title is too long (max 50 characters)&quot;</summary> 
 public static string AddWorkflow_NameTooLong { get { return T("AddWorkflow.NameTooLong"); } } 
 /// <summary>&quot;The name must be usable in a file name - you have invalid characters you need to remove&quot;</summary> 
 public static string AddWorkflow_NameNotValidInFilename { get { return T("AddWorkflow.NameNotValidInFilename"); } } 
 /// <summary>&quot;Delete This Page Template Feature?&quot;</summary> 
 public static string DeleteWorkflow_Title { get { return T("DeleteWorkflow.Title"); } } 
 /// <summary>&quot;If this feature is in use by page templates, this action could lead to errors.&quot;</summary> 
 public static string DeleteWorkflow_Text { get { return T("DeleteWorkflow.Text"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PageTypeElementProvider {
 /// <summary>&quot;Page Types&quot;</summary> 
 public static string PageType_Tree_Root_Label { get { return T("PageType.Tree.Root.Label"); } } 
 /// <summary>&quot;Placeholder Content&quot;</summary> 
 public static string PageType_Tree_DefaultContentElement_Label { get { return T("PageType.Tree.DefaultContentElement.Label"); } } 
 /// <summary>&quot;Metadata Fields&quot;</summary> 
 public static string PageType_Tree_MetaDataFieldsElement_Label { get { return T("PageType.Tree.MetaDataFieldsElement.Label"); } } 
 /// <summary>&quot;Add Page Type&quot;</summary> 
 public static string PageType_Tree_AddNewPageType_Label { get { return T("PageType.Tree.AddNewPageType.Label"); } } 
 /// <summary>&quot;Add new page type&quot;</summary> 
 public static string PageType_Tree_AddNewPageType_ToolTip { get { return T("PageType.Tree.AddNewPageType.ToolTip"); } } 
 /// <summary>&quot;Edit Page Type&quot;</summary> 
 public static string PageType_Tree_EditPageType_Label { get { return T("PageType.Tree.EditPageType.Label"); } } 
 /// <summary>&quot;Edit selected page type&quot;</summary> 
 public static string PageType_Tree_EditPageType_ToolTip { get { return T("PageType.Tree.EditPageType.ToolTip"); } } 
 /// <summary>&quot;Delete Page Type&quot;</summary> 
 public static string PageType_Tree_DeletePageType_Label { get { return T("PageType.Tree.DeletePageType.Label"); } } 
 /// <summary>&quot;Delete selected page type&quot;</summary> 
 public static string PageType_Tree_DeletePageType_ToolTip { get { return T("PageType.Tree.DeletePageType.ToolTip"); } } 
 /// <summary>&quot;Add Default Content&quot;</summary> 
 public static string PageType_Tree_AddDefaultPageContent_Label { get { return T("PageType.Tree.AddDefaultPageContent.Label"); } } 
 /// <summary>&quot;Add placeholder default content&quot;</summary> 
 public static string PageType_Tree_AddDefaultPageContent_ToolTip { get { return T("PageType.Tree.AddDefaultPageContent.ToolTip"); } } 
 /// <summary>&quot;Edit Default Content&quot;</summary> 
 public static string PageType_Tree_EditDefaultPageContent_Label { get { return T("PageType.Tree.EditDefaultPageContent.Label"); } } 
 /// <summary>&quot;Edit placeholder default content&quot;</summary> 
 public static string PageType_Tree_EditDefaultPageContent_ToolTip { get { return T("PageType.Tree.EditDefaultPageContent.ToolTip"); } } 
 /// <summary>&quot;Delete Default Content&quot;</summary> 
 public static string PageType_Tree_DeleteDefaultPageContent_Label { get { return T("PageType.Tree.DeleteDefaultPageContent.Label"); } } 
 /// <summary>&quot;Delete default content&quot;</summary> 
 public static string PageType_Tree_DeleteDefaultPageContent_ToolTip { get { return T("PageType.Tree.DeleteDefaultPageContent.ToolTip"); } } 
 /// <summary>&quot;Add Metadata Field&quot;</summary> 
 public static string PageType_Tree_AddMetaDataField_Label { get { return T("PageType.Tree.AddMetaDataField.Label"); } } 
 /// <summary>&quot;Add new Metadata field&quot;</summary> 
 public static string PageType_Tree_AddMetaDataField_ToolTip { get { return T("PageType.Tree.AddMetaDataField.ToolTip"); } } 
 /// <summary>&quot;Edit Metadata Field&quot;</summary> 
 public static string PageType_Tree_EditMetaDataField_Label { get { return T("PageType.Tree.EditMetaDataField.Label"); } } 
 /// <summary>&quot;Edit selected Metadata field&quot;</summary> 
 public static string PageType_Tree_EditMetaDataField_ToolTip { get { return T("PageType.Tree.EditMetaDataField.ToolTip"); } } 
 /// <summary>&quot;Delete Metadata Field&quot;</summary> 
 public static string PageType_Tree_DeleteMetaDataField_Label { get { return T("PageType.Tree.DeleteMetaDataField.Label"); } } 
 /// <summary>&quot;Delete selected Metadata field&quot;</summary> 
 public static string PageType_Tree_DeleteMetaDataField_ToolTip { get { return T("PageType.Tree.DeleteMetaDataField.ToolTip"); } } 
 /// <summary>&quot;Add New Page Type&quot;</summary> 
 public static string PageType_AddNewPageTypeWorkflow_Layout_Label { get { return T("PageType.AddNewPageTypeWorkflow.Layout.Label"); } } 
 /// <summary>&quot;New page type settings&quot;</summary> 
 public static string PageType_AddNewPageTypeWorkflow_FieldGroup_Label { get { return T("PageType.AddNewPageTypeWorkflow.FieldGroup.Label"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string PageType_AddNewPageTypeWorkflow_NameTextBox_Label { get { return T("PageType.AddNewPageTypeWorkflow.NameTextBox.Label"); } } 
 /// <summary>&quot;The name of the new page type&quot;</summary> 
 public static string PageType_AddNewPageTypeWorkflow_NameTextBox_Help { get { return T("PageType.AddNewPageTypeWorkflow.NameTextBox.Help"); } } 
 /// <summary>&quot;Description&quot;</summary> 
 public static string PageType_AddNewPageTypeWorkflow_DescriptionTextArea_Label { get { return T("PageType.AddNewPageTypeWorkflow.DescriptionTextArea.Label"); } } 
 /// <summary>&quot;The description of the new page type&quot;</summary> 
 public static string PageType_AddNewPageTypeWorkflow_DescriptionTextArea_Help { get { return T("PageType.AddNewPageTypeWorkflow.DescriptionTextArea.Help"); } } 
 /// <summary>&quot;Settings&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_SettingsPlaceHolder_Label { get { return T("PageType.EditPageTypeWorkflow.SettingsPlaceHolder.Label"); } } 
 /// <summary>&quot;Page type settings&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_SettingsFieldGroup_Label { get { return T("PageType.EditPageTypeWorkflow.SettingsFieldGroup.Label"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_NameTextBox_Label { get { return T("PageType.EditPageTypeWorkflow.NameTextBox.Label"); } } 
 /// <summary>&quot;The name of the page type&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_NameTextBox_Help { get { return T("PageType.EditPageTypeWorkflow.NameTextBox.Help"); } } 
 /// <summary>&quot;Description&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_DescriptionTextArea_Label { get { return T("PageType.EditPageTypeWorkflow.DescriptionTextArea.Label"); } } 
 /// <summary>&quot;The description of the page type&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_DescriptionTextArea_Help { get { return T("PageType.EditPageTypeWorkflow.DescriptionTextArea.Help"); } } 
 /// <summary>&quot;Available&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_AvailableCheckBox_Label { get { return T("PageType.EditPageTypeWorkflow.AvailableCheckBox.Label"); } } 
 /// <summary>&quot;Unchecking this will make this page non-selectable on any page&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_AvailableCheckBox_Help { get { return T("PageType.EditPageTypeWorkflow.AvailableCheckBox.Help"); } } 
 /// <summary>&quot;Preset menu title&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_PresetMenuTitleCheckBox_Label { get { return T("PageType.EditPageTypeWorkflow.PresetMenuTitleCheckBox.Label"); } } 
 /// <summary>&quot;If this is checked a default value for the menu title on pages is preset&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_PresetMenuTitleCheckBox_Help { get { return T("PageType.EditPageTypeWorkflow.PresetMenuTitleCheckBox.Help"); } } 
 /// <summary>&quot;Default child page type&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_DefaultChildPageTypeKeySelector_Label { get { return T("PageType.EditPageTypeWorkflow.DefaultChildPageTypeKeySelector.Label"); } } 
 /// <summary>&quot;Select a page type to be the default page type for child pages created with this page type&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_DefaultChildPageTypeKeySelector_Help { get { return T("PageType.EditPageTypeWorkflow.DefaultChildPageTypeKeySelector.Help"); } } 
 /// <summary>&quot;[None]&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_DefaultChildPageTypeKeySelector_NoneSelectedLabel { get { return T("PageType.EditPageTypeWorkflow.DefaultChildPageTypeKeySelector.NoneSelectedLabel"); } } 
 /// <summary>&quot;Layout&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_PageTemplatePlaceHolder_Label { get { return T("PageType.EditPageTypeWorkflow.PageTemplatePlaceHolder.Label"); } } 
 /// <summary>&quot;Layout&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_PageTemplateRestrictionFieldGroup_Label { get { return T("PageType.EditPageTypeWorkflow.PageTemplateRestrictionFieldGroup.Label"); } } 
 /// <summary>&quot;Layout restrictions&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_PageTemplateRestrictionMultiKeySelector_Label { get { return T("PageType.EditPageTypeWorkflow.PageTemplateRestrictionMultiKeySelector.Label"); } } 
 /// <summary>&quot;Select layouts to be only available when editing pages of this page type. If none is selected (default), all will be available.&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_PageTemplateRestrictionMultiKeySelector_Help { get { return T("PageType.EditPageTypeWorkflow.PageTemplateRestrictionMultiKeySelector.Help"); } } 
 /// <summary>&quot;Default layout&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_DefaultPageTemplateKeySelector_Label { get { return T("PageType.EditPageTypeWorkflow.DefaultPageTemplateKeySelector.Label"); } } 
 /// <summary>&quot;Select a layout to be the default layout for pages created with this page type&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_DefaultPageTemplateKeySelector_Help { get { return T("PageType.EditPageTypeWorkflow.DefaultPageTemplateKeySelector.Help"); } } 
 /// <summary>&quot;[None]&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_DefaultPageTemplateKeySelector_NoneSelectedLabel { get { return T("PageType.EditPageTypeWorkflow.DefaultPageTemplateKeySelector.NoneSelectedLabel"); } } 
 /// <summary>&quot;Availability&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_AvailabilityPlaceHolder_Label { get { return T("PageType.EditPageTypeWorkflow.AvailabilityPlaceHolder.Label"); } } 
 /// <summary>&quot;Availability&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_AvailabilityFieldGroup_Label { get { return T("PageType.EditPageTypeWorkflow.AvailabilityFieldGroup.Label"); } } 
 /// <summary>&quot;Homepage relation&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_Label { get { return T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.Label"); } } 
 /// <summary>&quot;Homepage relation&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_Help { get { return T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.Help"); } } 
 /// <summary>&quot;No restrictions&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_NoRestrictionLabel { get { return T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.NoRestrictionLabel"); } } 
 /// <summary>&quot;Only sub pages&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_OnlySubPagesLabel { get { return T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.OnlySubPagesLabel"); } } 
 /// <summary>&quot;Only home pages&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_OnlyHomePagesLabel { get { return T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.OnlyHomePagesLabel"); } } 
 /// <summary>&quot;Page type parent restriction&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_PageTypeChildRestrictionMultiKeySelector_Label { get { return T("PageType.EditPageTypeWorkflow.PageTypeChildRestrictionMultiKeySelector.Label"); } } 
 /// <summary>&quot;Only allow this page type as for child pages with the selected page types&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_PageTypeChildRestrictionMultiKeySelector_Help { get { return T("PageType.EditPageTypeWorkflow.PageTypeChildRestrictionMultiKeySelector.Help"); } } 
 /// <summary>&quot;DataFolders / Applications&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_DataFolderApplicationPlaceHolder_Label { get { return T("PageType.EditPageTypeWorkflow.DataFolderApplicationPlaceHolder.Label"); } } 
 /// <summary>&quot;Data folders&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_DataFolderFieldGroup_Label { get { return T("PageType.EditPageTypeWorkflow.DataFolderFieldGroup.Label"); } } 
 /// <summary>&quot;Data folders&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_DataFolderMultiKeySelector_Label { get { return T("PageType.EditPageTypeWorkflow.DataFolderMultiKeySelector.Label"); } } 
 /// <summary>&quot;Select the data folders that should automatically be added to pages using this page type&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_DataFolderMultiKeySelector_Help { get { return T("PageType.EditPageTypeWorkflow.DataFolderMultiKeySelector.Help"); } } 
 /// <summary>&quot;Applications&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_ApplicationFieldGroup_Label { get { return T("PageType.EditPageTypeWorkflow.ApplicationFieldGroup.Label"); } } 
 /// <summary>&quot;Applications&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_ApplicationMultiKeySelector_Label { get { return T("PageType.EditPageTypeWorkflow.ApplicationMultiKeySelector.Label"); } } 
 /// <summary>&quot;Select the applications that should automatically be added to pages using this page type&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_ApplicationMultiKeySelector_Help { get { return T("PageType.EditPageTypeWorkflow.ApplicationMultiKeySelector.Help"); } } 
 /// <summary>&quot;The default layout is not one of the selected restricted layouts&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_ValidationError_DefaultTemplateNotInRestrictions { get { return T("PageType.EditPageTypeWorkflow.ValidationError.DefaultTemplateNotInRestrictions"); } } 
 /// <summary>&quot;Page type parent restrictions are not allowed with home pages only&quot;</summary> 
 public static string PageType_EditPageTypeWorkflow_ValidationError_HomepageRelationConflictsWithParentRestrictions { get { return T("PageType.EditPageTypeWorkflow.ValidationError.HomepageRelationConflictsWithParentRestrictions"); } } 
 /// <summary>&quot;Delete This Page Type?&quot;</summary> 
 public static string PageType_DeletePageTypeWorkflow_Confirm_Layout_Label { get { return T("PageType.DeletePageTypeWorkflow.Confirm.Layout.Label"); } } 
 /// <summary>&quot;Delete the page type {0}?&quot;</summary> 
 public static string PageType_DeletePageTypeWorkflow_Confirm_Layout_Messeage(object parameter0) { return string.Format(T("PageType.DeletePageTypeWorkflow.Confirm.Layout.Messeage"), parameter0); } 
 /// <summary>&quot;Page Type in Use&quot;</summary> 
 public static string PageType_DeletePageTypeWorkflow_PagesRefering_Layout_Label { get { return T("PageType.DeletePageTypeWorkflow.PagesRefering.Layout.Label"); } } 
 /// <summary>&quot;The page type {0} is in use and it is not possible to delete it&quot;</summary> 
 public static string PageType_DeletePageTypeWorkflow_PagesRefering_Layout_Message(object parameter0) { return string.Format(T("PageType.DeletePageTypeWorkflow.PagesRefering.Layout.Message"), parameter0); } 
 /// <summary>&quot;Add Default Content&quot;</summary> 
 public static string PageType_AddPageTypeDefaultPageContentWorkflow_Layout_Label { get { return T("PageType.AddPageTypeDefaultPageContentWorkflow.Layout.Label"); } } 
 /// <summary>&quot;Placeholder ID&quot;</summary> 
 public static string PageType_AddPageTypeDefaultPageContentWorkflow_PlaceHolderIdTextBox_Label { get { return T("PageType.AddPageTypeDefaultPageContentWorkflow.PlaceHolderIdTextBox.Label"); } } 
 /// <summary>&quot;The ID of the placeholder. You can write a non-existing ID and create the placeholder afterwards (by editing Page Template markup).&quot;</summary> 
 public static string PageType_AddPageTypeDefaultPageContentWorkflow_PlaceHolderIdTextBox_Help { get { return T("PageType.AddPageTypeDefaultPageContentWorkflow.PlaceHolderIdTextBox.Help"); } } 
 /// <summary>&quot;No templates with {0}&quot;</summary> 
 public static string PageType_AddPageTypeDefaultPageContentWorkflow_NonExistingPlaceholderId_Title(object parameter0) { return string.Format(T("PageType.AddPageTypeDefaultPageContentWorkflow.NonExistingPlaceholderId.Title"), parameter0); } 
 /// <summary>&quot;Please note that the Placeholder ID you specified &apos;{0}&apos;, is currently not in any Layout Template.&quot;</summary> 
 public static string PageType_AddPageTypeDefaultPageContentWorkflow_NonExistingPlaceholderId_Message(object parameter0) { return string.Format(T("PageType.AddPageTypeDefaultPageContentWorkflow.NonExistingPlaceholderId.Message"), parameter0); } 
 /// <summary>&quot;Edit default content&quot;</summary> 
 public static string PageType_EditPageTypeDefaultPageContentWorkflow_Layout_Label { get { return T("PageType.EditPageTypeDefaultPageContentWorkflow.Layout.Label"); } } 
 /// <summary>&quot;Settings&quot;</summary> 
 public static string PageType_EditPageTypeDefaultPageContentWorkflow_SettingsPlaceHolder_Label { get { return T("PageType.EditPageTypeDefaultPageContentWorkflow.SettingsPlaceHolder.Label"); } } 
 /// <summary>&quot;Placeholder Info&quot;</summary> 
 public static string PageType_EditPageTypeDefaultPageContentWorkflow_SettingsFieldGroup_Label { get { return T("PageType.EditPageTypeDefaultPageContentWorkflow.SettingsFieldGroup.Label"); } } 
 /// <summary>&quot;Placeholder ID&quot;</summary> 
 public static string PageType_EditPageTypeDefaultPageContentWorkflow_PlaceHolderIdTextBox_Label { get { return T("PageType.EditPageTypeDefaultPageContentWorkflow.PlaceHolderIdTextBox.Label"); } } 
 /// <summary>&quot;The ID of the placeholder. You can write a non-existing ID and create the placeholder afterwards (edit Page Template markup).&quot;</summary> 
 public static string PageType_EditPageTypeDefaultPageContentWorkflow_PlaceHolderIdTextBox_Help { get { return T("PageType.EditPageTypeDefaultPageContentWorkflow.PlaceHolderIdTextBox.Help"); } } 
 /// <summary>&quot;Content&quot;</summary> 
 public static string PageType_EditPageTypeDefaultPageContentWorkflow_ContentXhtmlEditor_Label { get { return T("PageType.EditPageTypeDefaultPageContentWorkflow.ContentXhtmlEditor.Label"); } } 
 /// <summary>&quot;Add Metadata Field&quot;</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_Layout_Label { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.Layout.Label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_FieldGroup_Label { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.FieldGroup.Label"); } } 
 /// <summary>&quot;Programmatic name&quot;</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_NameTextBox_Label { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.NameTextBox.Label"); } } 
 /// <summary>&quot;The unique name of the Metadata field. This can not be changed later!&quot;</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_NameTextBox_Help { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.NameTextBox.Help"); } } 
 /// <summary>&quot;Show with label&quot;</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_LabelTextBox_Label { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.LabelTextBox.Label"); } } 
 /// <summary>&quot;The label of the Metadata field. Used for UI.&quot;</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_LabelTextBox_Help { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.LabelTextBox.Help"); } } 
 /// <summary>&quot;Metadata type&quot;</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_MetaDataTypeKeySelector_Label { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.MetaDataTypeKeySelector.Label"); } } 
 /// <summary>&quot;The Metadata type&quot;</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_MetaDataTypeKeySelector_Help { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.MetaDataTypeKeySelector.Help"); } } 
 /// <summary>&quot;Display on tab&quot;</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_MetaDataContainerKeySelector_Label { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.MetaDataContainerKeySelector.Label"); } } 
 /// <summary>&quot;Select the tab to display the Metadata when editing a page.&quot;</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_MetaDataContainerKeySelector_Help { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.MetaDataContainerKeySelector.Help"); } } 
 /// <summary>&quot;Add Metadata default values&quot;</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_AddingDefaultMetaData_Title { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.AddingDefaultMetaData.Title"); } } 
 /// <summary>&quot;The field name with another type is already used.&quot;</summary> 
 public static string PageType_AddPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataFieldNameAlreadyUsed { get { return T("PageType.AddPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataFieldNameAlreadyUsed"); } } 
 /// <summary>&quot;Delete This Metadata Field?&quot;</summary> 
 public static string PageType_DeletePageTypeMetaDataFieldWorkflow_Confirm_Layout_Label { get { return T("PageType.DeletePageTypeMetaDataFieldWorkflow.Confirm.Layout.Label"); } } 
 /// <summary>&quot;Delete the Metadata field {0}? Warning: all its existing Metadata items will also be deleted&quot;</summary> 
 public static string PageType_DeletePageTypeMetaDataFieldWorkflow_Confirm_Layout_Message(object parameter0) { return string.Format(T("PageType.DeletePageTypeMetaDataFieldWorkflow.Confirm.Layout.Message"), parameter0); } 
 /// <summary>&quot;Edit Metadata Field&quot;</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_Layout_Label { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.Layout.Label"); } } 
 /// <summary>&quot;Metadata field settings&quot;</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_FieldGroup_Label { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.FieldGroup.Label"); } } 
 /// <summary>&quot;Label&quot;</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_LabelTextBox_Label { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.LabelTextBox.Label"); } } 
 /// <summary>&quot;The label of the Metadata field. Used for UI&quot;</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_LabelTextBox_Help { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.LabelTextBox.Help"); } } 
 /// <summary>&quot;Tab&quot;</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_MetaDataContainerKeySelector_Label { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.MetaDataContainerKeySelector.Label"); } } 
 /// <summary>&quot;Select the tab to put the Metadata when editing a page&quot;</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_MetaDataContainerKeySelector_Help { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.MetaDataContainerKeySelector.Help"); } } 
 /// <summary>&quot;Metatype&quot;</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_MetaTypeName_Label { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.MetaTypeName.Label"); } } 
 /// <summary>&quot;The name of the metatype.&quot;</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_MetaTypeName_Help { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.MetaTypeName.Help"); } } 
 /// <summary>&quot;The Metadata type is used another place with same name but different label&quot;</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataFieldNameAlreadyUsed { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataFieldNameAlreadyUsed"); } } 
 /// <summary>&quot;There exists one or more definitions with the same name, container change is not allowed&quot;</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataContainerChangeNotAllowed { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataContainerChangeNotAllowed"); } } 
 /// <summary>&quot;Metadata type has been deleted&quot;</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataTypeNotExisting_Title { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataTypeNotExisting.Title"); } } 
 /// <summary>&quot;The Metadata type has been deleted from the system and can no longer be added to any page types&quot;</summary> 
 public static string PageType_EditPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataTypeNotExisting_Message { get { return T("PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataTypeNotExisting.Message"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_RazorFunction {
 /// <summary>&quot;Razor Functions&quot;</summary> 
 public static string RootElement_Label { get { return T("RootElement.Label"); } } 
 /// <summary>&quot;Razor functions&quot;</summary> 
 public static string RootElement_ToolTip { get { return T("RootElement.ToolTip"); } } 
 /// <summary>&quot;Add Razor Function&quot;</summary> 
 public static string AddNewRazorFunction_Label { get { return T("AddNewRazorFunction.Label"); } } 
 /// <summary>&quot;Add a new Razor function&quot;</summary> 
 public static string AddNewRazorFunction_ToolTip { get { return T("AddNewRazorFunction.ToolTip"); } } 
 /// <summary>&quot;Edit&quot;</summary> 
 public static string EditRazorFunction_Label { get { return T("EditRazorFunction.Label"); } } 
 /// <summary>&quot;Edit Razor Function&quot;</summary> 
 public static string EditRazorFunction_ToolTip { get { return T("EditRazorFunction.ToolTip"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string DeleteRazorFunction_Label { get { return T("DeleteRazorFunction.Label"); } } 
 /// <summary>&quot;Delete this Razor function&quot;</summary> 
 public static string DeleteRazorFunction_ToolTip { get { return T("DeleteRazorFunction.ToolTip"); } } 
 /// <summary>&quot;Add Razor Function&quot;</summary> 
 public static string AddNewRazorFunction_LabelDialog { get { return T("AddNewRazorFunction.LabelDialog"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string AddNewRazorFunction_LabelName { get { return T("AddNewRazorFunction.LabelName"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewRazorFunction_HelpName { get { return T("AddNewRazorFunction.HelpName"); } } 
 /// <summary>&quot;Namespace&quot;</summary> 
 public static string AddNewRazorFunction_LabelNamespace { get { return T("AddNewRazorFunction.LabelNamespace"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewRazorFunction_HelpNamespace { get { return T("AddNewRazorFunction.HelpNamespace"); } } 
 /// <summary>&quot;Copy from&quot;</summary> 
 public static string AddNewRazorFunction_LabelCopyFrom { get { return T("AddNewRazorFunction.LabelCopyFrom"); } } 
 /// <summary>&quot;You can copy the code from another Razor function by selecting it in this list.&quot;</summary> 
 public static string AddNewRazorFunction_LabelCopyFromHelp { get { return T("AddNewRazorFunction.LabelCopyFromHelp"); } } 
 /// <summary>&quot;(New Razor function)&quot;</summary> 
 public static string AddNewRazorFunction_LabelCopyFromEmptyOption { get { return T("AddNewRazorFunction.LabelCopyFromEmptyOption"); } } 
 /// <summary>&quot;A C1 function with the same name already exists.&quot;</summary> 
 public static string AddNewRazorFunctionWorkflow_DuplicateName { get { return T("AddNewRazorFunctionWorkflow.DuplicateName"); } } 
 /// <summary>&quot;The function name is empty&quot;</summary> 
 public static string AddNewRazorFunctionWorkflow_EmptyName { get { return T("AddNewRazorFunctionWorkflow.EmptyName"); } } 
 /// <summary>&quot;The function namespace is empty&quot;</summary> 
 public static string AddNewRazorFunctionWorkflow_NamespaceEmpty { get { return T("AddNewRazorFunctionWorkflow.NamespaceEmpty"); } } 
 /// <summary>&quot;The namespace must be like A.B.C - not starting or ending with a period (.)&quot;</summary> 
 public static string AddNewRazorFunctionWorkflow_InvalidNamespace { get { return T("AddNewRazorFunctionWorkflow.InvalidNamespace"); } } 
 /// <summary>&quot;The total length of the name and the namespace is too long (used to name the .cshtml file).&quot;</summary> 
 public static string AddNewRazorFunctionWorkflow_TotalNameTooLang { get { return T("AddNewRazorFunctionWorkflow.TotalNameTooLang"); } } 
 /// <summary>&quot;Validation Error&quot;</summary> 
 public static string EditRazorFunctionWorkflow_Validation_DialogTitle { get { return T("EditRazorFunctionWorkflow.Validation.DialogTitle"); } } 
 /// <summary>&quot;Compilation failed: {0}&quot;</summary> 
 public static string EditRazorFunctionWorkflow_Validation_CompilationFailed(object parameter0) { return string.Format(T("EditRazorFunctionWorkflow.Validation.CompilationFailed"), parameter0); } 
 /// <summary>&quot;Razor function should inherit &apos;{0}&apos;&quot;</summary> 
 public static string EditRazorFunctionWorkflow_Validation_IncorrectBaseClass(object parameter0) { return string.Format(T("EditRazorFunctionWorkflow.Validation.IncorrectBaseClass"), parameter0); } 
 /// <summary>&quot;Delete Razor Function?&quot;</summary> 
 public static string DeleteRazorFunctionWorkflow_ConfirmDeleteTitle { get { return T("DeleteRazorFunctionWorkflow.ConfirmDeleteTitle"); } } 
 /// <summary>&quot;Delete the selected Razor function?&quot;</summary> 
 public static string DeleteRazorFunctionWorkflow_ConfirmDeleteMessage { get { return T("DeleteRazorFunctionWorkflow.ConfirmDeleteMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.RazorFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_RazorPageTemplate {
 /// <summary>&quot;Edit Razor File&quot;</summary> 
 public static string EditRazorFileAction_Label { get { return T("EditRazorFileAction.Label"); } } 
 /// <summary>&quot;Edit the cshtml file&quot;</summary> 
 public static string EditRazorFileAction_ToolTip { get { return T("EditRazorFileAction.ToolTip"); } } 
 /// <summary>&quot;Edit Razor Template&quot;</summary> 
 public static string EditRazorTemplateAction_Label { get { return T("EditRazorTemplateAction.Label"); } } 
 /// <summary>&quot;Edit the cshtml file behind the template&quot;</summary> 
 public static string EditRazorTemplateAction_ToolTip { get { return T("EditRazorTemplateAction.ToolTip"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string DeleteRazorPageTemplateAction_Label { get { return T("DeleteRazorPageTemplateAction.Label"); } } 
 /// <summary>&quot;Delete page template&quot;</summary> 
 public static string DeleteRazorPageTemplateAction_ToolTip { get { return T("DeleteRazorPageTemplateAction.ToolTip"); } } 
 /// <summary>&quot;Add New Razor Template&quot;</summary> 
 public static string AddNewRazorPageTemplate_LabelDialog { get { return T("AddNewRazorPageTemplate.LabelDialog"); } } 
 /// <summary>&quot;Template Title&quot;</summary> 
 public static string AddNewRazorPageTemplate_LabelTemplateTitle { get { return T("AddNewRazorPageTemplate.LabelTemplateTitle"); } } 
 /// <summary>&quot;The title identifies this template in lists. Consider selecting a short but meaningful name.&quot;</summary> 
 public static string AddNewRazorPageTemplate_LabelTemplateTitleHelp { get { return T("AddNewRazorPageTemplate.LabelTemplateTitleHelp"); } } 
 /// <summary>&quot;Copy from&quot;</summary> 
 public static string AddNewRazorPageTemplate_LabelCopyFrom { get { return T("AddNewRazorPageTemplate.LabelCopyFrom"); } } 
 /// <summary>&quot;You can copy the markup from another Layout Template by selecting it in this list.&quot;</summary> 
 public static string AddNewRazorPageTemplate_LabelCopyFromHelp { get { return T("AddNewRazorPageTemplate.LabelCopyFromHelp"); } } 
 /// <summary>&quot;(New template)&quot;</summary> 
 public static string AddNewRazorPageTemplate_LabelCopyFromEmptyOption { get { return T("AddNewRazorPageTemplate.LabelCopyFromEmptyOption"); } } 
 /// <summary>&quot;Title already used&quot;</summary> 
 public static string AddNewRazorPageTemplateWorkflow_TitleInUseTitle { get { return T("AddNewRazorPageTemplateWorkflow.TitleInUseTitle"); } } 
 /// <summary>&quot;The title is too long (used as part of the .cshtml filename).&quot;</summary> 
 public static string AddNewRazorPageTemplateWorkflow_TitleTooLong { get { return T("AddNewRazorPageTemplateWorkflow.TitleTooLong"); } } 
 /// <summary>&quot;Validation error&quot;</summary> 
 public static string EditTemplate_Validation_DialogTitle { get { return T("EditTemplate.Validation.DialogTitle"); } } 
 /// <summary>&quot;Compilation failed: {0}&quot;</summary> 
 public static string EditTemplate_Validation_CompilationFailed(object parameter0) { return string.Format(T("EditTemplate.Validation.CompilationFailed"), parameter0); } 
 /// <summary>&quot;Page template class does not inherit &apos;{0}&apos;&quot;</summary> 
 public static string EditTemplate_Validation_IncorrectBaseClass(object parameter0) { return string.Format(T("EditTemplate.Validation.IncorrectBaseClass"), parameter0); } 
 /// <summary>&quot;Failed to evaluate page template property &apos;{0}&apos;. Excepton: {1}&quot;</summary> 
 public static string EditTemplate_Validation_PropertyError(object parameter0,object parameter1) { return string.Format(T("EditTemplate.Validation.PropertyError"), parameter0,parameter1); } 
 /// <summary>&quot;It is not allowed to change template id through current workflow. Original template id is &apos;{0}&apos;&quot;</summary> 
 public static string EditTemplate_Validation_TemplateIdChanged(object parameter0) { return string.Format(T("EditTemplate.Validation.TemplateIdChanged"), parameter0); } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.RazorPageTemplate", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_SqlFunction {
 /// <summary>&quot;SQL Functions&quot;</summary> 
 public static string SqlFunctionElementProvider_RootLabel { get { return T("SqlFunctionElementProvider.RootLabel"); } } 
 /// <summary>&quot;Add Connections and then queries to connections&quot;</summary> 
 public static string SqlFunctionElementProvider_RootLabelToolTip { get { return T("SqlFunctionElementProvider.RootLabelToolTip"); } } 
 /// <summary>&quot;Add SQL Connection&quot;</summary> 
 public static string SqlFunctionElementProvider_AddConnection { get { return T("SqlFunctionElementProvider.AddConnection"); } } 
 /// <summary>&quot;Add new SQL connection&quot;</summary> 
 public static string SqlFunctionElementProvider_AddConnectionToolTip { get { return T("SqlFunctionElementProvider.AddConnectionToolTip"); } } 
 /// <summary>&quot;Edit&quot;</summary> 
 public static string SqlFunctionElementProvider_EditConnection { get { return T("SqlFunctionElementProvider.EditConnection"); } } 
 /// <summary>&quot;Edit SQL connection&quot;</summary> 
 public static string SqlFunctionElementProvider_EditConnectionToolTip { get { return T("SqlFunctionElementProvider.EditConnectionToolTip"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string SqlFunctionElementProvider_DeleteConnection { get { return T("SqlFunctionElementProvider.DeleteConnection"); } } 
 /// <summary>&quot;Delete SQL connection&quot;</summary> 
 public static string SqlFunctionElementProvider_DeleteConnectionToolTip { get { return T("SqlFunctionElementProvider.DeleteConnectionToolTip"); } } 
 /// <summary>&quot;Add New SQL Query&quot;</summary> 
 public static string SqlFunctionElementProvider_AddQuery { get { return T("SqlFunctionElementProvider.AddQuery"); } } 
 /// <summary>&quot;Add a new SQL XML Provider&quot;</summary> 
 public static string SqlFunctionElementProvider_AddQueryToolTip { get { return T("SqlFunctionElementProvider.AddQueryToolTip"); } } 
 /// <summary>&quot;Edit&quot;</summary> 
 public static string SqlFunctionElementProvider_EditQuery { get { return T("SqlFunctionElementProvider.EditQuery"); } } 
 /// <summary>&quot;Edit SQL Query&quot;</summary> 
 public static string SqlFunctionElementProvider_EditQueryToolTip { get { return T("SqlFunctionElementProvider.EditQueryToolTip"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string SqlFunctionElementProvider_DeleteQuery { get { return T("SqlFunctionElementProvider.DeleteQuery"); } } 
 /// <summary>&quot;Delete SQL Query&quot;</summary> 
 public static string SqlFunctionElementProvider_DeleteQueryToolTip { get { return T("SqlFunctionElementProvider.DeleteQueryToolTip"); } } 
 /// <summary>&quot;Add New SQL Query&quot;</summary> 
 public static string AddNewSqlFunction_LabelDialog { get { return T("AddNewSqlFunction.LabelDialog"); } } 
 /// <summary>&quot;Function naming&quot;</summary> 
 public static string AddNewSqlFunction_LabelNamingPanel { get { return T("AddNewSqlFunction.LabelNamingPanel"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string AddNewSqlFunction_LabelName { get { return T("AddNewSqlFunction.LabelName"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewSqlFunction_HelpName { get { return T("AddNewSqlFunction.HelpName"); } } 
 /// <summary>&quot;Namespace&quot;</summary> 
 public static string AddNewSqlFunction_LabelNamespace { get { return T("AddNewSqlFunction.LabelNamespace"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewSqlFunction_HelpNamespace { get { return T("AddNewSqlFunction.HelpNamespace"); } } 
 /// <summary>&quot;SQL command text&quot;</summary> 
 public static string AddNewSqlFunction_LabelQueryCOmmand { get { return T("AddNewSqlFunction.LabelQueryCOmmand"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewSqlFunction_HelpQueryCOmmand { get { return T("AddNewSqlFunction.HelpQueryCOmmand"); } } 
 /// <summary>&quot;Is a Stored Procedure&quot;</summary> 
 public static string AddEditSqlFunction_LabelIsStoredProcedure { get { return T("AddEditSqlFunction.LabelIsStoredProcedure"); } } 
 /// <summary>&quot;Yes, the command is a procedure&quot;</summary> 
 public static string AddEditSqlFunction_LabelIsStoredProcedureCheckBox { get { return T("AddEditSqlFunction.LabelIsStoredProcedureCheckBox"); } } 
 /// <summary>&quot;Returns result as XML&quot;</summary> 
 public static string AddEditSqlFunction_LabelReturnsXml { get { return T("AddEditSqlFunction.LabelReturnsXml"); } } 
 /// <summary>&quot;Yes, the command returns XML&quot;</summary> 
 public static string AddEditSqlFunction_LabelReturnsXmlCheckBox { get { return T("AddEditSqlFunction.LabelReturnsXmlCheckBox"); } } 
 /// <summary>&quot;Is a query&quot;</summary> 
 public static string AddEditSqlFunction_LabelIsQuery { get { return T("AddEditSqlFunction.LabelIsQuery"); } } 
 /// <summary>&quot;Yes, the command returns data&quot;</summary> 
 public static string AddEditSqlFunction_LabelIsQueryCheckBox { get { return T("AddEditSqlFunction.LabelIsQueryCheckBox"); } } 
 /// <summary>&quot;SQL Command behaviour&quot;</summary> 
 public static string AddEditSqlFunction_LabelCommandBehaviour { get { return T("AddEditSqlFunction.LabelCommandBehaviour"); } } 
 /// <summary>&quot;SQL Command&quot;</summary> 
 public static string AddEditSqlFunction_LabelSqlEditor { get { return T("AddEditSqlFunction.LabelSqlEditor"); } } 
 /// <summary>&quot;Add New SQL Connection&quot;</summary> 
 public static string AddNewSqlFunctionConnection_LabelDialog { get { return T("AddNewSqlFunctionConnection.LabelDialog"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string AddNewSqlFunctionConnection_LabelName { get { return T("AddNewSqlFunctionConnection.LabelName"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewSqlFunctionConnection_HelpName { get { return T("AddNewSqlFunctionConnection.HelpName"); } } 
 /// <summary>&quot;Connection String&quot;</summary> 
 public static string AddNewSqlFunctionConnection_LabelConnectionString { get { return T("AddNewSqlFunctionConnection.LabelConnectionString"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewSqlFunctionConnection_HelpConnectionString { get { return T("AddNewSqlFunctionConnection.HelpConnectionString"); } } 
 /// <summary>&quot;MS SQL Server&quot;</summary> 
 public static string AddNewSqlFunctionConnection_LabelIsMSSQL { get { return T("AddNewSqlFunctionConnection.LabelIsMSSQL"); } } 
 /// <summary>&quot;Database is a MS SQL Server&quot;</summary> 
 public static string AddNewSqlFunctionConnection_LabelIsMSSQLCheckBox { get { return T("AddNewSqlFunctionConnection.LabelIsMSSQLCheckBox"); } } 
 /// <summary>&quot;Input Parameters&quot;</summary> 
 public static string EditSqlFunction_LabelInputParameters { get { return T("EditSqlFunction.LabelInputParameters"); } } 
 /// <summary>&quot;Settings&quot;</summary> 
 public static string EditSqlFunction_LabelSettings { get { return T("EditSqlFunction.LabelSettings"); } } 
 /// <summary>&quot;Function name and description&quot;</summary> 
 public static string EditSqlFunction_LabelNamingAndDescription { get { return T("EditSqlFunction.LabelNamingAndDescription"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string EditSqlFunction_LabelName { get { return T("EditSqlFunction.LabelName"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string EditSqlFunction_HelpName { get { return T("EditSqlFunction.HelpName"); } } 
 /// <summary>&quot;Namespace&quot;</summary> 
 public static string EditSqlFunction_LabelNamespace { get { return T("EditSqlFunction.LabelNamespace"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string EditSqlFunction_HelpNamespace { get { return T("EditSqlFunction.HelpNamespace"); } } 
 /// <summary>&quot;Description&quot;</summary> 
 public static string EditSqlFunction_LabelDescription { get { return T("EditSqlFunction.LabelDescription"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string EditSqlFunction_HelpDescription { get { return T("EditSqlFunction.HelpDescription"); } } 
 /// <summary>&quot;Preview&quot;</summary> 
 public static string EditSqlFunction_LabelPreview { get { return T("EditSqlFunction.LabelPreview"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string EditSqlFunctionConnection_LabelName { get { return T("EditSqlFunctionConnection.LabelName"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string EditSqlFunctionConnection_HelpName { get { return T("EditSqlFunctionConnection.HelpName"); } } 
 /// <summary>&quot;Connection String&quot;</summary> 
 public static string EditSqlFunctionConnection_LabelConnectionString { get { return T("EditSqlFunctionConnection.LabelConnectionString"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string EditSqlFunctionConnection_HelpConnectionString { get { return T("EditSqlFunctionConnection.HelpConnectionString"); } } 
 /// <summary>&quot;MS SQL Server&quot;</summary> 
 public static string EditSqlFunctionConnection_LabelIsMSSQL { get { return T("EditSqlFunctionConnection.LabelIsMSSQL"); } } 
 /// <summary>&quot;Database is a MS SQL Server&quot;</summary> 
 public static string EditSqlFunctionConnection_LabelIsMSSQLCheckBox { get { return T("EditSqlFunctionConnection.LabelIsMSSQLCheckBox"); } } 
 /// <summary>&quot;Delete This SQL Connection?&quot;</summary> 
 public static string DeleteSqlConnection_LabelFieldGroup { get { return T("DeleteSqlConnection.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete this SQL connection?&quot;</summary> 
 public static string DeleteSqlConnection_Text { get { return T("DeleteSqlConnection.Text"); } } 
 /// <summary>&quot;Delete This SQL Function?&quot;</summary> 
 public static string DeleteSqlFunction_LabelFieldGroup { get { return T("DeleteSqlFunction.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete this SQL function?&quot;</summary> 
 public static string DeleteSqlFunction_Text { get { return T("DeleteSqlFunction.Text"); } } 
 /// <summary>&quot;Cascade Delete Error&quot;</summary> 
 public static string CascadeDeleteErrorTitle { get { return T("CascadeDeleteErrorTitle"); } } 
 /// <summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
 public static string CascadeDeleteErrorMessage { get { return T("CascadeDeleteErrorMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_StandardFunctions {
 /// <summary>&quot;Loads an ASP.NET User Control&quot;</summary> 
 public static string Composite_AspNet_LoadUserControl_description { get { return T("Composite.AspNet.LoadUserControl.description"); } } 
 /// <summary>&quot;The path to the User Controls .ascx file, like “~/Controls/MyControl.ascx”&quot;</summary> 
 public static string Composite_AspNet_LoadUserControl_param_Path_help { get { return T("Composite.AspNet.LoadUserControl.param.Path.help"); } } 
 /// <summary>&quot;Path&quot;</summary> 
 public static string Composite_AspNet_LoadUserControl_param_Path_label { get { return T("Composite.AspNet.LoadUserControl.param.Path.label"); } } 
 /// <summary>&quot;Lets you specify constant boolean value&quot;</summary> 
 public static string Composite_Constant_Boolean_description { get { return T("Composite.Constant.Boolean.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Constant_Boolean_param_Constant_help { get { return T("Composite.Constant.Boolean.param.Constant.help"); } } 
 /// <summary>&quot;Value&quot;</summary> 
 public static string Composite_Constant_Boolean_param_Constant_label { get { return T("Composite.Constant.Boolean.param.Constant.label"); } } 
 /// <summary>&quot;Lets you specify constant date and time value&quot;</summary> 
 public static string Composite_Constant_DateTime_description { get { return T("Composite.Constant.DateTime.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Constant_DateTime_param_Constant_help { get { return T("Composite.Constant.DateTime.param.Constant.help"); } } 
 /// <summary>&quot;Value&quot;</summary> 
 public static string Composite_Constant_DateTime_param_Constant_label { get { return T("Composite.Constant.DateTime.param.Constant.label"); } } 
 /// <summary>&quot;Lets you specify constant decimal value&quot;</summary> 
 public static string Composite_Constant_Decimal_description { get { return T("Composite.Constant.Decimal.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Constant_Decimal_param_Constant_help { get { return T("Composite.Constant.Decimal.param.Constant.help"); } } 
 /// <summary>&quot;Value&quot;</summary> 
 public static string Composite_Constant_Decimal_param_Constant_label { get { return T("Composite.Constant.Decimal.param.Constant.label"); } } 
 /// <summary>&quot;Lets you specify constant Guid value&quot;</summary> 
 public static string Composite_Constant_Guid_description { get { return T("Composite.Constant.Guid.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Constant_Guid_param_Constant_help { get { return T("Composite.Constant.Guid.param.Constant.help"); } } 
 /// <summary>&quot;Value&quot;</summary> 
 public static string Composite_Constant_Guid_param_Constant_label { get { return T("Composite.Constant.Guid.param.Constant.label"); } } 
 /// <summary>&quot;Lets you specify constant integer value&quot;</summary> 
 public static string Composite_Constant_Integer_description { get { return T("Composite.Constant.Integer.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Constant_Integer_param_Constant_help { get { return T("Composite.Constant.Integer.param.Constant.help"); } } 
 /// <summary>&quot;Value&quot;</summary> 
 public static string Composite_Constant_Integer_param_Constant_label { get { return T("Composite.Constant.Integer.param.Constant.label"); } } 
 /// <summary>&quot;Lets you specify constant string value&quot;</summary> 
 public static string Composite_Constant_String_description { get { return T("Composite.Constant.String.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Constant_String_param_Constant_help { get { return T("Composite.Constant.String.param.Constant.help"); } } 
 /// <summary>&quot;Value&quot;</summary> 
 public static string Composite_Constant_String_param_Constant_label { get { return T("Composite.Constant.String.param.Constant.label"); } } 
 /// <summary>&quot;Lets you visually specify a Xhtml document constant&quot;</summary> 
 public static string Composite_Constant_XhtmlDocument_description { get { return T("Composite.Constant.XhtmlDocument.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Constant_XhtmlDocument_param_Constant_help { get { return T("Composite.Constant.XhtmlDocument.param.Constant.help"); } } 
 /// <summary>&quot;Value&quot;</summary> 
 public static string Composite_Constant_XhtmlDocument_param_Constant_label { get { return T("Composite.Constant.XhtmlDocument.param.Constant.label"); } } 
 /// <summary>&quot;Adds a new instance of the given type.&quot;</summary> 
 public static string Composite_IDataGenerated_AddDataInstance_description { get { return T("Composite.IDataGenerated.AddDataInstance.description"); } } 
 /// <summary>&quot;Updates instance(s) with the given values.&quot;</summary> 
 public static string Composite_IDataGenerated_UpdateDataInstance_description { get { return T("Composite.IDataGenerated.UpdateDataInstance.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_IDataGenerated_UpdateDataInstance_param_Filter_help { get { return T("Composite.IDataGenerated.UpdateDataInstance.param.Filter.help"); } } 
 /// <summary>&quot;Filter&quot;</summary> 
 public static string Composite_IDataGenerated_UpdateDataInstance_param_Filter_label { get { return T("Composite.IDataGenerated.UpdateDataInstance.param.Filter.label"); } } 
 /// <summary>&quot;Deletes instance(s) with the given filter.&quot;</summary> 
 public static string Composite_IDataGenerated_DeleteDataInstance_description { get { return T("Composite.IDataGenerated.DeleteDataInstance.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_IDataGenerated_DeleteDataInstance_param_Filter_help { get { return T("Composite.IDataGenerated.DeleteDataInstance.param.Filter.help"); } } 
 /// <summary>&quot;Filter&quot;</summary> 
 public static string Composite_IDataGenerated_DeleteDataInstance_param_Filter_label { get { return T("Composite.IDataGenerated.DeleteDataInstance.param.Filter.label"); } } 
 /// <summary>&quot;Creates a DataReference based on a key value.&quot;</summary> 
 public static string Composite_IDataGenerated_GetDataReference_description { get { return T("Composite.IDataGenerated.GetDataReference.description"); } } 
 /// <summary>&quot;The key value of the data to reference.&quot;</summary> 
 public static string Composite_IDataGenerated_GetDataReference_param_KeyValue_help { get { return T("Composite.IDataGenerated.GetDataReference.param.KeyValue.help"); } } 
 /// <summary>&quot;Key value&quot;</summary> 
 public static string Composite_IDataGenerated_GetDataReference_param_KeyValue_label { get { return T("Composite.IDataGenerated.GetDataReference.param.KeyValue.label"); } } 
 /// <summary>&quot;Creates a NullableDataReference based on a key value. The default value is &apos;null&apos;, no reference.&quot;</summary> 
 public static string Composite_IDataGenerated_GetNullableDataReference_description { get { return T("Composite.IDataGenerated.GetNullableDataReference.description"); } } 
 /// <summary>&quot;The key value of the data to reference.&quot;</summary> 
 public static string Composite_IDataGenerated_GetNullableDataReference_param_KeyValue_help { get { return T("Composite.IDataGenerated.GetNullableDataReference.param.KeyValue.help"); } } 
 /// <summary>&quot;Key value&quot;</summary> 
 public static string Composite_IDataGenerated_GetNullableDataReference_param_KeyValue_label { get { return T("Composite.IDataGenerated.GetNullableDataReference.param.KeyValue.label"); } } 
 /// <summary>&quot;Converts a DataReference into a single element filter. This filter will select a maximum of one item.&quot;</summary> 
 public static string Composite_IDataGenerated_Filter_DataReferenceFilter_description { get { return T("Composite.IDataGenerated.Filter.DataReferenceFilter.description"); } } 
 /// <summary>&quot;The Data Reference to use when selecting data.&quot;</summary> 
 public static string Composite_IDataGenerated_Filter_DataReferenceFilter_param_DataReference_help { get { return T("Composite.IDataGenerated.Filter.DataReferenceFilter.param.DataReference.help"); } } 
 /// <summary>&quot;Data Reference&quot;</summary> 
 public static string Composite_IDataGenerated_Filter_DataReferenceFilter_param_DataReference_label { get { return T("Composite.IDataGenerated.Filter.DataReferenceFilter.param.DataReference.label"); } } 
 /// <summary>&quot;Lets you select data based on its reference to the currently rendered page.&quot;</summary> 
 public static string Composite_IDataGenerated_Filter_ActivePageReferenceFilter_description { get { return T("Composite.IDataGenerated.Filter.ActivePageReferenceFilter.description"); } } 
 /// <summary>&quot;Select what relation the current page must have with the data you wish to retrieve.&quot;</summary> 
 public static string Composite_IDataGenerated_Filter_ActivePageReferenceFilter_param_SitemapScope_help { get { return T("Composite.IDataGenerated.Filter.ActivePageReferenceFilter.param.SitemapScope.help"); } } 
 /// <summary>&quot;Page scope&quot;</summary> 
 public static string Composite_IDataGenerated_Filter_ActivePageReferenceFilter_param_SitemapScope_label { get { return T("Composite.IDataGenerated.Filter.ActivePageReferenceFilter.param.SitemapScope.label"); } } 
 /// <summary>&quot;Defines an “and” or “or” query, combining two other filters.&quot;</summary> 
 public static string Composite_IDataGenerated_Filter_CompoundFilter_description { get { return T("Composite.IDataGenerated.Filter.CompoundFilter.description"); } } 
 /// <summary>&quot;And / or filter&quot;</summary> 
 public static string Composite_IDataGenerated_Filter_CompoundFilter_param_IsAndQuery_label { get { return T("Composite.IDataGenerated.Filter.CompoundFilter.param.IsAndQuery.label"); } } 
 /// <summary>&quot;If you select “And” both filters are applied to the data. Selecting “Or” will give you the data that matches just one of the filters.&quot;</summary> 
 public static string Composite_IDataGenerated_Filter_CompoundFilter_param_IsAndQuery_help { get { return T("Composite.IDataGenerated.Filter.CompoundFilter.param.IsAndQuery.help"); } } 
 /// <summary>&quot;One of the two filters (the one to evaluate first)&quot;</summary> 
 public static string Composite_IDataGenerated_Filter_CompoundFilter_param_Left_help { get { return T("Composite.IDataGenerated.Filter.CompoundFilter.param.Left.help"); } } 
 /// <summary>&quot;Left filter&quot;</summary> 
 public static string Composite_IDataGenerated_Filter_CompoundFilter_param_Left_label { get { return T("Composite.IDataGenerated.Filter.CompoundFilter.param.Left.label"); } } 
 /// <summary>&quot;One of the two filters (the one to evaluate last)&quot;</summary> 
 public static string Composite_IDataGenerated_Filter_CompoundFilter_param_Right_help { get { return T("Composite.IDataGenerated.Filter.CompoundFilter.param.Right.help"); } } 
 /// <summary>&quot;Right filter&quot;</summary> 
 public static string Composite_IDataGenerated_Filter_CompoundFilter_param_Right_label { get { return T("Composite.IDataGenerated.Filter.CompoundFilter.param.Right.label"); } } 
 /// <summary>&quot;Lets you specify a filter on data by specifying requirements for the individual fields. If you set requirements on multiple fields, they are all enforced (and query).&quot;</summary> 
 public static string Composite_IDataGenerated_Filter_FieldPredicatesFilter_description { get { return T("Composite.IDataGenerated.Filter.FieldPredicatesFilter.description"); } } 
 /// <summary>&quot;Retrieves an XML representation of the data. &quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_description { get { return T("Composite.IDataGenerated.GetXml.description"); } } 
 /// <summary>&quot;Element name&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_ElementName_label { get { return T("Composite.IDataGenerated.GetXml.param.ElementName.label"); } } 
 /// <summary>&quot;Element namespace&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_ElementNamespace_label { get { return T("Composite.IDataGenerated.GetXml.param.ElementNamespace.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_Filter_help { get { return T("Composite.IDataGenerated.GetXml.param.Filter.help"); } } 
 /// <summary>&quot;Filter&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_Filter_label { get { return T("Composite.IDataGenerated.GetXml.param.Filter.label"); } } 
 /// <summary>&quot;When selected the data XML will be preceded by a &lt;PagingInfo /&gt; element detailing number of pages, items and more.&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_IncludePagingInfo_help { get { return T("Composite.IDataGenerated.GetXml.param.IncludePagingInfo.help"); } } 
 /// <summary>&quot;Include paging info&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_IncludePagingInfo_label { get { return T("Composite.IDataGenerated.GetXml.param.IncludePagingInfo.label"); } } 
 /// <summary>&quot;The field to order data by&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_OrderByField_help { get { return T("Composite.IDataGenerated.GetXml.param.OrderByField.help"); } } 
 /// <summary>&quot;Order by&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_OrderByField_label { get { return T("Composite.IDataGenerated.GetXml.param.OrderByField.label"); } } 
 /// <summary>&quot;When set to true results are delivered in ascending order, otherwise descending order is used. Default is ascending order.&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_OrderAscending_help { get { return T("Composite.IDataGenerated.GetXml.param.OrderAscending.help"); } } 
 /// <summary>&quot;Order ascending&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_OrderAscending_label { get { return T("Composite.IDataGenerated.GetXml.param.OrderAscending.label"); } } 
 /// <summary>&quot;If the number of data elements exceed the page size you can use paging to move to the other pages. See the Page size parameter.&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_PageNumber_help { get { return T("Composite.IDataGenerated.GetXml.param.PageNumber.help"); } } 
 /// <summary>&quot;Page number&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_PageNumber_label { get { return T("Composite.IDataGenerated.GetXml.param.PageNumber.label"); } } 
 /// <summary>&quot;The number of items to display on one page – the maximum number of elements to return. &quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_PageSize_help { get { return T("Composite.IDataGenerated.GetXml.param.PageSize.help"); } } 
 /// <summary>&quot;Page size&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_PageSize_label { get { return T("Composite.IDataGenerated.GetXml.param.PageSize.label"); } } 
 /// <summary>&quot;The data fields to output in the XML. Fewer fields can yield faster renderings.&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_PropertyNames_help { get { return T("Composite.IDataGenerated.GetXml.param.PropertyNames.help"); } } 
 /// <summary>&quot;Selected fields&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_PropertyNames_label { get { return T("Composite.IDataGenerated.GetXml.param.PropertyNames.label"); } } 
 /// <summary>&quot;If you include reference data in the &apos;Selected properties&apos; setting, you can use this option to control how the referenced data is included. &apos;Inline&apos; is easy to use, but may bloat the size of the XML document.&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_ShowReferencesInline_help { get { return T("Composite.IDataGenerated.GetXml.param.ShowReferencesInline.help"); } } 
 /// <summary>&quot;Show reference data inline&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_ShowReferencesInline_label { get { return T("Composite.IDataGenerated.GetXml.param.ShowReferencesInline.label"); } } 
 /// <summary>&quot;When true data can be ordered randomly. Specify the number of random results you require by setting the &apos;Page size&apos;. If a filter is specified, this is applied before the random selection. If you specify an &apos;Order by&apos; value, you should specify a low &apos;Page size&apos; or the randomization will become void.&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_Randomized_help { get { return T("Composite.IDataGenerated.GetXml.param.Randomized.help"); } } 
 /// <summary>&quot;Randomized&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_Randomized_label { get { return T("Composite.IDataGenerated.GetXml.param.Randomized.label"); } } 
 /// <summary>&quot;Determines if result XML has to be cached, and what priority those cache records should have&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_CachePriority_help { get { return T("Composite.IDataGenerated.GetXml.param.CachePriority.help"); } } 
 /// <summary>&quot;Cache Priority&quot;</summary> 
 public static string Composite_IDataGenerated_GetXml_param_CachePriority_label { get { return T("Composite.IDataGenerated.GetXml.param.CachePriority.label"); } } 
 /// <summary>&quot;Fetches the ID of the current page or a page relative to the current page.&quot;</summary> 
 public static string Composite_Pages_GetPageId_description { get { return T("Composite.Pages.GetPageId.description"); } } 
 /// <summary>&quot;What page to get id from. The default is from the current page.&quot;</summary> 
 public static string Composite_Pages_GetPageId_param_SitemapScope_help { get { return T("Composite.Pages.GetPageId.param.SitemapScope.help"); } } 
 /// <summary>&quot;Page association&quot;</summary> 
 public static string Composite_Pages_GetPageId_param_SitemapScope_label { get { return T("Composite.Pages.GetPageId.param.SitemapScope.label"); } } 
 /// <summary>&quot;Quick and raw sitemap xhtml.&quot;</summary> 
 public static string Composite_Pages_QuickSitemap_description { get { return T("Composite.Pages.QuickSitemap.description"); } } 
 /// <summary>&quot;Returns a hierarchical XML structure of pages. When executed as part of a page rendering XML elements representing the current and ancestor pages will be appended the attributes isopen=”true” and iscurrent=”true”&quot;</summary> 
 public static string Composite_Pages_SitemapXml_description { get { return T("Composite.Pages.SitemapXml.description"); } } 
 /// <summary>&quot;Source page&quot;</summary> 
 public static string Composite_Pages_SitemapXml_param_SourcePage_label { get { return T("Composite.Pages.SitemapXml.param.SourcePage.label"); } } 
 /// <summary>&quot;By default the source page is the page currently being rendered. Specify a value if you want to get sitemap information relative to another page. The source page controls how page elements are annotated with &apos;isopen&apos; and &apos;iscurrent&apos; and is the starting point when calculating the page scope.&quot;</summary> 
 public static string Composite_Pages_SitemapXml_param_SourcePage_help { get { return T("Composite.Pages.SitemapXml.param.SourcePage.help"); } } 
 /// <summary>&quot;Page scope&quot;</summary> 
 public static string Composite_Pages_SitemapXml_param_SitemapScope_label { get { return T("Composite.Pages.SitemapXml.param.SitemapScope.label"); } } 
 /// <summary>&quot;The scope of pages to extract from the sitemap. The default is &apos;all pages&apos;. You can use this parameter to extract the structure you need to complete your task.&quot;</summary> 
 public static string Composite_Pages_SitemapXml_param_SitemapScope_help { get { return T("Composite.Pages.SitemapXml.param.SitemapScope.help"); } } 
 /// <summary>&quot;Gets information about current page in all the languages.&quot;</summary> 
 public static string Composite_Pages_GetForeignPageInfo_description { get { return T("Composite.Pages.GetForeignPageInfo.description"); } } 
 /// <summary>&quot;Defines a &apos;cache zone&apos; around a function call or markup (typically containing function calls). This function can be used to enhance page rendering performance by caching sections of a web page. The &apos;Object Cache Id&apos; value should be unique to the content being cached.&quot;</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_description { get { return T("Composite.Utils.Caching.PageObjectCache.description"); } } 
 /// <summary>&quot;Object to cache&quot;</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_ObjectToCache_label { get { return T("Composite.Utils.Caching.PageObjectCache.param.ObjectToCache.label"); } } 
 /// <summary>&quot;What you want to cache - this can be a single function call or a section of markup containing one or more function calls.&quot;</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_ObjectToCache_help { get { return T("Composite.Utils.Caching.PageObjectCache.param.ObjectToCache.help"); } } 
 /// <summary>&quot;Unique cache id&quot;</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_ObjectCacheId_label { get { return T("Composite.Utils.Caching.PageObjectCache.param.ObjectCacheId.label"); } } 
 /// <summary>&quot;Specify an ID unique to the content being cached. This value is used - in conjunction with the Page scope - to define a unique cache key.&quot;</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_ObjectCacheId_help { get { return T("Composite.Utils.Caching.PageObjectCache.param.ObjectCacheId.help"); } } 
 /// <summary>&quot;Page scope&quot;</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_SitemapScope_label { get { return T("Composite.Utils.Caching.PageObjectCache.param.SitemapScope.label"); } } 
 /// <summary>&quot;The page scope the cached data should be shared on. By default the page scope is &apos;this website&apos;, but you can change it to page specific caching and more.&quot;</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_SitemapScope_help { get { return T("Composite.Utils.Caching.PageObjectCache.param.SitemapScope.help"); } } 
 /// <summary>&quot;Cache duration (seconds)&quot;</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_SecondsToCache_label { get { return T("Composite.Utils.Caching.PageObjectCache.param.SecondsToCache.label"); } } 
 /// <summary>&quot;The number of seconds the cached object should be reused. Default is 1 minute (60 seconds).&quot;</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_SecondsToCache_help { get { return T("Composite.Utils.Caching.PageObjectCache.param.SecondsToCache.help"); } } 
 /// <summary>&quot;Language specific&quot;</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_LanguageSpecific_label { get { return T("Composite.Utils.Caching.PageObjectCache.param.LanguageSpecific.label"); } } 
 /// <summary>&quot;Choose if the cached object should be uniquely cached per website language or commonly shared among languages.&quot;</summary> 
 public static string Composite_Utils_Caching_PageObjectCache_param_LanguageSpecific_help { get { return T("Composite.Utils.Caching.PageObjectCache.param.LanguageSpecific.help"); } } 
 /// <summary>&quot;AreEqual&quot;</summary> 
 public static string Composite_Utils_Compare_AreEqual_description { get { return T("Composite.Utils.Compare.AreEqual.description"); } } 
 /// <summary>&quot;Compares two objects for equality. Returns true if the two objects are equal.&quot;</summary> 
 public static string Composite_Utils_Compare_AreEqual_param_ValueA_help { get { return T("Composite.Utils.Compare.AreEqual.param.ValueA.help"); } } 
 /// <summary>&quot;Value A to compare.&quot;</summary> 
 public static string Composite_Utils_Compare_AreEqual_param_ValueA_label { get { return T("Composite.Utils.Compare.AreEqual.param.ValueA.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Compare_AreEqual_param_ValueB_help { get { return T("Composite.Utils.Compare.AreEqual.param.ValueB.help"); } } 
 /// <summary>&quot;Value B to compare.&quot;</summary> 
 public static string Composite_Utils_Compare_AreEqual_param_ValueB_label { get { return T("Composite.Utils.Compare.AreEqual.param.ValueB.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Compare_IsLessThan_description { get { return T("Composite.Utils.Compare.IsLessThan.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Compare_IsLessThan_param_ValueA_help { get { return T("Composite.Utils.Compare.IsLessThan.param.ValueA.help"); } } 
 /// <summary>&quot;Value A to compare.&quot;</summary> 
 public static string Composite_Utils_Compare_IsLessThan_param_ValueA_label { get { return T("Composite.Utils.Compare.IsLessThan.param.ValueA.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Compare_IsLessThan_param_ValueB_help { get { return T("Composite.Utils.Compare.IsLessThan.param.ValueB.help"); } } 
 /// <summary>&quot;Value B to compare.&quot;</summary> 
 public static string Composite_Utils_Compare_IsLessThan_param_ValueB_label { get { return T("Composite.Utils.Compare.IsLessThan.param.ValueB.label"); } } 
 /// <summary>&quot;Reads a string from the application configuration file (web.config or app.config)&quot;</summary> 
 public static string Composite_Utils_Configuration_AppSettingsValue_description { get { return T("Composite.Utils.Configuration.AppSettingsValue.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Configuration_AppSettingsValue_param_KeyName_help { get { return T("Composite.Utils.Configuration.AppSettingsValue.param.KeyName.help"); } } 
 /// <summary>&quot;Key Name&quot;</summary> 
 public static string Composite_Utils_Configuration_AppSettingsValue_param_KeyName_label { get { return T("Composite.Utils.Configuration.AppSettingsValue.param.KeyName.label"); } } 
 /// <summary>&quot;Add a number of days to the current date and get the resulting date.&quot;</summary> 
 public static string Composite_Utils_Date_AddDays_description { get { return T("Composite.Utils.Date.AddDays.description"); } } 
 /// <summary>&quot;Specify a negative or positive number of days to add to the current date.&quot;</summary> 
 public static string Composite_Utils_Date_AddDays_param_DaysToAdd_help { get { return T("Composite.Utils.Date.AddDays.param.DaysToAdd.help"); } } 
 /// <summary>&quot;Days to add&quot;</summary> 
 public static string Composite_Utils_Date_AddDays_param_DaysToAdd_label { get { return T("Composite.Utils.Date.AddDays.param.DaysToAdd.label"); } } 
 /// <summary>&quot;The current date and time&quot;</summary> 
 public static string Composite_Utils_Date_Now_description { get { return T("Composite.Utils.Date.Now.description"); } } 
 /// <summary>&quot;Returns an input parameter from executing function context. Use this in developing to copy an input value to a new function call.&quot;</summary> 
 public static string Composite_Utils_GetInputParameter_description { get { return T("Composite.Utils.GetInputParameter.description"); } } 
 /// <summary>&quot;Specify the name of the input parameter which value you wish to use here.&quot;</summary> 
 public static string Composite_Utils_GetInputParameter_param_InputParameterName_help { get { return T("Composite.Utils.GetInputParameter.param.InputParameterName.help"); } } 
 /// <summary>&quot;Parameter name&quot;</summary> 
 public static string Composite_Utils_GetInputParameter_param_InputParameterName_label { get { return T("Composite.Utils.GetInputParameter.param.InputParameterName.label"); } } 
 /// <summary>&quot;Parses a string into an object. The type of object depends on the receiver. Using this function to deliver a value to a DateTime parameter, will make the system parse the string as a DateTime etc.&quot;</summary> 
 public static string Composite_Utils_ParseStringToObject_description { get { return T("Composite.Utils.ParseStringToObject.description"); } } 
 /// <summary>&quot;Specify the string to parse. Note that the string must be formatted in a way that can be converted into the type of object that is expected.&quot;</summary> 
 public static string Composite_Utils_ParseStringToObject_param_StringToParse_help { get { return T("Composite.Utils.ParseStringToObject.param.StringToParse.help"); } } 
 /// <summary>&quot;String to parse&quot;</summary> 
 public static string Composite_Utils_ParseStringToObject_param_StringToParse_label { get { return T("Composite.Utils.ParseStringToObject.param.StringToParse.label"); } } 
 /// <summary>&quot;Returns a new random Guid.&quot;</summary> 
 public static string Composite_Utils_Guid_NewGuid_description { get { return T("Composite.Utils.Guid.NewGuid.description"); } } 
 /// <summary>&quot;A list of all cultures&quot;</summary> 
 public static string Composite_Utils_Globalization_AllCultures_description { get { return T("Composite.Utils.Globalization.AllCultures.description"); } } 
 /// <summary>&quot;The culture for the current user / request.&quot;</summary> 
 public static string Composite_Utils_Globalization_CurrentCulture_description { get { return T("Composite.Utils.Globalization.CurrentCulture.description"); } } 
 /// <summary>&quot;Returns the sum from a list of integers&quot;</summary> 
 public static string Composite_Utils_Integer_Sum_description { get { return T("Composite.Utils.Integer.Sum.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Integer_Sum_param_Ints_help { get { return T("Composite.Utils.Integer.Sum.param.Ints.help"); } } 
 /// <summary>&quot;Integer list&quot;</summary> 
 public static string Composite_Utils_Integer_Sum_param_Ints_label { get { return T("Composite.Utils.Integer.Sum.param.Ints.label"); } } 
 /// <summary>&quot;Check if a boolean is true or false. &quot;</summary> 
 public static string Composite_Utils_Predicates_BoolEquals_description { get { return T("Composite.Utils.Predicates.BoolEquals.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_BoolEquals_param_Value_help { get { return T("Composite.Utils.Predicates.BoolEquals.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_BoolEquals_param_Value_label { get { return T("Composite.Utils.Predicates.BoolEquals.param.Value.label"); } } 
 /// <summary>&quot;Check if a date equals a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_DateTimeEquals_description { get { return T("Composite.Utils.Predicates.DateTimeEquals.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_DateTimeEquals_param_Value_help { get { return T("Composite.Utils.Predicates.DateTimeEquals.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_DateTimeEquals_param_Value_label { get { return T("Composite.Utils.Predicates.DateTimeEquals.param.Value.label"); } } 
 /// <summary>&quot;Check if a date is greater than a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_DateTimeGreaterThan_description { get { return T("Composite.Utils.Predicates.DateTimeGreaterThan.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_DateTimeGreaterThan_param_Value_help { get { return T("Composite.Utils.Predicates.DateTimeGreaterThan.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_DateTimeGreaterThan_param_Value_label { get { return T("Composite.Utils.Predicates.DateTimeGreaterThan.param.Value.label"); } } 
 /// <summary>&quot;Check if a date is less than a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_DateTimeLessThan_description { get { return T("Composite.Utils.Predicates.DateTimeLessThan.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_DateTimeLessThan_param_Value_help { get { return T("Composite.Utils.Predicates.DateTimeLessThan.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_DateTimeLessThan_param_Value_label { get { return T("Composite.Utils.Predicates.DateTimeLessThan.param.Value.label"); } } 
 /// <summary>&quot;Check is a decimal has a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_DecimalEquals_description { get { return T("Composite.Utils.Predicates.DecimalEquals.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_DecimalEquals_param_Value_help { get { return T("Composite.Utils.Predicates.DecimalEquals.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_DecimalEquals_param_Value_label { get { return T("Composite.Utils.Predicates.DecimalEquals.param.Value.label"); } } 
 /// <summary>&quot;Check if a decimal is greater than a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_DecimalGreaterThan_description { get { return T("Composite.Utils.Predicates.DecimalGreaterThan.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_DecimalGreaterThan_param_Value_help { get { return T("Composite.Utils.Predicates.DecimalGreaterThan.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_DecimalGreaterThan_param_Value_label { get { return T("Composite.Utils.Predicates.DecimalGreaterThan.param.Value.label"); } } 
 /// <summary>&quot;Check if a decimal is less than a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_DecimalLessThan_description { get { return T("Composite.Utils.Predicates.DecimalLessThan.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_DecimalLessThan_param_Value_help { get { return T("Composite.Utils.Predicates.DecimalLessThan.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_DecimalLessThan_param_Value_label { get { return T("Composite.Utils.Predicates.DecimalLessThan.param.Value.label"); } } 
 /// <summary>&quot;Check if a Guid equals a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_GuidEquals_description { get { return T("Composite.Utils.Predicates.GuidEquals.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_GuidEquals_param_Value_help { get { return T("Composite.Utils.Predicates.GuidEquals.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_GuidEquals_param_Value_label { get { return T("Composite.Utils.Predicates.GuidEquals.param.Value.label"); } } 
 /// <summary>&quot;Check if a Guid exists in a comma separated string list&quot;</summary> 
 public static string Composite_Utils_Predicates_GuidInCommaSeparatedList_description { get { return T("Composite.Utils.Predicates.GuidInCommaSeparatedList.description"); } } 
 /// <summary>&quot;List of Guid&quot;</summary> 
 public static string Composite_Utils_Predicates_GuidInCommaSeparatedList_param_CommaSeparatedGuids_label { get { return T("Composite.Utils.Predicates.GuidInCommaSeparatedList.param.CommaSeparatedGuids.label"); } } 
 /// <summary>&quot;A string containing zero or more Guids separated by commas&quot;</summary> 
 public static string Composite_Utils_Predicates_GuidInCommaSeparatedList_param_CommaSeparatedGuids_help { get { return T("Composite.Utils.Predicates.GuidInCommaSeparatedList.param.CommaSeparatedGuids.help"); } } 
 /// <summary>&quot;Check if a string field matches one of the terms in a comma separated string list&quot;</summary> 
 public static string Composite_Utils_Predicates_StringInCommaSeparatedList_description { get { return T("Composite.Utils.Predicates.StringInCommaSeparatedList.description"); } } 
 /// <summary>&quot;Search terms&quot;</summary> 
 public static string Composite_Utils_Predicates_StringInCommaSeparatedList_param_CommaSeparatedSearchTerms_label { get { return T("Composite.Utils.Predicates.StringInCommaSeparatedList.param.CommaSeparatedSearchTerms.label"); } } 
 /// <summary>&quot;A string containing search terms separated by commas, like &apos;c1,cms,linq&apos;&quot;</summary> 
 public static string Composite_Utils_Predicates_StringInCommaSeparatedList_param_CommaSeparatedSearchTerms_help { get { return T("Composite.Utils.Predicates.StringInCommaSeparatedList.param.CommaSeparatedSearchTerms.help"); } } 
 /// <summary>&quot;Ignore case&quot;</summary> 
 public static string Composite_Utils_Predicates_StringInCommaSeparatedList_param_IgnoreCase_label { get { return T("Composite.Utils.Predicates.StringInCommaSeparatedList.param.IgnoreCase.label"); } } 
 /// <summary>&quot;When &apos;false&apos;, casing of the words must match exactly. Default is &apos;true&apos;, case insensitive search&quot;</summary> 
 public static string Composite_Utils_Predicates_StringInCommaSeparatedList_param_IgnoreCase_help { get { return T("Composite.Utils.Predicates.StringInCommaSeparatedList.param.IgnoreCase.help"); } } 
 /// <summary>&quot;Check if a string field matches one of the strings in the supplied list&quot;</summary> 
 public static string Composite_Utils_Predicates_StringInList_description { get { return T("Composite.Utils.Predicates.StringInList.description"); } } 
 /// <summary>&quot;Search terms&quot;</summary> 
 public static string Composite_Utils_Predicates_StringInList_param_SearchTerms_label { get { return T("Composite.Utils.Predicates.StringInList.param.SearchTerms.label"); } } 
 /// <summary>&quot;A list of strings to match up against the searched string field.&quot;</summary> 
 public static string Composite_Utils_Predicates_StringInList_param_SearchTerms_help { get { return T("Composite.Utils.Predicates.StringInList.param.SearchTerms.help"); } } 
 /// <summary>&quot;Ignore case&quot;</summary> 
 public static string Composite_Utils_Predicates_StringInList_param_IgnoreCase_label { get { return T("Composite.Utils.Predicates.StringInList.param.IgnoreCase.label"); } } 
 /// <summary>&quot;When &apos;false&apos;, casing of the words must match exactly. Default is &apos;true&apos;, case insensitive search&quot;</summary> 
 public static string Composite_Utils_Predicates_StringInList_param_IgnoreCase_help { get { return T("Composite.Utils.Predicates.StringInList.param.IgnoreCase.help"); } } 
 /// <summary>&quot;Check if an integer equals a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_IntegerEquals_description { get { return T("Composite.Utils.Predicates.IntegerEquals.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_IntegerEquals_param_Value_help { get { return T("Composite.Utils.Predicates.IntegerEquals.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_IntegerEquals_param_Value_label { get { return T("Composite.Utils.Predicates.IntegerEquals.param.Value.label"); } } 
 /// <summary>&quot;Check if an integer is greater than a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_IntegerGreaterThan_description { get { return T("Composite.Utils.Predicates.IntegerGreaterThan.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_IntegerGreaterThan_param_Value_help { get { return T("Composite.Utils.Predicates.IntegerGreaterThan.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_IntegerGreaterThan_param_Value_label { get { return T("Composite.Utils.Predicates.IntegerGreaterThan.param.Value.label"); } } 
 /// <summary>&quot;Check if an integer is less than a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_IntegerLessThan_description { get { return T("Composite.Utils.Predicates.IntegerLessThan.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_IntegerLessThan_param_Value_help { get { return T("Composite.Utils.Predicates.IntegerLessThan.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_IntegerLessThan_param_Value_label { get { return T("Composite.Utils.Predicates.IntegerLessThan.param.Value.label"); } } 
 /// <summary>&quot;Check if a string contains a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_StringContains_description { get { return T("Composite.Utils.Predicates.StringContains.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_StringContains_param_Value_help { get { return T("Composite.Utils.Predicates.StringContains.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_StringContains_param_Value_label { get { return T("Composite.Utils.Predicates.StringContains.param.Value.label"); } } 
 /// <summary>&quot;Check if a string ends with a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_StringEndsWith_description { get { return T("Composite.Utils.Predicates.StringEndsWith.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_StringEndsWith_param_Value_help { get { return T("Composite.Utils.Predicates.StringEndsWith.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_StringEndsWith_param_Value_label { get { return T("Composite.Utils.Predicates.StringEndsWith.param.Value.label"); } } 
 /// <summary>&quot;Check if a string equals a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_StringEquals_description { get { return T("Composite.Utils.Predicates.StringEquals.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_StringEquals_param_Value_help { get { return T("Composite.Utils.Predicates.StringEquals.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_StringEquals_param_Value_label { get { return T("Composite.Utils.Predicates.StringEquals.param.Value.label"); } } 
 /// <summary>&quot;Check if a string starts with a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_StringStartsWith_description { get { return T("Composite.Utils.Predicates.StringStartsWith.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_StringStartsWith_param_Value_help { get { return T("Composite.Utils.Predicates.StringStartsWith.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_StringStartsWith_param_Value_label { get { return T("Composite.Utils.Predicates.StringStartsWith.param.Value.label"); } } 
 /// <summary>&quot;Check if a Guid equals a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableGuidEquals_description { get { return T("Composite.Utils.Predicates.NullableGuidEquals.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableGuidEquals_param_Value_help { get { return T("Composite.Utils.Predicates.NullableGuidEquals.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableGuidEquals_param_Value_label { get { return T("Composite.Utils.Predicates.NullableGuidEquals.param.Value.label"); } } 
 /// <summary>&quot;Check if a nullable Guid has no value&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableGuidNoValue_description { get { return T("Composite.Utils.Predicates.NullableGuidNoValue.description"); } } 
 /// <summary>&quot;Check if an integer equals a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableIntegerEquals_description { get { return T("Composite.Utils.Predicates.NullableIntegerEquals.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableIntegerEquals_param_Value_help { get { return T("Composite.Utils.Predicates.NullableIntegerEquals.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableIntegerEquals_param_Value_label { get { return T("Composite.Utils.Predicates.NullableIntegerEquals.param.Value.label"); } } 
 /// <summary>&quot;Check if an nullable integer has no value&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableIntegerNoValue_description { get { return T("Composite.Utils.Predicates.NullableIntegerNoValue.description"); } } 
 /// <summary>&quot;Check if a string has no value&quot;</summary> 
 public static string Composite_Utils_Predicates_StringNoValue_description { get { return T("Composite.Utils.Predicates.StringNoValue.description"); } } 
 /// <summary>&quot;Check if a boolean is true or false. &quot;</summary> 
 public static string Composite_Utils_Predicates_NullableBoolEquals_description { get { return T("Composite.Utils.Predicates.NullableBoolEquals.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableBoolEquals_param_Value_help { get { return T("Composite.Utils.Predicates.NullableBoolEquals.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableBoolEquals_param_Value_label { get { return T("Composite.Utils.Predicates.NullableBoolEquals.param.Value.label"); } } 
 /// <summary>&quot;Check if a nullable boolean has no value&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableBoolNoValue_description { get { return T("Composite.Utils.Predicates.NullableBoolNoValue.description"); } } 
 /// <summary>&quot;Check if a date equals a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeEquals_description { get { return T("Composite.Utils.Predicates.NullableDateTimeEquals.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeEquals_param_Value_help { get { return T("Composite.Utils.Predicates.NullableDateTimeEquals.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeEquals_param_Value_label { get { return T("Composite.Utils.Predicates.NullableDateTimeEquals.param.Value.label"); } } 
 /// <summary>&quot;Check if a date is greater than a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeGreaterThan_description { get { return T("Composite.Utils.Predicates.NullableDateTimeGreaterThan.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeGreaterThan_param_Value_help { get { return T("Composite.Utils.Predicates.NullableDateTimeGreaterThan.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeGreaterThan_param_Value_label { get { return T("Composite.Utils.Predicates.NullableDateTimeGreaterThan.param.Value.label"); } } 
 /// <summary>&quot;Check if a date is less than a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeLessThan_description { get { return T("Composite.Utils.Predicates.NullableDateTimeLessThan.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeLessThan_param_Value_help { get { return T("Composite.Utils.Predicates.NullableDateTimeLessThan.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeLessThan_param_Value_label { get { return T("Composite.Utils.Predicates.NullableDateTimeLessThan.param.Value.label"); } } 
 /// <summary>&quot;Check if a nullable date has no value&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableDateTimeNoValue_description { get { return T("Composite.Utils.Predicates.NullableDateTimeNoValue.description"); } } 
 /// <summary>&quot;Check is a decimal has a certain value&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableDecimalEquals_description { get { return T("Composite.Utils.Predicates.NullableDecimalEquals.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableDecimalEquals_param_Value_help { get { return T("Composite.Utils.Predicates.NullableDecimalEquals.param.Value.help"); } } 
 /// <summary>&quot;The value to compare with&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableDecimalEquals_param_Value_label { get { return T("Composite.Utils.Predicates.NullableDecimalEquals.param.Value.label"); } } 
 /// <summary>&quot;Check is a nullable decimal has no value&quot;</summary> 
 public static string Composite_Utils_Predicates_NullableDecimalNoValue_description { get { return T("Composite.Utils.Predicates.NullableDecimalNoValue.description"); } } 
 /// <summary>&quot;Joins a list of strings to a single string&quot;</summary> 
 public static string Composite_Utils_String_Join_description { get { return T("Composite.Utils.String.Join.description"); } } 
 /// <summary>&quot;The separator to insert between strings.&quot;</summary> 
 public static string Composite_Utils_String_Join_param_Separator_help { get { return T("Composite.Utils.String.Join.param.Separator.help"); } } 
 /// <summary>&quot;Separator&quot;</summary> 
 public static string Composite_Utils_String_Join_param_Separator_label { get { return T("Composite.Utils.String.Join.param.Separator.label"); } } 
 /// <summary>&quot;The list of strings to join&quot;</summary> 
 public static string Composite_Utils_String_Join_param_Strings_help { get { return T("Composite.Utils.String.Join.param.Strings.help"); } } 
 /// <summary>&quot;Strings to join&quot;</summary> 
 public static string Composite_Utils_String_Join_param_Strings_label { get { return T("Composite.Utils.String.Join.param.Strings.label"); } } 
 /// <summary>&quot;Joins two strings to a simple string&quot;</summary> 
 public static string Composite_Utils_String_JoinTwo_description { get { return T("Composite.Utils.String.JoinTwo.description"); } } 
 /// <summary>&quot;The string to put first&quot;</summary> 
 public static string Composite_Utils_String_JoinTwo_param_StringA_help { get { return T("Composite.Utils.String.JoinTwo.param.StringA.help"); } } 
 /// <summary>&quot;String A&quot;</summary> 
 public static string Composite_Utils_String_JoinTwo_param_StringA_label { get { return T("Composite.Utils.String.JoinTwo.param.StringA.label"); } } 
 /// <summary>&quot;The string to put last&quot;</summary> 
 public static string Composite_Utils_String_JoinTwo_param_StringB_help { get { return T("Composite.Utils.String.JoinTwo.param.StringB.help"); } } 
 /// <summary>&quot;String B&quot;</summary> 
 public static string Composite_Utils_String_JoinTwo_param_StringB_label { get { return T("Composite.Utils.String.JoinTwo.param.StringB.label"); } } 
 /// <summary>&quot;A string to insert in between String A and String B. Default is no separator&quot;</summary> 
 public static string Composite_Utils_String_JoinTwo_param_Separator_help { get { return T("Composite.Utils.String.JoinTwo.param.Separator.help"); } } 
 /// <summary>&quot;Separator&quot;</summary> 
 public static string Composite_Utils_String_JoinTwo_param_Separator_label { get { return T("Composite.Utils.String.JoinTwo.param.Separator.label"); } } 
 /// <summary>&quot;Splits a string into a list of string.&quot;</summary> 
 public static string Composite_Utils_String_Split_description { get { return T("Composite.Utils.String.Split.description"); } } 
 /// <summary>&quot;The separator to use when splitting the string. Default is comma (&quot;,&quot;)&quot;</summary> 
 public static string Composite_Utils_String_Split_param_Separator_help { get { return T("Composite.Utils.String.Split.param.Separator.help"); } } 
 /// <summary>&quot;Separator&quot;</summary> 
 public static string Composite_Utils_String_Split_param_Separator_label { get { return T("Composite.Utils.String.Split.param.Separator.label"); } } 
 /// <summary>&quot;The string you wish to split into a list.&quot;</summary> 
 public static string Composite_Utils_String_Split_param_String_help { get { return T("Composite.Utils.String.Split.param.String.help"); } } 
 /// <summary>&quot;String to split&quot;</summary> 
 public static string Composite_Utils_String_Split_param_String_label { get { return T("Composite.Utils.String.Split.param.String.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Validation_DateTimeNotNullValidation_description { get { return T("Composite.Utils.Validation.DateTimeNotNullValidation.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Validation_DecimalNotNullValidation_description { get { return T("Composite.Utils.Validation.DecimalNotNullValidation.description"); } } 
 /// <summary>&quot;Validates the precision of digits (the number of decimals the user has specified)&quot;</summary> 
 public static string Composite_Utils_Validation_DecimalPrecisionValidation_description { get { return T("Composite.Utils.Validation.DecimalPrecisionValidation.description"); } } 
 /// <summary>&quot;The maximum number of digits to allow on the decimal&quot;</summary> 
 public static string Composite_Utils_Validation_DecimalPrecisionValidation_param_MaxDigits_help { get { return T("Composite.Utils.Validation.DecimalPrecisionValidation.param.MaxDigits.help"); } } 
 /// <summary>&quot;Max number of decimal digits&quot;</summary> 
 public static string Composite_Utils_Validation_DecimalPrecisionValidation_param_MaxDigits_label { get { return T("Composite.Utils.Validation.DecimalPrecisionValidation.param.MaxDigits.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Validation_GuidNotNullValidation_description { get { return T("Composite.Utils.Validation.GuidNotNullValidation.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Validation_Int32NotNullValidation_description { get { return T("Composite.Utils.Validation.Int32NotNullValidation.description"); } } 
 /// <summary>&quot;Validates than an integer is within a certain range.&quot;</summary> 
 public static string Composite_Utils_Validation_IntegerRangeValidation_description { get { return T("Composite.Utils.Validation.IntegerRangeValidation.description"); } } 
 /// <summary>&quot;The maximum number allowed in this field.&quot;</summary> 
 public static string Composite_Utils_Validation_IntegerRangeValidation_param_max_help { get { return T("Composite.Utils.Validation.IntegerRangeValidation.param.max.help"); } } 
 /// <summary>&quot;Maximum number&quot;</summary> 
 public static string Composite_Utils_Validation_IntegerRangeValidation_param_max_label { get { return T("Composite.Utils.Validation.IntegerRangeValidation.param.max.label"); } } 
 /// <summary>&quot;The minimum number allowed in this field.&quot;</summary> 
 public static string Composite_Utils_Validation_IntegerRangeValidation_param_min_help { get { return T("Composite.Utils.Validation.IntegerRangeValidation.param.min.help"); } } 
 /// <summary>&quot;Minimum number&quot;</summary> 
 public static string Composite_Utils_Validation_IntegerRangeValidation_param_min_label { get { return T("Composite.Utils.Validation.IntegerRangeValidation.param.min.label"); } } 
 /// <summary>&quot;Validates that a string conforms to the specified regular expression&quot;</summary> 
 public static string Composite_Utils_Validation_RegularExpressionValidation_description { get { return T("Composite.Utils.Validation.RegularExpressionValidation.description"); } } 
 /// <summary>&quot;The regular expression pattern to use&quot;</summary> 
 public static string Composite_Utils_Validation_RegularExpressionValidation_param_pattern_help { get { return T("Composite.Utils.Validation.RegularExpressionValidation.param.pattern.help"); } } 
 /// <summary>&quot;RegEx pattern&quot;</summary> 
 public static string Composite_Utils_Validation_RegularExpressionValidation_param_pattern_label { get { return T("Composite.Utils.Validation.RegularExpressionValidation.param.pattern.label"); } } 
 /// <summary>&quot;Validates that the length of a string is within the specified range&quot;</summary> 
 public static string Composite_Utils_Validation_StringLengthValidation_description { get { return T("Composite.Utils.Validation.StringLengthValidation.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Validation_StringLengthValidation_param_max_help { get { return T("Composite.Utils.Validation.StringLengthValidation.param.max.help"); } } 
 /// <summary>&quot;Maximum length&quot;</summary> 
 public static string Composite_Utils_Validation_StringLengthValidation_param_max_label { get { return T("Composite.Utils.Validation.StringLengthValidation.param.max.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Validation_StringLengthValidation_param_min_help { get { return T("Composite.Utils.Validation.StringLengthValidation.param.min.help"); } } 
 /// <summary>&quot;Minimum length&quot;</summary> 
 public static string Composite_Utils_Validation_StringLengthValidation_param_min_label { get { return T("Composite.Utils.Validation.StringLengthValidation.param.min.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Utils_Validation_StringNotNullValidation_description { get { return T("Composite.Utils.Validation.StringNotNullValidation.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Client_BrowserPlatform_description { get { return T("Composite.Web.Client.BrowserPlatform.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Client_BrowserString_description { get { return T("Composite.Web.Client.BrowserString.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Client_BrowserType_description { get { return T("Composite.Web.Client.BrowserType.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Client_BrowserVersion_description { get { return T("Composite.Web.Client.BrowserVersion.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Client_EcmaScriptVersion_description { get { return T("Composite.Web.Client.EcmaScriptVersion.description"); } } 
 /// <summary>&quot;True if the current request is identified as coming from a crawler (search engine).&quot;</summary> 
 public static string Composite_Web_Client_IsCrawler_description { get { return T("Composite.Web.Client.IsCrawler.description"); } } 
 /// <summary>&quot;True if the current request is identified as coming from a mobile device.&quot;</summary> 
 public static string Composite_Web_Client_IsMobileDevice_description { get { return T("Composite.Web.Client.IsMobileDevice.description"); } } 
 /// <summary>&quot;Common HTML meta tags you probably want in your html head&quot;</summary> 
 public static string Composite_Web_Html_Template_CommonMetaTags_description { get { return T("Composite.Web.Html.Template.CommonMetaTags.description"); } } 
 /// <summary>&quot;Content-Type&quot;</summary> 
 public static string Composite_Web_Html_Template_CommonMetaTags_param_ContentType_label { get { return T("Composite.Web.Html.Template.CommonMetaTags.param.ContentType.label"); } } 
 /// <summary>&quot;By default this is &apos;text/html; charset=utf-8&apos;. If you serve something else you should overwrite this.&quot;</summary> 
 public static string Composite_Web_Html_Template_CommonMetaTags_param_ContentType_help { get { return T("Composite.Web.Html.Template.CommonMetaTags.param.ContentType.help"); } } 
 /// <summary>&quot;Designer&quot;</summary> 
 public static string Composite_Web_Html_Template_CommonMetaTags_param_Designer_label { get { return T("Composite.Web.Html.Template.CommonMetaTags.param.Designer.label"); } } 
 /// <summary>&quot;Who designed this website? Show it in the &apos;Designer&apos; meta tag. Default is not to emit the meta tag.&quot;</summary> 
 public static string Composite_Web_Html_Template_CommonMetaTags_param_Designer_help { get { return T("Composite.Web.Html.Template.CommonMetaTags.param.Designer.help"); } } 
 /// <summary>&quot;Show generator&quot;</summary> 
 public static string Composite_Web_Html_Template_CommonMetaTags_param_ShowGenerator_label { get { return T("Composite.Web.Html.Template.CommonMetaTags.param.ShowGenerator.label"); } } 
 /// <summary>&quot;Show the world you support Composite C1 - free open source!&quot;</summary> 
 public static string Composite_Web_Html_Template_CommonMetaTags_param_ShowGenerator_help { get { return T("Composite.Web.Html.Template.CommonMetaTags.param.ShowGenerator.help"); } } 
 /// <summary>&quot;Appends a lang=&apos;(language code)&apos; attribute the the parent element, reflecting the language of the current page. You can put this just below the &lt;html /&gt; tag.&quot;</summary> 
 public static string Composite_Web_Html_Template_LangAttribute_description { get { return T("Composite.Web.Html.Template.LangAttribute.description"); } } 
 /// <summary>&quot;Includes a named Page Template Feature at this location. Page Template Features can contain HTML and functional snippets and are managed on the Layout perspective.&quot;</summary> 
 public static string Composite_Web_Html_Template_PageTemplateFeature_description { get { return T("Composite.Web.Html.Template.PageTemplateFeature.description"); } } 
 /// <summary>&quot;Feature name&quot;</summary> 
 public static string Composite_Web_Html_Template_PageTemplateFeature_param_FeatureName_label { get { return T("Composite.Web.Html.Template.PageTemplateFeature.param.FeatureName.label"); } } 
 /// <summary>&quot;The name of the Page Template Feature you wish to include.&quot;</summary> 
 public static string Composite_Web_Html_Template_PageTemplateFeature_param_FeatureName_help { get { return T("Composite.Web.Html.Template.PageTemplateFeature.param.FeatureName.help"); } } 
 /// <summary>&quot;Emits the &apos;definitive title&apos; of the current page; the same value that ends up in the page title tag. This title may originate from the page being rendered or from a C1 Function/ASP.NET control which changed the title to match specific data being featured on the page.&quot;</summary> 
 public static string Composite_Web_Html_Template_HtmlTitleValue_description { get { return T("Composite.Web.Html.Template.HtmlTitleValue.description"); } } 
 /// <summary>&quot;Prefix to be removed&quot;</summary> 
 public static string Composite_Web_Html_Template_HtmlTitleValue_param_PrefixToRemove_label { get { return T("Composite.Web.Html.Template.HtmlTitleValue.param.PrefixToRemove.label"); } } 
 /// <summary>&quot;If the HTML title has a prefix value you wish to get rid of, specify the prefix here. If the prefix is not found in the title, this value is ignored.&quot;</summary> 
 public static string Composite_Web_Html_Template_HtmlTitleValue_param_PrefixToRemove_help { get { return T("Composite.Web.Html.Template.HtmlTitleValue.param.PrefixToRemove.help"); } } 
 /// <summary>&quot;Postfix to be removed&quot;</summary> 
 public static string Composite_Web_Html_Template_HtmlTitleValue_param_PostfixToRemove_label { get { return T("Composite.Web.Html.Template.HtmlTitleValue.param.PostfixToRemove.label"); } } 
 /// <summary>&quot;If the HTML title has a postfix value you wish to get rid of, specify the postfix here. If the postfix is not found in the title, this value is ignored.&quot;</summary> 
 public static string Composite_Web_Html_Template_HtmlTitleValue_param_PostfixToRemove_help { get { return T("Composite.Web.Html.Template.HtmlTitleValue.param.PostfixToRemove.help"); } } 
 /// <summary>&quot;Emits the &apos;definitive description&apos; of the current page; the same value that ends up in the page meta description tag. This value may originate from the page being rendered or from a C1 Function/ASP.NET control which changed the description to match specific data being featured on the page.&quot;</summary> 
 public static string Composite_Web_Html_Template_MetaDescriptionValue_description { get { return T("Composite.Web.Html.Template.MetaDescriptionValue.description"); } } 
 /// <summary>&quot;Element to wrap description&quot;</summary> 
 public static string Composite_Web_Html_Template_MetaDescriptionValue_param_Element_label { get { return T("Composite.Web.Html.Template.MetaDescriptionValue.param.Element.label"); } } 
 /// <summary>&quot;To have the description wrapped in an element (like &lt;p class=&quot;description&quot; /&gt;) specify it here. The element with only be emitted when a description text exist.&quot;</summary> 
 public static string Composite_Web_Html_Template_MetaDescriptionValue_param_Element_help { get { return T("Composite.Web.Html.Template.MetaDescriptionValue.param.Element.help"); } } 
 /// <summary>&quot;Gets a value from the current users cookie collection.&quot;</summary> 
 public static string Composite_Web_Request_CookieValue_description { get { return T("Composite.Web.Request.CookieValue.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_CookieValue_param_CookieName_help { get { return T("Composite.Web.Request.CookieValue.param.CookieName.help"); } } 
 /// <summary>&quot;Cookie name&quot;</summary> 
 public static string Composite_Web_Request_CookieValue_param_CookieName_label { get { return T("Composite.Web.Request.CookieValue.param.CookieName.label"); } } 
 /// <summary>&quot;If the user does not have this cookie, use this field to specify what value to default to.&quot;</summary> 
 public static string Composite_Web_Request_CookieValue_param_FallbackValue_help { get { return T("Composite.Web.Request.CookieValue.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_CookieValue_param_FallbackValue_label { get { return T("Composite.Web.Request.CookieValue.param.FallbackValue.label"); } } 
 /// <summary>&quot;Gets a boolean value from a form post (HTTP POST)&quot;</summary> 
 public static string Composite_Web_Request_FormPostBoolValue_description { get { return T("Composite.Web.Request.FormPostBoolValue.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_FormPostBoolValue_param_FallbackValue_help { get { return T("Composite.Web.Request.FormPostBoolValue.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_FormPostBoolValue_param_FallbackValue_label { get { return T("Composite.Web.Request.FormPostBoolValue.param.FallbackValue.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_FormPostBoolValue_param_ParameterName_help { get { return T("Composite.Web.Request.FormPostBoolValue.param.ParameterName.help"); } } 
 /// <summary>&quot;Parameter name&quot;</summary> 
 public static string Composite_Web_Request_FormPostBoolValue_param_ParameterName_label { get { return T("Composite.Web.Request.FormPostBoolValue.param.ParameterName.label"); } } 
 /// <summary>&quot;Gets a decimal value from a form post (HTTP POST)&quot;</summary> 
 public static string Composite_Web_Request_FormPostDecimalValue_description { get { return T("Composite.Web.Request.FormPostDecimalValue.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_FormPostDecimalValue_param_FallbackValue_help { get { return T("Composite.Web.Request.FormPostDecimalValue.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_FormPostDecimalValue_param_FallbackValue_label { get { return T("Composite.Web.Request.FormPostDecimalValue.param.FallbackValue.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_FormPostDecimalValue_param_ParameterName_help { get { return T("Composite.Web.Request.FormPostDecimalValue.param.ParameterName.help"); } } 
 /// <summary>&quot;Parameter name&quot;</summary> 
 public static string Composite_Web_Request_FormPostDecimalValue_param_ParameterName_label { get { return T("Composite.Web.Request.FormPostDecimalValue.param.ParameterName.label"); } } 
 /// <summary>&quot;Gets a Guid value from a form post (HTTP POST)&quot;</summary> 
 public static string Composite_Web_Request_FormPostGuidValue_description { get { return T("Composite.Web.Request.FormPostGuidValue.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_FormPostGuidValue_param_FallbackValue_help { get { return T("Composite.Web.Request.FormPostGuidValue.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_FormPostGuidValue_param_FallbackValue_label { get { return T("Composite.Web.Request.FormPostGuidValue.param.FallbackValue.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_FormPostGuidValue_param_ParameterName_help { get { return T("Composite.Web.Request.FormPostGuidValue.param.ParameterName.help"); } } 
 /// <summary>&quot;Parameter name&quot;</summary> 
 public static string Composite_Web_Request_FormPostGuidValue_param_ParameterName_label { get { return T("Composite.Web.Request.FormPostGuidValue.param.ParameterName.label"); } } 
 /// <summary>&quot;Gets an integer value from a form post (HTTP POST)&quot;</summary> 
 public static string Composite_Web_Request_FormPostIntegerValue_description { get { return T("Composite.Web.Request.FormPostIntegerValue.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_FormPostIntegerValue_param_FallbackValue_help { get { return T("Composite.Web.Request.FormPostIntegerValue.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_FormPostIntegerValue_param_FallbackValue_label { get { return T("Composite.Web.Request.FormPostIntegerValue.param.FallbackValue.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_FormPostIntegerValue_param_ParameterName_help { get { return T("Composite.Web.Request.FormPostIntegerValue.param.ParameterName.help"); } } 
 /// <summary>&quot;Parameter name&quot;</summary> 
 public static string Composite_Web_Request_FormPostIntegerValue_param_ParameterName_label { get { return T("Composite.Web.Request.FormPostIntegerValue.param.ParameterName.label"); } } 
 /// <summary>&quot;Gets a string value from a form post (HTTP POST)&quot;</summary> 
 public static string Composite_Web_Request_FormPostValue_description { get { return T("Composite.Web.Request.FormPostValue.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_FormPostValue_param_FallbackValue_help { get { return T("Composite.Web.Request.FormPostValue.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_FormPostValue_param_FallbackValue_label { get { return T("Composite.Web.Request.FormPostValue.param.FallbackValue.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_FormPostValue_param_ParameterName_help { get { return T("Composite.Web.Request.FormPostValue.param.ParameterName.help"); } } 
 /// <summary>&quot;Parameter name&quot;</summary> 
 public static string Composite_Web_Request_FormPostValue_param_ParameterName_label { get { return T("Composite.Web.Request.FormPostValue.param.ParameterName.label"); } } 
 /// <summary>&quot;Gets a date and time value from a form post (HTTP POST). The incoming date string is expected to be XML formatted (like “2003-09-26T13:30:00”)&quot;</summary> 
 public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_description { get { return T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.description"); } } 
 /// <summary>&quot;The value to use if the post did not contain the specified parameter name.&quot;</summary> 
 public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_param_FallbackValue_help { get { return T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_param_FallbackValue_label { get { return T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.param.FallbackValue.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_param_ParameterName_help { get { return T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.param.ParameterName.help"); } } 
 /// <summary>&quot;Parameter name&quot;</summary> 
 public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_param_ParameterName_label { get { return T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.param.ParameterName.label"); } } 
 /// <summary>&quot;Gets a boolean value from a Url parameter (HTTP GET)&quot;</summary> 
 public static string Composite_Web_Request_QueryStringBoolValue_description { get { return T("Composite.Web.Request.QueryStringBoolValue.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_QueryStringBoolValue_param_FallbackValue_help { get { return T("Composite.Web.Request.QueryStringBoolValue.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_QueryStringBoolValue_param_FallbackValue_label { get { return T("Composite.Web.Request.QueryStringBoolValue.param.FallbackValue.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_QueryStringBoolValue_param_ParameterName_help { get { return T("Composite.Web.Request.QueryStringBoolValue.param.ParameterName.help"); } } 
 /// <summary>&quot;Parameter name&quot;</summary> 
 public static string Composite_Web_Request_QueryStringBoolValue_param_ParameterName_label { get { return T("Composite.Web.Request.QueryStringBoolValue.param.ParameterName.label"); } } 
 /// <summary>&quot;Gets a decimal value from a Url parameter (HTTP GET)&quot;</summary> 
 public static string Composite_Web_Request_QueryStringDecimalValue_description { get { return T("Composite.Web.Request.QueryStringDecimalValue.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_QueryStringDecimalValue_param_FallbackValue_help { get { return T("Composite.Web.Request.QueryStringDecimalValue.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_QueryStringDecimalValue_param_FallbackValue_label { get { return T("Composite.Web.Request.QueryStringDecimalValue.param.FallbackValue.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_QueryStringDecimalValue_param_ParameterName_help { get { return T("Composite.Web.Request.QueryStringDecimalValue.param.ParameterName.help"); } } 
 /// <summary>&quot;Parameter name&quot;</summary> 
 public static string Composite_Web_Request_QueryStringDecimalValue_param_ParameterName_label { get { return T("Composite.Web.Request.QueryStringDecimalValue.param.ParameterName.label"); } } 
 /// <summary>&quot;Gets a Guid value from a Url parameter (HTTP GET)&quot;</summary> 
 public static string Composite_Web_Request_QueryStringGuidValue_description { get { return T("Composite.Web.Request.QueryStringGuidValue.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_QueryStringGuidValue_param_FallbackValue_help { get { return T("Composite.Web.Request.QueryStringGuidValue.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_QueryStringGuidValue_param_FallbackValue_label { get { return T("Composite.Web.Request.QueryStringGuidValue.param.FallbackValue.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_QueryStringGuidValue_param_ParameterName_help { get { return T("Composite.Web.Request.QueryStringGuidValue.param.ParameterName.help"); } } 
 /// <summary>&quot;Parameter name&quot;</summary> 
 public static string Composite_Web_Request_QueryStringGuidValue_param_ParameterName_label { get { return T("Composite.Web.Request.QueryStringGuidValue.param.ParameterName.label"); } } 
 /// <summary>&quot;Gets an integer value from a Url parameter (HTTP GET)&quot;</summary> 
 public static string Composite_Web_Request_QueryStringIntegerValue_description { get { return T("Composite.Web.Request.QueryStringIntegerValue.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_QueryStringIntegerValue_param_FallbackValue_help { get { return T("Composite.Web.Request.QueryStringIntegerValue.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_QueryStringIntegerValue_param_FallbackValue_label { get { return T("Composite.Web.Request.QueryStringIntegerValue.param.FallbackValue.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_QueryStringIntegerValue_param_ParameterName_help { get { return T("Composite.Web.Request.QueryStringIntegerValue.param.ParameterName.help"); } } 
 /// <summary>&quot;Parameter name&quot;</summary> 
 public static string Composite_Web_Request_QueryStringIntegerValue_param_ParameterName_label { get { return T("Composite.Web.Request.QueryStringIntegerValue.param.ParameterName.label"); } } 
 /// <summary>&quot;Gets a string value from a Url parameter (HTTP GET)&quot;</summary> 
 public static string Composite_Web_Request_QueryStringValue_description { get { return T("Composite.Web.Request.QueryStringValue.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_QueryStringValue_param_FallbackValue_help { get { return T("Composite.Web.Request.QueryStringValue.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_QueryStringValue_param_FallbackValue_label { get { return T("Composite.Web.Request.QueryStringValue.param.FallbackValue.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_QueryStringValue_param_ParameterName_help { get { return T("Composite.Web.Request.QueryStringValue.param.ParameterName.help"); } } 
 /// <summary>&quot;Parameter name&quot;</summary> 
 public static string Composite_Web_Request_QueryStringValue_param_ParameterName_label { get { return T("Composite.Web.Request.QueryStringValue.param.ParameterName.label"); } } 
 /// <summary>&quot;Gets a date and time value from a Url parameter (HTTP GET). The incoming date string is expected to be XML formatted (like “2003-09-26T13:30:00”)&quot;</summary> 
 public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_description { get { return T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.description"); } } 
 /// <summary>&quot;The value to use if the Url did not contain the specified parameter name.&quot;</summary> 
 public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_param_FallbackValue_help { get { return T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_param_FallbackValue_label { get { return T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.param.FallbackValue.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_param_ParameterName_help { get { return T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.param.ParameterName.help"); } } 
 /// <summary>&quot;Parameter name&quot;</summary> 
 public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_param_ParameterName_label { get { return T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.param.ParameterName.label"); } } 
 /// <summary>&quot;Returns additional information passed in a URL along with the page link.&quot;</summary> 
 public static string Composite_Web_Request_PathInfo_description { get { return T("Composite.Web.Request.PathInfo.description"); } } 
 /// <summary>&quot;The segment of the path info to retrieve, using the format &apos;/(0)/(1)/(2)/...&apos;. Specify -1 to get the entire string.&quot;</summary> 
 public static string Composite_Web_Request_PathInfo_param_Segment_help { get { return T("Composite.Web.Request.PathInfo.param.Segment.help"); } } 
 /// <summary>&quot;Segment&quot;</summary> 
 public static string Composite_Web_Request_PathInfo_param_Segment_label { get { return T("Composite.Web.Request.PathInfo.param.Segment.label"); } } 
 /// <summary>&quot;When true, any path info string will be accepted. Default is true.&quot;</summary> 
 public static string Composite_Web_Request_PathInfo_param_AutoApprove_help { get { return T("Composite.Web.Request.PathInfo.param.AutoApprove.help"); } } 
 /// <summary>&quot;AutoApprove&quot;</summary> 
 public static string Composite_Web_Request_PathInfo_param_AutoApprove_label { get { return T("Composite.Web.Request.PathInfo.param.AutoApprove.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_PathInfo_param_FallbackValue_help { get { return T("Composite.Web.Request.PathInfo.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_PathInfo_param_FallbackValue_label { get { return T("Composite.Web.Request.PathInfo.param.FallbackValue.label"); } } 
 /// <summary>&quot;Extracts an integer value from a PathInfo segment.&quot;</summary> 
 public static string Composite_Web_Request_PathInfoInt_description { get { return T("Composite.Web.Request.PathInfoInt.description"); } } 
 /// <summary>&quot;The segment of the path info to retrieve, using the format &apos;/(0)/(1)/(2)/...&apos;.&quot;</summary> 
 public static string Composite_Web_Request_PathInfoInt_param_Segment_help { get { return T("Composite.Web.Request.PathInfoInt.param.Segment.help"); } } 
 /// <summary>&quot;Segment&quot;</summary> 
 public static string Composite_Web_Request_PathInfoInt_param_Segment_label { get { return T("Composite.Web.Request.PathInfoInt.param.Segment.label"); } } 
 /// <summary>&quot;When true, any path info string will be accepted. Default is true.&quot;</summary> 
 public static string Composite_Web_Request_PathInfoInt_param_AutoApprove_help { get { return T("Composite.Web.Request.PathInfoInt.param.AutoApprove.help"); } } 
 /// <summary>&quot;AutoApprove&quot;</summary> 
 public static string Composite_Web_Request_PathInfoInt_param_AutoApprove_label { get { return T("Composite.Web.Request.PathInfoInt.param.AutoApprove.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_PathInfoInt_param_FallbackValue_help { get { return T("Composite.Web.Request.PathInfoInt.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_PathInfoInt_param_FallbackValue_label { get { return T("Composite.Web.Request.PathInfoInt.param.FallbackValue.label"); } } 
 /// <summary>&quot;Extracts a GUID from a PathInfo segment.&quot;</summary> 
 public static string Composite_Web_Request_PathInfoGuid_description { get { return T("Composite.Web.Request.PathInfoGuid.description"); } } 
 /// <summary>&quot;The segment of the path info to retrieve, using the format &apos;/(0)/(1)/(2)/...&apos;. &quot;</summary> 
 public static string Composite_Web_Request_PathInfoGuid_param_Segment_help { get { return T("Composite.Web.Request.PathInfoGuid.param.Segment.help"); } } 
 /// <summary>&quot;Segment&quot;</summary> 
 public static string Composite_Web_Request_PathInfoGuid_param_Segment_label { get { return T("Composite.Web.Request.PathInfoGuid.param.Segment.label"); } } 
 /// <summary>&quot;When true, accept any path info string will be accepted. Default is true.&quot;</summary> 
 public static string Composite_Web_Request_PathInfoGuid_param_AutoApprove_help { get { return T("Composite.Web.Request.PathInfoGuid.param.AutoApprove.help"); } } 
 /// <summary>&quot;AutoApprove&quot;</summary> 
 public static string Composite_Web_Request_PathInfoGuid_param_AutoApprove_label { get { return T("Composite.Web.Request.PathInfoGuid.param.AutoApprove.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_PathInfoGuid_param_FallbackValue_help { get { return T("Composite.Web.Request.PathInfoGuid.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_PathInfoGuid_param_FallbackValue_label { get { return T("Composite.Web.Request.PathInfoGuid.param.FallbackValue.label"); } } 
 /// <summary>&quot;Notifies the system of PathInfo being used, so that the request is not redirected to the &apos;Page not found&apos; page.&quot;</summary> 
 public static string Composite_Web_Request_RegisterPathInfoUsage_description { get { return T("Composite.Web.Request.RegisterPathInfoUsage.description"); } } 
 /// <summary>&quot;Retrieves a variable from the current users session as a string.&quot;</summary> 
 public static string Composite_Web_Request_SessionVariable_description { get { return T("Composite.Web.Request.SessionVariable.description"); } } 
 /// <summary>&quot;The value to use if the session variable was not found&quot;</summary> 
 public static string Composite_Web_Request_SessionVariable_param_FallbackValue_help { get { return T("Composite.Web.Request.SessionVariable.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Request_SessionVariable_param_FallbackValue_label { get { return T("Composite.Web.Request.SessionVariable.param.FallbackValue.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Request_SessionVariable_param_VariableName_help { get { return T("Composite.Web.Request.SessionVariable.param.VariableName.help"); } } 
 /// <summary>&quot;Variable name&quot;</summary> 
 public static string Composite_Web_Request_SessionVariable_param_VariableName_label { get { return T("Composite.Web.Request.SessionVariable.param.VariableName.label"); } } 
 /// <summary>&quot;Redirects the website visitor to another URL. URL redirects are suppressed when this function executes inside the C1 console.&quot;</summary> 
 public static string Composite_Web_Response_Redirect_description { get { return T("Composite.Web.Response.Redirect.description"); } } 
 /// <summary>&quot;The URL the user should be redirected to, either absolute (http://contoso.com/default.aspx) or relative (/Login.aspx)).&quot;</summary> 
 public static string Composite_Web_Response_Redirect_param_Url_help { get { return T("Composite.Web.Response.Redirect.param.Url.help"); } } 
 /// <summary>&quot;URL&quot;</summary> 
 public static string Composite_Web_Response_Redirect_param_Url_label { get { return T("Composite.Web.Response.Redirect.param.Url.label"); } } 
 /// <summary>&quot;Sets a cookie value for the current user&quot;</summary> 
 public static string Composite_Web_Response_SetCookieValue_description { get { return T("Composite.Web.Response.SetCookieValue.description"); } } 
 /// <summary>&quot;The name of the cookie to set / overwrite&quot;</summary> 
 public static string Composite_Web_Response_SetCookieValue_param_CookieName_help { get { return T("Composite.Web.Response.SetCookieValue.param.CookieName.help"); } } 
 /// <summary>&quot;Cookie name&quot;</summary> 
 public static string Composite_Web_Response_SetCookieValue_param_CookieName_label { get { return T("Composite.Web.Response.SetCookieValue.param.CookieName.label"); } } 
 /// <summary>&quot;The value to store in the cookie&quot;</summary> 
 public static string Composite_Web_Response_SetCookieValue_param_Value_help { get { return T("Composite.Web.Response.SetCookieValue.param.Value.help"); } } 
 /// <summary>&quot;Cookie value&quot;</summary> 
 public static string Composite_Web_Response_SetCookieValue_param_Value_label { get { return T("Composite.Web.Response.SetCookieValue.param.Value.label"); } } 
 /// <summary>&quot;When the cookie should expire (stop to exist). The default value is &apos;session&apos;, when the user closes the browser.&quot;</summary> 
 public static string Composite_Web_Response_SetCookieValue_param_Expires_help { get { return T("Composite.Web.Response.SetCookieValue.param.Expires.help"); } } 
 /// <summary>&quot;Expiration&quot;</summary> 
 public static string Composite_Web_Response_SetCookieValue_param_Expires_label { get { return T("Composite.Web.Response.SetCookieValue.param.Expires.label"); } } 
 /// <summary>&quot;Sets the maximum number of seconds the current page should be publicly cached on the server. To ensure that the page response is not cached set the &quot;Maximum seconds&quot; to &quot;0&quot;. If multiple sources set the server cache duration, the smallest number is used. Note that the file &quot;~/Renderers/Page.aspx&quot; contains a default value for cache duration – you can edit this file to change the default.&quot;</summary> 
 public static string Composite_Web_Response_SetServerPageCacheDuration_description { get { return T("Composite.Web.Response.SetServerPageCacheDuration.description"); } } 
 /// <summary>&quot;The maximum number of seconds the page currently being rendered should be publicly cached. A high value yield good performance, a low value make changes show up faster. A value of &apos;0&apos; ensure that all visitors get a unique response.&quot;</summary> 
 public static string Composite_Web_Response_SetServerPageCacheDuration_param_MaxSeconds_help { get { return T("Composite.Web.Response.SetServerPageCacheDuration.param.MaxSeconds.help"); } } 
 /// <summary>&quot;Maximum seconds&quot;</summary> 
 public static string Composite_Web_Response_SetServerPageCacheDuration_param_MaxSeconds_label { get { return T("Composite.Web.Response.SetServerPageCacheDuration.param.MaxSeconds.label"); } } 
 /// <summary>&quot;Sets a session variable for the current user&quot;</summary> 
 public static string Composite_Web_Response_SetSessionVariable_description { get { return T("Composite.Web.Response.SetSessionVariable.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Response_SetSessionVariable_param_Value_help { get { return T("Composite.Web.Response.SetSessionVariable.param.Value.help"); } } 
 /// <summary>&quot;Value&quot;</summary> 
 public static string Composite_Web_Response_SetSessionVariable_param_Value_label { get { return T("Composite.Web.Response.SetSessionVariable.param.Value.label"); } } 
 /// <summary>&quot;The name of the session variable to set.&quot;</summary> 
 public static string Composite_Web_Response_SetSessionVariable_param_VariableName_help { get { return T("Composite.Web.Response.SetSessionVariable.param.VariableName.help"); } } 
 /// <summary>&quot;Variable name&quot;</summary> 
 public static string Composite_Web_Response_SetSessionVariable_param_VariableName_label { get { return T("Composite.Web.Response.SetSessionVariable.param.VariableName.label"); } } 
 /// <summary>&quot;Gets the web application virtual path. Typically this is &apos;&apos; - the empty string, when running in the website root, but if {applicationname} is running in a sub folder this can be &apos;/MySubfolder&apos;. You can use this value to prefix URL&apos;s so they will work no matter is {applicationname} is running is a subfolder or not. Sample XSLT usage: &lt;img src=&quot;{/in:inputs/in:result[@name=&apos;ApplicationPath&apos;]}/images/myImage.png&quot; /&gt;&quot;</summary> 
 public static string Composite_Web_Server_ApplicationPath_description { get { return T("Composite.Web.Server.ApplicationPath.description"); } } 
 /// <summary>&quot;Gets an IIS application variable&quot;</summary> 
 public static string Composite_Web_Server_ApplicationVariable_description { get { return T("Composite.Web.Server.ApplicationVariable.description"); } } 
 /// <summary>&quot;Value to use if the application variable was not located&quot;</summary> 
 public static string Composite_Web_Server_ApplicationVariable_param_FallbackValue_help { get { return T("Composite.Web.Server.ApplicationVariable.param.FallbackValue.help"); } } 
 /// <summary>&quot;Fallback value&quot;</summary> 
 public static string Composite_Web_Server_ApplicationVariable_param_FallbackValue_label { get { return T("Composite.Web.Server.ApplicationVariable.param.FallbackValue.label"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Web_Server_ApplicationVariable_param_VariableName_help { get { return T("Composite.Web.Server.ApplicationVariable.param.VariableName.help"); } } 
 /// <summary>&quot;Variable name&quot;</summary> 
 public static string Composite_Web_Server_ApplicationVariable_param_VariableName_label { get { return T("Composite.Web.Server.ApplicationVariable.param.VariableName.label"); } } 
 /// <summary>&quot;Gets the value of an IIS Server variable&quot;</summary> 
 public static string Composite_Web_Server_ServerVariable_description { get { return T("Composite.Web.Server.ServerVariable.description"); } } 
 /// <summary>&quot;The IIS Server variable to get.&quot;</summary> 
 public static string Composite_Web_Server_ServerVariable_param_VariableName_help { get { return T("Composite.Web.Server.ServerVariable.param.VariableName.help"); } } 
 /// <summary>&quot;Variable name&quot;</summary> 
 public static string Composite_Web_Server_ServerVariable_param_VariableName_label { get { return T("Composite.Web.Server.ServerVariable.param.VariableName.label"); } } 
 /// <summary>&quot;Loads a local XML file given a relative path&quot;</summary> 
 public static string Composite_Xml_LoadFile_description { get { return T("Composite.Xml.LoadFile.description"); } } 
 /// <summary>&quot;The relative path of the XML file to load&quot;</summary> 
 public static string Composite_Xml_LoadFile_param_RelativePath_help { get { return T("Composite.Xml.LoadFile.param.RelativePath.help"); } } 
 /// <summary>&quot;Relative path&quot;</summary> 
 public static string Composite_Xml_LoadFile_param_RelativePath_label { get { return T("Composite.Xml.LoadFile.param.RelativePath.label"); } } 
 /// <summary>&quot;Loads a local XHTML file given a relative path&quot;</summary> 
 public static string Composite_Xml_LoadXhtmlFile_description { get { return T("Composite.Xml.LoadXhtmlFile.description"); } } 
 /// <summary>&quot;The relative path of the XHTML file to load&quot;</summary> 
 public static string Composite_Xml_LoadXhtmlFile_param_RelativePath_help { get { return T("Composite.Xml.LoadXhtmlFile.param.RelativePath.help"); } } 
 /// <summary>&quot;Relative path&quot;</summary> 
 public static string Composite_Xml_LoadXhtmlFile_param_RelativePath_label { get { return T("Composite.Xml.LoadXhtmlFile.param.RelativePath.label"); } } 
 /// <summary>&quot;Loads a remote XML file given a Url&quot;</summary> 
 public static string Composite_Xml_LoadUrl_description { get { return T("Composite.Xml.LoadUrl.description"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string Composite_Xml_LoadUrl_param_Url_help { get { return T("Composite.Xml.LoadUrl.param.Url.help"); } } 
 /// <summary>&quot;Url&quot;</summary> 
 public static string Composite_Xml_LoadUrl_param_Url_label { get { return T("Composite.Xml.LoadUrl.param.Url.label"); } } 
 /// <summary>&quot;Time period in seconds for which the result should is cached. Default is 0 (no caching).&quot;</summary> 
 public static string Composite_Xml_LoadUrl_param_CacheTime_help { get { return T("Composite.Xml.LoadUrl.param.CacheTime.help"); } } 
 /// <summary>&quot;Seconds to cache&quot;</summary> 
 public static string Composite_Xml_LoadUrl_param_CacheTime_label { get { return T("Composite.Xml.LoadUrl.param.CacheTime.label"); } } 
 /// <summary>&quot;Provides localized date formatting functions for XSLT use. &quot;</summary> 
 public static string Composite_Xslt_Extensions_DateFormatting_description { get { return T("Composite.Xslt.Extensions.DateFormatting.description"); } } 
 /// <summary>&quot;Provides globalization functions for XSLT use.&quot;</summary> 
 public static string Composite_Xslt_Extensions_Globalization_description { get { return T("Composite.Xslt.Extensions.Globalization.description"); } } 
 /// <summary>&quot;Provides functions that parse encoded XML documents or XHTML fragments into nodes. Use this extension when you have XML or XHTML as a string and need to copy it to the output or do transformations on it.&quot;</summary> 
 public static string Composite_Xslt_Extensions_MarkupParser_description { get { return T("Composite.Xslt.Extensions.MarkupParser.description"); } } 
 /// <summary>&quot;Sends an e-mail. Remember to configure SMTP server connection in the web.config file.&quot;</summary> 
 public static string Composite_Mail_SendMail_description { get { return T("Composite.Mail.SendMail.description"); } } 
 /// <summary>&quot;From&quot;</summary> 
 public static string Composite_Mail_SendMail_param_From_label { get { return T("Composite.Mail.SendMail.param.From.label"); } } 
 /// <summary>&quot;Sender&apos;s address.&quot;</summary> 
 public static string Composite_Mail_SendMail_param_From_help { get { return T("Composite.Mail.SendMail.param.From.help"); } } 
 /// <summary>&quot;To&quot;</summary> 
 public static string Composite_Mail_SendMail_param_To_label { get { return T("Composite.Mail.SendMail.param.To.label"); } } 
 /// <summary>&quot;Recipient. A list of comma separated email addresses.&quot;</summary> 
 public static string Composite_Mail_SendMail_param_To_help { get { return T("Composite.Mail.SendMail.param.To.help"); } } 
 /// <summary>&quot;Subject&quot;</summary> 
 public static string Composite_Mail_SendMail_param_Subject_label { get { return T("Composite.Mail.SendMail.param.Subject.label"); } } 
 /// <summary>&quot;Email subject.&quot;</summary> 
 public static string Composite_Mail_SendMail_param_Subject_help { get { return T("Composite.Mail.SendMail.param.Subject.help"); } } 
 /// <summary>&quot;Body&quot;</summary> 
 public static string Composite_Mail_SendMail_param_Body_label { get { return T("Composite.Mail.SendMail.param.Body.label"); } } 
 /// <summary>&quot;Email body.&quot;</summary> 
 public static string Composite_Mail_SendMail_param_Body_help { get { return T("Composite.Mail.SendMail.param.Body.help"); } } 
 /// <summary>&quot;IsHtml&quot;</summary> 
 public static string Composite_Mail_SendMail_param_IsHtml_label { get { return T("Composite.Mail.SendMail.param.IsHtml.label"); } } 
 /// <summary>&quot;Defines whether email to be sent is an HTML email or a text email.&quot;</summary> 
 public static string Composite_Mail_SendMail_param_IsHtml_help { get { return T("Composite.Mail.SendMail.param.IsHtml.help"); } } 
 /// <summary>&quot;CC&quot;</summary> 
 public static string Composite_Mail_SendMail_param_CC_label { get { return T("Composite.Mail.SendMail.param.CC.label"); } } 
 /// <summary>&quot;Carbon Copy. A list of comma separated email addresses that are secondary recipients of a message.&quot;</summary> 
 public static string Composite_Mail_SendMail_param_CC_help { get { return T("Composite.Mail.SendMail.param.CC.help"); } } 
 /// <summary>&quot;ReplyTo&quot;</summary> 
 public static string Composite_Mail_SendMail_param_ReplyTo_label { get { return T("Composite.Mail.SendMail.param.ReplyTo.label"); } } 
 /// <summary>&quot;Address that should be used to reply to the message.&quot;</summary> 
 public static string Composite_Mail_SendMail_param_ReplyTo_help { get { return T("Composite.Mail.SendMail.param.ReplyTo.help"); } } 
 /// <summary>&quot;BCC&quot;</summary> 
 public static string Composite_Mail_SendMail_param_BCC_label { get { return T("Composite.Mail.SendMail.param.BCC.label"); } } 
 /// <summary>&quot;Blind Carbon Copy. A list of recipients which will receive a mail but their individual email addresses will be concealed from the complete list of recipients.&quot;</summary> 
 public static string Composite_Mail_SendMail_param_BCC_help { get { return T("Composite.Mail.SendMail.param.BCC.help"); } } 
 /// <summary>&quot;Attachment&quot;</summary> 
 public static string Composite_Mail_SendMail_param_Attachment_label { get { return T("Composite.Mail.SendMail.param.Attachment.label"); } } 
 /// <summary>&quot;List of attached files. \n     Format it the following [{name}=]{filepath}[,{mime-type] [ | .... ].  \n     File path can be either relative or absolute path f.e. &quot;C:\someimage.jpg&quot; or &quot;/coolpicture.jpg&quot;  \n     If file path starts with &quot;Composite/&quot;, it will be recognized as a path to Composite media, f.e. &apos;Composite/MediaArchive:someImage.gif&apos; \n      \n     Examples:  \n        /attachment.jpg \n       image.jpg=/attachment.jpg \n       image.jpg=/attachment.jpg,image/jpg \n       image1.jpg=/attachment1.jpg,image/jpg|image2.jpg=/attachment2.jpg,image/jpg&quot;</summary> 
 public static string Composite_Mail_SendMail_param_Attachment_help { get { return T("Composite.Mail.SendMail.param.Attachment.help"); } } 
 /// <summary>&quot;AttachmentFromMedia&quot;</summary> 
 public static string Composite_Mail_SendMail_param_AttachmentFromMedia_label { get { return T("Composite.Mail.SendMail.param.AttachmentFromMedia.label"); } } 
 /// <summary>&quot;A file from media library to be attached.&quot;</summary> 
 public static string Composite_Mail_SendMail_param_AttachmentFromMedia_help { get { return T("Composite.Mail.SendMail.param.AttachmentFromMedia.help"); } } 
 /// <summary>&quot;Filters images by it&apos;s folder path&quot;</summary> 
 public static string Composite_Data_Types_IImageFile_MediaFolderFilter_description { get { return T("Composite.Data.Types.IImageFile.MediaFolderFilter.description"); } } 
 /// <summary>&quot;Media Folder&quot;</summary> 
 public static string Composite_Data_Types_IImageFile_MediaFolderFilter_param_MediaFolder_label { get { return T("Composite.Data.Types.IImageFile.MediaFolderFilter.param.MediaFolder.label"); } } 
 /// <summary>&quot;A reference to a media folder&quot;</summary> 
 public static string Composite_Data_Types_IImageFile_MediaFolderFilter_param_MediaFolder_help { get { return T("Composite.Data.Types.IImageFile.MediaFolderFilter.param.MediaFolder.help"); } } 
 /// <summary>&quot;Include Subfolders&quot;</summary> 
 public static string Composite_Data_Types_IImageFile_MediaFolderFilter_param_IncludeSubfolders_label { get { return T("Composite.Data.Types.IImageFile.MediaFolderFilter.param.IncludeSubfolders.label"); } } 
 /// <summary>&quot;Determines whether images from subfolders should be included.&quot;</summary> 
 public static string Composite_Data_Types_IImageFile_MediaFolderFilter_param_IncludeSubfolders_help { get { return T("Composite.Data.Types.IImageFile.MediaFolderFilter.param.IncludeSubfolders.help"); } } 
 /// <summary>&quot;Filters images by it&apos;s folder path&quot;</summary> 
 public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_description { get { return T("Composite.Data.Types.IMediaFile.MediaFolderFilter.description"); } } 
 /// <summary>&quot;Media Folder&quot;</summary> 
 public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_param_MediaFolder_label { get { return T("Composite.Data.Types.IMediaFile.MediaFolderFilter.param.MediaFolder.label"); } } 
 /// <summary>&quot;A reference to a media folder&quot;</summary> 
 public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_param_MediaFolder_help { get { return T("Composite.Data.Types.IMediaFile.MediaFolderFilter.param.MediaFolder.help"); } } 
 /// <summary>&quot;Include Subfolders&quot;</summary> 
 public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_param_IncludeSubfolders_label { get { return T("Composite.Data.Types.IMediaFile.MediaFolderFilter.param.IncludeSubfolders.label"); } } 
 /// <summary>&quot;Determines whether media files from subfolders should be included.&quot;</summary> 
 public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_param_IncludeSubfolders_help { get { return T("Composite.Data.Types.IMediaFile.MediaFolderFilter.param.IncludeSubfolders.help"); } } 
 /// <summary>&quot;Converts an enumerable of XElements to a Dictionary using named attributes for keys and values.&quot;</summary> 
 public static string Composite_Utils_Dictionary_XElementsToDictionary_description { get { return T("Composite.Utils.Dictionary.XElementsToDictionary.description"); } } 
 /// <summary>&quot;XElements&quot;</summary> 
 public static string Composite_Utils_Dictionary_XElementsToDictionary_param_XElements_label { get { return T("Composite.Utils.Dictionary.XElementsToDictionary.param.XElements.label"); } } 
 /// <summary>&quot;An enumerable of XElements that will be used to create a dictionary from.&quot;</summary> 
 public static string Composite_Utils_Dictionary_XElementsToDictionary_param_XElements_help { get { return T("Composite.Utils.Dictionary.XElementsToDictionary.param.XElements.help"); } } 
 /// <summary>&quot;Key Attribute Name&quot;</summary> 
 public static string Composite_Utils_Dictionary_XElementsToDictionary_param_KeyAttributeName_label { get { return T("Composite.Utils.Dictionary.XElementsToDictionary.param.KeyAttributeName.label"); } } 
 /// <summary>&quot;The name of the attribute on each XElement which value will be used for keys in the dictionary.&quot;</summary> 
 public static string Composite_Utils_Dictionary_XElementsToDictionary_param_KeyAttributeName_help { get { return T("Composite.Utils.Dictionary.XElementsToDictionary.param.KeyAttributeName.help"); } } 
 /// <summary>&quot;Value Attribute Name&quot;</summary> 
 public static string Composite_Utils_Dictionary_XElementsToDictionary_param_ValueAttributeName_label { get { return T("Composite.Utils.Dictionary.XElementsToDictionary.param.ValueAttributeName.label"); } } 
 /// <summary>&quot;The name of the attribute on each XElement which value will be used for values in the dictionary.&quot;</summary> 
 public static string Composite_Utils_Dictionary_XElementsToDictionary_param_ValueAttributeName_help { get { return T("Composite.Utils.Dictionary.XElementsToDictionary.param.ValueAttributeName.help"); } } 
 /// <summary>&quot;Converts an enumerable of objects to a Dictionary using named property names for keys and values.&quot;</summary> 
 public static string Composite_Utils_Dictionary_EnumerableToDictionary_description { get { return T("Composite.Utils.Dictionary.EnumerableToDictionary.description"); } } 
 /// <summary>&quot;Objects&quot;</summary> 
 public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_Elements_label { get { return T("Composite.Utils.Dictionary.EnumerableToDictionary.param.Elements.label"); } } 
 /// <summary>&quot;An enumerable of objects that will be used to create a dictionary from.&quot;</summary> 
 public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_Elements_help { get { return T("Composite.Utils.Dictionary.EnumerableToDictionary.param.Elements.help"); } } 
 /// <summary>&quot;Key Property Name&quot;</summary> 
 public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_KeyPropertyName_label { get { return T("Composite.Utils.Dictionary.EnumerableToDictionary.param.KeyPropertyName.label"); } } 
 /// <summary>&quot;The name of the property on each object which value will be used for keys in the dictionary.&quot;</summary> 
 public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_KeyPropertyName_help { get { return T("Composite.Utils.Dictionary.EnumerableToDictionary.param.KeyPropertyName.help"); } } 
 /// <summary>&quot;Value Property Name&quot;</summary> 
 public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_ValuePropertyName_label { get { return T("Composite.Utils.Dictionary.EnumerableToDictionary.param.ValuePropertyName.label"); } } 
 /// <summary>&quot;The name of the property on each object which value will be used for values in the dictionary.&quot;</summary> 
 public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_ValuePropertyName_help { get { return T("Composite.Utils.Dictionary.EnumerableToDictionary.param.ValuePropertyName.help"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.StandardFunctions", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_UserControlFunction {
 /// <summary>&quot;User Control Functions&quot;</summary> 
 public static string RootElement_Label { get { return T("RootElement.Label"); } } 
 /// <summary>&quot;Functions based on .ascx controls&quot;</summary> 
 public static string RootElement_ToolTip { get { return T("RootElement.ToolTip"); } } 
 /// <summary>&quot;Add User Control Function&quot;</summary> 
 public static string AddNewUserControlFunction_Label { get { return T("AddNewUserControlFunction.Label"); } } 
 /// <summary>&quot;Add a new User Control function&quot;</summary> 
 public static string AddNewUserControlFunction_ToolTip { get { return T("AddNewUserControlFunction.ToolTip"); } } 
 /// <summary>&quot;Edit&quot;</summary> 
 public static string EditUserControlFunction_Label { get { return T("EditUserControlFunction.Label"); } } 
 /// <summary>&quot;Edit the User Control Function&quot;</summary> 
 public static string EditUserControlFunction_ToolTip { get { return T("EditUserControlFunction.ToolTip"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string DeleteUserControlFunction_Label { get { return T("DeleteUserControlFunction.Label"); } } 
 /// <summary>&quot;Delete the User Control function&quot;</summary> 
 public static string DeleteUserControlFunction_ToolTip { get { return T("DeleteUserControlFunction.ToolTip"); } } 
 /// <summary>&quot;Add User Control Function&quot;</summary> 
 public static string AddNewUserControlFunction_LabelDialog { get { return T("AddNewUserControlFunction.LabelDialog"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string AddNewUserControlFunction_LabelName { get { return T("AddNewUserControlFunction.LabelName"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewUserControlFunction_HelpName { get { return T("AddNewUserControlFunction.HelpName"); } } 
 /// <summary>&quot;Namespace&quot;</summary> 
 public static string AddNewUserControlFunction_LabelNamespace { get { return T("AddNewUserControlFunction.LabelNamespace"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewUserControlFunction_HelpNamespace { get { return T("AddNewUserControlFunction.HelpNamespace"); } } 
 /// <summary>&quot;Copy from&quot;</summary> 
 public static string AddNewUserControlFunction_LabelCopyFrom { get { return T("AddNewUserControlFunction.LabelCopyFrom"); } } 
 /// <summary>&quot;You can copy the code from another User Control function by selecting it in this list.&quot;</summary> 
 public static string AddNewUserControlFunction_LabelCopyFromHelp { get { return T("AddNewUserControlFunction.LabelCopyFromHelp"); } } 
 /// <summary>&quot;(New User Control function)&quot;</summary> 
 public static string AddNewUserControlFunction_LabelCopyFromEmptyOption { get { return T("AddNewUserControlFunction.LabelCopyFromEmptyOption"); } } 
 /// <summary>&quot;A C1 function with the same name already exists.&quot;</summary> 
 public static string AddNewUserControlFunctionWorkflow_DuplicateName { get { return T("AddNewUserControlFunctionWorkflow.DuplicateName"); } } 
 /// <summary>&quot;Function name is empty&quot;</summary> 
 public static string AddNewUserControlFunctionWorkflow_EmptyName { get { return T("AddNewUserControlFunctionWorkflow.EmptyName"); } } 
 /// <summary>&quot;Function namespace is empty&quot;</summary> 
 public static string AddNewUserControlFunctionWorkflow_NamespaceEmpty { get { return T("AddNewUserControlFunctionWorkflow.NamespaceEmpty"); } } 
 /// <summary>&quot;Namespace must be like A.B.C - not start and end with .&quot;</summary> 
 public static string AddNewUserControlFunctionWorkflow_InvalidNamespace { get { return T("AddNewUserControlFunctionWorkflow.InvalidNamespace"); } } 
 /// <summary>&quot;The total length of the name and the namespace is too long (used to name the ASCX file).&quot;</summary> 
 public static string AddNewUserControlFunctionWorkflow_TotalNameTooLang { get { return T("AddNewUserControlFunctionWorkflow.TotalNameTooLang"); } } 
 /// <summary>&quot;Validation Error&quot;</summary> 
 public static string EditUserControlFunctionWorkflow_Validation_DialogTitle { get { return T("EditUserControlFunctionWorkflow.Validation.DialogTitle"); } } 
 /// <summary>&quot;Compilation failed: {0}&quot;</summary> 
 public static string EditUserControlFunctionWorkflow_Validation_CompilationFailed(object parameter0) { return string.Format(T("EditUserControlFunctionWorkflow.Validation.CompilationFailed"), parameter0); } 
 /// <summary>&quot;The User Control function should inherit &apos;{0}&apos;&quot;</summary> 
 public static string EditUserControlFunctionWorkflow_Validation_IncorrectBaseClass(object parameter0) { return string.Format(T("EditUserControlFunctionWorkflow.Validation.IncorrectBaseClass"), parameter0); } 
 /// <summary>&quot;Delete User Control Function?&quot;</summary> 
 public static string DeleteUserControlFunctionWorkflow_ConfirmDeleteTitle { get { return T("DeleteUserControlFunctionWorkflow.ConfirmDeleteTitle"); } } 
 /// <summary>&quot;Delete the selected User Control?&quot;</summary> 
 public static string DeleteUserControlFunctionWorkflow_ConfirmDeleteMessage { get { return T("DeleteUserControlFunctionWorkflow.ConfirmDeleteMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.UserControlFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_UserGroupElementProvider {
 /// <summary>&quot;User Groups&quot;</summary> 
 public static string UserGroupElementProvider_RootLabel { get { return T("UserGroupElementProvider.RootLabel"); } } 
 /// <summary>&quot;User Groups&quot;</summary> 
 public static string UserGroupElementProvider_RootToolTip { get { return T("UserGroupElementProvider.RootToolTip"); } } 
 /// <summary>&quot;Add User Group...&quot;</summary> 
 public static string UserGroupElementProvider_AddNewUserGroupLabel { get { return T("UserGroupElementProvider.AddNewUserGroupLabel"); } } 
 /// <summary>&quot;Add new User Group&quot;</summary> 
 public static string UserGroupElementProvider_AddNewUserGroupToolTip { get { return T("UserGroupElementProvider.AddNewUserGroupToolTip"); } } 
 /// <summary>&quot;Edit User Group&quot;</summary> 
 public static string UserGroupElementProvider_EditUserGroupLabel { get { return T("UserGroupElementProvider.EditUserGroupLabel"); } } 
 /// <summary>&quot;Edit User Group&quot;</summary> 
 public static string UserGroupElementProvider_EditUserGroupToolTip { get { return T("UserGroupElementProvider.EditUserGroupToolTip"); } } 
 /// <summary>&quot;Delete User Group&quot;</summary> 
 public static string UserGroupElementProvider_DeleteUserGroupLabel { get { return T("UserGroupElementProvider.DeleteUserGroupLabel"); } } 
 /// <summary>&quot;Delete User Group&quot;</summary> 
 public static string UserGroupElementProvider_DeleteUserGroupToolTip { get { return T("UserGroupElementProvider.DeleteUserGroupToolTip"); } } 
 /// <summary>&quot;Add User Group&quot;</summary> 
 public static string AddNewUserGroup_AddNewUserGroupStep1_LabelFieldGroup { get { return T("AddNewUserGroup.AddNewUserGroupStep1.LabelFieldGroup"); } } 
 /// <summary>&quot;User group name&quot;</summary> 
 public static string AddNewUserGroup_AddNewUserGroupStep1_UserGroupNameLabel { get { return T("AddNewUserGroup.AddNewUserGroupStep1.UserGroupNameLabel"); } } 
 /// <summary>&quot;The name of the new user group&quot;</summary> 
 public static string AddNewUserGroup_AddNewUserGroupStep1_UserGroupNameHelp { get { return T("AddNewUserGroup.AddNewUserGroupStep1.UserGroupNameHelp"); } } 
 /// <summary>&quot;A user group with the same name already exists&quot;</summary> 
 public static string AddNewUserGroup_AddNewUserGroupStep1_UserGroupNameAlreadyExists { get { return T("AddNewUserGroup.AddNewUserGroupStep1.UserGroupNameAlreadyExists"); } } 
 /// <summary>&quot;Edit User Group&quot;</summary> 
 public static string EditUserGroup_EditUserGroupStep1_LabelFieldGroup { get { return T("EditUserGroup.EditUserGroupStep1.LabelFieldGroup"); } } 
 /// <summary>&quot;User group name&quot;</summary> 
 public static string EditUserGroup_EditUserGroupStep1_UserGroupNameLabel { get { return T("EditUserGroup.EditUserGroupStep1.UserGroupNameLabel"); } } 
 /// <summary>&quot;The name of the user group&quot;</summary> 
 public static string EditUserGroup_EditUserGroupStep1_UserGroupNameHelp { get { return T("EditUserGroup.EditUserGroupStep1.UserGroupNameHelp"); } } 
 /// <summary>&quot;A user group with the same name already exists&quot;</summary> 
 public static string EditUserGroup_EditUserGroupStep1_UserGroupNameAlreadyExists { get { return T("EditUserGroup.EditUserGroupStep1.UserGroupNameAlreadyExists"); } } 
 /// <summary>&quot;Perspectives&quot;</summary> 
 public static string EditUserGroup_EditUserGroupStep1_ActivePerspectiveFieldLabel { get { return T("EditUserGroup.EditUserGroupStep1.ActivePerspectiveFieldLabel"); } } 
 /// <summary>&quot;Perspectives&quot;</summary> 
 public static string EditUserGroup_EditUserGroupStep1_ActivePerspectiveMultiSelectLabel { get { return T("EditUserGroup.EditUserGroupStep1.ActivePerspectiveMultiSelectLabel"); } } 
 /// <summary>&quot;Select which perspectives the user gets access to view&quot;</summary> 
 public static string EditUserGroup_EditUserGroupStep1_ActivePerspectiveMultiSelectHelp { get { return T("EditUserGroup.EditUserGroupStep1.ActivePerspectiveMultiSelectHelp"); } } 
 /// <summary>&quot;Global permissions&quot;</summary> 
 public static string EditUserGroup_EditUserGroupStep1_GlobalPermissionsFieldLabel { get { return T("EditUserGroup.EditUserGroupStep1.GlobalPermissionsFieldLabel"); } } 
 /// <summary>&quot;Global permissions&quot;</summary> 
 public static string EditUserGroup_EditUserGroupStep1_GlobalPermissionsMultiSelectLabel { get { return T("EditUserGroup.EditUserGroupStep1.GlobalPermissionsMultiSelectLabel"); } } 
 /// <summary>&quot;The Administrate permission grants the user group access to manage user group permissions and execute other administrative tasks.  The Configure permission grants access to super user tasks.&quot;</summary> 
 public static string EditUserGroup_EditUserGroupStep1_GlobalPermissionsMultiSelectHelp { get { return T("EditUserGroup.EditUserGroupStep1.GlobalPermissionsMultiSelectHelp"); } } 
 /// <summary>&quot;User Group Has Users&quot;</summary> 
 public static string DeleteUserGroup_DeleteUserGroupInitialStep_UserGroupHasUsersTitle { get { return T("DeleteUserGroup.DeleteUserGroupInitialStep.UserGroupHasUsersTitle"); } } 
 /// <summary>&quot;You cannot delete a user group that has users.&quot;</summary> 
 public static string DeleteUserGroup_DeleteUserGroupInitialStep_UserGroupHasUsersMessage { get { return T("DeleteUserGroup.DeleteUserGroupInitialStep.UserGroupHasUsersMessage"); } } 
 /// <summary>&quot;Delete User Group&quot;</summary> 
 public static string DeleteUserGroup_DeleteUserGroupStep1_LabelFieldGroup { get { return T("DeleteUserGroup.DeleteUserGroupStep1.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete the selected user group?&quot;</summary> 
 public static string DeleteUserGroup_DeleteUserGroupStep1_Text { get { return T("DeleteUserGroup.DeleteUserGroupStep1.Text"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.UserGroupElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_VisualFunction {
 /// <summary>&quot;Delete Visual Function?&quot;</summary> 
 public static string DeleteStep1_FieldGroupLabel { get { return T("DeleteStep1.FieldGroupLabel"); } } 
 /// <summary>&quot;Are you sure you wish to delete the selected function?&quot;</summary> 
 public static string DeleteStep1_Text { get { return T("DeleteStep1.Text"); } } 
 /// <summary>&quot;Add Visual Function&quot;</summary> 
 public static string AddNew_DialogLabel { get { return T("AddNew.DialogLabel"); } } 
 /// <summary>&quot;No Datatypes to Visualize&quot;</summary> 
 public static string AddNew_NoTypesExistsErrorTitle { get { return T("AddNew.NoTypesExistsErrorTitle"); } } 
 /// <summary>&quot;No datatypes have been created yet. You must first create a datatype to visualize before you can create a visualization.&quot;</summary> 
 public static string AddNew_NoTypesExistsErrorMessage { get { return T("AddNew.NoTypesExistsErrorMessage"); } } 
 /// <summary>&quot;No Data to Visualize and Preview&quot;</summary> 
 public static string AddNew_NoDataExistsErrorTitle { get { return T("AddNew.NoDataExistsErrorTitle"); } } 
 /// <summary>&quot;Data must exist before you can create a rendering. Add some data to this type and try again.&quot;</summary> 
 public static string AddNew_NoDataExistsErrorMessage { get { return T("AddNew.NoDataExistsErrorMessage"); } } 
 /// <summary>&quot;No Templates&quot;</summary> 
 public static string AddNew_NoPageTemplatesExistsErrorTitle { get { return T("AddNew.NoPageTemplatesExistsErrorTitle"); } } 
 /// <summary>&quot;At least one template must exist before you can create a rendering. Create one template and try again.&quot;</summary> 
 public static string AddNew_NoPageTemplatesExistsErrorMessage { get { return T("AddNew.NoPageTemplatesExistsErrorMessage"); } } 
 /// <summary>&quot;A Language Is Required&quot;</summary> 
 public static string AddNew_MissingActiveLanguageTitle { get { return T("AddNew.MissingActiveLanguageTitle"); } } 
 /// <summary>&quot;To create a visual function a language is required, but no languages have been added yet. You can add one under the System perspective.&quot;</summary> 
 public static string AddNew_MissingActiveLanguageMessage { get { return T("AddNew.MissingActiveLanguageMessage"); } } 
 /// <summary>&quot;Datatype&quot;</summary> 
 public static string AddNewStep1_TypeSelectorLabel { get { return T("AddNewStep1.TypeSelectorLabel"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewStep1_TypeSelectorHelp { get { return T("AddNewStep1.TypeSelectorHelp"); } } 
 /// <summary>&quot;Function name&quot;</summary> 
 public static string AddNewStep2_FuncitonNameLabel { get { return T("AddNewStep2.FuncitonNameLabel"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewStep2_FuncitonNameHelp { get { return T("AddNewStep2.FuncitonNameHelp"); } } 
 /// <summary>&quot;Function namespace&quot;</summary> 
 public static string AddNewStep2_FuncitonNamespaceLabel { get { return T("AddNewStep2.FuncitonNamespaceLabel"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewStep2_FuncitonNamespaceHelp { get { return T("AddNewStep2.FuncitonNamespaceHelp"); } } 
 /// <summary>&quot;Visual Function Settings&quot;</summary> 
 public static string Edit_PlaceHolderLabel { get { return T("Edit.PlaceHolderLabel"); } } 
 /// <summary>&quot;Visual function&quot;</summary> 
 public static string Edit_HeadingTitel { get { return T("Edit.HeadingTitel"); } } 
 /// <summary>&quot;Visual function settings&quot;</summary> 
 public static string Edit_FieldGroupLabel { get { return T("Edit.FieldGroupLabel"); } } 
 /// <summary>&quot;Function name&quot;</summary> 
 public static string Edit_FunctionNameLabel { get { return T("Edit.FunctionNameLabel"); } } 
 /// <summary>&quot;The name of the function. Names must be unique with a namespace.&quot;</summary> 
 public static string Edit_FunctionNameHelp { get { return T("Edit.FunctionNameHelp"); } } 
 /// <summary>&quot;Function namespace&quot;</summary> 
 public static string Edit_FunctionNamespaceLabel { get { return T("Edit.FunctionNamespaceLabel"); } } 
 /// <summary>&quot;The &apos;package&apos; this function belongs to.&quot;</summary> 
 public static string Edit_FunctionNamespaceHelp { get { return T("Edit.FunctionNamespaceHelp"); } } 
 /// <summary>&quot;Description&quot;</summary> 
 public static string Edit_FunctionDescriptionLabel { get { return T("Edit.FunctionDescriptionLabel"); } } 
 /// <summary>&quot;A description of the function that can help people understand what it does.&quot;</summary> 
 public static string Edit_FunctionDescriptionHelp { get { return T("Edit.FunctionDescriptionHelp"); } } 
 /// <summary>&quot;Item list length&quot;</summary> 
 public static string Edit_ItemListLenghtLabel { get { return T("Edit.ItemListLenghtLabel"); } } 
 /// <summary>&quot;The maximum number of items to show.&quot;</summary> 
 public static string Edit_ItemListLenghtHelp { get { return T("Edit.ItemListLenghtHelp"); } } 
 /// <summary>&quot;Item sorting&quot;</summary> 
 public static string Edit_ItemSortingLabel { get { return T("Edit.ItemSortingLabel"); } } 
 /// <summary>&quot;Select which field to use when sorting the list. Use &apos;(random)&apos; to pick randomly from the list.&quot;</summary> 
 public static string Edit_ItemSortingHelp { get { return T("Edit.ItemSortingHelp"); } } 
 /// <summary>&quot;List sort order&quot;</summary> 
 public static string Edit_ListSortingLabel { get { return T("Edit.ListSortingLabel"); } } 
 /// <summary>&quot;Ascending&quot;</summary> 
 public static string Edit_ListSortingTrueLabel { get { return T("Edit.ListSortingTrueLabel"); } } 
 /// <summary>&quot;Descending&quot;</summary> 
 public static string Edit_ListSortingFalseLabel { get { return T("Edit.ListSortingFalseLabel"); } } 
 /// <summary>&quot;Select the sorted order. Ascending order is alphabetically, chronological. This field is ignored when &apos;(random)&apos; sorting is active.&quot;</summary> 
 public static string Edit_ListSortingHelp { get { return T("Edit.ListSortingHelp"); } } 
 /// <summary>&quot;Preview template&quot;</summary> 
 public static string Edit_PreviewTemplateLabel { get { return T("Edit.PreviewTemplateLabel"); } } 
 /// <summary>&quot;This information is only used when previewing the function.&quot;</summary> 
 public static string Edit_PreviewTemplateHelp { get { return T("Edit.PreviewTemplateHelp"); } } 
 /// <summary>&quot;Visual Layout&quot;</summary> 
 public static string Edit_WYSIWYGLayoutLabel { get { return T("Edit.WYSIWYGLayoutLabel"); } } 
 /// <summary>&quot;Preview&quot;</summary> 
 public static string Edit_LabelPreview { get { return T("Edit.LabelPreview"); } } 
 /// <summary>&quot;No templates&quot;</summary> 
 public static string Edit_NoPageTemplatesExistsErrorTitle { get { return T("Edit.NoPageTemplatesExistsErrorTitle"); } } 
 /// <summary>&quot;At least one template must exist before you can edit a rendering. Create one template and try again.&quot;</summary> 
 public static string Edit_NoPageTemplatesExistsErrorMessage { get { return T("Edit.NoPageTemplatesExistsErrorMessage"); } } 
 /// <summary>&quot;A language is required&quot;</summary> 
 public static string Edit_MissingActiveLanguageTitle { get { return T("Edit.MissingActiveLanguageTitle"); } } 
 /// <summary>&quot;To edit a visual function a language is required, but no languages have been added yet. You can add one under the System perspective.&quot;</summary> 
 public static string Edit_MissingActiveLanguageMessage { get { return T("Edit.MissingActiveLanguageMessage"); } } 
 /// <summary>&quot;Select a visual function&quot;</summary> 
 public static string Select_FieldGroupLabel { get { return T("Select.FieldGroupLabel"); } } 
 /// <summary>&quot;Select a function&quot;</summary> 
 public static string Select_FunctionFunctionsLabel { get { return T("Select.FunctionFunctionsLabel"); } } 
 /// <summary>&quot;Select a visual function to edit or delete&quot;</summary> 
 public static string Select_FunctionFunctionsHelp { get { return T("Select.FunctionFunctionsHelp"); } } 
 /// <summary>&quot;Another function with this name exists. Names must be unique.&quot;</summary> 
 public static string AddVisualFunctionWorkflow_FunctionNameValidatoinErrorMessage { get { return T("AddVisualFunctionWorkflow.FunctionNameValidatoinErrorMessage"); } } 
 /// <summary>&quot;Another function with this name exists. Names must be unique.&quot;</summary> 
 public static string EditVisualFunctionWorkflow_FunctionNameValidatoinErrorMessage { get { return T("EditVisualFunctionWorkflow.FunctionNameValidatoinErrorMessage"); } } 
 /// <summary>&quot;Visual Functions&quot;</summary> 
 public static string VisualFunctionElementProvider_RootFolderLabel { get { return T("VisualFunctionElementProvider.RootFolderLabel"); } } 
 /// <summary>&quot;Visual functions&quot;</summary> 
 public static string VisualFunctionElementProvider_RootFolderToolTip { get { return T("VisualFunctionElementProvider.RootFolderToolTip"); } } 
 /// <summary>&quot;Add Visual Function&quot;</summary> 
 public static string VisualFunctionElementProvider_AddNewLabel { get { return T("VisualFunctionElementProvider.AddNewLabel"); } } 
 /// <summary>&quot;Add new visual function&quot;</summary> 
 public static string VisualFunctionElementProvider_AddNewToolTip { get { return T("VisualFunctionElementProvider.AddNewToolTip"); } } 
 /// <summary>&quot;Edit Visual Function&quot;</summary> 
 public static string VisualFunctionElementProvider_EditLabel { get { return T("VisualFunctionElementProvider.EditLabel"); } } 
 /// <summary>&quot;Edit visual function&quot;</summary> 
 public static string VisualFunctionElementProvider_EditToolTip { get { return T("VisualFunctionElementProvider.EditToolTip"); } } 
 /// <summary>&quot;Delete Visual Function&quot;</summary> 
 public static string VisualFunctionElementProvider_DeleteLabel { get { return T("VisualFunctionElementProvider.DeleteLabel"); } } 
 /// <summary>&quot;Delete visual function&quot;</summary> 
 public static string VisualFunctionElementProvider_DeleteToolTip { get { return T("VisualFunctionElementProvider.DeleteToolTip"); } } 
 /// <summary>&quot;Another function with this name exists. Names must be unique.&quot;</summary> 
 public static string VisualFunctionElementProvider_FunctionNameNotUniqueError { get { return T("VisualFunctionElementProvider.FunctionNameNotUniqueError"); } } 
 /// <summary>&quot;New visual function&quot;</summary> 
 public static string VisualFunctionElementProviderHelper_AddNewLabel { get { return T("VisualFunctionElementProviderHelper.AddNewLabel"); } } 
 /// <summary>&quot;New visual function&quot;</summary> 
 public static string VisualFunctionElementProviderHelper_AddNewToolTip { get { return T("VisualFunctionElementProviderHelper.AddNewToolTip"); } } 
 /// <summary>&quot;Edit visual function&quot;</summary> 
 public static string VisualFunctionElementProviderHelper_EditLabel { get { return T("VisualFunctionElementProviderHelper.EditLabel"); } } 
 /// <summary>&quot;Edit visual function&quot;</summary> 
 public static string VisualFunctionElementProviderHelper_EditToolTip { get { return T("VisualFunctionElementProviderHelper.EditToolTip"); } } 
 /// <summary>&quot;Delete visual function&quot;</summary> 
 public static string VisualFunctionElementProviderHelper_DeleteLabel { get { return T("VisualFunctionElementProviderHelper.DeleteLabel"); } } 
 /// <summary>&quot;Delete visual function&quot;</summary> 
 public static string VisualFunctionElementProviderHelper_DeleteToolTip { get { return T("VisualFunctionElementProviderHelper.DeleteToolTip"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_WebsiteFileElementProvider {
 /// <summary>&quot;/&quot;</summary> 
 public static string WebsiteFilesRootElement_Label { get { return T("WebsiteFilesRootElement.Label"); } } 
 /// <summary>&quot;/&quot;</summary> 
 public static string LayoutResourcesRootElement_Label { get { return T("LayoutResourcesRootElement.Label"); } } 
 /// <summary>&quot;Layout&quot;</summary> 
 public static string LayoutResourcesKeyNameLabel { get { return T("LayoutResourcesKeyNameLabel"); } } 
 /// <summary>&quot;Delete File?&quot;</summary> 
 public static string DeleteFile_LabelFieldGroup { get { return T("DeleteFile.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete file?&quot;</summary> 
 public static string DeleteFile_Text { get { return T("DeleteFile.Text"); } } 
 /// <summary>&quot;Delete Folder?&quot;</summary> 
 public static string DeleteFolder_LabelFieldGroup { get { return T("DeleteFolder.LabelFieldGroup"); } } 
 /// <summary>&quot;Delete folder?&quot;</summary> 
 public static string DeleteFolder_Text { get { return T("DeleteFolder.Text"); } } 
 /// <summary>&quot;Add New Folder&quot;</summary> 
 public static string AddNewFolder_LabelFieldGroup { get { return T("AddNewFolder.LabelFieldGroup"); } } 
 /// <summary>&quot;Folder name&quot;</summary> 
 public static string AddNewFolder_Text { get { return T("AddNewFolder.Text"); } } 
 /// <summary>&quot;Enter the name of the new folder&quot;</summary> 
 public static string AddNewFolder_Help { get { return T("AddNewFolder.Help"); } } 
 /// <summary>&quot;A folder with the same name already exists&quot;</summary> 
 public static string AddNewFolder_Error_FolderExist { get { return T("AddNewFolder.Error.FolderExist"); } } 
 /// <summary>&quot;Add New File&quot;</summary> 
 public static string AddNewFile_LabelFieldGroup { get { return T("AddNewFile.LabelFieldGroup"); } } 
 /// <summary>&quot;File name&quot;</summary> 
 public static string AddNewFile_Text { get { return T("AddNewFile.Text"); } } 
 /// <summary>&quot;Enter the name of the new file&quot;</summary> 
 public static string AddNewFile_Help { get { return T("AddNewFile.Help"); } } 
 /// <summary>&quot;A file with the same name already exists&quot;</summary> 
 public static string AddNewFile_Error_FileExist { get { return T("AddNewFile.Error.FileExist"); } } 
 /// <summary>&quot;Upload File&quot;</summary> 
 public static string UploadNewWebsiteFile_LabelFieldGroup { get { return T("UploadNewWebsiteFile.LabelFieldGroup"); } } 
 /// <summary>&quot;Select file&quot;</summary> 
 public static string UploadNewWebsiteFile_LabelFile { get { return T("UploadNewWebsiteFile.LabelFile"); } } 
 /// <summary>&quot;Select file to upload&quot;</summary> 
 public static string UploadNewWebsiteFile_HelpFile { get { return T("UploadNewWebsiteFile.HelpFile"); } } 
 /// <summary>&quot;Overwrite existing file&quot;</summary> 
 public static string UploadNewWebsiteFile_ConfirmOverwriteTitle { get { return T("UploadNewWebsiteFile.ConfirmOverwriteTitle"); } } 
 /// <summary>&quot;A file with the same name already exists, overwrite?&quot;</summary> 
 public static string UploadNewWebsiteFile_ConfirmOverwriteDescription { get { return T("UploadNewWebsiteFile.ConfirmOverwriteDescription"); } } 
 /// <summary>&quot;Wrong File Type&quot;</summary> 
 public static string UploadFile_Error_WrongTypeTitle { get { return T("UploadFile.Error.WrongTypeTitle"); } } 
 /// <summary>&quot;Wrong file type&quot;</summary> 
 public static string UploadFile_Error_WrongTypeMessage { get { return T("UploadFile.Error.WrongTypeMessage"); } } 
 /// <summary>&quot;New Folder&quot;</summary> 
 public static string AddWebsiteFolderTitle { get { return T("AddWebsiteFolderTitle"); } } 
 /// <summary>&quot;Add new folder&quot;</summary> 
 public static string AddWebsiteFolderToolTip { get { return T("AddWebsiteFolderToolTip"); } } 
 /// <summary>&quot;New File&quot;</summary> 
 public static string AddWebsiteFileTitle { get { return T("AddWebsiteFileTitle"); } } 
 /// <summary>&quot;Create new file&quot;</summary> 
 public static string AddWebsiteFileToolTip { get { return T("AddWebsiteFileToolTip"); } } 
 /// <summary>&quot;Delete File&quot;</summary> 
 public static string DeleteWebsiteFileTitle { get { return T("DeleteWebsiteFileTitle"); } } 
 /// <summary>&quot;Delete file&quot;</summary> 
 public static string DeleteWebsiteFileToolTip { get { return T("DeleteWebsiteFileToolTip"); } } 
 /// <summary>&quot;Download&quot;</summary> 
 public static string DownloadFileTitle { get { return T("DownloadFileTitle"); } } 
 /// <summary>&quot;Download file&quot;</summary> 
 public static string DownloadFileToolTip { get { return T("DownloadFileToolTip"); } } 
 /// <summary>&quot;Delete Folder&quot;</summary> 
 public static string DeleteWebsiteFolderTitle { get { return T("DeleteWebsiteFolderTitle"); } } 
 /// <summary>&quot;Delete folder&quot;</summary> 
 public static string DeleteWebsiteFolderToolTip { get { return T("DeleteWebsiteFolderToolTip"); } } 
 /// <summary>&quot;Edit File&quot;</summary> 
 public static string EditWebsiteFileTitle { get { return T("EditWebsiteFileTitle"); } } 
 /// <summary>&quot;Edit file&quot;</summary> 
 public static string EditWebsiteFileToolTip { get { return T("EditWebsiteFileToolTip"); } } 
 /// <summary>&quot;Upload File&quot;</summary> 
 public static string UploadWebsiteFileTitle { get { return T("UploadWebsiteFileTitle"); } } 
 /// <summary>&quot;Upload file&quot;</summary> 
 public static string UploadWebsiteFileToolTip { get { return T("UploadWebsiteFileToolTip"); } } 
 /// <summary>&quot;Show in &quot;{0}&quot;&quot;</summary> 
 public static string AddFolderToWhiteListTitle(object parameter0) { return string.Format(T("AddFolderToWhiteListTitle"), parameter0); } 
 /// <summary>&quot;Control if this folder should be visible in &quot;{0}&quot;&quot;</summary> 
 public static string AddFolderToWhiteListToolTip(object parameter0) { return string.Format(T("AddFolderToWhiteListToolTip"), parameter0); } 
 /// <summary>&quot;Show in &quot;{0}&quot;&quot;</summary> 
 public static string RemoveFolderFromWhiteListTitle(object parameter0) { return string.Format(T("RemoveFolderFromWhiteListTitle"), parameter0); } 
 /// <summary>&quot;Control if this folder should be visible in &quot;{0}&quot;&quot;</summary> 
 public static string RemoveFolderFromWhiteListToolTip(object parameter0) { return string.Format(T("RemoveFolderFromWhiteListToolTip"), parameter0); } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string DeleteWebsiteFileWorkflow_DeleteErrorTitle { get { return T("DeleteWebsiteFileWorkflow.DeleteErrorTitle"); } } 
 /// <summary>&quot;Could not delete the file&quot;</summary> 
 public static string DeleteWebsiteFileWorkflow_DeleteErrorMessage { get { return T("DeleteWebsiteFileWorkflow.DeleteErrorMessage"); } } 
 /// <summary>&quot;Error&quot;</summary> 
 public static string DeleteWebsiteFolderWorkflow_DeleteErrorTitle { get { return T("DeleteWebsiteFolderWorkflow.DeleteErrorTitle"); } } 
 /// <summary>&quot;Could not delete the folder&quot;</summary> 
 public static string DeleteWebsiteFolderWorkflow_DeleteErrorMessage { get { return T("DeleteWebsiteFolderWorkflow.DeleteErrorMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_XsltBasedFunction {
 /// <summary>&quot;XSLT Functions&quot;</summary> 
 public static string Plugins_XsltBasedFunctionProviderElementProvider_RootFolderLabel { get { return T("Plugins.XsltBasedFunctionProviderElementProvider.RootFolderLabel"); } } 
 /// <summary>&quot;XSLT functions&quot;</summary> 
 public static string Plugins_XsltBasedFunctionProviderElementProvider_RootFolderToolTip { get { return T("Plugins.XsltBasedFunctionProviderElementProvider.RootFolderToolTip"); } } 
 /// <summary>&quot;An XSLT function with the same name already exists.&quot;</summary> 
 public static string AddNewXsltFunctionWorkflow_DuplicateName { get { return T("AddNewXsltFunctionWorkflow.DuplicateName"); } } 
 /// <summary>&quot;Method name must be non-empty&quot;</summary> 
 public static string AddNewXsltFunctionWorkflow_MethodEmpty { get { return T("AddNewXsltFunctionWorkflow.MethodEmpty"); } } 
 /// <summary>&quot;Namespace must be non-empty&quot;</summary> 
 public static string AddNewXsltFunctionWorkflow_NamespaceEmpty { get { return T("AddNewXsltFunctionWorkflow.NamespaceEmpty"); } } 
 /// <summary>&quot;Namespace must be like A.B.C - not start and end with .&quot;</summary> 
 public static string AddNewXsltFunctionWorkflow_InvalidNamespace { get { return T("AddNewXsltFunctionWorkflow.InvalidNamespace"); } } 
 /// <summary>&quot;A language is required&quot;</summary> 
 public static string AddNewXsltFunctionWorkflow_MissingActiveLanguageTitle { get { return T("AddNewXsltFunctionWorkflow.MissingActiveLanguageTitle"); } } 
 /// <summary>&quot;To create a XSLT function a language is required, but no languages have been added yet. You can add one under the System perspective.&quot;</summary> 
 public static string AddNewXsltFunctionWorkflow_MissingActiveLanguageMessage { get { return T("AddNewXsltFunctionWorkflow.MissingActiveLanguageMessage"); } } 
 /// <summary>&quot;A page is required&quot;</summary> 
 public static string AddNewXsltFunctionWorkflow_MissingPageTitle { get { return T("AddNewXsltFunctionWorkflow.MissingPageTitle"); } } 
 /// <summary>&quot;To create a XSLT function at least one page has to be added.&quot;</summary> 
 public static string AddNewXsltFunctionWorkflow_MissingPageMessage { get { return T("AddNewXsltFunctionWorkflow.MissingPageMessage"); } } 
 /// <summary>&quot;The total length of the name and the namespace is too long (used to name the XSL file).&quot;</summary> 
 public static string AddNewXsltFunctionWorkflow_TotalNameTooLang { get { return T("AddNewXsltFunctionWorkflow.TotalNameTooLang"); } } 
 /// <summary>&quot;Delete XSLT Function?&quot;</summary> 
 public static string DeleteXsltFunctionWorkflow_ConfirmDeleteTitle { get { return T("DeleteXsltFunctionWorkflow.ConfirmDeleteTitle"); } } 
 /// <summary>&quot;Delete the selected XSLT?&quot;</summary> 
 public static string DeleteXsltFunctionWorkflow_ConfirmDeleteMessage { get { return T("DeleteXsltFunctionWorkflow.ConfirmDeleteMessage"); } } 
 /// <summary>&quot;Cascade Delete Error&quot;</summary> 
 public static string DeleteXsltFunctionWorkflow_CascadeDeleteErrorTitle { get { return T("DeleteXsltFunctionWorkflow.CascadeDeleteErrorTitle"); } } 
 /// <summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
 public static string DeleteXsltFunctionWorkflow_CascadeDeleteErrorMessage { get { return T("DeleteXsltFunctionWorkflow.CascadeDeleteErrorMessage"); } } 
 /// <summary>&quot;An XSLT function with the same name already exists.&quot;</summary> 
 public static string EditXsltFunctionWorkflow_DuplicateName { get { return T("EditXsltFunctionWorkflow.DuplicateName"); } } 
 /// <summary>&quot;The method name must be non-empty&quot;</summary> 
 public static string EditXsltFunctionWorkflow_EmptyMethodName { get { return T("EditXsltFunctionWorkflow.EmptyMethodName"); } } 
 /// <summary>&quot;The namespace must be non-empty&quot;</summary> 
 public static string EditXsltFunctionWorkflow_NamespaceEmpty { get { return T("EditXsltFunctionWorkflow.NamespaceEmpty"); } } 
 /// <summary>&quot;The namespace must be like A.B.C - not start and end with &apos;.&apos; (period)&quot;</summary> 
 public static string EditXsltFunctionWorkflow_InvalidNamespace { get { return T("EditXsltFunctionWorkflow.InvalidNamespace"); } } 
 /// <summary>&quot;XslFilePath must start with \ or /&quot;</summary> 
 public static string EditXsltFunctionWorkflow_InvalidFileName { get { return T("EditXsltFunctionWorkflow.InvalidFileName"); } } 
 /// <summary>&quot;Invalid function name&quot;</summary> 
 public static string EditXsltFunctionWorkflow_InvalidName { get { return T("EditXsltFunctionWorkflow.InvalidName"); } } 
 /// <summary>&quot;Cannot rename the function, file &apos;{0}&apos; already exists.&quot;</summary> 
 public static string EditXsltFunctionWorkflow_CannotRenameFileExists(object parameter0) { return string.Format(T("EditXsltFunctionWorkflow.CannotRenameFileExists"), parameter0); } 
 /// <summary>&quot;The total length of the name and the namespace is too long (used to name the XSL file).&quot;</summary> 
 public static string EditXsltFunctionWorkflow_TotalNameTooLang { get { return T("EditXsltFunctionWorkflow.TotalNameTooLang"); } } 
 /// <summary>&quot;Duplicate local function names&quot;</summary> 
 public static string EditXsltFunctionWorkflow_SameLocalFunctionNameClashTitle { get { return T("EditXsltFunctionWorkflow.SameLocalFunctionNameClashTitle"); } } 
 /// <summary>&quot;Two or more function calls has the same local name. Change the names so that all are different.&quot;</summary> 
 public static string EditXsltFunctionWorkflow_SameLocalFunctionNameClashMessage { get { return T("EditXsltFunctionWorkflow.SameLocalFunctionNameClashMessage"); } } 
 /// <summary>&quot;Add XSLT Function&quot;</summary> 
 public static string XsltBasedFunctionProviderElementProvider_Add { get { return T("XsltBasedFunctionProviderElementProvider.Add"); } } 
 /// <summary>&quot;Add new XSLT function&quot;</summary> 
 public static string XsltBasedFunctionProviderElementProvider_AddToolTip { get { return T("XsltBasedFunctionProviderElementProvider.AddToolTip"); } } 
 /// <summary>&quot;Edit&quot;</summary> 
 public static string XsltBasedFunctionProviderElementProvider_Edit { get { return T("XsltBasedFunctionProviderElementProvider.Edit"); } } 
 /// <summary>&quot;Edit XSLT function&quot;</summary> 
 public static string XsltBasedFunctionProviderElementProvider_EditToolTip { get { return T("XsltBasedFunctionProviderElementProvider.EditToolTip"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string XsltBasedFunctionProviderElementProvider_Delete { get { return T("XsltBasedFunctionProviderElementProvider.Delete"); } } 
 /// <summary>&quot;Delete XSLT function&quot;</summary> 
 public static string XsltBasedFunctionProviderElementProvider_DeleteToolTip { get { return T("XsltBasedFunctionProviderElementProvider.DeleteToolTip"); } } 
 /// <summary>&quot;Add New XSLT Function&quot;</summary> 
 public static string AddNewXsltFunctionStep1_LabelDialog { get { return T("AddNewXsltFunctionStep1.LabelDialog"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string AddNewXsltFunctionStep1_LabelName { get { return T("AddNewXsltFunctionStep1.LabelName"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewXsltFunctionStep1_HelpName { get { return T("AddNewXsltFunctionStep1.HelpName"); } } 
 /// <summary>&quot;Namespace&quot;</summary> 
 public static string AddNewXsltFunctionStep1_LabelNamespace { get { return T("AddNewXsltFunctionStep1.LabelNamespace"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string AddNewXsltFunctionStep1_HelpNamespace { get { return T("AddNewXsltFunctionStep1.HelpNamespace"); } } 
 /// <summary>&quot;Output type&quot;</summary> 
 public static string AddNewXsltFunctionStep1_LabelOutputType { get { return T("AddNewXsltFunctionStep1.LabelOutputType"); } } 
 /// <summary>&quot;Copy from&quot;</summary> 
 public static string AddNewXsltFunctionStep1_LabelCopyFrom { get { return T("AddNewXsltFunctionStep1.LabelCopyFrom"); } } 
 /// <summary>&quot;(New XSLT function)&quot;</summary> 
 public static string AddNewXsltFunctionStep1_LabelCopyFromEmptyOption { get { return T("AddNewXsltFunctionStep1.LabelCopyFromEmptyOption"); } } 
 /// <summary>&quot;Settings&quot;</summary> 
 public static string EditXsltFunction_LabelSettings { get { return T("EditXsltFunction.LabelSettings"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string EditXsltFunction_LabelName { get { return T("EditXsltFunction.LabelName"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string EditXsltFunction_HelpName { get { return T("EditXsltFunction.HelpName"); } } 
 /// <summary>&quot;Namespace&quot;</summary> 
 public static string EditXsltFunction_LabelNamespace { get { return T("EditXsltFunction.LabelNamespace"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string EditXsltFunction_HelpNamespace { get { return T("EditXsltFunction.HelpNamespace"); } } 
 /// <summary>&quot;Description&quot;</summary> 
 public static string EditXsltFunction_LabelDescription { get { return T("EditXsltFunction.LabelDescription"); } } 
 /// <summary>&quot;&quot;</summary> 
 public static string EditXsltFunction_HelpDescription { get { return T("EditXsltFunction.HelpDescription"); } } 
 /// <summary>&quot;Debug&quot;</summary> 
 public static string EditXsltFunction_LabelDebug { get { return T("EditXsltFunction.LabelDebug"); } } 
 /// <summary>&quot;Page&quot;</summary> 
 public static string EditXsltFunction_LabelPage { get { return T("EditXsltFunction.LabelPage"); } } 
 /// <summary>&quot;When debugging, this page is used as context for the rendering.&quot;</summary> 
 public static string EditXsltFunction_HelpPage { get { return T("EditXsltFunction.HelpPage"); } } 
 /// <summary>&quot;Administrative&quot;</summary> 
 public static string EditXsltFunction_LabelAdminitrativeScope { get { return T("EditXsltFunction.LabelAdminitrativeScope"); } } 
 /// <summary>&quot;Public&quot;</summary> 
 public static string EditXsltFunction_LabelPublicScope { get { return T("EditXsltFunction.LabelPublicScope"); } } 
 /// <summary>&quot;Data scope&quot;</summary> 
 public static string EditXsltFunction_LabelPageDataScope { get { return T("EditXsltFunction.LabelPageDataScope"); } } 
 /// <summary>&quot;Choose public or development version as context for the rendering.&quot;</summary> 
 public static string EditXsltFunction_HelpPageDataScope { get { return T("EditXsltFunction.HelpPageDataScope"); } } 
 /// <summary>&quot;Language&quot;</summary> 
 public static string EditXsltFunction_LabelActiveLocales { get { return T("EditXsltFunction.LabelActiveLocales"); } } 
 /// <summary>&quot;Select language to be used while debugging the function.&quot;</summary> 
 public static string EditXsltFunction_HelpActiveLocales { get { return T("EditXsltFunction.HelpActiveLocales"); } } 
 /// <summary>&quot;Output type&quot;</summary> 
 public static string EditXsltFunction_OutputType { get { return T("EditXsltFunction.OutputType"); } } 
 /// <summary>&quot;Input Parameters&quot;</summary> 
 public static string EditXsltFunction_LabelInputParameters { get { return T("EditXsltFunction.LabelInputParameters"); } } 
 /// <summary>&quot;Function Calls&quot;</summary> 
 public static string EditXsltFunction_LabelFunctionCalls { get { return T("EditXsltFunction.LabelFunctionCalls"); } } 
 /// <summary>&quot;Template&quot;</summary> 
 public static string EditXsltFunction_LabelTemplate { get { return T("EditXsltFunction.LabelTemplate"); } } 
 /// <summary>&quot;Preview&quot;</summary> 
 public static string EditXsltFunction_LabelPreview { get { return T("EditXsltFunction.LabelPreview"); } } 
 /// <summary>&quot;A Language Is Required&quot;</summary> 
 public static string EditXsltFunctionWorkflow_MissingActiveLanguageTitle { get { return T("EditXsltFunctionWorkflow.MissingActiveLanguageTitle"); } } 
 /// <summary>&quot;To edit a XSLT function a language is required, but no languages have been added yet. You can add one under the System perspective.&quot;</summary> 
 public static string EditXsltFunctionWorkflow_MissingActiveLanguageMessage { get { return T("EditXsltFunctionWorkflow.MissingActiveLanguageMessage"); } } 
 /// <summary>&quot;A Page Is Required&quot;</summary> 
 public static string EditXsltFunctionWorkflow_MissingPageTitle { get { return T("EditXsltFunctionWorkflow.MissingPageTitle"); } } 
 /// <summary>&quot;To edit a XSLT function at least one page has to be added.&quot;</summary> 
 public static string EditXsltFunctionWorkflow_MissingPageMessage { get { return T("EditXsltFunctionWorkflow.MissingPageMessage"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_FormControl_FunctionCallsDesigner {
 /// <summary>&quot;Function Properties&quot;</summary> 
 public static string DialogTitle { get { return T("DialogTitle"); } } 
 /// <summary>&quot;Function result local name&quot;</summary> 
 public static string FunctionLocalNameGroupLabel { get { return T("FunctionLocalNameGroupLabel"); } } 
 /// <summary>&quot;Local name&quot;</summary> 
 public static string FunctionLocalNameLabel { get { return T("FunctionLocalNameLabel"); } } 
 /// <summary>&quot;If you include a function multiple times this field can help you distinguish the individual results by their local name. &quot;</summary> 
 public static string FunctionLocalNameHelp { get { return T("FunctionLocalNameHelp"); } } 
 /// <summary>&quot;Parameter Value&quot;</summary> 
 public static string ParameterValueLabel { get { return T("ParameterValueLabel"); } } 
 /// <summary>&quot;Select Function&quot;</summary> 
 public static string AddNewFunctionDialogLabel { get { return T("AddNewFunctionDialogLabel"); } } 
 /// <summary>&quot;Select Function&quot;</summary> 
 public static string SetNewFunctionDialogLabel { get { return T("SetNewFunctionDialogLabel"); } } 
 /// <summary>&quot;Value for parameter &apos;{0}&apos;&quot;</summary> 
 public static string ComplexFunctionCallDialogLabel(object parameter0) { return string.Format(T("ComplexFunctionCallDialogLabel"), parameter0); } 
 /// <summary>&quot;Parameter Type&quot;</summary> 
 public static string ParameterTypeLabel { get { return T("ParameterTypeLabel"); } } 
 /// <summary>&quot;Parameter Name&quot;</summary> 
 public static string ParameterNameLabel { get { return T("ParameterNameLabel"); } } 
 /// <summary>&quot;Return type&quot;</summary> 
 public static string ReturnTypeLabel { get { return T("ReturnTypeLabel"); } } 
 /// <summary>&quot;Validation failed&quot;</summary> 
 public static string ValidationFailedAlertTitle { get { return T("ValidationFailedAlertTitle"); } } 
 /// <summary>&quot;Function &apos;{0}&apos; does not exist.&quot;</summary> 
 public static string FunctionNotFound(object parameter0) { return string.Format(T("FunctionNotFound"), parameter0); } 
 /// <summary>&quot;Required parameter &apos;{0}&apos; has not been defined.&quot;</summary> 
 public static string RequiredParameterNotDefined(object parameter0) { return string.Format(T("RequiredParameterNotDefined"), parameter0); } 
 /// <summary>&quot;Incorrect type cast. Parameter name: &apos;{0}&apos;, function name: &apos;{1}&apos;.&quot;</summary> 
 public static string IncorrectTypeCast(object parameter0,object parameter1) { return string.Format(T("IncorrectTypeCast"), parameter0,parameter1); } 
 /// <summary>&quot;Default&quot;</summary> 
 public static string ParameterTypeDefaultLabel { get { return T("ParameterTypeDefaultLabel"); } } 
 /// <summary>&quot;Constant&quot;</summary> 
 public static string ParameterTypeConstantLabel { get { return T("ParameterTypeConstantLabel"); } } 
 /// <summary>&quot;Input Parameter&quot;</summary> 
 public static string ParameterTypeInputParameterLabel { get { return T("ParameterTypeInputParameterLabel"); } } 
 /// <summary>&quot;Function&quot;</summary> 
 public static string ParameterTypeFunctionLabel { get { return T("ParameterTypeFunctionLabel"); } } 
 /// <summary>&quot;Add New&quot;</summary> 
 public static string AddNewButtonLabel { get { return T("AddNewButtonLabel"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string DeleteButtonLabel { get { return T("DeleteButtonLabel"); } } 
 /// <summary>&quot;Set New&quot;</summary> 
 public static string SetNewButtonLabel { get { return T("SetNewButtonLabel"); } } 
 /// <summary>&quot;Source&quot;</summary> 
 public static string ToolBar_LabelSource { get { return T("ToolBar.LabelSource"); } } 
 /// <summary>&quot;Design&quot;</summary> 
 public static string ToolBar_LabelDesign { get { return T("ToolBar.LabelDesign"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.FormControl.FunctionCallsDesigner", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_FormControl_FunctionParameterDesigner {
 /// <summary>&quot;Add New&quot;</summary> 
 public static string AddNewButtonLabel { get { return T("AddNewButtonLabel"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string DeleteButtonLabel { get { return T("DeleteButtonLabel"); } } 
 /// <summary>&quot;List of input parameters&quot;</summary> 
 public static string TreeRootNodeLabel { get { return T("TreeRootNodeLabel"); } } 
 /// <summary>&quot;Parameter naming and help&quot;</summary> 
 public static string ParameterNamingGroupLabel { get { return T("ParameterNamingGroupLabel"); } } 
 /// <summary>&quot;Parameter name&quot;</summary> 
 public static string Name { get { return T("Name"); } } 
 /// <summary>&quot;The name of the parameter. The name is used by the system to identify this parameter. Names must be unique and may not contain spaces and other special characters. Use names like &apos;Title&apos;, &apos;StartDate&apos;, &apos;LargeImage&apos; etc.&quot;</summary> 
 public static string NameHelp { get { return T("NameHelp"); } } 
 /// <summary>&quot;Label&quot;</summary> 
 public static string Label { get { return T("Label"); } } 
 /// <summary>&quot;The text that users should see when specifying a value for this parameter. This is the &apos;human name&apos; for the parameter.&quot;</summary> 
 public static string LabelHelp { get { return T("LabelHelp"); } } 
 /// <summary>&quot;Help&quot;</summary> 
 public static string Help { get { return T("Help"); } } 
 /// <summary>&quot;Write a short text that tells the user what to do with the parameter.&quot;</summary> 
 public static string HelpHelp { get { return T("HelpHelp"); } } 
 /// <summary>&quot;Parameter type and values&quot;</summary> 
 public static string ParameterTypeValueGroupLabel { get { return T("ParameterTypeValueGroupLabel"); } } 
 /// <summary>&quot;Parameter type&quot;</summary> 
 public static string Type { get { return T("Type"); } } 
 /// <summary>&quot;The type of this parameter.&quot;</summary> 
 public static string TypeHelp { get { return T("TypeHelp"); } } 
 /// <summary>&quot;Default value&quot;</summary> 
 public static string DefaultValue { get { return T("DefaultValue"); } } 
 /// <summary>&quot;You can specify a default value for this parameter. If a parameter has a default value, users are not required to specify it when calling the function.&quot;</summary> 
 public static string DefaultValueHelp { get { return T("DefaultValueHelp"); } } 
 /// <summary>&quot;Specify default value&quot;</summary> 
 public static string DefaultValueSpecify { get { return T("DefaultValueSpecify"); } } 
 /// <summary>&quot;Edit default value&quot;</summary> 
 public static string DefaultValueEdit { get { return T("DefaultValueEdit"); } } 
 /// <summary>&quot;Parameter Default Value&quot;</summary> 
 public static string DefaultValueDialogLabel { get { return T("DefaultValueDialogLabel"); } } 
 /// <summary>&quot;Test value&quot;</summary> 
 public static string TestValue { get { return T("TestValue"); } } 
 /// <summary>&quot;When previewing you can test with different input parameter values using this field. If this is left blank, the default value will be used for previews.&quot;</summary> 
 public static string TestValueHelp { get { return T("TestValueHelp"); } } 
 /// <summary>&quot;Specify test value&quot;</summary> 
 public static string TestValueSpecify { get { return T("TestValueSpecify"); } } 
 /// <summary>&quot;Edit test value&quot;</summary> 
 public static string TestValueEdit { get { return T("TestValueEdit"); } } 
 /// <summary>&quot;Parameter Test Value&quot;</summary> 
 public static string TestValueDialogLabel { get { return T("TestValueDialogLabel"); } } 
 /// <summary>&quot;Parameter presentation&quot;</summary> 
 public static string ParameterPresentationGroupLabel { get { return T("ParameterPresentationGroupLabel"); } } 
 /// <summary>&quot;Widget&quot;</summary> 
 public static string Widget { get { return T("Widget"); } } 
 /// <summary>&quot;You can select which type of input widget (like a textbox) to use when specifying a value for this parameter. Widgets are only available for simple types.&quot;</summary> 
 public static string WidgetHelp { get { return T("WidgetHelp"); } } 
 /// <summary>&quot;(no widget specified)&quot;</summary> 
 public static string NoWidgetSpecifiedLabel { get { return T("NoWidgetSpecifiedLabel"); } } 
 /// <summary>&quot;Parameter Widget&quot;</summary> 
 public static string WidgetDialogLabel { get { return T("WidgetDialogLabel"); } } 
 /// <summary>&quot;Position&quot;</summary> 
 public static string Position { get { return T("Position"); } } 
 /// <summary>&quot;Last&quot;</summary> 
 public static string PositionLast { get { return T("PositionLast"); } } 
 /// <summary>&quot;The position of the parameter. This controls the order of the parameters.&quot;</summary> 
 public static string PositionHelp { get { return T("PositionHelp"); } } 
 /// <summary>&quot;Remember to specify a widget...&quot;</summary> 
 public static string SpecifyWidgetTip { get { return T("SpecifyWidgetTip"); } } 
 /// <summary>&quot;The specified name is not valid.&quot;</summary> 
 public static string FieldNameSyntaxInvalid { get { return T("FieldNameSyntaxInvalid"); } } 
 /// <summary>&quot;Can not save... Another parameter has the same name. Please change the name.&quot;</summary> 
 public static string CannotSave { get { return T("CannotSave"); } } 
 /// <summary>&quot;Invalid name. Parameter names can not contain spaces. You can write a readable name in the Label field below.&quot;</summary> 
 public static string SpaceInNameError { get { return T("SpaceInNameError"); } } 
 /// <summary>&quot;Parameter names can not be empty. Please specify a name.&quot;</summary> 
 public static string NameEmptyError { get { return T("NameEmptyError"); } } 
 /// <summary>&quot;Another parameter uses this name. Parameter names must be unique.&quot;</summary> 
 public static string NameAlreadyInUseError { get { return T("NameAlreadyInUseError"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.FormControl.FunctionParameterDesigner", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_FormControl_TypeFieldDesigner {
 /// <summary>&quot;Basic&quot;</summary> 
 public static string BasicTabLabel { get { return T("BasicTabLabel"); } } 
 /// <summary>&quot;Advanced&quot;</summary> 
 public static string AdvancedTabLabel { get { return T("AdvancedTabLabel"); } } 
 /// <summary>&quot;Add New&quot;</summary> 
 public static string AddNewButtonLabel { get { return T("AddNewButtonLabel"); } } 
 /// <summary>&quot;Delete&quot;</summary> 
 public static string DeleteButtonLabel { get { return T("DeleteButtonLabel"); } } 
 /// <summary>&quot;Datatype Fields&quot;</summary> 
 public static string LabelDataTypeFields { get { return T("LabelDataTypeFields"); } } 
 /// <summary>&quot;Key field properties&quot;</summary> 
 public static string KeyFieldDetailsGroupLabel { get { return T("KeyFieldDetailsGroupLabel"); } } 
 /// <summary>&quot;Key field type&quot;</summary> 
 public static string KeyFieldType { get { return T("KeyFieldType"); } } 
 /// <summary>&quot;The data type of the key field. Guid fields feature optimal performance, string key fields are usefull when the id values have to be exposed in urls.&quot;</summary> 
 public static string KeyFieldTypeHelp { get { return T("KeyFieldTypeHelp"); } } 
 /// <summary>&quot;Field properties&quot;</summary> 
 public static string FieldDetailsGroupLabel { get { return T("FieldDetailsGroupLabel"); } } 
 /// <summary>&quot;Name&quot;</summary> 
 public static string Name { get { return T("Name"); } } 
 /// <summary>&quot;The name of the field is used by the system to identify this field. Names must be unique and can not contain spaces and other special characters. Use names like &apos;Title&apos;, &apos;StartDate&apos;, &apos;LargeImage&apos; etc.&quot;</summary> 
 public static string NameHelp { get { return T("NameHelp"); } } 
 /// <summary>&quot;Label&quot;</summary> 
 public static string Label { get { return T("Label"); } } 
 /// <summary>&quot;Label text are showed to users when adding a new item based on the datatype.&quot;</summary> 
 public static string LabelHelp { get { return T("LabelHelp"); } } 
 /// <summary>&quot;Help&quot;</summary> 
 public static string Help { get { return T("Help"); } } 
 /// <summary>&quot;Use this entry for a short help text to the user.&quot;</summary> 
 public static string HelpHelp { get { return T("HelpHelp"); } } 
 /// <summary>&quot;Field type and requirements&quot;</summary> 
 public static string FieldTypeGroupLabel { get { return T("FieldTypeGroupLabel"); } } 
 /// <summary>&quot;Field type&quot;</summary> 
 public static string FieldType { get { return T("FieldType"); } } 
 /// <summary>&quot;Select a data type for the field. The type determine which kind of data the field can hold.&quot;</summary> 
 public static string FieldTypeHelp { get { return T("FieldTypeHelp"); } } 
 /// <summary>&quot;String&quot;</summary> 
 public static string System_String { get { return T("System.String"); } } 
 /// <summary>&quot;Integer&quot;</summary> 
 public static string System_Int32 { get { return T("System.Int32"); } } 
 /// <summary>&quot;Decimal number&quot;</summary> 
 public static string System_Decimal { get { return T("System.Decimal"); } } 
 /// <summary>&quot;Date&quot;</summary> 
 public static string System_DateTime { get { return T("System.DateTime"); } } 
 /// <summary>&quot;Boolean&quot;</summary> 
 public static string System_Boolean { get { return T("System.Boolean"); } } 
 /// <summary>&quot;Unique Identifier (GUID)&quot;</summary> 
 public static string System_Guid { get { return T("System.Guid"); } } 
 /// <summary>&quot;Data reference&quot;</summary> 
 public static string Reference { get { return T("Reference"); } } 
 /// <summary>&quot;Use this field to further configure your selected type.&quot;</summary> 
 public static string TypeDetailsHelp { get { return T("TypeDetailsHelp"); } } 
 /// <summary>&quot;Optional&quot;</summary> 
 public static string Optional { get { return T("Optional"); } } 
 /// <summary>&quot;Optional fields may be left blank.&quot;</summary> 
 public static string OptionalHelp { get { return T("OptionalHelp"); } } 
 /// <summary>&quot;No&quot;</summary> 
 public static string OptionalFalseLabel { get { return T("OptionalFalseLabel"); } } 
 /// <summary>&quot;Yes&quot;</summary> 
 public static string OptionalTrueLabel { get { return T("OptionalTrueLabel"); } } 
 /// <summary>&quot;Validation rules&quot;</summary> 
 public static string ValidationRules { get { return T("ValidationRules"); } } 
 /// <summary>&quot;You can specify strict rules on the data that is entered in this field, i.e. &quot;must be at least 5 characters long&quot;, &quot;must be a valid e-mail address&quot;, &quot;must be a date in the past&quot; etc.&quot;</summary> 
 public static string ValidationRulesHelp { get { return T("ValidationRulesHelp"); } } 
 /// <summary>&quot;Add validation rules...&quot;</summary> 
 public static string ValidationRulesAdd { get { return T("ValidationRulesAdd"); } } 
 /// <summary>&quot;Edit validation rules&quot;</summary> 
 public static string ValidationRulesEdit { get { return T("ValidationRulesEdit"); } } 
 /// <summary>&quot;Field Validation Rules Configuration&quot;</summary> 
 public static string ValidationRulesDialogLabel { get { return T("ValidationRulesDialogLabel"); } } 
 /// <summary>&quot;Field validation&quot;</summary> 
 public static string FieldValidationGroupLabel { get { return T("FieldValidationGroupLabel"); } } 
 /// <summary>&quot;Form field presentation&quot;</summary> 
 public static string FieldPresentationGroupLabel { get { return T("FieldPresentationGroupLabel"); } } 
 /// <summary>&quot;Structural presentation&quot;</summary> 
 public static string FieldStructureGroupLabel { get { return T("FieldStructureGroupLabel"); } } 
 /// <summary>&quot;Widget type&quot;</summary> 
 public static string Widget { get { return T("Widget"); } } 
 /// <summary>&quot;You can select which type of input widget (like a textbox) to use when editing this field.&quot;</summary> 
 public static string WidgetHelp { get { return T("WidgetHelp"); } } 
 /// <summary>&quot;Field Widget Configuration&quot;</summary> 
 public static string WidgetDialogLabel { get { return T("WidgetDialogLabel"); } } 
 /// <summary>&quot;Position&quot;</summary> 
 public static string Position { get { return T("Position"); } } 
 /// <summary>&quot;Last&quot;</summary> 
 public static string PositionLast { get { return T("PositionLast"); } } 
 /// <summary>&quot;The position of the field. This controls the order of the fields.&quot;</summary> 
 public static string PositionHelp { get { return T("PositionHelp"); } } 
 /// <summary>&quot;Tree grouping&quot;</summary> 
 public static string GroupByPriority { get { return T("GroupByPriority"); } } 
 /// <summary>&quot;(no grouping)...&quot;</summary> 
 public static string GroupByPriorityNone { get { return T("GroupByPriorityNone"); } } 
 /// <summary>&quot;Group by this field&quot;</summary> 
 public static string GroupByPriorityFirst { get { return T("GroupByPriorityFirst"); } } 
 /// <summary>&quot;Group as {0}. priority&quot;</summary> 
 public static string GroupByPriorityN(object parameter0) { return string.Format(T("GroupByPriorityN"), parameter0); } 
 /// <summary>&quot;You can specify that a field should be used to group data - this can improve readability when viewing long lists. Use priority when multiple fields are used for grouping.&quot;</summary> 
 public static string GroupByPriorityHelp { get { return T("GroupByPriorityHelp"); } } 
 /// <summary>&quot;Tree ordering&quot;</summary> 
 public static string TreeOrdering { get { return T("TreeOrdering"); } } 
 /// <summary>&quot;(no ordering)...&quot;</summary> 
 public static string TreeOrderingNone { get { return T("TreeOrderingNone"); } } 
 /// <summary>&quot;Order ascending (A-Z)&quot;</summary> 
 public static string TreeOrderingFirstAscending { get { return T("TreeOrderingFirstAscending"); } } 
 /// <summary>&quot;Order descending (Z-A)&quot;</summary> 
 public static string TreeOrderingFirstDescending { get { return T("TreeOrderingFirstDescending"); } } 
 /// <summary>&quot;Order {0}. ascending&quot;</summary> 
 public static string TreeOrderingNAscending(object parameter0) { return string.Format(T("TreeOrderingNAscending"), parameter0); } 
 /// <summary>&quot;Order {0}. descending&quot;</summary> 
 public static string TreeOrderingNDescending(object parameter0) { return string.Format(T("TreeOrderingNDescending"), parameter0); } 
 /// <summary>&quot;You can specify that a field should be used to order data in the tree view - this can improve readability when a field is used to position elements on the website.&quot;</summary> 
 public static string TreeOrderingHelp { get { return T("TreeOrderingHelp"); } } 
 /// <summary>&quot;Is title field&quot;</summary> 
 public static string IsTitleField { get { return T("IsTitleField"); } } 
 /// <summary>&quot;Check this if you wish this field to be used as the title field. Title fields are used when listing data, like in the tree to the left.&quot;</summary> 
 public static string IsTitleFieldHelp { get { return T("IsTitleFieldHelp"); } } 
 /// <summary>&quot;Use this as title field in lists&quot;</summary> 
 public static string IsTitleFieldLabel { get { return T("IsTitleFieldLabel"); } } 
 /// <summary>&quot;Field default value&quot;</summary> 
 public static string DefaultValueGroupLabel { get { return T("DefaultValueGroupLabel"); } } 
 /// <summary>&quot;Default value&quot;</summary> 
 public static string DefaultValue { get { return T("DefaultValue"); } } 
 /// <summary>&quot;You can define a default value for this field.&quot;</summary> 
 public static string DefaultValueHelp { get { return T("DefaultValueHelp"); } } 
 /// <summary>&quot;Field default value configuration&quot;</summary> 
 public static string DefaultValueDialogLabel { get { return T("DefaultValueDialogLabel"); } } 
 /// <summary>&quot;Data url&quot;</summary> 
 public static string DataUrlGroupLabel { get { return T("DataUrlGroupLabel"); } } 
 /// <summary>&quot;Field appears in data url&quot;</summary> 
 public static string AppearsInUrlLabel { get { return T("AppearsInUrlLabel"); } } 
 /// <summary>&quot;Use in data urls&quot;</summary> 
 public static string AppearsInUrlItemLabel { get { return T("AppearsInUrlItemLabel"); } } 
 /// <summary>&quot;When checked the field will appear in data urls&quot;</summary> 
 public static string AppearsInUrlHelp { get { return T("AppearsInUrlHelp"); } } 
 /// <summary>&quot;Order&quot;</summary> 
 public static string DataUrlOrderLabel { get { return T("DataUrlOrderLabel"); } } 
 /// <summary>&quot;Order in which the field appear in data url route&quot;</summary> 
 public static string DataUrlOrderHelp { get { return T("DataUrlOrderHelp"); } } 
 /// <summary>&quot;Format&quot;</summary> 
 public static string DataUrlDateFormatLabel { get { return T("DataUrlDateFormatLabel"); } } 
 /// <summary>&quot;Chose in what format the date field will appear in url&quot;</summary> 
 public static string DataUrlDateFormatHelp { get { return T("DataUrlDateFormatHelp"); } } 
 /// <summary>&quot;Year&quot;</summary> 
 public static string DataUrlDateFormat_Year { get { return T("DataUrlDateFormat_Year"); } } 
 /// <summary>&quot;Month&quot;</summary> 
 public static string DataUrlDateFormat_Month { get { return T("DataUrlDateFormat_Month"); } } 
 /// <summary>&quot;Day&quot;</summary> 
 public static string DataUrlDateFormat_Day { get { return T("DataUrlDateFormat_Day"); } } 
 /// <summary>&quot;String maximum length&quot;</summary> 
 public static string StringMaximumLength { get { return T("StringMaximumLength"); } } 
 /// <summary>&quot;16 character maximum&quot;</summary> 
 public static string _16CharMax { get { return T("16CharMax"); } } 
 /// <summary>&quot;32 character maximum&quot;</summary> 
 public static string _32CharMax { get { return T("32CharMax"); } } 
 /// <summary>&quot;64 character maximum&quot;</summary> 
 public static string _64CharMax { get { return T("64CharMax"); } } 
 /// <summary>&quot;128 character maximum&quot;</summary> 
 public static string _128CharMax { get { return T("128CharMax"); } } 
 /// <summary>&quot;256 character maximum&quot;</summary> 
 public static string _256CharMax { get { return T("256CharMax"); } } 
 /// <summary>&quot;512 character maximum&quot;</summary> 
 public static string _512CharMax { get { return T("512CharMax"); } } 
 /// <summary>&quot;1024 character maximum&quot;</summary> 
 public static string _1024CharMax { get { return T("1024CharMax"); } } 
 /// <summary>&quot;Unlimited length&quot;</summary> 
 public static string Unlimited { get { return T("Unlimited"); } } 
 /// <summary>&quot;Decimal number format&quot;</summary> 
 public static string DecimalNumberFormat { get { return T("DecimalNumberFormat"); } } 
 /// <summary>&quot;1 decimal place&quot;</summary> 
 public static string _1DecimalPlace { get { return T("1DecimalPlace"); } } 
 /// <summary>&quot;{0} decimal places&quot;</summary> 
 public static string nDecimalPlaces(object parameter0) { return string.Format(T("nDecimalPlaces"), parameter0); } 
 /// <summary>&quot;Reference Type&quot;</summary> 
 public static string ReferenceType { get { return T("ReferenceType"); } } 
 /// <summary>&quot;The specified name is not valid.&quot;</summary> 
 public static string FieldNameSyntaxInvalid { get { return T("FieldNameSyntaxInvalid"); } } 
 /// <summary>&quot;Can not save... Another Field has the same name. Please change the name.&quot;</summary> 
 public static string CannotSave { get { return T("CannotSave"); } } 
 /// <summary>&quot;Invalid name. Data field names can not contain spaces. You can write a readable name in the Label field below.&quot;</summary> 
 public static string SpaceInNameError { get { return T("SpaceInNameError"); } } 
 /// <summary>&quot;Data field names can not be empty. Please specify a name.&quot;</summary> 
 public static string NameEmptyError { get { return T("NameEmptyError"); } } 
 /// <summary>&quot;Another field uses this name. Data field names must be unique.&quot;</summary> 
 public static string NameAlreadyInUseError { get { return T("NameAlreadyInUseError"); } } 
 /// <summary>&quot;The selected type can not be optional.&quot;</summary> 
 public static string NotAnOptionalTypeError { get { return T("NotAnOptionalTypeError"); } } 
 /// <summary>&quot;Remember to specify a widget...&quot;</summary> 
 public static string NoWidgetSelected { get { return T("NoWidgetSelected"); } } 
 /// <summary>&quot;(no widget specified)&quot;</summary> 
 public static string NoWidgetSelectedLabel { get { return T("NoWidgetSelectedLabel"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.FormControl.TypeFieldDesigner", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_PageBrowser {
 /// <summary>&quot;Page source&quot;</summary> 
 public static string Menu_ViewSource { get { return T("Menu.ViewSource"); } } 
 /// <summary>&quot;View mode&quot;</summary> 
 public static string Menu_ViewMode { get { return T("Menu.ViewMode"); } } 
 /// <summary>&quot;Back&quot;</summary> 
 public static string ContextMenu_Back { get { return T("ContextMenu.Back"); } } 
 /// <summary>&quot;Forward&quot;</summary> 
 public static string ContextMenu_Forward { get { return T("ContextMenu.Forward"); } } 
 /// <summary>&quot;Refresh&quot;</summary> 
 public static string ContextMenu_Refresh { get { return T("ContextMenu.Refresh"); } } 
 /// <summary>&quot;View Page Source&quot;</summary> 
 public static string ContextMenu_ViewSource { get { return T("ContextMenu.ViewSource"); } } 
 /// <summary>&quot;Go back one page&quot;</summary> 
 public static string ToolBarButton_Back_ToolTip { get { return T("ToolBarButton.Back.ToolTip"); } } 
 /// <summary>&quot;Go forward one page&quot;</summary> 
 public static string ToolBarButton_Forward_ToolTip { get { return T("ToolBarButton.Forward.ToolTip"); } } 
 /// <summary>&quot;Refresh page&quot;</summary> 
 public static string ToolBarButton_Refresh_ToolTip { get { return T("ToolBarButton.Refresh.ToolTip"); } } 
 /// <summary>&quot;Show Tree&quot;</summary> 
 public static string ToolBarButton_TreeView_ToolTip { get { return T("ToolBarButton.TreeView.ToolTip"); } } 
 /// <summary>&quot;Go to the address in the location bar&quot;</summary> 
 public static string ToolBarButton_Go_ToolTip { get { return T("ToolBarButton.Go.ToolTip"); } } 
 /// <summary>&quot;Go to the Start page&quot;</summary> 
 public static string ToolBarButton_Home_ToolTip { get { return T("ToolBarButton.Home.ToolTip"); } } 
 /// <summary>&quot;Access denied&quot;</summary> 
 public static string AddressBar_Invalid_DialogTitle_External { get { return T("AddressBar.Invalid.DialogTitle.External"); } } 
 /// <summary>&quot;External URL cannot loaded.&quot;</summary> 
 public static string AddressBar_Invalid_DialogText_External { get { return T("AddressBar.Invalid.DialogText.External"); } } 
 /// <summary>&quot;Bad URL&quot;</summary> 
 public static string AddressBar_Invalid_DialogTitle_BadRequest { get { return T("AddressBar.Invalid.DialogTitle.BadRequest"); } } 
 /// <summary>&quot;The URL is invalid and cannot be loaded.&quot;</summary> 
 public static string AddressBar_Invalid_DialogText_BadRequest { get { return T("AddressBar.Invalid.DialogText.BadRequest"); } } 
 /// <summary>&quot;Not authorized&quot;</summary> 
 public static string AddressBar_Invalid_DialogTitle_Unauthorized { get { return T("AddressBar.Invalid.DialogTitle.Unauthorized"); } } 
 /// <summary>&quot;You are not authorized to view the page on specified URL.&quot;</summary> 
 public static string AddressBar_Invalid_DialogText_Unauthorized { get { return T("AddressBar.Invalid.DialogText.Unauthorized"); } } 
 /// <summary>&quot;Page not found&quot;</summary> 
 public static string AddressBar_Invalid_DialogTitle_NotFound { get { return T("AddressBar.Invalid.DialogTitle.NotFound"); } } 
 /// <summary>&quot;Page not found on the specified URL.&quot;</summary> 
 public static string AddressBar_Invalid_DialogText_NotFound { get { return T("AddressBar.Invalid.DialogText.NotFound"); } } 
 /// <summary>&quot;Server error&quot;</summary> 
 public static string AddressBar_Invalid_DialogTitle_InternalError { get { return T("AddressBar.Invalid.DialogTitle.InternalError"); } } 
 /// <summary>&quot;The server has reported an error on the specified URL. The page cannot be loaded.&quot;</summary> 
 public static string AddressBar_Invalid_DialogText_InternalError { get { return T("AddressBar.Invalid.DialogText.InternalError"); } } 
 /// <summary>&quot;Page not loaded&quot;</summary> 
 public static string AddressBar_Invalid_DialogTitle_Default { get { return T("AddressBar.Invalid.DialogTitle.Default"); } } 
 /// <summary>&quot;An error prevents the URL from being loaded.&quot;</summary> 
 public static string AddressBar_Invalid_DialogText_Default { get { return T("AddressBar.Invalid.DialogText.Default"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.PageBrowser", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_SEOAssistant {
 /// <summary>&quot;SEO Assistant&quot;</summary> 
 public static string SEOAssistant { get { return T("SEOAssistant"); } } 
 /// <summary>&quot;Search engine optimization&quot;</summary> 
 public static string SEOAssistant_ToolTip { get { return T("SEOAssistant.ToolTip"); } } 
 /// <summary>&quot;Generate a page preview to compute the SEO indication.&quot;</summary> 
 public static string IntroText { get { return T("IntroText"); } } 
 /// <summary>&quot;Result&quot;</summary> 
 public static string TabResult { get { return T("TabResult"); } } 
 /// <summary>&quot;Keywords&quot;</summary> 
 public static string TabKeywords { get { return T("TabKeywords"); } } 
 /// <summary>&quot;Keywords found in page preview:&quot;</summary> 
 public static string ResultHeading { get { return T("ResultHeading"); } } 
 /// <summary>&quot;No keywords configured.&quot;</summary> 
 public static string NoKeywordsWarning { get { return T("NoKeywordsWarning"); } } 
 /// <summary>&quot;In title&quot;</summary> 
 public static string isInTitle { get { return T("isInTitle"); } } 
 /// <summary>&quot;In URL&quot;</summary> 
 public static string isInURL { get { return T("isInURL"); } } 
 /// <summary>&quot;In menu title&quot;</summary> 
 public static string isInMenuTitle { get { return T("isInMenuTitle"); } } 
 /// <summary>&quot;In description&quot;</summary> 
 public static string isInDescription { get { return T("isInDescription"); } } 
 /// <summary>&quot;In heading&quot;</summary> 
 public static string isInHeading { get { return T("isInHeading"); } } 
 /// <summary>&quot;In content&quot;</summary> 
 public static string isInContent { get { return T("isInContent"); } } 
 /// <summary>&quot;No keywords found in page preview&quot;</summary> 
 public static string NoKeywords { get { return T("NoKeywords"); } } 
 /// <summary>&quot;Failed to analyze the keywords because the markup is not valid&quot;</summary> 
 public static string IncorrectHtml { get { return T("IncorrectHtml"); } } 
 /// <summary>&quot;Add SEO word ...&quot;</summary> 
 public static string AddKeywordInputPlaceholder { get { return T("AddKeywordInputPlaceholder"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.SEOAssistant", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_SourceEditor {
 /// <summary>&quot;Retrieved on SourceEditorBinding startup to make sure strings are loaded :)&quot;</summary> 
 public static string Preload_Key { get { return T("Preload.Key"); } } 
 /// <summary>&quot;Invalid XHTML&quot;</summary> 
 public static string Invalid_HTML_DialogTitle { get { return T("Invalid.HTML.DialogTitle"); } } 
 /// <summary>&quot;The root &lt;html&gt; tag is missing.&quot;</summary> 
 public static string Invalid_HTML_MissingHtml { get { return T("Invalid.HTML.MissingHtml"); } } 
 /// <summary>&quot;The &lt;head&gt; tag is missing.&quot;</summary> 
 public static string Invalid_HTML_MissingHead { get { return T("Invalid.HTML.MissingHead"); } } 
 /// <summary>&quot;The &lt;body&gt; tag is missing.&quot;</summary> 
 public static string Invalid_HTML_MissingBody { get { return T("Invalid.HTML.MissingBody"); } } 
 /// <summary>&quot;The &lt;head&gt; tag must precede &lt;body&gt;.&quot;</summary> 
 public static string Invalid_HTML_HeadBodyIndex { get { return T("Invalid.HTML.HeadBodyIndex"); } } 
 /// <summary>&quot;The root namespace is wrong.&quot;</summary> 
 public static string Invalid_HTML_NamespaceURI { get { return T("Invalid.HTML.NamespaceURI"); } } 
 /// <summary>&quot;Only one &lt;body&gt; tag allowed.&quot;</summary> 
 public static string Invalid_HTML_MultipleBody { get { return T("Invalid.HTML.MultipleBody"); } } 
 /// <summary>&quot;Only one &lt;head&gt; tag allowed.&quot;</summary> 
 public static string Invalid_HTML_MultipleHead { get { return T("Invalid.HTML.MultipleHead"); } } 
 /// <summary>&quot;The root &lt;html&gt; tag can only have &lt;head&gt; and &lt;body&gt; tags as children.&quot;</summary> 
 public static string Invalid_HTML_NotAllowedHtmlChild { get { return T("Invalid.HTML.NotAllowedHtmlChild"); } } 
 /// <summary>&quot;Source format aborted&quot;</summary> 
 public static string Format_XML_ErrorDialog_Title { get { return T("Format.XML.ErrorDialog.Title"); } } 
 /// <summary>&quot;XML source formatting requires a well-formed document structure.&quot;</summary> 
 public static string Format_XML_ErrorDialog_Text { get { return T("Format.XML.ErrorDialog.Text"); } } 
 /// <summary>&quot;Plain Edit&quot;</summary> 
 public static string Switch_PlainEdit_Label { get { return T("Switch.PlainEdit.Label"); } } 
 /// <summary>&quot;No syntax highlight, faster performance&quot;</summary> 
 public static string Switch_PlainEdit_ToolTip { get { return T("Switch.PlainEdit.ToolTip"); } } 
 /// <summary>&quot;Colored Edit&quot;</summary> 
 public static string Switch_ColoredEdit_Label { get { return T("Switch.ColoredEdit.Label"); } } 
 /// <summary>&quot;Syntax highlight, slower performance&quot;</summary> 
 public static string Switch_ColoredEdit_ToolTip { get { return T("Switch.ColoredEdit.ToolTip"); } } 
 /// <summary>&quot;Insert&quot;</summary> 
 public static string Toolbar_Insert_Label { get { return T("Toolbar.Insert.Label"); } } 
 /// <summary>&quot;Format&quot;</summary> 
 public static string Toolbar_Format_Label { get { return T("Toolbar.Format.Label"); } } 
 /// <summary>&quot;Format XML source&quot;</summary> 
 public static string Toolbar_Format_ToolTip { get { return T("Toolbar.Format.ToolTip"); } } 
 /// <summary>&quot;Page URL&quot;</summary> 
 public static string Insert_PageURL_Label { get { return T("Insert.PageURL.Label"); } } 
 /// <summary>&quot;Image URL&quot;</summary> 
 public static string Insert_ImageURL_Label { get { return T("Insert.ImageURL.Label"); } } 
 /// <summary>&quot;Media URL&quot;</summary> 
 public static string Insert_MediaURL_Label { get { return T("Insert.MediaURL.Label"); } } 
 /// <summary>&quot;Frontend URL&quot;</summary> 
 public static string Insert_FrontendURL_Label { get { return T("Insert.FrontendURL.Label"); } } 
 /// <summary>&quot;Function Markup&quot;</summary> 
 public static string Insert_FunctionMarkup_Label { get { return T("Insert.FunctionMarkup.Label"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.SourceEditor", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_UrlConfiguration {
 /// <summary>&quot;URL Configuration&quot;</summary> 
 public static string Tree_ConfigurationElementLabel { get { return T("Tree.ConfigurationElementLabel"); } } 
 /// <summary>&quot;This section allows configuring shorter and friendlier urls&quot;</summary> 
 public static string Tree_ConfigurationElementToolTip { get { return T("Tree.ConfigurationElementToolTip"); } } 
 /// <summary>&quot;Edit URL Configuration&quot;</summary> 
 public static string Tree_ConfigurationElementEditLabel { get { return T("Tree.ConfigurationElementEditLabel"); } } 
 /// <summary>&quot;Edit URL Configuration&quot;</summary> 
 public static string Tree_ConfigurationElementEditToolTip { get { return T("Tree.ConfigurationElementEditToolTip"); } } 
 /// <summary>&quot;Hostnames&quot;</summary> 
 public static string Tree_HostnamesFolderLabel { get { return T("Tree.HostnamesFolderLabel"); } } 
 /// <summary>&quot;Here you can map a hostname to a site&quot;</summary> 
 public static string Tree_HostnamesFolderToolTip { get { return T("Tree.HostnamesFolderToolTip"); } } 
 /// <summary>&quot;Add Hostname&quot;</summary> 
 public static string Tree_AddHostnameLabel { get { return T("Tree.AddHostnameLabel"); } } 
 /// <summary>&quot;Add a new hostname mapping&quot;</summary> 
 public static string Tree_AddHostnameToolTip { get { return T("Tree.AddHostnameToolTip"); } } 
 /// <summary>&quot;Edit Hostname&quot;</summary> 
 public static string Tree_EditHostnameLabel { get { return T("Tree.EditHostnameLabel"); } } 
 /// <summary>&quot;Edit this hostname mapping&quot;</summary> 
 public static string Tree_EditHostnameToolTip { get { return T("Tree.EditHostnameToolTip"); } } 
 /// <summary>&quot;Delete Hostname&quot;</summary> 
 public static string Tree_DeleteHostnameLabel { get { return T("Tree.DeleteHostnameLabel"); } } 
 /// <summary>&quot;Delete this hostname mapping&quot;</summary> 
 public static string Tree_DeleteHostnameToolTip { get { return T("Tree.DeleteHostnameToolTip"); } } 
 /// <summary>&quot;UrlConfiguration&quot;</summary> 
 public static string Tree_UrlConfigurationLabel { get { return T("Tree.UrlConfigurationLabel"); } } 
 /// <summary>&quot;URL Configuration&quot;</summary> 
 public static string UrlConfiguration_Title { get { return T("UrlConfiguration.Title"); } } 
 /// <summary>&quot;Page URL Suffix&quot;</summary> 
 public static string UrlConfiguration_PageUrlSuffix_Label { get { return T("UrlConfiguration.PageUrlSuffix.Label"); } } 
 /// <summary>&quot;A string that will be appended to all page urls. F.e. &apos;.aspx&apos; or &apos;.html&apos;, leaving this field empty will produce extensionless urls&quot;</summary> 
 public static string UrlConfiguration_PageUrlSuffix_Help { get { return T("UrlConfiguration.PageUrlSuffix.Help"); } } 
 /// <summary>&quot;New Hostname&quot;</summary> 
 public static string HostnameBinding_AddNewHostnameTitle { get { return T("HostnameBinding.AddNewHostnameTitle"); } } 
 /// <summary>&quot;Hostname&quot;</summary> 
 public static string HostnameBinding_Hostname_Label { get { return T("HostnameBinding.Hostname.Label"); } } 
 /// <summary>&quot;Hostname to which current url building rules will be applied&quot;</summary> 
 public static string HostnameBinding_Hostname_Help { get { return T("HostnameBinding.Hostname.Help"); } } 
 /// <summary>&quot;Page&quot;</summary> 
 public static string HostnameBinding_Page_Label { get { return T("HostnameBinding.Page.Label"); } } 
 /// <summary>&quot;Root page that will be the default page for the current hostname&quot;</summary> 
 public static string HostnameBinding_Page_Help { get { return T("HostnameBinding.Page.Help"); } } 
 /// <summary>&quot;URL&quot;</summary> 
 public static string HostnameBinding_IncludeHomepageUrlTitle_Label { get { return T("HostnameBinding.IncludeHomepageUrlTitle.Label"); } } 
 /// <summary>&quot;Include homepage URL Title&quot;</summary> 
 public static string HostnameBinding_IncludeHomepageUrlTitle_ItemLabel { get { return T("HostnameBinding.IncludeHomepageUrlTitle.ItemLabel"); } } 
 /// <summary>&quot;Determines whether root page&apos;s title should be a part of url. Not having it checked produces shorter urls&quot;</summary> 
 public static string HostnameBinding_IncludeHomepageUrlTitle_Help { get { return T("HostnameBinding.IncludeHomepageUrlTitle.Help"); } } 
 /// <summary>&quot;Include language URL mapping&quot;</summary> 
 public static string HostnameBinding_IncludeLanguageUrlMapping_ItemLabel { get { return T("HostnameBinding.IncludeLanguageUrlMapping.ItemLabel"); } } 
 /// <summary>&quot;Determines whether language code should be a part of a url&quot;</summary> 
 public static string HostnameBinding_IncludeLanguageUrlMapping_Help { get { return T("HostnameBinding.IncludeLanguageUrlMapping.Help"); } } 
 /// <summary>&quot;Custom 404 Page&quot;</summary> 
 public static string HostnameBinding_Custom404Page_Label { get { return T("HostnameBinding.Custom404Page.Label"); } } 
 /// <summary>&quot;Url to which request will be redirected in the case there&apos;s a request to non-existent c1 page&quot;</summary> 
 public static string HostnameBinding_Custom404Page_Help { get { return T("HostnameBinding.Custom404Page.Help"); } } 
 /// <summary>&quot;Alias hostnames&quot;</summary> 
 public static string HostnameBinding_Aliases_Label { get { return T("HostnameBinding.Aliases.Label"); } } 
 /// <summary>&quot;Hostnames from which all requests will be redirected to the current hostname&quot;</summary> 
 public static string HostnameBinding_Aliases_Help { get { return T("HostnameBinding.Aliases.Help"); } } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.UrlConfiguration", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_VisualEditor {
 /// <summary>&quot;Retrieved on VisualEditorBinding startup to make sure strings are loaded :)&quot;</summary> 
 public static string Preload_Key { get { return T("Preload.Key"); } } 
 /// <summary>&quot;Strong text&quot;</summary> 
 public static string ToolBar_ToolTipStrong { get { return T("ToolBar.ToolTipStrong"); } } 
 /// <summary>&quot;Emphasize text&quot;</summary> 
 public static string ToolBar_ToolTipEmphasize { get { return T("ToolBar.ToolTipEmphasize"); } } 
 /// <summary>&quot;Underline text&quot;</summary> 
 public static string ToolBar_ToolTipUnderline { get { return T("ToolBar.ToolTipUnderline"); } } 
 /// <summary>&quot;Strike text&quot;</summary> 
 public static string ToolBar_ToolTipStrike { get { return T("ToolBar.ToolTipStrike"); } } 
 /// <summary>&quot;Align left&quot;</summary> 
 public static string ToolBar_ToolTipAlignLeft { get { return T("ToolBar.ToolTipAlignLeft"); } } 
 /// <summary>&quot;Align right&quot;</summary> 
 public static string ToolBar_ToolTipAlignRight { get { return T("ToolBar.ToolTipAlignRight"); } } 
 /// <summary>&quot;Justify left&quot;</summary> 
 public static string ToolBar_ToolTipJustifyLeft { get { return T("ToolBar.ToolTipJustifyLeft"); } } 
 /// <summary>&quot;Justify right&quot;</summary> 
 public static string ToolBar_ToolTipJustifyRight { get { return T("ToolBar.ToolTipJustifyRight"); } } 
 /// <summary>&quot;Justify center&quot;</summary> 
 public static string ToolBar_ToolTipJustifyCenter { get { return T("ToolBar.ToolTipJustifyCenter"); } } 
 /// <summary>&quot;Justify full&quot;</summary> 
 public static string ToolBar_ToolTipJustifyFull { get { return T("ToolBar.ToolTipJustifyFull"); } } 
 /// <summary>&quot;Unordered list&quot;</summary> 
 public static string ToolBar_ToolTipUnorderedList { get { return T("ToolBar.ToolTipUnorderedList"); } } 
 /// <summary>&quot;Ordered list&quot;</summary> 
 public static string ToolBar_ToolTipOrderedList { get { return T("ToolBar.ToolTipOrderedList"); } } 
 /// <summary>&quot;Link&quot;</summary> 
 public static string ToolBar_ToolTipLink { get { return T("ToolBar.ToolTipLink"); } } 
 /// <summary>&quot;Delete link&quot;</summary> 
 public static string ToolBar_ToolTipDeleteLink { get { return T("ToolBar.ToolTipDeleteLink"); } } 
 /// <summary>&quot;Cleanup messy code&quot;</summary> 
 public static string ToolBar_ToolTipCleanup { get { return T("ToolBar.ToolTipCleanup"); } } 
 /// <summary>&quot;Undo&quot;</summary> 
 public static string ToolBar_ToolTipUndo { get { return T("ToolBar.ToolTipUndo"); } } 
 /// <summary>&quot;Redo&quot;</summary> 
 public static string ToolBar_ToolTipRedo { get { return T("ToolBar.ToolTipRedo"); } } 
 /// <summary>&quot;Source&quot;</summary> 
 public static string ToolBar_LabelSource { get { return T("ToolBar.LabelSource"); } } 
 /// <summary>&quot;Visual&quot;</summary> 
 public static string ToolBar_LabelWysiwyg { get { return T("ToolBar.LabelWysiwyg"); } } 
 /// <summary>&quot;Paragraph&quot;</summary> 
 public static string FormatSelector_LabelParagraph { get { return T("FormatSelector.LabelParagraph"); } } 
 /// <summary>&quot;Address&quot;</summary> 
 public static string FormatSelector_LabelAddress { get { return T("FormatSelector.LabelAddress"); } } 
 /// <summary>&quot;Blockquote&quot;</summary> 
 public static string FormatSelector_LabelBlockQuote { get { return T("FormatSelector.LabelBlockQuote"); } } 
 /// <summary>&quot;Division&quot;</summary> 
 public static string FormatSelector_LabelDivision { get { return T("FormatSelector.LabelDivision"); } } 
 /// <summary>&quot;Heading 1&quot;</summary> 
 public static string FormatSelector_LabelHeading1 { get { return T("FormatSelector.LabelHeading1"); } } 
 /// <summary>&quot;Heading 2&quot;</summary> 
 public static string FormatSelector_LabelHeading2 { get { return T("FormatSelector.LabelHeading2"); } } 
 /// <summary>&quot;Heading 3&quot;</summary> 
 public static string FormatSelector_LabelHeading3 { get { return T("FormatSelector.LabelHeading3"); } } 
 /// <summary>&quot;Heading 4&quot;</summary> 
 public static string FormatSelector_LabelHeading4 { get { return T("FormatSelector.LabelHeading4"); } } 
 /// <summary>&quot;Heading 5&quot;</summary> 
 public static string FormatSelector_LabelHeading5 { get { return T("FormatSelector.LabelHeading5"); } } 
 /// <summary>&quot;Heading 6&quot;</summary> 
 public static string FormatSelector_LabelHeading6 { get { return T("FormatSelector.LabelHeading6"); } } 
 /// <summary>&quot;(None)&quot;</summary> 
 public static string ClassSelector_LabelNone { get { return T("ClassSelector.LabelNone"); } } 
 /// <summary>&quot;Insert&quot;</summary> 
 public static string ContextMenu_LabelInsert { get { return T("ContextMenu.LabelInsert"); } } 
 /// <summary>&quot;Paste&quot;</summary> 
 public static string ContextMenu_LabelPaste { get { return T("ContextMenu.LabelPaste"); } } 
 /// <summary>&quot;Link&quot;</summary> 
 public static string ContextMenu_LabelLink { get { return T("ContextMenu.LabelLink"); } } 
 /// <summary>&quot;Unlink&quot;</summary> 
 public static string ContextMenu_LabelUnLink { get { return T("ContextMenu.LabelUnLink"); } } 
 /// <summary>&quot;Link Properties&quot;</summary> 
 public static string ContextMenu_LabelLinkProperties { get { return T("ContextMenu.LabelLinkProperties"); } } 
 /// <summary>&quot;Table…&quot;</summary> 
 public static string ContextMenu_LabelTable { get { return T("ContextMenu.LabelTable"); } } 
 /// <summary>&quot;Manage Table&quot;</summary> 
 public static string ContextMenu_LabelTableManage { get { return T("ContextMenu.LabelTableManage"); } } 
 /// <summary>&quot;Image…&quot;</summary> 
 public static string ContextMenu_LabelImage { get { return T("ContextMenu.LabelImage"); } } 
 /// <summary>&quot;As Simple Text…&quot;</summary> 
 public static string ContextMenu_LabelAsText { get { return T("ContextMenu.LabelAsText"); } } 
 /// <summary>&quot;Field&quot;</summary> 
 public static string ContextMenu_LabelField { get { return T("ContextMenu.LabelField"); } } 
 /// <summary>&quot;Delete Field&quot;</summary> 
 public static string ContextMenu_LabelFieldDelete { get { return T("ContextMenu.LabelFieldDelete"); } } 
 /// <summary>&quot;Function…&quot;</summary> 
 public static string ContextMenu_LabelRendering { get { return T("ContextMenu.LabelRendering"); } } 
 /// <summary>&quot;Character…&quot;</summary> 
 public static string ContextMenu_LabelCharacter { get { return T("ContextMenu.LabelCharacter"); } } 
 /// <summary>&quot;Image Properties…&quot;</summary> 
 public static string ContextMenu_LabelImageProperties { get { return T("ContextMenu.LabelImageProperties"); } } 
 /// <summary>&quot;Function Properties…&quot;</summary> 
 public static string ContextMenu_LabelRenderingProperties { get { return T("ContextMenu.LabelRenderingProperties"); } } 
 /// <summary>&quot;Cut Row&quot;</summary> 
 public static string ContextMenu_LabelCutRow { get { return T("ContextMenu.LabelCutRow"); } } 
 /// <summary>&quot;Copy Row&quot;</summary> 
 public static string ContextMenu_LabelCopyRow { get { return T("ContextMenu.LabelCopyRow"); } } 
 /// <summary>&quot;Paste Row&quot;</summary> 
 public static string ContextMenu_LabelPasteRow { get { return T("ContextMenu.LabelPasteRow"); } } 
 /// <summary>&quot;Before&quot;</summary> 
 public static string ContextMenu_LabelBefore { get { return T("ContextMenu.LabelBefore"); } } 
 /// <summary>&quot;After&quot;</summary> 
 public static string ContextMenu_LabelAfter { get { return T("ContextMenu.LabelAfter"); } } 
 /// <summary>&quot;Table Properties&quot;</summary> 
 public static string ContextMenu_LabelTableProperties { get { return T("ContextMenu.LabelTableProperties"); } } 
 /// <summary>&quot;Cell Properties&quot;</summary> 
 public static string ContextMenu_LabelCellProperties { get { return T("ContextMenu.LabelCellProperties"); } } 
 /// <summary>&quot;Row Properties&quot;</summary> 
 public static string ContextMenu_LabelRowProperties { get { return T("ContextMenu.LabelRowProperties"); } } 
 /// <summary>&quot;Insert Row&quot;</summary> 
 public static string ContextMenu_LabelInsertRow { get { return T("ContextMenu.LabelInsertRow"); } } 
 /// <summary>&quot;Delete Row&quot;</summary> 
 public static string ContextMenu_LabelDeleteRow { get { return T("ContextMenu.LabelDeleteRow"); } } 
 /// <summary>&quot;Insert Column&quot;</summary> 
 public static string ContextMenu_LabelInsertcolumn { get { return T("ContextMenu.LabelInsertcolumn"); } } 
 /// <summary>&quot;Delete Column&quot;</summary> 
 public static string ContextMenu_LabelDeleteColumn { get { return T("ContextMenu.LabelDeleteColumn"); } } 
 /// <summary>&quot;Merge Table Cells&quot;</summary> 
 public static string ContextMenu_LabelMergeTableCells { get { return T("ContextMenu.LabelMergeTableCells"); } } 
 /// <summary>&quot;Split Merged Cells&quot;</summary> 
 public static string ContextMenu_LabelSplitMergedCells { get { return T("ContextMenu.LabelSplitMergedCells"); } } 
 /// <summary>&quot;Delete Table&quot;</summary> 
 public static string ContextMenu_LabelDeleteTable { get { return T("ContextMenu.LabelDeleteTable"); } } 
 /// <summary>&quot;Align Image&quot;</summary> 
 public static string ContextMenu_LabelAlignImage { get { return T("ContextMenu.LabelAlignImage"); } } 
 /// <summary>&quot;Right&quot;</summary> 
 public static string ContextMenu_LabelAlignImageRight { get { return T("ContextMenu.LabelAlignImageRight"); } } 
 /// <summary>&quot;Left&quot;</summary> 
 public static string ContextMenu_LabelAlignImageLeft { get { return T("ContextMenu.LabelAlignImageLeft"); } } 
 /// <summary>&quot;None&quot;</summary> 
 public static string ContextMenu_LabelAlignImageNone { get { return T("ContextMenu.LabelAlignImageNone"); } } 
 /// <summary>&quot;Source code error&quot;</summary> 
 public static string ContentError_DialogTitle { get { return T("ContentError.DialogTitle"); } } 
 /// <summary>&quot;Error in source code:&quot;</summary> 
 public static string ContentError_DialogText { get { return T("ContentError.DialogText"); } } 
 /// <summary>&quot;No placeholders in template.&quot;</summary> 
 public static string TemplateTree_NoTemplateWarning { get { return T("TemplateTree.NoTemplateWarning"); } } 
 /// <summary>&quot;Basic&quot;</summary> 
 public static string LabelTabBasic { get { return T("LabelTabBasic"); } } 
 /// <summary>&quot;Advanced&quot;</summary> 
 public static string LabelTabAdvanced { get { return T("LabelTabAdvanced"); } } 
 /// <summary>&quot;Class&quot;</summary> 
 public static string LabelClass { get { return T("LabelClass"); } } 
 /// <summary>&quot;The class attribute specifies a CSS classname for an element.&quot;</summary> 
 public static string HelpClass { get { return T("HelpClass"); } } 
 /// <summary>&quot;ID&quot;</summary> 
 public static string LabelId { get { return T("LabelId"); } } 
 /// <summary>&quot;The id attribute can be used by JavaScript or CSS to make changes to an element.&quot;</summary> 
 public static string HelpId { get { return T("HelpId"); } } 
 /// <summary>&quot;Clipboard disabled&quot;</summary> 
 public static string MozSecurityNote_LabelSecurityStuff { get { return T("MozSecurityNote.LabelSecurityStuff"); } } 
 /// <summary>&quot;For security reasons, access to the clipboard was blocked by your browser. Please use standard keyboard shortcuts. For a technical description of, how to configure your browser for use with {applicationname}, press the &quot;More Info&quot; button.&quot;</summary> 
 public static string MozSecurityNote_TextSecurityStuff { get { return T("MozSecurityNote.TextSecurityStuff"); } } 
 /// <summary>&quot;Insert Link&quot;</summary> 
 public static string Link_LabelInsertLink { get { return T("Link.LabelInsertLink"); } } 
 /// <summary>&quot;Link Properties&quot;</summary> 
 public static string Link_LabelLinkProperties { get { return T("Link.LabelLinkProperties"); } } 
 /// <summary>&quot;URL&quot;</summary> 
 public static string Link_LinkDestination { get { return T("Link.LinkDestination"); } } 
 /// <summary>&quot;Role&quot;</summary> 
 public static string Link_LinkRole { get { return T("Link.LinkRole"); } } 
 /// <summary>&quot;Title&quot;</summary> 
 public static string Link_TitleText { get { return T("Link.TitleText"); } } 
 /// <summary>&quot;Target&quot;</summary> 
 public static string Link_LinkTarget { get { return T("Link.LinkTarget"); } } 
 /// <summary>&quot;Open in new window&quot;</summary> 
 public static string Link_LinkTarget_LabelCheckBox { get { return T("Link.LinkTarget.LabelCheckBox"); } } 
 /// <summary>&quot;The title text is rendered as a tooltip when the mouse hovers over the link. This can be used to let your customers know where the link is going without disturbing the flow of your text.&quot;</summary> 
 public static string Link_TitleTextToolTip { get { return T("Link.TitleTextToolTip"); } } 
 /// <summary>&quot;Link properties&quot;</summary> 
 public static string Link_LabelLink { get { return T("Link.LabelLink"); } } 
 /// <summary>&quot;Cell type&quot;</summary> 
 public static string Tables_Cell_CellType { get { return T("Tables.Cell.CellType"); } } 
 /// <summary>&quot;Cell width&quot;</summary> 
 public static string Tables_Cell_LabelWidth { get { return T("Tables.Cell.LabelWidth"); } } 
 /// <summary>&quot;Horizontal alignment&quot;</summary> 
 public static string Tables_Cell_HorizontalAlignment { get { return T("Tables.Cell.HorizontalAlignment"); } } 
 /// <summary>&quot;Vertical alignment&quot;</summary> 
 public static string Tables_Cell_VerticalAlignment { get { return T("Tables.Cell.VerticalAlignment"); } } 
 /// <summary>&quot;Apply changes to&quot;</summary> 
 public static string Tables_Cell_ApplyTo { get { return T("Tables.Cell.ApplyTo"); } } 
 /// <summary>&quot;Cell Properties&quot;</summary> 
 public static string Tables_Cell_LabelCellProperties { get { return T("Tables.Cell.LabelCellProperties"); } } 
 /// <summary>&quot;Layout&quot;</summary> 
 public static string Tables_Cell_LabelLayout { get { return T("Tables.Cell.LabelLayout"); } } 
 /// <summary>&quot;Data Cell&quot;</summary> 
 public static string Tables_Cell_LabelDataCell { get { return T("Tables.Cell.LabelDataCell"); } } 
 /// <summary>&quot;Header Cell&quot;</summary> 
 public static string Tables_Cell_LabelHeaderCell { get { return T("Tables.Cell.LabelHeaderCell"); } } 
 /// <summary>&quot;Left&quot;</summary> 
 public static string Tables_Cell_LabelLeft { get { return T("Tables.Cell.LabelLeft"); } } 
 /// <summary>&quot;Right&quot;</summary> 
 public static string Tables_Cell_LabelRight { get { return T("Tables.Cell.LabelRight"); } } 
 /// <summary>&quot;Top&quot;</summary> 
 public static string Tables_Cell_LabelTop { get { return T("Tables.Cell.LabelTop"); } } 
 /// <summary>&quot;Center&quot;</summary> 
 public static string Tables_Cell_LabelCenter { get { return T("Tables.Cell.LabelCenter"); } } 
 /// <summary>&quot;Bottom&quot;</summary> 
 public static string Tables_Cell_LabelBottom { get { return T("Tables.Cell.LabelBottom"); } } 
 /// <summary>&quot;Scope&quot;</summary> 
 public static string Tables_Cell_LabelScope { get { return T("Tables.Cell.LabelScope"); } } 
 /// <summary>&quot;Current cell&quot;</summary> 
 public static string Tables_Cell_LabelCurrentCell { get { return T("Tables.Cell.LabelCurrentCell"); } } 
 /// <summary>&quot;All cells in row&quot;</summary> 
 public static string Tables_Cell_LabelAllRowCells { get { return T("Tables.Cell.LabelAllRowCells"); } } 
 /// <summary>&quot;All cells in table&quot;</summary> 
 public static string Tables_Cell_LabelAllTableCells { get { return T("Tables.Cell.LabelAllTableCells"); } } 
 /// <summary>&quot;Columns&quot;</summary> 
 public static string Tables_Merge_Columns { get { return T("Tables.Merge.Columns"); } } 
 /// <summary>&quot;Rows&quot;</summary> 
 public static string Tables_Merge_Rows { get { return T("Tables.Merge.Rows"); } } 
 /// <summary>&quot;Merge Table Cells&quot;</summary> 
 public static string Tables_Merge_LabelMergeCells { get { return T("Tables.Merge.LabelMergeCells"); } } 
 /// <summary>&quot;Row in table part&quot;</summary> 
 public static string Tables_Row_Rows { get { return T("Tables.Row.Rows"); } } 
 /// <summary>&quot;Horizontal Alignment&quot;</summary> 
 public static string Tables_Row_HorizontalAlignment { get { return T("Tables.Row.HorizontalAlignment"); } } 
 /// <summary>&quot;Vertical Alignment&quot;</summary> 
 public static string Tables_Row_VerticalAlignment { get { return T("Tables.Row.VerticalAlignment"); } } 
 /// <summary>&quot;Apply changes to&quot;</summary> 
 public static string Tables_Row_ApplyTo { get { return T("Tables.Row.ApplyTo"); } } 
 /// <summary>&quot;Row Properties&quot;</summary> 
 public static string Tables_Row_LabelRowProperties { get { return T("Tables.Row.LabelRowProperties"); } } 
 /// <summary>&quot;Layout&quot;</summary> 
 public static string Tables_Row_LabelLayout { get { return T("Tables.Row.LabelLayout"); } } 
 /// <summary>&quot;Table Head&quot;</summary> 
 public static string Tables_Row_LabelTableHead { get { return T("Tables.Row.LabelTableHead"); } } 
 /// <summary>&quot;Table Body&quot;</summary> 
 public static string Tables_Row_LabelTableBody { get { return T("Tables.Row.LabelTableBody"); } } 
 /// <summary>&quot;Table Foot&quot;</summary> 
 public static string Tables_Row_LabelTableFoot { get { return T("Tables.Row.LabelTableFoot"); } } 
 /// <summary>&quot;Left&quot;</summary> 
 public static string Tables_Row_LabelLeft { get { return T("Tables.Row.LabelLeft"); } } 
 /// <summary>&quot;Center&quot;</summary> 
 public static string Tables_Row_LabelCenter { get { return T("Tables.Row.LabelCenter"); } } 
 /// <summary>&quot;Right&quot;</summary> 
 public static string Tables_Row_LabelRight { get { return T("Tables.Row.LabelRight"); } } 
 /// <summary>&quot;Top&quot;</summary> 
 public static string Tables_Row_LabelTop { get { return T("Tables.Row.LabelTop"); } } 
 /// <summary>&quot;Bottom&quot;</summary> 
 public static string Tables_Row_LabelBottom { get { return T("Tables.Row.LabelBottom"); } } 
 /// <summary>&quot;Scope&quot;</summary> 
 public static string Tables_Row_LabelScope { get { return T("Tables.Row.LabelScope"); } } 
 /// <summary>&quot;Current row&quot;</summary> 
 public static string Tables_Row_LabelCurrentRow { get { return T("Tables.Row.LabelCurrentRow"); } } 
 /// <summary>&quot;Odd rows in table&quot;</summary> 
 public static string Tables_Row_LabelOddRows { get { return T("Tables.Row.LabelOddRows"); } } 
 /// <summary>&quot;Even rows in table&quot;</summary> 
 public static string Tables_Row_LabelEvenRows { get { return T("Tables.Row.LabelEvenRows"); } } 
 /// <summary>&quot;All rows in table&quot;</summary> 
 public static string Tables_Row_LabelAllRows { get { return T("Tables.Row.LabelAllRows"); } } 
 /// <summary>&quot;Insert Table&quot;</summary> 
 public static string Tables_Table_TitleInsert { get { return T("Tables.Table.TitleInsert"); } } 
 /// <summary>&quot;Table Properties&quot;</summary> 
 public static string Tables_Table_TitleUpdate { get { return T("Tables.Table.TitleUpdate"); } } 
 /// <summary>&quot;Columns&quot;</summary> 
 public static string Tables_Table_Columns { get { return T("Tables.Table.Columns"); } } 
 /// <summary>&quot;Rows&quot;</summary> 
 public static string Tables_Table_Rows { get { return T("Tables.Table.Rows"); } } 
 /// <summary>&quot;Summary&quot;</summary> 
 public static string Tables_Table_Summary { get { return T("Tables.Table.Summary"); } } 
 /// <summary>&quot;The summary explains the table content and structure so that people using non-visual browsers (such as blind people) may better understand it. This is especially important for tables without captions.&quot;</summary> 
 public static string Tables_Table_SummaryHelp { get { return T("Tables.Table.SummaryHelp"); } } 
 /// <summary>&quot;Table layout&quot;</summary> 
 public static string Tables_Table_LabelLayout { get { return T("Tables.Table.LabelLayout"); } } 
 /// <summary>&quot;Table description&quot;</summary> 
 public static string Tables_Table_LabelMeta { get { return T("Tables.Table.LabelMeta"); } } 
 /// <summary>&quot;Source&quot;</summary> 
 public static string Image_Source { get { return T("Image.Source"); } } 
 /// <summary>&quot;Alternate text&quot;</summary> 
 public static string Image_AlternativeText { get { return T("Image.AlternativeText"); } } 
 /// <summary>&quot;The alternate text is displayed as visible text in browsers where images cannot be rendered normally. This may be the case for mobile phone browsers and special browsers for the visually impaired. The alt attribute should clearly describe the content of the image.&quot;</summary> 
 public static string Image_AlternativeTextToolTip { get { return T("Image.AlternativeTextToolTip"); } } 
 /// <summary>&quot;Title text&quot;</summary> 
 public static string Image_TitleText { get { return T("Image.TitleText"); } } 
 /// <summary>&quot;The title text is rendered as a tooltip when the mouse hovers over the image. An image that might be confusing for the viewer can be instantly clarified by a title.&quot;</summary> 
 public static string Image_TitleTextToolTip { get { return T("Image.TitleTextToolTip"); } } 
 /// <summary>&quot;Image properties&quot;</summary> 
 public static string Image_LabelImage { get { return T("Image.LabelImage"); } } 
 /// <summary>&quot;Insert Image&quot;</summary> 
 public static string Image_LabelInsertImage { get { return T("Image.LabelInsertImage"); } } 
 /// <summary>&quot;Image Properties&quot;</summary> 
 public static string Image_LabelImageProperties { get { return T("Image.LabelImageProperties"); } } 
 /// <summary>&quot;Maximum Width&quot;</summary> 
 public static string Image_MaxWidth { get { return T("Image.MaxWidth"); } } 
 /// <summary>&quot;If the width of the image is bigger that the specified value, it will be downsized to the specified value.&quot;</summary> 
 public static string Image_MaxWidthToolTip { get { return T("Image.MaxWidthToolTip"); } } 
 /// <summary>&quot;Maximum Height&quot;</summary> 
 public static string Image_MaxHeight { get { return T("Image.MaxHeight"); } } 
 /// <summary>&quot;If the height of the image is bigger that the specified value, it will be downsized to the specified value.&quot;</summary> 
 public static string Image_MaxHeightToolTip { get { return T("Image.MaxHeightToolTip"); } } 
 /// <summary>&quot;Select Character&quot;</summary> 
 public static string CharMap_LabelSelectSpecialChar { get { return T("CharMap.LabelSelectSpecialChar"); } } 
 /// <summary>&quot;General&quot;</summary> 
 public static string CharMap_LabelGeneral { get { return T("CharMap.LabelGeneral"); } } 
 /// <summary>&quot;Alphabetical&quot;</summary> 
 public static string CharMap_LabelAlphabetical { get { return T("CharMap.LabelAlphabetical"); } } 
 /// <summary>&quot;Math &amp; Symbols&quot;</summary> 
 public static string CharMap_LabelMathSymbols { get { return T("CharMap.LabelMathSymbols"); } } 
 /// <summary>&quot;Common&quot;</summary> 
 public static string CharMap_LabelCommon { get { return T("CharMap.LabelCommon"); } } 
 /// <summary>&quot;Quotation&quot;</summary> 
 public static string CharMap_LabelQuotation { get { return T("CharMap.LabelQuotation"); } } 
 /// <summary>&quot;Currency&quot;</summary> 
 public static string CharMap_LabelCurrency { get { return T("CharMap.LabelCurrency"); } } 
 /// <summary>&quot;Latin&quot;</summary> 
 public static string CharMap_LabelLatin { get { return T("CharMap.LabelLatin"); } } 
 /// <summary>&quot;Greek&quot;</summary> 
 public static string CharMap_LabelGreek { get { return T("CharMap.LabelGreek"); } } 
 /// <summary>&quot;Math and Logic&quot;</summary> 
 public static string CharMap_LabelMathAndLogic { get { return T("CharMap.LabelMathAndLogic"); } } 
 /// <summary>&quot;Symbols&quot;</summary> 
 public static string CharMap_LabelSymbols { get { return T("CharMap.LabelSymbols"); } } 
 /// <summary>&quot;Arrows&quot;</summary> 
 public static string CharMap_LabelArrows { get { return T("CharMap.LabelArrows"); } } 
 /// <summary>&quot;Paste as Text&quot;</summary> 
 public static string TextPaste_Label { get { return T("TextPaste.Label"); } } 
 /// <summary>&quot;Paste content here. Then press OK.&quot;</summary> 
 public static string TextPaste_PasteHereContent { get { return T("TextPaste.PasteHereContent"); } } 
 /// <summary>&quot;How to spell check ...&quot;</summary> 
 public static string SpellCheck_InfoLabel { get { return T("SpellCheck.InfoLabel"); } } 
 /// <summary>&quot;How to spell check in the Visual Editor&quot;</summary> 
 public static string SpellCheck_InfoCaption { get { return T("SpellCheck.InfoCaption"); } } 
 /// <summary>&quot;To get suggestions for a misspelled word, press your SHIFT key down when you invoke the context menu.&quot;</summary> 
 public static string SpellCheck_InfoText { get { return T("SpellCheck.InfoText"); } } 
 /// <summary>&quot;Edit&quot;</summary> 
 public static string Function_Edit { get { return T("Function.Edit"); } } 
 /// <summary>&quot;Edit {0}&quot;</summary> 
 public static string LaunchButton_Label(object parameter0) { return string.Format(T("LaunchButton.Label"), parameter0); } 
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.VisualEditor", key);
        }
} 

	}
}


