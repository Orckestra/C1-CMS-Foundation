using System;
using System.Collections.Generic;
using System.Xml.Serialization;
using Composite.Functions;
using Composite.Functions.ManagedParameters;

namespace Composite.Core.WebClient.FunctionCallEditor
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IParameterEditorState
    {
        [XmlIgnore]
        List<ManagedParameterDefinition> Parameters { get; set; }

        [XmlIgnore]
        List<Type> ParameterTypeOptions { get; set; }
    }

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IFunctionCallEditorState : IParameterEditorState
    {
        [XmlIgnore]
        List<NamedFunctionCall> FunctionCalls { get; set; }

        bool ShowLocalFunctionNames { get; } // Check if this setting is used
        bool WidgetFunctionSelection { get; } 
        bool AllowLocalFunctionNameEditing { get; }
        bool AllowSelectingInputParameters { get; }

        Type[] AllowedResultTypes { get; }
        int MaxFunctionAllowed { get; }

        string ConsoleId { get; }
    }
}
