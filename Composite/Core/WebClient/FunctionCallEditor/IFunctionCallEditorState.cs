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
        /// <exclude />
        [XmlIgnore]
        List<ManagedParameterDefinition> Parameters { get; set; }

        /// <exclude />
        [XmlIgnore]
        List<Type> ParameterTypeOptions { get; set; }
    }

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IFunctionCallEditorState : IParameterEditorState
    {
        /// <exclude />
        [XmlIgnore]
        List<NamedFunctionCall> FunctionCalls { get; set; }

        /// <exclude />
        bool ShowLocalFunctionNames { get; } // Check if this setting is used

        /// <exclude />
        bool WidgetFunctionSelection { get; }

        /// <exclude />
        bool AllowLocalFunctionNameEditing { get; }

        /// <exclude />
        bool AllowSelectingInputParameters { get; }

        /// <exclude />
        Type[] AllowedResultTypes { get; }

        /// <exclude />
        int MaxFunctionAllowed { get; }

        /// <exclude />
        string ConsoleId { get; }
    }
}
