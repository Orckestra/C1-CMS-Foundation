
 
 
 
 

 
 
 
 
 
 


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
///<summary>&quot;Security violation&quot;</summary> 
public static string LayoutLabel=>T("LayoutLabel");
///<summary>&quot;Not allowed&quot;</summary> 
public static string Title=>T("Title");
///<summary>&quot;You do not have permission to execute the action. Contact your administrator for more information.&quot;</summary> 
public static string Description=>T("Description");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.C1Console.SecurityViolation", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_C1Console_Trees {
///<summary>&quot;Error in tree&quot;</summary> 
public static string KeyFacade_ErrorTreeNode_Label=>T("KeyFacade.ErrorTreeNode.Label");
///<summary>&quot;Show Message&quot;</summary> 
public static string KeyFacade_ErrorTreeNode_ShowMessage_Label=>T("KeyFacade.ErrorTreeNode.ShowMessage.Label");
///<summary>&quot;Show Error Message&quot;</summary> 
public static string KeyFacade_ErrorTreeNode_ShowMessage_ToolTip=>T("KeyFacade.ErrorTreeNode.ShowMessage.ToolTip");
///<summary>&quot;Error message&quot;</summary> 
public static string KeyFacade_ErrorTreeNode_ShowMessage_Title=>T("KeyFacade.ErrorTreeNode.ShowMessage.Title");
///<summary>&quot;Unknown exception happened: &apos;{0}&apos;&quot;</summary> 
public static string TreeValidationError_Common_UnknownException(object parameter0)=>string.Format(T("TreeValidationError.Common.UnknownException"), parameter0);
///<summary>&quot;Unknown element &apos;{0}&apos;&quot;</summary> 
public static string TreeValidationError_Common_UnknownElement(object parameter0)=>string.Format(T("TreeValidationError.Common.UnknownElement"), parameter0);
///<summary>&quot;The required attribute &apos;{0}&apos; is missing&quot;</summary> 
public static string TreeValidationError_Common_MissingAttribute(object parameter0)=>string.Format(T("TreeValidationError.Common.MissingAttribute"), parameter0);
///<summary>&quot;The attribute &apos;{0}&apos; has a value that is not allowed&quot;</summary> 
public static string TreeValidationError_Common_WrongAttributeValue(object parameter0)=>string.Format(T("TreeValidationError.Common.WrongAttributeValue"), parameter0);
///<summary>&quot;The type &apos;{0}&apos; does not contain a property named &apos;{1}&apos;&quot;</summary> 
public static string TreeValidationError_Common_MissingProperty(object parameter0,object parameter1)=>string.Format(T("TreeValidationError.Common.MissingProperty"), parameter0,parameter1);
///<summary>&quot;The type &apos;{0}&apos; could not be found&quot;</summary> 
public static string TreeValidationError_Common_UnknownInterfaceType(object parameter0)=>string.Format(T("TreeValidationError.Common.UnknownInterfaceType"), parameter0);
///<summary>&quot;The type &apos;{0}&apos; does not implement the interface &apos;{1}&apos;&quot;</summary> 
public static string TreeValidationError_Common_NotImplementingIData(object parameter0,object parameter1)=>string.Format(T("TreeValidationError.Common.NotImplementingIData"), parameter0,parameter1);
///<summary>&quot;The value &apos;{0}&apos; is not allowed as a permission type value&quot;</summary> 
public static string TreeValidationError_Common_WrongPermissionValue(object parameter0)=>string.Format(T("TreeValidationError.Common.WrongPermissionValue"), parameter0);
///<summary>&quot;The value &apos;{0}&apos; is not allowed as a location value&quot;</summary> 
public static string TreeValidationError_Common_WrongLocationValue(object parameter0)=>string.Format(T("TreeValidationError.Common.WrongLocationValue"), parameter0);
///<summary>&quot;No function markup provided as a child element&quot;</summary> 
public static string TreeValidationError_Common_MissingFunctionMarkup=>T("TreeValidationError.Common.MissingFunctionMarkup");
///<summary>&quot;The function could not be created for the provided function markup&quot;</summary> 
public static string TreeValidationError_Common_WrongFunctionMarkup=>T("TreeValidationError.Common.WrongFunctionMarkup");
///<summary>&quot;Missing root element in tree markup&quot;</summary> 
public static string TreeValidationError_Markup_NoRootElement=>T("TreeValidationError.Markup.NoRootElement");
///<summary>&quot;Syntax error: {0} at line {1} position {2}&quot;</summary> 
public static string TreeValidationError_Markup_SchemaError(object parameter0,object parameter1,object parameter2)=>string.Format(T("TreeValidationError.Markup.SchemaError"), parameter0,parameter1,parameter2);
///<summary>&quot;The attachment point &apos;{0}&apos; is unknown&quot;</summary> 
public static string TreeValidationError_AutoAttachments_UnknownAttachmentPoint(object parameter0)=>string.Format(T("TreeValidationError.AutoAttachments.UnknownAttachmentPoint"), parameter0);
///<summary>&quot;The attachment position &apos;{0}&apos; is unknown&quot;</summary> 
public static string TreeValidationError_AutoAttachments_UnknownAttachmentPosition(object parameter0)=>string.Format(T("TreeValidationError.AutoAttachments.UnknownAttachmentPosition"), parameter0);
///<summary>&quot;No elements are allowed in trees that are used with data attached trees&quot;</summary> 
public static string TreeValidationError_DataAttachments_NoElementsAllowed=>T("TreeValidationError.DataAttachments.NoElementsAllowed");
///<summary>&quot;ShareRootElementById is only allowed if the tree has a single named attachment point&quot;</summary> 
public static string TreeValidationError_ElementRoot_ShareRootElementByIdNotAllowed=>T("TreeValidationError.ElementRoot.ShareRootElementByIdNotAllowed");
///<summary>&quot;The value of the Id is not allowed. The Id should be non-empty, not start with NodeAutoId_ and not be RootTreeNode&quot;</summary> 
public static string TreeValidationError_SimpleElement_WrongIdValue=>T("TreeValidationError.SimpleElement.WrongIdValue");
///<summary>&quot;The id value &apos;{0}&apos; has already been used in this tree&quot;</summary> 
public static string TreeValidationError_SimpleElement_AlreadyUsedId(object parameter0)=>string.Format(T("TreeValidationError.SimpleElement.AlreadyUsedId"), parameter0);
///<summary>&quot;The data interface &apos;{0}&apos; is used more than once as a child under the same parent element and this is not allowed&quot;</summary> 
public static string TreeValidationError_DataElementsTreeNode_SameInterfaceUsedTwice(object parameter0)=>string.Format(T("TreeValidationError.DataElementsTreeNode.SameInterfaceUsedTwice"), parameter0);
///<summary>&quot;The same interface &apos;{0}&apos; is used as parent type as parent filter and this is not allowed&quot;</summary> 
public static string TreeValidationError_DataElementsTreeNode_SameParentFilterInterfaceUsedTwice(object parameter0)=>string.Format(T("TreeValidationError.DataElementsTreeNode.SameParentFilterInterfaceUsedTwice"), parameter0);
///<summary>&quot;More than one parent filter is pointing to the interface &apos;{0}&apos;. Change the Display value to Lazy&quot;</summary> 
public static string TreeValidationError_DataElementsTreeNode_MoreThanOnParentFilterIsPointingToMe(object parameter0)=>string.Format(T("TreeValidationError.DataElementsTreeNode.MoreThanOnParentFilterIsPointingToMe"), parameter0);
///<summary>&quot;Type attribute is missing&quot;</summary> 
public static string TreeValidationError_DataFolderElements_MissingInterfaceType=>T("TreeValidationError.DataFolderElements.MissingInterfaceType");
///<summary>&quot;The interface type &apos;{0}&apos; does not match the parent elements interface type &apos;{1}&apos;&quot;</summary> 
public static string TreeValidationError_DataFolderElements_WrongInterfaceType(object parameter0,object parameter1)=>string.Format(T("TreeValidationError.DataFolderElements.WrongInterfaceType"), parameter0,parameter1);
///<summary>&quot;DateFormat attribute requires that the property &apos;{0}&apos; should be of type &apos;{1}&apos; but is type &apos;{2}&apos;&quot;</summary> 
public static string TreeValidationError_DataFolderElements_DateFormetNotAllowed(object parameter0,object parameter1,object parameter2)=>string.Format(T("TreeValidationError.DataFolderElements.DateFormetNotAllowed"), parameter0,parameter1,parameter2);
///<summary>&quot;The property &apos;{0}&apos; is of type Date and this requires the DateFormat attribute to be present&quot;</summary> 
public static string TreeValidationError_DataFolderElements_DateFormetIsMissing(object parameter0)=>string.Format(T("TreeValidationError.DataFolderElements.DateFormetIsMissing"), parameter0);
///<summary>&quot;Ranges and first-letter-only not allowed at the same time&quot;</summary> 
public static string TreeValidationError_DataFolderElements_RangesAndFirstLetterOnlyNotAllowed=>T("TreeValidationError.DataFolderElements.RangesAndFirstLetterOnlyNotAllowed");
///<summary>&quot;First-letter-only requires that the property &apos;{0}&apos; should be of type &apos;{1}&apos; but is type &apos;{2}&apos;&quot;</summary> 
public static string TreeValidationError_DataFolderElements_WrongFirstLetterOnlyPropertyType(object parameter0,object parameter1,object parameter2)=>string.Format(T("TreeValidationError.DataFolderElements.WrongFirstLetterOnlyPropertyType"), parameter0,parameter1,parameter2);
///<summary>&quot;Only data child elements with the same interface type as the folder grouping (&apos;{0}&apos;) are allowed&quot;</summary> 
public static string TreeValidationError_DataFolderElements_WrongDateChildInterfaceType(object parameter0)=>string.Format(T("TreeValidationError.DataFolderElements.WrongDateChildInterfaceType"), parameter0);
///<summary>&quot;Switching from the interface type &apos;{0}&apos; to a different interface type &apos;{1}&apos; is not allowed in the same folder grouping group&quot;</summary> 
public static string TreeValidationError_DataFolderElements_InterfaceTypeSwitchNotAllowed(object parameter0,object parameter1)=>string.Format(T("TreeValidationError.DataFolderElements.InterfaceTypeSwitchNotAllowed"), parameter0,parameter1);
///<summary>&quot;Using the field name &apos;{0}&apos; twice in the same grouping tree is not allowed&quot;</summary> 
public static string TreeValidationError_DataFolderElements_SameFieldUsedTwice(object parameter0)=>string.Format(T("TreeValidationError.DataFolderElements.SameFieldUsedTwice"), parameter0);
///<summary>&quot;Maximum one parent id filter node can be used on data elements used in groupings&quot;</summary> 
public static string TreeValidationError_DataFolderElements_TooManyParentIdFilters=>T("TreeValidationError.DataFolderElements.TooManyParentIdFilters");
///<summary>&quot;The type &apos;{0}&apos; is not in the parent tree of this node or specified as an attachment points type&quot;</summary> 
public static string TreeValidationError_ParentIdFilterNode_TypeIsNotInParentTree(object parameter0)=>string.Format(T("TreeValidationError.ParentIdFilterNode.TypeIsNotInParentTree"), parameter0);
///<summary>&quot;The operator &apos;{0}&apos; is unknown or not supported&quot;</summary> 
public static string TreeValidationError_FieldFilter_UnknownOperatorName(object parameter0)=>string.Format(T("TreeValidationError.FieldFilter.UnknownOperatorName"), parameter0);
///<summary>&quot;The string value &apos;{0}&apos; could not be converted to the type &apos;{1}&apos;&quot;</summary> 
public static string TreeValidationError_FieldFilter_ValueCouldNotBeConverted(object parameter0,object parameter1)=>string.Format(T("TreeValidationError.FieldFilter.ValueCouldNotBeConverted"), parameter0,parameter1);
///<summary>&quot;The operator &apos;{0}&apos; is not supported for the type &apos;{1}&apos;&quot;</summary> 
public static string TreeValidationError_FieldFilter_OperatorNotSupportedForType(object parameter0,object parameter1)=>string.Format(T("TreeValidationError.FieldFilter.OperatorNotSupportedForType"), parameter0,parameter1);
///<summary>&quot;Function markup is missing&quot;</summary> 
public static string TreeValidationError_FunctionFilter_MissingFunctionMarkup=>T("TreeValidationError.FunctionFilter.MissingFunctionMarkup");
///<summary>&quot;The function could not be created for the provided function markup&quot;</summary> 
public static string TreeValidationError_FunctionFilter_WrongFunctionMarkup=>T("TreeValidationError.FunctionFilter.WrongFunctionMarkup");
///<summary>&quot;The function does not return value of the type &apos;{0}&apos;&quot;</summary> 
public static string TreeValidationError_FunctionFilter_WrongReturnValue(object parameter0)=>string.Format(T("TreeValidationError.FunctionFilter.WrongReturnValue"), parameter0);
///<summary>&quot;The return type of the expression returned by the function is &apos;{0}&apos;, &apos;{1}&apos; was expected&quot;</summary> 
public static string TreeValidationError_FunctionFilter_WrongFunctionReturnType(object parameter0,object parameter1)=>string.Format(T("TreeValidationError.FunctionFilter.WrongFunctionReturnType"), parameter0,parameter1);
///<summary>&quot;The parameter count of expression returned by the function is &apos;{0}&apos;, 1 was expected&quot;</summary> 
public static string TreeValidationError_FunctionFilter_WrongFunctionParameterCount(object parameter0)=>string.Format(T("TreeValidationError.FunctionFilter.WrongFunctionParameterCount"), parameter0);
///<summary>&quot;The expressions parameter type returned by the function is &apos;{0}&apos;, &apos;{1}&apos; was expected&quot;</summary> 
public static string TreeValidationError_FunctionFilter_WrongFunctionParameterType(object parameter0,object parameter1)=>string.Format(T("TreeValidationError.FunctionFilter.WrongFunctionParameterType"), parameter0,parameter1);
///<summary>&quot;The function does not return value of the type &apos;{0}&apos;&quot;</summary> 
public static string TreeValidationError_ReportFunctionAction_WrongReturnValue(object parameter0)=>string.Format(T("TreeValidationError.ReportFunctionAction.WrongReturnValue"), parameter0);
///<summary>&quot;The file &apos;{0}&apos; does not exist&quot;</summary> 
public static string TreeValidationError_GenericAddDataAction_MissingMarkupFile(object parameter0)=>string.Format(T("TreeValidationError.GenericAddDataAction.MissingMarkupFile"), parameter0);
///<summary>&quot;The custom markup path &apos;{0}&apos; is wrongly formatted. Use ~/Dir1/Dir2/File.xml&quot;</summary> 
public static string TreeValidationError_GenericAddDataAction_BadMarkupPath(object parameter0)=>string.Format(T("TreeValidationError.GenericAddDataAction.BadMarkupPath"), parameter0);
///<summary>&quot;The edit data action only applies to elements that produce data elements&quot;</summary> 
public static string TreeValidationError_GenericEditDataAction_OwnerIsNotDataNode=>T("TreeValidationError.GenericEditDataAction.OwnerIsNotDataNode");
///<summary>&quot;The file &apos;{0}&apos; does not exist&quot;</summary> 
public static string TreeValidationError_GenericEditDataAction_MissingMarkupFile(object parameter0)=>string.Format(T("TreeValidationError.GenericEditDataAction.MissingMarkupFile"), parameter0);
///<summary>&quot;The custom markup path &apos;{0}&apos; is wrongly formatted. Use ~/Dir1/Dir2/File.xml&quot;</summary> 
public static string TreeValidationError_GenericEditDataAction_BadMarkupPath(object parameter0)=>string.Format(T("TreeValidationError.GenericEditDataAction.BadMarkupPath"), parameter0);
///<summary>&quot;The delete data action only applies to elements that produce data elements&quot;</summary> 
public static string TreeValidationError_GenericDeleteDataAction_OwnerIsNotDataNode=>T("TreeValidationError.GenericDeleteDataAction.OwnerIsNotDataNode");
///<summary>&quot;The dialog type &apos;{0}&apos; is not supported&quot;</summary> 
public static string TreeValidationError_MessageBoxAction_UnknownDialogType(object parameter0)=>string.Format(T("TreeValidationError.MessageBoxAction.UnknownDialogType"), parameter0);
///<summary>&quot;Too many &apos;{0}&apos; elements, only one is allowed&quot;</summary> 
public static string TreeValidationError_CustomUrlAction_TooManyPostParameterElements(object parameter0)=>string.Format(T("TreeValidationError.CustomUrlAction.TooManyPostParameterElements"), parameter0);
///<summary>&quot;The view type &apos;{0}&apos; is not supported&quot;</summary> 
public static string TreeValidationError_CustomUrlAction_UnknownViewType(object parameter0)=>string.Format(T("TreeValidationError.CustomUrlAction.UnknownViewType"), parameter0);
///<summary>&quot;The direction value &apos;{0}&apos; is wrong, should be either &apos;ascending&apos; or &apos;descending&apos;&quot;</summary> 
public static string TreeValidationError_FieldOrderBy_UnknownDirection(object parameter0)=>string.Format(T("TreeValidationError.FieldOrderBy.UnknownDirection"), parameter0);
///<summary>&quot;The type &apos;{0}&apos; does not contain a field named &apos;{1}&apos;&quot;</summary> 
public static string TreeValidationError_FieldOrderBy_UnknownField(object parameter0,object parameter1)=>string.Format(T("TreeValidationError.FieldOrderBy.UnknownField"), parameter0,parameter1);
///<summary>&quot;&apos;{0}&apos; is in wrong format, use the format: {1}&quot;</summary> 
public static string TreeValidationError_DataFieldValueHelper_WrongFormat(object parameter0,object parameter1)=>string.Format(T("TreeValidationError.DataFieldValueHelper.WrongFormat"), parameter0,parameter1);
///<summary>&quot;The interface &apos;{0}&apos; is not contained in the current element or any of its parents&quot;</summary> 
public static string TreeValidationError_DataFieldValueHelper_InterfaceNotInParentTree(object parameter0)=>string.Format(T("TreeValidationError.DataFieldValueHelper.InterfaceNotInParentTree"), parameter0);
///<summary>&quot;The range value is wrongly formatted&quot;</summary> 
public static string TreeValidationError_Range_WrongFormat=>T("TreeValidationError.Range.WrongFormat");
///<summary>&quot;The property &apos;{0}&apos; is of type &apos;{1}&apos; which does not support ranges&quot;</summary> 
public static string TreeValidationError_Range_UnsupportedType(object parameter0,object parameter1)=>string.Format(T("TreeValidationError.Range.UnsupportedType"), parameter0,parameter1);
///<summary>&quot;The value first value ({0}) in a range should be lesser than second value ({1})&quot;</summary> 
public static string TreeValidationError_Range_MinMaxError(object parameter0,object parameter1)=>string.Format(T("TreeValidationError.Range.MinMaxError"), parameter0,parameter1);
///<summary>&quot;The max value of a range should be less than the min value of the succeeding range&quot;</summary> 
public static string TreeValidationError_Range_NextRangeError=>T("TreeValidationError.Range.NextRangeError");
///<summary>&quot;From {0} to {1}&quot;</summary> 
public static string TreeRanges_IntRange_Closed(object parameter0,object parameter1)=>string.Format(T("TreeRanges.IntRange.Closed"), parameter0,parameter1);
///<summary>&quot;{0} or less&quot;</summary> 
public static string TreeRanges_IntRange_MinOpenEnded(object parameter0)=>string.Format(T("TreeRanges.IntRange.MinOpenEnded"), parameter0);
///<summary>&quot;{0} or more&quot;</summary> 
public static string TreeRanges_IntRange_MaxOpenEnded(object parameter0)=>string.Format(T("TreeRanges.IntRange.MaxOpenEnded"), parameter0);
///<summary>&quot;Other&quot;</summary> 
public static string TreeRanges_IntRange_Other=>T("TreeRanges.IntRange.Other");
///<summary>&quot;From {0} to {1}&quot;</summary> 
public static string TreeRanges_StringRange_Closed(object parameter0,object parameter1)=>string.Format(T("TreeRanges.StringRange.Closed"), parameter0,parameter1);
///<summary>&quot;{0} and before&quot;</summary> 
public static string TreeRanges_StringRange_MinOpenEnded(object parameter0)=>string.Format(T("TreeRanges.StringRange.MinOpenEnded"), parameter0);
///<summary>&quot;{0} and after&quot;</summary> 
public static string TreeRanges_StringRange_MaxOpenEnded(object parameter0)=>string.Format(T("TreeRanges.StringRange.MaxOpenEnded"), parameter0);
///<summary>&quot;Other&quot;</summary> 
public static string TreeRanges_StringRange_Other=>T("TreeRanges.StringRange.Other");
///<summary>&quot;Add&quot;</summary> 
public static string GenericAddDataAction_DefaultLabel=>T("GenericAddDataAction.DefaultLabel");
///<summary>&quot;Edit&quot;</summary> 
public static string GenericEditDataAction_DefaultLabel=>T("GenericEditDataAction.DefaultLabel");
///<summary>&quot;Delete&quot;</summary> 
public static string GenericDeleteDataAction_DefaultLabel=>T("GenericDeleteDataAction.DefaultLabel");
///<summary>&quot;Cascade delete error&quot;</summary> 
public static string TreeGenericDelete_CascadeDeleteErrorTitle=>T("TreeGenericDelete.CascadeDeleteErrorTitle");
///<summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
public static string TreeGenericDelete_CascadeDeleteErrorMessage=>T("TreeGenericDelete.CascadeDeleteErrorMessage");
///<summary>&quot;Delete Data?&quot;</summary> 
public static string TreeGenericDeleteConfirm_LabelFieldGroup=>T("TreeGenericDeleteConfirm.LabelFieldGroup");
///<summary>&quot;Delete&quot;</summary> 
public static string TreeGenericDeleteConfirm_Text=>T("TreeGenericDeleteConfirm.Text");
///<summary>&quot;Delete data?&quot;</summary> 
public static string TreeGenericDeleteConfirmDeletingRelatedData_LabelFieldGroup=>T("TreeGenericDeleteConfirmDeletingRelatedData.LabelFieldGroup");
///<summary>&quot;There is some referenced data that will also be deleted, do you want to continue?&quot;</summary> 
public static string TreeGenericDeleteConfirmDeletingRelatedData_ConfirmationText=>T("TreeGenericDeleteConfirmDeletingRelatedData.ConfirmationText");
///<summary>&quot;Add&quot;</summary> 
public static string TreeAddTreeDefinitionWorkflow_AddNew_Label=>T("TreeAddTreeDefinitionWorkflow.AddNew.Label");
///<summary>&quot;Add new tree definition&quot;</summary> 
public static string TreeAddTreeDefinitionWorkflow_AddNew_ToolTip=>T("TreeAddTreeDefinitionWorkflow.AddNew.ToolTip");
///<summary>&quot;Add new tree definition&quot;</summary> 
public static string TreeAddTreeDefinition_Layout_Label=>T("TreeAddTreeDefinition.Layout.Label");
///<summary>&quot;Add new tree definition&quot;</summary> 
public static string TreeAddTreeDefinition_FieldGroup_Label=>T("TreeAddTreeDefinition.FieldGroup.Label");
///<summary>&quot;Definition name&quot;</summary> 
public static string TreeAddTreeDefinition_NameTextBox_Label=>T("TreeAddTreeDefinition.NameTextBox.Label");
///<summary>&quot;Definition name&quot;</summary> 
public static string TreeAddTreeDefinition_NameTextBox_Help=>T("TreeAddTreeDefinition.NameTextBox.Help");
///<summary>&quot;Template&quot;</summary> 
public static string TreeAddTreeDefinition_TemplateSelector_Label=>T("TreeAddTreeDefinition.TemplateSelector.Label");
///<summary>&quot;Select a template to start with&quot;</summary> 
public static string TreeAddTreeDefinition_TemplateSelector_Help=>T("TreeAddTreeDefinition.TemplateSelector.Help");
///<summary>&quot;Position&quot;</summary> 
public static string TreeAddTreeDefinition_PositionSelector_Label=>T("TreeAddTreeDefinition.PositionSelector.Label");
///<summary>&quot;Position&quot;</summary> 
public static string TreeAddTreeDefinition_PositionSelector_Help=>T("TreeAddTreeDefinition.PositionSelector.Help");
///<summary>&quot;Delete&quot;</summary> 
public static string TreeDeleteTreeDefinitionWorkflow_Delete_Label=>T("TreeDeleteTreeDefinitionWorkflow.Delete.Label");
///<summary>&quot;Delete tree definition&quot;</summary> 
public static string TreeDeleteTreeDefinitionWorkflow_Delete_ToolTip=>T("TreeDeleteTreeDefinitionWorkflow.Delete.ToolTip");
///<summary>&quot;Delete tree definition&quot;</summary> 
public static string TreeDeleteTreeDefinition_Layout_Label=>T("TreeDeleteTreeDefinition.Layout.Label");
///<summary>&quot;Delete selected tree definition&quot;</summary> 
public static string TreeDeleteTreeDefinition_Title=>T("TreeDeleteTreeDefinition.Title");
///<summary>&quot;Delete selected tree definition?&quot;</summary> 
public static string TreeDeleteTreeDefinition_Description=>T("TreeDeleteTreeDefinition.Description");
///<summary>&quot;Edit&quot;</summary> 
public static string TreeDeleteTreeDefinitionWorkflow_Edit_Label=>T("TreeDeleteTreeDefinitionWorkflow.Edit.Label");
///<summary>&quot;Edit tree definition&quot;</summary> 
public static string TreeDeleteTreeDefinitionWorkflow_Edit_ToolTip=>T("TreeDeleteTreeDefinitionWorkflow.Edit.ToolTip");
///<summary>&quot;Add Application&quot;</summary> 
public static string AddApplicationWorkflow_AddApplication_Label=>T("AddApplicationWorkflow.AddApplication.Label");
///<summary>&quot;Add new application&quot;</summary> 
public static string AddApplicationWorkflow_AddApplication_ToolTip=>T("AddApplicationWorkflow.AddApplication.ToolTip");
///<summary>&quot;Add application&quot;</summary> 
public static string AddApplication_Layout_Label=>T("AddApplication.Layout.Label");
///<summary>&quot;Select application&quot;</summary> 
public static string AddApplication_FieldGroup_Label=>T("AddApplication.FieldGroup.Label");
///<summary>&quot;Application&quot;</summary> 
public static string AddApplication_TreeIdSelector_Label=>T("AddApplication.TreeIdSelector.Label");
///<summary>&quot;Select the application that you wish to add&quot;</summary> 
public static string AddApplication_TreeIdSelector_Help=>T("AddApplication.TreeIdSelector.Help");
///<summary>&quot;Position&quot;</summary> 
public static string AddApplication_PositionSelector_Label=>T("AddApplication.PositionSelector.Label");
///<summary>&quot;The position to insert this application&quot;</summary> 
public static string AddApplication_PositionSelector_Help=>T("AddApplication.PositionSelector.Help");
///<summary>&quot;No applications&quot;</summary> 
public static string AddApplication_NoTrees_Title=>T("AddApplication.NoTrees.Title");
///<summary>&quot;You have added all available applications&quot;</summary> 
public static string AddApplication_NoTrees_Message=>T("AddApplication.NoTrees.Message");
///<summary>&quot;Remove Application&quot;</summary> 
public static string RemoveApplicationWorkflow_RemoveApplication_Label=>T("RemoveApplicationWorkflow.RemoveApplication.Label");
///<summary>&quot;Remove existing application&quot;</summary> 
public static string RemoveApplicationWorkflow_RemoveApplication_ToolTip=>T("RemoveApplicationWorkflow.RemoveApplication.ToolTip");
///<summary>&quot;Remove application&quot;</summary> 
public static string RemoveApplication_Layout_Label=>T("RemoveApplication.Layout.Label");
///<summary>&quot;Remove application&quot;</summary> 
public static string RemoveApplication_FieldGroup_Label=>T("RemoveApplication.FieldGroup.Label");
///<summary>&quot;Application&quot;</summary> 
public static string RemoveApplication_TreeIdSelector_Label=>T("RemoveApplication.TreeIdSelector.Label");
///<summary>&quot;Select the application that you wish to remove&quot;</summary> 
public static string RemoveApplication_TreeIdSelector_Help=>T("RemoveApplication.TreeIdSelector.Help");
///<summary>&quot;No applications&quot;</summary> 
public static string RemoveApplication_NoTrees_Title=>T("RemoveApplication.NoTrees.Title");
///<summary>&quot;You have removed all available applications&quot;</summary> 
public static string RemoveApplication_NoTrees_Message=>T("RemoveApplication.NoTrees.Message");
///<summary>&quot;Translate data&quot;</summary> 
public static string LocalizeDataWorkflow_LocalizeDataLabel=>T("LocalizeDataWorkflow.LocalizeDataLabel");
///<summary>&quot;Translate data&quot;</summary> 
public static string LocalizeDataWorkflow_LocalizeDataToolTip=>T("LocalizeDataWorkflow.LocalizeDataToolTip");
///<summary>&quot;Not yet approved or published&quot;</summary> 
public static string LocalizeDataWorkflow_DisabledData=>T("LocalizeDataWorkflow.DisabledData");
///<summary>&quot;Failed to translate data&quot;</summary> 
public static string LocalizeData_ShowError_Layout_Label=>T("LocalizeData.ShowError.Layout.Label");
///<summary>&quot;Translation errors&quot;</summary> 
public static string LocalizeData_ShowError_InfoTable_Caption=>T("LocalizeData.ShowError.InfoTable.Caption");
///<summary>&quot;The following fields has a reference to a data type. You should translate these data items before you can translate this data item&quot;</summary> 
public static string LocalizeData_ShowError_Description=>T("LocalizeData.ShowError.Description");
///<summary>&quot;The field &apos;{0}&apos; is referencing data of type &apos;{1}&apos; with the label &apos;{2}&apos;&quot;</summary> 
public static string LocalizeData_ShowError_FieldErrorFormat(object parameter0,object parameter1,object parameter2)=>string.Format(T("LocalizeData.ShowError.FieldErrorFormat"), parameter0,parameter1,parameter2);
///<summary>&quot;This data has already been translated. The translated version belongs to a different group.&quot;</summary> 
public static string LocalizeData_ShowError_AlreadyTranslated=>T("LocalizeData.ShowError.AlreadyTranslated");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.C1Console.Trees", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_C1Console_Users {
///<summary>&quot;Change Password...&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_ElementActionLabel=>T("ChangeOwnPasswordWorkflow.ElementActionLabel");
///<summary>&quot;Change your password&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_ElementActionToolTip=>T("ChangeOwnPasswordWorkflow.ElementActionToolTip");
///<summary>&quot;Change Password&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_Dialog_Label=>T("ChangeOwnPasswordWorkflow.Dialog.Label");
///<summary>&quot;Existing password&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_Dialog_ExistingPassword_Label=>T("ChangeOwnPasswordWorkflow.Dialog.ExistingPassword.Label");
///<summary>&quot;For security reasons you must present your existing password before you can continue.&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_Dialog_ExistingPassword_Help=>T("ChangeOwnPasswordWorkflow.Dialog.ExistingPassword.Help");
///<summary>&quot;New password&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_Dialog_NewPassword_Label=>T("ChangeOwnPasswordWorkflow.Dialog.NewPassword.Label");
///<summary>&quot;The password specified in this field must match the confirmation below.&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_Dialog_NewPassword_Help=>T("ChangeOwnPasswordWorkflow.Dialog.NewPassword.Help");
///<summary>&quot;Confirm new password&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_Dialog_NewPasswordConfirmed_Label=>T("ChangeOwnPasswordWorkflow.Dialog.NewPasswordConfirmed.Label");
///<summary>&quot;The password specified in this field must match the one specified above.&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_Dialog_NewPasswordConfirmed_Help=>T("ChangeOwnPasswordWorkflow.Dialog.NewPasswordConfirmed.Help");
///<summary>&quot;The specified password is incorrect.&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_Dialog_Validation_IncorrectPassword=>T("ChangeOwnPasswordWorkflow.Dialog.Validation.IncorrectPassword");
///<summary>&quot;The new passwords you typed do not match.&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_Dialog_Validation_NewPasswordFieldsNotMatch=>T("ChangeOwnPasswordWorkflow.Dialog.Validation.NewPasswordFieldsNotMatch");
///<summary>&quot;The old and the new passwords are the same.&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_Dialog_Validation_PasswordsAreTheSame=>T("ChangeOwnPasswordWorkflow.Dialog.Validation.PasswordsAreTheSame");
///<summary>&quot;The new password may not be an empty string.&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_Dialog_Validation_NewPasswordIsEmpty=>T("ChangeOwnPasswordWorkflow.Dialog.Validation.NewPasswordIsEmpty");
///<summary>&quot;The new password must be at least {0} characters long.&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_Dialog_Validation_NewPasswordTooShort(object parameter0)=>string.Format(T("ChangeOwnPasswordWorkflow.Dialog.Validation.NewPasswordTooShort"), parameter0);
///<summary>&quot;Password change isn&apos;t supported.&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_NotSupportedErrorLabel=>T("ChangeOwnPasswordWorkflow.NotSupportedErrorLabel");
///<summary>&quot;Password change isn&apos;t supported in current configuration.&quot;</summary> 
public static string ChangeOwnPasswordWorkflow_NotSupportedErrorText=>T("ChangeOwnPasswordWorkflow.NotSupportedErrorText");
///<summary>&quot;Profile Settings...&quot;</summary> 
public static string ChangeOwnCultureWorkflow_ElementActionLabel=>T("ChangeOwnCultureWorkflow.ElementActionLabel");
///<summary>&quot;Set the C1 Console language and formatting of numbers, times and dates&quot;</summary> 
public static string ChangeOwnCultureWorkflow_ElementActionToolTip=>T("ChangeOwnCultureWorkflow.ElementActionToolTip");
///<summary>&quot;Regional Settings and Language&quot;</summary> 
public static string ChangeOwnCultureWorkflow_Dialog_Label=>T("ChangeOwnCultureWorkflow.Dialog.Label");
///<summary>&quot;Display Preferences&quot;</summary> 
public static string ChangeOwnCultureWorkflow_Dialog_CultureSelector_Label=>T("ChangeOwnCultureWorkflow.Dialog.CultureSelector.Label");
///<summary>&quot;Select from the list of options to update how time, date, and number formats are displayed within the console.&quot;</summary> 
public static string ChangeOwnCultureWorkflow_Dialog_CultureSelector_Help=>T("ChangeOwnCultureWorkflow.Dialog.CultureSelector.Help");
///<summary>&quot;Console Language Preferences&quot;</summary> 
public static string ChangeOwnCultureWorkflow_Dialog_C1ConsoleLanguageSelector_Label=>T("ChangeOwnCultureWorkflow.Dialog.C1ConsoleLanguageSelector.Label");
///<summary>&quot;Select the language to be used for labels, help texts, dialogs etc. The available options here are limited to languages installed. You may install more languages via the Package system, see Composite.Localization.&quot;</summary> 
public static string ChangeOwnCultureWorkflow_Dialog_C1ConsoleLanguageSelector_Help=>T("ChangeOwnCultureWorkflow.Dialog.C1ConsoleLanguageSelector.Help");
///<summary>&quot;Change application language&quot;</summary> 
public static string ChangeOwnCultureWorkflow_Dialog_Confirm_Title=>T("ChangeOwnCultureWorkflow.Dialog.Confirm.Title");
///<summary>&quot;Are your sure you wish to change the settings? The application will restart and all your unsaved changes will be lost.&quot;</summary> 
public static string ChangeOwnCultureWorkflow_Dialog_Confirm_Text=>T("ChangeOwnCultureWorkflow.Dialog.Confirm.Text");
///<summary>&quot;Administrators&quot;</summary> 
public static string AdministratorAutoCreator_DefaultGroupName=>T("AdministratorAutoCreator.DefaultGroupName");
///<summary>&quot;Translation...&quot;</summary> 
public static string ChangeForeignLocaleWorkflow_ActionLabel=>T("ChangeForeignLocaleWorkflow.ActionLabel");
///<summary>&quot;Change source language&quot;</summary> 
public static string ChangeForeignLocaleWorkflow_ActionToolTip=>T("ChangeForeignLocaleWorkflow.ActionToolTip");
///<summary>&quot;None&quot;</summary> 
public static string ChangeForeignLocaleWorkflow_NoForeignLocaleLabel=>T("ChangeForeignLocaleWorkflow.NoForeignLocaleLabel");
///<summary>&quot;Translation&quot;</summary> 
public static string ChangeForeignLocaleWorkflow_Dialog_Label=>T("ChangeForeignLocaleWorkflow.Dialog.Label");
///<summary>&quot;Select language to translate from&quot;</summary> 
public static string ChangeForeignLocaleWorkflow_FieldGroup_Label=>T("ChangeForeignLocaleWorkflow.FieldGroup.Label");
///<summary>&quot;Multiple languages not installed&quot;</summary> 
public static string ChangeForeignLocaleWorkflow_NoOrOneActiveLocales_Title=>T("ChangeForeignLocaleWorkflow.NoOrOneActiveLocales.Title");
///<summary>&quot;Two or more languages must be installed in order to support translations. Administrators can add more languages in the &apos;System&apos; perspective.&quot;</summary> 
public static string ChangeForeignLocaleWorkflow_NoOrOneActiveLocales_Description=>T("ChangeForeignLocaleWorkflow.NoOrOneActiveLocales.Description");
///<summary>&quot;From-language&quot;</summary> 
public static string ChangeForeignLocaleWorkflow_ForeignCultureSelector_Label=>T("ChangeForeignLocaleWorkflow.ForeignCultureSelector.Label");
///<summary>&quot;Pages written in the from-language will be indicated by globe icons in the Content tree. The associated &quot;Translate Page&quot; action imports the page into the current working language.&quot;</summary> 
public static string ChangeForeignLocaleWorkflow_ForeignCultureSelector_Help=>T("ChangeForeignLocaleWorkflow.ForeignCultureSelector.Help");
///<summary>&quot;The active language has been changed&quot;</summary> 
public static string ChangeOwnActiveLocaleWorkflow_CloseAllViews_Message=>T("ChangeOwnActiveLocaleWorkflow.CloseAllViews.Message");
///<summary>&quot;Password should be at least {0} characters long.&quot;</summary> 
public static string PasswordRules_MinimumLength(object parameter0)=>string.Format(T("PasswordRules.MinimumLength"), parameter0);
///<summary>&quot;Password should not match any of the previously used {0} passwords.&quot;</summary> 
public static string PasswordRules_EnforcePasswordHistory(object parameter0)=>string.Format(T("PasswordRules.EnforcePasswordHistory"), parameter0);
///<summary>&quot;Password should contain 3/4 of the following items: uppercase letters, lowercase letters, numbers, symbols.&quot;</summary> 
public static string PasswordRules_DifferentCharacterGroups=>T("PasswordRules.DifferentCharacterGroups");
///<summary>&quot;Password should not be based on a user name.&quot;</summary> 
public static string PasswordRules_DoNotUseUserName=>T("PasswordRules.DoNotUseUserName");
///<summary>&quot;Confirmation password mismatch&quot;</summary> 
public static string ChangePasswordForm_ConfirmationPasswordMimatch=>T("ChangePasswordForm.ConfirmationPasswordMimatch");
///<summary>&quot;Username&quot;</summary> 
public static string ChangePasswordForm_Username=>T("ChangePasswordForm.Username");
///<summary>&quot;Old Password&quot;</summary> 
public static string ChangePasswordForm_OldPassword=>T("ChangePasswordForm.OldPassword");
///<summary>&quot;New Password&quot;</summary> 
public static string ChangePasswordForm_NewPassword=>T("ChangePasswordForm.NewPassword");
///<summary>&quot;Confirm Password&quot;</summary> 
public static string ChangePasswordForm_ConfirmPassword=>T("ChangePasswordForm.ConfirmPassword");
///<summary>&quot;Change Password&quot;</summary> 
public static string ChangePasswordForm_ChangePasswordButton=>T("ChangePasswordForm.ChangePasswordButton");
///<summary>&quot;Password is older than {0} days. Please change your password.&quot;</summary> 
public static string ChangePasswordForm_PasswordExpiredMessage(object parameter0)=>string.Format(T("ChangePasswordForm.PasswordExpiredMessage"), parameter0);
///<summary>&quot;The old password is incorrect.&quot;</summary> 
public static string ChangePasswordForm_IncorrectOldPassword=>T("ChangePasswordForm.IncorrectOldPassword");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.C1Console.Users", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Core_PackageSystem_PackageFragmentInstallers {
///<summary>&quot;The package composite version requirements does not match the current composite version &apos;{0}&apos;. Expected version range [{1} - {2}]&quot;</summary> 
public static string PackageManager_CompositeVersionMisMatch(object parameter0,object parameter1,object parameter2)=>string.Format(T("PackageManager.CompositeVersionMisMatch"), parameter0,parameter1,parameter2);
///<summary>&quot;Package is already installed&quot;</summary> 
public static string PackageManager_PackageAlreadyInstalled=>T("PackageManager.PackageAlreadyInstalled");
///<summary>&quot;A newer version of the package is already installed&quot;</summary> 
public static string PackageManager_NewerVersionInstalled=>T("PackageManager.NewerVersionInstalled");
///<summary>&quot;Could not locate the package directory path &apos;{0}&apos;&quot;</summary> 
public static string PackageManager_MissingPackageDirectory(object parameter0)=>string.Format(T("PackageManager.MissingPackageDirectory"), parameter0);
///<summary>&quot;The package is marked as non uninstallable&quot;</summary> 
public static string PackageManager_Uninstallable=>T("PackageManager.Uninstallable");
///<summary>&quot;Could not locate the package zip file path &apos;{0}&apos;&quot;</summary> 
public static string PackageManager_MissingZipFile(object parameter0)=>string.Format(T("PackageManager.MissingZipFile"), parameter0);
///<summary>&quot;Could not locate the package uninstall file path &apos;{0}&apos;&quot;</summary> 
public static string PackageManager_MissingUninstallFile(object parameter0)=>string.Format(T("PackageManager.MissingUninstallFile"), parameter0);
///<summary>&quot;Missing &apos;{0}&apos; element.&quot;</summary> 
public static string PackageManager_MissingElement(object parameter0)=>string.Format(T("PackageManager.MissingElement"), parameter0);
///<summary>&quot;Missing &apos;{0}&apos; attribute.&quot;</summary> 
public static string PackageManager_MissingAttribute(object parameter0)=>string.Format(T("PackageManager.MissingAttribute"), parameter0);
///<summary>&quot;&apos;{0}&apos; attribute value is not a valid value.&quot;</summary> 
public static string PackageManager_InvalidAttributeValue(object parameter0)=>string.Format(T("PackageManager.InvalidAttributeValue"), parameter0);
///<summary>&quot;&apos;{0}&apos; element value is not a valid value&quot;</summary> 
public static string PackageManager_InvalidElementValue(object parameter0)=>string.Format(T("PackageManager.InvalidElementValue"), parameter0);
///<summary>&quot;Expected exactly two elements, &apos;{0}&apos; and &apos;{1}&apos;&quot;</summary> 
public static string ConfigurationTransformationPackageFragmentInstaller_ExpectedExactlyTwoElements(object parameter0,object parameter1)=>string.Format(T("ConfigurationTransformationPackageFragmentInstaller.ExpectedExactlyTwoElements"), parameter0,parameter1);
///<summary>&quot;Missing &apos;{0}&apos; element.&quot;</summary> 
public static string ConfigurationTransformationPackageFragmentInstaller_MissingElement(object parameter0)=>string.Format(T("ConfigurationTransformationPackageFragmentInstaller.MissingElement"), parameter0);
///<summary>&quot;Missing &apos;{0}&apos; attribute.&quot;</summary> 
public static string ConfigurationTransformationPackageFragmentInstaller_MissingAttribute(object parameter0)=>string.Format(T("ConfigurationTransformationPackageFragmentInstaller.MissingAttribute"), parameter0);
///<summary>&quot;The path &apos;{0}&apos; does not exist in the ZIP.&quot;</summary> 
public static string ConfigurationTransformationPackageFragmentInstaller_PathDoesNotExist(object parameter0)=>string.Format(T("ConfigurationTransformationPackageFragmentInstaller.PathDoesNotExist"), parameter0);
///<summary>&quot;Unable to parse ZIP&apos;ed XSLT file &apos;{0}&apos;. {1}&quot;</summary> 
public static string ConfigurationTransformationPackageFragmentInstaller_UnableToParsXslt(object parameter0,object parameter1)=>string.Format(T("ConfigurationTransformationPackageFragmentInstaller.UnableToParsXslt"), parameter0,parameter1);
///<summary>&quot;The XSLT file &apos;{0}&apos; will generate an invalid Configuration file. {1}&quot;</summary> 
public static string ConfigurationTransformationPackageFragmentInstaller_XsltWillGeneratedInvalid(object parameter0,object parameter1)=>string.Format(T("ConfigurationTransformationPackageFragmentInstaller.XsltWillGeneratedInvalid"), parameter0,parameter1);
///<summary>&quot;Only one &apos;Types&apos; element allowed&quot;</summary> 
public static string DataPackageFragmentInstaller_OnlyOneElement=>T("DataPackageFragmentInstaller.OnlyOneElement");
///<summary>&quot;Missing &apos;Types&apos; element&quot;</summary> 
public static string DataPackageFragmentInstaller_MissingElement=>T("DataPackageFragmentInstaller.MissingElement");
///<summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
public static string DataPackageFragmentInstaller_MissingAttribute(object parameter0)=>string.Format(T("DataPackageFragmentInstaller.MissingAttribute"), parameter0);
///<summary>&quot;Wrong DataScopeIdentifier ({0}) name in the configuration&quot;</summary> 
public static string DataPackageFragmentInstaller_WrongDataScopeIdentifier(object parameter0)=>string.Format(T("DataPackageFragmentInstaller.WrongDataScopeIdentifier"), parameter0);
///<summary>&quot;Wrong culture ({0}) name in the configuration&quot;</summary> 
public static string DataPackageFragmentInstaller_WrongLocale(object parameter0)=>string.Format(T("DataPackageFragmentInstaller.WrongLocale"), parameter0);
///<summary>&quot;Missing file &apos;{0}&apos; in the package zip&quot;</summary> 
public static string DataPackageFragmentInstaller_MissingFile(object parameter0)=>string.Format(T("DataPackageFragmentInstaller.MissingFile"), parameter0);
///<summary>&quot;The data interface type &apos;{0}&apos; has not been configured in the system&quot;</summary> 
public static string DataPackageFragmentInstaller_TypeNotConfigured(object parameter0)=>string.Format(T("DataPackageFragmentInstaller.TypeNotConfigured"), parameter0);
///<summary>&quot;The data interface type &apos;{0}&apos; does not inherit the interface &apos;{1}&apos;&quot;</summary> 
public static string DataPackageFragmentInstaller_TypeNotInheriting(object parameter0,object parameter1)=>string.Format(T("DataPackageFragmentInstaller.TypeNotInheriting"), parameter0,parameter1);
///<summary>&quot;The data interface type &apos;{0}&apos; does not have a property named &apos;{1}&apos;&quot;</summary> 
public static string DataPackageFragmentInstaller_MissingProperty(object parameter0,object parameter1)=>string.Format(T("DataPackageFragmentInstaller.MissingProperty"), parameter0,parameter1);
///<summary>&quot;The data interface type &apos;{0}&apos; does not have a writable property named &apos;{1}&apos;&quot;</summary> 
public static string DataPackageFragmentInstaller_MissingWritableProperty(object parameter0,object parameter1)=>string.Format(T("DataPackageFragmentInstaller.MissingWritableProperty"), parameter0,parameter1);
///<summary>&quot;Could not convert the value &apos;{0}&apos; to the type &apos;{1}&apos;&quot;</summary> 
public static string DataPackageFragmentInstaller_ConversionFailed(object parameter0,object parameter1)=>string.Format(T("DataPackageFragmentInstaller.ConversionFailed"), parameter0,parameter1);
///<summary>&quot;The property &apos;{0}&apos; on the interface &apos;{1}&apos; is missing a value.&quot;</summary> 
public static string DataPackageFragmentInstaller_MissingPropertyVaule(object parameter0,object parameter1)=>string.Format(T("DataPackageFragmentInstaller.MissingPropertyVaule"), parameter0,parameter1);
///<summary>&quot;Data type &apos;{0}&apos;: {1} record(s) already installed&quot;</summary> 
public static string DataPackageFragmentInstaller_DataExists(object parameter0,object parameter1)=>string.Format(T("DataPackageFragmentInstaller.DataExists"), parameter0,parameter1);
///<summary>&quot;Missing data type descriptor for the type {0}&quot;</summary> 
public static string DataPackageFragmentInstaller_MissingTypeDescriptor(object parameter0)=>string.Format(T("DataPackageFragmentInstaller.MissingTypeDescriptor"), parameter0);
///<summary>&quot;The data type &apos;{0}&apos; is not localized but a locale is specified in the configuration&quot;</summary> 
public static string DataPackageFragmentInstaller_TypeNonLocalizedWithLocale(object parameter0)=>string.Format(T("DataPackageFragmentInstaller.TypeNonLocalizedWithLocale"), parameter0);
///<summary>&quot;The data type &apos;{0}&apos; is localized but no locale is specified in the configuration&quot;</summary> 
public static string DataPackageFragmentInstaller_TypeLocalizedWithoutLocale(object parameter0)=>string.Format(T("DataPackageFragmentInstaller.TypeLocalizedWithoutLocale"), parameter0);
///<summary>&quot;Referenced data missing. Type: {0}, {1}: &apos;{2}&apos;&quot;</summary> 
public static string DataPackageFragmentInstaller_ReferencedDataMissing(object parameter0,object parameter1,object parameter2)=>string.Format(T("DataPackageFragmentInstaller.ReferencedDataMissing"), parameter0,parameter1,parameter2);
///<summary>&quot;Only one &apos;Types&apos; element allowed&quot;</summary> 
public static string DataPackageFragmentUninstaller_OnlyOneElement=>T("DataPackageFragmentUninstaller.OnlyOneElement");
///<summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
public static string DataPackageFragmentUninstaller_MissingAttribute(object parameter0)=>string.Format(T("DataPackageFragmentUninstaller.MissingAttribute"), parameter0);
///<summary>&quot;The data type &apos;{0}&apos; does not contain a key property named &apos;{1}&apos;&quot;</summary> 
public static string DataPackageFragmentUninstaller_MissingKeyProperty(object parameter0,object parameter1)=>string.Format(T("DataPackageFragmentUninstaller.MissingKeyProperty"), parameter0,parameter1);
///<summary>&quot;Data item &apos;{0}&apos; of type {1} is referenced from a data item &apos;{2}&apos; of type &apos;{3}&apos;&quot;</summary> 
public static string DataPackageFragmentUninstaller_DataIsReferenced(object parameter0,object parameter1,object parameter2,object parameter3)=>string.Format(T("DataPackageFragmentUninstaller.DataIsReferenced"), parameter0,parameter1,parameter2,parameter3);
///<summary>&quot;Page type &apos;{0}&apos; is referenced by page &apos;{1}&apos;&quot;</summary> 
public static string DataPackageFragmentUninstaller_PageTypeIsReferenced(object parameter0,object parameter1)=>string.Format(T("DataPackageFragmentUninstaller.PageTypeIsReferenced"), parameter0,parameter1);
///<summary>&quot;Only one &apos;Types&apos; element allowed&quot;</summary> 
public static string DataTypePackageFragmentInstaller_OnlyOneElement=>T("DataTypePackageFragmentInstaller.OnlyOneElement");
///<summary>&quot;Missing &apos;Types&apos; element&quot;</summary> 
public static string DataTypePackageFragmentInstaller_MissingElement=>T("DataTypePackageFragmentInstaller.MissingElement");
///<summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
public static string DataTypePackageFragmentInstaller_MissingAttribute(object parameter0)=>string.Format(T("DataTypePackageFragmentInstaller.MissingAttribute"), parameter0);
///<summary>&quot;The data interface type &apos;{0}&apos; has not been configured in the system&quot;</summary> 
public static string DataTypePackageFragmentInstaller_TypeNotConfigured(object parameter0)=>string.Format(T("DataTypePackageFragmentInstaller.TypeNotConfigured"), parameter0);
///<summary>&quot;The data interface type &apos;{0}&apos; does not inherit the interface &apos;{1}&apos;&quot;</summary> 
public static string DataTypePackageFragmentInstaller_TypeNotInheriting(object parameter0,object parameter1)=>string.Format(T("DataTypePackageFragmentInstaller.TypeNotInheriting"), parameter0,parameter1);
///<summary>&quot;The interface type &apos;{0}&apos; is already exists in the system&quot;</summary> 
public static string DataTypePackageFragmentInstaller_TypeExists(object parameter0)=>string.Format(T("DataTypePackageFragmentInstaller.TypeExists"), parameter0);
///<summary>&quot;Failed to build a data type descriptor for interface &apos;{0}&apos;&quot;</summary> 
public static string DataTypePackageFragmentInstaller_InterfaceCodeError(object parameter0)=>string.Format(T("DataTypePackageFragmentInstaller.InterfaceCodeError"), parameter0);
///<summary>&quot;Only one &apos;Types&apos; element allowed&quot;</summary> 
public static string DataTypePackageFragmentUninstaller_OnlyOneElement=>T("DataTypePackageFragmentUninstaller.OnlyOneElement");
///<summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
public static string DataTypePackageFragmentUninstaller_MissingAttribute(object parameter0)=>string.Format(T("DataTypePackageFragmentUninstaller.MissingAttribute"), parameter0);
///<summary>&quot;Wrong attribute format in the configuration&quot;</summary> 
public static string DataTypePackageFragmentUninstaller_WrongAttributeFormat=>T("DataTypePackageFragmentUninstaller.WrongAttributeFormat");
///<summary>&quot;Only one &apos;Types&apos; element allowed&quot;</summary> 
public static string DynamicDataTypePackageFragmentInstaller_OnlyOneElement=>T("DynamicDataTypePackageFragmentInstaller.OnlyOneElement");
///<summary>&quot;Missing &apos;Types&apos; element&quot;</summary> 
public static string DynamicDataTypePackageFragmentInstaller_MissingElement=>T("DynamicDataTypePackageFragmentInstaller.MissingElement");
///<summary>&quot;Error xml parsing the dataTypeDescriptor attribute&quot;</summary> 
public static string DynamicDataTypePackageFragmentInstaller_DataTypeDescriptorParseError=>T("DynamicDataTypePackageFragmentInstaller.DataTypeDescriptorParseError");
///<summary>&quot;Error while deserializing a DataType. Error text: {0}.&quot;</summary> 
public static string DynamicDataTypePackageFragmentInstaller_DataTypeDescriptorDeserializeError(object parameter0)=>string.Format(T("DynamicDataTypePackageFragmentInstaller.DataTypeDescriptorDeserializeError"), parameter0);
///<summary>&quot;Cannot find a referenced type &apos;{0}&apos;.&quot;</summary> 
public static string DynamicDataTypePackageFragmentInstaller_MissingReferencedType(object parameter0)=>string.Format(T("DynamicDataTypePackageFragmentInstaller.MissingReferencedType"), parameter0);
///<summary>&quot;The interface type &apos;{0}&apos; is already exists in the system&quot;</summary> 
public static string DynamicDataTypePackageFragmentInstaller_TypeExists(object parameter0)=>string.Format(T("DynamicDataTypePackageFragmentInstaller.TypeExists"), parameter0);
///<summary>&quot;Only one &apos;Types&apos; element allowed&quot;</summary> 
public static string DynamicDataTypePackageFragmentUninstaller_OnlyOneElement=>T("DynamicDataTypePackageFragmentUninstaller.OnlyOneElement");
///<summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
public static string DynamicDataTypePackageFragmentUninstaller_MissingAttribute(object parameter0)=>string.Format(T("DynamicDataTypePackageFragmentUninstaller.MissingAttribute"), parameter0);
///<summary>&quot;Wrong attribute format in the configuration&quot;</summary> 
public static string DynamicDataTypePackageFragmentUninstaller_WrongAttributeFormat=>T("DynamicDataTypePackageFragmentUninstaller.WrongAttributeFormat");
///<summary>&quot;Only one &apos;Files&apos; element allowed&quot;</summary> 
public static string FilePackageFragmentInstaller_OnlyOneFilesElement=>T("FilePackageFragmentInstaller.OnlyOneFilesElement");
///<summary>&quot;Only one &apos;Directories&apos; element allowed&quot;</summary> 
public static string FilePackageFragmentInstaller_OnlyOneDirectoriesElement=>T("FilePackageFragmentInstaller.OnlyOneDirectoriesElement");
///<summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
public static string FilePackageFragmentInstaller_MissingAttribute(object parameter0)=>string.Format(T("FilePackageFragmentInstaller.MissingAttribute"), parameter0);
///<summary>&quot;The &apos;deleteTargetDirectory&apos; attribute can only be applied to directories, not files&quot;</summary> 
public static string FilePackageFragmentInstaller_DeleteTargetDirectoryNotAllowed=>T("FilePackageFragmentInstaller.DeleteTargetDirectoryNotAllowed");
///<summary>&quot;Wrong attribute value format, bool value expected&quot;</summary> 
public static string FilePackageFragmentInstaller_WrongAttributeBoolFormat=>T("FilePackageFragmentInstaller.WrongAttributeBoolFormat");
///<summary>&quot;The install zip-file does not contain the file &apos;{0}&apos;&quot;</summary> 
public static string FilePackageFragmentInstaller_MissingFile(object parameter0)=>string.Format(T("FilePackageFragmentInstaller.MissingFile"), parameter0);
///<summary>&quot;The file &apos;{0}&apos; already exists&quot;</summary> 
public static string FilePackageFragmentInstaller_FileExists(object parameter0)=>string.Format(T("FilePackageFragmentInstaller.FileExists"), parameter0);
///<summary>&quot;File &apos;{0}&apos; marked as &apos;Read Only&apos; and therefore cannot be overwritten.&quot;</summary> 
public static string FilePackageFragmentInstaller_FileReadOnly(object parameter0)=>string.Format(T("FilePackageFragmentInstaller.FileReadOnly"), parameter0);
///<summary>&quot;The &apos;assemblyLoad&apos; attribute can only be applied to files, not directories&quot;</summary> 
public static string FilePackageFragmentInstaller_AssemblyLoadNotAllowed=>T("FilePackageFragmentInstaller.AssemblyLoadNotAllowed");
///<summary>&quot;The &apos;onlyUpdate&apos; attribute can only be applied to files, not directories&quot;</summary> 
public static string FilePackageFragmentInstaller_OnlyUpdateNotAllowed=>T("FilePackageFragmentInstaller.OnlyUpdateNotAllowed");
///<summary>&quot;The &apos;onlyUpdate&apos; attribute is not allowed in combination with the &apos;loadAssembly&apos; attribute&quot;</summary> 
public static string FilePackageFragmentInstaller_OnlyUpdateNotAllowedWithLoadAssemlby=>T("FilePackageFragmentInstaller.OnlyUpdateNotAllowedWithLoadAssemlby");
///<summary>&quot;The &apos;onlyUpdate&apos; and &apos;onlyAdd&apos; attributes are now allowed on the same element&quot;</summary> 
public static string FilePackageFragmentInstaller_OnlyUpdateAndOnlyAddNotAllowed=>T("FilePackageFragmentInstaller.OnlyUpdateAndOnlyAddNotAllowed");
///<summary>&quot;The &apos;onlyAdd&apos; and &apos;allowOverwrite&apos; attributes are now allowed on the same element&quot;</summary> 
public static string FilePackageFragmentInstaller_OnlyAddAndAllowOverwriteNotAllowed=>T("FilePackageFragmentInstaller.OnlyAddAndAllowOverwriteNotAllowed");
///<summary>&quot;The install zip-file does not contain the directory &apos;{0}&apos;&quot;</summary> 
public static string FilePackageFragmentInstaller_MissingDirectory(object parameter0)=>string.Format(T("FilePackageFragmentInstaller.MissingDirectory"), parameter0);
///<summary>&quot;Uninstall.xml contains file pathes, binded to the original website location, and therefore the package cannot be uninstalled safely.&quot;</summary> 
public static string FilePackageFragmentInstaller_WrongBasePath=>T("FilePackageFragmentInstaller.WrongBasePath");
///<summary>&quot;Only one &apos;Files&apos; element allowed&quot;</summary> 
public static string FilePackageFragmentUninstaller_OnlyOneFilesElement=>T("FilePackageFragmentUninstaller.OnlyOneFilesElement");
///<summary>&quot;Only one &apos;Areas&apos; element allowed&quot;</summary> 
public static string VirtualElementProviderNodePackageFragmentInstaller_OnlyOneElement=>T("VirtualElementProviderNodePackageFragmentInstaller.OnlyOneElement");
///<summary>&quot;Could not find the type &apos;{0}&apos;&quot;</summary> 
public static string VirtualElementProviderNodePackageFragmentInstaller_MissingType(object parameter0)=>string.Format(T("VirtualElementProviderNodePackageFragmentInstaller.MissingType"), parameter0);
///<summary>&quot;Could not find the icon &apos;{0}&apos;&quot;</summary> 
public static string VirtualElementProviderNodePackageFragmentInstaller_MissingIcon(object parameter0)=>string.Format(T("VirtualElementProviderNodePackageFragmentInstaller.MissingIcon"), parameter0);
///<summary>&quot;Only one &apos;Areas&apos; element allowed&quot;</summary> 
public static string VirtualElementProviderNodePackageFragmentUninstaller_OnlyOneElement=>T("VirtualElementProviderNodePackageFragmentUninstaller.OnlyOneElement");
///<summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
public static string VirtualElementProviderNodePackageFragmentUninstaller_MissingAttribute(object parameter0)=>string.Format(T("VirtualElementProviderNodePackageFragmentUninstaller.MissingAttribute"), parameter0);
///<summary>&quot;File &apos;{0}&apos; not found&quot;</summary> 
public static string FileXslTransformationPackageFragmentInstaller_FileNotFound(object parameter0)=>string.Format(T("FileXslTransformationPackageFragmentInstaller.FileNotFound"), parameter0);
///<summary>&quot;File &apos;{0}&apos; marked as &apos;Read Only&apos; and therefore cannot be overwritten.&quot;</summary> 
public static string FileXslTransformationPackageFragmentInstaller_FileReadOnly(object parameter0)=>string.Format(T("FileXslTransformationPackageFragmentInstaller.FileReadOnly"), parameter0);
///<summary>&quot;File &apos;{0}&apos; was marked as &apos;Read Only&apos;. This file attribute was explicitly removed and the file was updated normally.&quot;</summary> 
public static string FileXslTransformationPackageFragmentInstaller_FileReadOnlyOverride(object parameter0)=>string.Format(T("FileXslTransformationPackageFragmentInstaller.FileReadOnlyOverride"), parameter0);
///<summary>&quot;Only one &apos;PackageVersions&apos; element allowed&quot;</summary> 
public static string PackageVersionBumperFragmentInstaller_OnlyOneElement=>T("PackageVersionBumperFragmentInstaller.OnlyOneElement");
///<summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
public static string PackageVersionBumperFragmentInstaller_MissingAttribute(object parameter0)=>string.Format(T("PackageVersionBumperFragmentInstaller.MissingAttribute"), parameter0);
///<summary>&quot;Wrong attribute value format, Guid value expected&quot;</summary> 
public static string PackageVersionBumperFragmentInstaller_WrongAttributeGuidFormat=>T("PackageVersionBumperFragmentInstaller.WrongAttributeGuidFormat");
///<summary>&quot;The package id duplicate: &apos;{0}&apos;&quot;</summary> 
public static string PackageVersionBumperFragmentInstaller_PackageIdDuplicate(object parameter0)=>string.Format(T("PackageVersionBumperFragmentInstaller.PackageIdDuplicate"), parameter0);
///<summary>&quot;Wrong attribute value format, Version value expected (x.y.z)&quot;</summary> 
public static string PackageVersionBumperFragmentInstaller_WrongAttributeVersionFormat=>T("PackageVersionBumperFragmentInstaller.WrongAttributeVersionFormat");
///<summary>&quot;Only one &apos;PackageVersions&apos; element allowed&quot;</summary> 
public static string PackageVersionBumperFragmentUninstaller_OnlyOneElement=>T("PackageVersionBumperFragmentUninstaller.OnlyOneElement");
///<summary>&quot;Missing {0} attribute in the configuration&quot;</summary> 
public static string PackageVersionBumperFragmentUninstaller_MissingAttribute(object parameter0)=>string.Format(T("PackageVersionBumperFragmentUninstaller.MissingAttribute"), parameter0);
///<summary>&quot;Wrong attribute value format, Guid value expected&quot;</summary> 
public static string PackageVersionBumperFragmentUninstaller_WrongAttributeGuidFormat=>T("PackageVersionBumperFragmentUninstaller.WrongAttributeGuidFormat");
///<summary>&quot;The package id duplicate: &apos;{0}&apos;&quot;</summary> 
public static string PackageVersionBumperFragmentUninstaller_PackageIdDuplicate(object parameter0)=>string.Format(T("PackageVersionBumperFragmentUninstaller.PackageIdDuplicate"), parameter0);
///<summary>&quot;Wrong attribute value format, Version value expected (x.y.z)&quot;</summary> 
public static string PackageVersionBumperFragmentUninstaller_WrongAttributeVersionFormat=>T("PackageVersionBumperFragmentUninstaller.WrongAttributeVersionFormat");
///<summary>&quot;A public RSA key is missing in the package configuration&quot;</summary> 
public static string PackageLicenseFragmentInstaller_MissingPublicKeyElement=>T("PackageLicenseFragmentInstaller.MissingPublicKeyElement");
///<summary>&quot;File &apos;{0}&apos; does not exist.&quot;</summary> 
public static string FileModifyPackageFragmentInstaller_FileDoesNotExist(object parameter0)=>string.Format(T("FileModifyPackageFragmentInstaller.FileDoesNotExist"), parameter0);
///<summary>&quot;Invalid license key&quot;</summary> 
public static string License_InvalidKeyTitle=>T("License.InvalidKeyTitle");
///<summary>&quot;The license key is invalid. You need to obtain a valid license key.&quot;</summary> 
public static string License_InvalidKeyMessage=>T("License.InvalidKeyMessage");
///<summary>&quot;Trial period has expired&quot;</summary> 
public static string License_ExpiredTitle=>T("License.ExpiredTitle");
///<summary>&quot;The trial period of the package has expired. You need to obtain a valid license.&quot;</summary> 
public static string License_ExpiredMessage=>T("License.ExpiredMessage");
///<summary>&quot;Failed to get license information. ProductId: {0}&quot;</summary> 
public static string License_Failed(object parameter0)=>string.Format(T("License.Failed"), parameter0);
///<summary>&quot;The Windows user under which this C1 instance is running does not have write permission to file or folder &apos;{0}&apos;.&quot;</summary> 
public static string NotEnoughNtfsPermissions(object parameter0)=>string.Format(T("NotEnoughNtfsPermissions"), parameter0);
///<summary>&quot;Only one &apos;{0}&apos; element allowed&quot;</summary> 
public static string PackageFragmentInstaller_OnlyOneElementAllowed(object parameter0)=>string.Format(T("PackageFragmentInstaller.OnlyOneElementAllowed"), parameter0);
///<summary>&quot;Unexpected element name &apos;{0}&apos;, only allowed element name is &apos;{1}&apos;&quot;</summary> 
public static string PackageFragmentInstaller_IncorrectElement(object parameter0,object parameter1)=>string.Format(T("PackageFragmentInstaller.IncorrectElement"), parameter0,parameter1);
///<summary>&quot;Missing &apos;{0}&apos; attribute.&quot;</summary> 
public static string PackageFragmentInstaller_MissingAttribute(object parameter0)=>string.Format(T("PackageFragmentInstaller.MissingAttribute"), parameter0);
///<summary>&quot;Missing element &apos;{0}&apos;.&quot;</summary> 
public static string PackageFragmentInstaller_MissingElement(object parameter0)=>string.Format(T("PackageFragmentInstaller.MissingElement"), parameter0);
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Cultures {
///<summary>&quot;Afrikaans, South Africa&quot;</summary> 
public static string af_ZA=>T("af-ZA");
///<summary>&quot;Albanian, Albania&quot;</summary> 
public static string sq_AL=>T("sq-AL");
///<summary>&quot;Arabic, Algeria&quot;</summary> 
public static string ar_DZ=>T("ar-DZ");
///<summary>&quot;Arabic, Bahrain&quot;</summary> 
public static string ar_BH=>T("ar-BH");
///<summary>&quot;Arabic, Egypt&quot;</summary> 
public static string ar_EG=>T("ar-EG");
///<summary>&quot;Arabic, Iraq&quot;</summary> 
public static string ar_IQ=>T("ar-IQ");
///<summary>&quot;Arabic, Jordan&quot;</summary> 
public static string ar_JO=>T("ar-JO");
///<summary>&quot;Arabic, Kuwait&quot;</summary> 
public static string ar_KW=>T("ar-KW");
///<summary>&quot;Arabic, Lebanon&quot;</summary> 
public static string ar_LB=>T("ar-LB");
///<summary>&quot;Arabic, Libya&quot;</summary> 
public static string ar_LY=>T("ar-LY");
///<summary>&quot;Arabic, Morocco&quot;</summary> 
public static string ar_MA=>T("ar-MA");
///<summary>&quot;Arabic, Oman&quot;</summary> 
public static string ar_OM=>T("ar-OM");
///<summary>&quot;Arabic, Qatar&quot;</summary> 
public static string ar_QA=>T("ar-QA");
///<summary>&quot;Arabic, Saudi Arabia&quot;</summary> 
public static string ar_SA=>T("ar-SA");
///<summary>&quot;Arabic, Syria&quot;</summary> 
public static string ar_SY=>T("ar-SY");
///<summary>&quot;Arabic, Tunisia&quot;</summary> 
public static string ar_TN=>T("ar-TN");
///<summary>&quot;Arabic, U.A.E.&quot;</summary> 
public static string ar_AE=>T("ar-AE");
///<summary>&quot;Arabic, Yemen&quot;</summary> 
public static string ar_YE=>T("ar-YE");
///<summary>&quot;Armenian, Armenia&quot;</summary> 
public static string hy_AM=>T("hy-AM");
///<summary>&quot;Azeri, Cyrillic Azerbaijan&quot;</summary> 
public static string az_Cyrl_AZ=>T("az-Cyrl-AZ");
///<summary>&quot;Azeri, Latin Azerbaijan&quot;</summary> 
public static string az_Latn_AZ=>T("az-Latn-AZ");
///<summary>&quot;Basque, Basque&quot;</summary> 
public static string eu_ES=>T("eu-ES");
///<summary>&quot;Belarusian, Belarus&quot;</summary> 
public static string be_BY=>T("be-BY");
///<summary>&quot;Bosnian, Bosnia and Herzegovina&quot;</summary> 
public static string bs_Latn_BA=>T("bs-Latn-BA");
///<summary>&quot;Bosnian (Cyrillic) (Bosnia and Herzegovina)&quot;</summary> 
public static string bs_Cyrl_BA=>T("bs-Cyrl-BA");
///<summary>&quot;Bulgarian, Bulgaria&quot;</summary> 
public static string bg_BG=>T("bg-BG");
///<summary>&quot;Catalan, Catalan&quot;</summary> 
public static string ca_ES=>T("ca-ES");
///<summary>&quot;Chinese, Hong Kong S.A.R.&quot;</summary> 
public static string zh_HK=>T("zh-HK");
///<summary>&quot;Chinese, Macao S.A.R.&quot;</summary> 
public static string zh_MO=>T("zh-MO");
///<summary>&quot;Chinese, People&apos;s Republic of China&quot;</summary> 
public static string zh_CN=>T("zh-CN");
///<summary>&quot;Chinese, Singapore&quot;</summary> 
public static string zh_SG=>T("zh-SG");
///<summary>&quot;Chinese, Taiwan&quot;</summary> 
public static string zh_TW=>T("zh-TW");
///<summary>&quot;Croatian, Bosnia and Herzegovina&quot;</summary> 
public static string hr_BA=>T("hr-BA");
///<summary>&quot;Croatian, Croatia&quot;</summary> 
public static string hr_HR=>T("hr-HR");
///<summary>&quot;Czech, Czech Republic&quot;</summary> 
public static string cs_CZ=>T("cs-CZ");
///<summary>&quot;Danish&quot;</summary> 
public static string da_DK=>T("da-DK");
///<summary>&quot;Divehi, Maldives&quot;</summary> 
public static string dv_MV=>T("dv-MV");
///<summary>&quot;Dutch, Belgium&quot;</summary> 
public static string nl_BE=>T("nl-BE");
///<summary>&quot;Dutch&quot;</summary> 
public static string nl_NL=>T("nl-NL");
///<summary>&quot;English, Australia&quot;</summary> 
public static string en_AU=>T("en-AU");
///<summary>&quot;English, Belize&quot;</summary> 
public static string en_BZ=>T("en-BZ");
///<summary>&quot;English, Canada&quot;</summary> 
public static string en_CA=>T("en-CA");
///<summary>&quot;English, Caribbean&quot;</summary> 
public static string en_029=>T("en-029");
///<summary>&quot;English, Ireland&quot;</summary> 
public static string en_IE=>T("en-IE");
///<summary>&quot;English, Jamaica&quot;</summary> 
public static string en_JM=>T("en-JM");
///<summary>&quot;English, New Zealand&quot;</summary> 
public static string en_NZ=>T("en-NZ");
///<summary>&quot;English, Republic of the Philippines&quot;</summary> 
public static string en_PH=>T("en-PH");
///<summary>&quot;English, South Africa&quot;</summary> 
public static string en_ZA=>T("en-ZA");
///<summary>&quot;English, Trinidad and Tobago&quot;</summary> 
public static string en_TT=>T("en-TT");
///<summary>&quot;English, UK&quot;</summary> 
public static string en_GB=>T("en-GB");
///<summary>&quot;English, US&quot;</summary> 
public static string en_US=>T("en-US");
///<summary>&quot;English, Zimbabwe&quot;</summary> 
public static string en_ZW=>T("en-ZW");
///<summary>&quot;Estonian, Estonia&quot;</summary> 
public static string et_EE=>T("et-EE");
///<summary>&quot;Faroese, Faroe Islands&quot;</summary> 
public static string fo_FO=>T("fo-FO");
///<summary>&quot;Filipino, Philippines&quot;</summary> 
public static string fil_PH=>T("fil-PH");
///<summary>&quot;Finnish&quot;</summary> 
public static string fi_FI=>T("fi-FI");
///<summary>&quot;French, Belgium&quot;</summary> 
public static string fr_BE=>T("fr-BE");
///<summary>&quot;French, Canada&quot;</summary> 
public static string fr_CA=>T("fr-CA");
///<summary>&quot;French&quot;</summary> 
public static string fr_FR=>T("fr-FR");
///<summary>&quot;French, Luxembourg&quot;</summary> 
public static string fr_LU=>T("fr-LU");
///<summary>&quot;French, Principality of Monaco&quot;</summary> 
public static string fr_MC=>T("fr-MC");
///<summary>&quot;French, Switzerland&quot;</summary> 
public static string fr_CH=>T("fr-CH");
///<summary>&quot;Frisian, Netherlands&quot;</summary> 
public static string fy_NL=>T("fy-NL");
///<summary>&quot;Gaelic, United Kingdom&quot;</summary> 
public static string gd_GB=>T("gd-GB");
///<summary>&quot;Galician, Galician&quot;</summary> 
public static string gl_ES=>T("gl-ES");
///<summary>&quot;Georgian, Georgia&quot;</summary> 
public static string ka_GE=>T("ka-GE");
///<summary>&quot;German, Austria&quot;</summary> 
public static string de_AT=>T("de-AT");
///<summary>&quot;German&quot;</summary> 
public static string de_DE=>T("de-DE");
///<summary>&quot;German, Liechtenstein&quot;</summary> 
public static string de_LI=>T("de-LI");
///<summary>&quot;German, Luxembourg&quot;</summary> 
public static string de_LU=>T("de-LU");
///<summary>&quot;German, Switzerland&quot;</summary> 
public static string de_CH=>T("de-CH");
///<summary>&quot;Greek, Greece&quot;</summary> 
public static string el_GR=>T("el-GR");
///<summary>&quot;Greenlandic&quot;</summary> 
public static string kl_GL=>T("kl-GL");
///<summary>&quot;Gujarati, India&quot;</summary> 
public static string gu_IN=>T("gu-IN");
///<summary>&quot;Hebrew, Israel&quot;</summary> 
public static string he_IL=>T("he-IL");
///<summary>&quot;Hindi, India&quot;</summary> 
public static string hi_IN=>T("hi-IN");
///<summary>&quot;Hungarian, Hungary&quot;</summary> 
public static string hu_HU=>T("hu-HU");
///<summary>&quot;Icelandic, Iceland&quot;</summary> 
public static string is_IS=>T("is-IS");
///<summary>&quot;Indonesian, Indonesia&quot;</summary> 
public static string id_ID=>T("id-ID");
///<summary>&quot;Inuktitut (Latin) (Canada)&quot;</summary> 
public static string iu_Latn_CA=>T("iu-Latn-CA");
///<summary>&quot;Irish, Ireland&quot;</summary> 
public static string ga_IE=>T("ga-IE");
///<summary>&quot;Italian&quot;</summary> 
public static string it_IT=>T("it-IT");
///<summary>&quot;Italian, Switzerland&quot;</summary> 
public static string it_CH=>T("it-CH");
///<summary>&quot;Japanese, Japan&quot;</summary> 
public static string ja_JP=>T("ja-JP");
///<summary>&quot;Kannada, India&quot;</summary> 
public static string kn_IN=>T("kn-IN");
///<summary>&quot;Kazakh, Kazakhstan&quot;</summary> 
public static string kk_KZ=>T("kk-KZ");
///<summary>&quot;Kiswahili, Kenya&quot;</summary> 
public static string sw_KE=>T("sw-KE");
///<summary>&quot;Konkani, India&quot;</summary> 
public static string kok_IN=>T("kok-IN");
///<summary>&quot;Korean, Korea&quot;</summary> 
public static string ko_KR=>T("ko-KR");
///<summary>&quot;Kyrgyz, Kyrgyzstan&quot;</summary> 
public static string ky_KG=>T("ky-KG");
///<summary>&quot;Latvian, Latvia&quot;</summary> 
public static string lv_LV=>T("lv-LV");
///<summary>&quot;Lithuanian, Lithuania&quot;</summary> 
public static string lt_LT=>T("lt-LT");
///<summary>&quot;Luxembourgish, Luxembourg&quot;</summary> 
public static string lb_LU=>T("lb-LU");
///<summary>&quot;Macedonian, Former Yugoslav Republic of Macedonia&quot;</summary> 
public static string mk_MK=>T("mk-MK");
///<summary>&quot;Malay, Brunei Darussalam&quot;</summary> 
public static string ms_BN=>T("ms-BN");
///<summary>&quot;Malay, Malaysia&quot;</summary> 
public static string ms_MY=>T("ms-MY");
///<summary>&quot;Maltese, Malta&quot;</summary> 
public static string mt_MT=>T("mt-MT");
///<summary>&quot;Maori, New Zealand&quot;</summary> 
public static string mi_NZ=>T("mi-NZ");
///<summary>&quot;Mapudungun, Chile&quot;</summary> 
public static string arn_CL=>T("arn-CL");
///<summary>&quot;Marathi, India&quot;</summary> 
public static string mr_IN=>T("mr-IN");
///<summary>&quot;Mohawk, Canada&quot;</summary> 
public static string moh_CA=>T("moh-CA");
///<summary>&quot;Mongolian, Cyrillic Mongolia&quot;</summary> 
public static string mn_MN=>T("mn-MN");
///<summary>&quot;Norwegian Bokmål&quot;</summary> 
public static string nb_NO=>T("nb-NO");
///<summary>&quot;Norwegian Nynorsk, Norway&quot;</summary> 
public static string nn_NO=>T("nn-NO");
///<summary>&quot;Persian, Iran&quot;</summary> 
public static string fa_IR=>T("fa-IR");
///<summary>&quot;Polish, Poland&quot;</summary> 
public static string pl_PL=>T("pl-PL");
///<summary>&quot;Portuguese, Brazil&quot;</summary> 
public static string pt_BR=>T("pt-BR");
///<summary>&quot;Portuguese, Portugal&quot;</summary> 
public static string pt_PT=>T("pt-PT");
///<summary>&quot;Punjabi, India&quot;</summary> 
public static string pa_IN=>T("pa-IN");
///<summary>&quot;Quechua, Bolivia&quot;</summary> 
public static string quz_BO=>T("quz-BO");
///<summary>&quot;Quechua, Ecuador&quot;</summary> 
public static string quz_EC=>T("quz-EC");
///<summary>&quot;Quechua, Peru&quot;</summary> 
public static string quz_PE=>T("quz-PE");
///<summary>&quot;Romanian, Romania&quot;</summary> 
public static string ro_RO=>T("ro-RO");
///<summary>&quot;Romansh, Switzerland&quot;</summary> 
public static string rm_CH=>T("rm-CH");
///<summary>&quot;Russian, Russia&quot;</summary> 
public static string ru_RU=>T("ru-RU");
///<summary>&quot;Sami (Inari) (Finland)&quot;</summary> 
public static string smn_FI=>T("smn-FI");
///<summary>&quot;Sami (Lule) (Norway)&quot;</summary> 
public static string smj_NO=>T("smj-NO");
///<summary>&quot;Sami (Lule) (Sweden)&quot;</summary> 
public static string smj_SE=>T("smj-SE");
///<summary>&quot;Sami (Northern) (Finland)&quot;</summary> 
public static string se_FI=>T("se-FI");
///<summary>&quot;Sami (Northern) (Norway)&quot;</summary> 
public static string se_NO=>T("se-NO");
///<summary>&quot;Sami&quot;</summary> 
public static string se_SE=>T("se-SE");
///<summary>&quot;Sami (Skolt) (Finland)&quot;</summary> 
public static string sms_FI=>T("sms-FI");
///<summary>&quot;Sami (Southern) (Norway)&quot;</summary> 
public static string sma_NO=>T("sma-NO");
///<summary>&quot;Sami (Southern) (Sweden)&quot;</summary> 
public static string sma_SE=>T("sma-SE");
///<summary>&quot;Sanskrit, India&quot;</summary> 
public static string sa_IN=>T("sa-IN");
///<summary>&quot;Serbian, Cyrillic (Bosnia and Herzegovina)&quot;</summary> 
public static string sr_Cyrl_BA=>T("sr-Cyrl-BA");
///<summary>&quot;Serbian, Cyrillic (Montenegro)&quot;</summary> 
public static string sr_Cyrl_ME=>T("sr-Cyrl-ME");
///<summary>&quot;Serbian, Cyrillic (Serbia and Montenegro - former)&quot;</summary> 
public static string sr_Cyrl_CS=>T("sr-Cyrl-CS");
///<summary>&quot;Serbian, Cyrillic (Serbia)&quot;</summary> 
public static string sr_Cyrl_RS=>T("sr-Cyrl-RS");
///<summary>&quot;Serbian, Latin (Bosnia and Herzegovina)&quot;</summary> 
public static string sr_Latn_BA=>T("sr-Latn-BA");
///<summary>&quot;Serbian, Latin (Montenegro)&quot;</summary> 
public static string sr_Latn_ME=>T("sr-Latn-ME");
///<summary>&quot;Serbian, Latin (Serbia and Montenegro - former)&quot;</summary> 
public static string sr_Latn_CS=>T("sr-Latn-CS");
///<summary>&quot;Serbian, Latin (Serbia)&quot;</summary> 
public static string sr_Latn_RS=>T("sr-Latn-RS");
///<summary>&quot;Sesotho sa Leboa, South Africa&quot;</summary> 
public static string ns_ZA=>T("ns-ZA");
///<summary>&quot;Setswana, South Africa&quot;</summary> 
public static string tn_ZA=>T("tn-ZA");
///<summary>&quot;Slovak, Slovakia&quot;</summary> 
public static string sk_SK=>T("sk-SK");
///<summary>&quot;Slovenian, Slovenia&quot;</summary> 
public static string sl_SI=>T("sl-SI");
///<summary>&quot;Spanish, Argentina&quot;</summary> 
public static string es_AR=>T("es-AR");
///<summary>&quot;Spanish, Bolivia&quot;</summary> 
public static string es_BO=>T("es-BO");
///<summary>&quot;Spanish, Chile&quot;</summary> 
public static string es_CL=>T("es-CL");
///<summary>&quot;Spanish, Colombia&quot;</summary> 
public static string es_CO=>T("es-CO");
///<summary>&quot;Spanish, Costa Rica&quot;</summary> 
public static string es_CR=>T("es-CR");
///<summary>&quot;Spanish, Dominican Republic&quot;</summary> 
public static string es_DO=>T("es-DO");
///<summary>&quot;Spanish, Ecuador&quot;</summary> 
public static string es_EC=>T("es-EC");
///<summary>&quot;Spanish, El Salvador&quot;</summary> 
public static string es_SV=>T("es-SV");
///<summary>&quot;Spanish, Guatemala&quot;</summary> 
public static string es_GT=>T("es-GT");
///<summary>&quot;Spanish, Honduras&quot;</summary> 
public static string es_HN=>T("es-HN");
///<summary>&quot;Spanish, Mexico&quot;</summary> 
public static string es_MX=>T("es-MX");
///<summary>&quot;Spanish, Nicaragua&quot;</summary> 
public static string es_NI=>T("es-NI");
///<summary>&quot;Spanish, Panama&quot;</summary> 
public static string es_PA=>T("es-PA");
///<summary>&quot;Spanish, Paraguay&quot;</summary> 
public static string es_PY=>T("es-PY");
///<summary>&quot;Spanish, Peru&quot;</summary> 
public static string es_PE=>T("es-PE");
///<summary>&quot;Spanish, Puerto Rico&quot;</summary> 
public static string es_PR=>T("es-PR");
///<summary>&quot;Spanish&quot;</summary> 
public static string es_ES=>T("es-ES");
///<summary>&quot;Spanish, Uruguay&quot;</summary> 
public static string es_UY=>T("es-UY");
///<summary>&quot;Spanish, Venezuela&quot;</summary> 
public static string es_VE=>T("es-VE");
///<summary>&quot;Swedish, Finland&quot;</summary> 
public static string sv_FI=>T("sv-FI");
///<summary>&quot;Swedish&quot;</summary> 
public static string sv_SE=>T("sv-SE");
///<summary>&quot;Syriac, Syria&quot;</summary> 
public static string syr_SY=>T("syr-SY");
///<summary>&quot;Tamil, India&quot;</summary> 
public static string ta_IN=>T("ta-IN");
///<summary>&quot;Tatar, Russia&quot;</summary> 
public static string tt_RU=>T("tt-RU");
///<summary>&quot;Telugu, India&quot;</summary> 
public static string te_IN=>T("te-IN");
///<summary>&quot;Thai, Thailand&quot;</summary> 
public static string th_TH=>T("th-TH");
///<summary>&quot;Turkish, Turkey&quot;</summary> 
public static string tr_TR=>T("tr-TR");
///<summary>&quot;Ukrainian, Ukraine&quot;</summary> 
public static string uk_UA=>T("uk-UA");
///<summary>&quot;Urdu, Islamic Republic of Pakistan&quot;</summary> 
public static string ur_PK=>T("ur-PK");
///<summary>&quot;Uzbek, Cyrillic Uzbekistan&quot;</summary> 
public static string uz_Cyrl_UZ=>T("uz-Cyrl-UZ");
///<summary>&quot;Uzbek, Latin Uzbekistan&quot;</summary> 
public static string uz_Latn_UZ=>T("uz-Latn-UZ");
///<summary>&quot;Vietnamese, Vietnam&quot;</summary> 
public static string vi_VN=>T("vi-VN");
///<summary>&quot;Welsh, United Kingdom&quot;</summary> 
public static string cy_GB=>T("cy-GB");
///<summary>&quot;Xhosa, South Africa&quot;</summary> 
public static string xh_ZA=>T("xh-ZA");
///<summary>&quot;Zulu, South Africa&quot;</summary> 
public static string zu_ZA=>T("zu-ZA");
///<summary>&quot;Alsatian, France&quot;</summary> 
public static string gsw_FR=>T("gsw-FR");
///<summary>&quot;Amharic, Ethiopia&quot;</summary> 
public static string am_ET=>T("am-ET");
///<summary>&quot;Assamese, India&quot;</summary> 
public static string as_IN=>T("as-IN");
///<summary>&quot;Bashkir, Russia&quot;</summary> 
public static string ba_RU=>T("ba-RU");
///<summary>&quot;Bengali, Bangladesh&quot;</summary> 
public static string bn_BD=>T("bn-BD");
///<summary>&quot;Bengali, India&quot;</summary> 
public static string bn_IN=>T("bn-IN");
///<summary>&quot;Breton, France&quot;</summary> 
public static string br_FR=>T("br-FR");
///<summary>&quot;Corsican, France&quot;</summary> 
public static string co_FR=>T("co-FR");
///<summary>&quot;Dari, Afghanistan&quot;</summary> 
public static string prs_AF=>T("prs-AF");
///<summary>&quot;English, India&quot;</summary> 
public static string en_IN=>T("en-IN");
///<summary>&quot;English, Malaysia&quot;</summary> 
public static string en_MY=>T("en-MY");
///<summary>&quot;English, Singapore&quot;</summary> 
public static string en_SG=>T("en-SG");
///<summary>&quot;Hausa (Latin) (Nigeria)&quot;</summary> 
public static string ha_Latn_NG=>T("ha-Latn-NG");
///<summary>&quot;Igbo, Nigeria&quot;</summary> 
public static string ig_NG=>T("ig-NG");
///<summary>&quot;Inuktitut, Canada&quot;</summary> 
public static string iu_Cans_CA=>T("iu-Cans-CA");
///<summary>&quot;Khmer, Cambodia&quot;</summary> 
public static string km_KH=>T("km-KH");
///<summary>&quot;K&apos;iche, Guatemala&quot;</summary> 
public static string qut_GT=>T("qut-GT");
///<summary>&quot;Kinyarwanda, Rwanda&quot;</summary> 
public static string rw_RW=>T("rw-RW");
///<summary>&quot;Lao, Lao P.D.R.&quot;</summary> 
public static string lo_LA=>T("lo-LA");
///<summary>&quot;Lower Sorbian, Germany&quot;</summary> 
public static string dsb_DE=>T("dsb-DE");
///<summary>&quot;Malayalam, India&quot;</summary> 
public static string ml_IN=>T("ml-IN");
///<summary>&quot;Mongolian (Traditional Mongolian) (People&apos;s Republic of China)&quot;</summary> 
public static string mn_Mong_CN=>T("mn-Mong-CN");
///<summary>&quot;Nepali, Nepal&quot;</summary> 
public static string ne_NP=>T("ne-NP");
///<summary>&quot;Occitan, France&quot;</summary> 
public static string oc_FR=>T("oc-FR");
///<summary>&quot;Oriya, India&quot;</summary> 
public static string or_IN=>T("or-IN");
///<summary>&quot;Pashto, Afghanistan&quot;</summary> 
public static string ps_AF=>T("ps-AF");
///<summary>&quot;Sesotho sa Leboa, South Africa&quot;</summary> 
public static string nso_ZA=>T("nso-ZA");
///<summary>&quot;Sinhala, Sri Lanka&quot;</summary> 
public static string si_LK=>T("si-LK");
///<summary>&quot;Spanish, United States&quot;</summary> 
public static string es_US=>T("es-US");
///<summary>&quot;Tajik (Cyrillic) (Tajikistan)&quot;</summary> 
public static string tg_Cyrl_TJ=>T("tg-Cyrl-TJ");
///<summary>&quot;Tamazight (Latin) (Algeria)&quot;</summary> 
public static string tzm_Latn_DZ=>T("tzm-Latn-DZ");
///<summary>&quot;Tibetan, People&apos;s Republic of China&quot;</summary> 
public static string bo_CN=>T("bo-CN");
///<summary>&quot;Turkmen, Turkmenistan&quot;</summary> 
public static string tk_TM=>T("tk-TM");
///<summary>&quot;Uighur, People&apos;s Republic of China&quot;</summary> 
public static string ug_CN=>T("ug-CN");
///<summary>&quot;Upper Sorbian, Germany&quot;</summary> 
public static string hsb_DE=>T("hsb-DE");
///<summary>&quot;Wolof, Senegal&quot;</summary> 
public static string wo_SN=>T("wo-SN");
///<summary>&quot;Yakut, Russia&quot;</summary> 
public static string sah_RU=>T("sah-RU");
///<summary>&quot;Yi, People&apos;s Republic of China&quot;</summary> 
public static string ii_CN=>T("ii-CN");
///<summary>&quot;Yoruba, Nigeria&quot;</summary> 
public static string yo_NG=>T("yo-NG");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Cultures", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_EntityTokenLocked {
///<summary>&quot;This item is currently being edited&quot;</summary> 
public static string LayoutLabel=>T("LayoutLabel");
///<summary>&quot;Information&quot;</summary> 
public static string LockedByUsername_FieldGroupLabel=>T("LockedByUsername.FieldGroupLabel");
///<summary>&quot;The item is edited by:&quot;</summary> 
public static string LockedByUsername_Label=>T("LockedByUsername.Label");
///<summary>&quot;Another user is editing this item. Press OK to proceed or cancel to abort.&quot;</summary> 
public static string LockedByUsername_Help=>T("LockedByUsername.Help");
///<summary>&quot;You are editing this item in another tab - continue?&quot;</summary> 
public static string SameUserHeading_Title=>T("SameUserHeading.Title");
///<summary>&quot;Press OK to proceed opening the item or Cancel to abort.&quot;</summary> 
public static string SameUserHeading_Description=>T("SameUserHeading.Description");
///<summary>&quot;Another user is editing this item - continue?&quot;</summary> 
public static string AnotherUserHeading_Title=>T("AnotherUserHeading.Title");
///<summary>&quot;If the item is changed simultaneously by multiple users changes may get lost. Press OK to proceed or cancel to abort.&quot;</summary> 
public static string AnotherUserHeading_Description=>T("AnotherUserHeading.Description");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.EntityTokenLocked", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_GeneratedTypes {
///<summary>&quot;One or more types are referencing this type. Renaming is not possible&quot;</summary> 
public static string TypesAreReferencing=>T("TypesAreReferencing");
///<summary>&quot;The type name &apos;{0}&apos; appears in the namespace &apos;{1}&apos; - this is not allowed&quot;</summary> 
public static string TypeNameInNamespace(object parameter0,object parameter1)=>string.Format(T("TypeNameInNamespace"), parameter0,parameter1);
///<summary>&quot;A type with the same name already exists&quot;</summary> 
public static string TypesNameClash=>T("TypesNameClash");
///<summary>&quot;No fields added&quot;</summary> 
public static string MissingFields=>T("MissingFields");
///<summary>&quot;The type name &apos;{0}&apos; is not a valid identifier.&quot;</summary> 
public static string TypeNameIsInvalidIdentifier(object parameter0)=>string.Format(T("TypeNameIsInvalidIdentifier"), parameter0);
///<summary>&quot;The field name &apos;{0}&apos; can not be used&quot;</summary> 
public static string FieldNameCannotBeUsed(object parameter0)=>string.Format(T("FieldNameCannotBeUsed"), parameter0);
///<summary>&quot;The specified &apos;Type namespace&apos; is already in use as a &apos;Type name&apos; (namespace + name). Consider changing the name of &apos;{0}&apos; to &apos;{0}.Item&apos;.&quot;</summary> 
public static string NameSpaceIsTypeTypeName(object parameter0)=>string.Format(T("NameSpaceIsTypeTypeName"), parameter0);
///<summary>&quot;Type name belongs to a reserved namespace.&quot;</summary> 
public static string NamespaceIsReserved=>T("NamespaceIsReserved");
///<summary>&quot;Cannot add a data type since it will cause some compilation errors.&quot;</summary> 
public static string CompileErrorWhileAddingType=>T("CompileErrorWhileAddingType");
///<summary>&quot;Cannot change a data type since it will cause some compilation errors.&quot;</summary> 
public static string CompileErrorWhileChangingType=>T("CompileErrorWhileChangingType");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.GeneratedTypes", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Management {
///<summary>&quot;Edit Permissions&quot;</summary> 
public static string ManageUserPermissions_ManageUserPermissionsOnBranchLabel=>T("ManageUserPermissions.ManageUserPermissionsOnBranchLabel");
///<summary>&quot;Edit Permissions&quot;</summary> 
public static string ManageUserPermissions_ManageUserPermissionsOnItemLabel=>T("ManageUserPermissions.ManageUserPermissionsOnItemLabel");
///<summary>&quot;User Permission Settings&quot;</summary> 
public static string ManageUserPermissions_ManageGlobalUserPermissionsLabel=>T("ManageUserPermissions.ManageGlobalUserPermissionsLabel");
///<summary>&quot;Manage user permissions&quot;</summary> 
public static string ManageUserPermissions_ManageUserPermissionsToolTip=>T("ManageUserPermissions.ManageUserPermissionsToolTip");
///<summary>&quot;Metadata&quot;</summary> 
public static string DataCompositionVisabilityFacade_DefaultContainerLabel=>T("DataCompositionVisabilityFacade.DefaultContainerLabel");
///<summary>&quot;Delete User?&quot;</summary> 
public static string Website_Forms_Administrative_DeleteUserStep1_LabelFieldGroup=>T("Website.Forms.Administrative.DeleteUserStep1.LabelFieldGroup");
///<summary>&quot;Delete the selected user?&quot;</summary> 
public static string Website_Forms_Administrative_DeleteUserStep1_Text=>T("Website.Forms.Administrative.DeleteUserStep1.Text");
///<summary>&quot;Cascade delete error&quot;</summary> 
public static string DeleteUserWorkflow_CascadeDeleteErrorTitle=>T("DeleteUserWorkflow.CascadeDeleteErrorTitle");
///<summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
public static string DeleteUserWorkflow_CascadeDeleteErrorMessage=>T("DeleteUserWorkflow.CascadeDeleteErrorMessage");
///<summary>&quot;Cannot delete a user&quot;</summary> 
public static string DeleteUserWorkflow_DeleteSelfTitle=>T("DeleteUserWorkflow.DeleteSelfTitle");
///<summary>&quot;You can not delete an account you logged in as.&quot;</summary> 
public static string DeleteUserWorkflow_DeleteSelfErrorMessage=>T("DeleteUserWorkflow.DeleteSelfErrorMessage");
///<summary>&quot;Select Function&quot;</summary> 
public static string Website_Function_SelectDialog_Title=>T("Website.Function.SelectDialog.Title");
///<summary>&quot;Select Widget&quot;</summary> 
public static string Website_Widget_SelectDialog_Title=>T("Website.Widget.SelectDialog.Title");
///<summary>&quot;Select Page or File&quot;</summary> 
public static string Website_ContentLink_SelectDialog_Title=>T("Website.ContentLink.SelectDialog.Title");
///<summary>&quot;Select Page&quot;</summary> 
public static string Website_Page_SelectDialog_Title=>T("Website.Page.SelectDialog.Title");
///<summary>&quot;Select Frontend File&quot;</summary> 
public static string Website_FrontendFile_SelectDialog_Title=>T("Website.FrontendFile.SelectDialog.Title");
///<summary>&quot;Select Media&quot;</summary> 
public static string Website_Media_SelectDialog_Title=>T("Website.Media.SelectDialog.Title");
///<summary>&quot;Select Image&quot;</summary> 
public static string Website_Image_SelectDialog_Title=>T("Website.Image.SelectDialog.Title");
///<summary>&quot;Select Folder&quot;</summary> 
public static string Website_Folder_SelectDialog_Title=>T("Website.Folder.SelectDialog.Title");
///<summary>&quot;Draft&quot;</summary> 
public static string PublishingStatus_draft=>T("PublishingStatus.draft");
///<summary>&quot;Awaiting Approval&quot;</summary> 
public static string PublishingStatus_awaitingApproval=>T("PublishingStatus.awaitingApproval");
///<summary>&quot;Awaiting Publication&quot;</summary> 
public static string PublishingStatus_awaitingPublication=>T("PublishingStatus.awaitingPublication");
///<summary>&quot;Published&quot;</summary> 
public static string PublishingStatus_published=>T("PublishingStatus.published");
///<summary>&quot;General settings&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_LabelFieldGroup=>T("Website.Forms.Administrative.EditUserStep1.LabelFieldGroup");
///<summary>&quot;User name&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_UserNameLabel=>T("Website.Forms.Administrative.EditUserStep1.UserNameLabel");
///<summary>&quot;User names can not be changed. This is a &apos;read only&apos; field.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_UserNameHelp=>T("Website.Forms.Administrative.EditUserStep1.UserNameHelp");
///<summary>&quot;Password&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_PasswordLabel=>T("Website.Forms.Administrative.EditUserStep1.PasswordLabel");
///<summary>&quot;The password has to be more than 6 characters long.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_PasswordHelp=>T("Website.Forms.Administrative.EditUserStep1.PasswordHelp");
///<summary>&quot;Name&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_NameLabel=>T("Website.Forms.Administrative.EditUserStep1.NameLabel");
///<summary>&quot;The full name of the person using this account.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_NameHelp=>T("Website.Forms.Administrative.EditUserStep1.NameHelp");
///<summary>&quot;Email&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_EmailLabel=>T("Website.Forms.Administrative.EditUserStep1.EmailLabel");
///<summary>&quot;The e-mail address of the user (optional).&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_EmailHelp=>T("Website.Forms.Administrative.EditUserStep1.EmailHelp");
///<summary>&quot;Folder&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_GroupLabel=>T("Website.Forms.Administrative.EditUserStep1.GroupLabel");
///<summary>&quot;If you enter a folder name that does not already exist a new folder will be created.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_GroupHelp=>T("Website.Forms.Administrative.EditUserStep1.GroupHelp");
///<summary>&quot;C1 Console Localization&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_LabelLocalizationFieldGroup=>T("Website.Forms.Administrative.EditUserStep1.LabelLocalizationFieldGroup");
///<summary>&quot;Regional settings&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_CultureLabel=>T("Website.Forms.Administrative.EditUserStep1.CultureLabel");
///<summary>&quot;To change the way numbers, dates, and hours are displayed, select an entry from the list.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_CultureHelp=>T("Website.Forms.Administrative.EditUserStep1.CultureHelp");
///<summary>&quot;C1 Console Language&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_C1ConsoleLanguageLabel=>T("Website.Forms.Administrative.EditUserStep1.C1ConsoleLanguageLabel");
///<summary>&quot;Select the language to be used for labels, help texts, dialogs etc. The available options here are limited to languages installed. You may install more languages via the Package system, see Composite.Localization.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_C1ConsoleLanguageHelp=>T("Website.Forms.Administrative.EditUserStep1.C1ConsoleLanguageHelp");
///<summary>&quot;Perspectives&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_ActivePerspectiveFieldLabel=>T("Website.Forms.Administrative.EditUserStep1.ActivePerspectiveFieldLabel");
///<summary>&quot;Visible perspectives&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_ActivePerspectiveMultiSelectLabel=>T("Website.Forms.Administrative.EditUserStep1.ActivePerspectiveMultiSelectLabel");
///<summary>&quot;Select which perspectives should be visible when the user starts the C1 Console.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_ActivePerspectiveMultiSelectHelp=>T("Website.Forms.Administrative.EditUserStep1.ActivePerspectiveMultiSelectHelp");
///<summary>&quot;Global permissions&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_GlobalPermissionsFieldLabel=>T("Website.Forms.Administrative.EditUserStep1.GlobalPermissionsFieldLabel");
///<summary>&quot;Global permissions&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_GlobalPermissionsMultiSelectLabel=>T("Website.Forms.Administrative.EditUserStep1.GlobalPermissionsMultiSelectLabel");
///<summary>&quot;The Administrate permission grants the user access to manage user permissions and execute other administrative tasks. The Configure permission grants access to super user tasks.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_GlobalPermissionsMultiSelectHelp=>T("Website.Forms.Administrative.EditUserStep1.GlobalPermissionsMultiSelectHelp");
///<summary>&quot;The removal of your own administrative permission has been ignored. You still have administrative privileges.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_GlobalPermissions_IgnoredOwnAdministrativeRemoval=>T("Website.Forms.Administrative.EditUserStep1.GlobalPermissions.IgnoredOwnAdministrativeRemoval");
///<summary>&quot;Data language access&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_ActiveLocalesFieldLabel=>T("Website.Forms.Administrative.EditUserStep1.ActiveLocalesFieldLabel");
///<summary>&quot;Data Languages&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_ActiveLocalesMultiSelectLabel=>T("Website.Forms.Administrative.EditUserStep1.ActiveLocalesMultiSelectLabel");
///<summary>&quot;User has access to manage data in the selected languages.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_ActiveLocalesMultiSelectHelp=>T("Website.Forms.Administrative.EditUserStep1.ActiveLocalesMultiSelectHelp");
///<summary>&quot;Active content language&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_ActiveLocaleLabel=>T("Website.Forms.Administrative.EditUserStep1.ActiveLocaleLabel");
///<summary>&quot;The content language this user will edit.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_ActiveLocaleHelp=>T("Website.Forms.Administrative.EditUserStep1.ActiveLocaleHelp");
///<summary>&quot;The selected language is not checked in the data language section.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_ActiveLocaleNotChecked=>T("Website.Forms.Administrative.EditUserStep1.ActiveLocaleNotChecked");
///<summary>&quot;You must select at least one active language.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_NoActiveLocaleSelected=>T("Website.Forms.Administrative.EditUserStep1.NoActiveLocaleSelected");
///<summary>&quot;General&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_GenerelTabLabel=>T("Website.Forms.Administrative.EditUserStep1.GenerelTabLabel");
///<summary>&quot;Permissions&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_PermissionsTabLabel=>T("Website.Forms.Administrative.EditUserStep1.PermissionsTabLabel");
///<summary>&quot;Perspectives&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_PerspectivesTabLabel=>T("Website.Forms.Administrative.EditUserStep1.PerspectivesTabLabel");
///<summary>&quot;User Groups&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_UserGroupsFieldLabel=>T("Website.Forms.Administrative.EditUserStep1.UserGroupsFieldLabel");
///<summary>&quot;Select the user groups that the selected user should be a member of.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_UserGroupsMultiSelectHelp=>T("Website.Forms.Administrative.EditUserStep1.UserGroupsMultiSelectHelp");
///<summary>&quot;Is Locked&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_IsLockedLabel=>T("Website.Forms.Administrative.EditUserStep1.IsLockedLabel");
///<summary>&quot;User can not log in&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_IsLockedItemLabel=>T("Website.Forms.Administrative.EditUserStep1.IsLockedItemLabel");
///<summary>&quot;When checked the user will be forbidden from logging in.&quot;</summary> 
public static string Website_Forms_Administrative_EditUserStep1_IsLockedHelp=>T("Website.Forms.Administrative.EditUserStep1.IsLockedHelp");
///<summary>&quot;Error&quot;</summary> 
public static string EditUserWorkflow_EditErrorTitle=>T("EditUserWorkflow.EditErrorTitle");
///<summary>&quot;You can not delete your own access rights to &apos;System&apos; perspective.&quot;</summary> 
public static string EditUserWorkflow_EditOwnAccessToSystemPerspective=>T("EditUserWorkflow.EditOwnAccessToSystemPerspective");
///<summary>&quot;You can not lock your own account.&quot;</summary> 
public static string EditUserWorkflow_LockingOwnUserAccount=>T("EditUserWorkflow.LockingOwnUserAccount");
///<summary>&quot;Users&quot;</summary> 
public static string UserElementProvider_RootLabel=>T("UserElementProvider.RootLabel");
///<summary>&quot;Users&quot;</summary> 
public static string UserElementProvider_RootToolTip=>T("UserElementProvider.RootToolTip");
///<summary>&quot;Add User&quot;</summary> 
public static string UserElementProvider_AddUserLabel=>T("UserElementProvider.AddUserLabel");
///<summary>&quot;Add new user&quot;</summary> 
public static string UserElementProvider_AddUserToolTip=>T("UserElementProvider.AddUserToolTip");
///<summary>&quot;Edit User&quot;</summary> 
public static string UserElementProvider_EditUserLabel=>T("UserElementProvider.EditUserLabel");
///<summary>&quot;Edit selected user&quot;</summary> 
public static string UserElementProvider_EditUserToolTip=>T("UserElementProvider.EditUserToolTip");
///<summary>&quot;Delete User&quot;</summary> 
public static string UserElementProvider_DeleteUserLabel=>T("UserElementProvider.DeleteUserLabel");
///<summary>&quot;Delete the selected user&quot;</summary> 
public static string UserElementProvider_DeleteUserToolTip=>T("UserElementProvider.DeleteUserToolTip");
///<summary>&quot;Warning&quot;</summary> 
public static string UserElementProvider_ChangeOtherActiveLocaleTitle=>T("UserElementProvider.ChangeOtherActiveLocaleTitle");
///<summary>&quot;You have change the active language for a user that is currently logged on. The users console will be reloaded and data might be lost.&quot;</summary> 
public static string UserElementProvider_ChangeOtherActiveLocaleMessage=>T("UserElementProvider.ChangeOtherActiveLocaleMessage");
///<summary>&quot;Cleanup Required&quot;</summary> 
public static string UserElementProvider_ChangeOtherActiveLocaleDialogTitle=>T("UserElementProvider.ChangeOtherActiveLocaleDialogTitle");
///<summary>&quot;This requires a stage cleanup. Active editors will be saved and closed.&quot;</summary> 
public static string UserElementProvider_ChangeOtherActiveLocaleDialogText=>T("UserElementProvider.ChangeOtherActiveLocaleDialogText");
///<summary>&quot;A user with the same name already exists&quot;</summary> 
public static string AddNewUserWorkflow_UsernameDuplicateError=>T("AddNewUserWorkflow.UsernameDuplicateError");
///<summary>&quot;Add New User&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_LabelFieldGroup=>T("Website.Forms.Administrative.AddNewUserStep1.LabelFieldGroup");
///<summary>&quot;User name&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_UserNameLabel=>T("Website.Forms.Administrative.AddNewUserStep1.UserNameLabel");
///<summary>&quot;When you have created a new user the username cannot be changed.&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_UserNameHelp=>T("Website.Forms.Administrative.AddNewUserStep1.UserNameHelp");
///<summary>&quot;Password&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_PasswordLabel=>T("Website.Forms.Administrative.AddNewUserStep1.PasswordLabel");
///<summary>&quot;The password has to be more than 6 characters long.&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_PasswordHelp=>T("Website.Forms.Administrative.AddNewUserStep1.PasswordHelp");
///<summary>&quot;Name&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_NameLabel=>T("Website.Forms.Administrative.AddNewUserStep1.NameLabel");
///<summary>&quot;The full name of the person using this account.&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_NameHelp=>T("Website.Forms.Administrative.AddNewUserStep1.NameHelp");
///<summary>&quot;Email address&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_EmailLabel=>T("Website.Forms.Administrative.AddNewUserStep1.EmailLabel");
///<summary>&quot;The e-mail address of the user (optional).&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_EmailHelp=>T("Website.Forms.Administrative.AddNewUserStep1.EmailHelp");
///<summary>&quot;Folder&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_GroupLabel=>T("Website.Forms.Administrative.AddNewUserStep1.GroupLabel");
///<summary>&quot;If you enter a folder name that does not already exist a new folder will be created.&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_GroupHelp=>T("Website.Forms.Administrative.AddNewUserStep1.GroupHelp");
///<summary>&quot;Regional settings&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_CultureLabel=>T("Website.Forms.Administrative.AddNewUserStep1.CultureLabel");
///<summary>&quot;To change the way numbers, dates, and hours are displayed, select an entry from the list.&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_CultureHelp=>T("Website.Forms.Administrative.AddNewUserStep1.CultureHelp");
///<summary>&quot;C1 Console Language&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_C1ConsoleLanguageLabel=>T("Website.Forms.Administrative.AddNewUserStep1.C1ConsoleLanguageLabel");
///<summary>&quot;Select the language to be used for labels, help texts, dialogs etc. The available options here are limited to languages installed. You may install more languages via the Package system, see Composite.Localization.&quot;</summary> 
public static string Website_Forms_Administrative_AddNewUserStep1_C1ConsoleLanguageHelp=>T("Website.Forms.Administrative.AddNewUserStep1.C1ConsoleLanguageHelp");
///<summary>&quot;A language is required&quot;</summary> 
public static string UserElementProvider_MissingActiveLanguageTitle=>T("UserElementProvider.MissingActiveLanguageTitle");
///<summary>&quot;To create a user a language is required, but no languages have been added yet. You can add one under the System perspective.&quot;</summary> 
public static string UserElementProvider_MissingActiveLanguageMessage=>T("UserElementProvider.MissingActiveLanguageMessage");
///<summary>&quot;User with the same login already exist&quot;</summary> 
public static string UserElementProvider_UserLoginIsAlreadyUsed=>T("UserElementProvider.UserLoginIsAlreadyUsed");
///<summary>&quot;Add Datafolder&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderTypeLabel=>T("AssociatedDataElementProviderHelper.AddDataFolderTypeLabel");
///<summary>&quot;Add datafolder&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderTypeToolTip=>T("AssociatedDataElementProviderHelper.AddDataFolderTypeToolTip");
///<summary>&quot;Add Data&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddAssociatedDataLabel=>T("AssociatedDataElementProviderHelper.AddAssociatedDataLabel");
///<summary>&quot;Add data&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddAssociatedDataToolTip=>T("AssociatedDataElementProviderHelper.AddAssociatedDataToolTip");
///<summary>&quot;Edit Data&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditAssociatedDataLabel=>T("AssociatedDataElementProviderHelper.EditAssociatedDataLabel");
///<summary>&quot;Edit data&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditAssociatedDataToolTip=>T("AssociatedDataElementProviderHelper.EditAssociatedDataToolTip");
///<summary>&quot;Delete Data&quot;</summary> 
public static string AssociatedDataElementProviderHelper_DeleteAssociatedDataLabel=>T("AssociatedDataElementProviderHelper.DeleteAssociatedDataLabel");
///<summary>&quot;Delete data&quot;</summary> 
public static string AssociatedDataElementProviderHelper_DeleteAssociatedDataToolTip=>T("AssociatedDataElementProviderHelper.DeleteAssociatedDataToolTip");
///<summary>&quot;Localize&quot;</summary> 
public static string AssociatedDataElementProviderHelper_LocalizeData=>T("AssociatedDataElementProviderHelper.LocalizeData");
///<summary>&quot;Localize data&quot;</summary> 
public static string AssociatedDataElementProviderHelper_LocalizeDataToolTip=>T("AssociatedDataElementProviderHelper.LocalizeDataToolTip");
///<summary>&quot;Not yet approved or published&quot;</summary> 
public static string AssociatedDataElementProviderHelper_DisabledData=>T("AssociatedDataElementProviderHelper.DisabledData");
///<summary>&quot;Add Datafolder&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExSelectType_FieldLabel=>T("AssociatedDataElementProviderHelper.AddDataFolderExSelectType.FieldLabel");
///<summary>&quot;Datafolder type&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExSelectType_SelectorLabel=>T("AssociatedDataElementProviderHelper.AddDataFolderExSelectType.SelectorLabel");
///<summary>&quot;Create new datatype or use an existing datatype (if present).&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExSelectType_SelectorHelp=>T("AssociatedDataElementProviderHelper.AddDataFolderExSelectType.SelectorHelp");
///<summary>&quot;Settings&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelNewType=>T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelNewType");
///<summary>&quot;Type name&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelTypeName=>T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelTypeName");
///<summary>&quot;The technical name of the data type (ex. Product). This is used to identify this type in code and should not be changed once used externally.&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HelpTypeName=>T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HelpTypeName");
///<summary>&quot;Type namespace&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelTypeNamespace=>T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelTypeNamespace");
///<summary>&quot;The namespace (module / category name) of the type. This is used to identify this type in code and should not be changed.&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HelpTypeNamespace=>T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HelpTypeNamespace");
///<summary>&quot;Title&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelTypeTitle=>T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelTypeTitle");
///<summary>&quot;Use this entry to specify a user friendly name. You can change this field as you like.&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HelpTypeTitle=>T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HelpTypeTitle");
///<summary>&quot;Fields&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_LabelFields=>T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.LabelFields");
///<summary>&quot;Services&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_ServicesLabel=>T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.ServicesLabel");
///<summary>&quot;Has publishing&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HasPublishing=>T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HasPublishing");
///<summary>&quot;Has localization&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_HasLocalization=>T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.HasLocalization");
///<summary>&quot;No page datafolders exists&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExWorkflow_NoTypesTitle=>T("AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoTypesTitle");
///<summary>&quot;No page datafolders have been created yet. You can create a page datafolder in the &apos;Data&apos; perspective.&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExWorkflow_NoTypesMessage=>T("AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoTypesMessage");
///<summary>&quot;No Unused Page Datafolders Exist&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExWorkflow_NoUnusedTypesTitle=>T("AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoUnusedTypesTitle");
///<summary>&quot;All available page datafolders have been added already. To create a new page datafolder go to the &apos;Data&apos; perspective.&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExWorkflow_NoUnusedTypesMessage=>T("AssociatedDataElementProviderHelper.AddDataFolderExWorkflow.NoUnusedTypesMessage");
///<summary>&quot;Error&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderExCreateNewType_ErrorTitle=>T("AssociatedDataElementProviderHelper.AddDataFolderExCreateNewType.ErrorTitle");
///<summary>&quot;Select existing data folder type to add&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderSelectType_FieldLabel=>T("AssociatedDataElementProviderHelper.AddDataFolderSelectType.FieldLabel");
///<summary>&quot;Existing data folder types&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderSelectType_SelectorLabel=>T("AssociatedDataElementProviderHelper.AddDataFolderSelectType.SelectorLabel");
///<summary>&quot;Select existing data folder type to add&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddDataFolderSelectType_SelectorHelp=>T("AssociatedDataElementProviderHelper.AddDataFolderSelectType.SelectorHelp");
///<summary>&quot;Remove Metadata Field&quot;</summary> 
public static string AssociatedDataElementProviderHelper_RemoveMetaDataTypeLabel=>T("AssociatedDataElementProviderHelper.RemoveMetaDataTypeLabel");
///<summary>&quot;Remove metadata field&quot;</summary> 
public static string AssociatedDataElementProviderHelper_RemoveMetaDataTypeToolTip=>T("AssociatedDataElementProviderHelper.RemoveMetaDataTypeToolTip");
///<summary>&quot;Remove Datafolder from Page&quot;</summary> 
public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_LabelFieldGroup=>T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.LabelFieldGroup");
///<summary>&quot;Data cleanup&quot;</summary> 
public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_FieldGroupLabel=>T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.FieldGroupLabel");
///<summary>&quot;Delete data&quot;</summary> 
public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_DeleteFolderDataLabel=>T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.DeleteFolderDataLabel");
///<summary>&quot;Yes, delete folder data&quot;</summary> 
public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_DeleteFolderDataCheckBoxLabel=>T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.DeleteFolderDataCheckBoxLabel");
///<summary>&quot;If you want data in this folder to stay in the database, you should uncheck this option.&quot;</summary> 
public static string AssociatedDataElementProviderHelper_DeleteDataFolderWorkflow_DeleteFolderDataHelp=>T("AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow.DeleteFolderDataHelp");
///<summary>&quot;Add Metadata Field&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataSelectType_LayoutLabel=>T("AssociatedDataElementProviderHelper.AddMetaDataSelectType.LayoutLabel");
///<summary>&quot;Add Metadata Field&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataTypeLabel=>T("AssociatedDataElementProviderHelper.AddMetaDataTypeLabel");
///<summary>&quot;Add metadata field&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataTypeToolTip=>T("AssociatedDataElementProviderHelper.AddMetaDataTypeToolTip");
///<summary>&quot;Select existing metadata type to add&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataSelectType_FieldLabel=>T("AssociatedDataElementProviderHelper.AddMetaDataSelectType.FieldLabel");
///<summary>&quot;Existing metadata types&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataSelectType_SelectorLabel=>T("AssociatedDataElementProviderHelper.AddMetaDataSelectType.SelectorLabel");
///<summary>&quot;Select existing metadata type to add&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataSelectType_SelectorHelp=>T("AssociatedDataElementProviderHelper.AddMetaDataSelectType.SelectorHelp");
///<summary>&quot;No page metadata types exists&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_NoTypesTitle=>T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.NoTypesTitle");
///<summary>&quot;No page metatypes have been created yet. You can create a Page metatype in the &apos;Data&apos; perspective.&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_NoTypesMessage=>T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.NoTypesMessage");
///<summary>&quot;Metadata field group naming&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_NamingFieldLabel=>T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.NamingFieldLabel");
///<summary>&quot;Name&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_FieldGroupNameLabel=>T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.FieldGroupNameLabel");
///<summary>&quot;Enter a unique name identifying this metadata field group&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_FieldGroupNameHelp=>T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.FieldGroupNameHelp");
///<summary>&quot;Label&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_FieldGroupLabelLabel=>T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.FieldGroupLabelLabel");
///<summary>&quot;Enter a user friendly label for this metadata field group&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_FieldGroupLabelHelp=>T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.FieldGroupLabelHelp");
///<summary>&quot;Metadata field group visibility&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_VisabilityFieldLabel=>T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.VisabilityFieldLabel");
///<summary>&quot;Tab&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_ContainerSelectorLabel=>T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.ContainerSelectorLabel");
///<summary>&quot;Select the tab for which this metadata should exists&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_ContainerSelectorHelp=>T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.ContainerSelectorHelp");
///<summary>&quot;Start display from&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_StartDisplaySelectorLabel=>T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.StartDisplaySelectorLabel");
///<summary>&quot;Start display from&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_StartDisplaySelectorHelp=>T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.StartDisplaySelectorHelp");
///<summary>&quot;Inherit display&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_InheritDisplaySelectorLabel=>T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.InheritDisplaySelectorLabel");
///<summary>&quot;Inherit display&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataCreateFieldGroup_InheritDisplaySelectorHelp=>T("AssociatedDataElementProviderHelper.AddMetaDataCreateFieldGroup.InheritDisplaySelectorHelp");
///<summary>&quot;The metadata field group has no items in scope&quot;</summary> 
public static string AssociatedDataElementProviderHelper_NoItems_Title=>T("AssociatedDataElementProviderHelper.NoItems.Title");
///<summary>&quot;There are currently no items within the specified display range. Press Previous to change the display range or Finish to create the metadata field group.&quot;</summary> 
public static string AssociatedDataElementProviderHelper_NoItems_Description=>T("AssociatedDataElementProviderHelper.NoItems.Description");
///<summary>&quot;This item&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption0=>T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption0");
///<summary>&quot;Children&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption1=>T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption1");
///<summary>&quot;2nd generation descendants&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption2=>T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption2");
///<summary>&quot;3rd generation descendants&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption3=>T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption3");
///<summary>&quot;4th generation descendants&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption4=>T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption4");
///<summary>&quot;5th generation descendants&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_StartDisplayOption5=>T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption5");
///<summary>&quot;Do not inherit&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption0=>T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption0");
///<summary>&quot;Inherit 1 generation&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption1=>T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption1");
///<summary>&quot;Inherit 2 generations&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption2=>T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption2");
///<summary>&quot;Inherit 3 generations&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption3=>T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption3");
///<summary>&quot;Always inherit&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_InheritDisplayOption4=>T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption4");
///<summary>&quot;The field group name is in use&quot;</summary> 
public static string AssociatedDataElementProviderHelper_AddMetaDataWorkflow_FieldGroupNameNotValid=>T("AssociatedDataElementProviderHelper.AddMetaDataWorkflow.FieldGroupNameNotValid");
///<summary>&quot;Remove Metadata Field Group&quot;</summary> 
public static string AssociatedDataElementProviderHelper_DeleteMetaDataSelectType_LayoutLabel=>T("AssociatedDataElementProviderHelper.DeleteMetaDataSelectType.LayoutLabel");
///<summary>&quot;Select a metadata field group to remove&quot;</summary> 
public static string AssociatedDataElementProviderHelper_DeleteMetaDataSelectFieldGroupName_FieldLabel=>T("AssociatedDataElementProviderHelper.DeleteMetaDataSelectFieldGroupName.FieldLabel");
///<summary>&quot;Field group&quot;</summary> 
public static string AssociatedDataElementProviderHelper_DeleteMetaDataSelectFieldGroupName_SelectorLabel=>T("AssociatedDataElementProviderHelper.DeleteMetaDataSelectFieldGroupName.SelectorLabel");
///<summary>&quot;Select a metadata field group to remove&quot;</summary> 
public static string AssociatedDataElementProviderHelper_DeleteMetaDataSelectFieldGroupName_SelectorHelp=>T("AssociatedDataElementProviderHelper.DeleteMetaDataSelectFieldGroupName.SelectorHelp");
///<summary>&quot;Edit Metadata Field&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataTypeLabel=>T("AssociatedDataElementProviderHelper.EditMetaDataTypeLabel");
///<summary>&quot;Edit metadata field&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataTypeToolTip=>T("AssociatedDataElementProviderHelper.EditMetaDataTypeToolTip");
///<summary>&quot;Edit Page Metadata Field&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_Layout_Label=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.Layout.Label");
///<summary>&quot;Page metadata field settings&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_FieldGroup_Label=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.FieldGroup.Label");
///<summary>&quot;Label&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_LabelTextBox_Label=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.LabelTextBox.Label");
///<summary>&quot;The label of the metadata field. Used when editing pages&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_LabelTextBox_Help=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.LabelTextBox.Help");
///<summary>&quot;Tab&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataContainerSelector_Label=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataContainerSelector.Label");
///<summary>&quot;Select the tab for which this metadata should exists&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataContainerSelector_Help=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataContainerSelector.Help");
///<summary>&quot;Start display from&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_StartDisplaySelectorLabel=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.StartDisplaySelectorLabel");
///<summary>&quot;Start display from&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_StartDisplaySelectorHelp=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.StartDisplaySelectorHelp");
///<summary>&quot;Inherit display&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_InheritDisplaySelectorLabel=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.InheritDisplaySelectorLabel");
///<summary>&quot;Inherit display&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_InheritDisplaySelectorHelp=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.InheritDisplaySelectorHelp");
///<summary>&quot;Metadata field&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataDefinitionSelector_Label=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataDefinitionSelector.Label");
///<summary>&quot;Select the metadata field to edit&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataDefinitionSelector_Help=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataDefinitionSelector.Help");
///<summary>&quot;No Metadata Fields to Edit&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_NoMetaDataDefinitionsExists_Title=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.NoMetaDataDefinitionsExists.Title");
///<summary>&quot;There is no metadata fields defined on this item to edit&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_NoMetaDataDefinitionsExists_Message=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.NoMetaDataDefinitionsExists.Message");
///<summary>&quot;The metadata type is used another place with same name but different label&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataFieldNameAlreadyUsed=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataFieldNameAlreadyUsed");
///<summary>&quot;There exists one or more definitions with the same name, container change is not allowed&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_MetaDataContainerChangeNotAllowed=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataContainerChangeNotAllowed");
///<summary>&quot;Press finish to save&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_NoDefaultValuesNeeded_Title=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.NoDefaultValuesNeeded.Title");
///<summary>&quot;All required information has been gathered. Press Finish to update the metadata field&quot;</summary> 
public static string AssociatedDataElementProviderHelper_EditMetaDataWorkflow_NoDefaultValuesNeeded_Description=>T("AssociatedDataElementProviderHelper.EditMetaDataWorkflow.NoDefaultValuesNeeded.Description");
///<summary>&quot;No Metadata Fields to Remove&quot;</summary> 
public static string AssociatedDataElementProviderHelper_DeleteMetaDataWorkflow_NoDefinedTypesExists_Title=>T("AssociatedDataElementProviderHelper.DeleteMetaDataWorkflow.NoDefinedTypesExists.Title");
///<summary>&quot;There is no metadata fields defined on this item to remove&quot;</summary> 
public static string AssociatedDataElementProviderHelper_DeleteMetaDataWorkflow_NoDefinedTypesExists_Message=>T("AssociatedDataElementProviderHelper.DeleteMetaDataWorkflow.NoDefinedTypesExists.Message");
///<summary>&quot;Cascade delete error&quot;</summary> 
public static string DeleteAssociatedDataWorkflow_CascadeDeleteErrorTitle=>T("DeleteAssociatedDataWorkflow.CascadeDeleteErrorTitle");
///<summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
public static string DeleteAssociatedDataWorkflow_CascadeDeleteErrorMessage=>T("DeleteAssociatedDataWorkflow.CascadeDeleteErrorMessage");
///<summary>&quot;Settings&quot;</summary> 
public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelNewType=>T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelNewType");
///<summary>&quot;Type name&quot;</summary> 
public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelTypeName=>T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelTypeName");
///<summary>&quot;The name of the new type that you are creating (ex. product)&quot;</summary> 
public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HelpTypeName=>T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HelpTypeName");
///<summary>&quot;Type namespace&quot;</summary> 
public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelTypeNamespace=>T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelTypeNamespace");
///<summary>&quot;The name of the module, category or namespace that you are creating&quot;</summary> 
public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HelpTypeNamespace=>T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HelpTypeNamespace");
///<summary>&quot;Title&quot;</summary> 
public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelTypeTitle=>T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelTypeTitle");
///<summary>&quot;Use this entry to specify a user friendly name&quot;</summary> 
public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HelpTypeTitle=>T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HelpTypeTitle");
///<summary>&quot;Fields&quot;</summary> 
public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_LabelFields=>T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.LabelFields");
///<summary>&quot;Services&quot;</summary> 
public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_ServicesLabel=>T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.ServicesLabel");
///<summary>&quot;Has versioning&quot;</summary> 
public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HasVersioning=>T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HasVersioning");
///<summary>&quot;Has publishing&quot;</summary> 
public static string Website_Forms_Administrative_CreateNewAssociatedTypeStep1_HasPublishing=>T("Website.Forms.Administrative.CreateNewAssociatedTypeStep1.HasPublishing");
///<summary>&quot;Delete Data?&quot;</summary> 
public static string Website_Forms_Administrative_DeleteAssociatedTypeDataStep1_FieldGroupLabel=>T("Website.Forms.Administrative.DeleteAssociatedTypeDataStep1.FieldGroupLabel");
///<summary>&quot;Delete data?&quot;</summary> 
public static string Website_Forms_Administrative_DeleteAssociatedTypeDataStep1_Text=>T("Website.Forms.Administrative.DeleteAssociatedTypeDataStep1.Text");
///<summary>&quot;Add page data&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedDataWorkflow_FieldGroupLabel=>T("Website.Forms.Administrative.AddAssociatedDataWorkflow.FieldGroupLabel");
///<summary>&quot;Select a datatype to add&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedDataWorkflow_TypeSelectorLabel=>T("Website.Forms.Administrative.AddAssociatedDataWorkflow.TypeSelectorLabel");
///<summary>&quot;Select one of the existing types to add data to&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedDataWorkflow_TypeSelectorHelp=>T("Website.Forms.Administrative.AddAssociatedDataWorkflow.TypeSelectorHelp");
///<summary>&quot;Add page datatype&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeWorkflow_FieldGroupLabel=>T("Website.Forms.Administrative.AddAssociatedTypeWorkflow.FieldGroupLabel");
///<summary>&quot;Select type to add&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeAddExisting_TypeSelectorLabel=>T("Website.Forms.Administrative.AddAssociatedTypeAddExisting.TypeSelectorLabel");
///<summary>&quot;Select one of the existing types in the system&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeAddExisting_TypeSelectorHelp=>T("Website.Forms.Administrative.AddAssociatedTypeAddExisting.TypeSelectorHelp");
///<summary>&quot;Select a foreign key&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeAddExistingSelectForeignKey_KeySelectorLabel=>T("Website.Forms.Administrative.AddAssociatedTypeAddExistingSelectForeignKey.KeySelectorLabel");
///<summary>&quot;Select one of the fields from the type to use as foreign key&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeAddExistingSelectForeignKey_KeySelectorHelp=>T("Website.Forms.Administrative.AddAssociatedTypeAddExistingSelectForeignKey.KeySelectorHelp");
///<summary>&quot;Add a&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeAddingTypeSelection_KeySelectorLabel=>T("Website.Forms.Administrative.AddAssociatedTypeAddingTypeSelection.KeySelectorLabel");
///<summary>&quot;Creating a new type or using an existing type&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeAddingTypeSelection_KeySelectorHelp=>T("Website.Forms.Administrative.AddAssociatedTypeAddingTypeSelection.KeySelectorHelp");
///<summary>&quot;Select type:&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeAssociationTypeSelection_KeySelectorLabel=>T("Website.Forms.Administrative.AddAssociatedTypeAssociationTypeSelection.KeySelectorLabel");
///<summary>&quot;Regular data is a new type that are created under a page. Metadata is a new field that are created on a page&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeAssociationTypeSelection_KeySelectorHelp=>T("Website.Forms.Administrative.AddAssociatedTypeAssociationTypeSelection.KeySelectorHelp");
///<summary>&quot;Rule name&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeRuleNameLabel=>T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeRuleNameLabel");
///<summary>&quot;Rule name are saved with the metadata and are a part of the metadata key. The name must be unique.&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeRuleNameHelp=>T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeRuleNameHelp");
///<summary>&quot;Rule label&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeRuleLabelLabel=>T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeRuleLabelLabel");
///<summary>&quot;Rule label is used as a user friendly name for the instance. Can be localized&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeRuleHelpHelp=>T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeRuleHelpHelp");
///<summary>&quot;Select composition container&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ContainerKeySelectorLabel=>T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ContainerKeySelectorLabel");
///<summary>&quot;Select container for the new rule.&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ContainerKeySelectorHelp=>T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ContainerKeySelectorHelp");
///<summary>&quot;Select composition scope&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeKeySelectorLabel=>T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeKeySelectorLabel");
///<summary>&quot;Select the scope for the new composition&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeCompositionScopeSelection_ScopeKeySelectorHelp=>T("Website.Forms.Administrative.AddAssociatedTypeCompositionScopeSelection.ScopeKeySelectorHelp");
///<summary>&quot;Levels&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeLevelsScopeSelection_LevelsLabel=>T("Website.Forms.Administrative.AddAssociatedTypeLevelsScopeSelection.LevelsLabel");
///<summary>&quot;The depth of sub pages in which the composition will be visible&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeLevelsScopeSelection_LevelsHelp=>T("Website.Forms.Administrative.AddAssociatedTypeLevelsScopeSelection.LevelsHelp");
///<summary>&quot;Confirm new datatype:&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_AssociationTypeLabel=>T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.AssociationTypeLabel");
///<summary>&quot;Metadata is a new field that are created on a page&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_AssociationTypeHelp=>T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.AssociationTypeHelp");
///<summary>&quot;Composition scope rule name&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeRuleNameLabel=>T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeRuleNameLabel");
///<summary>&quot;Rule name are saved with the metadata and are a part of the metadata key. The name must be unique.&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeRuleNameHelp=>T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeRuleNameHelp");
///<summary>&quot;Composition scope rule label&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeRuleLabelLabel=>T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeRuleLabelLabel");
///<summary>&quot;Rule label is used as a user friendly name for the instance. Can be localized&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeRuleHelpHelp=>T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeRuleHelpHelp");
///<summary>&quot;Composition scope&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeLabel=>T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeLabel");
///<summary>&quot;This is the scope in which the new composition will be visible when editing pages&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_CompositionScopeHelp=>T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.CompositionScopeHelp");
///<summary>&quot;Adding type&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_AddingTypeLabel=>T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.AddingTypeLabel");
///<summary>&quot;Create a new type or use an existing type&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_AddingTypeHelp=>T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.AddingTypeHelp");
///<summary>&quot;Existing type name&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_ExistingTypeNameLabel=>T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.ExistingTypeNameLabel");
///<summary>&quot;The name of the selected existing type in the system to use&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_ExistingTypeNameHelp=>T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.ExistingTypeNameHelp");
///<summary>&quot;Foreign key field name&quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_ForeignKeyFieldNameLabel=>T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.ForeignKeyFieldNameLabel");
///<summary>&quot;The name of the field of the existing type to use as a foreign key &quot;</summary> 
public static string Website_Forms_Administrative_AddAssociatedTypeFinalInfo_ForeignKeyFieldNameHelp=>T("Website.Forms.Administrative.AddAssociatedTypeFinalInfo.ForeignKeyFieldNameHelp");
///<summary>&quot;Remove Datafolder&quot;</summary> 
public static string AssociatedDataElementProviderHelper_RemoveAssociatedTypeLabel=>T("AssociatedDataElementProviderHelper.RemoveAssociatedTypeLabel");
///<summary>&quot;Remove datafolder&quot;</summary> 
public static string AssociatedDataElementProviderHelper_RemoveAssociatedTypeToolTip=>T("AssociatedDataElementProviderHelper.RemoveAssociatedTypeToolTip");
///<summary>&quot;Remove page datatype&quot;</summary> 
public static string Website_Forms_Administrative_RemoveAssociatedType_FieldGroupLabel=>T("Website.Forms.Administrative.RemoveAssociatedType.FieldGroupLabel");
///<summary>&quot;Remove page datatype&quot;</summary> 
public static string Website_Forms_Administrative_RemoveAssociatedTypeFinalInfo_AssociationTypeLabel=>T("Website.Forms.Administrative.RemoveAssociatedTypeFinalInfo.AssociationTypeLabel");
///<summary>&quot;Composition scope rule name&quot;</summary> 
public static string Website_Forms_Administrative_RemoveAssociatedTypeFinalInfo_CompositionScopeRuleNameLabel=>T("Website.Forms.Administrative.RemoveAssociatedTypeFinalInfo.CompositionScopeRuleNameLabel");
///<summary>&quot;Select a rule&quot;</summary> 
public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectRuleName_KeySelectorLabel=>T("Website.Forms.Administrative.RemoveAssociatedTypeSelectRuleName.KeySelectorLabel");
///<summary>&quot;The name of the rule to remove&quot;</summary> 
public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectRuleName_KeySelectorHelp=>T("Website.Forms.Administrative.RemoveAssociatedTypeSelectRuleName.KeySelectorHelp");
///<summary>&quot;Select page datatype&quot;</summary> 
public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectAssociationType_KeySelectorLabel=>T("Website.Forms.Administrative.RemoveAssociatedTypeSelectAssociationType.KeySelectorLabel");
///<summary>&quot;&quot;</summary> 
public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectAssociationType_KeySelectorHelp=>T("Website.Forms.Administrative.RemoveAssociatedTypeSelectAssociationType.KeySelectorHelp");
///<summary>&quot;Select datatype&quot;</summary> 
public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectType_TypeSelectorLabel=>T("Website.Forms.Administrative.RemoveAssociatedTypeSelectType.TypeSelectorLabel");
///<summary>&quot;Select one of the existing types&quot;</summary> 
public static string Website_Forms_Administrative_RemoveAssociatedTypeSelectType_TypeSelectorHelp=>T("Website.Forms.Administrative.RemoveAssociatedTypeSelectType.TypeSelectorHelp");
///<summary>&quot;Virtual root&quot;</summary> 
public static string VirtualElementProviderElementProvider_ID01=>T("VirtualElementProviderElementProvider.ID01");
///<summary>&quot;Users and Permissions&quot;</summary> 
public static string VirtualElementProviderElementProvider_PermissionsPerspective=>T("VirtualElementProviderElementProvider.PermissionsPerspective");
///<summary>&quot;Users&quot;</summary> 
public static string VirtualElementProviderElementProvider_UserPerspective=>T("VirtualElementProviderElementProvider.UserPerspective");
///<summary>&quot;Developer Apps&quot;</summary> 
public static string VirtualElementProviderElementProvider_DeveloperApplicationPerspective=>T("VirtualElementProviderElementProvider.DeveloperApplicationPerspective");
///<summary>&quot;User Groups&quot;</summary> 
public static string VirtualElementProviderElementProvider_UserGroupPerspective=>T("VirtualElementProviderElementProvider.UserGroupPerspective");
///<summary>&quot;System&quot;</summary> 
public static string VirtualElementProviderElementProvider_SystemPerspective=>T("VirtualElementProviderElementProvider.SystemPerspective");
///<summary>&quot;Content&quot;</summary> 
public static string VirtualElementProviderElementProvider_ContentPerspective=>T("VirtualElementProviderElementProvider.ContentPerspective");
///<summary>&quot;Data&quot;</summary> 
public static string VirtualElementProviderElementProvider_DatasPerspective=>T("VirtualElementProviderElementProvider.DatasPerspective");
///<summary>&quot;Layout&quot;</summary> 
public static string VirtualElementProviderElementProvider_DesignPerspective=>T("VirtualElementProviderElementProvider.DesignPerspective");
///<summary>&quot;Functions&quot;</summary> 
public static string VirtualElementProviderElementProvider_FunctionsPerspective=>T("VirtualElementProviderElementProvider.FunctionsPerspective");
///<summary>&quot;All Media Files&quot;</summary> 
public static string VirtualElementProviderElementProvider_MediaFilePerspective=>T("VirtualElementProviderElementProvider.MediaFilePerspective");
///<summary>&quot;Media&quot;</summary> 
public static string VirtualElementProviderElementProvider_MediaPerspective=>T("VirtualElementProviderElementProvider.MediaPerspective");
///<summary>&quot;All Functions&quot;</summary> 
public static string VirtualElementProviderElementProvider_ReadOnlyFunctionPerspective=>T("VirtualElementProviderElementProvider.ReadOnlyFunctionPerspective");
///<summary>&quot;All Widget Functions&quot;</summary> 
public static string VirtualElementProviderElementProvider_ReadOnlyWidgetFunctionPerspective=>T("VirtualElementProviderElementProvider.ReadOnlyWidgetFunctionPerspective");
///<summary>&quot;SQL Functions&quot;</summary> 
public static string VirtualElementProviderElementProvider_SqlFunctionPerspective=>T("VirtualElementProviderElementProvider.SqlFunctionPerspective");
///<summary>&quot;Xslt Based Functions&quot;</summary> 
public static string VirtualElementProviderElementProvider_XsltBasedFunctionPerspective=>T("VirtualElementProviderElementProvider.XsltBasedFunctionPerspective");
///<summary>&quot;Broadcast Message&quot;</summary> 
public static string VirtualElementProviderElementProvider_RootActions_SendMessageLabel=>T("VirtualElementProviderElementProvider.RootActions.SendMessageLabel");
///<summary>&quot;Send a message to all running consoles&quot;</summary> 
public static string VirtualElementProviderElementProvider_RootActions_SendMessageTooltip=>T("VirtualElementProviderElementProvider.RootActions.SendMessageTooltip");
///<summary>&quot;Time Zone Settings&quot;</summary> 
public static string VirtualElementProviderElementProvider_RootActions_SetTimezoneLabel=>T("VirtualElementProviderElementProvider.RootActions.SetTimezoneLabel");
///<summary>&quot;Time zone to be displayed for all users within the console&quot;</summary> 
public static string VirtualElementProviderElementProvider_RootActions_SetTimezoneTooltip=>T("VirtualElementProviderElementProvider.RootActions.SetTimezoneTooltip");
///<summary>&quot;Global Settings&quot;</summary> 
public static string VirtualElementProviderElementProvider_RootActions_GlobalSetting=>T("VirtualElementProviderElementProvider.RootActions.GlobalSetting");
///<summary>&quot;Restart server&quot;</summary> 
public static string VirtualElementProviderElementProvider_RootActions_RestartApplicationLabel=>T("VirtualElementProviderElementProvider.RootActions.RestartApplicationLabel");
///<summary>&quot;Restart the server&quot;</summary> 
public static string VirtualElementProviderElementProvider_RootActions_RestartApplicationTooltip=>T("VirtualElementProviderElementProvider.RootActions.RestartApplicationTooltip");
///<summary>&quot;Broadcast Message to All {applicationname} Consoles&quot;</summary> 
public static string SendMessageToConsolesWorkflow_Layout_Label=>T("SendMessageToConsolesWorkflow.Layout.Label");
///<summary>&quot;Title&quot;</summary> 
public static string SendMessageToConsolesWorkflow_TitleTextBox_Label=>T("SendMessageToConsolesWorkflow.TitleTextBox.Label");
///<summary>&quot;Dialog title of broadcast message&quot;</summary> 
public static string SendMessageToConsolesWorkflow_TitleTextBox_Help=>T("SendMessageToConsolesWorkflow.TitleTextBox.Help");
///<summary>&quot;Message&quot;</summary> 
public static string SendMessageToConsolesWorkflow_MessageTextArea_Label=>T("SendMessageToConsolesWorkflow.MessageTextArea.Label");
///<summary>&quot;The message to broadcast&quot;</summary> 
public static string SendMessageToConsolesWorkflow_MessageTextArea_Help=>T("SendMessageToConsolesWorkflow.MessageTextArea.Help");
///<summary>&quot;Time Zone Updated&quot;</summary> 
public static string SendMessageToConsolesWorkflow_SuccessMessage_TimezoneChangedTitle=>T("SendMessageToConsolesWorkflow.SuccessMessage.TimezoneChangedTitle");
///<summary>&quot;Time zone has been successfully updated&quot;</summary> 
public static string SendMessageToConsolesWorkflow_SuccessMessage_TimezoneChangedMessage=>T("SendMessageToConsolesWorkflow.SuccessMessage.TimezoneChangedMessage");
///<summary>&quot;Set Time Zone Display&quot;</summary> 
public static string SetTimezoneWorkflow_Layout_Label=>T("SetTimezoneWorkflow.Layout.Label");
///<summary>&quot;Select Time Zone&quot;</summary> 
public static string SetTimezoneWorkflow_TitleTextBox_Label=>T("SetTimezoneWorkflow.TitleTextBox.Label");
///<summary>&quot;Time zone to be displayed for all users within the console. The console will restart once time zone updated. Any unsaved changes will be lost.&quot;</summary> 
public static string SetTimezoneWorkflow_TitleTextBox_Help=>T("SetTimezoneWorkflow.TitleTextBox.Help");
///<summary>&quot;Time zone update requires a console restart. Any unsaved changes will be lost.&quot;</summary> 
public static string SetTimezoneWorkflow_WarningText_Text=>T("SetTimezoneWorkflow.WarningText.Text");
///<summary>&quot;Login&quot;</summary> 
public static string LoginWebRequestHandler_Login=>T("LoginWebRequestHandler.Login");
///<summary>&quot;Login to {0}&quot;</summary> 
public static string LoginWebRequestHandler_Header(object parameter0)=>string.Format(T("LoginWebRequestHandler.Header"), parameter0);
///<summary>&quot;Incorrect user name or password&quot;</summary> 
public static string LoginWebRequestHandler_LoginFailed=>T("LoginWebRequestHandler.LoginFailed");
///<summary>&quot;Password&quot;</summary> 
public static string LoginWebRequestHandler_Password=>T("LoginWebRequestHandler.Password");
///<summary>&quot;Username&quot;</summary> 
public static string LoginWebRequestHandler_Username=>T("LoginWebRequestHandler.Username");
///<summary>&quot;Log in as another user.&quot;</summary> 
public static string LoginWebRequestHandler_LogInAsOtherUser=>T("LoginWebRequestHandler.LogInAsOtherUser");
///<summary>&quot;Wrong username or password.&quot;</summary> 
public static string LoginWebRequestHandler_WrongUserNameOrPassword=>T("LoginWebRequestHandler.WrongUserNameOrPassword");
///<summary>&quot;The supplied Windows login, {0}\{1} is not registered in the user database. You must use a different login.&quot;</summary> 
public static string LoginWebRequestHandler_UserNameNotRegistered(object parameter0,object parameter1)=>string.Format(T("LoginWebRequestHandler.UserNameNotRegistered"), parameter0,parameter1);
///<summary>&quot;The type {0} is not an interface.&quot;</summary> 
public static string DataInterfaceValidator_TypeNotAnInterface(object parameter0)=>string.Format(T("DataInterfaceValidator.TypeNotAnInterface"), parameter0);
///<summary>&quot;The interface type {0} does not implement the interface {1}.&quot;</summary> 
public static string DataInterfaceValidator_TypeDoesNotImplementInterface(object parameter0,object parameter1)=>string.Format(T("DataInterfaceValidator.TypeDoesNotImplementInterface"), parameter0,parameter1);
///<summary>&quot;The property {0} on the interface type {1} is not a accepted type.&quot;</summary> 
public static string DataInterfaceValidator_NotAcceptedType(object parameter0,object parameter1)=>string.Format(T("DataInterfaceValidator.NotAcceptedType"), parameter0,parameter1);
///<summary>&quot;The interface {0} is not a valid IData interface.&quot;</summary> 
public static string DataInterfaceValidator_NotValidIDataInterface(object parameter0)=>string.Format(T("DataInterfaceValidator.NotValidIDataInterface"), parameter0);
///<summary>&quot;Cascade delete error&quot;</summary> 
public static string DeleteMediaFileWorkflow_CascadeDeleteErrorTitle=>T("DeleteMediaFileWorkflow.CascadeDeleteErrorTitle");
///<summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
public static string DeleteMediaFileWorkflow_CascadeDeleteErrorMessage=>T("DeleteMediaFileWorkflow.CascadeDeleteErrorMessage");
///<summary>&quot;Cascade delete error&quot;</summary> 
public static string DeleteMediaFolderWorkflow_CascadeDeleteErrorTitle=>T("DeleteMediaFolderWorkflow.CascadeDeleteErrorTitle");
///<summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
public static string DeleteMediaFolderWorkflow_CascadeDeleteErrorMessage=>T("DeleteMediaFolderWorkflow.CascadeDeleteErrorMessage");
///<summary>&quot;Add folders and files to the media archive&quot;</summary> 
public static string MediaFileProviderElementProvider_RootToolTip=>T("MediaFileProviderElementProvider.RootToolTip");
///<summary>&quot;Add Folder&quot;</summary> 
public static string MediaFileProviderElementProvider_AddMediaFolder=>T("MediaFileProviderElementProvider.AddMediaFolder");
///<summary>&quot;Add new media folder&quot;</summary> 
public static string MediaFileProviderElementProvider_AddMediaFolderToolTip=>T("MediaFileProviderElementProvider.AddMediaFolderToolTip");
///<summary>&quot;Upload File&quot;</summary> 
public static string MediaFileProviderElementProvider_AddMediaFile=>T("MediaFileProviderElementProvider.AddMediaFile");
///<summary>&quot;Add new media file&quot;</summary> 
public static string MediaFileProviderElementProvider_AddMediaFileToolTip=>T("MediaFileProviderElementProvider.AddMediaFileToolTip");
///<summary>&quot;Delete File&quot;</summary> 
public static string MediaFileProviderElementProvider_DeleteMediaFile=>T("MediaFileProviderElementProvider.DeleteMediaFile");
///<summary>&quot;Delete the selected media file&quot;</summary> 
public static string MediaFileProviderElementProvider_DeleteMediaFileToolTip=>T("MediaFileProviderElementProvider.DeleteMediaFileToolTip");
///<summary>&quot;Delete Folder&quot;</summary> 
public static string MediaFileProviderElementProvider_DeleteMediaFolder=>T("MediaFileProviderElementProvider.DeleteMediaFolder");
///<summary>&quot;Delete the media folder and all items under it.&quot;</summary> 
public static string MediaFileProviderElementProvider_DeleteMediaFolderToolTip=>T("MediaFileProviderElementProvider.DeleteMediaFolderToolTip");
///<summary>&quot;Download&quot;</summary> 
public static string MediaFileProviderElementProvider_Download=>T("MediaFileProviderElementProvider.Download");
///<summary>&quot;Download file&quot;</summary> 
public static string MediaFileProviderElementProvider_DownloadToolTip=>T("MediaFileProviderElementProvider.DownloadToolTip");
///<summary>&quot;File Properties&quot;</summary> 
public static string MediaFileProviderElementProvider_EditMediaFile=>T("MediaFileProviderElementProvider.EditMediaFile");
///<summary>&quot;Rename the selected media file&quot;</summary> 
public static string MediaFileProviderElementProvider_EditMediaFileToolTip=>T("MediaFileProviderElementProvider.EditMediaFileToolTip");
///<summary>&quot;Edit text&quot;</summary> 
public static string MediaFileProviderElementProvider_EditMediaFileTextContent=>T("MediaFileProviderElementProvider.EditMediaFileTextContent");
///<summary>&quot;Edit text content&quot;</summary> 
public static string MediaFileProviderElementProvider_EditMediaFileTextContentToolTip=>T("MediaFileProviderElementProvider.EditMediaFileTextContentToolTip");
///<summary>&quot;Image Editor&quot;</summary> 
public static string MediaFileProviderElementProvider_EditImage=>T("MediaFileProviderElementProvider.EditImage");
///<summary>&quot;Open the selected media file in the image editor&quot;</summary> 
public static string MediaFileProviderElementProvider_EditImageToolTip=>T("MediaFileProviderElementProvider.EditImageToolTip");
///<summary>&quot;Folder Properties&quot;</summary> 
public static string MediaFileProviderElementProvider_EditMediaFolder=>T("MediaFileProviderElementProvider.EditMediaFolder");
///<summary>&quot;Edit media folder properties&quot;</summary> 
public static string MediaFileProviderElementProvider_EditMediaFolderToolTip=>T("MediaFileProviderElementProvider.EditMediaFolderToolTip");
///<summary>&quot;Replace File&quot;</summary> 
public static string MediaFileProviderElementProvider_ChangeMediaFile=>T("MediaFileProviderElementProvider.ChangeMediaFile");
///<summary>&quot;Replace the selected with another media file&quot;</summary> 
public static string MediaFileProviderElementProvider_ChangeMediaFileToolTip=>T("MediaFileProviderElementProvider.ChangeMediaFileToolTip");
///<summary>&quot;Upload Multiple&quot;</summary> 
public static string MediaFileProviderElementProvider_UploadZipFile=>T("MediaFileProviderElementProvider.UploadZipFile");
///<summary>&quot;Upload Zip file&quot;</summary> 
public static string MediaFileProviderElementProvider_UploadZipFileToolTip=>T("MediaFileProviderElementProvider.UploadZipFileToolTip");
///<summary>&quot;Media Item&quot;</summary> 
public static string MediaFileProviderElementProvider_MediaFileItemToolTip=>T("MediaFileProviderElementProvider.MediaFileItemToolTip");
///<summary>&quot;Organize folders and files&quot;</summary> 
public static string MediaFileProviderElementProvider_OrganizedFilesAndFoldersToolTip=>T("MediaFileProviderElementProvider.OrganizedFilesAndFoldersToolTip");
///<summary>&quot;Error&quot;</summary> 
public static string MediaFileProviderElementProvider_ErrorMessageTitle=>T("MediaFileProviderElementProvider.ErrorMessageTitle");
///<summary>&quot;File &apos;{0}&apos; already exists in folder &apos;{1}&apos;&quot;</summary> 
public static string MediaFileProviderElementProvider_FileAlreadyExistsMessage(object parameter0,object parameter1)=>string.Format(T("MediaFileProviderElementProvider.FileAlreadyExistsMessage"), parameter0,parameter1);
///<summary>&quot;Failure&quot;</summary> 
public static string UploadNewMediaFileWorkflow_UploadFailure=>T("UploadNewMediaFileWorkflow.UploadFailure");
///<summary>&quot;The uploaded file must be of the same type as the original. The file you uploaded is of a different type.&quot;</summary> 
public static string UploadNewMediaFileWorkflow_UploadFailureMessage=>T("UploadNewMediaFileWorkflow.UploadFailureMessage");
///<summary>&quot;Show Graph&quot;</summary> 
public static string RelationshipGraphActionExecutor_ShowGraph=>T("RelationshipGraphActionExecutor.ShowGraph");
///<summary>&quot;Show relationship graph&quot;</summary> 
public static string RelationshipGraphActionExecutor_ShowGraphToolTip=>T("RelationshipGraphActionExecutor.ShowGraphToolTip");
///<summary>&quot;Show Oriented Graph&quot;</summary> 
public static string RelationshipGraphActionExecutor_ShowOrientedGraph=>T("RelationshipGraphActionExecutor.ShowOrientedGraph");
///<summary>&quot;Show Oriented Relationship graph&quot;</summary> 
public static string RelationshipGraphActionExecutor_ShowOrientedGraphToolTip=>T("RelationshipGraphActionExecutor.ShowOrientedGraphToolTip");
///<summary>&quot;Show Element Information&quot;</summary> 
public static string ShowElementInformationActionExecutor_ShowElementInformation_Label=>T("ShowElementInformationActionExecutor.ShowElementInformation.Label");
///<summary>&quot;Show Element Information&quot;</summary> 
public static string ShowElementInformationActionExecutor_ShowElementInformation_ToolTip=>T("ShowElementInformationActionExecutor.ShowElementInformation.ToolTip");
///<summary>&quot;Search elements&quot;</summary> 
public static string RelationshipGraphActionExecutor_Search=>T("RelationshipGraphActionExecutor.Search");
///<summary>&quot;Search for elements&quot;</summary> 
public static string RelationshipGraphActionExecutor_SearchToolTip=>T("RelationshipGraphActionExecutor.SearchToolTip");
///<summary>&quot;Search elements&quot;</summary> 
public static string RelationshipGraphActionExecutor_SearchElements=>T("RelationshipGraphActionExecutor.SearchElements");
///<summary>&quot;Search for elements&quot;</summary> 
public static string RelationshipGraphActionExecutor_SearchElementsToolTip=>T("RelationshipGraphActionExecutor.SearchElementsToolTip");
///<summary>&quot;Version No.&quot;</summary> 
public static string Website_General_LabelVersionNumber=>T("Website.General.LabelVersionNumber");
///<summary>&quot;Restart?&quot;</summary> 
public static string Website_Application_DialogReload_Title=>T("Website.Application.DialogReload.Title");
///<summary>&quot;Restart {applicationname}? All unsaved changes will be lost.&quot;</summary> 
public static string Website_Application_DialogReload_Text=>T("Website.Application.DialogReload.Text");
///<summary>&quot;Save Resource?&quot;</summary> 
public static string WebSite_Application_DialogSaveResource_Title=>T("WebSite.Application.DialogSaveResource.Title");
///<summary>&quot;&quot;${resourcename}&quot; has been modified. Save changes?&quot;</summary> 
public static string WebSite_Application_DialogSaveResource_Text=>T("WebSite.Application.DialogSaveResource.Text");
///<summary>&quot;Save Resources?&quot;</summary> 
public static string Website_Dialogs_SaveAll_LabelSaveResources=>T("Website.Dialogs.SaveAll.LabelSaveResources");
///<summary>&quot;Unsaved resources&quot;</summary> 
public static string Website_Dialogs_SaveAll_LabelUnsavedResources=>T("Website.Dialogs.SaveAll.LabelUnsavedResources");
///<summary>&quot;Yes&quot;</summary> 
public static string Website_Dialogs_LabelYes=>T("Website.Dialogs.LabelYes");
///<summary>&quot;No&quot;</summary> 
public static string Website_Dialogs_LabelNo=>T("Website.Dialogs.LabelNo");
///<summary>&quot;OK&quot;</summary> 
public static string Website_Dialogs_LabelAccept=>T("Website.Dialogs.LabelAccept");
///<summary>&quot;Cancel&quot;</summary> 
public static string Website_Dialogs_LabelCancel=>T("Website.Dialogs.LabelCancel");
///<summary>&quot;More Info&quot;</summary> 
public static string Website_Dialogs_LabelDisclosure=>T("Website.Dialogs.LabelDisclosure");
///<summary>&quot;About {applicationname}&quot;</summary> 
public static string Website_Dialogs_About_Title=>T("Website.Dialogs.About.Title");
///<summary>&quot;Credits&quot;</summary> 
public static string Website_Dialogs_About_LabelCredits=>T("Website.Dialogs.About.LabelCredits");
///<summary>&quot;Back&quot;</summary> 
public static string Website_Dialogs_About_LabelBack=>T("Website.Dialogs.About.LabelBack");
///<summary>&quot;Credits&quot;</summary> 
public static string Website_Dialogs_About_LabelCredits2=>T("Website.Dialogs.About.LabelCredits2");
///<summary>&quot;No access&quot;</summary> 
public static string Website_Dialogs_NoAccessTitle=>T("Website.Dialogs.NoAccessTitle");
///<summary>&quot;You have not been granted access rights to the system. Please contact your administrator.&quot;</summary> 
public static string Website_Dialogs_NoAccessText=>T("Website.Dialogs.NoAccessText");
///<summary>&quot;Unit&quot;</summary> 
public static string Website_Dialogs_ImageEditor_ScaleImage_Unit=>T("Website.Dialogs.ImageEditor.ScaleImage.Unit");
///<summary>&quot;Width&quot;</summary> 
public static string Website_Dialogs_ImageEditor_ScaleImage_Width=>T("Website.Dialogs.ImageEditor.ScaleImage.Width");
///<summary>&quot;Height&quot;</summary> 
public static string Website_Dialogs_ImageEditor_ScaleImage_Height=>T("Website.Dialogs.ImageEditor.ScaleImage.Height");
///<summary>&quot;Scale Image&quot;</summary> 
public static string Website_Dialogs_ImageEditor_ScaleImage_LabelScaleImage=>T("Website.Dialogs.ImageEditor.ScaleImage.LabelScaleImage");
///<summary>&quot;Dimensions&quot;</summary> 
public static string Website_Dialogs_ImageEditor_ScaleImage_LabelDimensions=>T("Website.Dialogs.ImageEditor.ScaleImage.LabelDimensions");
///<summary>&quot;Image Size&quot;</summary> 
public static string Website_Dialogs_ImageEditor_ScaleImage_LabelImageSize=>T("Website.Dialogs.ImageEditor.ScaleImage.LabelImageSize");
///<summary>&quot;Fixed Ratio&quot;</summary> 
public static string Website_Dialogs_ImageEditor_ScaleImage_LabelFixedRatio=>T("Website.Dialogs.ImageEditor.ScaleImage.LabelFixedRatio");
///<summary>&quot;Free Resize&quot;</summary> 
public static string Website_Dialogs_ImageEditor_ScaleImage_LabelFreeResize=>T("Website.Dialogs.ImageEditor.ScaleImage.LabelFreeResize");
///<summary>&quot;Pixels&quot;</summary> 
public static string Website_Dialogs_ImageEditor_ScaleImage_LabelPixels=>T("Website.Dialogs.ImageEditor.ScaleImage.LabelPixels");
///<summary>&quot;Percent&quot;</summary> 
public static string Website_Dialogs_ImageEditor_ScaleImage_LabelPercent=>T("Website.Dialogs.ImageEditor.ScaleImage.LabelPercent");
///<summary>&quot;Login screen&quot;</summary> 
public static string Website_Dialogs_Options_LoginScreen=>T("Website.Dialogs.Options.LoginScreen");
///<summary>&quot;Options&quot;</summary> 
public static string Website_Dialogs_Options_LabelOptions=>T("Website.Dialogs.Options.LabelOptions");
///<summary>&quot;General&quot;</summary> 
public static string Website_Dialogs_Options_LabelGeneral=>T("Website.Dialogs.Options.LabelGeneral");
///<summary>&quot;Advanced&quot;</summary> 
public static string Website_Dialogs_Options_LabelAdvanced=>T("Website.Dialogs.Options.LabelAdvanced");
///<summary>&quot;Login Preferences&quot;</summary> 
public static string Website_Dialogs_Options_LabelLoginPreferences=>T("Website.Dialogs.Options.LabelLoginPreferences");
///<summary>&quot;Fake login screen&quot;</summary> 
public static string Website_Dialogs_Options_LabelFakeLoginScreen=>T("Website.Dialogs.Options.LabelFakeLoginScreen");
///<summary>&quot;No login screen&quot;</summary> 
public static string Website_Dialogs_Options_LabelNoLoginScreen=>T("Website.Dialogs.Options.LabelNoLoginScreen");
///<summary>&quot;Error in web service method &quot;</summary> 
public static string Website_Dialogs_WebServices_Error=>T("Website.Dialogs.WebServices.Error");
///<summary>&quot;Web Service Error&quot;</summary> 
public static string Website_Dialogs_WebServices_LabelWebServiceError=>T("Website.Dialogs.WebServices.LabelWebServiceError");
///<summary>&quot;Insert Where?&quot;</summary> 
public static string Website_Dialogs_SystemTree_DetailedPaste_Title=>T("Website.Dialogs.SystemTree.DetailedPaste.Title");
///<summary>&quot;Position&quot;</summary> 
public static string Website_Dialogs_SystemTree_DetailedPaste_LabelPosition=>T("Website.Dialogs.SystemTree.DetailedPaste.LabelPosition");
///<summary>&quot;Insert before&quot;</summary> 
public static string Website_Dialogs_SystemTree_DetailedPaste_LabelInsertBefore=>T("Website.Dialogs.SystemTree.DetailedPaste.LabelInsertBefore");
///<summary>&quot;Insert after&quot;</summary> 
public static string Website_Dialogs_SystemTree_DetailedPaste_LabelInsertAfter=>T("Website.Dialogs.SystemTree.DetailedPaste.LabelInsertAfter");
///<summary>&quot;Basic view&quot;</summary> 
public static string Website_Dialogs_EditFunction_BasicView=>T("Website.Dialogs.EditFunction.BasicView");
///<summary>&quot;Advanced view&quot;</summary> 
public static string Website_Dialogs_EditFunction_AdvancedView=>T("Website.Dialogs.EditFunction.AdvancedView");
///<summary>&quot;This function has no parameters&quot;</summary> 
public static string Website_Dialogs_EditFunction_BasicView_NoParameters=>T("Website.Dialogs.EditFunction.BasicView.NoParameters");
///<summary>&quot;Edit image&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelTitle=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelTitle");
///<summary>&quot;File&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelFile=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelFile");
///<summary>&quot;Save&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelSave=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelSave");
///<summary>&quot;Save As...&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelSaveAs=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelSaveAs");
///<summary>&quot;Revert&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelRevert=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRevert");
///<summary>&quot;View&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelView=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelView");
///<summary>&quot;Zoom&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelZoom=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelZoom");
///<summary>&quot;Zoom In&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelZoomIn=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelZoomIn");
///<summary>&quot;Zoom Out&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelZoomOut=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelZoomOut");
///<summary>&quot;800%&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label800=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label800");
///<summary>&quot;400%&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label400=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label400");
///<summary>&quot;200%&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label200=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label200");
///<summary>&quot;100%&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label100=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label100");
///<summary>&quot;50%&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label50=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label50");
///<summary>&quot;25%&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label25=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label25");
///<summary>&quot;12%&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_Label12=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.Label12");
///<summary>&quot;Image&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelImage=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelImage");
///<summary>&quot;Transform&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelTransform=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelTransform");
///<summary>&quot;Flip Horizontally&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelFlipHorizontal=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelFlipHorizontal");
///<summary>&quot;Flip Vertically&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelFlipVertical=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelFlipVertical");
///<summary>&quot;Rotate 90 Degrees CW&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelRotate90CW=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRotate90CW");
///<summary>&quot;Rotate 90 Degrees CCW&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelRotate90CCW=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRotate90CCW");
///<summary>&quot;Rotate 180 Degrees&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelRotate180=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelRotate180");
///<summary>&quot;Scale Image...&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelScale=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelScale");
///<summary>&quot;Crop Image&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_LabelCrop=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.LabelCrop");
///<summary>&quot;Select&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBox_ToolTipSelect=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBox.ToolTipSelect");
///<summary>&quot;Zoom&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBox_ToolTipZoom=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBox.ToolTipZoom");
///<summary>&quot;Save&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelSave=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelSave");
///<summary>&quot;Scale image&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelScale=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelScale");
///<summary>&quot;Crop image&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelCrop=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelCrop");
///<summary>&quot;Undo&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelUndo=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelUndo");
///<summary>&quot;Redo&quot;</summary> 
public static string Website_Content_Views_Editors_ImageEditor_ImageEditor_ToolBar_LabelRedo=>T("Website.Content.Views.Editors.ImageEditor.ImageEditor.ToolBar.LabelRedo");
///<summary>&quot;Permissions&quot;</summary> 
public static string Website_Content_Views_Editors_PermissionEditor_LabelTitle=>T("Website.Content.Views.Editors.PermissionEditor.LabelTitle");
///<summary>&quot;Users&quot;</summary> 
public static string Website_Content_Views_Editors_PermissionEditor_LabelTabUsers=>T("Website.Content.Views.Editors.PermissionEditor.LabelTabUsers");
///<summary>&quot;User Groups&quot;</summary> 
public static string Website_Content_Views_Editors_PermissionEditor_LabelTabUserGroups=>T("Website.Content.Views.Editors.PermissionEditor.LabelTabUserGroups");
///<summary>&quot;Save&quot;</summary> 
public static string Website_Content_Views_Editors_PermissionEditor_LabelButtonSave=>T("Website.Content.Views.Editors.PermissionEditor.LabelButtonSave");
///<summary>&quot;Go back one page&quot;</summary> 
public static string Website_Content_Views_Help_ToolTipBack=>T("Website.Content.Views.Help.ToolTipBack");
///<summary>&quot;Go forward one page&quot;</summary> 
public static string Website_Content_Views_Help_ToolTipForward=>T("Website.Content.Views.Help.ToolTipForward");
///<summary>&quot;Refresh page&quot;</summary> 
public static string Website_Content_Views_Help_ToolTipRefresh=>T("Website.Content.Views.Help.ToolTipRefresh");
///<summary>&quot;Contents&quot;</summary> 
public static string Website_Content_Views_Help_LabelContents=>T("Website.Content.Views.Help.LabelContents");
///<summary>&quot;Help contents&quot;</summary> 
public static string Website_Content_Views_Help_ToolTipContents=>T("Website.Content.Views.Help.ToolTipContents");
///<summary>&quot;Collapse All&quot;</summary> 
public static string Website_Content_Views_SystemView_ToolTipCollapseAll=>T("Website.Content.Views.SystemView.ToolTipCollapseAll");
///<summary>&quot;Link with Editor&quot;</summary> 
public static string Website_Content_Views_SystemView_ToolTipLinkWithEditor=>T("Website.Content.Views.SystemView.ToolTipLinkWithEditor");
///<summary>&quot;New Search...&quot;</summary> 
public static string Website_Content_Views_Search_Search_LabelNewSearch=>T("Website.Content.Views.Search.Search.LabelNewSearch");
///<summary>&quot;Formatted&quot;</summary> 
public static string Website_Content_Views_ViewSource_LabelFormatted=>T("Website.Content.Views.ViewSource.LabelFormatted");
///<summary>&quot;Raw&quot;</summary> 
public static string Website_Content_Views_ViewSource_LabelRaw=>T("Website.Content.Views.ViewSource.LabelRaw");
///<summary>&quot;Server Log&quot;</summary> 
public static string ServerLog_Element_Label=>T("ServerLog.Element.Label");
///<summary>&quot;The server log contain security and system health related messages.&quot;</summary> 
public static string ServerLog_Element_Tooltip=>T("ServerLog.Element.Tooltip");
///<summary>&quot;View Server Log&quot;</summary> 
public static string ServerLog_Element_View_Label=>T("ServerLog.Element.View.Label");
///<summary>&quot;View recent server events&quot;</summary> 
public static string ServerLog_Element_View_Tooltip=>T("ServerLog.Element.View.Tooltip");
///<summary>&quot;Server Log&quot;</summary> 
public static string ServerLog_LabelTitle=>T("ServerLog.LabelTitle");
///<summary>&quot;Delete old&quot;</summary> 
public static string ServerLog_LabelButtonDeleteOld=>T("ServerLog.LabelButtonDeleteOld");
///<summary>&quot;Refresh&quot;</summary> 
public static string ServerLog_LabelButtonRefresh=>T("ServerLog.LabelButtonRefresh");
///<summary>&quot;No log data available...&quot;</summary> 
public static string ServerLog_EmptyLabel=>T("ServerLog.EmptyLabel");
///<summary>&quot;Only the {0} most recent log entries are shown. Open the log for more entries.&quot;</summary> 
public static string ServerLog_LogEntriesRemovedBrowserViewLabel(object parameter0)=>string.Format(T("ServerLog.LogEntriesRemovedBrowserViewLabel"), parameter0);
///<summary>&quot;Only the {0} most recent log entries are shown. {1} entries exists for the current search. Either narrow the search or use the log viewer tool from http://docs.composite.net/Configuration/Logging for full log access.&quot;</summary> 
public static string ServerLog_LogEntriesRemovedLabel(object parameter0,object parameter1)=>string.Format(T("ServerLog.LogEntriesRemovedLabel"), parameter0,parameter1);
///<summary>&quot;Date&quot;</summary> 
public static string ServerLog_LogEntry_DateLabel=>T("ServerLog.LogEntry.DateLabel");
///<summary>&quot;Message&quot;</summary> 
public static string ServerLog_LogEntry_MessageLabel=>T("ServerLog.LogEntry.MessageLabel");
///<summary>&quot;Title&quot;</summary> 
public static string ServerLog_LogEntry_TitleLabel=>T("ServerLog.LogEntry.TitleLabel");
///<summary>&quot;EventType&quot;</summary> 
public static string ServerLog_LogEntry_EventTypeLabel=>T("ServerLog.LogEntry.EventTypeLabel");
///<summary>&quot;Verbose&quot;</summary> 
public static string ServerLog_Severity_Verbose=>T("ServerLog.Severity.Verbose");
///<summary>&quot;Information&quot;</summary> 
public static string ServerLog_Severity_Information=>T("ServerLog.Severity.Information");
///<summary>&quot;Warning&quot;</summary> 
public static string ServerLog_Severity_Warning=>T("ServerLog.Severity.Warning");
///<summary>&quot;Error&quot;</summary> 
public static string ServerLog_Severity_Error=>T("ServerLog.Severity.Error");
///<summary>&quot;Critical&quot;</summary> 
public static string ServerLog_Severity_Critical=>T("ServerLog.Severity.Critical");
///<summary>&quot;Refresh&quot;</summary> 
public static string FunctionDocumentation_LabelButtonRefresh=>T("FunctionDocumentation.LabelButtonRefresh");
///<summary>&quot;Print&quot;</summary> 
public static string FunctionDocumentation_LabelButtonPrint=>T("FunctionDocumentation.LabelButtonPrint");
///<summary>&quot;Execution Ended&quot;</summary> 
public static string Website_FlowUICompleted_ExecutionEndedTitle=>T("Website.FlowUICompleted.ExecutionEndedTitle");
///<summary>&quot;The action executed in this window has ended.&quot;</summary> 
public static string Website_FlowUICompleted_ExecutionEndedMessage=>T("Website.FlowUICompleted.ExecutionEndedMessage");
///<summary>&quot;Server Error&quot;</summary> 
public static string Website_ServerError_ServerErrorTitle=>T("Website.ServerError.ServerErrorTitle");
///<summary>&quot;An unfortunate error has occurred.&quot;</summary> 
public static string Website_ServerError_ServerErrorMessage=>T("Website.ServerError.ServerErrorMessage");
///<summary>&quot;Details&quot;</summary> 
public static string Website_ServerError_ServerErrorDetails=>T("Website.ServerError.ServerErrorDetails");
///<summary>&quot;License Violation&quot;</summary> 
public static string Website_LicenseViolation_LicenseViolationTitle=>T("Website.LicenseViolation.LicenseViolationTitle");
///<summary>&quot;The requested action is in violates with your current license.&quot;</summary> 
public static string Website_LicenseViolation_LicenseViolationMessage=>T("Website.LicenseViolation.LicenseViolationMessage");
///<summary>&quot;Flash options&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelFlashOptions=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelFlashOptions");
///<summary>&quot;High&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelHigh=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelHigh");
///<summary>&quot;Low&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelLow=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelLow");
///<summary>&quot;Autohigh&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelAutohigh=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelAutohigh");
///<summary>&quot;Autolow&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelAutolow=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelAutolow");
///<summary>&quot;Best&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelBest=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelBest");
///<summary>&quot;Window&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelWindow=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelWindow");
///<summary>&quot;Opaque&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelOpaque=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelOpaque");
///<summary>&quot;Transparent&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelTransparent=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelTransparent");
///<summary>&quot;Showall&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelShowall=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelShowall");
///<summary>&quot;Noborder&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelNoborder=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelNoborder");
///<summary>&quot;Exactfit&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelExactfit=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelExactfit");
///<summary>&quot;Auto play&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelAutoPlay=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelAutoPlay");
///<summary>&quot;Loop&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelLoop=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelLoop");
///<summary>&quot;Show menu&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelShowMenu=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelShowMenu");
///<summary>&quot;SWLiveConnect&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaFlashOptions_LabelSWLiveConnect=>T("Website.Templates.WysiwygEditorPlugins.MediaFlashOptions.LabelSWLiveConnect");
///<summary>&quot;Quicktime options&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelQuickTimeOptions=>T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelQuickTimeOptions");
///<summary>&quot;Loop&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelLoop=>T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelLoop");
///<summary>&quot;Cache&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelCache=>T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelCache");
///<summary>&quot;No correction&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelNoCorrection=>T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelNoCorrection");
///<summary>&quot;Kiosk mode&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelKioskMode=>T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelKioskMode");
///<summary>&quot;Play every frame&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelPlayEveryFrame=>T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelPlayEveryFrame");
///<summary>&quot;Auto play&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelAutoPlay=>T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelAutoPlay");
///<summary>&quot;Controller&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelController=>T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelController");
///<summary>&quot;Enable Javascript&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelEnableJavaScript=>T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelEnableJavaScript");
///<summary>&quot;AutoHREF&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelAutoHRef=>T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelAutoHRef");
///<summary>&quot;Target cache&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaQuickTimeOptions_LabelTargetCache=>T("Website.Templates.WysiwygEditorPlugins.MediaQuickTimeOptions.LabelTargetCache");
///<summary>&quot;Shockwave options&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelShockWaveOptions=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelShockWaveOptions");
///<summary>&quot;High&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelHigh=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelHigh");
///<summary>&quot;Low&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelLow=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelLow");
///<summary>&quot;Autohigh&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelAutoHigh=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelAutoHigh");
///<summary>&quot;Autolow&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelAutoLow=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelAutoLow");
///<summary>&quot;Best&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelBest=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelBest");
///<summary>&quot;Window&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelWindow=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelWindow");
///<summary>&quot;Opaque&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelOpaque=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelOpaque");
///<summary>&quot;Transparent&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelTransparent=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelTransparent");
///<summary>&quot;Showall&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelShowAll=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelShowAll");
///<summary>&quot;Noborder&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelNoBorder=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelNoBorder");
///<summary>&quot;Exactfit&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelExactFit=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelExactFit");
///<summary>&quot;Auto play&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelAutoPlay=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelAutoPlay");
///<summary>&quot;Loop&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelLoop=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelLoop");
///<summary>&quot;Show menu&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelShowMenu=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelShowMenu");
///<summary>&quot;SWLiveConnect&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaShockWaveOptions_LabelSWLiveConnect=>T("Website.Templates.WysiwygEditorPlugins.MediaShockWaveOptions.LabelSWLiveConnect");
///<summary>&quot;Quicktime options&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelQuickTimeOptions=>T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelQuickTimeOptions");
///<summary>&quot;Auto Start&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelAutoStart=>T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelAutoStart");
///<summary>&quot;Show menu&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelShowMenu=>T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelShowMenu");
///<summary>&quot;Invoke URLs&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelInvokeURLs=>T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelInvokeURLs");
///<summary>&quot;Stretch to fit&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelStretchToFit=>T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelStretchToFit");
///<summary>&quot;Enabled&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelEnabled=>T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelEnabled");
///<summary>&quot;Fullscreen&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelFullScreen=>T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelFullScreen");
///<summary>&quot;Mute&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelMute=>T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelMute");
///<summary>&quot;Windowless video&quot;</summary> 
public static string Website_Templates_WysiwygEditorPlugins_MediaWinMediaOptions_LabelWindowLessVideo=>T("Website.Templates.WysiwygEditorPlugins.MediaWinMediaOptions.LabelWindowLessVideo");
///<summary>&quot;Save&quot;</summary> 
public static string Website_App_LabelSave=>T("Website.App.LabelSave");
///<summary>&quot;Save and Publish&quot;</summary> 
public static string Website_App_LabelSaveAndPublish=>T("Website.App.LabelSaveAndPublish");
///<summary>&quot;Close Tab&quot;</summary> 
public static string Website_App_LabelCloseTab=>T("Website.App.LabelCloseTab");
///<summary>&quot;Close Others&quot;</summary> 
public static string Website_App_LabelCloseOthers=>T("Website.App.LabelCloseOthers");
///<summary>&quot;Refresh View&quot;</summary> 
public static string Website_App_LabelRefreshView=>T("Website.App.LabelRefreshView");
///<summary>&quot;Make Dirty&quot;</summary> 
public static string Website_App_LabelMakeDirty=>T("Website.App.LabelMakeDirty");
///<summary>&quot;View Source&quot;</summary> 
public static string Website_App_LabelViewSource=>T("Website.App.LabelViewSource");
///<summary>&quot;View Generated&quot;</summary> 
public static string Website_App_LabelViewGenerated=>T("Website.App.LabelViewGenerated");
///<summary>&quot;View Serialized&quot;</summary> 
public static string Website_App_LabelViewSerialized=>T("Website.App.LabelViewSerialized");
///<summary>&quot;Close&quot;</summary> 
public static string Website_App_LabelClose=>T("Website.App.LabelClose");
///<summary>&quot;File&quot;</summary> 
public static string Website_App_LabelFile=>T("Website.App.LabelFile");
///<summary>&quot;Close&quot;</summary> 
public static string Website_App_LabelFileClose=>T("Website.App.LabelFileClose");
///<summary>&quot;Close All&quot;</summary> 
public static string Website_App_LabelFileCloseAll=>T("Website.App.LabelFileCloseAll");
///<summary>&quot;Save All...&quot;</summary> 
public static string Website_App_LabelFileSaveAll=>T("Website.App.LabelFileSaveAll");
///<summary>&quot;Sign out&quot;</summary> 
public static string Website_App_LabelFileExit=>T("Website.App.LabelFileExit");
///<summary>&quot;View&quot;</summary> 
public static string Website_App_LabelView=>T("Website.App.LabelView");
///<summary>&quot;Composite Start&quot;</summary> 
public static string Website_App_LabelViewCompositeStart=>T("Website.App.LabelViewCompositeStart");
///<summary>&quot;System Log&quot;</summary> 
public static string Website_App_LabelSystemLog=>T("Website.App.LabelSystemLog");
///<summary>&quot;Developer Panel&quot;</summary> 
public static string Website_App_LabelDeveloperPanel=>T("Website.App.LabelDeveloperPanel");
///<summary>&quot;Tools&quot;</summary> 
public static string Website_App_LabelTools=>T("Website.App.LabelTools");
///<summary>&quot;Help&quot;</summary> 
public static string Website_App_LabelHelp=>T("Website.App.LabelHelp");
///<summary>&quot;Settings&quot;</summary> 
public static string Website_App_LabelSettings=>T("Website.App.LabelSettings");
///<summary>&quot;Help Contents&quot;</summary> 
public static string Website_App_LabelHelpContents=>T("Website.App.LabelHelpContents");
///<summary>&quot;Provide Feedback...&quot;</summary> 
public static string Website_App_LabelFeedback=>T("Website.App.LabelFeedback");
///<summary>&quot;About {applicationname}&quot;</summary> 
public static string Website_App_LabelAbout=>T("Website.App.LabelAbout");
///<summary>&quot;Cut&quot;</summary> 
public static string Website_App_LabelCut=>T("Website.App.LabelCut");
///<summary>&quot;Copy&quot;</summary> 
public static string Website_App_LabelCopy=>T("Website.App.LabelCopy");
///<summary>&quot;Paste&quot;</summary> 
public static string Website_App_LabelPaste=>T("Website.App.LabelPaste");
///<summary>&quot;Refresh&quot;</summary> 
public static string Website_App_LabelRefresh=>T("Website.App.LabelRefresh");
///<summary>&quot;Only first {0} elements are shown in the tree.&quot;</summary> 
public static string Website_App_LimitedElementsShown(object parameter0)=>string.Format(T("Website.App.LimitedElementsShown"), parameter0);
///<summary>&quot;Loading...&quot;</summary> 
public static string Website_App_LabelLoading=>T("Website.App.LabelLoading");
///<summary>&quot;Loaded&quot;</summary> 
public static string Website_App_LabelLoaded=>T("Website.App.LabelLoaded");
///<summary>&quot;Saved&quot;</summary> 
public static string Website_App_LabelSaved=>T("Website.App.LabelSaved");
///<summary>&quot;Minimize&quot;</summary> 
public static string Website_App_ToolTipMinimize=>T("Website.App.ToolTipMinimize");
///<summary>&quot;Maximize&quot;</summary> 
public static string Website_App_ToolTipMaximize=>T("Website.App.ToolTipMaximize");
///<summary>&quot;Restore&quot;</summary> 
public static string Website_App_ToolTipUnMaximize=>T("Website.App.ToolTipUnMaximize");
///<summary>&quot;Restore&quot;</summary> 
public static string Website_App_ToolTipUnMinimize=>T("Website.App.ToolTipUnMinimize");
///<summary>&quot;Close&quot;</summary> 
public static string Website_App_ToolTipClose=>T("Website.App.ToolTipClose");
///<summary>&quot;Opening {0}...&quot;</summary> 
public static string Website_App_StatusBar_Opening(object parameter0)=>string.Format(T("Website.App.StatusBar.Opening"), parameter0);
///<summary>&quot;Refreshing {0}...&quot;</summary> 
public static string Website_App_StatusBar_Refreshing(object parameter0)=>string.Format(T("Website.App.StatusBar.Refreshing"), parameter0);
///<summary>&quot;Loading {0}...&quot;</summary> 
public static string Website_App_StatusBar_Loading(object parameter0)=>string.Format(T("Website.App.StatusBar.Loading"), parameter0);
///<summary>&quot;Error&quot;</summary> 
public static string Website_App_StatusBar_Error=>T("Website.App.StatusBar.Error");
///<summary>&quot;Warning&quot;</summary> 
public static string Website_App_StatusBar_Warn=>T("Website.App.StatusBar.Warn");
///<summary>&quot;Working...&quot;</summary> 
public static string Website_App_StatusBar_Busy=>T("Website.App.StatusBar.Busy");
///<summary>&quot;Ready!&quot;</summary> 
public static string Website_App_StatusBar_Ready=>T("Website.App.StatusBar.Ready");
///<summary>&quot;Error in&quot;</summary> 
public static string Website_App_StatusBar_ErrorInField=>T("Website.App.StatusBar.ErrorInField");
///<summary>&quot;Add New Media File&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFile_Layout_Label=>T("Website.Forms.Administrative.AddNewMediaFile.Layout.Label");
///<summary>&quot;Filename&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFile_FileUpload_Label=>T("Website.Forms.Administrative.AddNewMediaFile.FileUpload.Label");
///<summary>&quot;Select the file to upload&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFile_FileUpload_Help=>T("Website.Forms.Administrative.AddNewMediaFile.FileUpload.Help");
///<summary>&quot;Allow overwrite&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFile_OverwriteCheckBox_Label=>T("Website.Forms.Administrative.AddNewMediaFile.OverwriteCheckBox.Label");
///<summary>&quot;Replace existing file&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFile_OverwriteCheckBox_Help=>T("Website.Forms.Administrative.AddNewMediaFile.OverwriteCheckBox.Help");
///<summary>&quot;Filename&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFile_FilenameTextBox_Label=>T("Website.Forms.Administrative.AddNewMediaFile.FilenameTextBox.Label");
///<summary>&quot;The name of the file in the media library&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFile_FilenameTextBox_Help=>T("Website.Forms.Administrative.AddNewMediaFile.FilenameTextBox.Help");
///<summary>&quot;Title&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFile_TitleTextBox_Label=>T("Website.Forms.Administrative.AddNewMediaFile.TitleTextBox.Label");
///<summary>&quot;Use this field for an image title&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFile_TitleTextBox_Help=>T("Website.Forms.Administrative.AddNewMediaFile.TitleTextBox.Help");
///<summary>&quot;Description&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFile_DescriptionTextBox_Label=>T("Website.Forms.Administrative.AddNewMediaFile.DescriptionTextBox.Label");
///<summary>&quot;Use this field for a short description of the image&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFile_DescriptionTextBox_Help=>T("Website.Forms.Administrative.AddNewMediaFile.DescriptionTextBox.Help");
///<summary>&quot;Please select a file to upload&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFile_MissingUploadedFile_Message=>T("Website.Forms.Administrative.AddNewMediaFile.MissingUploadedFile.Message");
///<summary>&quot;A file with the same name exists. Check allow overwrite or change the filename&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFile_FileExists_Message=>T("Website.Forms.Administrative.AddNewMediaFile.FileExists.Message");
///<summary>&quot;The total length of the filename (folder and filename) is too long&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFile_TotalFilenameToLong_Message=>T("Website.Forms.Administrative.AddNewMediaFile.TotalFilenameToLong.Message");
///<summary>&quot;Add New Media Folder&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFolder_Label_AddNewMediaFolder=>T("Website.Forms.Administrative.AddNewMediaFolder.Label.AddNewMediaFolder");
///<summary>&quot;Folder Name&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFolder_LabelFolderName=>T("Website.Forms.Administrative.AddNewMediaFolder.LabelFolderName");
///<summary>&quot;&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFolder_HelpFolderName=>T("Website.Forms.Administrative.AddNewMediaFolder.HelpFolderName");
///<summary>&quot;Title&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFolder_LabelTitle=>T("Website.Forms.Administrative.AddNewMediaFolder.LabelTitle");
///<summary>&quot;&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFolder_HelpTitle=>T("Website.Forms.Administrative.AddNewMediaFolder.HelpTitle");
///<summary>&quot;Description&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFolder_LabelDescription=>T("Website.Forms.Administrative.AddNewMediaFolder.LabelDescription");
///<summary>&quot;&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFolder_HelpDescription=>T("Website.Forms.Administrative.AddNewMediaFolder.HelpDescription");
///<summary>&quot;The folder already exists&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFolder_FolderNameAlreadyUsed=>T("Website.Forms.Administrative.AddNewMediaFolder.FolderNameAlreadyUsed");
///<summary>&quot;The total length of the folder name is too long&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFolder_FolderNameTooLong=>T("Website.Forms.Administrative.AddNewMediaFolder.FolderNameTooLong");
///<summary>&quot;The folder name can not only be &apos;/&apos; or &apos;\&apos;&quot;</summary> 
public static string Website_Forms_Administrative_AddNewMediaFolder_FolderNotOnlySlash=>T("Website.Forms.Administrative.AddNewMediaFolder.FolderNotOnlySlash");
///<summary>&quot;Upload Multiple Files via a Zip File&quot;</summary> 
public static string Website_Forms_Administrative_AddZipMediaFile_LabelDialog=>T("Website.Forms.Administrative.AddZipMediaFile.LabelDialog");
///<summary>&quot;Zip file&quot;</summary> 
public static string Website_Forms_Administrative_AddZipMediaFile_LabelFile=>T("Website.Forms.Administrative.AddZipMediaFile.LabelFile");
///<summary>&quot;Create a Zip file (right click local folder and select Send to -&gt; Compressed folder) and select it using the Browse button&quot;</summary> 
public static string Website_Forms_Administrative_AddZipMediaFile_HelpFile=>T("Website.Forms.Administrative.AddZipMediaFile.HelpFile");
///<summary>&quot;Create folders&quot;</summary> 
public static string Website_Forms_Administrative_AddZipMediaFile_LabelRecreateStructure=>T("Website.Forms.Administrative.AddZipMediaFile.LabelRecreateStructure");
///<summary>&quot;Selecting this option will copy the exact folder structure from your Zip file&quot;</summary> 
public static string Website_Forms_Administrative_AddZipMediaFile_HelpRecreateStructure=>T("Website.Forms.Administrative.AddZipMediaFile.HelpRecreateStructure");
///<summary>&quot;Extract folders from Zip file&quot;</summary> 
public static string Website_Forms_Administrative_AddZipMediaFile_LabelRecreateStructureCheckBox=>T("Website.Forms.Administrative.AddZipMediaFile.LabelRecreateStructureCheckBox");
///<summary>&quot;Overwrite existing&quot;</summary> 
public static string Website_Forms_Administrative_AddZipMediaFile_LabelOverwriteExsisting=>T("Website.Forms.Administrative.AddZipMediaFile.LabelOverwriteExsisting");
///<summary>&quot;Selecting this option will overwrite existing files in the media archive with matching file names&quot;</summary> 
public static string Website_Forms_Administrative_AddZipMediaFile_HelpOverwriteExsisting=>T("Website.Forms.Administrative.AddZipMediaFile.HelpOverwriteExsisting");
///<summary>&quot;Error&quot;</summary> 
public static string Website_Forms_Administrative_AddZipMediaFile_Error_Title=>T("Website.Forms.Administrative.AddZipMediaFile.Error.Title");
///<summary>&quot;Overwrite existing files&quot;</summary> 
public static string Website_Forms_Administrative_AddZipMediaFile_LabelOverwriteExsistingCheckBox=>T("Website.Forms.Administrative.AddZipMediaFile.LabelOverwriteExsistingCheckBox");
///<summary>&quot;Please select a file to upload&quot;</summary> 
public static string Website_Forms_Administrative_AddZipMediaFile_MissingUploadedFile_Message=>T("Website.Forms.Administrative.AddZipMediaFile.MissingUploadedFile.Message");
///<summary>&quot;Please use the normal upload command to upload .docx files&quot;</summary> 
public static string Website_Forms_Administrative_AddZipMediaFile_CannotUploadDocxFile=>T("Website.Forms.Administrative.AddZipMediaFile.CannotUploadDocxFile");
///<summary>&quot;The selected file was not a correct zip file&quot;</summary> 
public static string Website_Forms_Administrative_AddZipMediaFile_WrongUploadedFile_Message=>T("Website.Forms.Administrative.AddZipMediaFile.WrongUploadedFile.Message");
///<summary>&quot;Function search&quot;</summary> 
public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelFunctionSearch=>T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelFunctionSearch");
///<summary>&quot;Keyword&quot;</summary> 
public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelKeyword=>T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelKeyword");
///<summary>&quot;Write a keyword to search for.&quot;</summary> 
public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelKeywordHelp=>T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelKeywordHelp");
///<summary>&quot;Return type&quot;</summary> 
public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelReturnType=>T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelReturnType");
///<summary>&quot;Select a return type to search for.&quot;</summary> 
public static string Website_Forms_Administrative_AllFunctionsElementProviderSearchForm_LabelReturnTypeHelp=>T("Website.Forms.Administrative.AllFunctionsElementProviderSearchForm.LabelReturnTypeHelp");
///<summary>&quot;Delete This File?&quot;</summary> 
public static string Website_Forms_Administrative_DeleteMediaFile_LabelFieldGroup=>T("Website.Forms.Administrative.DeleteMediaFile.LabelFieldGroup");
///<summary>&quot;Delete this file?&quot;</summary> 
public static string Website_Forms_Administrative_DeleteMediaFile_Text=>T("Website.Forms.Administrative.DeleteMediaFile.Text");
///<summary>&quot;Deleting a file&quot;</summary> 
public static string Website_Forms_Administrative_DeleteMediaFile_DeleteDataConfirmationHeader=>T("Website.Forms.Administrative.DeleteMediaFile.DeleteDataConfirmationHeader");
///<summary>&quot;There is some referenced data that will also be deleted, do you want to continue?&quot;</summary> 
public static string Website_Forms_Administrative_DeleteMediaFile_DeleteDataConfirmationText=>T("Website.Forms.Administrative.DeleteMediaFile.DeleteDataConfirmationText");
///<summary>&quot;Delete This Folder?&quot;</summary> 
public static string Website_Forms_Administrative_DeleteMediaFolder_LabelFieldGroup=>T("Website.Forms.Administrative.DeleteMediaFolder.LabelFieldGroup");
///<summary>&quot;Delete this folder?&quot;</summary> 
public static string Website_Forms_Administrative_DeleteMediaFolder_Text=>T("Website.Forms.Administrative.DeleteMediaFolder.Text");
///<summary>&quot;This folder contains one or more files or subfolders. Deleting this folder will also delete all sub files and folders. Delete this folder?&quot;</summary> 
public static string Website_Forms_Administrative_DeleteMediaFolder_HasChildringText=>T("Website.Forms.Administrative.DeleteMediaFolder.HasChildringText");
///<summary>&quot;Media Properties&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFile_LabelFieldGroup=>T("Website.Forms.Administrative.EditMediaFile.LabelFieldGroup");
///<summary>&quot;Title&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFile_LabelTitle=>T("Website.Forms.Administrative.EditMediaFile.LabelTitle");
///<summary>&quot;A human friendly short text describing the content of the media file&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFile_HelpTitle=>T("Website.Forms.Administrative.EditMediaFile.HelpTitle");
///<summary>&quot;File Name&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFile_LabelFileName=>T("Website.Forms.Administrative.EditMediaFile.LabelFileName");
///<summary>&quot;The file name to use when the media file is downloaded.&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFile_HelpFileName=>T("Website.Forms.Administrative.EditMediaFile.HelpFileName");
///<summary>&quot;Description&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFile_LabelDescription=>T("Website.Forms.Administrative.EditMediaFile.LabelDescription");
///<summary>&quot;A description of the media file content&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFile_HelpDescription=>T("Website.Forms.Administrative.EditMediaFile.HelpDescription");
///<summary>&quot;The total length of the filename (folder and filename) is too long&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFile_TotalFilenameToLong_Message=>T("Website.Forms.Administrative.EditMediaFile.TotalFilenameToLong.Message");
///<summary>&quot;A file with the same name already exists in this folder.&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFile_FileExists_Message=>T("Website.Forms.Administrative.EditMediaFile.FileExists.Message");
///<summary>&quot;Folder Properties&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFolder_LabelFieldGroup=>T("Website.Forms.Administrative.EditMediaFolder.LabelFieldGroup");
///<summary>&quot;Folder Name&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFolder_LabelFolderName=>T("Website.Forms.Administrative.EditMediaFolder.LabelFolderName");
///<summary>&quot;&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFolder_HelpFolderName=>T("Website.Forms.Administrative.EditMediaFolder.HelpFolderName");
///<summary>&quot;Title&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFolder_LabelTitle=>T("Website.Forms.Administrative.EditMediaFolder.LabelTitle");
///<summary>&quot;Use this field for a folder title&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFolder_HelpTitle=>T("Website.Forms.Administrative.EditMediaFolder.HelpTitle");
///<summary>&quot;Description&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFolder_LabelDescription=>T("Website.Forms.Administrative.EditMediaFolder.LabelDescription");
///<summary>&quot;&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFolder_HelpDescription=>T("Website.Forms.Administrative.EditMediaFolder.HelpDescription");
///<summary>&quot;The folder contains a file where the total length of the filename and the new folder name is too long&quot;</summary> 
public static string Website_Forms_Administrative_EditMediaFolder_TotalFilenameToLong_Message=>T("Website.Forms.Administrative.EditMediaFolder.TotalFilenameToLong.Message");
///<summary>&quot;Saved, but not published&quot;</summary> 
public static string Website_Forms_Administrative_EditPage_PublishDatePreventPublishTitle=>T("Website.Forms.Administrative.EditPage.PublishDatePreventPublishTitle");
///<summary>&quot;Your page has been saved, but not published since you have a future publish date set on the &apos;Settings&apos; tab.&quot;</summary> 
public static string Website_Forms_Administrative_EditPage_PublishDatePreventPublish=>T("Website.Forms.Administrative.EditPage.PublishDatePreventPublish");
///<summary>&quot;Search&quot;</summary> 
public static string Website_Forms_Administrative_ElementKeywordSearch_LabelFieldGroup=>T("Website.Forms.Administrative.ElementKeywordSearch.LabelFieldGroup");
///<summary>&quot;Keyword&quot;</summary> 
public static string Website_Forms_Administrative_ElementKeywordSearch_LabelKeyword=>T("Website.Forms.Administrative.ElementKeywordSearch.LabelKeyword");
///<summary>&quot;Write a keyword to search for.&quot;</summary> 
public static string Website_Forms_Administrative_ElementKeywordSearch_LabelSearchKeyword=>T("Website.Forms.Administrative.ElementKeywordSearch.LabelSearchKeyword");
///<summary>&quot;Upload New Media File&quot;</summary> 
public static string Website_Forms_Administrative_UploadMediaFile_LabelFieldGroup=>T("Website.Forms.Administrative.UploadMediaFile.LabelFieldGroup");
///<summary>&quot;File name:&quot;</summary> 
public static string Website_Forms_Administrative_UploadMediaFile_LabelFile=>T("Website.Forms.Administrative.UploadMediaFile.LabelFile");
///<summary>&quot;&quot;</summary> 
public static string Website_Forms_Administrative_UploadMediaFile_HelpFile=>T("Website.Forms.Administrative.UploadMediaFile.HelpFile");
///<summary>&quot;File missing or empty&quot;</summary> 
public static string Website_Forms_Administrative_UploadMediaFile_EmptyFileErrorTitle=>T("Website.Forms.Administrative.UploadMediaFile.EmptyFileErrorTitle");
///<summary>&quot;No file data was received. Please use the browse button and ensure that the selected file is not empty.&quot;</summary> 
public static string Website_Forms_Administrative_UploadMediaFile_EmptyFileErrorMessage=>T("Website.Forms.Administrative.UploadMediaFile.EmptyFileErrorMessage");
///<summary>&quot;Upload New Media File to Existing File&quot;</summary> 
public static string Website_Forms_Administrative_UploadNewMediaFile_LabelFieldGroup=>T("Website.Forms.Administrative.UploadNewMediaFile.LabelFieldGroup");
///<summary>&quot;File name:&quot;</summary> 
public static string Website_Forms_Administrative_UploadNewMediaFile_LabelFile=>T("Website.Forms.Administrative.UploadNewMediaFile.LabelFile");
///<summary>&quot;&quot;</summary> 
public static string Website_Forms_Administrative_UploadNewMediaFile_HelpFile=>T("Website.Forms.Administrative.UploadNewMediaFile.HelpFile");
///<summary>&quot;Save&quot;</summary> 
public static string Website_Forms_Administrative_AdministrativeTemplates_Document_LabelSave=>T("Website.Forms.Administrative.AdministrativeTemplates.Document.LabelSave");
///<summary>&quot;Save As...&quot;</summary> 
public static string Website_Forms_Administrative_AdministrativeTemplates_Document_LabelSaveAs=>T("Website.Forms.Administrative.AdministrativeTemplates.Document.LabelSaveAs");
///<summary>&quot;Previous&quot;</summary> 
public static string Website_Forms_Administrative_AdministrativeTemplates_Wizard_LabelPrevious=>T("Website.Forms.Administrative.AdministrativeTemplates.Wizard.LabelPrevious");
///<summary>&quot;Next&quot;</summary> 
public static string Website_Forms_Administrative_AdministrativeTemplates_Wizard_LabelNext=>T("Website.Forms.Administrative.AdministrativeTemplates.Wizard.LabelNext");
///<summary>&quot;Finish&quot;</summary> 
public static string Website_Forms_Administrative_AdministrativeTemplates_Wizard_LabelFinish=>T("Website.Forms.Administrative.AdministrativeTemplates.Wizard.LabelFinish");
///<summary>&quot;Cancel&quot;</summary> 
public static string Website_Forms_Administrative_AdministrativeTemplates_Wizard_LabelCancel=>T("Website.Forms.Administrative.AdministrativeTemplates.Wizard.LabelCancel");
///<summary>&quot;OK&quot;</summary> 
public static string Website_Forms_Administrative_AdministrativeTemplates_DataDialog_LabelOk=>T("Website.Forms.Administrative.AdministrativeTemplates.DataDialog.LabelOk");
///<summary>&quot;Cancel&quot;</summary> 
public static string Website_Forms_Administrative_AdministrativeTemplates_DataDialog_LabelCancel=>T("Website.Forms.Administrative.AdministrativeTemplates.DataDialog.LabelCancel");
///<summary>&quot;OK&quot;</summary> 
public static string Website_Forms_Administrative_AdministrativeTemplates_ConfirmDialog_LabelOk=>T("Website.Forms.Administrative.AdministrativeTemplates.ConfirmDialog.LabelOk");
///<summary>&quot;Cancel&quot;</summary> 
public static string Website_Forms_Administrative_AdministrativeTemplates_ConfirmDialog_LabelCancel=>T("Website.Forms.Administrative.AdministrativeTemplates.ConfirmDialog.LabelCancel");
///<summary>&quot;Input&quot;</summary> 
public static string Website_Misc_SourceCodeViewer_LabelInput=>T("Website.Misc.SourceCodeViewer.LabelInput");
///<summary>&quot;Output&quot;</summary> 
public static string Website_Misc_SourceCodeViewer_LabelOutput=>T("Website.Misc.SourceCodeViewer.LabelOutput");
///<summary>&quot;Not allowed.&quot;</summary> 
public static string Website_Misc_Trees_DialogTitle_PasteNotAllowed=>T("Website.Misc.Trees.DialogTitle.PasteNotAllowed");
///<summary>&quot;Paste not allowed in this context.&quot;</summary> 
public static string Website_Misc_Trees_DialogText_PasteNotAllowed=>T("Website.Misc.Trees.DialogText.PasteNotAllowed");
///<summary>&quot;Not allowed&quot;</summary> 
public static string Website_Misc_Trees_DialogTitle_PasteTypeNotAllowed=>T("Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed");
///<summary>&quot;Folder won&apos;t accept document type.&quot;</summary> 
public static string Website_Misc_Trees_DialogText_PasteTypeNotAllowed=>T("Website.Misc.Trees.DialogText.PasteTypeNotAllowed");
///<summary>&quot;Edit Selections&quot;</summary> 
public static string Website_Misc_MultiSelector_LabelEditSelections=>T("Website.Misc.MultiSelector.LabelEditSelections");
///<summary>&quot;Version information&quot;</summary> 
public static string GenericVersionProcessController_Version=>T("GenericVersionProcessController.Version");
///<summary>&quot;Show version information&quot;</summary> 
public static string GenericVersionProcessController_VersionToolTip=>T("GenericVersionProcessController.VersionToolTip");
///<summary>&quot;Select a value&quot;</summary> 
public static string AspNetUiControl_Selector_SelectValueLabel=>T("AspNetUiControl.Selector.SelectValueLabel");
///<summary>&quot;&lt; broken reference &gt;...&quot;</summary> 
public static string AspNetUiControl_Selector_BrokenReference=>T("AspNetUiControl.Selector.BrokenReference");
///<summary>&quot;(no selection)&quot;</summary> 
public static string AspNetUiControl_Selector_NoSelection=>T("AspNetUiControl.Selector.NoSelection");
///<summary>&quot;No matches for &apos;{0}&apos;&quot;</summary> 
public static string AspNetUiControl_Selector_NoMatchesFor(object parameter0)=>string.Format(T("AspNetUiControl.Selector.NoMatchesFor"), parameter0);
///<summary>&quot;This field contains a broken reference&quot;</summary> 
public static string Validation_BrokenReference=>T("Validation.BrokenReference");
///<summary>&quot;This field is required.&quot;</summary> 
public static string Validation_RequiredField=>T("Validation.RequiredField");
///<summary>&quot;Only {0} digit(s) after decimal point allowed&quot;</summary> 
public static string Validation_Decimal_SymbolsAfterPointAllowed(object parameter0)=>string.Format(T("Validation.Decimal.SymbolsAfterPointAllowed"), parameter0);
///<summary>&quot;Only {0} digit(s) before decimal point allowed&quot;</summary> 
public static string Validation_Decimal_SymbolsBeforePointAllowed(object parameter0)=>string.Format(T("Validation.Decimal.SymbolsBeforePointAllowed"), parameter0);
///<summary>&quot;Invalid date string: &apos;{0}&apos;. Use the format &apos;{1}&apos;.&quot;</summary> 
public static string Validation_DateTime_InvalidDateFormat(object parameter0,object parameter1)=>string.Format(T("Validation.DateTime.InvalidDateFormat"), parameter0,parameter1);
///<summary>&quot;The specified value is either too big or too small. The acceptable range is from -2,147,483,648 to 2,147,483,647&quot;</summary> 
public static string Validation_Int32_Overflow=>T("Validation.Int32.Overflow");
///<summary>&quot;Page Browser&quot;</summary> 
public static string Browser_Label=>T("Browser.Label");
///<summary>&quot;Browse unpublished pages&quot;</summary> 
public static string Browser_ToolTip=>T("Browser.ToolTip");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Management", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_NameValidation {
///<summary>&quot;Name can not be an empty string&quot;</summary> 
public static string EmptyName=>T("EmptyName");
///<summary>&quot;Namespace can not be an empty string&quot;</summary> 
public static string EmptyNamespace=>T("EmptyNamespace");
///<summary>&quot;Namespace can not contain the same name part multiple times&quot;</summary> 
public static string DuplicateElementNamespace=>T("DuplicateElementNamespace");
///<summary>&quot;The name &apos;{0}&apos; is not a valid identifier&quot;</summary> 
public static string InvalidIdentifier(object parameter0)=>string.Format(T("InvalidIdentifier"), parameter0);
///<summary>&quot;The name &apos;{0}&apos; is not a valid identifier. Identifiers may not start with digits.&quot;</summary> 
public static string InvalidIdentifierDigit(object parameter0)=>string.Format(T("InvalidIdentifierDigit"), parameter0);
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.NameValidation", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Permissions {
///<summary>&quot;Read&quot;</summary> 
public static string ReadLabel=>T("ReadLabel");
///<summary>&quot;Edit&quot;</summary> 
public static string EditLabel=>T("EditLabel");
///<summary>&quot;Add&quot;</summary> 
public static string AddLabel=>T("AddLabel");
///<summary>&quot;Delete&quot;</summary> 
public static string DeleteLabel=>T("DeleteLabel");
///<summary>&quot;Approve&quot;</summary> 
public static string ApproveLabel=>T("ApproveLabel");
///<summary>&quot;Publish&quot;</summary> 
public static string PublishLabel=>T("PublishLabel");
///<summary>&quot;Configure&quot;</summary> 
public static string ConfigureLabel=>T("ConfigureLabel");
///<summary>&quot;Administrate&quot;</summary> 
public static string AdministrateLabel=>T("AdministrateLabel");
///<summary>&quot;ClearPermissions&quot;</summary> 
public static string ClearPermissionsLabel=>T("ClearPermissionsLabel");
///<summary>&quot;This operation would remove your administrative permissions from this entity. You can not remove your own administrative permissions.&quot;</summary> 
public static string AdminLockoutMessage=>T("AdminLockoutMessage");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Permissions", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_AllFunctionsElementProvider {
///<summary>&quot;All Functions&quot;</summary> 
public static string Plugins_AllFunctionsElementProvider_FunctionRootFolderLabel=>T("Plugins.AllFunctionsElementProvider.FunctionRootFolderLabel");
///<summary>&quot;All functions&quot;</summary> 
public static string Plugins_AllFunctionsElementProvider_FunctionRootFolderToolTip=>T("Plugins.AllFunctionsElementProvider.FunctionRootFolderToolTip");
///<summary>&quot;All Widget Functions&quot;</summary> 
public static string Plugins_AllFunctionsElementProvider_WidgetFunctionRootFolderLabel=>T("Plugins.AllFunctionsElementProvider.WidgetFunctionRootFolderLabel");
///<summary>&quot;All widget functions&quot;</summary> 
public static string Plugins_AllFunctionsElementProvider_WidgetFunctionRootFolderToolTip=>T("Plugins.AllFunctionsElementProvider.WidgetFunctionRootFolderToolTip");
///<summary>&quot;Generate Documentation&quot;</summary> 
public static string AllFunctionsElementProvider_GenerateDocumentation=>T("AllFunctionsElementProvider.GenerateDocumentation");
///<summary>&quot;Generate documentation for all functions below this folder&quot;</summary> 
public static string AllFunctionsElementProvider_GenerateDocumentationTooltip=>T("AllFunctionsElementProvider.GenerateDocumentationTooltip");
///<summary>&quot;Information&quot;</summary> 
public static string AllFunctionsElementProvider_ViewFunctionInformation=>T("AllFunctionsElementProvider.ViewFunctionInformation");
///<summary>&quot;View function information&quot;</summary> 
public static string AllFunctionsElementProvider_ViewFunctionInformationTooltip=>T("AllFunctionsElementProvider.ViewFunctionInformationTooltip");
///<summary>&quot;Test: {0}&quot;</summary> 
public static string FunctionTesterWorkflow_Layout_Label(object parameter0)=>string.Format(T("FunctionTesterWorkflow.Layout.Label"), parameter0);
///<summary>&quot;Functions&quot;</summary> 
public static string FunctionTesterWorkflow_FunctionCalls_Label=>T("FunctionTesterWorkflow.FunctionCalls.Label");
///<summary>&quot;Results&quot;</summary> 
public static string FunctionTesterWorkflow_Preview_Label=>T("FunctionTesterWorkflow.Preview.Label");
///<summary>&quot;Runtime&quot;</summary> 
public static string FunctionTesterWorkflow_Runtime_FieldGroup_Label=>T("FunctionTesterWorkflow.Runtime.FieldGroup.Label");
///<summary>&quot;Settings&quot;</summary> 
public static string FunctionTesterWorkflow_DebugFieldGroup_Label=>T("FunctionTesterWorkflow.DebugFieldGroup.Label");
///<summary>&quot;Page&quot;</summary> 
public static string FunctionTesterWorkflow_DebugPage_Label=>T("FunctionTesterWorkflow.DebugPage.Label");
///<summary>&quot;When executing the function, this page is used as current page&quot;</summary> 
public static string FunctionTesterWorkflow_DebugPage_Help=>T("FunctionTesterWorkflow.DebugPage.Help");
///<summary>&quot;Data scope&quot;</summary> 
public static string FunctionTesterWorkflow_DebugPageDataScope_Label=>T("FunctionTesterWorkflow.DebugPageDataScope.Label");
///<summary>&quot;When executing the function, this is used as current data scope&quot;</summary> 
public static string FunctionTesterWorkflow_DebugPageDataScope_Help=>T("FunctionTesterWorkflow.DebugPageDataScope.Help");
///<summary>&quot;Language&quot;</summary> 
public static string FunctionTesterWorkflow_DebugActiveLocale_Label=>T("FunctionTesterWorkflow.DebugActiveLocale.Label");
///<summary>&quot;When executing the function, this is used as the current language&quot;</summary> 
public static string FunctionTesterWorkflow_DebugActiveLocale_Help=>T("FunctionTesterWorkflow.DebugActiveLocale.Help");
///<summary>&quot;Administrative&quot;</summary> 
public static string FunctionTesterWorkflow_AdminitrativeScope_Label=>T("FunctionTesterWorkflow.AdminitrativeScope.Label");
///<summary>&quot;Public&quot;</summary> 
public static string FunctionTesterWorkflow_PublicScope_Label=>T("FunctionTesterWorkflow.PublicScope.Label");
///<summary>&quot;Test Function&quot;</summary> 
public static string AllFunctionsElementProvider_FunctionTester_Label=>T("AllFunctionsElementProvider.FunctionTester.Label");
///<summary>&quot;Test function&quot;</summary> 
public static string AllFunctionsElementProvider_FunctionTester_ToolTip=>T("AllFunctionsElementProvider.FunctionTester.ToolTip");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_GeneratedDataTypesElementProvider {
///<summary>&quot;Global Datatypes&quot;</summary> 
public static string GlobalDataFolderLabel=>T("GlobalDataFolderLabel");
///<summary>&quot;Global datatypes&quot;</summary> 
public static string GlobalDataFolderToolTip=>T("GlobalDataFolderToolTip");
///<summary>&quot;Website Items&quot;</summary> 
public static string GlobalDataFolderLabel_OnlyGlobalData=>T("GlobalDataFolderLabel_OnlyGlobalData");
///<summary>&quot;Website Items (Data)&quot;</summary> 
public static string GlobalDataFolderToolTip_OnlyGlobalData=>T("GlobalDataFolderToolTip_OnlyGlobalData");
///<summary>&quot;Page Datafolders&quot;</summary> 
public static string PageDataFolderDataFolderLabel=>T("PageDataFolderDataFolderLabel");
///<summary>&quot;Page datafolders&quot;</summary> 
public static string PageDataFolderDataFolderToolTip=>T("PageDataFolderDataFolderToolTip");
///<summary>&quot;Page Metatypes&quot;</summary> 
public static string PageMetaDataFolderLabel=>T("PageMetaDataFolderLabel");
///<summary>&quot;Page metatypes&quot;</summary> 
public static string PageMetaDataFolderToolTip=>T("PageMetaDataFolderToolTip");
///<summary>&quot;Add Datatype&quot;</summary> 
public static string Add=>T("Add");
///<summary>&quot;Add new global datatype&quot;</summary> 
public static string AddToolTip=>T("AddToolTip");
///<summary>&quot;List Unpublished Data&quot;</summary> 
public static string ViewUnpublishedItems=>T("ViewUnpublishedItems");
///<summary>&quot;Get an overview of data that haven&apos;t been published yet&quot;</summary> 
public static string ViewUnpublishedItemsToolTip=>T("ViewUnpublishedItemsToolTip");
///<summary>&quot;Unpublished data&quot;</summary> 
public static string ViewUnpublishedItems_document_title=>T("ViewUnpublishedItems-document-title");
///<summary>&quot;The list below display data items which are currently being edited or are ready to be approved / published.&quot;</summary> 
public static string ViewUnpublishedItems_document_description=>T("ViewUnpublishedItems-document-description");
///<summary>&quot;No unpublished data.&quot;</summary> 
public static string ViewUnpublishedItems_document_empty_label=>T("ViewUnpublishedItems-document-empty-label");
///<summary>&quot;Add Datafolder&quot;</summary> 
public static string AddDataFolder=>T("AddDataFolder");
///<summary>&quot;Add new datafolder&quot;</summary> 
public static string AddDataFolderToolTip=>T("AddDataFolderToolTip");
///<summary>&quot;Add Metatype&quot;</summary> 
public static string AddMetaDataLabel=>T("AddMetaDataLabel");
///<summary>&quot;Add metatype&quot;</summary> 
public static string AddMetaDataToolTip=>T("AddMetaDataToolTip");
///<summary>&quot;Edit Datatype&quot;</summary> 
public static string Edit=>T("Edit");
///<summary>&quot;Edit selected datatype&quot;</summary> 
public static string EditToolTip=>T("EditToolTip");
///<summary>&quot;Edit&quot;</summary> 
public static string EditDataFolderTypeLabel=>T("EditDataFolderTypeLabel");
///<summary>&quot;Edit selected datafolder&quot;</summary> 
public static string EditDataFolderTypeToolTip=>T("EditDataFolderTypeToolTip");
///<summary>&quot;Edit&quot;</summary> 
public static string EditMetaDataTypeLabel=>T("EditMetaDataTypeLabel");
///<summary>&quot;Edit selected metadata&quot;</summary> 
public static string EditMetaDataTypeToolTip=>T("EditMetaDataTypeToolTip");
///<summary>&quot;Delete Datatype&quot;</summary> 
public static string Delete=>T("Delete");
///<summary>&quot;Delete selected datatype&quot;</summary> 
public static string DeleteToolTip=>T("DeleteToolTip");
///<summary>&quot;Delete&quot;</summary> 
public static string DeleteDataFolderTypeLabel=>T("DeleteDataFolderTypeLabel");
///<summary>&quot;Delete selected datafolder&quot;</summary> 
public static string DeleteDataFolderTypeToolTip=>T("DeleteDataFolderTypeToolTip");
///<summary>&quot;Delete&quot;</summary> 
public static string DeleteMetaDataTypeLabel=>T("DeleteMetaDataTypeLabel");
///<summary>&quot;Delete selected metadata&quot;</summary> 
public static string DeleteMetaDataTypeToolTip=>T("DeleteMetaDataTypeToolTip");
///<summary>&quot;Edit Form Markup&quot;</summary> 
public static string EditFormMarkup=>T("EditFormMarkup");
///<summary>&quot;Modify the layout of the data form using markup&quot;</summary> 
public static string EditFormMarkupToolTip=>T("EditFormMarkupToolTip");
///<summary>&quot;Enable Localization&quot;</summary> 
public static string EnableLocalization=>T("EnableLocalization");
///<summary>&quot;Enable localization&quot;</summary> 
public static string EnableLocalizationToolTip=>T("EnableLocalizationToolTip");
///<summary>&quot;Disable Localization&quot;</summary> 
public static string DisableLocalization=>T("DisableLocalization");
///<summary>&quot;Disable localization&quot;</summary> 
public static string DisableLocalizationToolTip=>T("DisableLocalizationToolTip");
///<summary>&quot;Not yet approved or published&quot;</summary> 
public static string DisabledData=>T("DisabledData");
///<summary>&quot;(undefined [{0}])&quot;</summary> 
public static string UndefinedLabelTemplate(object parameter0)=>string.Format(T("UndefinedLabelTemplate"), parameter0);
///<summary>&quot;(undefined)&quot;</summary> 
public static string UndefinedDataLavelTemplate=>T("UndefinedDataLavelTemplate");
///<summary>&quot;Show in Content perspective&quot;</summary> 
public static string ShowInContent=>T("ShowInContent");
///<summary>&quot;Show in Content perspective&quot;</summary> 
public static string ShowInContentToolTip=>T("ShowInContentToolTip");
///<summary>&quot;Add Data&quot;</summary> 
public static string AddData=>T("AddData");
///<summary>&quot;Add new data&quot;</summary> 
public static string AddDataToolTip=>T("AddDataToolTip");
///<summary>&quot;Edit Data&quot;</summary> 
public static string EditData=>T("EditData");
///<summary>&quot;Edit selected data&quot;</summary> 
public static string EditDataToolTip=>T("EditDataToolTip");
///<summary>&quot;Delete Data&quot;</summary> 
public static string DeleteData=>T("DeleteData");
///<summary>&quot;Delete selected data&quot;</summary> 
public static string DeleteDataToolTip=>T("DeleteDataToolTip");
///<summary>&quot;Translate Data&quot;</summary> 
public static string LocalizeData=>T("LocalizeData");
///<summary>&quot;Translate selected data&quot;</summary> 
public static string LocalizeDataToolTip=>T("LocalizeDataToolTip");
///<summary>&quot;Publication settings&quot;</summary> 
public static string PublicationSettings_FieldGroupLabel=>T("PublicationSettings.FieldGroupLabel");
///<summary>&quot;Status&quot;</summary> 
public static string PublicationStatus_Label=>T("PublicationStatus.Label");
///<summary>&quot;Send the data to another publication status.&quot;</summary> 
public static string PublicationStatus_Help=>T("PublicationStatus.Help");
///<summary>&quot;Publish date&quot;</summary> 
public static string PublishDate_Label=>T("PublishDate.Label");
///<summary>&quot;Specify at which date and time you want the data to be published automatically.&quot;</summary> 
public static string PublishDate_Help=>T("PublishDate.Help");
///<summary>&quot;Unpublish date&quot;</summary> 
public static string UnpublishDate_Label=>T("UnpublishDate.Label");
///<summary>&quot;Specify at which date and time you want the data to be unpublished automatically.&quot;</summary> 
public static string UnpublishDate_Help=>T("UnpublishDate.Help");
///<summary>&quot;New Datatype&quot;</summary> 
public static string AddNewInterfaceTypeStep1_DocumentTitle=>T("AddNewInterfaceTypeStep1.DocumentTitle");
///<summary>&quot;New Page Metatype&quot;</summary> 
public static string AddNewCompositionTypeWorkflow_DocumentTitle=>T("AddNewCompositionTypeWorkflow.DocumentTitle");
///<summary>&quot;New Page Datafolder&quot;</summary> 
public static string AddNewAggregationTypeWorkflow_DocumentTitle=>T("AddNewAggregationTypeWorkflow.DocumentTitle");
///<summary>&quot;Settings&quot;</summary> 
public static string EditorCommon_SettingsTab=>T("EditorCommon.SettingsTab");
///<summary>&quot;Type title&quot;</summary> 
public static string EditorCommon_LabelTitleGroup=>T("EditorCommon.LabelTitleGroup");
///<summary>&quot;Programmatic naming and services&quot;</summary> 
public static string EditorCommon_LabelProgrammaticNamingAndServices=>T("EditorCommon.LabelProgrammaticNamingAndServices");
///<summary>&quot;Programmatic naming&quot;</summary> 
public static string EditorCommon_LabelProgrammaticNaming=>T("EditorCommon.LabelProgrammaticNaming");
///<summary>&quot;Type name&quot;</summary> 
public static string EditorCommon_LabelTypeName=>T("EditorCommon.LabelTypeName");
///<summary>&quot;The technical name of the data type (ex. Product). This is used to identify this type in code and should not be changed once used externally.&quot;</summary> 
public static string EditorCommon_HelpTypeName=>T("EditorCommon.HelpTypeName");
///<summary>&quot;Type namespace&quot;</summary> 
public static string EditorCommon_LabelTypeNamespace=>T("EditorCommon.LabelTypeNamespace");
///<summary>&quot;The namespace (module / category name) of the type. This is used to identify this type in code and should not be changed once used externally.&quot;</summary> 
public static string EditorCommon_HelpTypeNamespace=>T("EditorCommon.HelpTypeNamespace");
///<summary>&quot;Title&quot;</summary> 
public static string EditorCommon_LabelTitle=>T("EditorCommon.LabelTitle");
///<summary>&quot;Use this entry to specify a user friendly name. This name is used in most UI.&quot;</summary> 
public static string EditorCommon_HelpTitle=>T("EditorCommon.HelpTitle");
///<summary>&quot;Fields&quot;</summary> 
public static string EditorCommon_LabelFields=>T("EditorCommon.LabelFields");
///<summary>&quot;Key field type&quot;</summary> 
public static string EditorCommon_KeyFieldTypeLabel=>T("EditorCommon.KeyFieldTypeLabel");
///<summary>&quot;The type of the primary key. Use the default &apos;Guid&apos; type for optimal performance and &apos;RandomString&apos; for shorter data urls.&quot;</summary> 
public static string EditorCommon_KeyFieldTypeHelp=>T("EditorCommon.KeyFieldTypeHelp");
///<summary>&quot;Guid&quot;</summary> 
public static string EditorCommon_KeyFieldType_Guid=>T("EditorCommon.KeyFieldType.Guid");
///<summary>&quot;Random String, 4 characters long&quot;</summary> 
public static string EditorCommon_KeyFieldType_RandomString4=>T("EditorCommon.KeyFieldType.RandomString4");
///<summary>&quot;Random String, 8 characters long&quot;</summary> 
public static string EditorCommon_KeyFieldType_RandomString8=>T("EditorCommon.KeyFieldType.RandomString8");
///<summary>&quot;Services&quot;</summary> 
public static string EditorCommon_ServicesLabel=>T("EditorCommon.ServicesLabel");
///<summary>&quot;Short URL name&quot;</summary> 
public static string EditorCommon_InternalUrlPrefixLabel=>T("EditorCommon.InternalUrlPrefixLabel");
///<summary>&quot;When specified, allows data items of the current type to be referenced in content. The internal links will have format &apos;~/{ShortURLName}({id})&apos;, f.e. &apos;~/product(aIkH34F)&quot;</summary> 
public static string EditorCommon_InternalUrlPrefixHelp=>T("EditorCommon.InternalUrlPrefixHelp");
///<summary>&quot;Has caching&quot;</summary> 
public static string EditorCommon_HasCaching=>T("EditorCommon.HasCaching");
///<summary>&quot;Has publishing&quot;</summary> 
public static string EditorCommon_HasPublishing=>T("EditorCommon.HasPublishing");
///<summary>&quot;Is localizable data&quot;</summary> 
public static string EditorCommon_HasLocalization=>T("EditorCommon.HasLocalization");
///<summary>&quot;Delete Data?&quot;</summary> 
public static string DeleteGeneratedDataStep1_LabelFieldGroup=>T("DeleteGeneratedDataStep1.LabelFieldGroup");
///<summary>&quot;Delete data?&quot;</summary> 
public static string DeleteGeneratedDataStep1_Text=>T("DeleteGeneratedDataStep1.Text");
///<summary>&quot;There is some referenced data that will also be deleted, do you want to continue?&quot;</summary> 
public static string DeleteDataConfirmationText=>T("DeleteDataConfirmationText");
///<summary>&quot;Delete Datatype&quot;</summary> 
public static string DeleteGeneratedInterfaceStep1_LabelFieldGroup=>T("DeleteGeneratedInterfaceStep1.LabelFieldGroup");
///<summary>&quot;Delete the datatype&quot;</summary> 
public static string DeleteGeneratedInterfaceStep1_Text=>T("DeleteGeneratedInterfaceStep1.Text");
///<summary>&quot;Cascade delete error&quot;</summary> 
public static string CascadeDeleteErrorTitle=>T("CascadeDeleteErrorTitle");
///<summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
public static string CascadeDeleteErrorMessage=>T("CascadeDeleteErrorMessage");
///<summary>&quot;Delete Datatype&quot;</summary> 
public static string DeleteAggregationTypeWorkflow_LabelFieldGroup=>T("DeleteAggregationTypeWorkflow.LabelFieldGroup");
///<summary>&quot;Delete the datatype&quot;</summary> 
public static string DeleteAggregationTypeWorkflow_Text=>T("DeleteAggregationTypeWorkflow.Text");
///<summary>&quot;Error&quot;</summary> 
public static string DeleteAggregationTypeWorkflow_ErrorTitle=>T("DeleteAggregationTypeWorkflow.ErrorTitle");
///<summary>&quot;Cannot delete type &apos;{0}&apos; since it is used by a page type.&quot;</summary> 
public static string DeleteAggregationTypeWorkflow_IsUsedByPageType(object parameter0)=>string.Format(T("DeleteAggregationTypeWorkflow.IsUsedByPageType"), parameter0);
///<summary>&quot;Delete Datatype&quot;</summary> 
public static string DeleteCompositionTypeWorkflow_LabelFieldGroup=>T("DeleteCompositionTypeWorkflow.LabelFieldGroup");
///<summary>&quot;Delete the datatype&quot;</summary> 
public static string DeleteCompositionTypeWorkflow_Text=>T("DeleteCompositionTypeWorkflow.Text");
///<summary>&quot;Error&quot;</summary> 
public static string DeleteCompositionTypeWorkflow_ErrorTitle=>T("DeleteCompositionTypeWorkflow.ErrorTitle");
///<summary>&quot;Cannot delete type &apos;{0}&apos; since there&apos;re types that referenced to it.&quot;</summary> 
public static string DeleteCompositionTypeWorkflow_TypeIsReferenced(object parameter0)=>string.Format(T("DeleteCompositionTypeWorkflow.TypeIsReferenced"), parameter0);
///<summary>&quot;Cannot delete type &apos;{0}&apos; since it is used by a page type.&quot;</summary> 
public static string DeleteCompositionTypeWorkflow_IsUsedByPageType(object parameter0)=>string.Format(T("DeleteCompositionTypeWorkflow.IsUsedByPageType"), parameter0);
///<summary>&quot;To Xml&quot;</summary> 
public static string ToXmlLabel=>T("ToXmlLabel");
///<summary>&quot;To Xml&quot;</summary> 
public static string ToXmlToolTip=>T("ToXmlToolTip");
///<summary>&quot;Enable Localization&quot;</summary> 
public static string EnableTypeLocalizationWorkflow_Dialog_Label=>T("EnableTypeLocalizationWorkflow.Dialog.Label");
///<summary>&quot;Enable localization&quot;</summary> 
public static string EnableTypeLocalizationWorkflow_Step1_FieldGroup_Label=>T("EnableTypeLocalizationWorkflow.Step1.FieldGroup.Label");
///<summary>&quot;Move existing data to ...&quot;</summary> 
public static string EnableTypeLocalizationWorkflow_Step1_CultureSelector_Label=>T("EnableTypeLocalizationWorkflow.Step1.CultureSelector.Label");
///<summary>&quot;When you enable &apos;localization&apos; on a data type, all data must belong to a language. Select the language existing data should now be moved to.&quot;</summary> 
public static string EnableTypeLocalizationWorkflow_Step1_CultureSelector_Help=>T("EnableTypeLocalizationWorkflow.Step1.CultureSelector.Help");
///<summary>&quot;Confirmation&quot;</summary> 
public static string EnableTypeLocalizationWorkflow_Step2_Title=>T("EnableTypeLocalizationWorkflow.Step2.Title");
///<summary>&quot;Data type will be localized and data copied to selected locale. Click Finish to continue.&quot;</summary> 
public static string EnableTypeLocalizationWorkflow_Step2_Description=>T("EnableTypeLocalizationWorkflow.Step2.Description");
///<summary>&quot;Warning&quot;</summary> 
public static string EnableTypeLocalizationWorkflow_Step3_Title=>T("EnableTypeLocalizationWorkflow.Step3.Title");
///<summary>&quot;There&apos;s some datatypes which have references to the type. While localizing the data will be copied to all languages in order to prevent appearing of broken references.&quot;</summary> 
public static string EnableTypeLocalizationWorkflow_Step3_Description=>T("EnableTypeLocalizationWorkflow.Step3.Description");
///<summary>&quot;Missing active locales&quot;</summary> 
public static string EnableTypeLocalizationWorkflow_Abort_Title=>T("EnableTypeLocalizationWorkflow.Abort.Title");
///<summary>&quot;There are no added active locales. Add at least one before localization this datatype.&quot;</summary> 
public static string EnableTypeLocalizationWorkflow_Abort_Description=>T("EnableTypeLocalizationWorkflow.Abort.Description");
///<summary>&quot;Disable Localization&quot;</summary> 
public static string DisableTypeLocalizationWorkflow_Dialog_Label=>T("DisableTypeLocalizationWorkflow.Dialog.Label");
///<summary>&quot;Disable localization&quot;</summary> 
public static string DisableTypeLocalizationWorkflow_Step1_FieldGroup_Label=>T("DisableTypeLocalizationWorkflow.Step1.FieldGroup.Label");
///<summary>&quot;Keep data from ...&quot;</summary> 
public static string DisableTypeLocalizationWorkflow_Step1_CultureSelector_Label=>T("DisableTypeLocalizationWorkflow.Step1.CultureSelector.Label");
///<summary>&quot;When localization is disabled on a datatype only one translation can be kept. Data from other languages will be lost.&quot;</summary> 
public static string DisableTypeLocalizationWorkflow_Step1_CultureSelector_Help=>T("DisableTypeLocalizationWorkflow.Step1.CultureSelector.Help");
///<summary>&quot;Confirmation&quot;</summary> 
public static string DisableTypeLocalizationWorkflow_Step2_Title=>T("DisableTypeLocalizationWorkflow.Step2.Title");
///<summary>&quot;All data from other locales than the one selected will be lost. Click Finish to continue.&quot;</summary> 
public static string DisableTypeLocalizationWorkflow_Step2_Description=>T("DisableTypeLocalizationWorkflow.Step2.Description");
///<summary>&quot;Failed to translate data&quot;</summary> 
public static string LocalizeDataWorkflow_ShowError_LayoutLabel=>T("LocalizeDataWorkflow.ShowError.LayoutLabel");
///<summary>&quot;Translation errors&quot;</summary> 
public static string LocalizeDataWorkflow_ShowError_InfoTableCaption=>T("LocalizeDataWorkflow.ShowError.InfoTableCaption");
///<summary>&quot;This data has already been translated. The translated version belongs to a different group.&quot;</summary> 
public static string LocalizeDataWorkflow_ShowError_AlreadyTranslated=>T("LocalizeDataWorkflow.ShowError.AlreadyTranslated");
///<summary>&quot;The following fields has a reference to a data type. You should translate these data items before you can translate this data item&quot;</summary> 
public static string LocalizeDataWorkflow_ShowError_Description=>T("LocalizeDataWorkflow.ShowError.Description");
///<summary>&quot;The field &apos;{0}&apos; is referencing data of type &apos;{1}&apos; with the label &apos;{2}&apos;&quot;</summary> 
public static string LocalizeDataWorkflow_ShowError_FieldErrorFormat(object parameter0,object parameter1,object parameter2)=>string.Format(T("LocalizeDataWorkflow.ShowError.FieldErrorFormat"), parameter0,parameter1,parameter2);
///<summary>&quot;Error&quot;</summary> 
public static string AddNewInterfaceTypeStep1_ErrorTitle=>T("AddNewInterfaceTypeStep1.ErrorTitle");
///<summary>&quot;Error&quot;</summary> 
public static string EditInterfaceTypeStep1_ErrorTitle=>T("EditInterfaceTypeStep1.ErrorTitle");
///<summary>&quot;Error&quot;</summary> 
public static string AddNewCompositionTypeWorkflow_ErrorTitle=>T("AddNewCompositionTypeWorkflow.ErrorTitle");
///<summary>&quot;Error&quot;</summary> 
public static string EditCompositionTypeWorkflow_ErrorTitle=>T("EditCompositionTypeWorkflow.ErrorTitle");
///<summary>&quot;XML Result&quot;</summary> 
public static string DataTypeDescriptorToXmlLabel=>T("DataTypeDescriptorToXmlLabel");
///<summary>&quot;This type has custom form markup&quot;</summary> 
public static string FormMarkupInfo_Dialog_Label=>T("FormMarkupInfo.Dialog.Label");
///<summary>&quot;Your field changes will not affect the form for editing data. Do &apos;{0}&apos; to change the form or delete the file &apos;{1}&apos;.&quot;</summary> 
public static string FormMarkupInfo_Message(object parameter0,object parameter1)=>string.Format(T("FormMarkupInfo.Message"), parameter0,parameter1);
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_GenericPublishProcessController {
///<summary>&quot;Send to Draft&quot;</summary> 
public static string SendToDraft=>T("SendToDraft");
///<summary>&quot;&quot;</summary> 
public static string SendToDraftToolTip=>T("SendToDraftToolTip");
///<summary>&quot;Publish&quot;</summary> 
public static string Publish=>T("Publish");
///<summary>&quot;Publish to site&quot;</summary> 
public static string PublishToolTip=>T("PublishToolTip");
///<summary>&quot;Unpublish&quot;</summary> 
public static string Unpublish=>T("Unpublish");
///<summary>&quot;Set to draft status and remove the published version&quot;</summary> 
public static string UnpublishToolTip=>T("UnpublishToolTip");
///<summary>&quot;Send for Approval&quot;</summary> 
public static string SendForApproval=>T("SendForApproval");
///<summary>&quot;Send for approval&quot;</summary> 
public static string SendForApprovalToolTip=>T("SendForApprovalToolTip");
///<summary>&quot;Send for Publication&quot;</summary> 
public static string SendForPublication=>T("SendForPublication");
///<summary>&quot;Send for publication&quot;</summary> 
public static string SendForPublicationToolTip=>T("SendForPublicationToolTip");
///<summary>&quot;Undo Changes&quot;</summary> 
public static string UndoPublishedChanges=>T("UndoPublishedChanges");
///<summary>&quot;Undo unpublished changes&quot;</summary> 
public static string UndoPublishedChangesToolTip=>T("UndoPublishedChangesToolTip");
///<summary>&quot;Action Not Possible&quot;</summary> 
public static string ValidationErrorTitle=>T("ValidationErrorTitle");
///<summary>&quot;The data did not validate with the following errors:&quot;</summary> 
public static string ValidationErrorMessage=>T("ValidationErrorMessage");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_LocalizationElementProvider {
///<summary>&quot;Languages&quot;</summary> 
public static string ElementProvider_RootFolderLabel=>T("ElementProvider.RootFolderLabel");
///<summary>&quot;Explore and manage installed languages&quot;</summary> 
public static string ElementProvider_RootFolderToolTip=>T("ElementProvider.RootFolderToolTip");
///<summary>&quot;Default&quot;</summary> 
public static string ElementProvider_DefaultLabel=>T("ElementProvider.DefaultLabel");
///<summary>&quot;No Languages Available&quot;</summary> 
public static string AddSystemLocaleWorkflow_NoMoreLocalesTitle=>T("AddSystemLocaleWorkflow.NoMoreLocalesTitle");
///<summary>&quot;You have installed all possible languages.&quot;</summary> 
public static string AddSystemLocaleWorkflow_NoMoreLocalesMessage=>T("AddSystemLocaleWorkflow.NoMoreLocalesMessage");
///<summary>&quot;Add Language&quot;</summary> 
public static string AddSystemLocaleWorkflow_AddElementActionLabel=>T("AddSystemLocaleWorkflow.AddElementActionLabel");
///<summary>&quot;Add new language&quot;</summary> 
public static string AddSystemLocaleWorkflow_AddElementActionToolTip=>T("AddSystemLocaleWorkflow.AddElementActionToolTip");
///<summary>&quot;Add Language&quot;</summary> 
public static string AddSystemLocaleWorkflow_Dialog_Label=>T("AddSystemLocaleWorkflow.Dialog.Label");
///<summary>&quot;Languages&quot;</summary> 
public static string AddSystemLocaleWorkflow_CultureSelector_Label=>T("AddSystemLocaleWorkflow.CultureSelector.Label");
///<summary>&quot;The list of available, uninstalled languages. Language packages may be installed for additional options.&quot;</summary> 
public static string AddSystemLocaleWorkflow_CultureSelector_Help=>T("AddSystemLocaleWorkflow.CultureSelector.Help");
///<summary>&quot;URL mapping name&quot;</summary> 
public static string AddSystemLocaleWorkflow_UrlMappingName_Label=>T("AddSystemLocaleWorkflow.UrlMappingName.Label");
///<summary>&quot;This string will be inserted into the URL of pages published in a given language. The website &quot;default&quot; language may leave this entry blank.&quot;</summary> 
public static string AddSystemLocaleWorkflow_UrlMappingName_Help=>T("AddSystemLocaleWorkflow.UrlMappingName.Help");
///<summary>&quot;User access&quot;</summary> 
public static string AddSystemLocaleWorkflow_AllUsersAccess_Label=>T("AddSystemLocaleWorkflow.AllUsersAccess.Label");
///<summary>&quot;Give access to all users&quot;</summary> 
public static string AddSystemLocaleWorkflow_AllUsersAccess_ItemLabel=>T("AddSystemLocaleWorkflow.AllUsersAccess.ItemLabel");
///<summary>&quot;If checked, the language will be made available to all registered users for viewing and editing&quot;</summary> 
public static string AddSystemLocaleWorkflow_AllUsersAccess_Help=>T("AddSystemLocaleWorkflow.AllUsersAccess.Help");
///<summary>&quot;URL mapping name is already in use&quot;</summary> 
public static string AddSystemLocaleWorkflow_UrlMappingName_InUseMessage=>T("AddSystemLocaleWorkflow.UrlMappingName.InUseMessage");
///<summary>&quot;Edit Language&quot;</summary> 
public static string EditSystemLocaleWorkflow_EditElementActionLabel=>T("EditSystemLocaleWorkflow.EditElementActionLabel");
///<summary>&quot;Edit language&quot;</summary> 
public static string EditSystemLocaleWorkflow_EditElementActionToolTip=>T("EditSystemLocaleWorkflow.EditElementActionToolTip");
///<summary>&quot;Edit Language&quot;</summary> 
public static string EditSystemLocaleWorkflow_Dialog_Label=>T("EditSystemLocaleWorkflow.Dialog.Label");
///<summary>&quot;Language properties&quot;</summary> 
public static string EditSystemLocaleWorkflow_FieldGroup_Label=>T("EditSystemLocaleWorkflow.FieldGroup.Label");
///<summary>&quot;URL mapping name&quot;</summary> 
public static string EditSystemLocaleWorkflow_UrlMappingName_Label=>T("EditSystemLocaleWorkflow.UrlMappingName.Label");
///<summary>&quot;URL mapping name&quot;</summary> 
public static string EditSystemLocaleWorkflow_UrlMappingName_Help=>T("EditSystemLocaleWorkflow.UrlMappingName.Help");
///<summary>&quot;URL mapping name is already in use&quot;</summary> 
public static string EditSystemLocaleWorkflow_UrlMappingName_InUseMessage=>T("EditSystemLocaleWorkflow.UrlMappingName.InUseMessage");
///<summary>&quot;Set as Default&quot;</summary> 
public static string DefineDefaultActiveLocaleWorkflow_ElementActionLabel=>T("DefineDefaultActiveLocaleWorkflow.ElementActionLabel");
///<summary>&quot;Set as default language&quot;</summary> 
public static string DefineDefaultActiveLocaleWorkflow_ElementActionToolTip=>T("DefineDefaultActiveLocaleWorkflow.ElementActionToolTip");
///<summary>&quot;Remove Language&quot;</summary> 
public static string RemoveSystemLocaleWorkflow_RemoveElementActionLabel=>T("RemoveSystemLocaleWorkflow.RemoveElementActionLabel");
///<summary>&quot;Remove language&quot;</summary> 
public static string RemoveSystemLocaleWorkflow_RemoveElementActionToolTip=>T("RemoveSystemLocaleWorkflow.RemoveElementActionToolTip");
///<summary>&quot;Remove Language?&quot;</summary> 
public static string RemoveSystemLocaleWorkflow_Dialog_Label=>T("RemoveSystemLocaleWorkflow.Dialog.Label");
///<summary>&quot;Cannot Remove Last Language&quot;</summary> 
public static string RemoveSystemLocaleWorkflow_Abort_Title=>T("RemoveSystemLocaleWorkflow.Abort.Title");
///<summary>&quot;You are about to remove a language that is the only language for one or more users. Please add other languages to these users and try again.&quot;</summary> 
public static string RemoveSystemLocaleWorkflow_Abort_Description=>T("RemoveSystemLocaleWorkflow.Abort.Description");
///<summary>&quot;Remove this language?&quot;</summary> 
public static string RemoveSystemLocaleWorkflow_Confirm_Description=>T("RemoveSystemLocaleWorkflow.Confirm.Description");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_MasterPagePageTemplate {
///<summary>&quot;Add New Master Page&quot;</summary> 
public static string AddNewMasterPagePageTemplateWorkflow_LabelDialog=>T("AddNewMasterPagePageTemplateWorkflow.LabelDialog");
///<summary>&quot;Edit Master Page&quot;</summary> 
public static string EditMasterPageAction_Label=>T("EditMasterPageAction.Label");
///<summary>&quot;Edit source code of the master page&quot;</summary> 
public static string EditMasterPageAction_ToolTip=>T("EditMasterPageAction.ToolTip");
///<summary>&quot;Delete&quot;</summary> 
public static string DeleteMasterPageAction_Label=>T("DeleteMasterPageAction.Label");
///<summary>&quot;Delete page template&quot;</summary> 
public static string DeleteMasterPageAction_ToolTip=>T("DeleteMasterPageAction.ToolTip");
///<summary>&quot;Validation error&quot;</summary> 
public static string EditTemplate_Validation_DialogTitle=>T("EditTemplate.Validation.DialogTitle");
///<summary>&quot;Compilation failed: {0}&quot;</summary> 
public static string EditTemplate_Validation_CompilationFailed(object parameter0)=>string.Format(T("EditTemplate.Validation.CompilationFailed"), parameter0);
///<summary>&quot;Page template class does not inherit &apos;{0}&apos;&quot;</summary> 
public static string EditTemplate_Validation_IncorrectBaseClass(object parameter0)=>string.Format(T("EditTemplate.Validation.IncorrectBaseClass"), parameter0);
///<summary>&quot;Failed to evaluate page template property &apos;{0}&apos;. Exception: {1}&quot;</summary> 
public static string EditTemplate_Validation_PropertyError(object parameter0,object parameter1)=>string.Format(T("EditTemplate.Validation.PropertyError"), parameter0,parameter1);
///<summary>&quot;It is not allowed to change the template ID through the current workflow. The original template ID is &apos;{0}&apos;&quot;</summary> 
public static string EditTemplate_Validation_TemplateIdChanged(object parameter0)=>string.Format(T("EditTemplate.Validation.TemplateIdChanged"), parameter0);
///<summary>&quot;Add New Master Page Template&quot;</summary> 
public static string AddNewMasterPagePageTemplate_LabelDialog=>T("AddNewMasterPagePageTemplate.LabelDialog");
///<summary>&quot;Template Title&quot;</summary> 
public static string AddNewMasterPagePageTemplate_LabelTemplateTitle=>T("AddNewMasterPagePageTemplate.LabelTemplateTitle");
///<summary>&quot;The title identifies this template in lists. Consider selecting a short but meaningful name.&quot;</summary> 
public static string AddNewMasterPagePageTemplate_LabelTemplateTitleHelp=>T("AddNewMasterPagePageTemplate.LabelTemplateTitleHelp");
///<summary>&quot;Copy from&quot;</summary> 
public static string AddNewMasterPagePageTemplate_LabelCopyFrom=>T("AddNewMasterPagePageTemplate.LabelCopyFrom");
///<summary>&quot;You can copy the markup from another Layout Template by selecting it in this list.&quot;</summary> 
public static string AddNewMasterPagePageTemplate_LabelCopyFromHelp=>T("AddNewMasterPagePageTemplate.LabelCopyFromHelp");
///<summary>&quot;(New template)&quot;</summary> 
public static string AddNewMasterPagePageTemplate_LabelCopyFromEmptyOption=>T("AddNewMasterPagePageTemplate.LabelCopyFromEmptyOption");
///<summary>&quot;Title already used&quot;</summary> 
public static string AddNewMasterPagePageTemplateWorkflow_TitleInUseTitle=>T("AddNewMasterPagePageTemplateWorkflow.TitleInUseTitle");
///<summary>&quot;The title is too long (used as part of a filename).&quot;</summary> 
public static string AddNewMasterPagePageTemplateWorkflow_TitleTooLong=>T("AddNewMasterPagePageTemplateWorkflow.TitleTooLong");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.MasterPagePageTemplate", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_MethodBasedFunctionProviderElementProvider {
///<summary>&quot;C# Functions&quot;</summary> 
public static string RootFolderLabel=>T("RootFolderLabel");
///<summary>&quot;Method functions&quot;</summary> 
public static string RootFolderToolTip=>T("RootFolderToolTip");
///<summary>&quot;Delete This Function&quot;</summary> 
public static string DeleteFunction_LabelFieldGroup=>T("DeleteFunction.LabelFieldGroup");
///<summary>&quot;Delete this function&quot;</summary> 
public static string DeleteFunction_Text=>T("DeleteFunction.Text");
///<summary>&quot;Add External C# function&quot;</summary> 
public static string Add=>T("Add");
///<summary>&quot;Add an external C# method based function.&quot;</summary> 
public static string AddToolTip=>T("AddToolTip");
///<summary>&quot;Add Inline C# function&quot;</summary> 
public static string Create=>T("Create");
///<summary>&quot;Add an inline C# method based function.&quot;</summary> 
public static string CreateToolTip=>T("CreateToolTip");
///<summary>&quot;Edit&quot;</summary> 
public static string Edit=>T("Edit");
///<summary>&quot;Edit Function.&quot;</summary> 
public static string EditToolTip=>T("EditToolTip");
///<summary>&quot;Delete&quot;</summary> 
public static string Delete=>T("Delete");
///<summary>&quot;Delete Function.&quot;</summary> 
public static string DeleteToolTip=>T("DeleteToolTip");
///<summary>&quot;Type&quot;</summary> 
public static string AddNewMethodBasedFunctionStep1_LabelType=>T("AddNewMethodBasedFunctionStep1.LabelType");
///<summary>&quot;The type that contains the method in question&quot;</summary> 
public static string AddNewMethodBasedFunctionStep1_LabelTypeHelp=>T("AddNewMethodBasedFunctionStep1.LabelTypeHelp");
///<summary>&quot;Method name&quot;</summary> 
public static string AddNewMethodBasedFunctionStep2_LabelMethodName=>T("AddNewMethodBasedFunctionStep2.LabelMethodName");
///<summary>&quot;&quot;</summary> 
public static string AddNewMethodBasedFunctionStep2_HelpMethodName=>T("AddNewMethodBasedFunctionStep2.HelpMethodName");
///<summary>&quot;Method Name&quot;</summary> 
public static string AddNewMethodBasedFunctionStep3_LabelMethodName=>T("AddNewMethodBasedFunctionStep3.LabelMethodName");
///<summary>&quot;&quot;</summary> 
public static string AddNewMethodBasedFunctionStep3_HelpMethodName=>T("AddNewMethodBasedFunctionStep3.HelpMethodName");
///<summary>&quot;Namespace Name&quot;</summary> 
public static string AddNewMethodBasedFunctionStep3_LabelNamespaceName=>T("AddNewMethodBasedFunctionStep3.LabelNamespaceName");
///<summary>&quot;&quot;</summary> 
public static string AddNewMethodBasedFunctionStep3_HelpNamespaceName=>T("AddNewMethodBasedFunctionStep3.HelpNamespaceName");
///<summary>&quot;Error&quot;</summary> 
public static string AddNewMethodBasedFunctionStep3_LabelError=>T("AddNewMethodBasedFunctionStep3.LabelError");
///<summary>&quot;Cascade delete error&quot;</summary> 
public static string CascadeDeleteErrorTitle=>T("CascadeDeleteErrorTitle");
///<summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
public static string CascadeDeleteErrorMessage=>T("CascadeDeleteErrorMessage");
///<summary>&quot;Could not find type&quot;</summary> 
public static string AddFunction_CouldNotFindType=>T("AddFunction.CouldNotFindType");
///<summary>&quot;The type does not contain any valid method&quot;</summary> 
public static string AddFunction_TypeHasNoValidMethod=>T("AddFunction.TypeHasNoValidMethod");
///<summary>&quot;The type is marked as either abstract or static. Calling methods on abstract or static types is not supported.&quot;</summary> 
public static string AddFunction_TypeIsAbstractOrStatic=>T("AddFunction.TypeIsAbstractOrStatic");
///<summary>&quot;The type must not have overloads&quot;</summary> 
public static string AddFunction_TypeMustNotHaveOverloads=>T("AddFunction.TypeMustNotHaveOverloads");
///<summary>&quot;Method name must be non-empty&quot;</summary> 
public static string AddFunction_MethodNameIsEmpty=>T("AddFunction.MethodNameIsEmpty");
///<summary>&quot;Namespace must be like A.B.C - not start and end with .&quot;</summary> 
public static string AddFunction_InvalidNamespace=>T("AddFunction.InvalidNamespace");
///<summary>&quot;The function name &apos;{0}&apos; is already used&quot;</summary> 
public static string AddFunction_NameAlreadyUsed(object parameter0)=>string.Format(T("AddFunction.NameAlreadyUsed"), parameter0);
///<summary>&quot;Edit Method Based Query&quot;</summary> 
public static string EditMethodBasedFunction_LabelFieldGroup=>T("EditMethodBasedFunction.LabelFieldGroup");
///<summary>&quot;Method Name&quot;</summary> 
public static string EditMethodBasedFunction_LabelMethodName=>T("EditMethodBasedFunction.LabelMethodName");
///<summary>&quot;The name that the function should be know under.&quot;</summary> 
public static string EditMethodBasedFunction_LabelMethodNameHelp=>T("EditMethodBasedFunction.LabelMethodNameHelp");
///<summary>&quot;Namespace Name&quot;</summary> 
public static string EditMethodBasedFunction_LabelNamespaceName=>T("EditMethodBasedFunction.LabelNamespaceName");
///<summary>&quot;The namespace to place the method under.&quot;</summary> 
public static string EditMethodBasedFunction_LabelNamespaceNameHelp=>T("EditMethodBasedFunction.LabelNamespaceNameHelp");
///<summary>&quot;Type&quot;</summary> 
public static string EditMethodBasedFunction_LabelType=>T("EditMethodBasedFunction.LabelType");
///<summary>&quot;The type that contains the method in question.&quot;</summary> 
public static string EditMethodBasedFunction_LabelTypeHelp=>T("EditMethodBasedFunction.LabelTypeHelp");
///<summary>&quot;Method&quot;</summary> 
public static string EditMethodBasedFunction_LabelMethod=>T("EditMethodBasedFunction.LabelMethod");
///<summary>&quot;The method to invoke on the type.&quot;</summary> 
public static string EditMethodBasedFunction_LabelMethodHelp=>T("EditMethodBasedFunction.LabelMethodHelp");
///<summary>&quot;Error&quot;</summary> 
public static string EditMethodBasedFunction_LabelError=>T("EditMethodBasedFunction.LabelError");
///<summary>&quot;Method name must be non-empty&quot;</summary> 
public static string EditFunction_MethodNameEmpty=>T("EditFunction.MethodNameEmpty");
///<summary>&quot;Namespace must not start and end with . - example A.B.C&quot;</summary> 
public static string EditFunction_InvalidNamespace=>T("EditFunction.InvalidNamespace");
///<summary>&quot;Could not find type&quot;</summary> 
public static string EditFunction_TypeNotFound=>T("EditFunction.TypeNotFound");
///<summary>&quot;The type does not contain the method&quot;</summary> 
public static string EditFunction_MethodNotInType=>T("EditFunction.MethodNotInType");
///<summary>&quot;The type does not contain any valid method&quot;</summary> 
public static string EditFunction_NoValidMethod=>T("EditFunction.NoValidMethod");
///<summary>&quot;The type must not have overloads&quot;</summary> 
public static string EditFunction_MethodOverloadsNotAllowed=>T("EditFunction.MethodOverloadsNotAllowed");
///<summary>&quot;Settings&quot;</summary> 
public static string AddInlineFunctionWorkflow_FieldGroup_Label=>T("AddInlineFunctionWorkflow.FieldGroup.Label");
///<summary>&quot;Name&quot;</summary> 
public static string AddInlineFunctionWorkflow_MethodName_Label=>T("AddInlineFunctionWorkflow.MethodName.Label");
///<summary>&quot;The name of the method you want to create&quot;</summary> 
public static string AddInlineFunctionWorkflow_MethodName_Help=>T("AddInlineFunctionWorkflow.MethodName.Help");
///<summary>&quot;Namespace&quot;</summary> 
public static string AddInlineFunctionWorkflow_MethodNamespace_Label=>T("AddInlineFunctionWorkflow.MethodNamespace.Label");
///<summary>&quot;The namespace of the method you want to create&quot;</summary> 
public static string AddInlineFunctionWorkflow_MethodNamespace_Help=>T("AddInlineFunctionWorkflow.MethodNamespace.Help");
///<summary>&quot;Description&quot;</summary> 
public static string AddInlineFunctionWorkflow_MethodDescription_Label=>T("AddInlineFunctionWorkflow.MethodDescription.Label");
///<summary>&quot;A short description of the function&quot;</summary> 
public static string AddInlineFunctionWorkflow_MethodDescription_Help=>T("AddInlineFunctionWorkflow.MethodDescription.Help");
///<summary>&quot;Template&quot;</summary> 
public static string AddInlineFunctionWorkflow_InlineFunctionMethodTemplate_Label=>T("AddInlineFunctionWorkflow.InlineFunctionMethodTemplate.Label");
///<summary>&quot;Select the template that you want to use for the new method.&quot;</summary> 
public static string AddInlineFunctionWorkflow_InlineFunctionMethodTemplate_Help=>T("AddInlineFunctionWorkflow.InlineFunctionMethodTemplate.Help");
///<summary>&quot;Settings&quot;</summary> 
public static string EditInlineFunctionWorkflow_FieldGroup_Label=>T("EditInlineFunctionWorkflow.FieldGroup.Label");
///<summary>&quot;Name&quot;</summary> 
public static string EditInlineFunctionWorkflow_MethodName_Label=>T("EditInlineFunctionWorkflow.MethodName.Label");
///<summary>&quot;The name of the method you want to create&quot;</summary> 
public static string EditInlineFunctionWorkflow_MethodName_Help=>T("EditInlineFunctionWorkflow.MethodName.Help");
///<summary>&quot;Namespace&quot;</summary> 
public static string EditInlineFunctionWorkflow_MethodNamespace_Label=>T("EditInlineFunctionWorkflow.MethodNamespace.Label");
///<summary>&quot;The namespace of the method you want to create&quot;</summary> 
public static string EditInlineFunctionWorkflow_MethodNamespace_Help=>T("EditInlineFunctionWorkflow.MethodNamespace.Help");
///<summary>&quot;Description&quot;</summary> 
public static string EditInlineFunctionWorkflow_MethodDescription_Label=>T("EditInlineFunctionWorkflow.MethodDescription.Label");
///<summary>&quot;A short description of the function&quot;</summary> 
public static string EditInlineFunctionWorkflow_MethodDescription_Help=>T("EditInlineFunctionWorkflow.MethodDescription.Help");
///<summary>&quot;Debug&quot;</summary> 
public static string EditInlineFunctionWorkflow_DebugFieldGroup_Label=>T("EditInlineFunctionWorkflow.DebugFieldGroup.Label");
///<summary>&quot;Page&quot;</summary> 
public static string EditInlineFunctionWorkflow_DebugPage_Label=>T("EditInlineFunctionWorkflow.DebugPage.Label");
///<summary>&quot;When debugging, this page is used as current page&quot;</summary> 
public static string EditInlineFunctionWorkflow_DebugPage_Help=>T("EditInlineFunctionWorkflow.DebugPage.Help");
///<summary>&quot;Data scope&quot;</summary> 
public static string EditInlineFunctionWorkflow_DebugPageDataScope_Label=>T("EditInlineFunctionWorkflow.DebugPageDataScope.Label");
///<summary>&quot;When debugging, this is used as current data scope&quot;</summary> 
public static string EditInlineFunctionWorkflow_DebugPageDataScope_Help=>T("EditInlineFunctionWorkflow.DebugPageDataScope.Help");
///<summary>&quot;Language&quot;</summary> 
public static string EditInlineFunctionWorkflow_DebugActiveLocale_Label=>T("EditInlineFunctionWorkflow.DebugActiveLocale.Label");
///<summary>&quot;When debugging, this is used as the current language&quot;</summary> 
public static string EditInlineFunctionWorkflow_DebugActiveLocale_Help=>T("EditInlineFunctionWorkflow.DebugActiveLocale.Help");
///<summary>&quot;Source&quot;</summary> 
public static string EditInlineFunctionWorkflow_Code_Label=>T("EditInlineFunctionWorkflow.Code.Label");
///<summary>&quot;Assembly References&quot;</summary> 
public static string EditInlineFunctionWorkflow_AssembliesFieldGroup_Label=>T("EditInlineFunctionWorkflow.AssembliesFieldGroup.Label");
///<summary>&quot;Preview&quot;</summary> 
public static string EditInlineFunctionWorkflow_Preview_Label=>T("EditInlineFunctionWorkflow.Preview.Label");
///<summary>&quot;Input Parameters&quot;</summary> 
public static string EditInlineFunctionWorkflow_ParameterFieldGroup_Label=>T("EditInlineFunctionWorkflow.ParameterFieldGroup.Label");
///<summary>&quot;Administrative&quot;</summary> 
public static string EditInlineFunctionWorkflow_AdminitrativeScope_Label=>T("EditInlineFunctionWorkflow.AdminitrativeScope.Label");
///<summary>&quot;Public&quot;</summary> 
public static string EditInlineFunctionWorkflow_PublicScope_Label=>T("EditInlineFunctionWorkflow.PublicScope.Label");
///<summary>&quot;Empty method&quot;</summary> 
public static string InlineFunctionMethodTemplate_Clean=>T("InlineFunctionMethodTemplate.Clean");
///<summary>&quot;Method with parameters&quot;</summary> 
public static string InlineFunctionMethodTemplate_WithParameters=>T("InlineFunctionMethodTemplate.WithParameters");
///<summary>&quot;Method using data connection&quot;</summary> 
public static string InlineFunctionMethodTemplate_DataConnection=>T("InlineFunctionMethodTemplate.DataConnection");
///<summary>&quot;A public static class named {0} is missing from the code. This class should contain the function method.&quot;</summary> 
public static string CSharpInlineFunction_OnMissingContainerType(object parameter0)=>string.Format(T("CSharpInlineFunction.OnMissingContainerType"), parameter0);
///<summary>&quot;The namespace in the code &apos;{0}&apos; does not match the given function namespace &apos;{1}&apos;.&quot;</summary> 
public static string CSharpInlineFunction_OnNamespaceMismatch(object parameter0,object parameter1)=>string.Format(T("CSharpInlineFunction.OnNamespaceMismatch"), parameter0,parameter1);
///<summary>&quot;The given function name &apos;{0}&apos; was not found or not public static in the class &apos;{1}&apos;.&quot;</summary> 
public static string CSharpInlineFunction_OnMissionMethod(object parameter0,object parameter1)=>string.Format(T("CSharpInlineFunction.OnMissionMethod"), parameter0,parameter1);
///<summary>&quot;The parameter &apos;{0}&apos; has not been added to &apos;Input Parameters&apos; - to call your function you need to add the parameter and give it either a test or default value.&quot;</summary> 
public static string CSharpInlineFunction_MissingParameterDefinition(object parameter0)=>string.Format(T("CSharpInlineFunction.MissingParameterDefinition"), parameter0);
///<summary>&quot;The parameter &apos;{0}&apos; is expecting test value of type &apos;{1}&apos;, got value of type &apos;{2}&apos;.&quot;</summary> 
public static string CSharpInlineFunction_WrongParameterTestValueType(object parameter0,object parameter1,object parameter2)=>string.Format(T("CSharpInlineFunction.WrongParameterTestValueType"), parameter0,parameter1,parameter2);
///<summary>&quot;The parameter &apos;{0}&apos; defined on &apos;Input Parameters&apos; must have a test or default value before your function can be evaluated.&quot;</summary> 
public static string CSharpInlineFunction_MissingParameterTestOrDefaultValue(object parameter0)=>string.Format(T("CSharpInlineFunction.MissingParameterTestOrDefaultValue"), parameter0);
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PackageElementProvider {
///<summary>&quot;Packages&quot;</summary> 
public static string RootFolderLabel=>T("RootFolderLabel");
///<summary>&quot;Explore and manage installed packages&quot;</summary> 
public static string RootFolderToolTip=>T("RootFolderToolTip");
///<summary>&quot;Available Packages&quot;</summary> 
public static string AvailablePackagesFolderLabel=>T("AvailablePackagesFolderLabel");
///<summary>&quot;Available packages&quot;</summary> 
public static string AvailablePackagesFolderToolTip=>T("AvailablePackagesFolderToolTip");
///<summary>&quot;Installed Packages&quot;</summary> 
public static string InstalledPackageFolderLabel=>T("InstalledPackageFolderLabel");
///<summary>&quot;Installed packages&quot;</summary> 
public static string InstalledPackageFolderToolTip=>T("InstalledPackageFolderToolTip");
///<summary>&quot;Local Packages&quot;</summary> 
public static string LocalPackagesFolderLabel=>T("LocalPackagesFolderLabel");
///<summary>&quot;Local packages&quot;</summary> 
public static string LocalPackagesFolderToolTip=>T("LocalPackagesFolderToolTip");
///<summary>&quot;Package Sources&quot;</summary> 
public static string PackageSourcesFolderLabel=>T("PackageSourcesFolderLabel");
///<summary>&quot;Package sources&quot;</summary> 
public static string PackageSourcesFolderToolTip=>T("PackageSourcesFolderToolTip");
///<summary>&quot;Package Info&quot;</summary> 
public static string ViewAvailableInformationLabel=>T("ViewAvailableInformationLabel");
///<summary>&quot;View package information&quot;</summary> 
public static string ViewAvailableInformationToolTip=>T("ViewAvailableInformationToolTip");
///<summary>&quot;Install&quot;</summary> 
public static string InstallLabel=>T("InstallLabel");
///<summary>&quot;Install this C1 Package on your system&quot;</summary> 
public static string InstallToolTip=>T("InstallToolTip");
///<summary>&quot;Package Info&quot;</summary> 
public static string ViewInstalledInformationLabel=>T("ViewInstalledInformationLabel");
///<summary>&quot;View package information&quot;</summary> 
public static string ViewInstalledInformationToolTip=>T("ViewInstalledInformationToolTip");
///<summary>&quot;Install Local Package...&quot;</summary> 
public static string InstallLocalPackageLabel=>T("InstallLocalPackageLabel");
///<summary>&quot;Install package from local file system&quot;</summary> 
public static string InstallLocalPackageToolTip=>T("InstallLocalPackageToolTip");
///<summary>&quot;Add Package Source&quot;</summary> 
public static string AddPackageSourceLabel=>T("AddPackageSourceLabel");
///<summary>&quot;Add package source&quot;</summary> 
public static string AddPackageSourceToolTip=>T("AddPackageSourceToolTip");
///<summary>&quot;Delete Package Source&quot;</summary> 
public static string DeletePackageSourceLabel=>T("DeletePackageSourceLabel");
///<summary>&quot;Delete package source&quot;</summary> 
public static string DeletePackageSourceToolTip=>T("DeletePackageSourceToolTip");
///<summary>&quot;Clear Cache&quot;</summary> 
public static string ClearServerCacheLabel=>T("ClearServerCacheLabel");
///<summary>&quot;Clear cache to get the newest packages&quot;</summary> 
public static string ClearServerCacheToolTip=>T("ClearServerCacheToolTip");
///<summary>&quot;Package Info&quot;</summary> 
public static string ViewAvailableInformation_FieldGroupLabel=>T("ViewAvailableInformation.FieldGroupLabel");
///<summary>&quot;Name&quot;</summary> 
public static string ViewAvailableInformation_NameTextLabel=>T("ViewAvailableInformation.NameTextLabel");
///<summary>&quot;Description&quot;</summary> 
public static string ViewAvailableInformation_DescriptionTextLabel=>T("ViewAvailableInformation.DescriptionTextLabel");
///<summary>&quot;Author&quot;</summary> 
public static string ViewAvailableInformation_AuthorTextLabel=>T("ViewAvailableInformation.AuthorTextLabel");
///<summary>&quot;Free Trial Info&quot;</summary> 
public static string ViewAvailableInformation_TrialInfoFieldGroupLabel=>T("ViewAvailableInformation.TrialInfoFieldGroupLabel");
///<summary>&quot;Trial information&quot;</summary> 
public static string ViewAvailableInformation_TrialInformationLabel=>T("ViewAvailableInformation.TrialInformationLabel");
///<summary>&quot;This is a commercial package, available for free in the trial period. When the trial period has expired functionality may be degraded, unless you choose to purchase a license.&quot;</summary> 
public static string ViewAvailableInformation_TrialInformationText=>T("ViewAvailableInformation.TrialInformationText");
///<summary>&quot;Free trial period (days)&quot;</summary> 
public static string ViewAvailableInformation_TrialDaysLabel=>T("ViewAvailableInformation.TrialDaysLabel");
///<summary>&quot;Installation Info&quot;</summary> 
public static string ViewAvailableInformation_InstallationInfoFieldGroupLabel=>T("ViewAvailableInformation.InstallationInfoFieldGroupLabel");
///<summary>&quot;Version&quot;</summary> 
public static string ViewAvailableInformation_VersionTextLabel=>T("ViewAvailableInformation.VersionTextLabel");
///<summary>&quot;Technical Description&quot;</summary> 
public static string ViewAvailableInformation_TechicalDescriptionTextLabel=>T("ViewAvailableInformation.TechicalDescriptionTextLabel");
///<summary>&quot;Source&quot;</summary> 
public static string ViewAvailableInformation_PackageSourceTextLabel=>T("ViewAvailableInformation.PackageSourceTextLabel");
///<summary>&quot;Price&quot;</summary> 
public static string ViewAvailableInformation_PriceTextLabel=>T("ViewAvailableInformation.PriceTextLabel");
///<summary>&quot;Subscriptions that include this package&quot;</summary> 
public static string ViewAvailableInformation_SubscriptionListLabel=>T("ViewAvailableInformation.SubscriptionListLabel");
///<summary>&quot;Install&quot;</summary> 
public static string ViewAvailableInformation_Toolbar_InstallLabel=>T("ViewAvailableInformation.Toolbar.InstallLabel");
///<summary>&quot;Read more&quot;</summary> 
public static string ViewAvailableInformation_Toolbar_ReadMoreLabel=>T("ViewAvailableInformation.Toolbar.ReadMoreLabel");
///<summary>&quot;Already Installed&quot;</summary> 
public static string ViewAvailableInformation_ShowError_MessageTitle=>T("ViewAvailableInformation.ShowError.MessageTitle");
///<summary>&quot;The package is already installed, cannot install the selected package.&quot;</summary> 
public static string ViewAvailableInformation_ShowError_MessageMessage=>T("ViewAvailableInformation.ShowError.MessageMessage");
///<summary>&quot;Package server did not respond&quot;</summary> 
public static string ViewAvailableInformation_ShowServerError_MessageTitle=>T("ViewAvailableInformation.ShowServerError.MessageTitle");
///<summary>&quot;The package server did not respond, try again or contact the system administrator&quot;</summary> 
public static string ViewAvailableInformation_ShowServerError_MessageMessage=>T("ViewAvailableInformation.ShowServerError.MessageMessage");
///<summary>&quot;Package Info&quot;</summary> 
public static string ViewInstalledInformation_FieldGroupLabel=>T("ViewInstalledInformation.FieldGroupLabel");
///<summary>&quot;Name&quot;</summary> 
public static string ViewInstalledInformation_NameTextLabel=>T("ViewInstalledInformation.NameTextLabel");
///<summary>&quot;Installation date&quot;</summary> 
public static string ViewInstalledInformation_DateTextLabel=>T("ViewInstalledInformation.DateTextLabel");
///<summary>&quot;Installed by&quot;</summary> 
public static string ViewInstalledInformation_UserTextLabel=>T("ViewInstalledInformation.UserTextLabel");
///<summary>&quot;Author&quot;</summary> 
public static string ViewInstalledInformation_AuthorTextLabel=>T("ViewInstalledInformation.AuthorTextLabel");
///<summary>&quot;Version&quot;</summary> 
public static string ViewInstalledInformation_VersionTextLabel=>T("ViewInstalledInformation.VersionTextLabel");
///<summary>&quot;Trial info&quot;</summary> 
public static string ViewInstalledInformation_TrialInfoFieldGroupLabel=>T("ViewInstalledInformation.TrialInfoFieldGroupLabel");
///<summary>&quot;Trial information&quot;</summary> 
public static string ViewInstalledInformation_TrialInformationLabel=>T("ViewInstalledInformation.TrialInformationLabel");
///<summary>&quot;This is a commercial package, available for free in the trial period. When the trial period has expired functionality may be degraded, unless you choose to purchase a license.&quot;</summary> 
public static string ViewInstalledInformation_TrialInformationText=>T("ViewInstalledInformation.TrialInformationText");
///<summary>&quot;Trial expiration date&quot;</summary> 
public static string ViewInstalledInformation_TrialExpireLabel=>T("ViewInstalledInformation.TrialExpireLabel");
///<summary>&quot;Uninstall&quot;</summary> 
public static string ViewInstalledInformation_Toolbar_UninstallLabel=>T("ViewInstalledInformation.Toolbar.UninstallLabel");
///<summary>&quot;Purchase this!&quot;</summary> 
public static string ViewInstalledInformation_Toolbar_PurchaseLabel=>T("ViewInstalledInformation.Toolbar.PurchaseLabel");
///<summary>&quot;Already Uninstalled&quot;</summary> 
public static string ViewInstalledInformation_ShowError_MessageTitle=>T("ViewInstalledInformation.ShowError.MessageTitle");
///<summary>&quot;The package is already uninstalled, cannot uninstall the selected package.&quot;</summary> 
public static string ViewInstalledInformation_ShowError_MessageMessage=>T("ViewInstalledInformation.ShowError.MessageMessage");
///<summary>&quot;Install Package&quot;</summary> 
public static string InstallRemotePackage_Step1_LayoutLabel=>T("InstallRemotePackage.Step1.LayoutLabel");
///<summary>&quot;This is a trial/payment package&quot;</summary> 
public static string InstallRemotePackage_Step1_HeadingTitle=>T("InstallRemotePackage.Step1.HeadingTitle");
///<summary>&quot;This package is subject to payment - please examine the EULA on the next screen for details about trial period and payment terms.&quot;</summary> 
public static string InstallRemotePackage_Step1_HeadingDescription=>T("InstallRemotePackage.Step1.HeadingDescription");
///<summary>&quot;Install Package&quot;</summary> 
public static string InstallRemotePackage_Step2_LayoutLabel=>T("InstallRemotePackage.Step2.LayoutLabel");
///<summary>&quot;License agreement&quot;</summary> 
public static string InstallRemotePackage_Step2_HeadingTitle=>T("InstallRemotePackage.Step2.HeadingTitle");
///<summary>&quot;If you accept the terms of the agreement, click the check box below. You must accept the agreement to install.&quot;</summary> 
public static string InstallRemotePackage_Step2_HeadingDescription=>T("InstallRemotePackage.Step2.HeadingDescription");
///<summary>&quot;I accept the license agreement&quot;</summary> 
public static string InstallRemotePackage_Step2_IAcceptItemLabel=>T("InstallRemotePackage.Step2.IAcceptItemLabel");
///<summary>&quot;You must accept the terms of the license agreement before you can proceed.&quot;</summary> 
public static string InstallRemotePackage_Step2_AcceptMissing=>T("InstallRemotePackage.Step2.AcceptMissing");
///<summary>&quot;Install Package&quot;</summary> 
public static string InstallRemotePackage_Step3_LayoutLabel=>T("InstallRemotePackage.Step3.LayoutLabel");
///<summary>&quot;Download and validate package&quot;</summary> 
public static string InstallRemotePackage_Step3_HeadingTitle=>T("InstallRemotePackage.Step3.HeadingTitle");
///<summary>&quot;The package will be downloaded and validated. Please note that this may take several minutes. Click Next to continue.&quot;</summary> 
public static string InstallRemotePackage_Step3_HeadingDescription=>T("InstallRemotePackage.Step3.HeadingDescription");
///<summary>&quot;Install Local Package&quot;</summary> 
public static string InstallRemotePackage_Step4_LayoutLabel=>T("InstallRemotePackage.Step4.LayoutLabel");
///<summary>&quot;Ready to install&quot;</summary> 
public static string InstallRemotePackage_Step4_HeadingTitle=>T("InstallRemotePackage.Step4.HeadingTitle");
///<summary>&quot;Ready to install the package. Please note that the installation may take several minutes. Click Next to continue.&quot;</summary> 
public static string InstallRemotePackage_Step4_HeadingDescription=>T("InstallRemotePackage.Step4.HeadingDescription");
///<summary>&quot;Ready to install&quot;</summary> 
public static string InstallRemotePackage_Step4_NonUninstallableHeadingTitle=>T("InstallRemotePackage.Step4.NonUninstallableHeadingTitle");
///<summary>&quot;Ready to install the package. Please note that the installation may take several minutes. Also note that this package can not be uninstalled. Click Next to continue.&quot;</summary> 
public static string InstallRemotePackage_Step4_NonUninstallableHeadingDescription=>T("InstallRemotePackage.Step4.NonUninstallableHeadingDescription");
///<summary>&quot;Package Installed&quot;</summary> 
public static string InstallRemotePackage_Step5_LayoutLabel=>T("InstallRemotePackage.Step5.LayoutLabel");
///<summary>&quot;Package installed successfully&quot;</summary> 
public static string InstallRemotePackage_Step5_HeadingTitle=>T("InstallRemotePackage.Step5.HeadingTitle");
///<summary>&quot;Package installed successfully.&quot;</summary> 
public static string InstallRemotePackage_Step5_HeadingDescription=>T("InstallRemotePackage.Step5.HeadingDescription");
///<summary>&quot;Package installation failed&quot;</summary> 
public static string InstallRemotePackage_ShowError_LayoutLabel=>T("InstallRemotePackage.ShowError.LayoutLabel");
///<summary>&quot;Package Installation Failed&quot;</summary> 
public static string InstallRemotePackage_ShowError_InfoTableCaption=>T("InstallRemotePackage.ShowError.InfoTableCaption");
///<summary>&quot;Message&quot;</summary> 
public static string InstallRemotePackage_ShowError_MessageTitle=>T("InstallRemotePackage.ShowError.MessageTitle");
///<summary>&quot;The package Did Not Validate&quot;</summary> 
public static string InstallRemotePackage_ShowWarning_LayoutLabel=>T("InstallRemotePackage.ShowWarning.LayoutLabel");
///<summary>&quot;The package did not validate&quot;</summary> 
public static string InstallRemotePackage_ShowWarning_InfoTableCaption=>T("InstallRemotePackage.ShowWarning.InfoTableCaption");
///<summary>&quot;Install Local Package&quot;</summary> 
public static string InstallLocalPackage_Step1_LayoutLabel=>T("InstallLocalPackage.Step1.LayoutLabel");
///<summary>&quot;Package file&quot;</summary> 
public static string InstallLocalPackage_Step1_FileUploadLabel=>T("InstallLocalPackage.Step1.FileUploadLabel");
///<summary>&quot;Browse to and select the local package file&quot;</summary> 
public static string InstallLocalPackage_Step1_FileUploadHelp=>T("InstallLocalPackage.Step1.FileUploadHelp");
///<summary>&quot;Install Local Package&quot;</summary> 
public static string InstallLocalPackage_Step2_LayoutLabel=>T("InstallLocalPackage.Step2.LayoutLabel");
///<summary>&quot;Ready to install&quot;</summary> 
public static string InstallLocalPackage_Step2_HeadingTitle=>T("InstallLocalPackage.Step2.HeadingTitle");
///<summary>&quot;Ready to install the package. Please note that the installation may take several minutes. Click Next to continue.&quot;</summary> 
public static string InstallLocalPackage_Step2_HeadingDescription=>T("InstallLocalPackage.Step2.HeadingDescription");
///<summary>&quot;Package Installed&quot;</summary> 
public static string InstallLocalPackage_Step3_LayoutLabel=>T("InstallLocalPackage.Step3.LayoutLabel");
///<summary>&quot;Package installed successfully&quot;</summary> 
public static string InstallLocalPackage_Step3_HeadingTitle=>T("InstallLocalPackage.Step3.HeadingTitle");
///<summary>&quot;Package installed successfully.&quot;</summary> 
public static string InstallLocalPackage_Step3_HeadingDescription=>T("InstallLocalPackage.Step3.HeadingDescription");
///<summary>&quot;Package Installation Failed&quot;</summary> 
public static string InstallLocalPackage_ShowError_LayoutLabel=>T("InstallLocalPackage.ShowError.LayoutLabel");
///<summary>&quot;Package installation failed&quot;</summary> 
public static string InstallLocalPackage_ShowError_InfoTableCaption=>T("InstallLocalPackage.ShowError.InfoTableCaption");
///<summary>&quot;Message&quot;</summary> 
public static string InstallLocalPackage_ShowError_MessageTitle=>T("InstallLocalPackage.ShowError.MessageTitle");
///<summary>&quot;The package Did Not Validate&quot;</summary> 
public static string InstallLocalPackage_ShowWarning_LayoutLabel=>T("InstallLocalPackage.ShowWarning.LayoutLabel");
///<summary>&quot;The package did not validate&quot;</summary> 
public static string InstallLocalPackage_ShowWarning_InfoTableCaption=>T("InstallLocalPackage.ShowWarning.InfoTableCaption");
///<summary>&quot;Uninstall Package&quot;</summary> 
public static string UninstallRemotePackage_Step1_LayoutLabel=>T("UninstallRemotePackage.Step1.LayoutLabel");
///<summary>&quot;Ready to check uninstallation process&quot;</summary> 
public static string UninstallRemotePackage_Step1_HeadingTitle=>T("UninstallRemotePackage.Step1.HeadingTitle");
///<summary>&quot;Ready to check the uninstall process of the package. Click Next to continue.&quot;</summary> 
public static string UninstallRemotePackage_Step1_HeadingDescription=>T("UninstallRemotePackage.Step1.HeadingDescription");
///<summary>&quot;Uninstall Package&quot;</summary> 
public static string UninstallRemotePackage_Step2_LayoutLabel=>T("UninstallRemotePackage.Step2.LayoutLabel");
///<summary>&quot;Ready to uninstall&quot;</summary> 
public static string UninstallRemotePackage_Step2_HeadingTitle=>T("UninstallRemotePackage.Step2.HeadingTitle");
///<summary>&quot;Ready to uninstall the package. Please note that the installation may take several minutes. Click Next to continue.&quot;</summary> 
public static string UninstallRemotePackage_Step2_HeadingDescription=>T("UninstallRemotePackage.Step2.HeadingDescription");
///<summary>&quot;Package Uninstalled&quot;</summary> 
public static string UninstallRemotePackage_Step3_LayoutLabel=>T("UninstallRemotePackage.Step3.LayoutLabel");
///<summary>&quot;Package uninstalled successfully&quot;</summary> 
public static string UninstallRemotePackage_Step3_HeadingTitle=>T("UninstallRemotePackage.Step3.HeadingTitle");
///<summary>&quot;Package uninstalled successfully.&quot;</summary> 
public static string UninstallRemotePackage_Step3_HeadingDescription=>T("UninstallRemotePackage.Step3.HeadingDescription");
///<summary>&quot;Package Uninstallation Failed&quot;</summary> 
public static string UninstallRemotePackage_ShowError_LayoutLabel=>T("UninstallRemotePackage.ShowError.LayoutLabel");
///<summary>&quot;Package uninstallation failed&quot;</summary> 
public static string UninstallRemotePackage_ShowError_InfoTableCaption=>T("UninstallRemotePackage.ShowError.InfoTableCaption");
///<summary>&quot;Message&quot;</summary> 
public static string UninstallRemotePackage_ShowError_MessageTitle=>T("UninstallRemotePackage.ShowError.MessageTitle");
///<summary>&quot;Uninstall Package&quot;</summary> 
public static string UninstallRemotePackage_ShowUnregistre_LayoutLabel=>T("UninstallRemotePackage.ShowUnregistre.LayoutLabel");
///<summary>&quot;Registration of uninstallation failed&quot;</summary> 
public static string UninstallRemotePackage_ShowUnregistre_HeadingTitle=>T("UninstallRemotePackage.ShowUnregistre.HeadingTitle");
///<summary>&quot;The registration of uninstallation failed. Contact the package vendor for manual unregistration.&quot;</summary> 
public static string UninstallRemotePackage_ShowUnregistre_HeadingDescription=>T("UninstallRemotePackage.ShowUnregistre.HeadingDescription");
///<summary>&quot;Uninstall Local Package&quot;</summary> 
public static string UninstallLocalPackage_Step1_LayoutLabel=>T("UninstallLocalPackage.Step1.LayoutLabel");
///<summary>&quot;Ready to check uninstallation process&quot;</summary> 
public static string UninstallLocalPackage_Step1_HeadingTitle=>T("UninstallLocalPackage.Step1.HeadingTitle");
///<summary>&quot;Ready to check the uninstall process of the package. Click Next to continue.&quot;</summary> 
public static string UninstallLocalPackage_Step1_HeadingDescription=>T("UninstallLocalPackage.Step1.HeadingDescription");
///<summary>&quot;Uninstall Local Package&quot;</summary> 
public static string UninstallLocalPackage_Step2_LayoutLabel=>T("UninstallLocalPackage.Step2.LayoutLabel");
///<summary>&quot;Ready to uninstall&quot;</summary> 
public static string UninstallLocalPackage_Step2_HeadingTitle=>T("UninstallLocalPackage.Step2.HeadingTitle");
///<summary>&quot;Ready to uninstall the package. Please note that the installation may take several minutes. Click Next to continue.&quot;</summary> 
public static string UninstallLocalPackage_Step2_HeadingDescription=>T("UninstallLocalPackage.Step2.HeadingDescription");
///<summary>&quot;Package Uninstalled&quot;</summary> 
public static string UninstallLocalPackage_Step3_LayoutLabel=>T("UninstallLocalPackage.Step3.LayoutLabel");
///<summary>&quot;Package uninstalled successfully&quot;</summary> 
public static string UninstallLocalPackage_Step3_HeadingTitle=>T("UninstallLocalPackage.Step3.HeadingTitle");
///<summary>&quot;Package uninstalled successfully.&quot;</summary> 
public static string UninstallLocalPackage_Step3_HeadingDescription=>T("UninstallLocalPackage.Step3.HeadingDescription");
///<summary>&quot;Package Uninstallation Failed&quot;</summary> 
public static string UninstallLocalPackage_ShowError_LayoutLabel=>T("UninstallLocalPackage.ShowError.LayoutLabel");
///<summary>&quot;Package uninstallation failed&quot;</summary> 
public static string UninstallLocalPackage_ShowError_InfoTableCaption=>T("UninstallLocalPackage.ShowError.InfoTableCaption");
///<summary>&quot;Message&quot;</summary> 
public static string UninstallLocalPackage_ShowError_MessageTitle=>T("UninstallLocalPackage.ShowError.MessageTitle");
///<summary>&quot;New Package Source&quot;</summary> 
public static string AddPackageSource_Step1_LayoutLabel=>T("AddPackageSource.Step1.LayoutLabel");
///<summary>&quot;Package source data&quot;</summary> 
public static string AddPackageSource_Step1_FieldGroupLabel=>T("AddPackageSource.Step1.FieldGroupLabel");
///<summary>&quot;Package web service URL&quot;</summary> 
public static string AddPackageSource_Step1_UrlLabel=>T("AddPackageSource.Step1.UrlLabel");
///<summary>&quot;Packages can be hosted on remote servers. The package web service URL will be validated in the next step.&quot;</summary> 
public static string AddPackageSource_Step1_UrlHelp=>T("AddPackageSource.Step1.UrlHelp");
///<summary>&quot;The entered text was not a valid URL&quot;</summary> 
public static string AddPackageSource_Step1_UrlNotValid=>T("AddPackageSource.Step1.UrlNotValid");
///<summary>&quot;The server is not a Composite C1 package server&quot;</summary> 
public static string AddPackageSource_Step1_UrlNonPackageServer=>T("AddPackageSource.Step1.UrlNonPackageServer");
///<summary>&quot;Add Package Server Source&quot;</summary> 
public static string AddPackageSource_Step2_LayoutLabel=>T("AddPackageSource.Step2.LayoutLabel");
///<summary>&quot;Server URL is valid&quot;</summary> 
public static string AddPackageSource_Step2_HeadingTitle=>T("AddPackageSource.Step2.HeadingTitle");
///<summary>&quot;Note that the HTTP protocol is used on this connection. This implies that all information will be send unencrypted. Click Finish to add the source.&quot;</summary> 
public static string AddPackageSource_Step2_HeadingNoHttpsDescription=>T("AddPackageSource.Step2.HeadingNoHttpsDescription");
///<summary>&quot;Click Finish to add the source.&quot;</summary> 
public static string AddPackageSource_Step2_HeadingWithHttpsDescription=>T("AddPackageSource.Step2.HeadingWithHttpsDescription");
///<summary>&quot;Delete Confirmation&quot;</summary> 
public static string DeletePackageSource_Step1_LayoutLabel=>T("DeletePackageSource.Step1.LayoutLabel");
///<summary>&quot;Delete the selected server source&quot;</summary> 
public static string DeletePackageSource_Step1_Text=>T("DeletePackageSource.Step1.Text");
///<summary>&quot;Trial Period Has Expired&quot;</summary> 
public static string ConfirmLicense_ExpiredTitle=>T("ConfirmLicense.ExpiredTitle");
///<summary>&quot;The trial period of the package has expired. You need to obtain a valid license.&quot;</summary> 
public static string ConfirmLicense_ExpiredMessage=>T("ConfirmLicense.ExpiredMessage");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PageElementProvider {
///<summary>&quot;Add New Page&quot;</summary> 
public static string AddNewPageStep1_DialogLabel=>T("AddNewPageStep1.DialogLabel");
///<summary>&quot;Add New {0}&quot;</summary> 
public static string AddNewPageStep1_DialogLabelFormat(object parameter0)=>string.Format(T("AddNewPageStep1.DialogLabelFormat"), parameter0);
///<summary>&quot;General settings&quot;</summary> 
public static string GeneralSettings_FieldGroupLabel=>T("GeneralSettings.FieldGroupLabel");
///<summary>&quot;Publication settings&quot;</summary> 
public static string PublicationSettings_FieldGroupLabel=>T("PublicationSettings.FieldGroupLabel");
///<summary>&quot;Advanced settings&quot;</summary> 
public static string AdvancedSettings_FieldGroupLabel=>T("AdvancedSettings.FieldGroupLabel");
///<summary>&quot;Page title&quot;</summary> 
public static string AddNewPageStep1_LabelTitle=>T("AddNewPageStep1.LabelTitle");
///<summary>&quot;The entry specified in this field is shown in the browser window title bar. The field is used by search engines and sitemaps&quot;</summary> 
public static string AddNewPageStep1_LabelTitleHelp=>T("AddNewPageStep1.LabelTitleHelp");
///<summary>&quot;Description&quot;</summary> 
public static string AddNewPageStep1_LabelAbstract=>T("AddNewPageStep1.LabelAbstract");
///<summary>&quot;Use this field for at short description of the page&quot;</summary> 
public static string AddNewPageStep1_LabelAbstractHelp=>T("AddNewPageStep1.LabelAbstractHelp");
///<summary>&quot;Page type&quot;</summary> 
public static string AddNewPageStep1_LabelTemplate=>T("AddNewPageStep1.LabelTemplate");
///<summary>&quot;The page type selection influences the behavior and features of your page, like &apos;a normal page&apos; or &apos;a blog&apos;. The options available depend on features installed.&quot;</summary> 
public static string AddNewPageStep1_HelpTemplate=>T("AddNewPageStep1.HelpTemplate");
///<summary>&quot;Position&quot;</summary> 
public static string AddNewPageStep1_LabelPosition=>T("AddNewPageStep1.LabelPosition");
///<summary>&quot;Select where in the content tree you want the page to be placed.&quot;</summary> 
public static string AddNewPageStep1_HelpPosition=>T("AddNewPageStep1.HelpPosition");
///<summary>&quot;Insert at the top&quot;</summary> 
public static string AddNewPageStep1_LabelAddToTop=>T("AddNewPageStep1.LabelAddToTop");
///<summary>&quot;Insert at the bottom&quot;</summary> 
public static string AddNewPageStep1_LabelAddToBottom=>T("AddNewPageStep1.LabelAddToBottom");
///<summary>&quot;Insert alphabetically&quot;</summary> 
public static string AddNewPageStep1_LabelAddAlphabetic=>T("AddNewPageStep1.LabelAddAlphabetic");
///<summary>&quot;Select position...&quot;</summary> 
public static string AddNewPageStep1_LabelAddBelowOtherPage=>T("AddNewPageStep1.LabelAddBelowOtherPage");
///<summary>&quot;URL title&quot;</summary> 
public static string AddNewPageStep2_LabelUrlTitle=>T("AddNewPageStep2.LabelUrlTitle");
///<summary>&quot;The entry specified in this field is shown in the browser address bar. The field is used by search engines&quot;</summary> 
public static string AddNewPageStep2_HelpUrlTitle=>T("AddNewPageStep2.HelpUrlTitle");
///<summary>&quot;Menu title&quot;</summary> 
public static string AddNewPageStep2_LabelMenuTitle=>T("AddNewPageStep2.LabelMenuTitle");
///<summary>&quot;The entry specified in this field can be used in the navigation on the website&quot;</summary> 
public static string AddNewPageStep2_HelpMenuTitle=>T("AddNewPageStep2.HelpMenuTitle");
///<summary>&quot;Select detailed page position&quot;</summary> 
public static string AddNewPageStep2_LabelPositionSelectorPanel=>T("AddNewPageStep2.LabelPositionSelectorPanel");
///<summary>&quot;Position below&quot;</summary> 
public static string AddNewPageStep2_LabelPositionSelector=>T("AddNewPageStep2.LabelPositionSelector");
///<summary>&quot;&quot;</summary> 
public static string AddNewPageStep2_HelpPositionSelector=>T("AddNewPageStep2.HelpPositionSelector");
///<summary>&quot;The specified title is too long. Make it shorter and try again&quot;</summary> 
public static string AddNewPageStep1_TitleTooLong=>T("AddNewPageStep1.TitleTooLong");
///<summary>&quot;The specified menu title is too long. Make it shorter and try again&quot;</summary> 
public static string AddNewPageStep1_MenuTitleTooLong=>T("AddNewPageStep1.MenuTitleTooLong");
///<summary>&quot;Settings&quot;</summary> 
public static string EditPage_LabelPaneSettings=>T("EditPage.LabelPaneSettings");
///<summary>&quot;Status&quot;</summary> 
public static string EditPage_LabelPublicationState=>T("EditPage.LabelPublicationState");
///<summary>&quot;Send the page to another status&quot;</summary> 
public static string EditPage_HelpPublicationState=>T("EditPage.HelpPublicationState");
///<summary>&quot;Page title&quot;</summary> 
public static string EditPage_LabelPageTitle=>T("EditPage.LabelPageTitle");
///<summary>&quot;The entry specified in this field is shown in the browser window title bar. The field is used by search engines and sitemaps&quot;</summary> 
public static string EditPage_LabelPageTitleHelp=>T("EditPage.LabelPageTitleHelp");
///<summary>&quot;Menu title&quot;</summary> 
public static string EditPage_LabelMenuTitle=>T("EditPage.LabelMenuTitle");
///<summary>&quot;The entry specified in this field can be used in the navigation on the website&quot;</summary> 
public static string EditPage_HelpMenuTitle=>T("EditPage.HelpMenuTitle");
///<summary>&quot;URL title&quot;</summary> 
public static string EditPage_LabelUrlTitle=>T("EditPage.LabelUrlTitle");
///<summary>&quot;URL title was rewritten&quot;</summary> 
public static string EditPage_UrlTitleFormattedTitle=>T("EditPage.UrlTitleFormattedTitle");
///<summary>&quot;According to the current URL replacement rules, URL title was changed to &apos;{0}&apos;&quot;</summary> 
public static string EditPage_UrlTitleFormattedMessage(object parameter0)=>string.Format(T("EditPage.UrlTitleFormattedMessage"), parameter0);
///<summary>&quot;The entry specified in this field is shown in the browser address bar as a part of the URL address. The field is used by search engines&quot;</summary> 
public static string EditPage_HelpUrlTitle=>T("EditPage.HelpUrlTitle");
///<summary>&quot;Friendly URL&quot;</summary> 
public static string EditPage_LabelFriendlyUrl=>T("EditPage.LabelFriendlyUrl");
///<summary>&quot;The entry specified in this field is a shorter version of the actual page URL and redirects to it, when entered in the browser address bar. Note that some servers may have to be configured to support this feature.&quot;</summary> 
public static string EditPage_HelpFriendlyUrl=>T("EditPage.HelpFriendlyUrl");
///<summary>&quot;Description&quot;</summary> 
public static string EditPage_LabelAbstract=>T("EditPage.LabelAbstract");
///<summary>&quot;Use this field for a short description of the page&quot;</summary> 
public static string EditPage_LabelAbstractHelp=>T("EditPage.LabelAbstractHelp");
///<summary>&quot;Publish date&quot;</summary> 
public static string EditPage_LabelPublishDate=>T("EditPage.LabelPublishDate");
///<summary>&quot;Specify at which date and time you want the page to be published automatically.&quot;</summary> 
public static string EditPage_HelpPublishDate=>T("EditPage.HelpPublishDate");
///<summary>&quot;Unpublish date&quot;</summary> 
public static string EditPage_LabelUnpublishDate=>T("EditPage.LabelUnpublishDate");
///<summary>&quot;Specify at which date and time you want the page to be unpublished automatically.&quot;</summary> 
public static string EditPage_HelpUnpublishDate=>T("EditPage.HelpUnpublishDate");
///<summary>&quot;Content&quot;</summary> 
public static string EditPage_LabelContent=>T("EditPage.LabelContent");
///<summary>&quot;Preview&quot;</summary> 
public static string EditPage_LabelPreview=>T("EditPage.LabelPreview");
///<summary>&quot;Page type&quot;</summary> 
public static string EditPage_PageTypeSelectorLabel=>T("EditPage.PageTypeSelectorLabel");
///<summary>&quot;The page type selection defines the role of the page, like &apos;a normal page&apos; or &apos;a blog&apos;. The options available depend on features installed.&quot;</summary> 
public static string EditPage_PageTypeSelectorHelp=>T("EditPage.PageTypeSelectorHelp");
///<summary>&quot;{0} characters maximum&quot;</summary> 
public static string EditPage_MaxLength(object parameter0)=>string.Format(T("EditPage.MaxLength"), parameter0);
///<summary>&quot;Delete page?&quot;</summary> 
public static string DeletePage_LabelFieldGroup=>T("DeletePage.LabelFieldGroup");
///<summary>&quot;Delete page and all subpages&quot;</summary> 
public static string DeletePageStep1_Title=>T("DeletePageStep1.Title");
///<summary>&quot;All subpages will also be deleted. Continue?&quot;</summary> 
public static string DeletePageStep1_Description=>T("DeletePageStep1.Description");
///<summary>&quot;Delete page &apos;{0}&apos;?&quot;</summary> 
public static string DeletePageStep2_Text(object parameter0)=>string.Format(T("DeletePageStep2.Text"), parameter0);
///<summary>&quot;Another page is using the specified URL title. URL titles must be unique among pages with the same parent.&quot;</summary> 
public static string UrlTitleNotUniqueError=>T("UrlTitleNotUniqueError");
///<summary>&quot;The specified URL title contains invalid characters. Since this field is used to build the web address for the page, certain special characters (like question mark, slash and dot) are not allowed. You can use letters, digits and dash.&quot;</summary> 
public static string UrlTitleNotValidError=>T("UrlTitleNotValidError");
///<summary>&quot;The specified URL title is too long. Make it shorter and try again&quot;</summary> 
public static string UrlTitleTooLong=>T("UrlTitleTooLong");
///<summary>&quot;Another page is using the specified Friendly URL. Friendly URL&apos;s must be unique.&quot;</summary> 
public static string FriendlyUrlNotUniqueError=>T("FriendlyUrlNotUniqueError");
///<summary>&quot;The title can not be empty.&quot;</summary> 
public static string TitleMissingError=>T("TitleMissingError");
///<summary>&quot;Page not saved&quot;</summary> 
public static string PageSaveValidationFailedTitle=>T("PageSaveValidationFailedTitle");
///<summary>&quot;The page did not validate and has not been saved. Please examine field messages.&quot;</summary> 
public static string PageSaveValidationFailedMessage=>T("PageSaveValidationFailedMessage");
///<summary>&quot;Websites&quot;</summary> 
public static string PageElementProvider_RootLabel=>T("PageElementProvider.RootLabel");
///<summary>&quot;Websites&quot;</summary> 
public static string PageElementProvider_RootLabelToolTip=>T("PageElementProvider.RootLabelToolTip");
///<summary>&quot;Add Website&quot;</summary> 
public static string PageElementProvider_AddPageAtRoot=>T("PageElementProvider.AddPageAtRoot");
///<summary>&quot;Add {0}&quot;</summary> 
public static string PageElementProvider_AddPageAtRootFormat(object parameter0)=>string.Format(T("PageElementProvider.AddPageAtRootFormat"), parameter0);
///<summary>&quot;Add new homepage&quot;</summary> 
public static string PageElementProvider_AddPageAtRootToolTip=>T("PageElementProvider.AddPageAtRootToolTip");
///<summary>&quot;List Unpublished Pages&quot;</summary> 
public static string PageElementProvider_ViewUnpublishedItems=>T("PageElementProvider.ViewUnpublishedItems");
///<summary>&quot;Get an overview of pages and page folder data that haven&apos;t been published yet.&quot;</summary> 
public static string PageElementProvider_ViewUnpublishedItemsToolTip=>T("PageElementProvider.ViewUnpublishedItemsToolTip");
///<summary>&quot;Unpublished content&quot;</summary> 
public static string PageElementProvider_ViewUnpublishedItems_document_title=>T("PageElementProvider.ViewUnpublishedItems-document-title");
///<summary>&quot;The list below displays pages and page data which are currently being edited or are ready to be approved / published.&quot;</summary> 
public static string PageElementProvider_ViewUnpublishedItems_document_description=>T("PageElementProvider.ViewUnpublishedItems-document-description");
///<summary>&quot;Edit Page&quot;</summary> 
public static string PageElementProvider_EditPage=>T("PageElementProvider.EditPage");
///<summary>&quot;Edit selected page&quot;</summary> 
public static string PageElementProvider_EditPageToolTip=>T("PageElementProvider.EditPageToolTip");
///<summary>&quot;Delete&quot;</summary> 
public static string PageElementProvider_Delete=>T("PageElementProvider.Delete");
///<summary>&quot;Delete the selected page&quot;</summary> 
public static string PageElementProvider_DeleteToolTip=>T("PageElementProvider.DeleteToolTip");
///<summary>&quot;Translate Page&quot;</summary> 
public static string PageElementProvider_LocalizePage=>T("PageElementProvider.LocalizePage");
///<summary>&quot;Translate selected page&quot;</summary> 
public static string PageElementProvider_LocalizePageToolTip=>T("PageElementProvider.LocalizePageToolTip");
///<summary>&quot;Add page&quot;</summary> 
public static string PageElementProvider_AddSubPage=>T("PageElementProvider.AddSubPage");
///<summary>&quot;Add {0}&quot;</summary> 
public static string PageElementProvider_AddSubPageFormat(object parameter0)=>string.Format(T("PageElementProvider.AddSubPageFormat"), parameter0);
///<summary>&quot;Add new page below the selected&quot;</summary> 
public static string PageElementProvider_AddSubPageToolTip=>T("PageElementProvider.AddSubPageToolTip");
///<summary>&quot;Show page local orderings&quot;</summary> 
public static string PageElementProvider_DisplayLocalOrderingLabel=>T("PageElementProvider.DisplayLocalOrderingLabel");
///<summary>&quot;Show page local orderings&quot;</summary> 
public static string PageElementProvider_DisplayLocalOrderingToolTip=>T("PageElementProvider.DisplayLocalOrderingToolTip");
///<summary>&quot;Not yet approved or published&quot;</summary> 
public static string PageElementProvider_DisabledPage=>T("PageElementProvider.DisabledPage");
///<summary>&quot;Website Template required&quot;</summary> 
public static string PageElementProvider_MissingTemplateTitle=>T("PageElementProvider.MissingTemplateTitle");
///<summary>&quot;You should create a &apos;Page Template&apos; first. Go to the &apos;Layout&apos; perspective and create one.&quot;</summary> 
public static string PageElementProvider_MissingTemplateMessage=>T("PageElementProvider.MissingTemplateMessage");
///<summary>&quot;Language required&quot;</summary> 
public static string PageElementProvider_MissingActiveLanguageTitle=>T("PageElementProvider.MissingActiveLanguageTitle");
///<summary>&quot;To add a page, you should firstly add at least one language. It can be done in the &apos;System&apos; perspective.&quot;</summary> 
public static string PageElementProvider_MissingActiveLanguageMessage=>T("PageElementProvider.MissingActiveLanguageMessage");
///<summary>&quot;No page type available&quot;</summary> 
public static string PageElementProvider_NoPageTypesAvailableTitle=>T("PageElementProvider.NoPageTypesAvailableTitle");
///<summary>&quot;You should create a &apos;Page Type&apos; first. Go to the &apos;Layout&apos; perspective and create one.&quot;</summary> 
public static string PageElementProvider_NoPageTypesAvailableMessage=>T("PageElementProvider.NoPageTypesAvailableMessage");
///<summary>&quot;Page type required&quot;</summary> 
public static string PageElementProvider_MissingPageTypeTitle=>T("PageElementProvider.MissingPageTypeTitle");
///<summary>&quot;To create a homepage, a page type without the &quot;only subpages&quot; restriction is required, but none have been added yet. You can add one under the Layout perspective.&quot;</summary> 
public static string PageElementProvider_MissingPageTypeHomepageMessage=>T("PageElementProvider.MissingPageTypeHomepageMessage");
///<summary>&quot;To create a subpage, a page type without the the only homepages restriction is required, but none have been added yet. You can add one under the Layout perspective.&quot;</summary> 
public static string PageElementProvider_MissingPageTypeSubpageMessage=>T("PageElementProvider.MissingPageTypeSubpageMessage");
///<summary>&quot;Unable to add a page!&quot;</summary> 
public static string PageElementProvider_RuleDontAllowPageAddTitle=>T("PageElementProvider.RuleDontAllowPageAddTitle");
///<summary>&quot;The rules that define availability for Page Types prohibit adding a page here.&quot;</summary> 
public static string PageElementProvider_RuleDontAllowPageAddMessage=>T("PageElementProvider.RuleDontAllowPageAddMessage");
///<summary>&quot;Manage host name&quot;</summary> 
public static string ManageHostNames_Add_DialogLabel=>T("ManageHostNames.Add.DialogLabel");
///<summary>&quot;Add host name association to page&quot;</summary> 
public static string ManageHostNames_Add_HeadingTitle=>T("ManageHostNames.Add.HeadingTitle");
///<summary>&quot;You can associate a host name (or a domain name) to a page by specifying it in the field below. Please note that the DNS settings for the specified host name must also be configured, which is done outside this system.&quot;</summary> 
public static string ManageHostNames_Add_HeadingDescription=>T("ManageHostNames.Add.HeadingDescription");
///<summary>&quot;Host name association to page&quot;</summary> 
public static string ManageHostNames_Add_FieldGroupLabel=>T("ManageHostNames.Add.FieldGroupLabel");
///<summary>&quot;Host name&quot;</summary> 
public static string ManageHostNames_Add_HostNameTextBoxLabel=>T("ManageHostNames.Add.HostNameTextBoxLabel");
///<summary>&quot;Specify the host name (like &apos;www.composite.net&apos; or &apos;composite.net&apos;) you want to associate with this page&quot;</summary> 
public static string ManageHostNames_Add_HostNametextBoxHelp=>T("ManageHostNames.Add.HostNametextBoxHelp");
///<summary>&quot;The syntax of the host name is not valid&quot;</summary> 
public static string ManageHostNames_Add_InvalidHostNameSyntaxError=>T("ManageHostNames.Add.InvalidHostNameSyntaxError");
///<summary>&quot;This host name is already associated to a page. You must remove the existing association first.&quot;</summary> 
public static string ManageHostNames_Add_HostNameNotUniqueError=>T("ManageHostNames.Add.HostNameNotUniqueError");
///<summary>&quot;Manage host name&quot;</summary> 
public static string ManageHostNames_Remove_DialogLabel=>T("ManageHostNames.Remove.DialogLabel");
///<summary>&quot;Remove host name association from page&quot;</summary> 
public static string ManageHostNames_Remove_FieldGroupLabel=>T("ManageHostNames.Remove.FieldGroupLabel");
///<summary>&quot;Host names to remove&quot;</summary> 
public static string ManageHostNames_Remove_MultiSelectorLabel=>T("ManageHostNames.Remove.MultiSelectorLabel");
///<summary>&quot;The host names you select will no longer be associated with the page&quot;</summary> 
public static string ManageHostNames_Remove_MultiSelectorHelp=>T("ManageHostNames.Remove.MultiSelectorHelp");
///<summary>&quot;Please confirm deletion of all sub pages&quot;</summary> 
public static string DeletePageWorkflow_MissingConfirmErrorMessage=>T("DeletePageWorkflow.MissingConfirmErrorMessage");
///<summary>&quot;Cascade delete error&quot;</summary> 
public static string DeletePageWorkflow_CascadeDeleteErrorTitle=>T("DeletePageWorkflow.CascadeDeleteErrorTitle");
///<summary>&quot;The page is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
public static string DeletePageWorkflow_CascadeDeleteErrorMessage=>T("DeletePageWorkflow.CascadeDeleteErrorMessage");
///<summary>&quot;Can not delete page&quot;</summary> 
public static string DeletePageWorkflow_HasCompositionsTitle=>T("DeletePageWorkflow.HasCompositionsTitle");
///<summary>&quot;This page has one or more page folders or metadata fields defined on it. Delete these first.&quot;</summary> 
public static string DeletePageWorkflow_HasCompositionsMessage=>T("DeletePageWorkflow.HasCompositionsMessage");
///<summary>&quot;Page Title&quot;</summary> 
public static string ViewUnpublishedItems_PageTitleLabel=>T("ViewUnpublishedItems.PageTitleLabel");
///<summary>&quot;Version&quot;</summary> 
public static string ViewUnpublishedItems_VersionLabel=>T("ViewUnpublishedItems.VersionLabel");
///<summary>&quot;Status&quot;</summary> 
public static string ViewUnpublishedItems_StatusLabel=>T("ViewUnpublishedItems.StatusLabel");
///<summary>&quot;Publish Date&quot;</summary> 
public static string ViewUnpublishedItems_PublishDateLabel=>T("ViewUnpublishedItems.PublishDateLabel");
///<summary>&quot;This is the date and time that has been set for the page to be published automatically. To update or remove, see the Publication Schedule in Edit Page mode. Otherwise you can override these dates by publishing manually from this view.&quot;</summary> 
public static string ViewUnpublishedItems_PublishDateHelp=>T("ViewUnpublishedItems.PublishDateHelp");
///<summary>&quot;Unpublish Date&quot;</summary> 
public static string ViewUnpublishedItems_UnpublishDateLabel=>T("ViewUnpublishedItems.UnpublishDateLabel");
///<summary>&quot;This is the date and time that has been set for the page to be unpublished automatically. To update or remove, see the Publication Schedule in Edit Page mode.&quot;</summary> 
public static string ViewUnpublishedItems_UnpublishDateHelp=>T("ViewUnpublishedItems.UnpublishDateHelp");
///<summary>&quot;Date Created&quot;</summary> 
public static string ViewUnpublishedItems_DateCreatedLabel=>T("ViewUnpublishedItems.DateCreatedLabel");
///<summary>&quot;Date Modified&quot;</summary> 
public static string ViewUnpublishedItems_DateModifiedLabel=>T("ViewUnpublishedItems.DateModifiedLabel");
///<summary>&quot;Publish Pages&quot;</summary> 
public static string ViewUnpublishedItems_PublishConfirmTitle=>T("ViewUnpublishedItems.PublishConfirmTitle");
///<summary>&quot;You are about to publish these pages. Continue?&quot;</summary> 
public static string ViewUnpublishedItems_PublishConfirmText=>T("ViewUnpublishedItems.PublishConfirmText");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PageTemplateElementProvider {
///<summary>&quot;Page Templates&quot;</summary> 
public static string PageTemplateElementProvider_RootLabel=>T("PageTemplateElementProvider.RootLabel");
///<summary>&quot;You can find the sites XHTML templates here&quot;</summary> 
public static string PageTemplateElementProvider_RootLabelToolTip=>T("PageTemplateElementProvider.RootLabelToolTip");
///<summary>&quot;Add Template&quot;</summary> 
public static string PageTemplateElementProvider_AddTemplate=>T("PageTemplateElementProvider.AddTemplate");
///<summary>&quot;Add new template&quot;</summary> 
public static string PageTemplateElementProvider_AddTemplateToolTip=>T("PageTemplateElementProvider.AddTemplateToolTip");
///<summary>&quot;Delete&quot;</summary> 
public static string PageTemplateElementProvider_DeleteTemplate=>T("PageTemplateElementProvider.DeleteTemplate");
///<summary>&quot;Delete this item&quot;</summary> 
public static string PageTemplateElementProvider_DeleteTemplateToolTip=>T("PageTemplateElementProvider.DeleteTemplateToolTip");
///<summary>&quot;Shared Code&quot;</summary> 
public static string PageTemplateElementProvider_SharedCodeFolder_Title=>T("PageTemplateElementProvider.SharedCodeFolder.Title");
///<summary>&quot;Files used by layout files&quot;</summary> 
public static string PageTemplateElementProvider_SharedCodeFolder_ToolTip=>T("PageTemplateElementProvider.SharedCodeFolder.ToolTip");
///<summary>&quot;Edit&quot;</summary> 
public static string EditSharedCodeFile_Label=>T("EditSharedCodeFile.Label");
///<summary>&quot;Edit the file&quot;</summary> 
public static string EditSharedCodeFile_ToolTip=>T("EditSharedCodeFile.ToolTip");
///<summary>&quot;Edit XML Template&quot;</summary> 
public static string PageTemplateElementProvider_EditXmlTemplate=>T("PageTemplateElementProvider.EditXmlTemplate");
///<summary>&quot;Edit the selected XML template&quot;</summary> 
public static string PageTemplateElementProvider_EditXmlTemplateToolTip=>T("PageTemplateElementProvider.EditXmlTemplateToolTip");
///<summary>&quot;Add New XML Page Template&quot;</summary> 
public static string AddNewXmlPageTemplate_LabelDialog=>T("AddNewXmlPageTemplate.LabelDialog");
///<summary>&quot;Template Title&quot;</summary> 
public static string AddNewXmlPageTemplate_LabelTemplateTitle=>T("AddNewXmlPageTemplate.LabelTemplateTitle");
///<summary>&quot;The title identifies this template in lists. Consider selecting a short but meaningful name.&quot;</summary> 
public static string AddNewXmlPageTemplate_LabelTemplateTitleHelp=>T("AddNewXmlPageTemplate.LabelTemplateTitleHelp");
///<summary>&quot;Copy from&quot;</summary> 
public static string AddNewXmlPageTemplate_LabelCopyFrom=>T("AddNewXmlPageTemplate.LabelCopyFrom");
///<summary>&quot;You can copy the markup from another XML Page Template by selecting it in this list.&quot;</summary> 
public static string AddNewXmlPageTemplate_LabelCopyFromHelp=>T("AddNewXmlPageTemplate.LabelCopyFromHelp");
///<summary>&quot;(New template)&quot;</summary> 
public static string AddNewXmlPageTemplate_LabelCopyFromEmptyOption=>T("AddNewXmlPageTemplate.LabelCopyFromEmptyOption");
///<summary>&quot;Title already used&quot;</summary> 
public static string AddNewXmlPageTemplateWorkflow_TitleInUseTitle=>T("AddNewXmlPageTemplateWorkflow.TitleInUseTitle");
///<summary>&quot;The title is too long (used as part of the XML filename).&quot;</summary> 
public static string AddNewXmlPageTemplateWorkflow_TitleTooLong=>T("AddNewXmlPageTemplateWorkflow.TitleTooLong");
///<summary>&quot;Markup Code&quot;</summary> 
public static string EditXmlPageTemplate_LabelMarkUpCode=>T("EditXmlPageTemplate.LabelMarkUpCode");
///<summary>&quot;Template Info&quot;</summary> 
public static string EditXmlPageTemplate_LabelTemplateIdentification=>T("EditXmlPageTemplate.LabelTemplateIdentification");
///<summary>&quot;Template Title&quot;</summary> 
public static string EditXmlPageTemplate_LabelTemplateTitle=>T("EditXmlPageTemplate.LabelTemplateTitle");
///<summary>&quot;The title identifies this template in lists. Consider selecting a short but meaningful name.&quot;</summary> 
public static string EditXmlPageTemplate_LabelTemplateTitleHelp=>T("EditXmlPageTemplate.LabelTemplateTitleHelp");
///<summary>&quot;Unable to Save Template&quot;</summary> 
public static string EditXmlPageTemplateWorkflow_InvalidXmlTitle=>T("EditXmlPageTemplateWorkflow.InvalidXmlTitle");
///<summary>&quot;The page template markup did not validate. {0}&quot;</summary> 
public static string EditXmlPageTemplateWorkflow_InvalidXmlMessage(object parameter0)=>string.Format(T("EditXmlPageTemplateWorkflow.InvalidXmlMessage"), parameter0);
///<summary>&quot;Cannot rename a template - the file with the name &apos;{0}&apos; already exists.&quot;</summary> 
public static string EditXmlPageTemplateWorkflow_CannotRenameFileExists(object parameter0)=>string.Format(T("EditXmlPageTemplateWorkflow.CannotRenameFileExists"), parameter0);
///<summary>&quot;Title already used&quot;</summary> 
public static string EditXmlPageTemplateWorkflow_TitleInUseTitle=>T("EditXmlPageTemplateWorkflow.TitleInUseTitle");
///<summary>&quot;Delete This Page Template?&quot;</summary> 
public static string DeletePageTemplateStep1_LabelFieldGroup=>T("DeletePageTemplateStep1.LabelFieldGroup");
///<summary>&quot;Delete page template?&quot;</summary> 
public static string DeletePageTemplateStep1_Text=>T("DeletePageTemplateStep1.Text");
///<summary>&quot;Cascade Delete Error&quot;</summary> 
public static string DeletePageTemplateWorkflow_CascadeDeleteErrorTitle=>T("DeletePageTemplateWorkflow.CascadeDeleteErrorTitle");
///<summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted.&quot;</summary> 
public static string DeletePageTemplateWorkflow_CascadeDeleteErrorMessage=>T("DeletePageTemplateWorkflow.CascadeDeleteErrorMessage");
///<summary>&quot;There are {0} page[s] referencing this template: {1}&quot;</summary> 
public static string DeletePageTemplateWorkflow_PageReference(object parameter0,object parameter1)=>string.Format(T("DeletePageTemplateWorkflow.PageReference"), parameter0,parameter1);
///<summary>&quot;There are {0} page type[s] referencing this template: {1}&quot;</summary> 
public static string DeletePageTemplateWorkflow_PageTypeReference(object parameter0,object parameter1)=>string.Format(T("DeletePageTemplateWorkflow.PageTypeReference"), parameter0,parameter1);
///<summary>&quot;Add New Page Template&quot;</summary> 
public static string AddNewPageTemplate_LabelDialog=>T("AddNewPageTemplate.LabelDialog");
///<summary>&quot;Choose one of the possible types of page templates&quot;</summary> 
public static string AddNewPageTemplate_TemplateTypeHelp=>T("AddNewPageTemplate.TemplateTypeHelp");
///<summary>&quot;Template type&quot;</summary> 
public static string AddNewPageTemplate_TemplateTypeLabel=>T("AddNewPageTemplate.TemplateTypeLabel");
///<summary>&quot;Razor&quot;</summary> 
public static string AddNewPageTemplate_TemplateType_Razor=>T("AddNewPageTemplate.TemplateType.Razor");
///<summary>&quot;Master Page&quot;</summary> 
public static string AddNewPageTemplate_TemplateType_MasterPage=>T("AddNewPageTemplate.TemplateType.MasterPage");
///<summary>&quot;XML&quot;</summary> 
public static string AddNewPageTemplate_TemplateType_XML=>T("AddNewPageTemplate.TemplateType.XML");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PageTemplateFeatureElementProvider {
///<summary>&quot;Page Template Features&quot;</summary> 
public static string ElementProvider_RootLabel=>T("ElementProvider.RootLabel");
///<summary>&quot;Here you can find features - snippets of HTML and functionality - included in the website templates.&quot;</summary> 
public static string ElementProvider_RootToolTip=>T("ElementProvider.RootToolTip");
///<summary>&quot;Add Template Feature&quot;</summary> 
public static string ElementProvider_AddTemplateFeature=>T("ElementProvider.AddTemplateFeature");
///<summary>&quot;Add a new page template feature&quot;</summary> 
public static string ElementProvider_AddTemplateFeatureToolTip=>T("ElementProvider.AddTemplateFeatureToolTip");
///<summary>&quot;Delete Template Feature&quot;</summary> 
public static string ElementProvider_DeleteTemplateFeature=>T("ElementProvider.DeleteTemplateFeature");
///<summary>&quot;Delete this template feature&quot;</summary> 
public static string ElementProvider_DeleteTemplateFeatureToolTip=>T("ElementProvider.DeleteTemplateFeatureToolTip");
///<summary>&quot;Edit Template Feature&quot;</summary> 
public static string ElementProvider_EditTemplateFeature=>T("ElementProvider.EditTemplateFeature");
///<summary>&quot;Edit the selected template feature&quot;</summary> 
public static string ElementProvider_EditTemplateFeatureToolTip=>T("ElementProvider.EditTemplateFeatureToolTip");
///<summary>&quot;Use Visual Editor&quot;</summary> 
public static string ElementProvider_EditVisually=>T("ElementProvider.EditVisually");
///<summary>&quot;When enabled the visual editor will be used to manage this feature&quot;</summary> 
public static string ElementProvider_EditVisuallyToolTip=>T("ElementProvider.EditVisuallyToolTip");
///<summary>&quot;Add New Page Template Feature&quot;</summary> 
public static string AddWorkflow_LabelDialog=>T("AddWorkflow.LabelDialog");
///<summary>&quot;Feature name&quot;</summary> 
public static string AddWorkflow_LabelTemplateFeatureName=>T("AddWorkflow.LabelTemplateFeatureName");
///<summary>&quot;The name is used to identify this feature when included in templates&quot;</summary> 
public static string AddWorkflow_LabelTemplateFeatureNameHelp=>T("AddWorkflow.LabelTemplateFeatureNameHelp");
///<summary>&quot;Editor type&quot;</summary> 
public static string AddWorkflow_LabelTemplateFeatureEditorType=>T("AddWorkflow.LabelTemplateFeatureEditorType");
///<summary>&quot;Choose which type of editor to use when maintaining this feature. You can always switch the editor type in the tree later.&quot;</summary> 
public static string AddWorkflow_LabelTemplateFeatureEditorTypeHelp=>T("AddWorkflow.LabelTemplateFeatureEditorTypeHelp");
///<summary>&quot;Visual Editor&quot;</summary> 
public static string AddWorkflow_LabelTemplateFeatureEditorType_html=>T("AddWorkflow.LabelTemplateFeatureEditorType.html");
///<summary>&quot;Markup Editor&quot;</summary> 
public static string AddWorkflow_LabelTemplateFeatureEditorType_xml=>T("AddWorkflow.LabelTemplateFeatureEditorType.xml");
///<summary>&quot;The name is already used by another feature&quot;</summary> 
public static string AddWorkflow_NameInUse=>T("AddWorkflow.NameInUse");
///<summary>&quot;The title is too long (max 50 characters)&quot;</summary> 
public static string AddWorkflow_NameTooLong=>T("AddWorkflow.NameTooLong");
///<summary>&quot;The name must be usable in a file name - you have invalid characters you need to remove&quot;</summary> 
public static string AddWorkflow_NameNotValidInFilename=>T("AddWorkflow.NameNotValidInFilename");
///<summary>&quot;Delete This Page Template Feature?&quot;</summary> 
public static string DeleteWorkflow_Title=>T("DeleteWorkflow.Title");
///<summary>&quot;If this feature is in use by page templates, this action could lead to errors.&quot;</summary> 
public static string DeleteWorkflow_Text=>T("DeleteWorkflow.Text");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_PageTypeElementProvider {
///<summary>&quot;Page Types&quot;</summary> 
public static string PageType_Tree_Root_Label=>T("PageType.Tree.Root.Label");
///<summary>&quot;Placeholder Content&quot;</summary> 
public static string PageType_Tree_DefaultContentElement_Label=>T("PageType.Tree.DefaultContentElement.Label");
///<summary>&quot;Metadata Fields&quot;</summary> 
public static string PageType_Tree_MetaDataFieldsElement_Label=>T("PageType.Tree.MetaDataFieldsElement.Label");
///<summary>&quot;Add Page Type&quot;</summary> 
public static string PageType_Tree_AddNewPageType_Label=>T("PageType.Tree.AddNewPageType.Label");
///<summary>&quot;Add new page type&quot;</summary> 
public static string PageType_Tree_AddNewPageType_ToolTip=>T("PageType.Tree.AddNewPageType.ToolTip");
///<summary>&quot;Edit Page Type&quot;</summary> 
public static string PageType_Tree_EditPageType_Label=>T("PageType.Tree.EditPageType.Label");
///<summary>&quot;Edit selected page type&quot;</summary> 
public static string PageType_Tree_EditPageType_ToolTip=>T("PageType.Tree.EditPageType.ToolTip");
///<summary>&quot;Delete Page Type&quot;</summary> 
public static string PageType_Tree_DeletePageType_Label=>T("PageType.Tree.DeletePageType.Label");
///<summary>&quot;Delete selected page type&quot;</summary> 
public static string PageType_Tree_DeletePageType_ToolTip=>T("PageType.Tree.DeletePageType.ToolTip");
///<summary>&quot;Add Default Content&quot;</summary> 
public static string PageType_Tree_AddDefaultPageContent_Label=>T("PageType.Tree.AddDefaultPageContent.Label");
///<summary>&quot;Add placeholder default content&quot;</summary> 
public static string PageType_Tree_AddDefaultPageContent_ToolTip=>T("PageType.Tree.AddDefaultPageContent.ToolTip");
///<summary>&quot;Edit Default Content&quot;</summary> 
public static string PageType_Tree_EditDefaultPageContent_Label=>T("PageType.Tree.EditDefaultPageContent.Label");
///<summary>&quot;Edit placeholder default content&quot;</summary> 
public static string PageType_Tree_EditDefaultPageContent_ToolTip=>T("PageType.Tree.EditDefaultPageContent.ToolTip");
///<summary>&quot;Delete Default Content&quot;</summary> 
public static string PageType_Tree_DeleteDefaultPageContent_Label=>T("PageType.Tree.DeleteDefaultPageContent.Label");
///<summary>&quot;Delete default content&quot;</summary> 
public static string PageType_Tree_DeleteDefaultPageContent_ToolTip=>T("PageType.Tree.DeleteDefaultPageContent.ToolTip");
///<summary>&quot;Add Metadata Field&quot;</summary> 
public static string PageType_Tree_AddMetaDataField_Label=>T("PageType.Tree.AddMetaDataField.Label");
///<summary>&quot;Add new Metadata field&quot;</summary> 
public static string PageType_Tree_AddMetaDataField_ToolTip=>T("PageType.Tree.AddMetaDataField.ToolTip");
///<summary>&quot;Edit Metadata Field&quot;</summary> 
public static string PageType_Tree_EditMetaDataField_Label=>T("PageType.Tree.EditMetaDataField.Label");
///<summary>&quot;Edit selected Metadata field&quot;</summary> 
public static string PageType_Tree_EditMetaDataField_ToolTip=>T("PageType.Tree.EditMetaDataField.ToolTip");
///<summary>&quot;Delete Metadata Field&quot;</summary> 
public static string PageType_Tree_DeleteMetaDataField_Label=>T("PageType.Tree.DeleteMetaDataField.Label");
///<summary>&quot;Delete selected Metadata field&quot;</summary> 
public static string PageType_Tree_DeleteMetaDataField_ToolTip=>T("PageType.Tree.DeleteMetaDataField.ToolTip");
///<summary>&quot;Add New Page Type&quot;</summary> 
public static string PageType_AddNewPageTypeWorkflow_Layout_Label=>T("PageType.AddNewPageTypeWorkflow.Layout.Label");
///<summary>&quot;New page type settings&quot;</summary> 
public static string PageType_AddNewPageTypeWorkflow_FieldGroup_Label=>T("PageType.AddNewPageTypeWorkflow.FieldGroup.Label");
///<summary>&quot;Name&quot;</summary> 
public static string PageType_AddNewPageTypeWorkflow_NameTextBox_Label=>T("PageType.AddNewPageTypeWorkflow.NameTextBox.Label");
///<summary>&quot;The name of the new page type&quot;</summary> 
public static string PageType_AddNewPageTypeWorkflow_NameTextBox_Help=>T("PageType.AddNewPageTypeWorkflow.NameTextBox.Help");
///<summary>&quot;Description&quot;</summary> 
public static string PageType_AddNewPageTypeWorkflow_DescriptionTextArea_Label=>T("PageType.AddNewPageTypeWorkflow.DescriptionTextArea.Label");
///<summary>&quot;The description of the new page type&quot;</summary> 
public static string PageType_AddNewPageTypeWorkflow_DescriptionTextArea_Help=>T("PageType.AddNewPageTypeWorkflow.DescriptionTextArea.Help");
///<summary>&quot;Settings&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_SettingsPlaceHolder_Label=>T("PageType.EditPageTypeWorkflow.SettingsPlaceHolder.Label");
///<summary>&quot;Page type settings&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_SettingsFieldGroup_Label=>T("PageType.EditPageTypeWorkflow.SettingsFieldGroup.Label");
///<summary>&quot;Name&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_NameTextBox_Label=>T("PageType.EditPageTypeWorkflow.NameTextBox.Label");
///<summary>&quot;The name of the page type&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_NameTextBox_Help=>T("PageType.EditPageTypeWorkflow.NameTextBox.Help");
///<summary>&quot;Description&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_DescriptionTextArea_Label=>T("PageType.EditPageTypeWorkflow.DescriptionTextArea.Label");
///<summary>&quot;The description of the page type&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_DescriptionTextArea_Help=>T("PageType.EditPageTypeWorkflow.DescriptionTextArea.Help");
///<summary>&quot;Available&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_AvailableCheckBox_Label=>T("PageType.EditPageTypeWorkflow.AvailableCheckBox.Label");
///<summary>&quot;Unchecking this will make this page non-selectable on any page&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_AvailableCheckBox_Help=>T("PageType.EditPageTypeWorkflow.AvailableCheckBox.Help");
///<summary>&quot;Preset menu title&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_PresetMenuTitleCheckBox_Label=>T("PageType.EditPageTypeWorkflow.PresetMenuTitleCheckBox.Label");
///<summary>&quot;If this is checked a default value for the menu title on pages is preset&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_PresetMenuTitleCheckBox_Help=>T("PageType.EditPageTypeWorkflow.PresetMenuTitleCheckBox.Help");
///<summary>&quot;Default child page type&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_DefaultChildPageTypeKeySelector_Label=>T("PageType.EditPageTypeWorkflow.DefaultChildPageTypeKeySelector.Label");
///<summary>&quot;Select a page type to be the default page type for child pages created with this page type&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_DefaultChildPageTypeKeySelector_Help=>T("PageType.EditPageTypeWorkflow.DefaultChildPageTypeKeySelector.Help");
///<summary>&quot;[None]&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_DefaultChildPageTypeKeySelector_NoneSelectedLabel=>T("PageType.EditPageTypeWorkflow.DefaultChildPageTypeKeySelector.NoneSelectedLabel");
///<summary>&quot;Layout&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_PageTemplatePlaceHolder_Label=>T("PageType.EditPageTypeWorkflow.PageTemplatePlaceHolder.Label");
///<summary>&quot;Layout&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_PageTemplateRestrictionFieldGroup_Label=>T("PageType.EditPageTypeWorkflow.PageTemplateRestrictionFieldGroup.Label");
///<summary>&quot;Layout restrictions&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_PageTemplateRestrictionMultiKeySelector_Label=>T("PageType.EditPageTypeWorkflow.PageTemplateRestrictionMultiKeySelector.Label");
///<summary>&quot;Select layouts to be only available when editing pages of this page type. If none is selected (default), all will be available.&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_PageTemplateRestrictionMultiKeySelector_Help=>T("PageType.EditPageTypeWorkflow.PageTemplateRestrictionMultiKeySelector.Help");
///<summary>&quot;Default layout&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_DefaultPageTemplateKeySelector_Label=>T("PageType.EditPageTypeWorkflow.DefaultPageTemplateKeySelector.Label");
///<summary>&quot;Select a layout to be the default layout for pages created with this page type&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_DefaultPageTemplateKeySelector_Help=>T("PageType.EditPageTypeWorkflow.DefaultPageTemplateKeySelector.Help");
///<summary>&quot;[None]&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_DefaultPageTemplateKeySelector_NoneSelectedLabel=>T("PageType.EditPageTypeWorkflow.DefaultPageTemplateKeySelector.NoneSelectedLabel");
///<summary>&quot;Availability&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_AvailabilityPlaceHolder_Label=>T("PageType.EditPageTypeWorkflow.AvailabilityPlaceHolder.Label");
///<summary>&quot;Availability&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_AvailabilityFieldGroup_Label=>T("PageType.EditPageTypeWorkflow.AvailabilityFieldGroup.Label");
///<summary>&quot;Homepage relation&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_Label=>T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.Label");
///<summary>&quot;Homepage relation&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_Help=>T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.Help");
///<summary>&quot;No restrictions&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_NoRestrictionLabel=>T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.NoRestrictionLabel");
///<summary>&quot;Only sub pages&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_OnlySubPagesLabel=>T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.OnlySubPagesLabel");
///<summary>&quot;Only home pages&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_HomepageRelationKeySelector_OnlyHomePagesLabel=>T("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.OnlyHomePagesLabel");
///<summary>&quot;Page type parent restriction&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_PageTypeChildRestrictionMultiKeySelector_Label=>T("PageType.EditPageTypeWorkflow.PageTypeChildRestrictionMultiKeySelector.Label");
///<summary>&quot;Only allow this page type as for child pages with the selected page types&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_PageTypeChildRestrictionMultiKeySelector_Help=>T("PageType.EditPageTypeWorkflow.PageTypeChildRestrictionMultiKeySelector.Help");
///<summary>&quot;DataFolders / Applications&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_DataFolderApplicationPlaceHolder_Label=>T("PageType.EditPageTypeWorkflow.DataFolderApplicationPlaceHolder.Label");
///<summary>&quot;Data folders&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_DataFolderFieldGroup_Label=>T("PageType.EditPageTypeWorkflow.DataFolderFieldGroup.Label");
///<summary>&quot;Data folders&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_DataFolderMultiKeySelector_Label=>T("PageType.EditPageTypeWorkflow.DataFolderMultiKeySelector.Label");
///<summary>&quot;Select the data folders that should automatically be added to pages using this page type&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_DataFolderMultiKeySelector_Help=>T("PageType.EditPageTypeWorkflow.DataFolderMultiKeySelector.Help");
///<summary>&quot;Applications&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_ApplicationFieldGroup_Label=>T("PageType.EditPageTypeWorkflow.ApplicationFieldGroup.Label");
///<summary>&quot;Applications&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_ApplicationMultiKeySelector_Label=>T("PageType.EditPageTypeWorkflow.ApplicationMultiKeySelector.Label");
///<summary>&quot;Select the applications that should automatically be added to pages using this page type&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_ApplicationMultiKeySelector_Help=>T("PageType.EditPageTypeWorkflow.ApplicationMultiKeySelector.Help");
///<summary>&quot;The default layout is not one of the selected restricted layouts&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_ValidationError_DefaultTemplateNotInRestrictions=>T("PageType.EditPageTypeWorkflow.ValidationError.DefaultTemplateNotInRestrictions");
///<summary>&quot;Page type parent restrictions are not allowed with home pages only&quot;</summary> 
public static string PageType_EditPageTypeWorkflow_ValidationError_HomepageRelationConflictsWithParentRestrictions=>T("PageType.EditPageTypeWorkflow.ValidationError.HomepageRelationConflictsWithParentRestrictions");
///<summary>&quot;Delete This Page Type?&quot;</summary> 
public static string PageType_DeletePageTypeWorkflow_Confirm_Layout_Label=>T("PageType.DeletePageTypeWorkflow.Confirm.Layout.Label");
///<summary>&quot;Delete the page type {0}?&quot;</summary> 
public static string PageType_DeletePageTypeWorkflow_Confirm_Layout_Messeage(object parameter0)=>string.Format(T("PageType.DeletePageTypeWorkflow.Confirm.Layout.Messeage"), parameter0);
///<summary>&quot;Page Type in Use&quot;</summary> 
public static string PageType_DeletePageTypeWorkflow_PagesRefering_Layout_Label=>T("PageType.DeletePageTypeWorkflow.PagesRefering.Layout.Label");
///<summary>&quot;The page type {0} is in use and it is not possible to delete it&quot;</summary> 
public static string PageType_DeletePageTypeWorkflow_PagesRefering_Layout_Message(object parameter0)=>string.Format(T("PageType.DeletePageTypeWorkflow.PagesRefering.Layout.Message"), parameter0);
///<summary>&quot;Add Default Content&quot;</summary> 
public static string PageType_AddPageTypeDefaultPageContentWorkflow_Layout_Label=>T("PageType.AddPageTypeDefaultPageContentWorkflow.Layout.Label");
///<summary>&quot;Placeholder ID&quot;</summary> 
public static string PageType_AddPageTypeDefaultPageContentWorkflow_PlaceHolderIdTextBox_Label=>T("PageType.AddPageTypeDefaultPageContentWorkflow.PlaceHolderIdTextBox.Label");
///<summary>&quot;The ID of the placeholder. You can write a non-existing ID and create the placeholder afterwards (by editing Page Template markup).&quot;</summary> 
public static string PageType_AddPageTypeDefaultPageContentWorkflow_PlaceHolderIdTextBox_Help=>T("PageType.AddPageTypeDefaultPageContentWorkflow.PlaceHolderIdTextBox.Help");
///<summary>&quot;No templates with {0}&quot;</summary> 
public static string PageType_AddPageTypeDefaultPageContentWorkflow_NonExistingPlaceholderId_Title(object parameter0)=>string.Format(T("PageType.AddPageTypeDefaultPageContentWorkflow.NonExistingPlaceholderId.Title"), parameter0);
///<summary>&quot;Please note that the Placeholder ID you specified &apos;{0}&apos;, is currently not in any Layout Template.&quot;</summary> 
public static string PageType_AddPageTypeDefaultPageContentWorkflow_NonExistingPlaceholderId_Message(object parameter0)=>string.Format(T("PageType.AddPageTypeDefaultPageContentWorkflow.NonExistingPlaceholderId.Message"), parameter0);
///<summary>&quot;Edit default content&quot;</summary> 
public static string PageType_EditPageTypeDefaultPageContentWorkflow_Layout_Label=>T("PageType.EditPageTypeDefaultPageContentWorkflow.Layout.Label");
///<summary>&quot;Settings&quot;</summary> 
public static string PageType_EditPageTypeDefaultPageContentWorkflow_SettingsPlaceHolder_Label=>T("PageType.EditPageTypeDefaultPageContentWorkflow.SettingsPlaceHolder.Label");
///<summary>&quot;Placeholder Info&quot;</summary> 
public static string PageType_EditPageTypeDefaultPageContentWorkflow_SettingsFieldGroup_Label=>T("PageType.EditPageTypeDefaultPageContentWorkflow.SettingsFieldGroup.Label");
///<summary>&quot;Placeholder ID&quot;</summary> 
public static string PageType_EditPageTypeDefaultPageContentWorkflow_PlaceHolderIdTextBox_Label=>T("PageType.EditPageTypeDefaultPageContentWorkflow.PlaceHolderIdTextBox.Label");
///<summary>&quot;The ID of the placeholder. You can write a non-existing ID and create the placeholder afterwards (edit Page Template markup).&quot;</summary> 
public static string PageType_EditPageTypeDefaultPageContentWorkflow_PlaceHolderIdTextBox_Help=>T("PageType.EditPageTypeDefaultPageContentWorkflow.PlaceHolderIdTextBox.Help");
///<summary>&quot;Content&quot;</summary> 
public static string PageType_EditPageTypeDefaultPageContentWorkflow_ContentXhtmlEditor_Label=>T("PageType.EditPageTypeDefaultPageContentWorkflow.ContentXhtmlEditor.Label");
///<summary>&quot;Add Metadata Field&quot;</summary> 
public static string PageType_AddPageTypeMetaDataFieldWorkflow_Layout_Label=>T("PageType.AddPageTypeMetaDataFieldWorkflow.Layout.Label");
///<summary>&quot;&quot;</summary> 
public static string PageType_AddPageTypeMetaDataFieldWorkflow_FieldGroup_Label=>T("PageType.AddPageTypeMetaDataFieldWorkflow.FieldGroup.Label");
///<summary>&quot;Programmatic name&quot;</summary> 
public static string PageType_AddPageTypeMetaDataFieldWorkflow_NameTextBox_Label=>T("PageType.AddPageTypeMetaDataFieldWorkflow.NameTextBox.Label");
///<summary>&quot;The unique name of the Metadata field. This can not be changed later!&quot;</summary> 
public static string PageType_AddPageTypeMetaDataFieldWorkflow_NameTextBox_Help=>T("PageType.AddPageTypeMetaDataFieldWorkflow.NameTextBox.Help");
///<summary>&quot;Show with label&quot;</summary> 
public static string PageType_AddPageTypeMetaDataFieldWorkflow_LabelTextBox_Label=>T("PageType.AddPageTypeMetaDataFieldWorkflow.LabelTextBox.Label");
///<summary>&quot;The label of the Metadata field. Used for UI.&quot;</summary> 
public static string PageType_AddPageTypeMetaDataFieldWorkflow_LabelTextBox_Help=>T("PageType.AddPageTypeMetaDataFieldWorkflow.LabelTextBox.Help");
///<summary>&quot;Metadata type&quot;</summary> 
public static string PageType_AddPageTypeMetaDataFieldWorkflow_MetaDataTypeKeySelector_Label=>T("PageType.AddPageTypeMetaDataFieldWorkflow.MetaDataTypeKeySelector.Label");
///<summary>&quot;The Metadata type&quot;</summary> 
public static string PageType_AddPageTypeMetaDataFieldWorkflow_MetaDataTypeKeySelector_Help=>T("PageType.AddPageTypeMetaDataFieldWorkflow.MetaDataTypeKeySelector.Help");
///<summary>&quot;Display on tab&quot;</summary> 
public static string PageType_AddPageTypeMetaDataFieldWorkflow_MetaDataContainerKeySelector_Label=>T("PageType.AddPageTypeMetaDataFieldWorkflow.MetaDataContainerKeySelector.Label");
///<summary>&quot;Select the tab to display the Metadata when editing a page.&quot;</summary> 
public static string PageType_AddPageTypeMetaDataFieldWorkflow_MetaDataContainerKeySelector_Help=>T("PageType.AddPageTypeMetaDataFieldWorkflow.MetaDataContainerKeySelector.Help");
///<summary>&quot;Add Metadata default values&quot;</summary> 
public static string PageType_AddPageTypeMetaDataFieldWorkflow_AddingDefaultMetaData_Title=>T("PageType.AddPageTypeMetaDataFieldWorkflow.AddingDefaultMetaData.Title");
///<summary>&quot;The field name with another type is already used.&quot;</summary> 
public static string PageType_AddPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataFieldNameAlreadyUsed=>T("PageType.AddPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataFieldNameAlreadyUsed");
///<summary>&quot;Delete This Metadata Field?&quot;</summary> 
public static string PageType_DeletePageTypeMetaDataFieldWorkflow_Confirm_Layout_Label=>T("PageType.DeletePageTypeMetaDataFieldWorkflow.Confirm.Layout.Label");
///<summary>&quot;Delete the Metadata field {0}? Warning: all its existing Metadata items will also be deleted&quot;</summary> 
public static string PageType_DeletePageTypeMetaDataFieldWorkflow_Confirm_Layout_Message(object parameter0)=>string.Format(T("PageType.DeletePageTypeMetaDataFieldWorkflow.Confirm.Layout.Message"), parameter0);
///<summary>&quot;Edit Metadata Field&quot;</summary> 
public static string PageType_EditPageTypeMetaDataFieldWorkflow_Layout_Label=>T("PageType.EditPageTypeMetaDataFieldWorkflow.Layout.Label");
///<summary>&quot;Metadata field settings&quot;</summary> 
public static string PageType_EditPageTypeMetaDataFieldWorkflow_FieldGroup_Label=>T("PageType.EditPageTypeMetaDataFieldWorkflow.FieldGroup.Label");
///<summary>&quot;Label&quot;</summary> 
public static string PageType_EditPageTypeMetaDataFieldWorkflow_LabelTextBox_Label=>T("PageType.EditPageTypeMetaDataFieldWorkflow.LabelTextBox.Label");
///<summary>&quot;The label of the Metadata field. Used for UI&quot;</summary> 
public static string PageType_EditPageTypeMetaDataFieldWorkflow_LabelTextBox_Help=>T("PageType.EditPageTypeMetaDataFieldWorkflow.LabelTextBox.Help");
///<summary>&quot;Tab&quot;</summary> 
public static string PageType_EditPageTypeMetaDataFieldWorkflow_MetaDataContainerKeySelector_Label=>T("PageType.EditPageTypeMetaDataFieldWorkflow.MetaDataContainerKeySelector.Label");
///<summary>&quot;Select the tab to put the Metadata when editing a page&quot;</summary> 
public static string PageType_EditPageTypeMetaDataFieldWorkflow_MetaDataContainerKeySelector_Help=>T("PageType.EditPageTypeMetaDataFieldWorkflow.MetaDataContainerKeySelector.Help");
///<summary>&quot;Metatype&quot;</summary> 
public static string PageType_EditPageTypeMetaDataFieldWorkflow_MetaTypeName_Label=>T("PageType.EditPageTypeMetaDataFieldWorkflow.MetaTypeName.Label");
///<summary>&quot;The name of the metatype.&quot;</summary> 
public static string PageType_EditPageTypeMetaDataFieldWorkflow_MetaTypeName_Help=>T("PageType.EditPageTypeMetaDataFieldWorkflow.MetaTypeName.Help");
///<summary>&quot;The Metadata type is used another place with same name but different label&quot;</summary> 
public static string PageType_EditPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataFieldNameAlreadyUsed=>T("PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataFieldNameAlreadyUsed");
///<summary>&quot;There exists one or more definitions with the same name, container change is not allowed&quot;</summary> 
public static string PageType_EditPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataContainerChangeNotAllowed=>T("PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataContainerChangeNotAllowed");
///<summary>&quot;Metadata type has been deleted&quot;</summary> 
public static string PageType_EditPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataTypeNotExisting_Title=>T("PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataTypeNotExisting.Title");
///<summary>&quot;The Metadata type has been deleted from the system and can no longer be added to any page types&quot;</summary> 
public static string PageType_EditPageTypeMetaDataFieldWorkflow_ValidationError_MetaDataTypeNotExisting_Message=>T("PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataTypeNotExisting.Message");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_RazorFunction {
///<summary>&quot;Razor Functions&quot;</summary> 
public static string RootElement_Label=>T("RootElement.Label");
///<summary>&quot;Razor functions&quot;</summary> 
public static string RootElement_ToolTip=>T("RootElement.ToolTip");
///<summary>&quot;Add Razor Function&quot;</summary> 
public static string AddNewRazorFunction_Label=>T("AddNewRazorFunction.Label");
///<summary>&quot;Add a new Razor function&quot;</summary> 
public static string AddNewRazorFunction_ToolTip=>T("AddNewRazorFunction.ToolTip");
///<summary>&quot;Edit&quot;</summary> 
public static string EditRazorFunction_Label=>T("EditRazorFunction.Label");
///<summary>&quot;Edit Razor Function&quot;</summary> 
public static string EditRazorFunction_ToolTip=>T("EditRazorFunction.ToolTip");
///<summary>&quot;Delete&quot;</summary> 
public static string DeleteRazorFunction_Label=>T("DeleteRazorFunction.Label");
///<summary>&quot;Delete this Razor function&quot;</summary> 
public static string DeleteRazorFunction_ToolTip=>T("DeleteRazorFunction.ToolTip");
///<summary>&quot;Add Razor Function&quot;</summary> 
public static string AddNewRazorFunction_LabelDialog=>T("AddNewRazorFunction.LabelDialog");
///<summary>&quot;Name&quot;</summary> 
public static string AddNewRazorFunction_LabelName=>T("AddNewRazorFunction.LabelName");
///<summary>&quot;&quot;</summary> 
public static string AddNewRazorFunction_HelpName=>T("AddNewRazorFunction.HelpName");
///<summary>&quot;Namespace&quot;</summary> 
public static string AddNewRazorFunction_LabelNamespace=>T("AddNewRazorFunction.LabelNamespace");
///<summary>&quot;&quot;</summary> 
public static string AddNewRazorFunction_HelpNamespace=>T("AddNewRazorFunction.HelpNamespace");
///<summary>&quot;Copy from&quot;</summary> 
public static string AddNewRazorFunction_LabelCopyFrom=>T("AddNewRazorFunction.LabelCopyFrom");
///<summary>&quot;You can copy the code from another Razor function by selecting it in this list.&quot;</summary> 
public static string AddNewRazorFunction_LabelCopyFromHelp=>T("AddNewRazorFunction.LabelCopyFromHelp");
///<summary>&quot;(New Razor function)&quot;</summary> 
public static string AddNewRazorFunction_LabelCopyFromEmptyOption=>T("AddNewRazorFunction.LabelCopyFromEmptyOption");
///<summary>&quot;A C1 function with the same name already exists.&quot;</summary> 
public static string AddNewRazorFunctionWorkflow_DuplicateName=>T("AddNewRazorFunctionWorkflow.DuplicateName");
///<summary>&quot;The function name is empty&quot;</summary> 
public static string AddNewRazorFunctionWorkflow_EmptyName=>T("AddNewRazorFunctionWorkflow.EmptyName");
///<summary>&quot;The function namespace is empty&quot;</summary> 
public static string AddNewRazorFunctionWorkflow_NamespaceEmpty=>T("AddNewRazorFunctionWorkflow.NamespaceEmpty");
///<summary>&quot;The namespace must be like A.B.C - not starting or ending with a period (.)&quot;</summary> 
public static string AddNewRazorFunctionWorkflow_InvalidNamespace=>T("AddNewRazorFunctionWorkflow.InvalidNamespace");
///<summary>&quot;The total length of the name and the namespace is too long (used to name the .cshtml file).&quot;</summary> 
public static string AddNewRazorFunctionWorkflow_TotalNameTooLang=>T("AddNewRazorFunctionWorkflow.TotalNameTooLang");
///<summary>&quot;Validation Error&quot;</summary> 
public static string EditRazorFunctionWorkflow_Validation_DialogTitle=>T("EditRazorFunctionWorkflow.Validation.DialogTitle");
///<summary>&quot;Compilation failed: {0}&quot;</summary> 
public static string EditRazorFunctionWorkflow_Validation_CompilationFailed(object parameter0)=>string.Format(T("EditRazorFunctionWorkflow.Validation.CompilationFailed"), parameter0);
///<summary>&quot;Razor function should inherit &apos;{0}&apos;&quot;</summary> 
public static string EditRazorFunctionWorkflow_Validation_IncorrectBaseClass(object parameter0)=>string.Format(T("EditRazorFunctionWorkflow.Validation.IncorrectBaseClass"), parameter0);
///<summary>&quot;Delete Razor Function?&quot;</summary> 
public static string DeleteRazorFunctionWorkflow_ConfirmDeleteTitle=>T("DeleteRazorFunctionWorkflow.ConfirmDeleteTitle");
///<summary>&quot;Delete the selected Razor function?&quot;</summary> 
public static string DeleteRazorFunctionWorkflow_ConfirmDeleteMessage=>T("DeleteRazorFunctionWorkflow.ConfirmDeleteMessage");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.RazorFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_RazorPageTemplate {
///<summary>&quot;Edit Razor File&quot;</summary> 
public static string EditRazorFileAction_Label=>T("EditRazorFileAction.Label");
///<summary>&quot;Edit the cshtml file&quot;</summary> 
public static string EditRazorFileAction_ToolTip=>T("EditRazorFileAction.ToolTip");
///<summary>&quot;Edit Razor Template&quot;</summary> 
public static string EditRazorTemplateAction_Label=>T("EditRazorTemplateAction.Label");
///<summary>&quot;Edit the cshtml file behind the template&quot;</summary> 
public static string EditRazorTemplateAction_ToolTip=>T("EditRazorTemplateAction.ToolTip");
///<summary>&quot;Delete&quot;</summary> 
public static string DeleteRazorPageTemplateAction_Label=>T("DeleteRazorPageTemplateAction.Label");
///<summary>&quot;Delete page template&quot;</summary> 
public static string DeleteRazorPageTemplateAction_ToolTip=>T("DeleteRazorPageTemplateAction.ToolTip");
///<summary>&quot;Add New Razor Template&quot;</summary> 
public static string AddNewRazorPageTemplate_LabelDialog=>T("AddNewRazorPageTemplate.LabelDialog");
///<summary>&quot;Template Title&quot;</summary> 
public static string AddNewRazorPageTemplate_LabelTemplateTitle=>T("AddNewRazorPageTemplate.LabelTemplateTitle");
///<summary>&quot;The title identifies this template in lists. Consider selecting a short but meaningful name.&quot;</summary> 
public static string AddNewRazorPageTemplate_LabelTemplateTitleHelp=>T("AddNewRazorPageTemplate.LabelTemplateTitleHelp");
///<summary>&quot;Copy from&quot;</summary> 
public static string AddNewRazorPageTemplate_LabelCopyFrom=>T("AddNewRazorPageTemplate.LabelCopyFrom");
///<summary>&quot;You can copy the markup from another Layout Template by selecting it in this list.&quot;</summary> 
public static string AddNewRazorPageTemplate_LabelCopyFromHelp=>T("AddNewRazorPageTemplate.LabelCopyFromHelp");
///<summary>&quot;(New template)&quot;</summary> 
public static string AddNewRazorPageTemplate_LabelCopyFromEmptyOption=>T("AddNewRazorPageTemplate.LabelCopyFromEmptyOption");
///<summary>&quot;Title already used&quot;</summary> 
public static string AddNewRazorPageTemplateWorkflow_TitleInUseTitle=>T("AddNewRazorPageTemplateWorkflow.TitleInUseTitle");
///<summary>&quot;The title is too long (used as part of the .cshtml filename).&quot;</summary> 
public static string AddNewRazorPageTemplateWorkflow_TitleTooLong=>T("AddNewRazorPageTemplateWorkflow.TitleTooLong");
///<summary>&quot;Validation error&quot;</summary> 
public static string EditTemplate_Validation_DialogTitle=>T("EditTemplate.Validation.DialogTitle");
///<summary>&quot;Compilation failed: {0}&quot;</summary> 
public static string EditTemplate_Validation_CompilationFailed(object parameter0)=>string.Format(T("EditTemplate.Validation.CompilationFailed"), parameter0);
///<summary>&quot;Page template class does not inherit &apos;{0}&apos;&quot;</summary> 
public static string EditTemplate_Validation_IncorrectBaseClass(object parameter0)=>string.Format(T("EditTemplate.Validation.IncorrectBaseClass"), parameter0);
///<summary>&quot;Failed to evaluate page template property &apos;{0}&apos;. Excepton: {1}&quot;</summary> 
public static string EditTemplate_Validation_PropertyError(object parameter0,object parameter1)=>string.Format(T("EditTemplate.Validation.PropertyError"), parameter0,parameter1);
///<summary>&quot;It is not allowed to change template id through current workflow. Original template id is &apos;{0}&apos;&quot;</summary> 
public static string EditTemplate_Validation_TemplateIdChanged(object parameter0)=>string.Format(T("EditTemplate.Validation.TemplateIdChanged"), parameter0);
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.RazorPageTemplate", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_SqlFunction {
///<summary>&quot;SQL Functions&quot;</summary> 
public static string SqlFunctionElementProvider_RootLabel=>T("SqlFunctionElementProvider.RootLabel");
///<summary>&quot;Add Connections and then queries to connections&quot;</summary> 
public static string SqlFunctionElementProvider_RootLabelToolTip=>T("SqlFunctionElementProvider.RootLabelToolTip");
///<summary>&quot;Add SQL Connection&quot;</summary> 
public static string SqlFunctionElementProvider_AddConnection=>T("SqlFunctionElementProvider.AddConnection");
///<summary>&quot;Add new SQL connection&quot;</summary> 
public static string SqlFunctionElementProvider_AddConnectionToolTip=>T("SqlFunctionElementProvider.AddConnectionToolTip");
///<summary>&quot;Edit&quot;</summary> 
public static string SqlFunctionElementProvider_EditConnection=>T("SqlFunctionElementProvider.EditConnection");
///<summary>&quot;Edit SQL connection&quot;</summary> 
public static string SqlFunctionElementProvider_EditConnectionToolTip=>T("SqlFunctionElementProvider.EditConnectionToolTip");
///<summary>&quot;Delete&quot;</summary> 
public static string SqlFunctionElementProvider_DeleteConnection=>T("SqlFunctionElementProvider.DeleteConnection");
///<summary>&quot;Delete SQL connection&quot;</summary> 
public static string SqlFunctionElementProvider_DeleteConnectionToolTip=>T("SqlFunctionElementProvider.DeleteConnectionToolTip");
///<summary>&quot;Add New SQL Query&quot;</summary> 
public static string SqlFunctionElementProvider_AddQuery=>T("SqlFunctionElementProvider.AddQuery");
///<summary>&quot;Add a new SQL XML Provider&quot;</summary> 
public static string SqlFunctionElementProvider_AddQueryToolTip=>T("SqlFunctionElementProvider.AddQueryToolTip");
///<summary>&quot;Edit&quot;</summary> 
public static string SqlFunctionElementProvider_EditQuery=>T("SqlFunctionElementProvider.EditQuery");
///<summary>&quot;Edit SQL Query&quot;</summary> 
public static string SqlFunctionElementProvider_EditQueryToolTip=>T("SqlFunctionElementProvider.EditQueryToolTip");
///<summary>&quot;Delete&quot;</summary> 
public static string SqlFunctionElementProvider_DeleteQuery=>T("SqlFunctionElementProvider.DeleteQuery");
///<summary>&quot;Delete SQL Query&quot;</summary> 
public static string SqlFunctionElementProvider_DeleteQueryToolTip=>T("SqlFunctionElementProvider.DeleteQueryToolTip");
///<summary>&quot;Add New SQL Query&quot;</summary> 
public static string AddNewSqlFunction_LabelDialog=>T("AddNewSqlFunction.LabelDialog");
///<summary>&quot;Function naming&quot;</summary> 
public static string AddNewSqlFunction_LabelNamingPanel=>T("AddNewSqlFunction.LabelNamingPanel");
///<summary>&quot;Name&quot;</summary> 
public static string AddNewSqlFunction_LabelName=>T("AddNewSqlFunction.LabelName");
///<summary>&quot;&quot;</summary> 
public static string AddNewSqlFunction_HelpName=>T("AddNewSqlFunction.HelpName");
///<summary>&quot;Namespace&quot;</summary> 
public static string AddNewSqlFunction_LabelNamespace=>T("AddNewSqlFunction.LabelNamespace");
///<summary>&quot;&quot;</summary> 
public static string AddNewSqlFunction_HelpNamespace=>T("AddNewSqlFunction.HelpNamespace");
///<summary>&quot;SQL command text&quot;</summary> 
public static string AddNewSqlFunction_LabelQueryCOmmand=>T("AddNewSqlFunction.LabelQueryCOmmand");
///<summary>&quot;&quot;</summary> 
public static string AddNewSqlFunction_HelpQueryCOmmand=>T("AddNewSqlFunction.HelpQueryCOmmand");
///<summary>&quot;Is a Stored Procedure&quot;</summary> 
public static string AddEditSqlFunction_LabelIsStoredProcedure=>T("AddEditSqlFunction.LabelIsStoredProcedure");
///<summary>&quot;Yes, the command is a procedure&quot;</summary> 
public static string AddEditSqlFunction_LabelIsStoredProcedureCheckBox=>T("AddEditSqlFunction.LabelIsStoredProcedureCheckBox");
///<summary>&quot;Returns result as XML&quot;</summary> 
public static string AddEditSqlFunction_LabelReturnsXml=>T("AddEditSqlFunction.LabelReturnsXml");
///<summary>&quot;Yes, the command returns XML&quot;</summary> 
public static string AddEditSqlFunction_LabelReturnsXmlCheckBox=>T("AddEditSqlFunction.LabelReturnsXmlCheckBox");
///<summary>&quot;Is a query&quot;</summary> 
public static string AddEditSqlFunction_LabelIsQuery=>T("AddEditSqlFunction.LabelIsQuery");
///<summary>&quot;Yes, the command returns data&quot;</summary> 
public static string AddEditSqlFunction_LabelIsQueryCheckBox=>T("AddEditSqlFunction.LabelIsQueryCheckBox");
///<summary>&quot;SQL Command behaviour&quot;</summary> 
public static string AddEditSqlFunction_LabelCommandBehaviour=>T("AddEditSqlFunction.LabelCommandBehaviour");
///<summary>&quot;SQL Command&quot;</summary> 
public static string AddEditSqlFunction_LabelSqlEditor=>T("AddEditSqlFunction.LabelSqlEditor");
///<summary>&quot;Add New SQL Connection&quot;</summary> 
public static string AddNewSqlFunctionConnection_LabelDialog=>T("AddNewSqlFunctionConnection.LabelDialog");
///<summary>&quot;Name&quot;</summary> 
public static string AddNewSqlFunctionConnection_LabelName=>T("AddNewSqlFunctionConnection.LabelName");
///<summary>&quot;&quot;</summary> 
public static string AddNewSqlFunctionConnection_HelpName=>T("AddNewSqlFunctionConnection.HelpName");
///<summary>&quot;Connection String&quot;</summary> 
public static string AddNewSqlFunctionConnection_LabelConnectionString=>T("AddNewSqlFunctionConnection.LabelConnectionString");
///<summary>&quot;&quot;</summary> 
public static string AddNewSqlFunctionConnection_HelpConnectionString=>T("AddNewSqlFunctionConnection.HelpConnectionString");
///<summary>&quot;MS SQL Server&quot;</summary> 
public static string AddNewSqlFunctionConnection_LabelIsMSSQL=>T("AddNewSqlFunctionConnection.LabelIsMSSQL");
///<summary>&quot;Database is a MS SQL Server&quot;</summary> 
public static string AddNewSqlFunctionConnection_LabelIsMSSQLCheckBox=>T("AddNewSqlFunctionConnection.LabelIsMSSQLCheckBox");
///<summary>&quot;SQL Connection settings&quot;</summary> 
public static string EditSqlFunctionConnection_LabelFieldGroup=>T("EditSqlFunctionConnection.LabelFieldGroup");
///<summary>&quot;Input Parameters&quot;</summary> 
public static string EditSqlFunction_LabelInputParameters=>T("EditSqlFunction.LabelInputParameters");
///<summary>&quot;Settings&quot;</summary> 
public static string EditSqlFunction_LabelSettings=>T("EditSqlFunction.LabelSettings");
///<summary>&quot;Function name and description&quot;</summary> 
public static string EditSqlFunction_LabelNamingAndDescription=>T("EditSqlFunction.LabelNamingAndDescription");
///<summary>&quot;Name&quot;</summary> 
public static string EditSqlFunction_LabelName=>T("EditSqlFunction.LabelName");
///<summary>&quot;&quot;</summary> 
public static string EditSqlFunction_HelpName=>T("EditSqlFunction.HelpName");
///<summary>&quot;Namespace&quot;</summary> 
public static string EditSqlFunction_LabelNamespace=>T("EditSqlFunction.LabelNamespace");
///<summary>&quot;&quot;</summary> 
public static string EditSqlFunction_HelpNamespace=>T("EditSqlFunction.HelpNamespace");
///<summary>&quot;Description&quot;</summary> 
public static string EditSqlFunction_LabelDescription=>T("EditSqlFunction.LabelDescription");
///<summary>&quot;&quot;</summary> 
public static string EditSqlFunction_HelpDescription=>T("EditSqlFunction.HelpDescription");
///<summary>&quot;Preview&quot;</summary> 
public static string EditSqlFunction_LabelPreview=>T("EditSqlFunction.LabelPreview");
///<summary>&quot;Name&quot;</summary> 
public static string EditSqlFunctionConnection_LabelName=>T("EditSqlFunctionConnection.LabelName");
///<summary>&quot;&quot;</summary> 
public static string EditSqlFunctionConnection_HelpName=>T("EditSqlFunctionConnection.HelpName");
///<summary>&quot;Connection String&quot;</summary> 
public static string EditSqlFunctionConnection_LabelConnectionString=>T("EditSqlFunctionConnection.LabelConnectionString");
///<summary>&quot;&quot;</summary> 
public static string EditSqlFunctionConnection_HelpConnectionString=>T("EditSqlFunctionConnection.HelpConnectionString");
///<summary>&quot;MS SQL Server&quot;</summary> 
public static string EditSqlFunctionConnection_LabelIsMSSQL=>T("EditSqlFunctionConnection.LabelIsMSSQL");
///<summary>&quot;Database is a MS SQL Server&quot;</summary> 
public static string EditSqlFunctionConnection_LabelIsMSSQLCheckBox=>T("EditSqlFunctionConnection.LabelIsMSSQLCheckBox");
///<summary>&quot;Delete This SQL Connection?&quot;</summary> 
public static string DeleteSqlConnection_LabelFieldGroup=>T("DeleteSqlConnection.LabelFieldGroup");
///<summary>&quot;Delete this SQL connection?&quot;</summary> 
public static string DeleteSqlConnection_Text=>T("DeleteSqlConnection.Text");
///<summary>&quot;Delete This SQL Function?&quot;</summary> 
public static string DeleteSqlFunction_LabelFieldGroup=>T("DeleteSqlFunction.LabelFieldGroup");
///<summary>&quot;Delete this SQL function?&quot;</summary> 
public static string DeleteSqlFunction_Text=>T("DeleteSqlFunction.Text");
///<summary>&quot;Cascade Delete Error&quot;</summary> 
public static string CascadeDeleteErrorTitle=>T("CascadeDeleteErrorTitle");
///<summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
public static string CascadeDeleteErrorMessage=>T("CascadeDeleteErrorMessage");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_StandardFunctions {
///<summary>&quot;Loads an ASP.NET User Control&quot;</summary> 
public static string Composite_AspNet_LoadUserControl_description=>T("Composite.AspNet.LoadUserControl.description");
///<summary>&quot;The path to the User Controls .ascx file, like “~/Controls/MyControl.ascx”&quot;</summary> 
public static string Composite_AspNet_LoadUserControl_param_Path_help=>T("Composite.AspNet.LoadUserControl.param.Path.help");
///<summary>&quot;Path&quot;</summary> 
public static string Composite_AspNet_LoadUserControl_param_Path_label=>T("Composite.AspNet.LoadUserControl.param.Path.label");
///<summary>&quot;Lets you specify constant boolean value&quot;</summary> 
public static string Composite_Constant_Boolean_description=>T("Composite.Constant.Boolean.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Constant_Boolean_param_Constant_help=>T("Composite.Constant.Boolean.param.Constant.help");
///<summary>&quot;Value&quot;</summary> 
public static string Composite_Constant_Boolean_param_Constant_label=>T("Composite.Constant.Boolean.param.Constant.label");
///<summary>&quot;Lets you specify constant date and time value&quot;</summary> 
public static string Composite_Constant_DateTime_description=>T("Composite.Constant.DateTime.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Constant_DateTime_param_Constant_help=>T("Composite.Constant.DateTime.param.Constant.help");
///<summary>&quot;Value&quot;</summary> 
public static string Composite_Constant_DateTime_param_Constant_label=>T("Composite.Constant.DateTime.param.Constant.label");
///<summary>&quot;Lets you specify constant decimal value&quot;</summary> 
public static string Composite_Constant_Decimal_description=>T("Composite.Constant.Decimal.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Constant_Decimal_param_Constant_help=>T("Composite.Constant.Decimal.param.Constant.help");
///<summary>&quot;Value&quot;</summary> 
public static string Composite_Constant_Decimal_param_Constant_label=>T("Composite.Constant.Decimal.param.Constant.label");
///<summary>&quot;Lets you specify constant Guid value&quot;</summary> 
public static string Composite_Constant_Guid_description=>T("Composite.Constant.Guid.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Constant_Guid_param_Constant_help=>T("Composite.Constant.Guid.param.Constant.help");
///<summary>&quot;Value&quot;</summary> 
public static string Composite_Constant_Guid_param_Constant_label=>T("Composite.Constant.Guid.param.Constant.label");
///<summary>&quot;Lets you specify constant integer value&quot;</summary> 
public static string Composite_Constant_Integer_description=>T("Composite.Constant.Integer.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Constant_Integer_param_Constant_help=>T("Composite.Constant.Integer.param.Constant.help");
///<summary>&quot;Value&quot;</summary> 
public static string Composite_Constant_Integer_param_Constant_label=>T("Composite.Constant.Integer.param.Constant.label");
///<summary>&quot;Lets you specify constant string value&quot;</summary> 
public static string Composite_Constant_String_description=>T("Composite.Constant.String.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Constant_String_param_Constant_help=>T("Composite.Constant.String.param.Constant.help");
///<summary>&quot;Value&quot;</summary> 
public static string Composite_Constant_String_param_Constant_label=>T("Composite.Constant.String.param.Constant.label");
///<summary>&quot;Lets you visually specify a Xhtml document constant&quot;</summary> 
public static string Composite_Constant_XhtmlDocument_description=>T("Composite.Constant.XhtmlDocument.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Constant_XhtmlDocument_param_Constant_help=>T("Composite.Constant.XhtmlDocument.param.Constant.help");
///<summary>&quot;Value&quot;</summary> 
public static string Composite_Constant_XhtmlDocument_param_Constant_label=>T("Composite.Constant.XhtmlDocument.param.Constant.label");
///<summary>&quot;Adds a new instance of the given type.&quot;</summary> 
public static string Composite_IDataGenerated_AddDataInstance_description=>T("Composite.IDataGenerated.AddDataInstance.description");
///<summary>&quot;Updates instance(s) with the given values.&quot;</summary> 
public static string Composite_IDataGenerated_UpdateDataInstance_description=>T("Composite.IDataGenerated.UpdateDataInstance.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_IDataGenerated_UpdateDataInstance_param_Filter_help=>T("Composite.IDataGenerated.UpdateDataInstance.param.Filter.help");
///<summary>&quot;Filter&quot;</summary> 
public static string Composite_IDataGenerated_UpdateDataInstance_param_Filter_label=>T("Composite.IDataGenerated.UpdateDataInstance.param.Filter.label");
///<summary>&quot;Deletes instance(s) with the given filter.&quot;</summary> 
public static string Composite_IDataGenerated_DeleteDataInstance_description=>T("Composite.IDataGenerated.DeleteDataInstance.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_IDataGenerated_DeleteDataInstance_param_Filter_help=>T("Composite.IDataGenerated.DeleteDataInstance.param.Filter.help");
///<summary>&quot;Filter&quot;</summary> 
public static string Composite_IDataGenerated_DeleteDataInstance_param_Filter_label=>T("Composite.IDataGenerated.DeleteDataInstance.param.Filter.label");
///<summary>&quot;Creates a DataReference based on a key value.&quot;</summary> 
public static string Composite_IDataGenerated_GetDataReference_description=>T("Composite.IDataGenerated.GetDataReference.description");
///<summary>&quot;The key value of the data to reference.&quot;</summary> 
public static string Composite_IDataGenerated_GetDataReference_param_KeyValue_help=>T("Composite.IDataGenerated.GetDataReference.param.KeyValue.help");
///<summary>&quot;Key value&quot;</summary> 
public static string Composite_IDataGenerated_GetDataReference_param_KeyValue_label=>T("Composite.IDataGenerated.GetDataReference.param.KeyValue.label");
///<summary>&quot;Creates a NullableDataReference based on a key value. The default value is &apos;null&apos;, no reference.&quot;</summary> 
public static string Composite_IDataGenerated_GetNullableDataReference_description=>T("Composite.IDataGenerated.GetNullableDataReference.description");
///<summary>&quot;The key value of the data to reference.&quot;</summary> 
public static string Composite_IDataGenerated_GetNullableDataReference_param_KeyValue_help=>T("Composite.IDataGenerated.GetNullableDataReference.param.KeyValue.help");
///<summary>&quot;Key value&quot;</summary> 
public static string Composite_IDataGenerated_GetNullableDataReference_param_KeyValue_label=>T("Composite.IDataGenerated.GetNullableDataReference.param.KeyValue.label");
///<summary>&quot;Converts a DataReference into a single element filter. This filter will select a maximum of one item.&quot;</summary> 
public static string Composite_IDataGenerated_Filter_DataReferenceFilter_description=>T("Composite.IDataGenerated.Filter.DataReferenceFilter.description");
///<summary>&quot;The Data Reference to use when selecting data.&quot;</summary> 
public static string Composite_IDataGenerated_Filter_DataReferenceFilter_param_DataReference_help=>T("Composite.IDataGenerated.Filter.DataReferenceFilter.param.DataReference.help");
///<summary>&quot;Data Reference&quot;</summary> 
public static string Composite_IDataGenerated_Filter_DataReferenceFilter_param_DataReference_label=>T("Composite.IDataGenerated.Filter.DataReferenceFilter.param.DataReference.label");
///<summary>&quot;Lets you select data based on its reference to the currently rendered page.&quot;</summary> 
public static string Composite_IDataGenerated_Filter_ActivePageReferenceFilter_description=>T("Composite.IDataGenerated.Filter.ActivePageReferenceFilter.description");
///<summary>&quot;Select what relation the current page must have with the data you wish to retrieve.&quot;</summary> 
public static string Composite_IDataGenerated_Filter_ActivePageReferenceFilter_param_SitemapScope_help=>T("Composite.IDataGenerated.Filter.ActivePageReferenceFilter.param.SitemapScope.help");
///<summary>&quot;Page scope&quot;</summary> 
public static string Composite_IDataGenerated_Filter_ActivePageReferenceFilter_param_SitemapScope_label=>T("Composite.IDataGenerated.Filter.ActivePageReferenceFilter.param.SitemapScope.label");
///<summary>&quot;Defines an “and” or “or” query, combining two other filters.&quot;</summary> 
public static string Composite_IDataGenerated_Filter_CompoundFilter_description=>T("Composite.IDataGenerated.Filter.CompoundFilter.description");
///<summary>&quot;And / or filter&quot;</summary> 
public static string Composite_IDataGenerated_Filter_CompoundFilter_param_IsAndQuery_label=>T("Composite.IDataGenerated.Filter.CompoundFilter.param.IsAndQuery.label");
///<summary>&quot;If you select “And” both filters are applied to the data. Selecting “Or” will give you the data that matches just one of the filters.&quot;</summary> 
public static string Composite_IDataGenerated_Filter_CompoundFilter_param_IsAndQuery_help=>T("Composite.IDataGenerated.Filter.CompoundFilter.param.IsAndQuery.help");
///<summary>&quot;One of the two filters (the one to evaluate first)&quot;</summary> 
public static string Composite_IDataGenerated_Filter_CompoundFilter_param_Left_help=>T("Composite.IDataGenerated.Filter.CompoundFilter.param.Left.help");
///<summary>&quot;Left filter&quot;</summary> 
public static string Composite_IDataGenerated_Filter_CompoundFilter_param_Left_label=>T("Composite.IDataGenerated.Filter.CompoundFilter.param.Left.label");
///<summary>&quot;One of the two filters (the one to evaluate last)&quot;</summary> 
public static string Composite_IDataGenerated_Filter_CompoundFilter_param_Right_help=>T("Composite.IDataGenerated.Filter.CompoundFilter.param.Right.help");
///<summary>&quot;Right filter&quot;</summary> 
public static string Composite_IDataGenerated_Filter_CompoundFilter_param_Right_label=>T("Composite.IDataGenerated.Filter.CompoundFilter.param.Right.label");
///<summary>&quot;Lets you specify a filter on data by specifying requirements for the individual fields. If you set requirements on multiple fields, they are all enforced (and query).&quot;</summary> 
public static string Composite_IDataGenerated_Filter_FieldPredicatesFilter_description=>T("Composite.IDataGenerated.Filter.FieldPredicatesFilter.description");
///<summary>&quot;Retrieves an XML representation of the data. &quot;</summary> 
public static string Composite_IDataGenerated_GetXml_description=>T("Composite.IDataGenerated.GetXml.description");
///<summary>&quot;Element name&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_ElementName_label=>T("Composite.IDataGenerated.GetXml.param.ElementName.label");
///<summary>&quot;Element namespace&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_ElementNamespace_label=>T("Composite.IDataGenerated.GetXml.param.ElementNamespace.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_Filter_help=>T("Composite.IDataGenerated.GetXml.param.Filter.help");
///<summary>&quot;Filter&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_Filter_label=>T("Composite.IDataGenerated.GetXml.param.Filter.label");
///<summary>&quot;When selected the data XML will be preceded by a &lt;PagingInfo /&gt; element detailing number of pages, items and more.&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_IncludePagingInfo_help=>T("Composite.IDataGenerated.GetXml.param.IncludePagingInfo.help");
///<summary>&quot;Include paging info&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_IncludePagingInfo_label=>T("Composite.IDataGenerated.GetXml.param.IncludePagingInfo.label");
///<summary>&quot;The field to order data by&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_OrderByField_help=>T("Composite.IDataGenerated.GetXml.param.OrderByField.help");
///<summary>&quot;Order by&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_OrderByField_label=>T("Composite.IDataGenerated.GetXml.param.OrderByField.label");
///<summary>&quot;When set to true results are delivered in ascending order, otherwise descending order is used. Default is ascending order.&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_OrderAscending_help=>T("Composite.IDataGenerated.GetXml.param.OrderAscending.help");
///<summary>&quot;Order ascending&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_OrderAscending_label=>T("Composite.IDataGenerated.GetXml.param.OrderAscending.label");
///<summary>&quot;If the number of data elements exceed the page size you can use paging to move to the other pages. See the Page size parameter.&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_PageNumber_help=>T("Composite.IDataGenerated.GetXml.param.PageNumber.help");
///<summary>&quot;Page number&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_PageNumber_label=>T("Composite.IDataGenerated.GetXml.param.PageNumber.label");
///<summary>&quot;The number of items to display on one page – the maximum number of elements to return. &quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_PageSize_help=>T("Composite.IDataGenerated.GetXml.param.PageSize.help");
///<summary>&quot;Page size&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_PageSize_label=>T("Composite.IDataGenerated.GetXml.param.PageSize.label");
///<summary>&quot;The data fields to output in the XML. Fewer fields can yield faster renderings.&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_PropertyNames_help=>T("Composite.IDataGenerated.GetXml.param.PropertyNames.help");
///<summary>&quot;Selected fields&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_PropertyNames_label=>T("Composite.IDataGenerated.GetXml.param.PropertyNames.label");
///<summary>&quot;If you include reference data in the &apos;Selected properties&apos; setting, you can use this option to control how the referenced data is included. &apos;Inline&apos; is easy to use, but may bloat the size of the XML document.&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_ShowReferencesInline_help=>T("Composite.IDataGenerated.GetXml.param.ShowReferencesInline.help");
///<summary>&quot;Show reference data inline&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_ShowReferencesInline_label=>T("Composite.IDataGenerated.GetXml.param.ShowReferencesInline.label");
///<summary>&quot;When true data can be ordered randomly. Specify the number of random results you require by setting the &apos;Page size&apos;. If a filter is specified, this is applied before the random selection. If you specify an &apos;Order by&apos; value, you should specify a low &apos;Page size&apos; or the randomization will become void.&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_Randomized_help=>T("Composite.IDataGenerated.GetXml.param.Randomized.help");
///<summary>&quot;Randomized&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_Randomized_label=>T("Composite.IDataGenerated.GetXml.param.Randomized.label");
///<summary>&quot;Determines if result XML has to be cached, and what priority those cache records should have&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_CachePriority_help=>T("Composite.IDataGenerated.GetXml.param.CachePriority.help");
///<summary>&quot;Cache Priority&quot;</summary> 
public static string Composite_IDataGenerated_GetXml_param_CachePriority_label=>T("Composite.IDataGenerated.GetXml.param.CachePriority.label");
///<summary>&quot;Fetches the ID of the current page or a page relative to the current page.&quot;</summary> 
public static string Composite_Pages_GetPageId_description=>T("Composite.Pages.GetPageId.description");
///<summary>&quot;What page to get id from. The default is from the current page.&quot;</summary> 
public static string Composite_Pages_GetPageId_param_SitemapScope_help=>T("Composite.Pages.GetPageId.param.SitemapScope.help");
///<summary>&quot;Page association&quot;</summary> 
public static string Composite_Pages_GetPageId_param_SitemapScope_label=>T("Composite.Pages.GetPageId.param.SitemapScope.label");
///<summary>&quot;Quick and raw sitemap xhtml.&quot;</summary> 
public static string Composite_Pages_QuickSitemap_description=>T("Composite.Pages.QuickSitemap.description");
///<summary>&quot;Returns a hierarchical XML structure of pages. When executed as part of a page rendering XML elements representing the current and ancestor pages will be appended the attributes isopen=”true” and iscurrent=”true”&quot;</summary> 
public static string Composite_Pages_SitemapXml_description=>T("Composite.Pages.SitemapXml.description");
///<summary>&quot;Source page&quot;</summary> 
public static string Composite_Pages_SitemapXml_param_SourcePage_label=>T("Composite.Pages.SitemapXml.param.SourcePage.label");
///<summary>&quot;By default the source page is the page currently being rendered. Specify a value if you want to get sitemap information relative to another page. The source page controls how page elements are annotated with &apos;isopen&apos; and &apos;iscurrent&apos; and is the starting point when calculating the page scope.&quot;</summary> 
public static string Composite_Pages_SitemapXml_param_SourcePage_help=>T("Composite.Pages.SitemapXml.param.SourcePage.help");
///<summary>&quot;Page scope&quot;</summary> 
public static string Composite_Pages_SitemapXml_param_SitemapScope_label=>T("Composite.Pages.SitemapXml.param.SitemapScope.label");
///<summary>&quot;The scope of pages to extract from the sitemap. The default is &apos;all pages&apos;. You can use this parameter to extract the structure you need to complete your task.&quot;</summary> 
public static string Composite_Pages_SitemapXml_param_SitemapScope_help=>T("Composite.Pages.SitemapXml.param.SitemapScope.help");
///<summary>&quot;Gets information about current page in all the languages.&quot;</summary> 
public static string Composite_Pages_GetForeignPageInfo_description=>T("Composite.Pages.GetForeignPageInfo.description");
///<summary>&quot;Defines a &apos;cache zone&apos; around a function call or markup (typically containing function calls). This function can be used to enhance page rendering performance by caching sections of a web page. The &apos;Object Cache Id&apos; value should be unique to the content being cached.&quot;</summary> 
public static string Composite_Utils_Caching_PageObjectCache_description=>T("Composite.Utils.Caching.PageObjectCache.description");
///<summary>&quot;Object to cache&quot;</summary> 
public static string Composite_Utils_Caching_PageObjectCache_param_ObjectToCache_label=>T("Composite.Utils.Caching.PageObjectCache.param.ObjectToCache.label");
///<summary>&quot;What you want to cache - this can be a single function call or a section of markup containing one or more function calls.&quot;</summary> 
public static string Composite_Utils_Caching_PageObjectCache_param_ObjectToCache_help=>T("Composite.Utils.Caching.PageObjectCache.param.ObjectToCache.help");
///<summary>&quot;Unique cache id&quot;</summary> 
public static string Composite_Utils_Caching_PageObjectCache_param_ObjectCacheId_label=>T("Composite.Utils.Caching.PageObjectCache.param.ObjectCacheId.label");
///<summary>&quot;Specify an ID unique to the content being cached. This value is used - in conjunction with the Page scope - to define a unique cache key.&quot;</summary> 
public static string Composite_Utils_Caching_PageObjectCache_param_ObjectCacheId_help=>T("Composite.Utils.Caching.PageObjectCache.param.ObjectCacheId.help");
///<summary>&quot;Page scope&quot;</summary> 
public static string Composite_Utils_Caching_PageObjectCache_param_SitemapScope_label=>T("Composite.Utils.Caching.PageObjectCache.param.SitemapScope.label");
///<summary>&quot;The page scope the cached data should be shared on. By default the page scope is &apos;this website&apos;, but you can change it to page specific caching and more.&quot;</summary> 
public static string Composite_Utils_Caching_PageObjectCache_param_SitemapScope_help=>T("Composite.Utils.Caching.PageObjectCache.param.SitemapScope.help");
///<summary>&quot;Cache duration (seconds)&quot;</summary> 
public static string Composite_Utils_Caching_PageObjectCache_param_SecondsToCache_label=>T("Composite.Utils.Caching.PageObjectCache.param.SecondsToCache.label");
///<summary>&quot;The number of seconds the cached object should be reused. Default is 1 minute (60 seconds).&quot;</summary> 
public static string Composite_Utils_Caching_PageObjectCache_param_SecondsToCache_help=>T("Composite.Utils.Caching.PageObjectCache.param.SecondsToCache.help");
///<summary>&quot;Language specific&quot;</summary> 
public static string Composite_Utils_Caching_PageObjectCache_param_LanguageSpecific_label=>T("Composite.Utils.Caching.PageObjectCache.param.LanguageSpecific.label");
///<summary>&quot;Choose if the cached object should be uniquely cached per website language or commonly shared among languages.&quot;</summary> 
public static string Composite_Utils_Caching_PageObjectCache_param_LanguageSpecific_help=>T("Composite.Utils.Caching.PageObjectCache.param.LanguageSpecific.help");
///<summary>&quot;AreEqual&quot;</summary> 
public static string Composite_Utils_Compare_AreEqual_description=>T("Composite.Utils.Compare.AreEqual.description");
///<summary>&quot;Compares two objects for equality. Returns true if the two objects are equal.&quot;</summary> 
public static string Composite_Utils_Compare_AreEqual_param_ValueA_help=>T("Composite.Utils.Compare.AreEqual.param.ValueA.help");
///<summary>&quot;Value A to compare.&quot;</summary> 
public static string Composite_Utils_Compare_AreEqual_param_ValueA_label=>T("Composite.Utils.Compare.AreEqual.param.ValueA.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Compare_AreEqual_param_ValueB_help=>T("Composite.Utils.Compare.AreEqual.param.ValueB.help");
///<summary>&quot;Value B to compare.&quot;</summary> 
public static string Composite_Utils_Compare_AreEqual_param_ValueB_label=>T("Composite.Utils.Compare.AreEqual.param.ValueB.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Compare_IsLessThan_description=>T("Composite.Utils.Compare.IsLessThan.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Compare_IsLessThan_param_ValueA_help=>T("Composite.Utils.Compare.IsLessThan.param.ValueA.help");
///<summary>&quot;Value A to compare.&quot;</summary> 
public static string Composite_Utils_Compare_IsLessThan_param_ValueA_label=>T("Composite.Utils.Compare.IsLessThan.param.ValueA.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Compare_IsLessThan_param_ValueB_help=>T("Composite.Utils.Compare.IsLessThan.param.ValueB.help");
///<summary>&quot;Value B to compare.&quot;</summary> 
public static string Composite_Utils_Compare_IsLessThan_param_ValueB_label=>T("Composite.Utils.Compare.IsLessThan.param.ValueB.label");
///<summary>&quot;Reads a string from the application configuration file (web.config or app.config)&quot;</summary> 
public static string Composite_Utils_Configuration_AppSettingsValue_description=>T("Composite.Utils.Configuration.AppSettingsValue.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Configuration_AppSettingsValue_param_KeyName_help=>T("Composite.Utils.Configuration.AppSettingsValue.param.KeyName.help");
///<summary>&quot;Key Name&quot;</summary> 
public static string Composite_Utils_Configuration_AppSettingsValue_param_KeyName_label=>T("Composite.Utils.Configuration.AppSettingsValue.param.KeyName.label");
///<summary>&quot;Add a number of days to the current date and get the resulting date.&quot;</summary> 
public static string Composite_Utils_Date_AddDays_description=>T("Composite.Utils.Date.AddDays.description");
///<summary>&quot;Specify a negative or positive number of days to add to the current date.&quot;</summary> 
public static string Composite_Utils_Date_AddDays_param_DaysToAdd_help=>T("Composite.Utils.Date.AddDays.param.DaysToAdd.help");
///<summary>&quot;Days to add&quot;</summary> 
public static string Composite_Utils_Date_AddDays_param_DaysToAdd_label=>T("Composite.Utils.Date.AddDays.param.DaysToAdd.label");
///<summary>&quot;The current date and time&quot;</summary> 
public static string Composite_Utils_Date_Now_description=>T("Composite.Utils.Date.Now.description");
///<summary>&quot;Returns an input parameter from executing function context. Use this in developing to copy an input value to a new function call.&quot;</summary> 
public static string Composite_Utils_GetInputParameter_description=>T("Composite.Utils.GetInputParameter.description");
///<summary>&quot;Specify the name of the input parameter which value you wish to use here.&quot;</summary> 
public static string Composite_Utils_GetInputParameter_param_InputParameterName_help=>T("Composite.Utils.GetInputParameter.param.InputParameterName.help");
///<summary>&quot;Parameter name&quot;</summary> 
public static string Composite_Utils_GetInputParameter_param_InputParameterName_label=>T("Composite.Utils.GetInputParameter.param.InputParameterName.label");
///<summary>&quot;Parses a string into an object. The type of object depends on the receiver. Using this function to deliver a value to a DateTime parameter, will make the system parse the string as a DateTime etc.&quot;</summary> 
public static string Composite_Utils_ParseStringToObject_description=>T("Composite.Utils.ParseStringToObject.description");
///<summary>&quot;Specify the string to parse. Note that the string must be formatted in a way that can be converted into the type of object that is expected.&quot;</summary> 
public static string Composite_Utils_ParseStringToObject_param_StringToParse_help=>T("Composite.Utils.ParseStringToObject.param.StringToParse.help");
///<summary>&quot;String to parse&quot;</summary> 
public static string Composite_Utils_ParseStringToObject_param_StringToParse_label=>T("Composite.Utils.ParseStringToObject.param.StringToParse.label");
///<summary>&quot;Returns a new random Guid.&quot;</summary> 
public static string Composite_Utils_Guid_NewGuid_description=>T("Composite.Utils.Guid.NewGuid.description");
///<summary>&quot;A list of all cultures&quot;</summary> 
public static string Composite_Utils_Globalization_AllCultures_description=>T("Composite.Utils.Globalization.AllCultures.description");
///<summary>&quot;The culture for the current user / request.&quot;</summary> 
public static string Composite_Utils_Globalization_CurrentCulture_description=>T("Composite.Utils.Globalization.CurrentCulture.description");
///<summary>&quot;Returns the sum from a list of integers&quot;</summary> 
public static string Composite_Utils_Integer_Sum_description=>T("Composite.Utils.Integer.Sum.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Integer_Sum_param_Ints_help=>T("Composite.Utils.Integer.Sum.param.Ints.help");
///<summary>&quot;Integer list&quot;</summary> 
public static string Composite_Utils_Integer_Sum_param_Ints_label=>T("Composite.Utils.Integer.Sum.param.Ints.label");
///<summary>&quot;Check if a boolean is true or false. &quot;</summary> 
public static string Composite_Utils_Predicates_BoolEquals_description=>T("Composite.Utils.Predicates.BoolEquals.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_BoolEquals_param_Value_help=>T("Composite.Utils.Predicates.BoolEquals.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_BoolEquals_param_Value_label=>T("Composite.Utils.Predicates.BoolEquals.param.Value.label");
///<summary>&quot;Check if a date equals a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_DateTimeEquals_description=>T("Composite.Utils.Predicates.DateTimeEquals.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_DateTimeEquals_param_Value_help=>T("Composite.Utils.Predicates.DateTimeEquals.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_DateTimeEquals_param_Value_label=>T("Composite.Utils.Predicates.DateTimeEquals.param.Value.label");
///<summary>&quot;Check if a date is greater than a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_DateTimeGreaterThan_description=>T("Composite.Utils.Predicates.DateTimeGreaterThan.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_DateTimeGreaterThan_param_Value_help=>T("Composite.Utils.Predicates.DateTimeGreaterThan.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_DateTimeGreaterThan_param_Value_label=>T("Composite.Utils.Predicates.DateTimeGreaterThan.param.Value.label");
///<summary>&quot;Check if a date is less than a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_DateTimeLessThan_description=>T("Composite.Utils.Predicates.DateTimeLessThan.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_DateTimeLessThan_param_Value_help=>T("Composite.Utils.Predicates.DateTimeLessThan.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_DateTimeLessThan_param_Value_label=>T("Composite.Utils.Predicates.DateTimeLessThan.param.Value.label");
///<summary>&quot;Check is a decimal has a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_DecimalEquals_description=>T("Composite.Utils.Predicates.DecimalEquals.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_DecimalEquals_param_Value_help=>T("Composite.Utils.Predicates.DecimalEquals.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_DecimalEquals_param_Value_label=>T("Composite.Utils.Predicates.DecimalEquals.param.Value.label");
///<summary>&quot;Check if a decimal is greater than a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_DecimalGreaterThan_description=>T("Composite.Utils.Predicates.DecimalGreaterThan.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_DecimalGreaterThan_param_Value_help=>T("Composite.Utils.Predicates.DecimalGreaterThan.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_DecimalGreaterThan_param_Value_label=>T("Composite.Utils.Predicates.DecimalGreaterThan.param.Value.label");
///<summary>&quot;Check if a decimal is less than a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_DecimalLessThan_description=>T("Composite.Utils.Predicates.DecimalLessThan.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_DecimalLessThan_param_Value_help=>T("Composite.Utils.Predicates.DecimalLessThan.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_DecimalLessThan_param_Value_label=>T("Composite.Utils.Predicates.DecimalLessThan.param.Value.label");
///<summary>&quot;Check if a Guid equals a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_GuidEquals_description=>T("Composite.Utils.Predicates.GuidEquals.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_GuidEquals_param_Value_help=>T("Composite.Utils.Predicates.GuidEquals.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_GuidEquals_param_Value_label=>T("Composite.Utils.Predicates.GuidEquals.param.Value.label");
///<summary>&quot;Check if a Guid exists in a comma separated string list&quot;</summary> 
public static string Composite_Utils_Predicates_GuidInCommaSeparatedList_description=>T("Composite.Utils.Predicates.GuidInCommaSeparatedList.description");
///<summary>&quot;List of Guid&quot;</summary> 
public static string Composite_Utils_Predicates_GuidInCommaSeparatedList_param_CommaSeparatedGuids_label=>T("Composite.Utils.Predicates.GuidInCommaSeparatedList.param.CommaSeparatedGuids.label");
///<summary>&quot;A string containing zero or more Guids separated by commas&quot;</summary> 
public static string Composite_Utils_Predicates_GuidInCommaSeparatedList_param_CommaSeparatedGuids_help=>T("Composite.Utils.Predicates.GuidInCommaSeparatedList.param.CommaSeparatedGuids.help");
///<summary>&quot;Check if a string field matches one of the terms in a comma separated string list&quot;</summary> 
public static string Composite_Utils_Predicates_StringInCommaSeparatedList_description=>T("Composite.Utils.Predicates.StringInCommaSeparatedList.description");
///<summary>&quot;Search terms&quot;</summary> 
public static string Composite_Utils_Predicates_StringInCommaSeparatedList_param_CommaSeparatedSearchTerms_label=>T("Composite.Utils.Predicates.StringInCommaSeparatedList.param.CommaSeparatedSearchTerms.label");
///<summary>&quot;A string containing search terms separated by commas, like &apos;c1,cms,linq&apos;&quot;</summary> 
public static string Composite_Utils_Predicates_StringInCommaSeparatedList_param_CommaSeparatedSearchTerms_help=>T("Composite.Utils.Predicates.StringInCommaSeparatedList.param.CommaSeparatedSearchTerms.help");
///<summary>&quot;Ignore case&quot;</summary> 
public static string Composite_Utils_Predicates_StringInCommaSeparatedList_param_IgnoreCase_label=>T("Composite.Utils.Predicates.StringInCommaSeparatedList.param.IgnoreCase.label");
///<summary>&quot;When &apos;false&apos;, casing of the words must match exactly. Default is &apos;true&apos;, case insensitive search&quot;</summary> 
public static string Composite_Utils_Predicates_StringInCommaSeparatedList_param_IgnoreCase_help=>T("Composite.Utils.Predicates.StringInCommaSeparatedList.param.IgnoreCase.help");
///<summary>&quot;Check if a string field matches one of the strings in the supplied list&quot;</summary> 
public static string Composite_Utils_Predicates_StringInList_description=>T("Composite.Utils.Predicates.StringInList.description");
///<summary>&quot;Search terms&quot;</summary> 
public static string Composite_Utils_Predicates_StringInList_param_SearchTerms_label=>T("Composite.Utils.Predicates.StringInList.param.SearchTerms.label");
///<summary>&quot;A list of strings to match up against the searched string field.&quot;</summary> 
public static string Composite_Utils_Predicates_StringInList_param_SearchTerms_help=>T("Composite.Utils.Predicates.StringInList.param.SearchTerms.help");
///<summary>&quot;Ignore case&quot;</summary> 
public static string Composite_Utils_Predicates_StringInList_param_IgnoreCase_label=>T("Composite.Utils.Predicates.StringInList.param.IgnoreCase.label");
///<summary>&quot;When &apos;false&apos;, casing of the words must match exactly. Default is &apos;true&apos;, case insensitive search&quot;</summary> 
public static string Composite_Utils_Predicates_StringInList_param_IgnoreCase_help=>T("Composite.Utils.Predicates.StringInList.param.IgnoreCase.help");
///<summary>&quot;Check if an integer equals a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_IntegerEquals_description=>T("Composite.Utils.Predicates.IntegerEquals.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_IntegerEquals_param_Value_help=>T("Composite.Utils.Predicates.IntegerEquals.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_IntegerEquals_param_Value_label=>T("Composite.Utils.Predicates.IntegerEquals.param.Value.label");
///<summary>&quot;Check if an integer is greater than a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_IntegerGreaterThan_description=>T("Composite.Utils.Predicates.IntegerGreaterThan.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_IntegerGreaterThan_param_Value_help=>T("Composite.Utils.Predicates.IntegerGreaterThan.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_IntegerGreaterThan_param_Value_label=>T("Composite.Utils.Predicates.IntegerGreaterThan.param.Value.label");
///<summary>&quot;Check if an integer is less than a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_IntegerLessThan_description=>T("Composite.Utils.Predicates.IntegerLessThan.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_IntegerLessThan_param_Value_help=>T("Composite.Utils.Predicates.IntegerLessThan.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_IntegerLessThan_param_Value_label=>T("Composite.Utils.Predicates.IntegerLessThan.param.Value.label");
///<summary>&quot;Check if a string contains a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_StringContains_description=>T("Composite.Utils.Predicates.StringContains.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_StringContains_param_Value_help=>T("Composite.Utils.Predicates.StringContains.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_StringContains_param_Value_label=>T("Composite.Utils.Predicates.StringContains.param.Value.label");
///<summary>&quot;Check if a string ends with a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_StringEndsWith_description=>T("Composite.Utils.Predicates.StringEndsWith.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_StringEndsWith_param_Value_help=>T("Composite.Utils.Predicates.StringEndsWith.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_StringEndsWith_param_Value_label=>T("Composite.Utils.Predicates.StringEndsWith.param.Value.label");
///<summary>&quot;Check if a string equals a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_StringEquals_description=>T("Composite.Utils.Predicates.StringEquals.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_StringEquals_param_Value_help=>T("Composite.Utils.Predicates.StringEquals.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_StringEquals_param_Value_label=>T("Composite.Utils.Predicates.StringEquals.param.Value.label");
///<summary>&quot;Check if a string starts with a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_StringStartsWith_description=>T("Composite.Utils.Predicates.StringStartsWith.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_StringStartsWith_param_Value_help=>T("Composite.Utils.Predicates.StringStartsWith.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_StringStartsWith_param_Value_label=>T("Composite.Utils.Predicates.StringStartsWith.param.Value.label");
///<summary>&quot;Check if a Guid equals a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_NullableGuidEquals_description=>T("Composite.Utils.Predicates.NullableGuidEquals.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_NullableGuidEquals_param_Value_help=>T("Composite.Utils.Predicates.NullableGuidEquals.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_NullableGuidEquals_param_Value_label=>T("Composite.Utils.Predicates.NullableGuidEquals.param.Value.label");
///<summary>&quot;Check if a nullable Guid has no value&quot;</summary> 
public static string Composite_Utils_Predicates_NullableGuidNoValue_description=>T("Composite.Utils.Predicates.NullableGuidNoValue.description");
///<summary>&quot;Check if an integer equals a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_NullableIntegerEquals_description=>T("Composite.Utils.Predicates.NullableIntegerEquals.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_NullableIntegerEquals_param_Value_help=>T("Composite.Utils.Predicates.NullableIntegerEquals.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_NullableIntegerEquals_param_Value_label=>T("Composite.Utils.Predicates.NullableIntegerEquals.param.Value.label");
///<summary>&quot;Check if an nullable integer has no value&quot;</summary> 
public static string Composite_Utils_Predicates_NullableIntegerNoValue_description=>T("Composite.Utils.Predicates.NullableIntegerNoValue.description");
///<summary>&quot;Check if a string has no value&quot;</summary> 
public static string Composite_Utils_Predicates_StringNoValue_description=>T("Composite.Utils.Predicates.StringNoValue.description");
///<summary>&quot;Check if a boolean is true or false. &quot;</summary> 
public static string Composite_Utils_Predicates_NullableBoolEquals_description=>T("Composite.Utils.Predicates.NullableBoolEquals.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_NullableBoolEquals_param_Value_help=>T("Composite.Utils.Predicates.NullableBoolEquals.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_NullableBoolEquals_param_Value_label=>T("Composite.Utils.Predicates.NullableBoolEquals.param.Value.label");
///<summary>&quot;Check if a nullable boolean has no value&quot;</summary> 
public static string Composite_Utils_Predicates_NullableBoolNoValue_description=>T("Composite.Utils.Predicates.NullableBoolNoValue.description");
///<summary>&quot;Check if a date equals a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_NullableDateTimeEquals_description=>T("Composite.Utils.Predicates.NullableDateTimeEquals.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_NullableDateTimeEquals_param_Value_help=>T("Composite.Utils.Predicates.NullableDateTimeEquals.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_NullableDateTimeEquals_param_Value_label=>T("Composite.Utils.Predicates.NullableDateTimeEquals.param.Value.label");
///<summary>&quot;Check if a date is greater than a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_NullableDateTimeGreaterThan_description=>T("Composite.Utils.Predicates.NullableDateTimeGreaterThan.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_NullableDateTimeGreaterThan_param_Value_help=>T("Composite.Utils.Predicates.NullableDateTimeGreaterThan.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_NullableDateTimeGreaterThan_param_Value_label=>T("Composite.Utils.Predicates.NullableDateTimeGreaterThan.param.Value.label");
///<summary>&quot;Check if a date is less than a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_NullableDateTimeLessThan_description=>T("Composite.Utils.Predicates.NullableDateTimeLessThan.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_NullableDateTimeLessThan_param_Value_help=>T("Composite.Utils.Predicates.NullableDateTimeLessThan.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_NullableDateTimeLessThan_param_Value_label=>T("Composite.Utils.Predicates.NullableDateTimeLessThan.param.Value.label");
///<summary>&quot;Check if a nullable date has no value&quot;</summary> 
public static string Composite_Utils_Predicates_NullableDateTimeNoValue_description=>T("Composite.Utils.Predicates.NullableDateTimeNoValue.description");
///<summary>&quot;Check is a decimal has a certain value&quot;</summary> 
public static string Composite_Utils_Predicates_NullableDecimalEquals_description=>T("Composite.Utils.Predicates.NullableDecimalEquals.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Predicates_NullableDecimalEquals_param_Value_help=>T("Composite.Utils.Predicates.NullableDecimalEquals.param.Value.help");
///<summary>&quot;The value to compare with&quot;</summary> 
public static string Composite_Utils_Predicates_NullableDecimalEquals_param_Value_label=>T("Composite.Utils.Predicates.NullableDecimalEquals.param.Value.label");
///<summary>&quot;Check is a nullable decimal has no value&quot;</summary> 
public static string Composite_Utils_Predicates_NullableDecimalNoValue_description=>T("Composite.Utils.Predicates.NullableDecimalNoValue.description");
///<summary>&quot;Joins a list of strings to a single string&quot;</summary> 
public static string Composite_Utils_String_Join_description=>T("Composite.Utils.String.Join.description");
///<summary>&quot;The separator to insert between strings.&quot;</summary> 
public static string Composite_Utils_String_Join_param_Separator_help=>T("Composite.Utils.String.Join.param.Separator.help");
///<summary>&quot;Separator&quot;</summary> 
public static string Composite_Utils_String_Join_param_Separator_label=>T("Composite.Utils.String.Join.param.Separator.label");
///<summary>&quot;The list of strings to join&quot;</summary> 
public static string Composite_Utils_String_Join_param_Strings_help=>T("Composite.Utils.String.Join.param.Strings.help");
///<summary>&quot;Strings to join&quot;</summary> 
public static string Composite_Utils_String_Join_param_Strings_label=>T("Composite.Utils.String.Join.param.Strings.label");
///<summary>&quot;Joins two strings to a simple string&quot;</summary> 
public static string Composite_Utils_String_JoinTwo_description=>T("Composite.Utils.String.JoinTwo.description");
///<summary>&quot;The string to put first&quot;</summary> 
public static string Composite_Utils_String_JoinTwo_param_StringA_help=>T("Composite.Utils.String.JoinTwo.param.StringA.help");
///<summary>&quot;String A&quot;</summary> 
public static string Composite_Utils_String_JoinTwo_param_StringA_label=>T("Composite.Utils.String.JoinTwo.param.StringA.label");
///<summary>&quot;The string to put last&quot;</summary> 
public static string Composite_Utils_String_JoinTwo_param_StringB_help=>T("Composite.Utils.String.JoinTwo.param.StringB.help");
///<summary>&quot;String B&quot;</summary> 
public static string Composite_Utils_String_JoinTwo_param_StringB_label=>T("Composite.Utils.String.JoinTwo.param.StringB.label");
///<summary>&quot;A string to insert in between String A and String B. Default is no separator&quot;</summary> 
public static string Composite_Utils_String_JoinTwo_param_Separator_help=>T("Composite.Utils.String.JoinTwo.param.Separator.help");
///<summary>&quot;Separator&quot;</summary> 
public static string Composite_Utils_String_JoinTwo_param_Separator_label=>T("Composite.Utils.String.JoinTwo.param.Separator.label");
///<summary>&quot;Splits a string into a list of string.&quot;</summary> 
public static string Composite_Utils_String_Split_description=>T("Composite.Utils.String.Split.description");
///<summary>&quot;The separator to use when splitting the string. Default is comma (&quot;,&quot;)&quot;</summary> 
public static string Composite_Utils_String_Split_param_Separator_help=>T("Composite.Utils.String.Split.param.Separator.help");
///<summary>&quot;Separator&quot;</summary> 
public static string Composite_Utils_String_Split_param_Separator_label=>T("Composite.Utils.String.Split.param.Separator.label");
///<summary>&quot;The string you wish to split into a list.&quot;</summary> 
public static string Composite_Utils_String_Split_param_String_help=>T("Composite.Utils.String.Split.param.String.help");
///<summary>&quot;String to split&quot;</summary> 
public static string Composite_Utils_String_Split_param_String_label=>T("Composite.Utils.String.Split.param.String.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Validation_DateTimeNotNullValidation_description=>T("Composite.Utils.Validation.DateTimeNotNullValidation.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Validation_DecimalNotNullValidation_description=>T("Composite.Utils.Validation.DecimalNotNullValidation.description");
///<summary>&quot;Validates the precision of digits (the number of decimals the user has specified)&quot;</summary> 
public static string Composite_Utils_Validation_DecimalPrecisionValidation_description=>T("Composite.Utils.Validation.DecimalPrecisionValidation.description");
///<summary>&quot;The maximum number of digits to allow on the decimal&quot;</summary> 
public static string Composite_Utils_Validation_DecimalPrecisionValidation_param_MaxDigits_help=>T("Composite.Utils.Validation.DecimalPrecisionValidation.param.MaxDigits.help");
///<summary>&quot;Max number of decimal digits&quot;</summary> 
public static string Composite_Utils_Validation_DecimalPrecisionValidation_param_MaxDigits_label=>T("Composite.Utils.Validation.DecimalPrecisionValidation.param.MaxDigits.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Validation_GuidNotNullValidation_description=>T("Composite.Utils.Validation.GuidNotNullValidation.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Validation_Int32NotNullValidation_description=>T("Composite.Utils.Validation.Int32NotNullValidation.description");
///<summary>&quot;Validates than an integer is within a certain range.&quot;</summary> 
public static string Composite_Utils_Validation_IntegerRangeValidation_description=>T("Composite.Utils.Validation.IntegerRangeValidation.description");
///<summary>&quot;The maximum number allowed in this field.&quot;</summary> 
public static string Composite_Utils_Validation_IntegerRangeValidation_param_max_help=>T("Composite.Utils.Validation.IntegerRangeValidation.param.max.help");
///<summary>&quot;Maximum number&quot;</summary> 
public static string Composite_Utils_Validation_IntegerRangeValidation_param_max_label=>T("Composite.Utils.Validation.IntegerRangeValidation.param.max.label");
///<summary>&quot;The minimum number allowed in this field.&quot;</summary> 
public static string Composite_Utils_Validation_IntegerRangeValidation_param_min_help=>T("Composite.Utils.Validation.IntegerRangeValidation.param.min.help");
///<summary>&quot;Minimum number&quot;</summary> 
public static string Composite_Utils_Validation_IntegerRangeValidation_param_min_label=>T("Composite.Utils.Validation.IntegerRangeValidation.param.min.label");
///<summary>&quot;Validates that a string conforms to the specified regular expression&quot;</summary> 
public static string Composite_Utils_Validation_RegularExpressionValidation_description=>T("Composite.Utils.Validation.RegularExpressionValidation.description");
///<summary>&quot;The regular expression pattern to use&quot;</summary> 
public static string Composite_Utils_Validation_RegularExpressionValidation_param_pattern_help=>T("Composite.Utils.Validation.RegularExpressionValidation.param.pattern.help");
///<summary>&quot;RegEx pattern&quot;</summary> 
public static string Composite_Utils_Validation_RegularExpressionValidation_param_pattern_label=>T("Composite.Utils.Validation.RegularExpressionValidation.param.pattern.label");
///<summary>&quot;Validates that the length of a string is within the specified range&quot;</summary> 
public static string Composite_Utils_Validation_StringLengthValidation_description=>T("Composite.Utils.Validation.StringLengthValidation.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Validation_StringLengthValidation_param_max_help=>T("Composite.Utils.Validation.StringLengthValidation.param.max.help");
///<summary>&quot;Maximum length&quot;</summary> 
public static string Composite_Utils_Validation_StringLengthValidation_param_max_label=>T("Composite.Utils.Validation.StringLengthValidation.param.max.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Validation_StringLengthValidation_param_min_help=>T("Composite.Utils.Validation.StringLengthValidation.param.min.help");
///<summary>&quot;Minimum length&quot;</summary> 
public static string Composite_Utils_Validation_StringLengthValidation_param_min_label=>T("Composite.Utils.Validation.StringLengthValidation.param.min.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Utils_Validation_StringNotNullValidation_description=>T("Composite.Utils.Validation.StringNotNullValidation.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Client_BrowserPlatform_description=>T("Composite.Web.Client.BrowserPlatform.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Client_BrowserString_description=>T("Composite.Web.Client.BrowserString.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Client_BrowserType_description=>T("Composite.Web.Client.BrowserType.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Client_BrowserVersion_description=>T("Composite.Web.Client.BrowserVersion.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Client_EcmaScriptVersion_description=>T("Composite.Web.Client.EcmaScriptVersion.description");
///<summary>&quot;True if the current request is identified as coming from a crawler (search engine).&quot;</summary> 
public static string Composite_Web_Client_IsCrawler_description=>T("Composite.Web.Client.IsCrawler.description");
///<summary>&quot;True if the current request is identified as coming from a mobile device.&quot;</summary> 
public static string Composite_Web_Client_IsMobileDevice_description=>T("Composite.Web.Client.IsMobileDevice.description");
///<summary>&quot;Common HTML meta tags you probably want in your html head&quot;</summary> 
public static string Composite_Web_Html_Template_CommonMetaTags_description=>T("Composite.Web.Html.Template.CommonMetaTags.description");
///<summary>&quot;Content-Type&quot;</summary> 
public static string Composite_Web_Html_Template_CommonMetaTags_param_ContentType_label=>T("Composite.Web.Html.Template.CommonMetaTags.param.ContentType.label");
///<summary>&quot;By default this is &apos;text/html; charset=utf-8&apos;. If you serve something else you should overwrite this.&quot;</summary> 
public static string Composite_Web_Html_Template_CommonMetaTags_param_ContentType_help=>T("Composite.Web.Html.Template.CommonMetaTags.param.ContentType.help");
///<summary>&quot;Designer&quot;</summary> 
public static string Composite_Web_Html_Template_CommonMetaTags_param_Designer_label=>T("Composite.Web.Html.Template.CommonMetaTags.param.Designer.label");
///<summary>&quot;Who designed this website? Show it in the &apos;Designer&apos; meta tag. Default is not to emit the meta tag.&quot;</summary> 
public static string Composite_Web_Html_Template_CommonMetaTags_param_Designer_help=>T("Composite.Web.Html.Template.CommonMetaTags.param.Designer.help");
///<summary>&quot;Show generator&quot;</summary> 
public static string Composite_Web_Html_Template_CommonMetaTags_param_ShowGenerator_label=>T("Composite.Web.Html.Template.CommonMetaTags.param.ShowGenerator.label");
///<summary>&quot;Show the world you support Composite C1 - free open source!&quot;</summary> 
public static string Composite_Web_Html_Template_CommonMetaTags_param_ShowGenerator_help=>T("Composite.Web.Html.Template.CommonMetaTags.param.ShowGenerator.help");
///<summary>&quot;Appends a lang=&apos;(language code)&apos; attribute the the parent element, reflecting the language of the current page. You can put this just below the &lt;html /&gt; tag.&quot;</summary> 
public static string Composite_Web_Html_Template_LangAttribute_description=>T("Composite.Web.Html.Template.LangAttribute.description");
///<summary>&quot;Includes a named Page Template Feature at this location. Page Template Features can contain HTML and functional snippets and are managed on the Layout perspective.&quot;</summary> 
public static string Composite_Web_Html_Template_PageTemplateFeature_description=>T("Composite.Web.Html.Template.PageTemplateFeature.description");
///<summary>&quot;Feature name&quot;</summary> 
public static string Composite_Web_Html_Template_PageTemplateFeature_param_FeatureName_label=>T("Composite.Web.Html.Template.PageTemplateFeature.param.FeatureName.label");
///<summary>&quot;The name of the Page Template Feature you wish to include.&quot;</summary> 
public static string Composite_Web_Html_Template_PageTemplateFeature_param_FeatureName_help=>T("Composite.Web.Html.Template.PageTemplateFeature.param.FeatureName.help");
///<summary>&quot;Emits the &apos;definitive title&apos; of the current page; the same value that ends up in the page title tag. This title may originate from the page being rendered or from a C1 Function/ASP.NET control which changed the title to match specific data being featured on the page.&quot;</summary> 
public static string Composite_Web_Html_Template_HtmlTitleValue_description=>T("Composite.Web.Html.Template.HtmlTitleValue.description");
///<summary>&quot;Prefix to be removed&quot;</summary> 
public static string Composite_Web_Html_Template_HtmlTitleValue_param_PrefixToRemove_label=>T("Composite.Web.Html.Template.HtmlTitleValue.param.PrefixToRemove.label");
///<summary>&quot;If the HTML title has a prefix value you wish to get rid of, specify the prefix here. If the prefix is not found in the title, this value is ignored.&quot;</summary> 
public static string Composite_Web_Html_Template_HtmlTitleValue_param_PrefixToRemove_help=>T("Composite.Web.Html.Template.HtmlTitleValue.param.PrefixToRemove.help");
///<summary>&quot;Postfix to be removed&quot;</summary> 
public static string Composite_Web_Html_Template_HtmlTitleValue_param_PostfixToRemove_label=>T("Composite.Web.Html.Template.HtmlTitleValue.param.PostfixToRemove.label");
///<summary>&quot;If the HTML title has a postfix value you wish to get rid of, specify the postfix here. If the postfix is not found in the title, this value is ignored.&quot;</summary> 
public static string Composite_Web_Html_Template_HtmlTitleValue_param_PostfixToRemove_help=>T("Composite.Web.Html.Template.HtmlTitleValue.param.PostfixToRemove.help");
///<summary>&quot;Emits the &apos;definitive description&apos; of the current page; the same value that ends up in the page meta description tag. This value may originate from the page being rendered or from a C1 Function/ASP.NET control which changed the description to match specific data being featured on the page.&quot;</summary> 
public static string Composite_Web_Html_Template_MetaDescriptionValue_description=>T("Composite.Web.Html.Template.MetaDescriptionValue.description");
///<summary>&quot;Element to wrap description&quot;</summary> 
public static string Composite_Web_Html_Template_MetaDescriptionValue_param_Element_label=>T("Composite.Web.Html.Template.MetaDescriptionValue.param.Element.label");
///<summary>&quot;To have the description wrapped in an element (like &lt;p class=&quot;description&quot; /&gt;) specify it here. The element with only be emitted when a description text exist.&quot;</summary> 
public static string Composite_Web_Html_Template_MetaDescriptionValue_param_Element_help=>T("Composite.Web.Html.Template.MetaDescriptionValue.param.Element.help");
///<summary>&quot;Gets a value from the current users cookie collection.&quot;</summary> 
public static string Composite_Web_Request_CookieValue_description=>T("Composite.Web.Request.CookieValue.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_CookieValue_param_CookieName_help=>T("Composite.Web.Request.CookieValue.param.CookieName.help");
///<summary>&quot;Cookie name&quot;</summary> 
public static string Composite_Web_Request_CookieValue_param_CookieName_label=>T("Composite.Web.Request.CookieValue.param.CookieName.label");
///<summary>&quot;If the user does not have this cookie, use this field to specify what value to default to.&quot;</summary> 
public static string Composite_Web_Request_CookieValue_param_FallbackValue_help=>T("Composite.Web.Request.CookieValue.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_CookieValue_param_FallbackValue_label=>T("Composite.Web.Request.CookieValue.param.FallbackValue.label");
///<summary>&quot;Gets a boolean value from a form post (HTTP POST)&quot;</summary> 
public static string Composite_Web_Request_FormPostBoolValue_description=>T("Composite.Web.Request.FormPostBoolValue.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_FormPostBoolValue_param_FallbackValue_help=>T("Composite.Web.Request.FormPostBoolValue.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_FormPostBoolValue_param_FallbackValue_label=>T("Composite.Web.Request.FormPostBoolValue.param.FallbackValue.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_FormPostBoolValue_param_ParameterName_help=>T("Composite.Web.Request.FormPostBoolValue.param.ParameterName.help");
///<summary>&quot;Parameter name&quot;</summary> 
public static string Composite_Web_Request_FormPostBoolValue_param_ParameterName_label=>T("Composite.Web.Request.FormPostBoolValue.param.ParameterName.label");
///<summary>&quot;Gets a decimal value from a form post (HTTP POST)&quot;</summary> 
public static string Composite_Web_Request_FormPostDecimalValue_description=>T("Composite.Web.Request.FormPostDecimalValue.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_FormPostDecimalValue_param_FallbackValue_help=>T("Composite.Web.Request.FormPostDecimalValue.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_FormPostDecimalValue_param_FallbackValue_label=>T("Composite.Web.Request.FormPostDecimalValue.param.FallbackValue.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_FormPostDecimalValue_param_ParameterName_help=>T("Composite.Web.Request.FormPostDecimalValue.param.ParameterName.help");
///<summary>&quot;Parameter name&quot;</summary> 
public static string Composite_Web_Request_FormPostDecimalValue_param_ParameterName_label=>T("Composite.Web.Request.FormPostDecimalValue.param.ParameterName.label");
///<summary>&quot;Gets a Guid value from a form post (HTTP POST)&quot;</summary> 
public static string Composite_Web_Request_FormPostGuidValue_description=>T("Composite.Web.Request.FormPostGuidValue.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_FormPostGuidValue_param_FallbackValue_help=>T("Composite.Web.Request.FormPostGuidValue.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_FormPostGuidValue_param_FallbackValue_label=>T("Composite.Web.Request.FormPostGuidValue.param.FallbackValue.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_FormPostGuidValue_param_ParameterName_help=>T("Composite.Web.Request.FormPostGuidValue.param.ParameterName.help");
///<summary>&quot;Parameter name&quot;</summary> 
public static string Composite_Web_Request_FormPostGuidValue_param_ParameterName_label=>T("Composite.Web.Request.FormPostGuidValue.param.ParameterName.label");
///<summary>&quot;Gets an integer value from a form post (HTTP POST)&quot;</summary> 
public static string Composite_Web_Request_FormPostIntegerValue_description=>T("Composite.Web.Request.FormPostIntegerValue.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_FormPostIntegerValue_param_FallbackValue_help=>T("Composite.Web.Request.FormPostIntegerValue.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_FormPostIntegerValue_param_FallbackValue_label=>T("Composite.Web.Request.FormPostIntegerValue.param.FallbackValue.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_FormPostIntegerValue_param_ParameterName_help=>T("Composite.Web.Request.FormPostIntegerValue.param.ParameterName.help");
///<summary>&quot;Parameter name&quot;</summary> 
public static string Composite_Web_Request_FormPostIntegerValue_param_ParameterName_label=>T("Composite.Web.Request.FormPostIntegerValue.param.ParameterName.label");
///<summary>&quot;Gets a string value from a form post (HTTP POST)&quot;</summary> 
public static string Composite_Web_Request_FormPostValue_description=>T("Composite.Web.Request.FormPostValue.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_FormPostValue_param_FallbackValue_help=>T("Composite.Web.Request.FormPostValue.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_FormPostValue_param_FallbackValue_label=>T("Composite.Web.Request.FormPostValue.param.FallbackValue.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_FormPostValue_param_ParameterName_help=>T("Composite.Web.Request.FormPostValue.param.ParameterName.help");
///<summary>&quot;Parameter name&quot;</summary> 
public static string Composite_Web_Request_FormPostValue_param_ParameterName_label=>T("Composite.Web.Request.FormPostValue.param.ParameterName.label");
///<summary>&quot;Gets a date and time value from a form post (HTTP POST). The incoming date string is expected to be XML formatted (like “2003-09-26T13:30:00”)&quot;</summary> 
public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_description=>T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.description");
///<summary>&quot;The value to use if the post did not contain the specified parameter name.&quot;</summary> 
public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_param_FallbackValue_help=>T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_param_FallbackValue_label=>T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.param.FallbackValue.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_param_ParameterName_help=>T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.param.ParameterName.help");
///<summary>&quot;Parameter name&quot;</summary> 
public static string Composite_Web_Request_FormPostXmlFormattedDateTimeValue_param_ParameterName_label=>T("Composite.Web.Request.FormPostXmlFormattedDateTimeValue.param.ParameterName.label");
///<summary>&quot;Gets a boolean value from a Url parameter (HTTP GET)&quot;</summary> 
public static string Composite_Web_Request_QueryStringBoolValue_description=>T("Composite.Web.Request.QueryStringBoolValue.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_QueryStringBoolValue_param_FallbackValue_help=>T("Composite.Web.Request.QueryStringBoolValue.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_QueryStringBoolValue_param_FallbackValue_label=>T("Composite.Web.Request.QueryStringBoolValue.param.FallbackValue.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_QueryStringBoolValue_param_ParameterName_help=>T("Composite.Web.Request.QueryStringBoolValue.param.ParameterName.help");
///<summary>&quot;Parameter name&quot;</summary> 
public static string Composite_Web_Request_QueryStringBoolValue_param_ParameterName_label=>T("Composite.Web.Request.QueryStringBoolValue.param.ParameterName.label");
///<summary>&quot;Gets a decimal value from a Url parameter (HTTP GET)&quot;</summary> 
public static string Composite_Web_Request_QueryStringDecimalValue_description=>T("Composite.Web.Request.QueryStringDecimalValue.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_QueryStringDecimalValue_param_FallbackValue_help=>T("Composite.Web.Request.QueryStringDecimalValue.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_QueryStringDecimalValue_param_FallbackValue_label=>T("Composite.Web.Request.QueryStringDecimalValue.param.FallbackValue.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_QueryStringDecimalValue_param_ParameterName_help=>T("Composite.Web.Request.QueryStringDecimalValue.param.ParameterName.help");
///<summary>&quot;Parameter name&quot;</summary> 
public static string Composite_Web_Request_QueryStringDecimalValue_param_ParameterName_label=>T("Composite.Web.Request.QueryStringDecimalValue.param.ParameterName.label");
///<summary>&quot;Gets a Guid value from a Url parameter (HTTP GET)&quot;</summary> 
public static string Composite_Web_Request_QueryStringGuidValue_description=>T("Composite.Web.Request.QueryStringGuidValue.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_QueryStringGuidValue_param_FallbackValue_help=>T("Composite.Web.Request.QueryStringGuidValue.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_QueryStringGuidValue_param_FallbackValue_label=>T("Composite.Web.Request.QueryStringGuidValue.param.FallbackValue.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_QueryStringGuidValue_param_ParameterName_help=>T("Composite.Web.Request.QueryStringGuidValue.param.ParameterName.help");
///<summary>&quot;Parameter name&quot;</summary> 
public static string Composite_Web_Request_QueryStringGuidValue_param_ParameterName_label=>T("Composite.Web.Request.QueryStringGuidValue.param.ParameterName.label");
///<summary>&quot;Gets an integer value from a Url parameter (HTTP GET)&quot;</summary> 
public static string Composite_Web_Request_QueryStringIntegerValue_description=>T("Composite.Web.Request.QueryStringIntegerValue.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_QueryStringIntegerValue_param_FallbackValue_help=>T("Composite.Web.Request.QueryStringIntegerValue.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_QueryStringIntegerValue_param_FallbackValue_label=>T("Composite.Web.Request.QueryStringIntegerValue.param.FallbackValue.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_QueryStringIntegerValue_param_ParameterName_help=>T("Composite.Web.Request.QueryStringIntegerValue.param.ParameterName.help");
///<summary>&quot;Parameter name&quot;</summary> 
public static string Composite_Web_Request_QueryStringIntegerValue_param_ParameterName_label=>T("Composite.Web.Request.QueryStringIntegerValue.param.ParameterName.label");
///<summary>&quot;Gets a string value from a Url parameter (HTTP GET)&quot;</summary> 
public static string Composite_Web_Request_QueryStringValue_description=>T("Composite.Web.Request.QueryStringValue.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_QueryStringValue_param_FallbackValue_help=>T("Composite.Web.Request.QueryStringValue.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_QueryStringValue_param_FallbackValue_label=>T("Composite.Web.Request.QueryStringValue.param.FallbackValue.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_QueryStringValue_param_ParameterName_help=>T("Composite.Web.Request.QueryStringValue.param.ParameterName.help");
///<summary>&quot;Parameter name&quot;</summary> 
public static string Composite_Web_Request_QueryStringValue_param_ParameterName_label=>T("Composite.Web.Request.QueryStringValue.param.ParameterName.label");
///<summary>&quot;Gets a date and time value from a Url parameter (HTTP GET). The incoming date string is expected to be XML formatted (like “2003-09-26T13:30:00”)&quot;</summary> 
public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_description=>T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.description");
///<summary>&quot;The value to use if the Url did not contain the specified parameter name.&quot;</summary> 
public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_param_FallbackValue_help=>T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_param_FallbackValue_label=>T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.param.FallbackValue.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_param_ParameterName_help=>T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.param.ParameterName.help");
///<summary>&quot;Parameter name&quot;</summary> 
public static string Composite_Web_Request_QueryStringXmlFormattedDateTimeValue_param_ParameterName_label=>T("Composite.Web.Request.QueryStringXmlFormattedDateTimeValue.param.ParameterName.label");
///<summary>&quot;Returns additional information passed in a URL along with the page link.&quot;</summary> 
public static string Composite_Web_Request_PathInfo_description=>T("Composite.Web.Request.PathInfo.description");
///<summary>&quot;The segment of the path info to retrieve, using the format &apos;/(0)/(1)/(2)/...&apos;. Specify -1 to get the entire string.&quot;</summary> 
public static string Composite_Web_Request_PathInfo_param_Segment_help=>T("Composite.Web.Request.PathInfo.param.Segment.help");
///<summary>&quot;Segment&quot;</summary> 
public static string Composite_Web_Request_PathInfo_param_Segment_label=>T("Composite.Web.Request.PathInfo.param.Segment.label");
///<summary>&quot;When true, any path info string will be accepted. Default is true.&quot;</summary> 
public static string Composite_Web_Request_PathInfo_param_AutoApprove_help=>T("Composite.Web.Request.PathInfo.param.AutoApprove.help");
///<summary>&quot;AutoApprove&quot;</summary> 
public static string Composite_Web_Request_PathInfo_param_AutoApprove_label=>T("Composite.Web.Request.PathInfo.param.AutoApprove.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_PathInfo_param_FallbackValue_help=>T("Composite.Web.Request.PathInfo.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_PathInfo_param_FallbackValue_label=>T("Composite.Web.Request.PathInfo.param.FallbackValue.label");
///<summary>&quot;Extracts an integer value from a PathInfo segment.&quot;</summary> 
public static string Composite_Web_Request_PathInfoInt_description=>T("Composite.Web.Request.PathInfoInt.description");
///<summary>&quot;The segment of the path info to retrieve, using the format &apos;/(0)/(1)/(2)/...&apos;.&quot;</summary> 
public static string Composite_Web_Request_PathInfoInt_param_Segment_help=>T("Composite.Web.Request.PathInfoInt.param.Segment.help");
///<summary>&quot;Segment&quot;</summary> 
public static string Composite_Web_Request_PathInfoInt_param_Segment_label=>T("Composite.Web.Request.PathInfoInt.param.Segment.label");
///<summary>&quot;When true, any path info string will be accepted. Default is true.&quot;</summary> 
public static string Composite_Web_Request_PathInfoInt_param_AutoApprove_help=>T("Composite.Web.Request.PathInfoInt.param.AutoApprove.help");
///<summary>&quot;AutoApprove&quot;</summary> 
public static string Composite_Web_Request_PathInfoInt_param_AutoApprove_label=>T("Composite.Web.Request.PathInfoInt.param.AutoApprove.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_PathInfoInt_param_FallbackValue_help=>T("Composite.Web.Request.PathInfoInt.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_PathInfoInt_param_FallbackValue_label=>T("Composite.Web.Request.PathInfoInt.param.FallbackValue.label");
///<summary>&quot;Extracts a GUID from a PathInfo segment.&quot;</summary> 
public static string Composite_Web_Request_PathInfoGuid_description=>T("Composite.Web.Request.PathInfoGuid.description");
///<summary>&quot;The segment of the path info to retrieve, using the format &apos;/(0)/(1)/(2)/...&apos;. &quot;</summary> 
public static string Composite_Web_Request_PathInfoGuid_param_Segment_help=>T("Composite.Web.Request.PathInfoGuid.param.Segment.help");
///<summary>&quot;Segment&quot;</summary> 
public static string Composite_Web_Request_PathInfoGuid_param_Segment_label=>T("Composite.Web.Request.PathInfoGuid.param.Segment.label");
///<summary>&quot;When true, accept any path info string will be accepted. Default is true.&quot;</summary> 
public static string Composite_Web_Request_PathInfoGuid_param_AutoApprove_help=>T("Composite.Web.Request.PathInfoGuid.param.AutoApprove.help");
///<summary>&quot;AutoApprove&quot;</summary> 
public static string Composite_Web_Request_PathInfoGuid_param_AutoApprove_label=>T("Composite.Web.Request.PathInfoGuid.param.AutoApprove.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_PathInfoGuid_param_FallbackValue_help=>T("Composite.Web.Request.PathInfoGuid.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_PathInfoGuid_param_FallbackValue_label=>T("Composite.Web.Request.PathInfoGuid.param.FallbackValue.label");
///<summary>&quot;Notifies the system of PathInfo being used, so that the request is not redirected to the &apos;Page not found&apos; page.&quot;</summary> 
public static string Composite_Web_Request_RegisterPathInfoUsage_description=>T("Composite.Web.Request.RegisterPathInfoUsage.description");
///<summary>&quot;Retrieves a variable from the current users session as a string.&quot;</summary> 
public static string Composite_Web_Request_SessionVariable_description=>T("Composite.Web.Request.SessionVariable.description");
///<summary>&quot;The value to use if the session variable was not found&quot;</summary> 
public static string Composite_Web_Request_SessionVariable_param_FallbackValue_help=>T("Composite.Web.Request.SessionVariable.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Request_SessionVariable_param_FallbackValue_label=>T("Composite.Web.Request.SessionVariable.param.FallbackValue.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Request_SessionVariable_param_VariableName_help=>T("Composite.Web.Request.SessionVariable.param.VariableName.help");
///<summary>&quot;Variable name&quot;</summary> 
public static string Composite_Web_Request_SessionVariable_param_VariableName_label=>T("Composite.Web.Request.SessionVariable.param.VariableName.label");
///<summary>&quot;Redirects the website visitor to another URL. URL redirects are suppressed when this function executes inside the C1 console.&quot;</summary> 
public static string Composite_Web_Response_Redirect_description=>T("Composite.Web.Response.Redirect.description");
///<summary>&quot;The URL the user should be redirected to, either absolute (http://contoso.com/default.aspx) or relative (/Login.aspx)).&quot;</summary> 
public static string Composite_Web_Response_Redirect_param_Url_help=>T("Composite.Web.Response.Redirect.param.Url.help");
///<summary>&quot;URL&quot;</summary> 
public static string Composite_Web_Response_Redirect_param_Url_label=>T("Composite.Web.Response.Redirect.param.Url.label");
///<summary>&quot;Sets a cookie value for the current user&quot;</summary> 
public static string Composite_Web_Response_SetCookieValue_description=>T("Composite.Web.Response.SetCookieValue.description");
///<summary>&quot;The name of the cookie to set / overwrite&quot;</summary> 
public static string Composite_Web_Response_SetCookieValue_param_CookieName_help=>T("Composite.Web.Response.SetCookieValue.param.CookieName.help");
///<summary>&quot;Cookie name&quot;</summary> 
public static string Composite_Web_Response_SetCookieValue_param_CookieName_label=>T("Composite.Web.Response.SetCookieValue.param.CookieName.label");
///<summary>&quot;The value to store in the cookie&quot;</summary> 
public static string Composite_Web_Response_SetCookieValue_param_Value_help=>T("Composite.Web.Response.SetCookieValue.param.Value.help");
///<summary>&quot;Cookie value&quot;</summary> 
public static string Composite_Web_Response_SetCookieValue_param_Value_label=>T("Composite.Web.Response.SetCookieValue.param.Value.label");
///<summary>&quot;When the cookie should expire (stop to exist). The default value is &apos;session&apos;, when the user closes the browser.&quot;</summary> 
public static string Composite_Web_Response_SetCookieValue_param_Expires_help=>T("Composite.Web.Response.SetCookieValue.param.Expires.help");
///<summary>&quot;Expiration&quot;</summary> 
public static string Composite_Web_Response_SetCookieValue_param_Expires_label=>T("Composite.Web.Response.SetCookieValue.param.Expires.label");
///<summary>&quot;Sets the maximum number of seconds the current page should be publicly cached on the server. To ensure that the page response is not cached set the &quot;Maximum seconds&quot; to &quot;0&quot;. If multiple sources set the server cache duration, the smallest number is used. Note that the file &quot;~/Renderers/Page.aspx&quot; contains a default value for cache duration – you can edit this file to change the default.&quot;</summary> 
public static string Composite_Web_Response_SetServerPageCacheDuration_description=>T("Composite.Web.Response.SetServerPageCacheDuration.description");
///<summary>&quot;The maximum number of seconds the page currently being rendered should be publicly cached. A high value yield good performance, a low value make changes show up faster. A value of &apos;0&apos; ensure that all visitors get a unique response.&quot;</summary> 
public static string Composite_Web_Response_SetServerPageCacheDuration_param_MaxSeconds_help=>T("Composite.Web.Response.SetServerPageCacheDuration.param.MaxSeconds.help");
///<summary>&quot;Maximum seconds&quot;</summary> 
public static string Composite_Web_Response_SetServerPageCacheDuration_param_MaxSeconds_label=>T("Composite.Web.Response.SetServerPageCacheDuration.param.MaxSeconds.label");
///<summary>&quot;Sets a session variable for the current user&quot;</summary> 
public static string Composite_Web_Response_SetSessionVariable_description=>T("Composite.Web.Response.SetSessionVariable.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Response_SetSessionVariable_param_Value_help=>T("Composite.Web.Response.SetSessionVariable.param.Value.help");
///<summary>&quot;Value&quot;</summary> 
public static string Composite_Web_Response_SetSessionVariable_param_Value_label=>T("Composite.Web.Response.SetSessionVariable.param.Value.label");
///<summary>&quot;The name of the session variable to set.&quot;</summary> 
public static string Composite_Web_Response_SetSessionVariable_param_VariableName_help=>T("Composite.Web.Response.SetSessionVariable.param.VariableName.help");
///<summary>&quot;Variable name&quot;</summary> 
public static string Composite_Web_Response_SetSessionVariable_param_VariableName_label=>T("Composite.Web.Response.SetSessionVariable.param.VariableName.label");
///<summary>&quot;Gets the web application virtual path. Typically this is &apos;&apos; - the empty string, when running in the website root, but if {applicationname} is running in a sub folder this can be &apos;/MySubfolder&apos;. You can use this value to prefix URL&apos;s so they will work no matter is {applicationname} is running is a subfolder or not. Sample XSLT usage: &lt;img src=&quot;{/in:inputs/in:result[@name=&apos;ApplicationPath&apos;]}/images/myImage.png&quot; /&gt;&quot;</summary> 
public static string Composite_Web_Server_ApplicationPath_description=>T("Composite.Web.Server.ApplicationPath.description");
///<summary>&quot;Gets an IIS application variable&quot;</summary> 
public static string Composite_Web_Server_ApplicationVariable_description=>T("Composite.Web.Server.ApplicationVariable.description");
///<summary>&quot;Value to use if the application variable was not located&quot;</summary> 
public static string Composite_Web_Server_ApplicationVariable_param_FallbackValue_help=>T("Composite.Web.Server.ApplicationVariable.param.FallbackValue.help");
///<summary>&quot;Fallback value&quot;</summary> 
public static string Composite_Web_Server_ApplicationVariable_param_FallbackValue_label=>T("Composite.Web.Server.ApplicationVariable.param.FallbackValue.label");
///<summary>&quot;&quot;</summary> 
public static string Composite_Web_Server_ApplicationVariable_param_VariableName_help=>T("Composite.Web.Server.ApplicationVariable.param.VariableName.help");
///<summary>&quot;Variable name&quot;</summary> 
public static string Composite_Web_Server_ApplicationVariable_param_VariableName_label=>T("Composite.Web.Server.ApplicationVariable.param.VariableName.label");
///<summary>&quot;Gets the value of an IIS Server variable&quot;</summary> 
public static string Composite_Web_Server_ServerVariable_description=>T("Composite.Web.Server.ServerVariable.description");
///<summary>&quot;The IIS Server variable to get.&quot;</summary> 
public static string Composite_Web_Server_ServerVariable_param_VariableName_help=>T("Composite.Web.Server.ServerVariable.param.VariableName.help");
///<summary>&quot;Variable name&quot;</summary> 
public static string Composite_Web_Server_ServerVariable_param_VariableName_label=>T("Composite.Web.Server.ServerVariable.param.VariableName.label");
///<summary>&quot;Loads a local XML file given a relative path&quot;</summary> 
public static string Composite_Xml_LoadFile_description=>T("Composite.Xml.LoadFile.description");
///<summary>&quot;The relative path of the XML file to load&quot;</summary> 
public static string Composite_Xml_LoadFile_param_RelativePath_help=>T("Composite.Xml.LoadFile.param.RelativePath.help");
///<summary>&quot;Relative path&quot;</summary> 
public static string Composite_Xml_LoadFile_param_RelativePath_label=>T("Composite.Xml.LoadFile.param.RelativePath.label");
///<summary>&quot;Loads a local XHTML file given a relative path&quot;</summary> 
public static string Composite_Xml_LoadXhtmlFile_description=>T("Composite.Xml.LoadXhtmlFile.description");
///<summary>&quot;The relative path of the XHTML file to load&quot;</summary> 
public static string Composite_Xml_LoadXhtmlFile_param_RelativePath_help=>T("Composite.Xml.LoadXhtmlFile.param.RelativePath.help");
///<summary>&quot;Relative path&quot;</summary> 
public static string Composite_Xml_LoadXhtmlFile_param_RelativePath_label=>T("Composite.Xml.LoadXhtmlFile.param.RelativePath.label");
///<summary>&quot;Loads a remote XML file given a Url&quot;</summary> 
public static string Composite_Xml_LoadUrl_description=>T("Composite.Xml.LoadUrl.description");
///<summary>&quot;&quot;</summary> 
public static string Composite_Xml_LoadUrl_param_Url_help=>T("Composite.Xml.LoadUrl.param.Url.help");
///<summary>&quot;Url&quot;</summary> 
public static string Composite_Xml_LoadUrl_param_Url_label=>T("Composite.Xml.LoadUrl.param.Url.label");
///<summary>&quot;Time period in seconds for which the result should is cached. Default is 0 (no caching).&quot;</summary> 
public static string Composite_Xml_LoadUrl_param_CacheTime_help=>T("Composite.Xml.LoadUrl.param.CacheTime.help");
///<summary>&quot;Seconds to cache&quot;</summary> 
public static string Composite_Xml_LoadUrl_param_CacheTime_label=>T("Composite.Xml.LoadUrl.param.CacheTime.label");
///<summary>&quot;Provides localized date formatting functions for XSLT use. &quot;</summary> 
public static string Composite_Xslt_Extensions_DateFormatting_description=>T("Composite.Xslt.Extensions.DateFormatting.description");
///<summary>&quot;Provides globalization functions for XSLT use.&quot;</summary> 
public static string Composite_Xslt_Extensions_Globalization_description=>T("Composite.Xslt.Extensions.Globalization.description");
///<summary>&quot;Provides functions that parse encoded XML documents or XHTML fragments into nodes. Use this extension when you have XML or XHTML as a string and need to copy it to the output or do transformations on it.&quot;</summary> 
public static string Composite_Xslt_Extensions_MarkupParser_description=>T("Composite.Xslt.Extensions.MarkupParser.description");
///<summary>&quot;Sends an e-mail. Remember to configure SMTP server connection in the web.config file.&quot;</summary> 
public static string Composite_Mail_SendMail_description=>T("Composite.Mail.SendMail.description");
///<summary>&quot;From&quot;</summary> 
public static string Composite_Mail_SendMail_param_From_label=>T("Composite.Mail.SendMail.param.From.label");
///<summary>&quot;Sender&apos;s address.&quot;</summary> 
public static string Composite_Mail_SendMail_param_From_help=>T("Composite.Mail.SendMail.param.From.help");
///<summary>&quot;To&quot;</summary> 
public static string Composite_Mail_SendMail_param_To_label=>T("Composite.Mail.SendMail.param.To.label");
///<summary>&quot;Recipient. A list of comma separated email addresses.&quot;</summary> 
public static string Composite_Mail_SendMail_param_To_help=>T("Composite.Mail.SendMail.param.To.help");
///<summary>&quot;Subject&quot;</summary> 
public static string Composite_Mail_SendMail_param_Subject_label=>T("Composite.Mail.SendMail.param.Subject.label");
///<summary>&quot;Email subject.&quot;</summary> 
public static string Composite_Mail_SendMail_param_Subject_help=>T("Composite.Mail.SendMail.param.Subject.help");
///<summary>&quot;Body&quot;</summary> 
public static string Composite_Mail_SendMail_param_Body_label=>T("Composite.Mail.SendMail.param.Body.label");
///<summary>&quot;Email body.&quot;</summary> 
public static string Composite_Mail_SendMail_param_Body_help=>T("Composite.Mail.SendMail.param.Body.help");
///<summary>&quot;IsHtml&quot;</summary> 
public static string Composite_Mail_SendMail_param_IsHtml_label=>T("Composite.Mail.SendMail.param.IsHtml.label");
///<summary>&quot;Defines whether email to be sent is an HTML email or a text email.&quot;</summary> 
public static string Composite_Mail_SendMail_param_IsHtml_help=>T("Composite.Mail.SendMail.param.IsHtml.help");
///<summary>&quot;CC&quot;</summary> 
public static string Composite_Mail_SendMail_param_CC_label=>T("Composite.Mail.SendMail.param.CC.label");
///<summary>&quot;Carbon Copy. A list of comma separated email addresses that are secondary recipients of a message.&quot;</summary> 
public static string Composite_Mail_SendMail_param_CC_help=>T("Composite.Mail.SendMail.param.CC.help");
///<summary>&quot;ReplyTo&quot;</summary> 
public static string Composite_Mail_SendMail_param_ReplyTo_label=>T("Composite.Mail.SendMail.param.ReplyTo.label");
///<summary>&quot;Address that should be used to reply to the message.&quot;</summary> 
public static string Composite_Mail_SendMail_param_ReplyTo_help=>T("Composite.Mail.SendMail.param.ReplyTo.help");
///<summary>&quot;BCC&quot;</summary> 
public static string Composite_Mail_SendMail_param_BCC_label=>T("Composite.Mail.SendMail.param.BCC.label");
///<summary>&quot;Blind Carbon Copy. A list of recipients which will receive a mail but their individual email addresses will be concealed from the complete list of recipients.&quot;</summary> 
public static string Composite_Mail_SendMail_param_BCC_help=>T("Composite.Mail.SendMail.param.BCC.help");
///<summary>&quot;Attachment&quot;</summary> 
public static string Composite_Mail_SendMail_param_Attachment_label=>T("Composite.Mail.SendMail.param.Attachment.label");
///<summary>&quot;List of attached files. \n     Format it the following [{name}=]{filepath}[,{mime-type] [ | .... ].  \n     File path can be either relative or absolute path f.e. &quot;C:\someimage.jpg&quot; or &quot;/coolpicture.jpg&quot;  \n     If file path starts with &quot;Composite/&quot;, it will be recognized as a path to Composite media, f.e. &apos;Composite/MediaArchive:someImage.gif&apos; \n      \n     Examples:  \n        /attachment.jpg \n       image.jpg=/attachment.jpg \n       image.jpg=/attachment.jpg,image/jpg \n       image1.jpg=/attachment1.jpg,image/jpg|image2.jpg=/attachment2.jpg,image/jpg&quot;</summary> 
public static string Composite_Mail_SendMail_param_Attachment_help=>T("Composite.Mail.SendMail.param.Attachment.help");
///<summary>&quot;AttachmentFromMedia&quot;</summary> 
public static string Composite_Mail_SendMail_param_AttachmentFromMedia_label=>T("Composite.Mail.SendMail.param.AttachmentFromMedia.label");
///<summary>&quot;A file from media library to be attached.&quot;</summary> 
public static string Composite_Mail_SendMail_param_AttachmentFromMedia_help=>T("Composite.Mail.SendMail.param.AttachmentFromMedia.help");
///<summary>&quot;Filters images by it&apos;s folder path&quot;</summary> 
public static string Composite_Data_Types_IImageFile_MediaFolderFilter_description=>T("Composite.Data.Types.IImageFile.MediaFolderFilter.description");
///<summary>&quot;Media Folder&quot;</summary> 
public static string Composite_Data_Types_IImageFile_MediaFolderFilter_param_MediaFolder_label=>T("Composite.Data.Types.IImageFile.MediaFolderFilter.param.MediaFolder.label");
///<summary>&quot;A reference to a media folder&quot;</summary> 
public static string Composite_Data_Types_IImageFile_MediaFolderFilter_param_MediaFolder_help=>T("Composite.Data.Types.IImageFile.MediaFolderFilter.param.MediaFolder.help");
///<summary>&quot;Include Subfolders&quot;</summary> 
public static string Composite_Data_Types_IImageFile_MediaFolderFilter_param_IncludeSubfolders_label=>T("Composite.Data.Types.IImageFile.MediaFolderFilter.param.IncludeSubfolders.label");
///<summary>&quot;Determines whether images from subfolders should be included.&quot;</summary> 
public static string Composite_Data_Types_IImageFile_MediaFolderFilter_param_IncludeSubfolders_help=>T("Composite.Data.Types.IImageFile.MediaFolderFilter.param.IncludeSubfolders.help");
///<summary>&quot;Filters images by it&apos;s folder path&quot;</summary> 
public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_description=>T("Composite.Data.Types.IMediaFile.MediaFolderFilter.description");
///<summary>&quot;Media Folder&quot;</summary> 
public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_param_MediaFolder_label=>T("Composite.Data.Types.IMediaFile.MediaFolderFilter.param.MediaFolder.label");
///<summary>&quot;A reference to a media folder&quot;</summary> 
public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_param_MediaFolder_help=>T("Composite.Data.Types.IMediaFile.MediaFolderFilter.param.MediaFolder.help");
///<summary>&quot;Include Subfolders&quot;</summary> 
public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_param_IncludeSubfolders_label=>T("Composite.Data.Types.IMediaFile.MediaFolderFilter.param.IncludeSubfolders.label");
///<summary>&quot;Determines whether media files from subfolders should be included.&quot;</summary> 
public static string Composite_Data_Types_IMediaFile_MediaFolderFilter_param_IncludeSubfolders_help=>T("Composite.Data.Types.IMediaFile.MediaFolderFilter.param.IncludeSubfolders.help");
///<summary>&quot;Converts an enumerable of XElements to a Dictionary using named attributes for keys and values.&quot;</summary> 
public static string Composite_Utils_Dictionary_XElementsToDictionary_description=>T("Composite.Utils.Dictionary.XElementsToDictionary.description");
///<summary>&quot;XElements&quot;</summary> 
public static string Composite_Utils_Dictionary_XElementsToDictionary_param_XElements_label=>T("Composite.Utils.Dictionary.XElementsToDictionary.param.XElements.label");
///<summary>&quot;An enumerable of XElements that will be used to create a dictionary from.&quot;</summary> 
public static string Composite_Utils_Dictionary_XElementsToDictionary_param_XElements_help=>T("Composite.Utils.Dictionary.XElementsToDictionary.param.XElements.help");
///<summary>&quot;Key Attribute Name&quot;</summary> 
public static string Composite_Utils_Dictionary_XElementsToDictionary_param_KeyAttributeName_label=>T("Composite.Utils.Dictionary.XElementsToDictionary.param.KeyAttributeName.label");
///<summary>&quot;The name of the attribute on each XElement which value will be used for keys in the dictionary.&quot;</summary> 
public static string Composite_Utils_Dictionary_XElementsToDictionary_param_KeyAttributeName_help=>T("Composite.Utils.Dictionary.XElementsToDictionary.param.KeyAttributeName.help");
///<summary>&quot;Value Attribute Name&quot;</summary> 
public static string Composite_Utils_Dictionary_XElementsToDictionary_param_ValueAttributeName_label=>T("Composite.Utils.Dictionary.XElementsToDictionary.param.ValueAttributeName.label");
///<summary>&quot;The name of the attribute on each XElement which value will be used for values in the dictionary.&quot;</summary> 
public static string Composite_Utils_Dictionary_XElementsToDictionary_param_ValueAttributeName_help=>T("Composite.Utils.Dictionary.XElementsToDictionary.param.ValueAttributeName.help");
///<summary>&quot;Converts an enumerable of objects to a Dictionary using named property names for keys and values.&quot;</summary> 
public static string Composite_Utils_Dictionary_EnumerableToDictionary_description=>T("Composite.Utils.Dictionary.EnumerableToDictionary.description");
///<summary>&quot;Objects&quot;</summary> 
public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_Elements_label=>T("Composite.Utils.Dictionary.EnumerableToDictionary.param.Elements.label");
///<summary>&quot;An enumerable of objects that will be used to create a dictionary from.&quot;</summary> 
public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_Elements_help=>T("Composite.Utils.Dictionary.EnumerableToDictionary.param.Elements.help");
///<summary>&quot;Key Property Name&quot;</summary> 
public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_KeyPropertyName_label=>T("Composite.Utils.Dictionary.EnumerableToDictionary.param.KeyPropertyName.label");
///<summary>&quot;The name of the property on each object which value will be used for keys in the dictionary.&quot;</summary> 
public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_KeyPropertyName_help=>T("Composite.Utils.Dictionary.EnumerableToDictionary.param.KeyPropertyName.help");
///<summary>&quot;Value Property Name&quot;</summary> 
public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_ValuePropertyName_label=>T("Composite.Utils.Dictionary.EnumerableToDictionary.param.ValuePropertyName.label");
///<summary>&quot;The name of the property on each object which value will be used for values in the dictionary.&quot;</summary> 
public static string Composite_Utils_Dictionary_EnumerableToDictionary_param_ValuePropertyName_help=>T("Composite.Utils.Dictionary.EnumerableToDictionary.param.ValuePropertyName.help");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.StandardFunctions", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_TimezoneAbbriviations {
///<summary>&quot;Etc/GMT+12&quot;</summary> 
public static string TimezoneAbbriviations_Dateline_Standard_Time=>T("TimezoneAbbriviations.Dateline Standard Time");
///<summary>&quot;Etc/GMT+11&quot;</summary> 
public static string TimezoneAbbriviations_UTC_11=>T("TimezoneAbbriviations.UTC-11");
///<summary>&quot;UTC-10&quot;</summary> 
public static string TimezoneAbbriviations_Aleutian_Standard_Time=>T("TimezoneAbbriviations.Aleutian Standard Time");
///<summary>&quot;HST&quot;</summary> 
public static string TimezoneAbbriviations_Hawaiian_Standard_Time=>T("TimezoneAbbriviations.Hawaiian Standard Time");
///<summary>&quot;MART&quot;</summary> 
public static string TimezoneAbbriviations_Marquesas_Standard_Time=>T("TimezoneAbbriviations.Marquesas Standard Time");
///<summary>&quot;AKST&quot;</summary> 
public static string TimezoneAbbriviations_Alaskan_Standard_Time=>T("TimezoneAbbriviations.Alaskan Standard Time");
///<summary>&quot;UTC-09&quot;</summary> 
public static string TimezoneAbbriviations_UTC_09=>T("TimezoneAbbriviations.UTC-09");
///<summary>&quot;PST&quot;</summary> 
public static string TimezoneAbbriviations_Pacific_Standard_Time_Mexico=>T("TimezoneAbbriviations.Pacific Standard Time (Mexico)");
///<summary>&quot;UTC-08&quot;</summary> 
public static string TimezoneAbbriviations_UTC_08=>T("TimezoneAbbriviations.UTC-08");
///<summary>&quot;PST&quot;</summary> 
public static string TimezoneAbbriviations_Pacific_Standard_Time=>T("TimezoneAbbriviations.Pacific Standard Time");
///<summary>&quot;MST&quot;</summary> 
public static string TimezoneAbbriviations_US_Mountain_Standard_Time=>T("TimezoneAbbriviations.US Mountain Standard Time");
///<summary>&quot;MST&quot;</summary> 
public static string TimezoneAbbriviations_Mountain_Standard_Time_Mexico=>T("TimezoneAbbriviations.Mountain Standard Time (Mexico)");
///<summary>&quot;MST&quot;</summary> 
public static string TimezoneAbbriviations_Mountain_Standard_Time=>T("TimezoneAbbriviations.Mountain Standard Time");
///<summary>&quot;CST&quot;</summary> 
public static string TimezoneAbbriviations_Central_America_Standard_Time=>T("TimezoneAbbriviations.Central America Standard Time");
///<summary>&quot;CST&quot;</summary> 
public static string TimezoneAbbriviations_Central_Standard_Time=>T("TimezoneAbbriviations.Central Standard Time");
///<summary>&quot;EASST&quot;</summary> 
public static string TimezoneAbbriviations_Easter_Island_Standard_Time=>T("TimezoneAbbriviations.Easter Island Standard Time");
///<summary>&quot;CST&quot;</summary> 
public static string TimezoneAbbriviations_Central_Standard_Time_Mexico=>T("TimezoneAbbriviations.Central Standard Time (Mexico)");
///<summary>&quot;CST&quot;</summary> 
public static string TimezoneAbbriviations_Canada_Central_Standard_Time=>T("TimezoneAbbriviations.Canada Central Standard Time");
///<summary>&quot;SAPST&quot;</summary> 
public static string TimezoneAbbriviations_SA_Pacific_Standard_Time=>T("TimezoneAbbriviations.SA Pacific Standard Time");
///<summary>&quot;EST&quot;</summary> 
public static string TimezoneAbbriviations_Eastern_Standard_Time_Mexico=>T("TimezoneAbbriviations.Eastern Standard Time (Mexico)");
///<summary>&quot;EST&quot;</summary> 
public static string TimezoneAbbriviations_Eastern_Standard_Time=>T("TimezoneAbbriviations.Eastern Standard Time");
///<summary>&quot;EST&quot;</summary> 
public static string TimezoneAbbriviations_Haiti_Standard_Time=>T("TimezoneAbbriviations.Haiti Standard Time");
///<summary>&quot;UTC-05&quot;</summary> 
public static string TimezoneAbbriviations_Cuba_Standard_Time=>T("TimezoneAbbriviations.Cuba Standard Time");
///<summary>&quot;EST&quot;</summary> 
public static string TimezoneAbbriviations_US_Eastern_Standard_Time=>T("TimezoneAbbriviations.US Eastern Standard Time");
///<summary>&quot;VET&quot;</summary> 
public static string TimezoneAbbriviations_Venezuela_Standard_Time=>T("TimezoneAbbriviations.Venezuela Standard Time");
///<summary>&quot;PYST&quot;</summary> 
public static string TimezoneAbbriviations_Paraguay_Standard_Time=>T("TimezoneAbbriviations.Paraguay Standard Time");
///<summary>&quot;AST&quot;</summary> 
public static string TimezoneAbbriviations_Atlantic_Standard_Time=>T("TimezoneAbbriviations.Atlantic Standard Time");
///<summary>&quot;AMST&quot;</summary> 
public static string TimezoneAbbriviations_Central_Brazilian_Standard_Time=>T("TimezoneAbbriviations.Central Brazilian Standard Time");
///<summary>&quot;SAWST&quot;</summary> 
public static string TimezoneAbbriviations_SA_Western_Standard_Time=>T("TimezoneAbbriviations.SA Western Standard Time");
///<summary>&quot;CLST&quot;</summary> 
public static string TimezoneAbbriviations_Pacific_SA_Standard_Time=>T("TimezoneAbbriviations.Pacific SA Standard Time");
///<summary>&quot;UTC-04&quot;</summary> 
public static string TimezoneAbbriviations_Turks_And_Caicos_Standard_Time=>T("TimezoneAbbriviations.Turks And Caicos Standard Time");
///<summary>&quot;NST&quot;</summary> 
public static string TimezoneAbbriviations_Newfoundland_Standard_Time=>T("TimezoneAbbriviations.Newfoundland Standard Time");
///<summary>&quot;UTC-03&quot;</summary> 
public static string TimezoneAbbriviations_Tocantins_Standard_Time=>T("TimezoneAbbriviations.Tocantins Standard Time");
///<summary>&quot;BRST&quot;</summary> 
public static string TimezoneAbbriviations_E__South_America_Standard_Time=>T("TimezoneAbbriviations.E. South America Standard Time");
///<summary>&quot;GFT&quot;</summary> 
public static string TimezoneAbbriviations_SA_Eastern_Standard_Time=>T("TimezoneAbbriviations.SA Eastern Standard Time");
///<summary>&quot;ART&quot;</summary> 
public static string TimezoneAbbriviations_Argentina_Standard_Time=>T("TimezoneAbbriviations.Argentina Standard Time");
///<summary>&quot;WGT&quot;</summary> 
public static string TimezoneAbbriviations_Greenland_Standard_Time=>T("TimezoneAbbriviations.Greenland Standard Time");
///<summary>&quot;UYT&quot;</summary> 
public static string TimezoneAbbriviations_Montevideo_Standard_Time=>T("TimezoneAbbriviations.Montevideo Standard Time");
///<summary>&quot;UTC-03&quot;</summary> 
public static string TimezoneAbbriviations_Saint_Pierre_Standard_Time=>T("TimezoneAbbriviations.Saint Pierre Standard Time");
///<summary>&quot;BRT&quot;</summary> 
public static string TimezoneAbbriviations_Bahia_Standard_Time=>T("TimezoneAbbriviations.Bahia Standard Time");
///<summary>&quot;Etc/GMT+2&quot;</summary> 
public static string TimezoneAbbriviations_UTC_02=>T("TimezoneAbbriviations.UTC-02");
///<summary>&quot;AST&quot;</summary> 
public static string TimezoneAbbriviations_Mid_Atlantic_Standard_Time=>T("TimezoneAbbriviations.Mid-Atlantic Standard Time");
///<summary>&quot;AZOT&quot;</summary> 
public static string TimezoneAbbriviations_Azores_Standard_Time=>T("TimezoneAbbriviations.Azores Standard Time");
///<summary>&quot;CVT&quot;</summary> 
public static string TimezoneAbbriviations_Cape_Verde_Standard_Time=>T("TimezoneAbbriviations.Cape Verde Standard Time");
///<summary>&quot;WET&quot;</summary> 
public static string TimezoneAbbriviations_Morocco_Standard_Time=>T("TimezoneAbbriviations.Morocco Standard Time");
///<summary>&quot;Etc/GMT&quot;</summary> 
public static string TimezoneAbbriviations_UTC=>T("TimezoneAbbriviations.UTC");
///<summary>&quot;GMT&quot;</summary> 
public static string TimezoneAbbriviations_GMT_Standard_Time=>T("TimezoneAbbriviations.GMT Standard Time");
///<summary>&quot;GMT&quot;</summary> 
public static string TimezoneAbbriviations_Greenwich_Standard_Time=>T("TimezoneAbbriviations.Greenwich Standard Time");
///<summary>&quot;CET&quot;</summary> 
public static string TimezoneAbbriviations_W__Europe_Standard_Time=>T("TimezoneAbbriviations.W. Europe Standard Time");
///<summary>&quot;CET&quot;</summary> 
public static string TimezoneAbbriviations_Central_Europe_Standard_Time=>T("TimezoneAbbriviations.Central Europe Standard Time");
///<summary>&quot;CET&quot;</summary> 
public static string TimezoneAbbriviations_Romance_Standard_Time=>T("TimezoneAbbriviations.Romance Standard Time");
///<summary>&quot;CET&quot;</summary> 
public static string TimezoneAbbriviations_Central_European_Standard_Time=>T("TimezoneAbbriviations.Central European Standard Time");
///<summary>&quot;WAT&quot;</summary> 
public static string TimezoneAbbriviations_W__Central_Africa_Standard_Time=>T("TimezoneAbbriviations.W. Central Africa Standard Time");
///<summary>&quot;WAST&quot;</summary> 
public static string TimezoneAbbriviations_Namibia_Standard_Time=>T("TimezoneAbbriviations.Namibia Standard Time");
///<summary>&quot;EET&quot;</summary> 
public static string TimezoneAbbriviations_Jordan_Standard_Time=>T("TimezoneAbbriviations.Jordan Standard Time");
///<summary>&quot;EET&quot;</summary> 
public static string TimezoneAbbriviations_GTB_Standard_Time=>T("TimezoneAbbriviations.GTB Standard Time");
///<summary>&quot;EET&quot;</summary> 
public static string TimezoneAbbriviations_Middle_East_Standard_Time=>T("TimezoneAbbriviations.Middle East Standard Time");
///<summary>&quot;EET&quot;</summary> 
public static string TimezoneAbbriviations_Egypt_Standard_Time=>T("TimezoneAbbriviations.Egypt Standard Time");
///<summary>&quot;EET&quot;</summary> 
public static string TimezoneAbbriviations_Syria_Standard_Time=>T("TimezoneAbbriviations.Syria Standard Time");
///<summary>&quot;EET&quot;</summary> 
public static string TimezoneAbbriviations_E__Europe_Standard_Time=>T("TimezoneAbbriviations.E. Europe Standard Time");
///<summary>&quot;UTC+02&quot;</summary> 
public static string TimezoneAbbriviations_West_Bank_Standard_Time=>T("TimezoneAbbriviations.West Bank Standard Time");
///<summary>&quot;SAST&quot;</summary> 
public static string TimezoneAbbriviations_South_Africa_Standard_Time=>T("TimezoneAbbriviations.South Africa Standard Time");
///<summary>&quot;EET&quot;</summary> 
public static string TimezoneAbbriviations_FLE_Standard_Time=>T("TimezoneAbbriviations.FLE Standard Time");
///<summary>&quot;EET&quot;</summary> 
public static string TimezoneAbbriviations_Turkey_Standard_Time=>T("TimezoneAbbriviations.Turkey Standard Time");
///<summary>&quot;IST&quot;</summary> 
public static string TimezoneAbbriviations_Israel_Standard_Time=>T("TimezoneAbbriviations.Israel Standard Time");
///<summary>&quot;EET&quot;</summary> 
public static string TimezoneAbbriviations_Kaliningrad_Standard_Time=>T("TimezoneAbbriviations.Kaliningrad Standard Time");
///<summary>&quot;EET&quot;</summary> 
public static string TimezoneAbbriviations_Libya_Standard_Time=>T("TimezoneAbbriviations.Libya Standard Time");
///<summary>&quot;AST&quot;</summary> 
public static string TimezoneAbbriviations_Arabic_Standard_Time=>T("TimezoneAbbriviations.Arabic Standard Time");
///<summary>&quot;AST&quot;</summary> 
public static string TimezoneAbbriviations_Arab_Standard_Time=>T("TimezoneAbbriviations.Arab Standard Time");
///<summary>&quot;MSK&quot;</summary> 
public static string TimezoneAbbriviations_Belarus_Standard_Time=>T("TimezoneAbbriviations.Belarus Standard Time");
///<summary>&quot;MSK&quot;</summary> 
public static string TimezoneAbbriviations_Russian_Standard_Time=>T("TimezoneAbbriviations.Russian Standard Time");
///<summary>&quot;EAT&quot;</summary> 
public static string TimezoneAbbriviations_E__Africa_Standard_Time=>T("TimezoneAbbriviations.E. Africa Standard Time");
///<summary>&quot;MSK&quot;</summary> 
public static string TimezoneAbbriviations_Astrakhan_Standard_Time=>T("TimezoneAbbriviations.Astrakhan Standard Time");
///<summary>&quot;IRST&quot;</summary> 
public static string TimezoneAbbriviations_Iran_Standard_Time=>T("TimezoneAbbriviations.Iran Standard Time");
///<summary>&quot;GST&quot;</summary> 
public static string TimezoneAbbriviations_Arabian_Standard_Time=>T("TimezoneAbbriviations.Arabian Standard Time");
///<summary>&quot;AZT&quot;</summary> 
public static string TimezoneAbbriviations_Azerbaijan_Standard_Time=>T("TimezoneAbbriviations.Azerbaijan Standard Time");
///<summary>&quot;SAMT&quot;</summary> 
public static string TimezoneAbbriviations_Russia_Time_Zone_3=>T("TimezoneAbbriviations.Russia Time Zone 3");
///<summary>&quot;MUT&quot;</summary> 
public static string TimezoneAbbriviations_Mauritius_Standard_Time=>T("TimezoneAbbriviations.Mauritius Standard Time");
///<summary>&quot;GET&quot;</summary> 
public static string TimezoneAbbriviations_Georgian_Standard_Time=>T("TimezoneAbbriviations.Georgian Standard Time");
///<summary>&quot;AMT&quot;</summary> 
public static string TimezoneAbbriviations_Caucasus_Standard_Time=>T("TimezoneAbbriviations.Caucasus Standard Time");
///<summary>&quot;AFT&quot;</summary> 
public static string TimezoneAbbriviations_Afghanistan_Standard_Time=>T("TimezoneAbbriviations.Afghanistan Standard Time");
///<summary>&quot;UZT&quot;</summary> 
public static string TimezoneAbbriviations_West_Asia_Standard_Time=>T("TimezoneAbbriviations.West Asia Standard Time");
///<summary>&quot;YEKT&quot;</summary> 
public static string TimezoneAbbriviations_Ekaterinburg_Standard_Time=>T("TimezoneAbbriviations.Ekaterinburg Standard Time");
///<summary>&quot;PKT&quot;</summary> 
public static string TimezoneAbbriviations_Pakistan_Standard_Time=>T("TimezoneAbbriviations.Pakistan Standard Time");
///<summary>&quot;IST&quot;</summary> 
public static string TimezoneAbbriviations_India_Standard_Time=>T("TimezoneAbbriviations.India Standard Time");
///<summary>&quot;IST&quot;</summary> 
public static string TimezoneAbbriviations_Sri_Lanka_Standard_Time=>T("TimezoneAbbriviations.Sri Lanka Standard Time");
///<summary>&quot;NPT&quot;</summary> 
public static string TimezoneAbbriviations_Nepal_Standard_Time=>T("TimezoneAbbriviations.Nepal Standard Time");
///<summary>&quot;ALMT&quot;</summary> 
public static string TimezoneAbbriviations_Central_Asia_Standard_Time=>T("TimezoneAbbriviations.Central Asia Standard Time");
///<summary>&quot;BDT&quot;</summary> 
public static string TimezoneAbbriviations_Bangladesh_Standard_Time=>T("TimezoneAbbriviations.Bangladesh Standard Time");
///<summary>&quot;NOVT&quot;</summary> 
public static string TimezoneAbbriviations_N__Central_Asia_Standard_Time=>T("TimezoneAbbriviations.N. Central Asia Standard Time");
///<summary>&quot;MSK+3&quot;</summary> 
public static string TimezoneAbbriviations_Altai_Standard_Time=>T("TimezoneAbbriviations.Altai Standard Time");
///<summary>&quot;MMT&quot;</summary> 
public static string TimezoneAbbriviations_Myanmar_Standard_Time=>T("TimezoneAbbriviations.Myanmar Standard Time");
///<summary>&quot;ICT&quot;</summary> 
public static string TimezoneAbbriviations_SE_Asia_Standard_Time=>T("TimezoneAbbriviations.SE Asia Standard Time");
///<summary>&quot;UTC+07&quot;</summary> 
public static string TimezoneAbbriviations_W__Mongolia_Standard_Time=>T("TimezoneAbbriviations.W. Mongolia Standard Time");
///<summary>&quot;KRAT&quot;</summary> 
public static string TimezoneAbbriviations_North_Asia_Standard_Time=>T("TimezoneAbbriviations.North Asia Standard Time");
///<summary>&quot;UTC+07&quot;</summary> 
public static string TimezoneAbbriviations_Tomsk_Standard_Time=>T("TimezoneAbbriviations.Tomsk Standard Time");
///<summary>&quot;CST&quot;</summary> 
public static string TimezoneAbbriviations_China_Standard_Time=>T("TimezoneAbbriviations.China Standard Time");
///<summary>&quot;IRKT&quot;</summary> 
public static string TimezoneAbbriviations_North_Asia_East_Standard_Time=>T("TimezoneAbbriviations.North Asia East Standard Time");
///<summary>&quot;SGT&quot;</summary> 
public static string TimezoneAbbriviations_Singapore_Standard_Time=>T("TimezoneAbbriviations.Singapore Standard Time");
///<summary>&quot;AWST&quot;</summary> 
public static string TimezoneAbbriviations_W__Australia_Standard_Time=>T("TimezoneAbbriviations.W. Australia Standard Time");
///<summary>&quot;CST&quot;</summary> 
public static string TimezoneAbbriviations_Taipei_Standard_Time=>T("TimezoneAbbriviations.Taipei Standard Time");
///<summary>&quot;ULAT&quot;</summary> 
public static string TimezoneAbbriviations_Ulaanbaatar_Standard_Time=>T("TimezoneAbbriviations.Ulaanbaatar Standard Time");
///<summary>&quot;KST&quot;</summary> 
public static string TimezoneAbbriviations_North_Korea_Standard_Time=>T("TimezoneAbbriviations.North Korea Standard Time");
///<summary>&quot;UTC+09&quot;</summary> 
public static string TimezoneAbbriviations_Transbaikal_Standard_Time=>T("TimezoneAbbriviations.Transbaikal Standard Time");
///<summary>&quot;JST&quot;</summary> 
public static string TimezoneAbbriviations_Tokyo_Standard_Time=>T("TimezoneAbbriviations.Tokyo Standard Time");
///<summary>&quot;KST&quot;</summary> 
public static string TimezoneAbbriviations_Korea_Standard_Time=>T("TimezoneAbbriviations.Korea Standard Time");
///<summary>&quot;YAKT&quot;</summary> 
public static string TimezoneAbbriviations_Yakutsk_Standard_Time=>T("TimezoneAbbriviations.Yakutsk Standard Time");
///<summary>&quot;ACDT&quot;</summary> 
public static string TimezoneAbbriviations_Cen__Australia_Standard_Time=>T("TimezoneAbbriviations.Cen. Australia Standard Time");
///<summary>&quot;ACST&quot;</summary> 
public static string TimezoneAbbriviations_AUS_Central_Standard_Time=>T("TimezoneAbbriviations.AUS Central Standard Time");
///<summary>&quot;AEST&quot;</summary> 
public static string TimezoneAbbriviations_E__Australia_Standard_Time=>T("TimezoneAbbriviations.E. Australia Standard Time");
///<summary>&quot;AEDT&quot;</summary> 
public static string TimezoneAbbriviations_AUS_Eastern_Standard_Time=>T("TimezoneAbbriviations.AUS Eastern Standard Time");
///<summary>&quot;PGT&quot;</summary> 
public static string TimezoneAbbriviations_West_Pacific_Standard_Time=>T("TimezoneAbbriviations.West Pacific Standard Time");
///<summary>&quot;AEDT&quot;</summary> 
public static string TimezoneAbbriviations_Tasmania_Standard_Time=>T("TimezoneAbbriviations.Tasmania Standard Time");
///<summary>&quot;MAGT&quot;</summary> 
public static string TimezoneAbbriviations_Magadan_Standard_Time=>T("TimezoneAbbriviations.Magadan Standard Time");
///<summary>&quot;VLAT&quot;</summary> 
public static string TimezoneAbbriviations_Vladivostok_Standard_Time=>T("TimezoneAbbriviations.Vladivostok Standard Time");
///<summary>&quot;SRET&quot;</summary> 
public static string TimezoneAbbriviations_Russia_Time_Zone_10=>T("TimezoneAbbriviations.Russia Time Zone 10");
///<summary>&quot;UTC+11&quot;</summary> 
public static string TimezoneAbbriviations_Norfolk_Standard_Time=>T("TimezoneAbbriviations.Norfolk Standard Time");
///<summary>&quot;UTC+11&quot;</summary> 
public static string TimezoneAbbriviations_Sakhalin_Standard_Time=>T("TimezoneAbbriviations.Sakhalin Standard Time");
///<summary>&quot;SBT&quot;</summary> 
public static string TimezoneAbbriviations_Central_Pacific_Standard_Time=>T("TimezoneAbbriviations.Central Pacific Standard Time");
///<summary>&quot;PETT&quot;</summary> 
public static string TimezoneAbbriviations_Russia_Time_Zone_11=>T("TimezoneAbbriviations.Russia Time Zone 11");
///<summary>&quot;NZDT&quot;</summary> 
public static string TimezoneAbbriviations_New_Zealand_Standard_Time=>T("TimezoneAbbriviations.New Zealand Standard Time");
///<summary>&quot;Etc/GMT-12&quot;</summary> 
public static string TimezoneAbbriviations_UTC12=>T("TimezoneAbbriviations.UTC+12");
///<summary>&quot;FJST&quot;</summary> 
public static string TimezoneAbbriviations_Fiji_Standard_Time=>T("TimezoneAbbriviations.Fiji Standard Time");
///<summary>&quot;PETT&quot;</summary> 
public static string TimezoneAbbriviations_Kamchatka_Standard_Time=>T("TimezoneAbbriviations.Kamchatka Standard Time");
///<summary>&quot;CHAST&quot;</summary> 
public static string TimezoneAbbriviations_Chatham_Islands_Standard_Time=>T("TimezoneAbbriviations.Chatham Islands Standard Time");
///<summary>&quot;TOT&quot;</summary> 
public static string TimezoneAbbriviations_Tonga_Standard_Time=>T("TimezoneAbbriviations.Tonga Standard Time");
///<summary>&quot;WSDT&quot;</summary> 
public static string TimezoneAbbriviations_Samoa_Standard_Time=>T("TimezoneAbbriviations.Samoa Standard Time");
///<summary>&quot;LINT&quot;</summary> 
public static string TimezoneAbbriviations_Line_Islands_Standard_Time=>T("TimezoneAbbriviations.Line Islands Standard Time");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.TimezoneAbbriviations", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_TimezoneDisplayNames {
///<summary>&quot;(UTC-12:00) International Date Line West&quot;</summary> 
public static string TimezoneDisplayName_Dateline_Standard_Time=>T("TimezoneDisplayName.Dateline Standard Time");
///<summary>&quot;(UTC-11:00) Coordinated Universal Time-11&quot;</summary> 
public static string TimezoneDisplayName_UTC_11=>T("TimezoneDisplayName.UTC-11");
///<summary>&quot;(UTC-10:00) Aleutian Islands&quot;</summary> 
public static string TimezoneDisplayName_Aleutian_Standard_Time=>T("TimezoneDisplayName.Aleutian Standard Time");
///<summary>&quot;(UTC-10:00) Hawaii&quot;</summary> 
public static string TimezoneDisplayName_Hawaiian_Standard_Time=>T("TimezoneDisplayName.Hawaiian Standard Time");
///<summary>&quot;(UTC-09:30) Marquesas Islands&quot;</summary> 
public static string TimezoneDisplayName_Marquesas_Standard_Time=>T("TimezoneDisplayName.Marquesas Standard Time");
///<summary>&quot;(UTC-09:00) Alaska&quot;</summary> 
public static string TimezoneDisplayName_Alaskan_Standard_Time=>T("TimezoneDisplayName.Alaskan Standard Time");
///<summary>&quot;(UTC-09:00) Coordinated Universal Time-09&quot;</summary> 
public static string TimezoneDisplayName_UTC_09=>T("TimezoneDisplayName.UTC-09");
///<summary>&quot;(UTC-08:00) Baja California&quot;</summary> 
public static string TimezoneDisplayName_Pacific_Standard_Time_Mexico=>T("TimezoneDisplayName.Pacific Standard Time (Mexico)");
///<summary>&quot;(UTC-08:00) Coordinated Universal Time-08&quot;</summary> 
public static string TimezoneDisplayName_UTC_08=>T("TimezoneDisplayName.UTC-08");
///<summary>&quot;(UTC-08:00) Pacific Time (US &amp; Canada)&quot;</summary> 
public static string TimezoneDisplayName_Pacific_Standard_Time=>T("TimezoneDisplayName.Pacific Standard Time");
///<summary>&quot;(UTC-07:00) Arizona&quot;</summary> 
public static string TimezoneDisplayName_US_Mountain_Standard_Time=>T("TimezoneDisplayName.US Mountain Standard Time");
///<summary>&quot;(UTC-07:00) Chihuahua, La Paz, Mazatlan&quot;</summary> 
public static string TimezoneDisplayName_Mountain_Standard_Time_Mexico=>T("TimezoneDisplayName.Mountain Standard Time (Mexico)");
///<summary>&quot;(UTC-07:00) Mountain Time (US &amp; Canada)&quot;</summary> 
public static string TimezoneDisplayName_Mountain_Standard_Time=>T("TimezoneDisplayName.Mountain Standard Time");
///<summary>&quot;(UTC-06:00) Central America&quot;</summary> 
public static string TimezoneDisplayName_Central_America_Standard_Time=>T("TimezoneDisplayName.Central America Standard Time");
///<summary>&quot;(UTC-06:00) Central Time (US &amp; Canada)&quot;</summary> 
public static string TimezoneDisplayName_Central_Standard_Time=>T("TimezoneDisplayName.Central Standard Time");
///<summary>&quot;(UTC-06:00) Easter Island&quot;</summary> 
public static string TimezoneDisplayName_Easter_Island_Standard_Time=>T("TimezoneDisplayName.Easter Island Standard Time");
///<summary>&quot;(UTC-06:00) Guadalajara, Mexico City, Monterrey&quot;</summary> 
public static string TimezoneDisplayName_Central_Standard_Time_Mexico=>T("TimezoneDisplayName.Central Standard Time (Mexico)");
///<summary>&quot;(UTC-06:00) Saskatchewan&quot;</summary> 
public static string TimezoneDisplayName_Canada_Central_Standard_Time=>T("TimezoneDisplayName.Canada Central Standard Time");
///<summary>&quot;(UTC-05:00) Bogota, Lima, Quito, Rio Branco&quot;</summary> 
public static string TimezoneDisplayName_SA_Pacific_Standard_Time=>T("TimezoneDisplayName.SA Pacific Standard Time");
///<summary>&quot;(UTC-05:00) Chetumal&quot;</summary> 
public static string TimezoneDisplayName_Eastern_Standard_Time_Mexico=>T("TimezoneDisplayName.Eastern Standard Time (Mexico)");
///<summary>&quot;(UTC-05:00) Eastern Time (US &amp; Canada)&quot;</summary> 
public static string TimezoneDisplayName_Eastern_Standard_Time=>T("TimezoneDisplayName.Eastern Standard Time");
///<summary>&quot;(UTC-05:00) Haiti&quot;</summary> 
public static string TimezoneDisplayName_Haiti_Standard_Time=>T("TimezoneDisplayName.Haiti Standard Time");
///<summary>&quot;(UTC-05:00) Havana&quot;</summary> 
public static string TimezoneDisplayName_Cuba_Standard_Time=>T("TimezoneDisplayName.Cuba Standard Time");
///<summary>&quot;(UTC-05:00) Indiana (East)&quot;</summary> 
public static string TimezoneDisplayName_US_Eastern_Standard_Time=>T("TimezoneDisplayName.US Eastern Standard Time");
///<summary>&quot;(UTC-04:00) Asuncion&quot;</summary> 
public static string TimezoneDisplayName_Paraguay_Standard_Time=>T("TimezoneDisplayName.Paraguay Standard Time");
///<summary>&quot;(UTC-04:00) Atlantic Time (Canada)&quot;</summary> 
public static string TimezoneDisplayName_Atlantic_Standard_Time=>T("TimezoneDisplayName.Atlantic Standard Time");
///<summary>&quot;(UTC-04:00) Caracas&quot;</summary> 
public static string TimezoneDisplayName_Venezuela_Standard_Time=>T("TimezoneDisplayName.Venezuela Standard Time");
///<summary>&quot;(UTC-04:00) Cuiaba&quot;</summary> 
public static string TimezoneDisplayName_Central_Brazilian_Standard_Time=>T("TimezoneDisplayName.Central Brazilian Standard Time");
///<summary>&quot;(UTC-04:00) Georgetown, La Paz, Manaus, San Juan&quot;</summary> 
public static string TimezoneDisplayName_SA_Western_Standard_Time=>T("TimezoneDisplayName.SA Western Standard Time");
///<summary>&quot;(UTC-04:00) Santiago&quot;</summary> 
public static string TimezoneDisplayName_Pacific_SA_Standard_Time=>T("TimezoneDisplayName.Pacific SA Standard Time");
///<summary>&quot;(UTC-04:00) Turks and Caicos&quot;</summary> 
public static string TimezoneDisplayName_Turks_And_Caicos_Standard_Time=>T("TimezoneDisplayName.Turks And Caicos Standard Time");
///<summary>&quot;(UTC-03:30) Newfoundland&quot;</summary> 
public static string TimezoneDisplayName_Newfoundland_Standard_Time=>T("TimezoneDisplayName.Newfoundland Standard Time");
///<summary>&quot;(UTC-03:00) Araguaina&quot;</summary> 
public static string TimezoneDisplayName_Tocantins_Standard_Time=>T("TimezoneDisplayName.Tocantins Standard Time");
///<summary>&quot;(UTC-03:00) Brasilia&quot;</summary> 
public static string TimezoneDisplayName_E__South_America_Standard_Time=>T("TimezoneDisplayName.E. South America Standard Time");
///<summary>&quot;(UTC-03:00) Cayenne, Fortaleza&quot;</summary> 
public static string TimezoneDisplayName_SA_Eastern_Standard_Time=>T("TimezoneDisplayName.SA Eastern Standard Time");
///<summary>&quot;(UTC-03:00) City of Buenos Aires&quot;</summary> 
public static string TimezoneDisplayName_Argentina_Standard_Time=>T("TimezoneDisplayName.Argentina Standard Time");
///<summary>&quot;(UTC-03:00) Greenland&quot;</summary> 
public static string TimezoneDisplayName_Greenland_Standard_Time=>T("TimezoneDisplayName.Greenland Standard Time");
///<summary>&quot;(UTC-03:00) Montevideo&quot;</summary> 
public static string TimezoneDisplayName_Montevideo_Standard_Time=>T("TimezoneDisplayName.Montevideo Standard Time");
///<summary>&quot;(UTC-03:00) Saint Pierre and Miquelon&quot;</summary> 
public static string TimezoneDisplayName_Saint_Pierre_Standard_Time=>T("TimezoneDisplayName.Saint Pierre Standard Time");
///<summary>&quot;(UTC-03:00) Salvador&quot;</summary> 
public static string TimezoneDisplayName_Bahia_Standard_Time=>T("TimezoneDisplayName.Bahia Standard Time");
///<summary>&quot;(UTC-02:00) Coordinated Universal Time-02&quot;</summary> 
public static string TimezoneDisplayName_UTC_02=>T("TimezoneDisplayName.UTC-02");
///<summary>&quot;(UTC-02:00) Mid-Atlantic - Old&quot;</summary> 
public static string TimezoneDisplayName_Mid_Atlantic_Standard_Time=>T("TimezoneDisplayName.Mid-Atlantic Standard Time");
///<summary>&quot;(UTC-01:00) Azores&quot;</summary> 
public static string TimezoneDisplayName_Azores_Standard_Time=>T("TimezoneDisplayName.Azores Standard Time");
///<summary>&quot;(UTC-01:00) Cabo Verde Is.&quot;</summary> 
public static string TimezoneDisplayName_Cape_Verde_Standard_Time=>T("TimezoneDisplayName.Cape Verde Standard Time");
///<summary>&quot;(UTC) Coordinated Universal Time&quot;</summary> 
public static string TimezoneDisplayName_UTC=>T("TimezoneDisplayName.UTC");
///<summary>&quot;(UTC+00:00) Casablanca&quot;</summary> 
public static string TimezoneDisplayName_Morocco_Standard_Time=>T("TimezoneDisplayName.Morocco Standard Time");
///<summary>&quot;(UTC+00:00) Dublin, Edinburgh, Lisbon, London&quot;</summary> 
public static string TimezoneDisplayName_GMT_Standard_Time=>T("TimezoneDisplayName.GMT Standard Time");
///<summary>&quot;(UTC+00:00) Monrovia, Reykjavik&quot;</summary> 
public static string TimezoneDisplayName_Greenwich_Standard_Time=>T("TimezoneDisplayName.Greenwich Standard Time");
///<summary>&quot;(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna&quot;</summary> 
public static string TimezoneDisplayName_W__Europe_Standard_Time=>T("TimezoneDisplayName.W. Europe Standard Time");
///<summary>&quot;(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague&quot;</summary> 
public static string TimezoneDisplayName_Central_Europe_Standard_Time=>T("TimezoneDisplayName.Central Europe Standard Time");
///<summary>&quot;(UTC+01:00) Brussels, Copenhagen, Madrid, Paris&quot;</summary> 
public static string TimezoneDisplayName_Romance_Standard_Time=>T("TimezoneDisplayName.Romance Standard Time");
///<summary>&quot;(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb&quot;</summary> 
public static string TimezoneDisplayName_Central_European_Standard_Time=>T("TimezoneDisplayName.Central European Standard Time");
///<summary>&quot;(UTC+01:00) West Central Africa&quot;</summary> 
public static string TimezoneDisplayName_W__Central_Africa_Standard_Time=>T("TimezoneDisplayName.W. Central Africa Standard Time");
///<summary>&quot;(UTC+01:00) Windhoek&quot;</summary> 
public static string TimezoneDisplayName_Namibia_Standard_Time=>T("TimezoneDisplayName.Namibia Standard Time");
///<summary>&quot;(UTC+02:00) Amman&quot;</summary> 
public static string TimezoneDisplayName_Jordan_Standard_Time=>T("TimezoneDisplayName.Jordan Standard Time");
///<summary>&quot;(UTC+02:00) Athens, Bucharest&quot;</summary> 
public static string TimezoneDisplayName_GTB_Standard_Time=>T("TimezoneDisplayName.GTB Standard Time");
///<summary>&quot;(UTC+02:00) Beirut&quot;</summary> 
public static string TimezoneDisplayName_Middle_East_Standard_Time=>T("TimezoneDisplayName.Middle East Standard Time");
///<summary>&quot;(UTC+02:00) Cairo&quot;</summary> 
public static string TimezoneDisplayName_Egypt_Standard_Time=>T("TimezoneDisplayName.Egypt Standard Time");
///<summary>&quot;(UTC+02:00) Chisinau&quot;</summary> 
public static string TimezoneDisplayName_E__Europe_Standard_Time=>T("TimezoneDisplayName.E. Europe Standard Time");
///<summary>&quot;(UTC+02:00) Damascus&quot;</summary> 
public static string TimezoneDisplayName_Syria_Standard_Time=>T("TimezoneDisplayName.Syria Standard Time");
///<summary>&quot;(UTC+02:00) Gaza, Hebron&quot;</summary> 
public static string TimezoneDisplayName_West_Bank_Standard_Time=>T("TimezoneDisplayName.West Bank Standard Time");
///<summary>&quot;(UTC+02:00) Harare, Pretoria&quot;</summary> 
public static string TimezoneDisplayName_South_Africa_Standard_Time=>T("TimezoneDisplayName.South Africa Standard Time");
///<summary>&quot;(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius&quot;</summary> 
public static string TimezoneDisplayName_FLE_Standard_Time=>T("TimezoneDisplayName.FLE Standard Time");
///<summary>&quot;(UTC+02:00) Istanbul&quot;</summary> 
public static string TimezoneDisplayName_Turkey_Standard_Time=>T("TimezoneDisplayName.Turkey Standard Time");
///<summary>&quot;(UTC+02:00) Jerusalem&quot;</summary> 
public static string TimezoneDisplayName_Israel_Standard_Time=>T("TimezoneDisplayName.Israel Standard Time");
///<summary>&quot;(UTC+02:00) Kaliningrad&quot;</summary> 
public static string TimezoneDisplayName_Kaliningrad_Standard_Time=>T("TimezoneDisplayName.Kaliningrad Standard Time");
///<summary>&quot;(UTC+02:00) Tripoli&quot;</summary> 
public static string TimezoneDisplayName_Libya_Standard_Time=>T("TimezoneDisplayName.Libya Standard Time");
///<summary>&quot;(UTC+03:00) Baghdad&quot;</summary> 
public static string TimezoneDisplayName_Arabic_Standard_Time=>T("TimezoneDisplayName.Arabic Standard Time");
///<summary>&quot;(UTC+03:00) Kuwait, Riyadh&quot;</summary> 
public static string TimezoneDisplayName_Arab_Standard_Time=>T("TimezoneDisplayName.Arab Standard Time");
///<summary>&quot;(UTC+03:00) Minsk&quot;</summary> 
public static string TimezoneDisplayName_Belarus_Standard_Time=>T("TimezoneDisplayName.Belarus Standard Time");
///<summary>&quot;(UTC+03:00) Moscow, St. Petersburg, Volgograd&quot;</summary> 
public static string TimezoneDisplayName_Russian_Standard_Time=>T("TimezoneDisplayName.Russian Standard Time");
///<summary>&quot;(UTC+03:00) Nairobi&quot;</summary> 
public static string TimezoneDisplayName_E__Africa_Standard_Time=>T("TimezoneDisplayName.E. Africa Standard Time");
///<summary>&quot;(UTC+03:30) Tehran&quot;</summary> 
public static string TimezoneDisplayName_Iran_Standard_Time=>T("TimezoneDisplayName.Iran Standard Time");
///<summary>&quot;(UTC+04:00) Abu Dhabi, Muscat&quot;</summary> 
public static string TimezoneDisplayName_Arabian_Standard_Time=>T("TimezoneDisplayName.Arabian Standard Time");
///<summary>&quot;(UTC+04:00) Astrakhan, Ulyanovsk&quot;</summary> 
public static string TimezoneDisplayName_Astrakhan_Standard_Time=>T("TimezoneDisplayName.Astrakhan Standard Time");
///<summary>&quot;(UTC+04:00) Baku&quot;</summary> 
public static string TimezoneDisplayName_Azerbaijan_Standard_Time=>T("TimezoneDisplayName.Azerbaijan Standard Time");
///<summary>&quot;(UTC+04:00) Izhevsk, Samara&quot;</summary> 
public static string TimezoneDisplayName_Russia_Time_Zone_3=>T("TimezoneDisplayName.Russia Time Zone 3");
///<summary>&quot;(UTC+04:00) Port Louis&quot;</summary> 
public static string TimezoneDisplayName_Mauritius_Standard_Time=>T("TimezoneDisplayName.Mauritius Standard Time");
///<summary>&quot;(UTC+04:00) Tbilisi&quot;</summary> 
public static string TimezoneDisplayName_Georgian_Standard_Time=>T("TimezoneDisplayName.Georgian Standard Time");
///<summary>&quot;(UTC+04:00) Yerevan&quot;</summary> 
public static string TimezoneDisplayName_Caucasus_Standard_Time=>T("TimezoneDisplayName.Caucasus Standard Time");
///<summary>&quot;(UTC+04:30) Kabul&quot;</summary> 
public static string TimezoneDisplayName_Afghanistan_Standard_Time=>T("TimezoneDisplayName.Afghanistan Standard Time");
///<summary>&quot;(UTC+05:00) Ashgabat, Tashkent&quot;</summary> 
public static string TimezoneDisplayName_West_Asia_Standard_Time=>T("TimezoneDisplayName.West Asia Standard Time");
///<summary>&quot;(UTC+05:00) Ekaterinburg&quot;</summary> 
public static string TimezoneDisplayName_Ekaterinburg_Standard_Time=>T("TimezoneDisplayName.Ekaterinburg Standard Time");
///<summary>&quot;(UTC+05:00) Islamabad, Karachi&quot;</summary> 
public static string TimezoneDisplayName_Pakistan_Standard_Time=>T("TimezoneDisplayName.Pakistan Standard Time");
///<summary>&quot;(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi&quot;</summary> 
public static string TimezoneDisplayName_India_Standard_Time=>T("TimezoneDisplayName.India Standard Time");
///<summary>&quot;(UTC+05:30) Sri Jayawardenepura&quot;</summary> 
public static string TimezoneDisplayName_Sri_Lanka_Standard_Time=>T("TimezoneDisplayName.Sri Lanka Standard Time");
///<summary>&quot;(UTC+05:45) Kathmandu&quot;</summary> 
public static string TimezoneDisplayName_Nepal_Standard_Time=>T("TimezoneDisplayName.Nepal Standard Time");
///<summary>&quot;(UTC+06:00) Astana&quot;</summary> 
public static string TimezoneDisplayName_Central_Asia_Standard_Time=>T("TimezoneDisplayName.Central Asia Standard Time");
///<summary>&quot;(UTC+06:00) Dhaka&quot;</summary> 
public static string TimezoneDisplayName_Bangladesh_Standard_Time=>T("TimezoneDisplayName.Bangladesh Standard Time");
///<summary>&quot;(UTC+06:00) Novosibirsk&quot;</summary> 
public static string TimezoneDisplayName_N__Central_Asia_Standard_Time=>T("TimezoneDisplayName.N. Central Asia Standard Time");
///<summary>&quot;(UTC+06:30) Yangon (Rangoon)&quot;</summary> 
public static string TimezoneDisplayName_Myanmar_Standard_Time=>T("TimezoneDisplayName.Myanmar Standard Time");
///<summary>&quot;(UTC+07:00) Bangkok, Hanoi, Jakarta&quot;</summary> 
public static string TimezoneDisplayName_SE_Asia_Standard_Time=>T("TimezoneDisplayName.SE Asia Standard Time");
///<summary>&quot;(UTC+07:00) Barnaul, Gorno-Altaysk&quot;</summary> 
public static string TimezoneDisplayName_Altai_Standard_Time=>T("TimezoneDisplayName.Altai Standard Time");
///<summary>&quot;(UTC+07:00) Hovd&quot;</summary> 
public static string TimezoneDisplayName_W__Mongolia_Standard_Time=>T("TimezoneDisplayName.W. Mongolia Standard Time");
///<summary>&quot;(UTC+07:00) Krasnoyarsk&quot;</summary> 
public static string TimezoneDisplayName_North_Asia_Standard_Time=>T("TimezoneDisplayName.North Asia Standard Time");
///<summary>&quot;(UTC+07:00) Tomsk&quot;</summary> 
public static string TimezoneDisplayName_Tomsk_Standard_Time=>T("TimezoneDisplayName.Tomsk Standard Time");
///<summary>&quot;(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi&quot;</summary> 
public static string TimezoneDisplayName_China_Standard_Time=>T("TimezoneDisplayName.China Standard Time");
///<summary>&quot;(UTC+08:00) Irkutsk&quot;</summary> 
public static string TimezoneDisplayName_North_Asia_East_Standard_Time=>T("TimezoneDisplayName.North Asia East Standard Time");
///<summary>&quot;(UTC+08:00) Kuala Lumpur, Singapore&quot;</summary> 
public static string TimezoneDisplayName_Singapore_Standard_Time=>T("TimezoneDisplayName.Singapore Standard Time");
///<summary>&quot;(UTC+08:00) Perth&quot;</summary> 
public static string TimezoneDisplayName_W__Australia_Standard_Time=>T("TimezoneDisplayName.W. Australia Standard Time");
///<summary>&quot;(UTC+08:00) Taipei&quot;</summary> 
public static string TimezoneDisplayName_Taipei_Standard_Time=>T("TimezoneDisplayName.Taipei Standard Time");
///<summary>&quot;(UTC+08:00) Ulaanbaatar&quot;</summary> 
public static string TimezoneDisplayName_Ulaanbaatar_Standard_Time=>T("TimezoneDisplayName.Ulaanbaatar Standard Time");
///<summary>&quot;(UTC+08:30) Pyongyang&quot;</summary> 
public static string TimezoneDisplayName_North_Korea_Standard_Time=>T("TimezoneDisplayName.North Korea Standard Time");
///<summary>&quot;(UTC+08:45) Eucla&quot;</summary> 
public static string TimezoneDisplayName_Aus_Central_W__Standard_Time=>T("TimezoneDisplayName.Aus Central W. Standard Time");
///<summary>&quot;(UTC+09:00) Chita&quot;</summary> 
public static string TimezoneDisplayName_Transbaikal_Standard_Time=>T("TimezoneDisplayName.Transbaikal Standard Time");
///<summary>&quot;(UTC+09:00) Osaka, Sapporo, Tokyo&quot;</summary> 
public static string TimezoneDisplayName_Tokyo_Standard_Time=>T("TimezoneDisplayName.Tokyo Standard Time");
///<summary>&quot;(UTC+09:00) Seoul&quot;</summary> 
public static string TimezoneDisplayName_Korea_Standard_Time=>T("TimezoneDisplayName.Korea Standard Time");
///<summary>&quot;(UTC+09:00) Yakutsk&quot;</summary> 
public static string TimezoneDisplayName_Yakutsk_Standard_Time=>T("TimezoneDisplayName.Yakutsk Standard Time");
///<summary>&quot;(UTC+09:30) Adelaide&quot;</summary> 
public static string TimezoneDisplayName_Cen__Australia_Standard_Time=>T("TimezoneDisplayName.Cen. Australia Standard Time");
///<summary>&quot;(UTC+09:30) Darwin&quot;</summary> 
public static string TimezoneDisplayName_AUS_Central_Standard_Time=>T("TimezoneDisplayName.AUS Central Standard Time");
///<summary>&quot;(UTC+10:00) Brisbane&quot;</summary> 
public static string TimezoneDisplayName_E__Australia_Standard_Time=>T("TimezoneDisplayName.E. Australia Standard Time");
///<summary>&quot;(UTC+10:00) Canberra, Melbourne, Sydney&quot;</summary> 
public static string TimezoneDisplayName_AUS_Eastern_Standard_Time=>T("TimezoneDisplayName.AUS Eastern Standard Time");
///<summary>&quot;(UTC+10:00) Guam, Port Moresby&quot;</summary> 
public static string TimezoneDisplayName_West_Pacific_Standard_Time=>T("TimezoneDisplayName.West Pacific Standard Time");
///<summary>&quot;(UTC+10:00) Hobart&quot;</summary> 
public static string TimezoneDisplayName_Tasmania_Standard_Time=>T("TimezoneDisplayName.Tasmania Standard Time");
///<summary>&quot;(UTC+10:00) Vladivostok&quot;</summary> 
public static string TimezoneDisplayName_Vladivostok_Standard_Time=>T("TimezoneDisplayName.Vladivostok Standard Time");
///<summary>&quot;(UTC+10:30) Lord Howe Island&quot;</summary> 
public static string TimezoneDisplayName_Lord_Howe_Standard_Time=>T("TimezoneDisplayName.Lord Howe Standard Time");
///<summary>&quot;(UTC+11:00) Bougainville Island&quot;</summary> 
public static string TimezoneDisplayName_Bougainville_Standard_Time=>T("TimezoneDisplayName.Bougainville Standard Time");
///<summary>&quot;(UTC+11:00) Chokurdakh&quot;</summary> 
public static string TimezoneDisplayName_Russia_Time_Zone_10=>T("TimezoneDisplayName.Russia Time Zone 10");
///<summary>&quot;(UTC+11:00) Magadan&quot;</summary> 
public static string TimezoneDisplayName_Magadan_Standard_Time=>T("TimezoneDisplayName.Magadan Standard Time");
///<summary>&quot;(UTC+11:00) Norfolk Island&quot;</summary> 
public static string TimezoneDisplayName_Norfolk_Standard_Time=>T("TimezoneDisplayName.Norfolk Standard Time");
///<summary>&quot;(UTC+11:00) Sakhalin&quot;</summary> 
public static string TimezoneDisplayName_Sakhalin_Standard_Time=>T("TimezoneDisplayName.Sakhalin Standard Time");
///<summary>&quot;(UTC+11:00) Solomon Is., New Caledonia&quot;</summary> 
public static string TimezoneDisplayName_Central_Pacific_Standard_Time=>T("TimezoneDisplayName.Central Pacific Standard Time");
///<summary>&quot;(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky&quot;</summary> 
public static string TimezoneDisplayName_Russia_Time_Zone_11=>T("TimezoneDisplayName.Russia Time Zone 11");
///<summary>&quot;(UTC+12:00) Auckland, Wellington&quot;</summary> 
public static string TimezoneDisplayName_New_Zealand_Standard_Time=>T("TimezoneDisplayName.New Zealand Standard Time");
///<summary>&quot;(UTC+12:00) Coordinated Universal Time+12&quot;</summary> 
public static string TimezoneDisplayName_UTC12=>T("TimezoneDisplayName.UTC+12");
///<summary>&quot;(UTC+12:00) Fiji&quot;</summary> 
public static string TimezoneDisplayName_Fiji_Standard_Time=>T("TimezoneDisplayName.Fiji Standard Time");
///<summary>&quot;(UTC+12:00) Petropavlovsk-Kamchatsky - Old&quot;</summary> 
public static string TimezoneDisplayName_Kamchatka_Standard_Time=>T("TimezoneDisplayName.Kamchatka Standard Time");
///<summary>&quot;(UTC+12:45) Chatham Islands&quot;</summary> 
public static string TimezoneDisplayName_Chatham_Islands_Standard_Time=>T("TimezoneDisplayName.Chatham Islands Standard Time");
///<summary>&quot;(UTC+13:00) Nuku&apos;alofa&quot;</summary> 
public static string TimezoneDisplayName_Tonga_Standard_Time=>T("TimezoneDisplayName.Tonga Standard Time");
///<summary>&quot;(UTC+13:00) Samoa&quot;</summary> 
public static string TimezoneDisplayName_Samoa_Standard_Time=>T("TimezoneDisplayName.Samoa Standard Time");
///<summary>&quot;(UTC+14:00) Kiritimati Island&quot;</summary> 
public static string TimezoneDisplayName_Line_Islands_Standard_Time=>T("TimezoneDisplayName.Line Islands Standard Time");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.TimezoneDisplayNames", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_UserControlFunction {
///<summary>&quot;User Control Functions&quot;</summary> 
public static string RootElement_Label=>T("RootElement.Label");
///<summary>&quot;Functions based on .ascx controls&quot;</summary> 
public static string RootElement_ToolTip=>T("RootElement.ToolTip");
///<summary>&quot;Add User Control Function&quot;</summary> 
public static string AddNewUserControlFunction_Label=>T("AddNewUserControlFunction.Label");
///<summary>&quot;Add a new User Control function&quot;</summary> 
public static string AddNewUserControlFunction_ToolTip=>T("AddNewUserControlFunction.ToolTip");
///<summary>&quot;Edit&quot;</summary> 
public static string EditUserControlFunction_Label=>T("EditUserControlFunction.Label");
///<summary>&quot;Edit the User Control Function&quot;</summary> 
public static string EditUserControlFunction_ToolTip=>T("EditUserControlFunction.ToolTip");
///<summary>&quot;Delete&quot;</summary> 
public static string DeleteUserControlFunction_Label=>T("DeleteUserControlFunction.Label");
///<summary>&quot;Delete the User Control function&quot;</summary> 
public static string DeleteUserControlFunction_ToolTip=>T("DeleteUserControlFunction.ToolTip");
///<summary>&quot;Add User Control Function&quot;</summary> 
public static string AddNewUserControlFunction_LabelDialog=>T("AddNewUserControlFunction.LabelDialog");
///<summary>&quot;Name&quot;</summary> 
public static string AddNewUserControlFunction_LabelName=>T("AddNewUserControlFunction.LabelName");
///<summary>&quot;&quot;</summary> 
public static string AddNewUserControlFunction_HelpName=>T("AddNewUserControlFunction.HelpName");
///<summary>&quot;Namespace&quot;</summary> 
public static string AddNewUserControlFunction_LabelNamespace=>T("AddNewUserControlFunction.LabelNamespace");
///<summary>&quot;&quot;</summary> 
public static string AddNewUserControlFunction_HelpNamespace=>T("AddNewUserControlFunction.HelpNamespace");
///<summary>&quot;Copy from&quot;</summary> 
public static string AddNewUserControlFunction_LabelCopyFrom=>T("AddNewUserControlFunction.LabelCopyFrom");
///<summary>&quot;You can copy the code from another User Control function by selecting it in this list.&quot;</summary> 
public static string AddNewUserControlFunction_LabelCopyFromHelp=>T("AddNewUserControlFunction.LabelCopyFromHelp");
///<summary>&quot;(New User Control function)&quot;</summary> 
public static string AddNewUserControlFunction_LabelCopyFromEmptyOption=>T("AddNewUserControlFunction.LabelCopyFromEmptyOption");
///<summary>&quot;A C1 function with the same name already exists.&quot;</summary> 
public static string AddNewUserControlFunctionWorkflow_DuplicateName=>T("AddNewUserControlFunctionWorkflow.DuplicateName");
///<summary>&quot;Function name is empty&quot;</summary> 
public static string AddNewUserControlFunctionWorkflow_EmptyName=>T("AddNewUserControlFunctionWorkflow.EmptyName");
///<summary>&quot;Function namespace is empty&quot;</summary> 
public static string AddNewUserControlFunctionWorkflow_NamespaceEmpty=>T("AddNewUserControlFunctionWorkflow.NamespaceEmpty");
///<summary>&quot;Namespace must be like A.B.C - not start and end with .&quot;</summary> 
public static string AddNewUserControlFunctionWorkflow_InvalidNamespace=>T("AddNewUserControlFunctionWorkflow.InvalidNamespace");
///<summary>&quot;The total length of the name and the namespace is too long (used to name the ASCX file).&quot;</summary> 
public static string AddNewUserControlFunctionWorkflow_TotalNameTooLang=>T("AddNewUserControlFunctionWorkflow.TotalNameTooLang");
///<summary>&quot;Validation Error&quot;</summary> 
public static string EditUserControlFunctionWorkflow_Validation_DialogTitle=>T("EditUserControlFunctionWorkflow.Validation.DialogTitle");
///<summary>&quot;Compilation failed: {0}&quot;</summary> 
public static string EditUserControlFunctionWorkflow_Validation_CompilationFailed(object parameter0)=>string.Format(T("EditUserControlFunctionWorkflow.Validation.CompilationFailed"), parameter0);
///<summary>&quot;The User Control function should inherit &apos;{0}&apos;&quot;</summary> 
public static string EditUserControlFunctionWorkflow_Validation_IncorrectBaseClass(object parameter0)=>string.Format(T("EditUserControlFunctionWorkflow.Validation.IncorrectBaseClass"), parameter0);
///<summary>&quot;Delete User Control Function?&quot;</summary> 
public static string DeleteUserControlFunctionWorkflow_ConfirmDeleteTitle=>T("DeleteUserControlFunctionWorkflow.ConfirmDeleteTitle");
///<summary>&quot;Delete the selected User Control?&quot;</summary> 
public static string DeleteUserControlFunctionWorkflow_ConfirmDeleteMessage=>T("DeleteUserControlFunctionWorkflow.ConfirmDeleteMessage");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.UserControlFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_UserGroupElementProvider {
///<summary>&quot;User Groups&quot;</summary> 
public static string UserGroupElementProvider_RootLabel=>T("UserGroupElementProvider.RootLabel");
///<summary>&quot;User Groups&quot;</summary> 
public static string UserGroupElementProvider_RootToolTip=>T("UserGroupElementProvider.RootToolTip");
///<summary>&quot;Add User Group&quot;</summary> 
public static string UserGroupElementProvider_AddNewUserGroupLabel=>T("UserGroupElementProvider.AddNewUserGroupLabel");
///<summary>&quot;Add new User Group&quot;</summary> 
public static string UserGroupElementProvider_AddNewUserGroupToolTip=>T("UserGroupElementProvider.AddNewUserGroupToolTip");
///<summary>&quot;Edit User Group&quot;</summary> 
public static string UserGroupElementProvider_EditUserGroupLabel=>T("UserGroupElementProvider.EditUserGroupLabel");
///<summary>&quot;Edit User Group&quot;</summary> 
public static string UserGroupElementProvider_EditUserGroupToolTip=>T("UserGroupElementProvider.EditUserGroupToolTip");
///<summary>&quot;Delete User Group&quot;</summary> 
public static string UserGroupElementProvider_DeleteUserGroupLabel=>T("UserGroupElementProvider.DeleteUserGroupLabel");
///<summary>&quot;Delete User Group&quot;</summary> 
public static string UserGroupElementProvider_DeleteUserGroupToolTip=>T("UserGroupElementProvider.DeleteUserGroupToolTip");
///<summary>&quot;Add User Group&quot;</summary> 
public static string AddNewUserGroup_AddNewUserGroupStep1_LabelFieldGroup=>T("AddNewUserGroup.AddNewUserGroupStep1.LabelFieldGroup");
///<summary>&quot;User group name&quot;</summary> 
public static string AddNewUserGroup_AddNewUserGroupStep1_UserGroupNameLabel=>T("AddNewUserGroup.AddNewUserGroupStep1.UserGroupNameLabel");
///<summary>&quot;The name of the new user group&quot;</summary> 
public static string AddNewUserGroup_AddNewUserGroupStep1_UserGroupNameHelp=>T("AddNewUserGroup.AddNewUserGroupStep1.UserGroupNameHelp");
///<summary>&quot;A user group with the same name already exists&quot;</summary> 
public static string AddNewUserGroup_AddNewUserGroupStep1_UserGroupNameAlreadyExists=>T("AddNewUserGroup.AddNewUserGroupStep1.UserGroupNameAlreadyExists");
///<summary>&quot;Edit User Group&quot;</summary> 
public static string EditUserGroup_EditUserGroupStep1_LabelFieldGroup=>T("EditUserGroup.EditUserGroupStep1.LabelFieldGroup");
///<summary>&quot;User group name&quot;</summary> 
public static string EditUserGroup_EditUserGroupStep1_UserGroupNameLabel=>T("EditUserGroup.EditUserGroupStep1.UserGroupNameLabel");
///<summary>&quot;The name of the user group&quot;</summary> 
public static string EditUserGroup_EditUserGroupStep1_UserGroupNameHelp=>T("EditUserGroup.EditUserGroupStep1.UserGroupNameHelp");
///<summary>&quot;A user group with the same name already exists&quot;</summary> 
public static string EditUserGroup_EditUserGroupStep1_UserGroupNameAlreadyExists=>T("EditUserGroup.EditUserGroupStep1.UserGroupNameAlreadyExists");
///<summary>&quot;Perspectives&quot;</summary> 
public static string EditUserGroup_EditUserGroupStep1_ActivePerspectiveFieldLabel=>T("EditUserGroup.EditUserGroupStep1.ActivePerspectiveFieldLabel");
///<summary>&quot;Perspectives&quot;</summary> 
public static string EditUserGroup_EditUserGroupStep1_ActivePerspectiveMultiSelectLabel=>T("EditUserGroup.EditUserGroupStep1.ActivePerspectiveMultiSelectLabel");
///<summary>&quot;Select which perspectives the user gets access to view&quot;</summary> 
public static string EditUserGroup_EditUserGroupStep1_ActivePerspectiveMultiSelectHelp=>T("EditUserGroup.EditUserGroupStep1.ActivePerspectiveMultiSelectHelp");
///<summary>&quot;Global permissions&quot;</summary> 
public static string EditUserGroup_EditUserGroupStep1_GlobalPermissionsFieldLabel=>T("EditUserGroup.EditUserGroupStep1.GlobalPermissionsFieldLabel");
///<summary>&quot;Global permissions&quot;</summary> 
public static string EditUserGroup_EditUserGroupStep1_GlobalPermissionsMultiSelectLabel=>T("EditUserGroup.EditUserGroupStep1.GlobalPermissionsMultiSelectLabel");
///<summary>&quot;The Administrate permission grants the user group access to manage user group permissions and execute other administrative tasks.  The Configure permission grants access to super user tasks.&quot;</summary> 
public static string EditUserGroup_EditUserGroupStep1_GlobalPermissionsMultiSelectHelp=>T("EditUserGroup.EditUserGroupStep1.GlobalPermissionsMultiSelectHelp");
///<summary>&quot;User Group Has Users&quot;</summary> 
public static string DeleteUserGroup_DeleteUserGroupInitialStep_UserGroupHasUsersTitle=>T("DeleteUserGroup.DeleteUserGroupInitialStep.UserGroupHasUsersTitle");
///<summary>&quot;You cannot delete a user group that has users.&quot;</summary> 
public static string DeleteUserGroup_DeleteUserGroupInitialStep_UserGroupHasUsersMessage=>T("DeleteUserGroup.DeleteUserGroupInitialStep.UserGroupHasUsersMessage");
///<summary>&quot;Delete User Group&quot;</summary> 
public static string DeleteUserGroup_DeleteUserGroupStep1_LabelFieldGroup=>T("DeleteUserGroup.DeleteUserGroupStep1.LabelFieldGroup");
///<summary>&quot;Delete the selected user group?&quot;</summary> 
public static string DeleteUserGroup_DeleteUserGroupStep1_Text=>T("DeleteUserGroup.DeleteUserGroupStep1.Text");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.UserGroupElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_VisualFunction {
///<summary>&quot;Delete Visual Function?&quot;</summary> 
public static string DeleteStep1_FieldGroupLabel=>T("DeleteStep1.FieldGroupLabel");
///<summary>&quot;Are you sure you wish to delete the selected function?&quot;</summary> 
public static string DeleteStep1_Text=>T("DeleteStep1.Text");
///<summary>&quot;Add Visual Function&quot;</summary> 
public static string AddNew_DialogLabel=>T("AddNew.DialogLabel");
///<summary>&quot;No Datatypes to Visualize&quot;</summary> 
public static string AddNew_NoTypesExistsErrorTitle=>T("AddNew.NoTypesExistsErrorTitle");
///<summary>&quot;No datatypes have been created yet. You must first create a datatype to visualize before you can create a visualization.&quot;</summary> 
public static string AddNew_NoTypesExistsErrorMessage=>T("AddNew.NoTypesExistsErrorMessage");
///<summary>&quot;No Data to Visualize and Preview&quot;</summary> 
public static string AddNew_NoDataExistsErrorTitle=>T("AddNew.NoDataExistsErrorTitle");
///<summary>&quot;Data must exist before you can create a rendering. Add some data to this type and try again.&quot;</summary> 
public static string AddNew_NoDataExistsErrorMessage=>T("AddNew.NoDataExistsErrorMessage");
///<summary>&quot;No Templates&quot;</summary> 
public static string AddNew_NoPageTemplatesExistsErrorTitle=>T("AddNew.NoPageTemplatesExistsErrorTitle");
///<summary>&quot;At least one template must exist before you can create a rendering. Create one template and try again.&quot;</summary> 
public static string AddNew_NoPageTemplatesExistsErrorMessage=>T("AddNew.NoPageTemplatesExistsErrorMessage");
///<summary>&quot;A Language Is Required&quot;</summary> 
public static string AddNew_MissingActiveLanguageTitle=>T("AddNew.MissingActiveLanguageTitle");
///<summary>&quot;To create a visual function a language is required, but no languages have been added yet. You can add one under the System perspective.&quot;</summary> 
public static string AddNew_MissingActiveLanguageMessage=>T("AddNew.MissingActiveLanguageMessage");
///<summary>&quot;Datatype&quot;</summary> 
public static string AddNewStep1_TypeSelectorLabel=>T("AddNewStep1.TypeSelectorLabel");
///<summary>&quot;&quot;</summary> 
public static string AddNewStep1_TypeSelectorHelp=>T("AddNewStep1.TypeSelectorHelp");
///<summary>&quot;Function name&quot;</summary> 
public static string AddNewStep2_FuncitonNameLabel=>T("AddNewStep2.FuncitonNameLabel");
///<summary>&quot;&quot;</summary> 
public static string AddNewStep2_FuncitonNameHelp=>T("AddNewStep2.FuncitonNameHelp");
///<summary>&quot;Function namespace&quot;</summary> 
public static string AddNewStep2_FuncitonNamespaceLabel=>T("AddNewStep2.FuncitonNamespaceLabel");
///<summary>&quot;&quot;</summary> 
public static string AddNewStep2_FuncitonNamespaceHelp=>T("AddNewStep2.FuncitonNamespaceHelp");
///<summary>&quot;Visual Function Settings&quot;</summary> 
public static string Edit_PlaceHolderLabel=>T("Edit.PlaceHolderLabel");
///<summary>&quot;Visual function&quot;</summary> 
public static string Edit_HeadingTitel=>T("Edit.HeadingTitel");
///<summary>&quot;Visual function settings&quot;</summary> 
public static string Edit_FieldGroupLabel=>T("Edit.FieldGroupLabel");
///<summary>&quot;Function name&quot;</summary> 
public static string Edit_FunctionNameLabel=>T("Edit.FunctionNameLabel");
///<summary>&quot;The name of the function. Names must be unique with a namespace.&quot;</summary> 
public static string Edit_FunctionNameHelp=>T("Edit.FunctionNameHelp");
///<summary>&quot;Function namespace&quot;</summary> 
public static string Edit_FunctionNamespaceLabel=>T("Edit.FunctionNamespaceLabel");
///<summary>&quot;The &apos;package&apos; this function belongs to.&quot;</summary> 
public static string Edit_FunctionNamespaceHelp=>T("Edit.FunctionNamespaceHelp");
///<summary>&quot;Description&quot;</summary> 
public static string Edit_FunctionDescriptionLabel=>T("Edit.FunctionDescriptionLabel");
///<summary>&quot;A description of the function that can help people understand what it does.&quot;</summary> 
public static string Edit_FunctionDescriptionHelp=>T("Edit.FunctionDescriptionHelp");
///<summary>&quot;Item list length&quot;</summary> 
public static string Edit_ItemListLenghtLabel=>T("Edit.ItemListLenghtLabel");
///<summary>&quot;The maximum number of items to show.&quot;</summary> 
public static string Edit_ItemListLenghtHelp=>T("Edit.ItemListLenghtHelp");
///<summary>&quot;Item sorting&quot;</summary> 
public static string Edit_ItemSortingLabel=>T("Edit.ItemSortingLabel");
///<summary>&quot;Select which field to use when sorting the list. Use &apos;(random)&apos; to pick randomly from the list.&quot;</summary> 
public static string Edit_ItemSortingHelp=>T("Edit.ItemSortingHelp");
///<summary>&quot;List sort order&quot;</summary> 
public static string Edit_ListSortingLabel=>T("Edit.ListSortingLabel");
///<summary>&quot;Ascending&quot;</summary> 
public static string Edit_ListSortingTrueLabel=>T("Edit.ListSortingTrueLabel");
///<summary>&quot;Descending&quot;</summary> 
public static string Edit_ListSortingFalseLabel=>T("Edit.ListSortingFalseLabel");
///<summary>&quot;Select the sorted order. Ascending order is alphabetically, chronological. This field is ignored when &apos;(random)&apos; sorting is active.&quot;</summary> 
public static string Edit_ListSortingHelp=>T("Edit.ListSortingHelp");
///<summary>&quot;Preview template&quot;</summary> 
public static string Edit_PreviewTemplateLabel=>T("Edit.PreviewTemplateLabel");
///<summary>&quot;This information is only used when previewing the function.&quot;</summary> 
public static string Edit_PreviewTemplateHelp=>T("Edit.PreviewTemplateHelp");
///<summary>&quot;Visual Layout&quot;</summary> 
public static string Edit_WYSIWYGLayoutLabel=>T("Edit.WYSIWYGLayoutLabel");
///<summary>&quot;Preview&quot;</summary> 
public static string Edit_LabelPreview=>T("Edit.LabelPreview");
///<summary>&quot;No templates&quot;</summary> 
public static string Edit_NoPageTemplatesExistsErrorTitle=>T("Edit.NoPageTemplatesExistsErrorTitle");
///<summary>&quot;At least one template must exist before you can edit a rendering. Create one template and try again.&quot;</summary> 
public static string Edit_NoPageTemplatesExistsErrorMessage=>T("Edit.NoPageTemplatesExistsErrorMessage");
///<summary>&quot;A language is required&quot;</summary> 
public static string Edit_MissingActiveLanguageTitle=>T("Edit.MissingActiveLanguageTitle");
///<summary>&quot;To edit a visual function a language is required, but no languages have been added yet. You can add one under the System perspective.&quot;</summary> 
public static string Edit_MissingActiveLanguageMessage=>T("Edit.MissingActiveLanguageMessage");
///<summary>&quot;Select a visual function&quot;</summary> 
public static string Select_FieldGroupLabel=>T("Select.FieldGroupLabel");
///<summary>&quot;Select a function&quot;</summary> 
public static string Select_FunctionFunctionsLabel=>T("Select.FunctionFunctionsLabel");
///<summary>&quot;Select a visual function to edit or delete&quot;</summary> 
public static string Select_FunctionFunctionsHelp=>T("Select.FunctionFunctionsHelp");
///<summary>&quot;Another function with this name exists. Names must be unique.&quot;</summary> 
public static string AddVisualFunctionWorkflow_FunctionNameValidatoinErrorMessage=>T("AddVisualFunctionWorkflow.FunctionNameValidatoinErrorMessage");
///<summary>&quot;Another function with this name exists. Names must be unique.&quot;</summary> 
public static string EditVisualFunctionWorkflow_FunctionNameValidatoinErrorMessage=>T("EditVisualFunctionWorkflow.FunctionNameValidatoinErrorMessage");
///<summary>&quot;Visual Functions&quot;</summary> 
public static string VisualFunctionElementProvider_RootFolderLabel=>T("VisualFunctionElementProvider.RootFolderLabel");
///<summary>&quot;Visual functions&quot;</summary> 
public static string VisualFunctionElementProvider_RootFolderToolTip=>T("VisualFunctionElementProvider.RootFolderToolTip");
///<summary>&quot;Add Visual Function&quot;</summary> 
public static string VisualFunctionElementProvider_AddNewLabel=>T("VisualFunctionElementProvider.AddNewLabel");
///<summary>&quot;Add new visual function&quot;</summary> 
public static string VisualFunctionElementProvider_AddNewToolTip=>T("VisualFunctionElementProvider.AddNewToolTip");
///<summary>&quot;Edit Visual Function&quot;</summary> 
public static string VisualFunctionElementProvider_EditLabel=>T("VisualFunctionElementProvider.EditLabel");
///<summary>&quot;Edit visual function&quot;</summary> 
public static string VisualFunctionElementProvider_EditToolTip=>T("VisualFunctionElementProvider.EditToolTip");
///<summary>&quot;Delete Visual Function&quot;</summary> 
public static string VisualFunctionElementProvider_DeleteLabel=>T("VisualFunctionElementProvider.DeleteLabel");
///<summary>&quot;Delete visual function&quot;</summary> 
public static string VisualFunctionElementProvider_DeleteToolTip=>T("VisualFunctionElementProvider.DeleteToolTip");
///<summary>&quot;Another function with this name exists. Names must be unique.&quot;</summary> 
public static string VisualFunctionElementProvider_FunctionNameNotUniqueError=>T("VisualFunctionElementProvider.FunctionNameNotUniqueError");
///<summary>&quot;New visual function&quot;</summary> 
public static string VisualFunctionElementProviderHelper_AddNewLabel=>T("VisualFunctionElementProviderHelper.AddNewLabel");
///<summary>&quot;New visual function&quot;</summary> 
public static string VisualFunctionElementProviderHelper_AddNewToolTip=>T("VisualFunctionElementProviderHelper.AddNewToolTip");
///<summary>&quot;Edit visual function&quot;</summary> 
public static string VisualFunctionElementProviderHelper_EditLabel=>T("VisualFunctionElementProviderHelper.EditLabel");
///<summary>&quot;Edit visual function&quot;</summary> 
public static string VisualFunctionElementProviderHelper_EditToolTip=>T("VisualFunctionElementProviderHelper.EditToolTip");
///<summary>&quot;Delete visual function&quot;</summary> 
public static string VisualFunctionElementProviderHelper_DeleteLabel=>T("VisualFunctionElementProviderHelper.DeleteLabel");
///<summary>&quot;Delete visual function&quot;</summary> 
public static string VisualFunctionElementProviderHelper_DeleteToolTip=>T("VisualFunctionElementProviderHelper.DeleteToolTip");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_WebsiteFileElementProvider {
///<summary>&quot;/&quot;</summary> 
public static string WebsiteFilesRootElement_Label=>T("WebsiteFilesRootElement.Label");
///<summary>&quot;/&quot;</summary> 
public static string LayoutResourcesRootElement_Label=>T("LayoutResourcesRootElement.Label");
///<summary>&quot;Layout&quot;</summary> 
public static string LayoutResourcesKeyNameLabel=>T("LayoutResourcesKeyNameLabel");
///<summary>&quot;Delete File?&quot;</summary> 
public static string DeleteFile_LabelFieldGroup=>T("DeleteFile.LabelFieldGroup");
///<summary>&quot;Delete file?&quot;</summary> 
public static string DeleteFile_Text=>T("DeleteFile.Text");
///<summary>&quot;Delete Folder?&quot;</summary> 
public static string DeleteFolder_LabelFieldGroup=>T("DeleteFolder.LabelFieldGroup");
///<summary>&quot;Delete folder?&quot;</summary> 
public static string DeleteFolder_Text=>T("DeleteFolder.Text");
///<summary>&quot;Add New Folder&quot;</summary> 
public static string AddNewFolder_LabelFieldGroup=>T("AddNewFolder.LabelFieldGroup");
///<summary>&quot;Folder name&quot;</summary> 
public static string AddNewFolder_Text=>T("AddNewFolder.Text");
///<summary>&quot;Enter the name of the new folder&quot;</summary> 
public static string AddNewFolder_Help=>T("AddNewFolder.Help");
///<summary>&quot;A folder with the same name already exists&quot;</summary> 
public static string AddNewFolder_Error_FolderExist=>T("AddNewFolder.Error.FolderExist");
///<summary>&quot;Add New File&quot;</summary> 
public static string AddNewFile_LabelFieldGroup=>T("AddNewFile.LabelFieldGroup");
///<summary>&quot;File name&quot;</summary> 
public static string AddNewFile_Text=>T("AddNewFile.Text");
///<summary>&quot;Enter the name of the new file&quot;</summary> 
public static string AddNewFile_Help=>T("AddNewFile.Help");
///<summary>&quot;A file with the same name already exists&quot;</summary> 
public static string AddNewFile_Error_FileExist=>T("AddNewFile.Error.FileExist");
///<summary>&quot;Upload File&quot;</summary> 
public static string UploadNewWebsiteFile_LabelFieldGroup=>T("UploadNewWebsiteFile.LabelFieldGroup");
///<summary>&quot;Select file&quot;</summary> 
public static string UploadNewWebsiteFile_LabelFile=>T("UploadNewWebsiteFile.LabelFile");
///<summary>&quot;Select file to upload&quot;</summary> 
public static string UploadNewWebsiteFile_HelpFile=>T("UploadNewWebsiteFile.HelpFile");
///<summary>&quot;Overwrite existing file&quot;</summary> 
public static string UploadNewWebsiteFile_ConfirmOverwriteTitle=>T("UploadNewWebsiteFile.ConfirmOverwriteTitle");
///<summary>&quot;A file with the same name already exists, overwrite?&quot;</summary> 
public static string UploadNewWebsiteFile_ConfirmOverwriteDescription=>T("UploadNewWebsiteFile.ConfirmOverwriteDescription");
///<summary>&quot;Wrong File Type&quot;</summary> 
public static string UploadFile_Error_WrongTypeTitle=>T("UploadFile.Error.WrongTypeTitle");
///<summary>&quot;Wrong file type&quot;</summary> 
public static string UploadFile_Error_WrongTypeMessage=>T("UploadFile.Error.WrongTypeMessage");
///<summary>&quot;New Folder&quot;</summary> 
public static string AddWebsiteFolderTitle=>T("AddWebsiteFolderTitle");
///<summary>&quot;Add new folder&quot;</summary> 
public static string AddWebsiteFolderToolTip=>T("AddWebsiteFolderToolTip");
///<summary>&quot;New File&quot;</summary> 
public static string AddWebsiteFileTitle=>T("AddWebsiteFileTitle");
///<summary>&quot;Create new file&quot;</summary> 
public static string AddWebsiteFileToolTip=>T("AddWebsiteFileToolTip");
///<summary>&quot;Delete File&quot;</summary> 
public static string DeleteWebsiteFileTitle=>T("DeleteWebsiteFileTitle");
///<summary>&quot;Delete file&quot;</summary> 
public static string DeleteWebsiteFileToolTip=>T("DeleteWebsiteFileToolTip");
///<summary>&quot;Download&quot;</summary> 
public static string DownloadFileTitle=>T("DownloadFileTitle");
///<summary>&quot;Download file&quot;</summary> 
public static string DownloadFileToolTip=>T("DownloadFileToolTip");
///<summary>&quot;Delete Folder&quot;</summary> 
public static string DeleteWebsiteFolderTitle=>T("DeleteWebsiteFolderTitle");
///<summary>&quot;Delete folder&quot;</summary> 
public static string DeleteWebsiteFolderToolTip=>T("DeleteWebsiteFolderToolTip");
///<summary>&quot;Edit File&quot;</summary> 
public static string EditWebsiteFileTitle=>T("EditWebsiteFileTitle");
///<summary>&quot;Edit file&quot;</summary> 
public static string EditWebsiteFileToolTip=>T("EditWebsiteFileToolTip");
///<summary>&quot;Upload File&quot;</summary> 
public static string UploadWebsiteFileTitle=>T("UploadWebsiteFileTitle");
///<summary>&quot;Upload file&quot;</summary> 
public static string UploadWebsiteFileToolTip=>T("UploadWebsiteFileToolTip");
///<summary>&quot;Show in &quot;{0}&quot;&quot;</summary> 
public static string AddFolderToWhiteListTitle(object parameter0)=>string.Format(T("AddFolderToWhiteListTitle"), parameter0);
///<summary>&quot;Control if this folder should be visible in &quot;{0}&quot;&quot;</summary> 
public static string AddFolderToWhiteListToolTip(object parameter0)=>string.Format(T("AddFolderToWhiteListToolTip"), parameter0);
///<summary>&quot;Show in &quot;{0}&quot;&quot;</summary> 
public static string RemoveFolderFromWhiteListTitle(object parameter0)=>string.Format(T("RemoveFolderFromWhiteListTitle"), parameter0);
///<summary>&quot;Control if this folder should be visible in &quot;{0}&quot;&quot;</summary> 
public static string RemoveFolderFromWhiteListToolTip(object parameter0)=>string.Format(T("RemoveFolderFromWhiteListToolTip"), parameter0);
///<summary>&quot;Error&quot;</summary> 
public static string DeleteWebsiteFileWorkflow_DeleteErrorTitle=>T("DeleteWebsiteFileWorkflow.DeleteErrorTitle");
///<summary>&quot;Could not delete the file&quot;</summary> 
public static string DeleteWebsiteFileWorkflow_DeleteErrorMessage=>T("DeleteWebsiteFileWorkflow.DeleteErrorMessage");
///<summary>&quot;Error&quot;</summary> 
public static string DeleteWebsiteFolderWorkflow_DeleteErrorTitle=>T("DeleteWebsiteFolderWorkflow.DeleteErrorTitle");
///<summary>&quot;Could not delete the folder&quot;</summary> 
public static string DeleteWebsiteFolderWorkflow_DeleteErrorMessage=>T("DeleteWebsiteFolderWorkflow.DeleteErrorMessage");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Plugins_XsltBasedFunction {
///<summary>&quot;XSLT Functions&quot;</summary> 
public static string Plugins_XsltBasedFunctionProviderElementProvider_RootFolderLabel=>T("Plugins.XsltBasedFunctionProviderElementProvider.RootFolderLabel");
///<summary>&quot;XSLT functions&quot;</summary> 
public static string Plugins_XsltBasedFunctionProviderElementProvider_RootFolderToolTip=>T("Plugins.XsltBasedFunctionProviderElementProvider.RootFolderToolTip");
///<summary>&quot;An XSLT function with the same name already exists.&quot;</summary> 
public static string AddNewXsltFunctionWorkflow_DuplicateName=>T("AddNewXsltFunctionWorkflow.DuplicateName");
///<summary>&quot;Method name must be non-empty&quot;</summary> 
public static string AddNewXsltFunctionWorkflow_MethodEmpty=>T("AddNewXsltFunctionWorkflow.MethodEmpty");
///<summary>&quot;Namespace must be non-empty&quot;</summary> 
public static string AddNewXsltFunctionWorkflow_NamespaceEmpty=>T("AddNewXsltFunctionWorkflow.NamespaceEmpty");
///<summary>&quot;Namespace must be like A.B.C - not start and end with .&quot;</summary> 
public static string AddNewXsltFunctionWorkflow_InvalidNamespace=>T("AddNewXsltFunctionWorkflow.InvalidNamespace");
///<summary>&quot;A language is required&quot;</summary> 
public static string AddNewXsltFunctionWorkflow_MissingActiveLanguageTitle=>T("AddNewXsltFunctionWorkflow.MissingActiveLanguageTitle");
///<summary>&quot;To create a XSLT function a language is required, but no languages have been added yet. You can add one under the System perspective.&quot;</summary> 
public static string AddNewXsltFunctionWorkflow_MissingActiveLanguageMessage=>T("AddNewXsltFunctionWorkflow.MissingActiveLanguageMessage");
///<summary>&quot;A page is required&quot;</summary> 
public static string AddNewXsltFunctionWorkflow_MissingPageTitle=>T("AddNewXsltFunctionWorkflow.MissingPageTitle");
///<summary>&quot;To create a XSLT function at least one page has to be added.&quot;</summary> 
public static string AddNewXsltFunctionWorkflow_MissingPageMessage=>T("AddNewXsltFunctionWorkflow.MissingPageMessage");
///<summary>&quot;The total length of the name and the namespace is too long (used to name the XSL file).&quot;</summary> 
public static string AddNewXsltFunctionWorkflow_TotalNameTooLang=>T("AddNewXsltFunctionWorkflow.TotalNameTooLang");
///<summary>&quot;Delete XSLT Function?&quot;</summary> 
public static string DeleteXsltFunctionWorkflow_ConfirmDeleteTitle=>T("DeleteXsltFunctionWorkflow.ConfirmDeleteTitle");
///<summary>&quot;Delete the selected XSLT?&quot;</summary> 
public static string DeleteXsltFunctionWorkflow_ConfirmDeleteMessage=>T("DeleteXsltFunctionWorkflow.ConfirmDeleteMessage");
///<summary>&quot;Cascade Delete Error&quot;</summary> 
public static string DeleteXsltFunctionWorkflow_CascadeDeleteErrorTitle=>T("DeleteXsltFunctionWorkflow.CascadeDeleteErrorTitle");
///<summary>&quot;The type is referenced by another type that does not allow cascade deletes. This operation is halted&quot;</summary> 
public static string DeleteXsltFunctionWorkflow_CascadeDeleteErrorMessage=>T("DeleteXsltFunctionWorkflow.CascadeDeleteErrorMessage");
///<summary>&quot;An XSLT function with the same name already exists.&quot;</summary> 
public static string EditXsltFunctionWorkflow_DuplicateName=>T("EditXsltFunctionWorkflow.DuplicateName");
///<summary>&quot;The method name must be non-empty&quot;</summary> 
public static string EditXsltFunctionWorkflow_EmptyMethodName=>T("EditXsltFunctionWorkflow.EmptyMethodName");
///<summary>&quot;The namespace must be non-empty&quot;</summary> 
public static string EditXsltFunctionWorkflow_NamespaceEmpty=>T("EditXsltFunctionWorkflow.NamespaceEmpty");
///<summary>&quot;The namespace must be like A.B.C - not start and end with &apos;.&apos; (period)&quot;</summary> 
public static string EditXsltFunctionWorkflow_InvalidNamespace=>T("EditXsltFunctionWorkflow.InvalidNamespace");
///<summary>&quot;XslFilePath must start with \ or /&quot;</summary> 
public static string EditXsltFunctionWorkflow_InvalidFileName=>T("EditXsltFunctionWorkflow.InvalidFileName");
///<summary>&quot;Invalid function name&quot;</summary> 
public static string EditXsltFunctionWorkflow_InvalidName=>T("EditXsltFunctionWorkflow.InvalidName");
///<summary>&quot;Cannot rename the function, file &apos;{0}&apos; already exists.&quot;</summary> 
public static string EditXsltFunctionWorkflow_CannotRenameFileExists(object parameter0)=>string.Format(T("EditXsltFunctionWorkflow.CannotRenameFileExists"), parameter0);
///<summary>&quot;The total length of the name and the namespace is too long (used to name the XSL file).&quot;</summary> 
public static string EditXsltFunctionWorkflow_TotalNameTooLang=>T("EditXsltFunctionWorkflow.TotalNameTooLang");
///<summary>&quot;Duplicate local function names&quot;</summary> 
public static string EditXsltFunctionWorkflow_SameLocalFunctionNameClashTitle=>T("EditXsltFunctionWorkflow.SameLocalFunctionNameClashTitle");
///<summary>&quot;Two or more function calls has the same local name. Change the names so that all are different.&quot;</summary> 
public static string EditXsltFunctionWorkflow_SameLocalFunctionNameClashMessage=>T("EditXsltFunctionWorkflow.SameLocalFunctionNameClashMessage");
///<summary>&quot;Add XSLT Function&quot;</summary> 
public static string XsltBasedFunctionProviderElementProvider_Add=>T("XsltBasedFunctionProviderElementProvider.Add");
///<summary>&quot;Add new XSLT function&quot;</summary> 
public static string XsltBasedFunctionProviderElementProvider_AddToolTip=>T("XsltBasedFunctionProviderElementProvider.AddToolTip");
///<summary>&quot;Edit&quot;</summary> 
public static string XsltBasedFunctionProviderElementProvider_Edit=>T("XsltBasedFunctionProviderElementProvider.Edit");
///<summary>&quot;Edit XSLT function&quot;</summary> 
public static string XsltBasedFunctionProviderElementProvider_EditToolTip=>T("XsltBasedFunctionProviderElementProvider.EditToolTip");
///<summary>&quot;Delete&quot;</summary> 
public static string XsltBasedFunctionProviderElementProvider_Delete=>T("XsltBasedFunctionProviderElementProvider.Delete");
///<summary>&quot;Delete XSLT function&quot;</summary> 
public static string XsltBasedFunctionProviderElementProvider_DeleteToolTip=>T("XsltBasedFunctionProviderElementProvider.DeleteToolTip");
///<summary>&quot;Add New XSLT Function&quot;</summary> 
public static string AddNewXsltFunctionStep1_LabelDialog=>T("AddNewXsltFunctionStep1.LabelDialog");
///<summary>&quot;Name&quot;</summary> 
public static string AddNewXsltFunctionStep1_LabelName=>T("AddNewXsltFunctionStep1.LabelName");
///<summary>&quot;&quot;</summary> 
public static string AddNewXsltFunctionStep1_HelpName=>T("AddNewXsltFunctionStep1.HelpName");
///<summary>&quot;Namespace&quot;</summary> 
public static string AddNewXsltFunctionStep1_LabelNamespace=>T("AddNewXsltFunctionStep1.LabelNamespace");
///<summary>&quot;&quot;</summary> 
public static string AddNewXsltFunctionStep1_HelpNamespace=>T("AddNewXsltFunctionStep1.HelpNamespace");
///<summary>&quot;Output type&quot;</summary> 
public static string AddNewXsltFunctionStep1_LabelOutputType=>T("AddNewXsltFunctionStep1.LabelOutputType");
///<summary>&quot;Copy from&quot;</summary> 
public static string AddNewXsltFunctionStep1_LabelCopyFrom=>T("AddNewXsltFunctionStep1.LabelCopyFrom");
///<summary>&quot;(New XSLT function)&quot;</summary> 
public static string AddNewXsltFunctionStep1_LabelCopyFromEmptyOption=>T("AddNewXsltFunctionStep1.LabelCopyFromEmptyOption");
///<summary>&quot;Settings&quot;</summary> 
public static string EditXsltFunction_LabelSettings=>T("EditXsltFunction.LabelSettings");
///<summary>&quot;Name&quot;</summary> 
public static string EditXsltFunction_LabelName=>T("EditXsltFunction.LabelName");
///<summary>&quot;&quot;</summary> 
public static string EditXsltFunction_HelpName=>T("EditXsltFunction.HelpName");
///<summary>&quot;Namespace&quot;</summary> 
public static string EditXsltFunction_LabelNamespace=>T("EditXsltFunction.LabelNamespace");
///<summary>&quot;&quot;</summary> 
public static string EditXsltFunction_HelpNamespace=>T("EditXsltFunction.HelpNamespace");
///<summary>&quot;Description&quot;</summary> 
public static string EditXsltFunction_LabelDescription=>T("EditXsltFunction.LabelDescription");
///<summary>&quot;&quot;</summary> 
public static string EditXsltFunction_HelpDescription=>T("EditXsltFunction.HelpDescription");
///<summary>&quot;Debug&quot;</summary> 
public static string EditXsltFunction_LabelDebug=>T("EditXsltFunction.LabelDebug");
///<summary>&quot;Page&quot;</summary> 
public static string EditXsltFunction_LabelPage=>T("EditXsltFunction.LabelPage");
///<summary>&quot;When debugging, this page is used as context for the rendering.&quot;</summary> 
public static string EditXsltFunction_HelpPage=>T("EditXsltFunction.HelpPage");
///<summary>&quot;Administrative&quot;</summary> 
public static string EditXsltFunction_LabelAdminitrativeScope=>T("EditXsltFunction.LabelAdminitrativeScope");
///<summary>&quot;Public&quot;</summary> 
public static string EditXsltFunction_LabelPublicScope=>T("EditXsltFunction.LabelPublicScope");
///<summary>&quot;Data scope&quot;</summary> 
public static string EditXsltFunction_LabelPageDataScope=>T("EditXsltFunction.LabelPageDataScope");
///<summary>&quot;Choose public or development version as context for the rendering.&quot;</summary> 
public static string EditXsltFunction_HelpPageDataScope=>T("EditXsltFunction.HelpPageDataScope");
///<summary>&quot;Language&quot;</summary> 
public static string EditXsltFunction_LabelActiveLocales=>T("EditXsltFunction.LabelActiveLocales");
///<summary>&quot;Select language to be used while debugging the function.&quot;</summary> 
public static string EditXsltFunction_HelpActiveLocales=>T("EditXsltFunction.HelpActiveLocales");
///<summary>&quot;Output type&quot;</summary> 
public static string EditXsltFunction_OutputType=>T("EditXsltFunction.OutputType");
///<summary>&quot;Input Parameters&quot;</summary> 
public static string EditXsltFunction_LabelInputParameters=>T("EditXsltFunction.LabelInputParameters");
///<summary>&quot;Function Calls&quot;</summary> 
public static string EditXsltFunction_LabelFunctionCalls=>T("EditXsltFunction.LabelFunctionCalls");
///<summary>&quot;Template&quot;</summary> 
public static string EditXsltFunction_LabelTemplate=>T("EditXsltFunction.LabelTemplate");
///<summary>&quot;Preview&quot;</summary> 
public static string EditXsltFunction_LabelPreview=>T("EditXsltFunction.LabelPreview");
///<summary>&quot;A Language Is Required&quot;</summary> 
public static string EditXsltFunctionWorkflow_MissingActiveLanguageTitle=>T("EditXsltFunctionWorkflow.MissingActiveLanguageTitle");
///<summary>&quot;To edit a XSLT function a language is required, but no languages have been added yet. You can add one under the System perspective.&quot;</summary> 
public static string EditXsltFunctionWorkflow_MissingActiveLanguageMessage=>T("EditXsltFunctionWorkflow.MissingActiveLanguageMessage");
///<summary>&quot;A Page Is Required&quot;</summary> 
public static string EditXsltFunctionWorkflow_MissingPageTitle=>T("EditXsltFunctionWorkflow.MissingPageTitle");
///<summary>&quot;To edit a XSLT function at least one page has to be added.&quot;</summary> 
public static string EditXsltFunctionWorkflow_MissingPageMessage=>T("EditXsltFunctionWorkflow.MissingPageMessage");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_FormControl_FunctionCallsDesigner {
///<summary>&quot;Function Properties&quot;</summary> 
public static string DialogTitle=>T("DialogTitle");
///<summary>&quot;Function result local name&quot;</summary> 
public static string FunctionLocalNameGroupLabel=>T("FunctionLocalNameGroupLabel");
///<summary>&quot;Local name&quot;</summary> 
public static string FunctionLocalNameLabel=>T("FunctionLocalNameLabel");
///<summary>&quot;If you include a function multiple times this field can help you distinguish the individual results by their local name. &quot;</summary> 
public static string FunctionLocalNameHelp=>T("FunctionLocalNameHelp");
///<summary>&quot;Parameter Value&quot;</summary> 
public static string ParameterValueLabel=>T("ParameterValueLabel");
///<summary>&quot;Select Function&quot;</summary> 
public static string AddNewFunctionDialogLabel=>T("AddNewFunctionDialogLabel");
///<summary>&quot;Select Function&quot;</summary> 
public static string SetNewFunctionDialogLabel=>T("SetNewFunctionDialogLabel");
///<summary>&quot;Value for parameter &apos;{0}&apos;&quot;</summary> 
public static string ComplexFunctionCallDialogLabel(object parameter0)=>string.Format(T("ComplexFunctionCallDialogLabel"), parameter0);
///<summary>&quot;Parameter Type&quot;</summary> 
public static string ParameterTypeLabel=>T("ParameterTypeLabel");
///<summary>&quot;Parameter Name&quot;</summary> 
public static string ParameterNameLabel=>T("ParameterNameLabel");
///<summary>&quot;Return type&quot;</summary> 
public static string ReturnTypeLabel=>T("ReturnTypeLabel");
///<summary>&quot;Validation failed&quot;</summary> 
public static string ValidationFailedAlertTitle=>T("ValidationFailedAlertTitle");
///<summary>&quot;Function &apos;{0}&apos; does not exist.&quot;</summary> 
public static string FunctionNotFound(object parameter0)=>string.Format(T("FunctionNotFound"), parameter0);
///<summary>&quot;Required parameter &apos;{0}&apos; has not been defined.&quot;</summary> 
public static string RequiredParameterNotDefined(object parameter0)=>string.Format(T("RequiredParameterNotDefined"), parameter0);
///<summary>&quot;Incorrect type cast. Parameter name: &apos;{0}&apos;, function name: &apos;{1}&apos;.&quot;</summary> 
public static string IncorrectTypeCast(object parameter0,object parameter1)=>string.Format(T("IncorrectTypeCast"), parameter0,parameter1);
///<summary>&quot;Default&quot;</summary> 
public static string ParameterTypeDefaultLabel=>T("ParameterTypeDefaultLabel");
///<summary>&quot;Constant&quot;</summary> 
public static string ParameterTypeConstantLabel=>T("ParameterTypeConstantLabel");
///<summary>&quot;Input Parameter&quot;</summary> 
public static string ParameterTypeInputParameterLabel=>T("ParameterTypeInputParameterLabel");
///<summary>&quot;Function&quot;</summary> 
public static string ParameterTypeFunctionLabel=>T("ParameterTypeFunctionLabel");
///<summary>&quot;Add New&quot;</summary> 
public static string AddNewButtonLabel=>T("AddNewButtonLabel");
///<summary>&quot;Delete&quot;</summary> 
public static string DeleteButtonLabel=>T("DeleteButtonLabel");
///<summary>&quot;Set New&quot;</summary> 
public static string SetNewButtonLabel=>T("SetNewButtonLabel");
///<summary>&quot;Source&quot;</summary> 
public static string ToolBar_LabelSource=>T("ToolBar.LabelSource");
///<summary>&quot;Design&quot;</summary> 
public static string ToolBar_LabelDesign=>T("ToolBar.LabelDesign");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.FormControl.FunctionCallsDesigner", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_FormControl_FunctionParameterDesigner {
///<summary>&quot;Add New&quot;</summary> 
public static string AddNewButtonLabel=>T("AddNewButtonLabel");
///<summary>&quot;Delete&quot;</summary> 
public static string DeleteButtonLabel=>T("DeleteButtonLabel");
///<summary>&quot;List of input parameters&quot;</summary> 
public static string TreeRootNodeLabel=>T("TreeRootNodeLabel");
///<summary>&quot;Parameter naming and help&quot;</summary> 
public static string ParameterNamingGroupLabel=>T("ParameterNamingGroupLabel");
///<summary>&quot;Parameter name&quot;</summary> 
public static string Name=>T("Name");
///<summary>&quot;The name of the parameter. The name is used by the system to identify this parameter. Names must be unique and may not contain spaces and other special characters. Use names like &apos;Title&apos;, &apos;StartDate&apos;, &apos;LargeImage&apos; etc.&quot;</summary> 
public static string NameHelp=>T("NameHelp");
///<summary>&quot;Label&quot;</summary> 
public static string Label=>T("Label");
///<summary>&quot;The text that users should see when specifying a value for this parameter. This is the &apos;human name&apos; for the parameter.&quot;</summary> 
public static string LabelHelp=>T("LabelHelp");
///<summary>&quot;Help&quot;</summary> 
public static string Help=>T("Help");
///<summary>&quot;Write a short text that tells the user what to do with the parameter.&quot;</summary> 
public static string HelpHelp=>T("HelpHelp");
///<summary>&quot;Parameter type and values&quot;</summary> 
public static string ParameterTypeValueGroupLabel=>T("ParameterTypeValueGroupLabel");
///<summary>&quot;Parameter type&quot;</summary> 
public static string Type=>T("Type");
///<summary>&quot;The type of this parameter.&quot;</summary> 
public static string TypeHelp=>T("TypeHelp");
///<summary>&quot;Default value&quot;</summary> 
public static string DefaultValue=>T("DefaultValue");
///<summary>&quot;You can specify a default value for this parameter. If a parameter has a default value, users are not required to specify it when calling the function.&quot;</summary> 
public static string DefaultValueHelp=>T("DefaultValueHelp");
///<summary>&quot;Specify default value&quot;</summary> 
public static string DefaultValueSpecify=>T("DefaultValueSpecify");
///<summary>&quot;Edit default value&quot;</summary> 
public static string DefaultValueEdit=>T("DefaultValueEdit");
///<summary>&quot;Parameter Default Value&quot;</summary> 
public static string DefaultValueDialogLabel=>T("DefaultValueDialogLabel");
///<summary>&quot;Test value&quot;</summary> 
public static string TestValue=>T("TestValue");
///<summary>&quot;When previewing you can test with different input parameter values using this field. If this is left blank, the default value will be used for previews.&quot;</summary> 
public static string TestValueHelp=>T("TestValueHelp");
///<summary>&quot;Specify test value&quot;</summary> 
public static string TestValueSpecify=>T("TestValueSpecify");
///<summary>&quot;Edit test value&quot;</summary> 
public static string TestValueEdit=>T("TestValueEdit");
///<summary>&quot;Parameter Test Value&quot;</summary> 
public static string TestValueDialogLabel=>T("TestValueDialogLabel");
///<summary>&quot;Parameter presentation&quot;</summary> 
public static string ParameterPresentationGroupLabel=>T("ParameterPresentationGroupLabel");
///<summary>&quot;Widget&quot;</summary> 
public static string Widget=>T("Widget");
///<summary>&quot;You can select which type of input widget (like a textbox) to use when specifying a value for this parameter. Widgets are only available for simple types.&quot;</summary> 
public static string WidgetHelp=>T("WidgetHelp");
///<summary>&quot;(no widget specified)&quot;</summary> 
public static string NoWidgetSpecifiedLabel=>T("NoWidgetSpecifiedLabel");
///<summary>&quot;Parameter Widget&quot;</summary> 
public static string WidgetDialogLabel=>T("WidgetDialogLabel");
///<summary>&quot;Position&quot;</summary> 
public static string Position=>T("Position");
///<summary>&quot;Last&quot;</summary> 
public static string PositionLast=>T("PositionLast");
///<summary>&quot;The position of the parameter. This controls the order of the parameters.&quot;</summary> 
public static string PositionHelp=>T("PositionHelp");
///<summary>&quot;Remember to specify a widget...&quot;</summary> 
public static string SpecifyWidgetTip=>T("SpecifyWidgetTip");
///<summary>&quot;The specified name is not valid.&quot;</summary> 
public static string FieldNameSyntaxInvalid=>T("FieldNameSyntaxInvalid");
///<summary>&quot;Can not save... Another parameter has the same name. Please change the name.&quot;</summary> 
public static string CannotSave=>T("CannotSave");
///<summary>&quot;Invalid name. Parameter names can not contain spaces. You can write a readable name in the Label field below.&quot;</summary> 
public static string SpaceInNameError=>T("SpaceInNameError");
///<summary>&quot;Parameter names can not be empty. Please specify a name.&quot;</summary> 
public static string NameEmptyError=>T("NameEmptyError");
///<summary>&quot;Another parameter uses this name. Parameter names must be unique.&quot;</summary> 
public static string NameAlreadyInUseError=>T("NameAlreadyInUseError");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.FormControl.FunctionParameterDesigner", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_FormControl_TypeFieldDesigner {
///<summary>&quot;Basic&quot;</summary> 
public static string BasicTabLabel=>T("BasicTabLabel");
///<summary>&quot;Advanced&quot;</summary> 
public static string AdvancedTabLabel=>T("AdvancedTabLabel");
///<summary>&quot;Add New&quot;</summary> 
public static string AddNewButtonLabel=>T("AddNewButtonLabel");
///<summary>&quot;Delete&quot;</summary> 
public static string DeleteButtonLabel=>T("DeleteButtonLabel");
///<summary>&quot;Datatype Fields&quot;</summary> 
public static string LabelDataTypeFields=>T("LabelDataTypeFields");
///<summary>&quot;Key field properties&quot;</summary> 
public static string KeyFieldDetailsGroupLabel=>T("KeyFieldDetailsGroupLabel");
///<summary>&quot;Key field type&quot;</summary> 
public static string KeyFieldType=>T("KeyFieldType");
///<summary>&quot;The data type of the key field. Guid fields feature optimal performance, string key fields are usefull when the id values have to be exposed in urls.&quot;</summary> 
public static string KeyFieldTypeHelp=>T("KeyFieldTypeHelp");
///<summary>&quot;Field properties&quot;</summary> 
public static string FieldDetailsGroupLabel=>T("FieldDetailsGroupLabel");
///<summary>&quot;Name&quot;</summary> 
public static string Name=>T("Name");
///<summary>&quot;The name of the field is used by the system to identify this field. Names must be unique and can not contain spaces and other special characters. Use names like &apos;Title&apos;, &apos;StartDate&apos;, &apos;LargeImage&apos; etc.&quot;</summary> 
public static string NameHelp=>T("NameHelp");
///<summary>&quot;Label&quot;</summary> 
public static string Label=>T("Label");
///<summary>&quot;Label text are showed to users when adding a new item based on the datatype.&quot;</summary> 
public static string LabelHelp=>T("LabelHelp");
///<summary>&quot;Help&quot;</summary> 
public static string Help=>T("Help");
///<summary>&quot;Use this entry for a short help text to the user.&quot;</summary> 
public static string HelpHelp=>T("HelpHelp");
///<summary>&quot;Field type and requirements&quot;</summary> 
public static string FieldTypeGroupLabel=>T("FieldTypeGroupLabel");
///<summary>&quot;Field type&quot;</summary> 
public static string FieldType=>T("FieldType");
///<summary>&quot;Select a data type for the field. The type determine which kind of data the field can hold.&quot;</summary> 
public static string FieldTypeHelp=>T("FieldTypeHelp");
///<summary>&quot;String&quot;</summary> 
public static string System_String=>T("System.String");
///<summary>&quot;Integer&quot;</summary> 
public static string System_Int32=>T("System.Int32");
///<summary>&quot;Decimal number&quot;</summary> 
public static string System_Decimal=>T("System.Decimal");
///<summary>&quot;Date&quot;</summary> 
public static string System_DateTime=>T("System.DateTime");
///<summary>&quot;Boolean&quot;</summary> 
public static string System_Boolean=>T("System.Boolean");
///<summary>&quot;Unique Identifier (GUID)&quot;</summary> 
public static string System_Guid=>T("System.Guid");
///<summary>&quot;Data reference&quot;</summary> 
public static string Reference=>T("Reference");
///<summary>&quot;Use this field to further configure your selected type.&quot;</summary> 
public static string TypeDetailsHelp=>T("TypeDetailsHelp");
///<summary>&quot;Optional&quot;</summary> 
public static string Optional=>T("Optional");
///<summary>&quot;Optional fields may be left blank.&quot;</summary> 
public static string OptionalHelp=>T("OptionalHelp");
///<summary>&quot;No&quot;</summary> 
public static string OptionalFalseLabel=>T("OptionalFalseLabel");
///<summary>&quot;Yes&quot;</summary> 
public static string OptionalTrueLabel=>T("OptionalTrueLabel");
///<summary>&quot;Validation rules&quot;</summary> 
public static string ValidationRules=>T("ValidationRules");
///<summary>&quot;You can specify strict rules on the data that is entered in this field, i.e. &quot;must be at least 5 characters long&quot;, &quot;must be a valid e-mail address&quot;, &quot;must be a date in the past&quot; etc.&quot;</summary> 
public static string ValidationRulesHelp=>T("ValidationRulesHelp");
///<summary>&quot;Add validation rules...&quot;</summary> 
public static string ValidationRulesAdd=>T("ValidationRulesAdd");
///<summary>&quot;Edit validation rules&quot;</summary> 
public static string ValidationRulesEdit=>T("ValidationRulesEdit");
///<summary>&quot;Field Validation Rules Configuration&quot;</summary> 
public static string ValidationRulesDialogLabel=>T("ValidationRulesDialogLabel");
///<summary>&quot;Field validation&quot;</summary> 
public static string FieldValidationGroupLabel=>T("FieldValidationGroupLabel");
///<summary>&quot;Form field presentation&quot;</summary> 
public static string FieldPresentationGroupLabel=>T("FieldPresentationGroupLabel");
///<summary>&quot;Structural presentation&quot;</summary> 
public static string FieldStructureGroupLabel=>T("FieldStructureGroupLabel");
///<summary>&quot;Widget type&quot;</summary> 
public static string Widget=>T("Widget");
///<summary>&quot;You can select which type of input widget (like a textbox) to use when editing this field.&quot;</summary> 
public static string WidgetHelp=>T("WidgetHelp");
///<summary>&quot;Field Widget Configuration&quot;</summary> 
public static string WidgetDialogLabel=>T("WidgetDialogLabel");
///<summary>&quot;Position&quot;</summary> 
public static string Position=>T("Position");
///<summary>&quot;Last&quot;</summary> 
public static string PositionLast=>T("PositionLast");
///<summary>&quot;The position of the field. This controls the order of the fields.&quot;</summary> 
public static string PositionHelp=>T("PositionHelp");
///<summary>&quot;Tree grouping&quot;</summary> 
public static string GroupByPriority=>T("GroupByPriority");
///<summary>&quot;(no grouping)...&quot;</summary> 
public static string GroupByPriorityNone=>T("GroupByPriorityNone");
///<summary>&quot;Group by this field&quot;</summary> 
public static string GroupByPriorityFirst=>T("GroupByPriorityFirst");
///<summary>&quot;Group as {0}. priority&quot;</summary> 
public static string GroupByPriorityN(object parameter0)=>string.Format(T("GroupByPriorityN"), parameter0);
///<summary>&quot;You can specify that a field should be used to group data - this can improve readability when viewing long lists. Use priority when multiple fields are used for grouping.&quot;</summary> 
public static string GroupByPriorityHelp=>T("GroupByPriorityHelp");
///<summary>&quot;Tree ordering&quot;</summary> 
public static string TreeOrdering=>T("TreeOrdering");
///<summary>&quot;(no ordering)...&quot;</summary> 
public static string TreeOrderingNone=>T("TreeOrderingNone");
///<summary>&quot;Order ascending (A-Z)&quot;</summary> 
public static string TreeOrderingFirstAscending=>T("TreeOrderingFirstAscending");
///<summary>&quot;Order descending (Z-A)&quot;</summary> 
public static string TreeOrderingFirstDescending=>T("TreeOrderingFirstDescending");
///<summary>&quot;Order {0}. ascending&quot;</summary> 
public static string TreeOrderingNAscending(object parameter0)=>string.Format(T("TreeOrderingNAscending"), parameter0);
///<summary>&quot;Order {0}. descending&quot;</summary> 
public static string TreeOrderingNDescending(object parameter0)=>string.Format(T("TreeOrderingNDescending"), parameter0);
///<summary>&quot;You can specify that a field should be used to order data in the tree view - this can improve readability when a field is used to position elements on the website.&quot;</summary> 
public static string TreeOrderingHelp=>T("TreeOrderingHelp");
///<summary>&quot;Is title field&quot;</summary> 
public static string IsTitleField=>T("IsTitleField");
///<summary>&quot;Check this if you wish this field to be used as the title field. Title fields are used when listing data, like in the tree to the left.&quot;</summary> 
public static string IsTitleFieldHelp=>T("IsTitleFieldHelp");
///<summary>&quot;Use this as title field in lists&quot;</summary> 
public static string IsTitleFieldLabel=>T("IsTitleFieldLabel");
///<summary>&quot;Field default value&quot;</summary> 
public static string DefaultValueGroupLabel=>T("DefaultValueGroupLabel");
///<summary>&quot;Default value&quot;</summary> 
public static string DefaultValue=>T("DefaultValue");
///<summary>&quot;You can define a default value for this field.&quot;</summary> 
public static string DefaultValueHelp=>T("DefaultValueHelp");
///<summary>&quot;Field default value configuration&quot;</summary> 
public static string DefaultValueDialogLabel=>T("DefaultValueDialogLabel");
///<summary>&quot;Data url&quot;</summary> 
public static string DataUrlGroupLabel=>T("DataUrlGroupLabel");
///<summary>&quot;Field appears in data url&quot;</summary> 
public static string AppearsInUrlLabel=>T("AppearsInUrlLabel");
///<summary>&quot;Use in data urls&quot;</summary> 
public static string AppearsInUrlItemLabel=>T("AppearsInUrlItemLabel");
///<summary>&quot;When checked the field will appear in data urls&quot;</summary> 
public static string AppearsInUrlHelp=>T("AppearsInUrlHelp");
///<summary>&quot;Order&quot;</summary> 
public static string DataUrlOrderLabel=>T("DataUrlOrderLabel");
///<summary>&quot;Order in which the field appear in data url route&quot;</summary> 
public static string DataUrlOrderHelp=>T("DataUrlOrderHelp");
///<summary>&quot;Format&quot;</summary> 
public static string DataUrlDateFormatLabel=>T("DataUrlDateFormatLabel");
///<summary>&quot;Chose in what format the date field will appear in url&quot;</summary> 
public static string DataUrlDateFormatHelp=>T("DataUrlDateFormatHelp");
///<summary>&quot;Year&quot;</summary> 
public static string DataUrlDateFormat_Year=>T("DataUrlDateFormat_Year");
///<summary>&quot;Month&quot;</summary> 
public static string DataUrlDateFormat_Month=>T("DataUrlDateFormat_Month");
///<summary>&quot;Day&quot;</summary> 
public static string DataUrlDateFormat_Day=>T("DataUrlDateFormat_Day");
///<summary>&quot;String maximum length&quot;</summary> 
public static string StringMaximumLength=>T("StringMaximumLength");
///<summary>&quot;16 character maximum&quot;</summary> 
public static string _16CharMax=>T("16CharMax");
///<summary>&quot;32 character maximum&quot;</summary> 
public static string _32CharMax=>T("32CharMax");
///<summary>&quot;64 character maximum&quot;</summary> 
public static string _64CharMax=>T("64CharMax");
///<summary>&quot;128 character maximum&quot;</summary> 
public static string _128CharMax=>T("128CharMax");
///<summary>&quot;256 character maximum&quot;</summary> 
public static string _256CharMax=>T("256CharMax");
///<summary>&quot;512 character maximum&quot;</summary> 
public static string _512CharMax=>T("512CharMax");
///<summary>&quot;1024 character maximum&quot;</summary> 
public static string _1024CharMax=>T("1024CharMax");
///<summary>&quot;Unlimited length&quot;</summary> 
public static string Unlimited=>T("Unlimited");
///<summary>&quot;Decimal number format&quot;</summary> 
public static string DecimalNumberFormat=>T("DecimalNumberFormat");
///<summary>&quot;1 decimal place&quot;</summary> 
public static string _1DecimalPlace=>T("1DecimalPlace");
///<summary>&quot;{0} decimal places&quot;</summary> 
public static string nDecimalPlaces(object parameter0)=>string.Format(T("nDecimalPlaces"), parameter0);
///<summary>&quot;Reference Type&quot;</summary> 
public static string ReferenceType=>T("ReferenceType");
///<summary>&quot;The specified name is not valid.&quot;</summary> 
public static string FieldNameSyntaxInvalid=>T("FieldNameSyntaxInvalid");
///<summary>&quot;Can not save... Another Field has the same name. Please change the name.&quot;</summary> 
public static string CannotSave=>T("CannotSave");
///<summary>&quot;Invalid name. Data field names can not contain spaces. You can write a readable name in the Label field below.&quot;</summary> 
public static string SpaceInNameError=>T("SpaceInNameError");
///<summary>&quot;Data field names can not be empty. Please specify a name.&quot;</summary> 
public static string NameEmptyError=>T("NameEmptyError");
///<summary>&quot;Another field uses this name. Data field names must be unique.&quot;</summary> 
public static string NameAlreadyInUseError=>T("NameAlreadyInUseError");
///<summary>&quot;The selected type can not be optional.&quot;</summary> 
public static string NotAnOptionalTypeError=>T("NotAnOptionalTypeError");
///<summary>&quot;Remember to specify a widget...&quot;</summary> 
public static string NoWidgetSelected=>T("NoWidgetSelected");
///<summary>&quot;(no widget specified)&quot;</summary> 
public static string NoWidgetSelectedLabel=>T("NoWidgetSelectedLabel");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.FormControl.TypeFieldDesigner", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_PageBrowser {
///<summary>&quot;Page source&quot;</summary> 
public static string Menu_ViewSource=>T("Menu.ViewSource");
///<summary>&quot;View mode&quot;</summary> 
public static string Menu_ViewMode=>T("Menu.ViewMode");
///<summary>&quot;Back&quot;</summary> 
public static string ContextMenu_Back=>T("ContextMenu.Back");
///<summary>&quot;Forward&quot;</summary> 
public static string ContextMenu_Forward=>T("ContextMenu.Forward");
///<summary>&quot;Refresh&quot;</summary> 
public static string ContextMenu_Refresh=>T("ContextMenu.Refresh");
///<summary>&quot;View Page Source&quot;</summary> 
public static string ContextMenu_ViewSource=>T("ContextMenu.ViewSource");
///<summary>&quot;Go back one page&quot;</summary> 
public static string ToolBarButton_Back_ToolTip=>T("ToolBarButton.Back.ToolTip");
///<summary>&quot;Go forward one page&quot;</summary> 
public static string ToolBarButton_Forward_ToolTip=>T("ToolBarButton.Forward.ToolTip");
///<summary>&quot;Refresh page&quot;</summary> 
public static string ToolBarButton_Refresh_ToolTip=>T("ToolBarButton.Refresh.ToolTip");
///<summary>&quot;Show Tree&quot;</summary> 
public static string ToolBarButton_TreeView_ToolTip=>T("ToolBarButton.TreeView.ToolTip");
///<summary>&quot;Go to the address in the location bar&quot;</summary> 
public static string ToolBarButton_Go_ToolTip=>T("ToolBarButton.Go.ToolTip");
///<summary>&quot;Go to the Start page&quot;</summary> 
public static string ToolBarButton_Home_ToolTip=>T("ToolBarButton.Home.ToolTip");
///<summary>&quot;Access denied&quot;</summary> 
public static string AddressBar_Invalid_DialogTitle_External=>T("AddressBar.Invalid.DialogTitle.External");
///<summary>&quot;External URL cannot loaded.&quot;</summary> 
public static string AddressBar_Invalid_DialogText_External=>T("AddressBar.Invalid.DialogText.External");
///<summary>&quot;Bad URL&quot;</summary> 
public static string AddressBar_Invalid_DialogTitle_BadRequest=>T("AddressBar.Invalid.DialogTitle.BadRequest");
///<summary>&quot;The URL is invalid and cannot be loaded.&quot;</summary> 
public static string AddressBar_Invalid_DialogText_BadRequest=>T("AddressBar.Invalid.DialogText.BadRequest");
///<summary>&quot;Not authorized&quot;</summary> 
public static string AddressBar_Invalid_DialogTitle_Unauthorized=>T("AddressBar.Invalid.DialogTitle.Unauthorized");
///<summary>&quot;You are not authorized to view the page on specified URL.&quot;</summary> 
public static string AddressBar_Invalid_DialogText_Unauthorized=>T("AddressBar.Invalid.DialogText.Unauthorized");
///<summary>&quot;Page not found&quot;</summary> 
public static string AddressBar_Invalid_DialogTitle_NotFound=>T("AddressBar.Invalid.DialogTitle.NotFound");
///<summary>&quot;Page not found on the specified URL.&quot;</summary> 
public static string AddressBar_Invalid_DialogText_NotFound=>T("AddressBar.Invalid.DialogText.NotFound");
///<summary>&quot;Server error&quot;</summary> 
public static string AddressBar_Invalid_DialogTitle_InternalError=>T("AddressBar.Invalid.DialogTitle.InternalError");
///<summary>&quot;The server has reported an error on the specified URL. The page cannot be loaded.&quot;</summary> 
public static string AddressBar_Invalid_DialogText_InternalError=>T("AddressBar.Invalid.DialogText.InternalError");
///<summary>&quot;Page not loaded&quot;</summary> 
public static string AddressBar_Invalid_DialogTitle_Default=>T("AddressBar.Invalid.DialogTitle.Default");
///<summary>&quot;An error prevents the URL from being loaded.&quot;</summary> 
public static string AddressBar_Invalid_DialogText_Default=>T("AddressBar.Invalid.DialogText.Default");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.PageBrowser", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_SEOAssistant {
///<summary>&quot;SEO Assistant&quot;</summary> 
public static string SEOAssistant=>T("SEOAssistant");
///<summary>&quot;Search engine optimization&quot;</summary> 
public static string SEOAssistant_ToolTip=>T("SEOAssistant.ToolTip");
///<summary>&quot;Generate a page preview to compute the SEO indication.&quot;</summary> 
public static string IntroText=>T("IntroText");
///<summary>&quot;Result&quot;</summary> 
public static string TabResult=>T("TabResult");
///<summary>&quot;Keywords&quot;</summary> 
public static string TabKeywords=>T("TabKeywords");
///<summary>&quot;Keywords found in page preview:&quot;</summary> 
public static string ResultHeading=>T("ResultHeading");
///<summary>&quot;No keywords configured.&quot;</summary> 
public static string NoKeywordsWarning=>T("NoKeywordsWarning");
///<summary>&quot;In title&quot;</summary> 
public static string isInTitle=>T("isInTitle");
///<summary>&quot;In URL&quot;</summary> 
public static string isInURL=>T("isInURL");
///<summary>&quot;In menu title&quot;</summary> 
public static string isInMenuTitle=>T("isInMenuTitle");
///<summary>&quot;In description&quot;</summary> 
public static string isInDescription=>T("isInDescription");
///<summary>&quot;In heading&quot;</summary> 
public static string isInHeading=>T("isInHeading");
///<summary>&quot;In content&quot;</summary> 
public static string isInContent=>T("isInContent");
///<summary>&quot;No keywords found in page preview&quot;</summary> 
public static string NoKeywords=>T("NoKeywords");
///<summary>&quot;Failed to analyze the keywords because the markup is not valid&quot;</summary> 
public static string IncorrectHtml=>T("IncorrectHtml");
///<summary>&quot;Add SEO word ...&quot;</summary> 
public static string AddKeywordInputPlaceholder=>T("AddKeywordInputPlaceholder");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.SEOAssistant", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_SourceEditor {
///<summary>&quot;Retrieved on SourceEditorBinding startup to make sure strings are loaded :)&quot;</summary> 
public static string Preload_Key=>T("Preload.Key");
///<summary>&quot;Invalid XHTML&quot;</summary> 
public static string Invalid_HTML_DialogTitle=>T("Invalid.HTML.DialogTitle");
///<summary>&quot;The root &lt;html&gt; tag is missing.&quot;</summary> 
public static string Invalid_HTML_MissingHtml=>T("Invalid.HTML.MissingHtml");
///<summary>&quot;The &lt;head&gt; tag is missing.&quot;</summary> 
public static string Invalid_HTML_MissingHead=>T("Invalid.HTML.MissingHead");
///<summary>&quot;The &lt;body&gt; tag is missing.&quot;</summary> 
public static string Invalid_HTML_MissingBody=>T("Invalid.HTML.MissingBody");
///<summary>&quot;The &lt;head&gt; tag must precede &lt;body&gt;.&quot;</summary> 
public static string Invalid_HTML_HeadBodyIndex=>T("Invalid.HTML.HeadBodyIndex");
///<summary>&quot;The root namespace is wrong.&quot;</summary> 
public static string Invalid_HTML_NamespaceURI=>T("Invalid.HTML.NamespaceURI");
///<summary>&quot;Only one &lt;body&gt; tag allowed.&quot;</summary> 
public static string Invalid_HTML_MultipleBody=>T("Invalid.HTML.MultipleBody");
///<summary>&quot;Only one &lt;head&gt; tag allowed.&quot;</summary> 
public static string Invalid_HTML_MultipleHead=>T("Invalid.HTML.MultipleHead");
///<summary>&quot;The root &lt;html&gt; tag can only have &lt;head&gt; and &lt;body&gt; tags as children.&quot;</summary> 
public static string Invalid_HTML_NotAllowedHtmlChild=>T("Invalid.HTML.NotAllowedHtmlChild");
///<summary>&quot;Source format aborted&quot;</summary> 
public static string Format_XML_ErrorDialog_Title=>T("Format.XML.ErrorDialog.Title");
///<summary>&quot;XML source formatting requires a well-formed document structure.&quot;</summary> 
public static string Format_XML_ErrorDialog_Text=>T("Format.XML.ErrorDialog.Text");
///<summary>&quot;Plain Edit&quot;</summary> 
public static string Switch_PlainEdit_Label=>T("Switch.PlainEdit.Label");
///<summary>&quot;No syntax highlight, faster performance&quot;</summary> 
public static string Switch_PlainEdit_ToolTip=>T("Switch.PlainEdit.ToolTip");
///<summary>&quot;Colored Edit&quot;</summary> 
public static string Switch_ColoredEdit_Label=>T("Switch.ColoredEdit.Label");
///<summary>&quot;Syntax highlight, slower performance&quot;</summary> 
public static string Switch_ColoredEdit_ToolTip=>T("Switch.ColoredEdit.ToolTip");
///<summary>&quot;Insert&quot;</summary> 
public static string Toolbar_Insert_Label=>T("Toolbar.Insert.Label");
///<summary>&quot;Format&quot;</summary> 
public static string Toolbar_Format_Label=>T("Toolbar.Format.Label");
///<summary>&quot;Format XML source&quot;</summary> 
public static string Toolbar_Format_ToolTip=>T("Toolbar.Format.ToolTip");
///<summary>&quot;Page URL&quot;</summary> 
public static string Insert_PageURL_Label=>T("Insert.PageURL.Label");
///<summary>&quot;Image URL&quot;</summary> 
public static string Insert_ImageURL_Label=>T("Insert.ImageURL.Label");
///<summary>&quot;Media URL&quot;</summary> 
public static string Insert_MediaURL_Label=>T("Insert.MediaURL.Label");
///<summary>&quot;Frontend URL&quot;</summary> 
public static string Insert_FrontendURL_Label=>T("Insert.FrontendURL.Label");
///<summary>&quot;Function Markup&quot;</summary> 
public static string Insert_FunctionMarkup_Label=>T("Insert.FunctionMarkup.Label");
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.SourceEditor", key);
        }
} 

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	   public static class Composite_Web_VisualEditor {
///<summary>&quot;Retrieved on VisualEditorBinding startup to make sure strings are loaded :)&quot;</summary> 
public static string Preload_Key=>T("Preload.Key");
///<summary>&quot;Strong text&quot;</summary> 
public static string ToolBar_ToolTipStrong=>T("ToolBar.ToolTipStrong");
///<summary>&quot;Emphasize text&quot;</summary> 
public static string ToolBar_ToolTipEmphasize=>T("ToolBar.ToolTipEmphasize");
///<summary>&quot;Underline text&quot;</summary> 
public static string ToolBar_ToolTipUnderline=>T("ToolBar.ToolTipUnderline");
///<summary>&quot;Strike text&quot;</summary> 
public static string ToolBar_ToolTipStrike=>T("ToolBar.ToolTipStrike");
///<summary>&quot;Align left&quot;</summary> 
public static string ToolBar_ToolTipAlignLeft=>T("ToolBar.ToolTipAlignLeft");
///<summary>&quot;Align right&quot;</summary> 
public static string ToolBar_ToolTipAlignRight=>T("ToolBar.ToolTipAlignRight");
///<summary>&quot;Justify left&quot;</summary> 
public static string ToolBar_ToolTipJustifyLeft=>T("ToolBar.ToolTipJustifyLeft");
///<summary>&quot;Justify right&quot;</summary> 
public static string ToolBar_ToolTipJustifyRight=>T("ToolBar.ToolTipJustifyRight");
///<summary>&quot;Justify center&quot;</summary> 
public static string ToolBar_ToolTipJustifyCenter=>T("ToolBar.ToolTipJustifyCenter");
///<summary>&quot;Justify full&quot;</summary> 
public static string ToolBar_ToolTipJustifyFull=>T("ToolBar.ToolTipJustifyFull");
///<summary>&quot;Unordered list&quot;</summary> 
public static string ToolBar_ToolTipUnorderedList=>T("ToolBar.ToolTipUnorderedList");
///<summary>&quot;Ordered list&quot;</summary> 
public static string ToolBar_ToolTipOrderedList=>T("ToolBar.ToolTipOrderedList");
///<summary>&quot;Link&quot;</summary> 
public static string ToolBar_ToolTipLink=>T("ToolBar.ToolTipLink");
///<summary>&quot;Delete link&quot;</summary> 
public static string ToolBar_ToolTipDeleteLink=>T("ToolBar.ToolTipDeleteLink");
///<summary>&quot;Cleanup messy code&quot;</summary> 
public static string ToolBar_ToolTipCleanup=>T("ToolBar.ToolTipCleanup");
///<summary>&quot;Undo&quot;</summary> 
public static string ToolBar_ToolTipUndo=>T("ToolBar.ToolTipUndo");
///<summary>&quot;Redo&quot;</summary> 
public static string ToolBar_ToolTipRedo=>T("ToolBar.ToolTipRedo");
///<summary>&quot;Source&quot;</summary> 
public static string ToolBar_LabelSource=>T("ToolBar.LabelSource");
///<summary>&quot;Visual&quot;</summary> 
public static string ToolBar_LabelWysiwyg=>T("ToolBar.LabelWysiwyg");
///<summary>&quot;Paragraph&quot;</summary> 
public static string FormatSelector_LabelParagraph=>T("FormatSelector.LabelParagraph");
///<summary>&quot;Address&quot;</summary> 
public static string FormatSelector_LabelAddress=>T("FormatSelector.LabelAddress");
///<summary>&quot;Blockquote&quot;</summary> 
public static string FormatSelector_LabelBlockQuote=>T("FormatSelector.LabelBlockQuote");
///<summary>&quot;Division&quot;</summary> 
public static string FormatSelector_LabelDivision=>T("FormatSelector.LabelDivision");
///<summary>&quot;Heading 1&quot;</summary> 
public static string FormatSelector_LabelHeading1=>T("FormatSelector.LabelHeading1");
///<summary>&quot;Heading 2&quot;</summary> 
public static string FormatSelector_LabelHeading2=>T("FormatSelector.LabelHeading2");
///<summary>&quot;Heading 3&quot;</summary> 
public static string FormatSelector_LabelHeading3=>T("FormatSelector.LabelHeading3");
///<summary>&quot;Heading 4&quot;</summary> 
public static string FormatSelector_LabelHeading4=>T("FormatSelector.LabelHeading4");
///<summary>&quot;Heading 5&quot;</summary> 
public static string FormatSelector_LabelHeading5=>T("FormatSelector.LabelHeading5");
///<summary>&quot;Heading 6&quot;</summary> 
public static string FormatSelector_LabelHeading6=>T("FormatSelector.LabelHeading6");
///<summary>&quot;(None)&quot;</summary> 
public static string ClassSelector_LabelNone=>T("ClassSelector.LabelNone");
///<summary>&quot;Insert&quot;</summary> 
public static string ContextMenu_LabelInsert=>T("ContextMenu.LabelInsert");
///<summary>&quot;Paste&quot;</summary> 
public static string ContextMenu_LabelPaste=>T("ContextMenu.LabelPaste");
///<summary>&quot;Link&quot;</summary> 
public static string ContextMenu_LabelLink=>T("ContextMenu.LabelLink");
///<summary>&quot;Unlink&quot;</summary> 
public static string ContextMenu_LabelUnLink=>T("ContextMenu.LabelUnLink");
///<summary>&quot;Link Properties&quot;</summary> 
public static string ContextMenu_LabelLinkProperties=>T("ContextMenu.LabelLinkProperties");
///<summary>&quot;Table…&quot;</summary> 
public static string ContextMenu_LabelTable=>T("ContextMenu.LabelTable");
///<summary>&quot;Manage Table&quot;</summary> 
public static string ContextMenu_LabelTableManage=>T("ContextMenu.LabelTableManage");
///<summary>&quot;Image…&quot;</summary> 
public static string ContextMenu_LabelImage=>T("ContextMenu.LabelImage");
///<summary>&quot;As Simple Text…&quot;</summary> 
public static string ContextMenu_LabelAsText=>T("ContextMenu.LabelAsText");
///<summary>&quot;Field&quot;</summary> 
public static string ContextMenu_LabelField=>T("ContextMenu.LabelField");
///<summary>&quot;Delete Field&quot;</summary> 
public static string ContextMenu_LabelFieldDelete=>T("ContextMenu.LabelFieldDelete");
///<summary>&quot;Function…&quot;</summary> 
public static string ContextMenu_LabelRendering=>T("ContextMenu.LabelRendering");
///<summary>&quot;Character…&quot;</summary> 
public static string ContextMenu_LabelCharacter=>T("ContextMenu.LabelCharacter");
///<summary>&quot;Image Properties…&quot;</summary> 
public static string ContextMenu_LabelImageProperties=>T("ContextMenu.LabelImageProperties");
///<summary>&quot;Function Properties…&quot;</summary> 
public static string ContextMenu_LabelRenderingProperties=>T("ContextMenu.LabelRenderingProperties");
///<summary>&quot;Cut Row&quot;</summary> 
public static string ContextMenu_LabelCutRow=>T("ContextMenu.LabelCutRow");
///<summary>&quot;Copy Row&quot;</summary> 
public static string ContextMenu_LabelCopyRow=>T("ContextMenu.LabelCopyRow");
///<summary>&quot;Paste Row&quot;</summary> 
public static string ContextMenu_LabelPasteRow=>T("ContextMenu.LabelPasteRow");
///<summary>&quot;Before&quot;</summary> 
public static string ContextMenu_LabelBefore=>T("ContextMenu.LabelBefore");
///<summary>&quot;After&quot;</summary> 
public static string ContextMenu_LabelAfter=>T("ContextMenu.LabelAfter");
///<summary>&quot;Table Properties&quot;</summary> 
public static string ContextMenu_LabelTableProperties=>T("ContextMenu.LabelTableProperties");
///<summary>&quot;Cell Properties&quot;</summary> 
public static string ContextMenu_LabelCellProperties=>T("ContextMenu.LabelCellProperties");
///<summary>&quot;Row Properties&quot;</summary> 
public static string ContextMenu_LabelRowProperties=>T("ContextMenu.LabelRowProperties");
///<summary>&quot;Insert Row&quot;</summary> 
public static string ContextMenu_LabelInsertRow=>T("ContextMenu.LabelInsertRow");
///<summary>&quot;Delete Row&quot;</summary> 
public static string ContextMenu_LabelDeleteRow=>T("ContextMenu.LabelDeleteRow");
///<summary>&quot;Insert Column&quot;</summary> 
public static string ContextMenu_LabelInsertcolumn=>T("ContextMenu.LabelInsertcolumn");
///<summary>&quot;Delete Column&quot;</summary> 
public static string ContextMenu_LabelDeleteColumn=>T("ContextMenu.LabelDeleteColumn");
///<summary>&quot;Merge Table Cells&quot;</summary> 
public static string ContextMenu_LabelMergeTableCells=>T("ContextMenu.LabelMergeTableCells");
///<summary>&quot;Split Merged Cells&quot;</summary> 
public static string ContextMenu_LabelSplitMergedCells=>T("ContextMenu.LabelSplitMergedCells");
///<summary>&quot;Delete Table&quot;</summary> 
public static string ContextMenu_LabelDeleteTable=>T("ContextMenu.LabelDeleteTable");
///<summary>&quot;Align Image&quot;</summary> 
public static string ContextMenu_LabelAlignImage=>T("ContextMenu.LabelAlignImage");
///<summary>&quot;Right&quot;</summary> 
public static string ContextMenu_LabelAlignImageRight=>T("ContextMenu.LabelAlignImageRight");
///<summary>&quot;Left&quot;</summary> 
public static string ContextMenu_LabelAlignImageLeft=>T("ContextMenu.LabelAlignImageLeft");
///<summary>&quot;None&quot;</summary> 
public static string ContextMenu_LabelAlignImageNone=>T("ContextMenu.LabelAlignImageNone");
///<summary>&quot;Source code error&quot;</summary> 
public static string ContentError_DialogTitle=>T("ContentError.DialogTitle");
///<summary>&quot;Error in source code:&quot;</summary> 
public static string ContentError_DialogText=>T("ContentError.DialogText");
///<summary>&quot;No placeholders in template.&quot;</summary> 
public static string TemplateTree_NoTemplateWarning=>T("TemplateTree.NoTemplateWarning");
///<summary>&quot;Basic&quot;</summary> 
public static string LabelTabBasic=>T("LabelTabBasic");
///<summary>&quot;Advanced&quot;</summary> 
public static string LabelTabAdvanced=>T("LabelTabAdvanced");
///<summary>&quot;Class&quot;</summary> 
public static string LabelClass=>T("LabelClass");
///<summary>&quot;The class attribute specifies a CSS classname for an element.&quot;</summary> 
public static string HelpClass=>T("HelpClass");
///<summary>&quot;ID&quot;</summary> 
public static string LabelId=>T("LabelId");
///<summary>&quot;The id attribute can be used by JavaScript or CSS to make changes to an element.&quot;</summary> 
public static string HelpId=>T("HelpId");
///<summary>&quot;Clipboard disabled&quot;</summary> 
public static string MozSecurityNote_LabelSecurityStuff=>T("MozSecurityNote.LabelSecurityStuff");
///<summary>&quot;For security reasons, access to the clipboard was blocked by your browser. Please use standard keyboard shortcuts. For a technical description of, how to configure your browser for use with {applicationname}, press the &quot;More Info&quot; button.&quot;</summary> 
public static string MozSecurityNote_TextSecurityStuff=>T("MozSecurityNote.TextSecurityStuff");
///<summary>&quot;Insert Link&quot;</summary> 
public static string Link_LabelInsertLink=>T("Link.LabelInsertLink");
///<summary>&quot;Link Properties&quot;</summary> 
public static string Link_LabelLinkProperties=>T("Link.LabelLinkProperties");
///<summary>&quot;URL&quot;</summary> 
public static string Link_LinkDestination=>T("Link.LinkDestination");
///<summary>&quot;Role&quot;</summary> 
public static string Link_LinkRole=>T("Link.LinkRole");
///<summary>&quot;Title&quot;</summary> 
public static string Link_TitleText=>T("Link.TitleText");
///<summary>&quot;Target&quot;</summary> 
public static string Link_LinkTarget=>T("Link.LinkTarget");
///<summary>&quot;Open in new window&quot;</summary> 
public static string Link_LinkTarget_LabelCheckBox=>T("Link.LinkTarget.LabelCheckBox");
///<summary>&quot;The title text is rendered as a tooltip when the mouse hovers over the link. This can be used to let your customers know where the link is going without disturbing the flow of your text.&quot;</summary> 
public static string Link_TitleTextToolTip=>T("Link.TitleTextToolTip");
///<summary>&quot;Link properties&quot;</summary> 
public static string Link_LabelLink=>T("Link.LabelLink");
///<summary>&quot;Cell type&quot;</summary> 
public static string Tables_Cell_CellType=>T("Tables.Cell.CellType");
///<summary>&quot;Cell width&quot;</summary> 
public static string Tables_Cell_LabelWidth=>T("Tables.Cell.LabelWidth");
///<summary>&quot;Horizontal alignment&quot;</summary> 
public static string Tables_Cell_HorizontalAlignment=>T("Tables.Cell.HorizontalAlignment");
///<summary>&quot;Vertical alignment&quot;</summary> 
public static string Tables_Cell_VerticalAlignment=>T("Tables.Cell.VerticalAlignment");
///<summary>&quot;Apply changes to&quot;</summary> 
public static string Tables_Cell_ApplyTo=>T("Tables.Cell.ApplyTo");
///<summary>&quot;Cell Properties&quot;</summary> 
public static string Tables_Cell_LabelCellProperties=>T("Tables.Cell.LabelCellProperties");
///<summary>&quot;Layout&quot;</summary> 
public static string Tables_Cell_LabelLayout=>T("Tables.Cell.LabelLayout");
///<summary>&quot;Data Cell&quot;</summary> 
public static string Tables_Cell_LabelDataCell=>T("Tables.Cell.LabelDataCell");
///<summary>&quot;Header Cell&quot;</summary> 
public static string Tables_Cell_LabelHeaderCell=>T("Tables.Cell.LabelHeaderCell");
///<summary>&quot;Left&quot;</summary> 
public static string Tables_Cell_LabelLeft=>T("Tables.Cell.LabelLeft");
///<summary>&quot;Right&quot;</summary> 
public static string Tables_Cell_LabelRight=>T("Tables.Cell.LabelRight");
///<summary>&quot;Top&quot;</summary> 
public static string Tables_Cell_LabelTop=>T("Tables.Cell.LabelTop");
///<summary>&quot;Center&quot;</summary> 
public static string Tables_Cell_LabelCenter=>T("Tables.Cell.LabelCenter");
///<summary>&quot;Bottom&quot;</summary> 
public static string Tables_Cell_LabelBottom=>T("Tables.Cell.LabelBottom");
///<summary>&quot;Scope&quot;</summary> 
public static string Tables_Cell_LabelScope=>T("Tables.Cell.LabelScope");
///<summary>&quot;Current cell&quot;</summary> 
public static string Tables_Cell_LabelCurrentCell=>T("Tables.Cell.LabelCurrentCell");
///<summary>&quot;All cells in row&quot;</summary> 
public static string Tables_Cell_LabelAllRowCells=>T("Tables.Cell.LabelAllRowCells");
///<summary>&quot;All cells in table&quot;</summary> 
public static string Tables_Cell_LabelAllTableCells=>T("Tables.Cell.LabelAllTableCells");
///<summary>&quot;Columns&quot;</summary> 
public static string Tables_Merge_Columns=>T("Tables.Merge.Columns");
///<summary>&quot;Rows&quot;</summary> 
public static string Tables_Merge_Rows=>T("Tables.Merge.Rows");
///<summary>&quot;Merge Table Cells&quot;</summary> 
public static string Tables_Merge_LabelMergeCells=>T("Tables.Merge.LabelMergeCells");
///<summary>&quot;Row in table part&quot;</summary> 
public static string Tables_Row_Rows=>T("Tables.Row.Rows");
///<summary>&quot;Horizontal Alignment&quot;</summary> 
public static string Tables_Row_HorizontalAlignment=>T("Tables.Row.HorizontalAlignment");
///<summary>&quot;Vertical Alignment&quot;</summary> 
public static string Tables_Row_VerticalAlignment=>T("Tables.Row.VerticalAlignment");
///<summary>&quot;Apply changes to&quot;</summary> 
public static string Tables_Row_ApplyTo=>T("Tables.Row.ApplyTo");
///<summary>&quot;Row Properties&quot;</summary> 
public static string Tables_Row_LabelRowProperties=>T("Tables.Row.LabelRowProperties");
///<summary>&quot;Layout&quot;</summary> 
public static string Tables_Row_LabelLayout=>T("Tables.Row.LabelLayout");
///<summary>&quot;Table Head&quot;</summary> 
public static string Tables_Row_LabelTableHead=>T("Tables.Row.LabelTableHead");
///<summary>&quot;Table Body&quot;</summary> 
public static string Tables_Row_LabelTableBody=>T("Tables.Row.LabelTableBody");
///<summary>&quot;Table Foot&quot;</summary> 
public static string Tables_Row_LabelTableFoot=>T("Tables.Row.LabelTableFoot");
///<summary>&quot;Left&quot;</summary> 
public static string Tables_Row_LabelLeft=>T("Tables.Row.LabelLeft");
///<summary>&quot;Center&quot;</summary> 
public static string Tables_Row_LabelCenter=>T("Tables.Row.LabelCenter");
///<summary>&quot;Right&quot;</summary> 
public static string Tables_Row_LabelRight=>T("Tables.Row.LabelRight");
///<summary>&quot;Top&quot;</summary> 
public static string Tables_Row_LabelTop=>T("Tables.Row.LabelTop");
///<summary>&quot;Bottom&quot;</summary> 
public static string Tables_Row_LabelBottom=>T("Tables.Row.LabelBottom");
///<summary>&quot;Scope&quot;</summary> 
public static string Tables_Row_LabelScope=>T("Tables.Row.LabelScope");
///<summary>&quot;Current row&quot;</summary> 
public static string Tables_Row_LabelCurrentRow=>T("Tables.Row.LabelCurrentRow");
///<summary>&quot;Odd rows in table&quot;</summary> 
public static string Tables_Row_LabelOddRows=>T("Tables.Row.LabelOddRows");
///<summary>&quot;Even rows in table&quot;</summary> 
public static string Tables_Row_LabelEvenRows=>T("Tables.Row.LabelEvenRows");
///<summary>&quot;All rows in table&quot;</summary> 
public static string Tables_Row_LabelAllRows=>T("Tables.Row.LabelAllRows");
///<summary>&quot;Insert Table&quot;</summary> 
public static string Tables_Table_TitleInsert=>T("Tables.Table.TitleInsert");
///<summary>&quot;Table Properties&quot;</summary> 
public static string Tables_Table_TitleUpdate=>T("Tables.Table.TitleUpdate");
///<summary>&quot;Columns&quot;</summary> 
public static string Tables_Table_Columns=>T("Tables.Table.Columns");
///<summary>&quot;Rows&quot;</summary> 
public static string Tables_Table_Rows=>T("Tables.Table.Rows");
///<summary>&quot;Summary&quot;</summary> 
public static string Tables_Table_Summary=>T("Tables.Table.Summary");
///<summary>&quot;The summary explains the table content and structure so that people using non-visual browsers (such as blind people) may better understand it. This is especially important for tables without captions.&quot;</summary> 
public static string Tables_Table_SummaryHelp=>T("Tables.Table.SummaryHelp");
///<summary>&quot;Table layout&quot;</summary> 
public static string Tables_Table_LabelLayout=>T("Tables.Table.LabelLayout");
///<summary>&quot;Table description&quot;</summary> 
public static string Tables_Table_LabelMeta=>T("Tables.Table.LabelMeta");
///<summary>&quot;Source&quot;</summary> 
public static string Image_Source=>T("Image.Source");
///<summary>&quot;Alternate text&quot;</summary> 
public static string Image_AlternativeText=>T("Image.AlternativeText");
///<summary>&quot;The alternate text is displayed as visible text in browsers where images cannot be rendered normally. This may be the case for mobile phone browsers and special browsers for the visually impaired. The alt attribute should clearly describe the content of the image.&quot;</summary> 
public static string Image_AlternativeTextToolTip=>T("Image.AlternativeTextToolTip");
///<summary>&quot;Title text&quot;</summary> 
public static string Image_TitleText=>T("Image.TitleText");
///<summary>&quot;The title text is rendered as a tooltip when the mouse hovers over the image. An image that might be confusing for the viewer can be instantly clarified by a title.&quot;</summary> 
public static string Image_TitleTextToolTip=>T("Image.TitleTextToolTip");
///<summary>&quot;Image properties&quot;</summary> 
public static string Image_LabelImage=>T("Image.LabelImage");
///<summary>&quot;Insert Image&quot;</summary> 
public static string Image_LabelInsertImage=>T("Image.LabelInsertImage");
///<summary>&quot;Image Properties&quot;</summary> 
public static string Image_LabelImageProperties=>T("Image.LabelImageProperties");
///<summary>&quot;Maximum Width&quot;</summary> 
public static string Image_MaxWidth=>T("Image.MaxWidth");
///<summary>&quot;If the width of the image is bigger that the specified value, it will be downsized to the specified value.&quot;</summary> 
public static string Image_MaxWidthToolTip=>T("Image.MaxWidthToolTip");
///<summary>&quot;Maximum Height&quot;</summary> 
public static string Image_MaxHeight=>T("Image.MaxHeight");
///<summary>&quot;If the height of the image is bigger that the specified value, it will be downsized to the specified value.&quot;</summary> 
public static string Image_MaxHeightToolTip=>T("Image.MaxHeightToolTip");
///<summary>&quot;Select Character&quot;</summary> 
public static string CharMap_LabelSelectSpecialChar=>T("CharMap.LabelSelectSpecialChar");
///<summary>&quot;General&quot;</summary> 
public static string CharMap_LabelGeneral=>T("CharMap.LabelGeneral");
///<summary>&quot;Alphabetical&quot;</summary> 
public static string CharMap_LabelAlphabetical=>T("CharMap.LabelAlphabetical");
///<summary>&quot;Math &amp; Symbols&quot;</summary> 
public static string CharMap_LabelMathSymbols=>T("CharMap.LabelMathSymbols");
///<summary>&quot;Common&quot;</summary> 
public static string CharMap_LabelCommon=>T("CharMap.LabelCommon");
///<summary>&quot;Quotation&quot;</summary> 
public static string CharMap_LabelQuotation=>T("CharMap.LabelQuotation");
///<summary>&quot;Currency&quot;</summary> 
public static string CharMap_LabelCurrency=>T("CharMap.LabelCurrency");
///<summary>&quot;Latin&quot;</summary> 
public static string CharMap_LabelLatin=>T("CharMap.LabelLatin");
///<summary>&quot;Greek&quot;</summary> 
public static string CharMap_LabelGreek=>T("CharMap.LabelGreek");
///<summary>&quot;Math and Logic&quot;</summary> 
public static string CharMap_LabelMathAndLogic=>T("CharMap.LabelMathAndLogic");
///<summary>&quot;Symbols&quot;</summary> 
public static string CharMap_LabelSymbols=>T("CharMap.LabelSymbols");
///<summary>&quot;Arrows&quot;</summary> 
public static string CharMap_LabelArrows=>T("CharMap.LabelArrows");
///<summary>&quot;Paste as Text&quot;</summary> 
public static string TextPaste_Label=>T("TextPaste.Label");
///<summary>&quot;Paste content here. Then press OK.&quot;</summary> 
public static string TextPaste_PasteHereContent=>T("TextPaste.PasteHereContent");
///<summary>&quot;How to spell check ...&quot;</summary> 
public static string SpellCheck_InfoLabel=>T("SpellCheck.InfoLabel");
///<summary>&quot;How to spell check in the Visual Editor&quot;</summary> 
public static string SpellCheck_InfoCaption=>T("SpellCheck.InfoCaption");
///<summary>&quot;To get suggestions for a misspelled word, press your SHIFT key down when you invoke the context menu.&quot;</summary> 
public static string SpellCheck_InfoText=>T("SpellCheck.InfoText");
///<summary>&quot;Edit&quot;</summary> 
public static string Function_Edit=>T("Function.Edit");
///<summary>&quot;Edit {0}&quot;</summary> 
public static string LaunchButton_Label(object parameter0)=>string.Format(T("LaunchButton.Label"), parameter0);
     private static string T(string key) 
       { 
            return StringResourceSystemFacade.GetString("Composite.Web.VisualEditor", key);
        }
} 

	}
}


