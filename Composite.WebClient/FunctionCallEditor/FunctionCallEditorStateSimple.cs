using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using System.Xml.Serialization;
using Composite.Functions;
using Composite.Types;

namespace Composite.WebClient.FunctionCallEditor
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class FunctionCallEditorStateSimple : IFunctionCallEditorState
    {
        public string FunctionCallsXml { get; set; }
        public bool ShowLocalFunctionNames { get; set; }
        public bool AllowLocalFunctionNameEditing { get; set; }
        public bool AllowSelectingInputParameters { get; set; }
        public string AllowedTypes { get; set; }

        [XmlIgnore]
        List<NamedFunctionCall> IFunctionCallEditorState.FunctionCalls
        {
            get
            {
                var functionList = new List<NamedFunctionCall>();

                if (FunctionCallsXml != null)
                {
                    XElement root = XElement.Parse(FunctionCallsXml);

                    foreach (XElement functionElement in root.Elements())
                    {
                        string localname;
                        XAttribute localNameAttr = functionElement.Attribute("localname");
                        localname = localNameAttr != null ? localNameAttr.Value : string.Empty;

                        var functionDefinition = (BaseFunctionRuntimeTreeNode) FunctionTreeBuilder.Build(functionElement);

                        functionList.Add(new NamedFunctionCall(localname, functionDefinition));
                    }
                }
                return functionList;
            }
            set
            {
                List<NamedFunctionCall> functionCalls = value;

                Verify.IsNotNull(functionCalls, "Failed to get function calls");

                XElement functionsNode = new XElement("functions");

                foreach (var localNamedFunctionCall in functionCalls)
                {
                    Guid handle = Guid.NewGuid();

                    BaseFunctionRuntimeTreeNode functionRuntime = localNamedFunctionCall.FunctionCall;

                    XElement function = functionRuntime.Serialize();
                    function.Add(new XAttribute("localname", localNamedFunctionCall.Name));
                    function.Add(new XAttribute("handle", handle));

                    functionsNode.Add(function);
                }

                FunctionCallsXml = functionsNode.ToString();
            }
        }

        [XmlIgnore]
        List<Functions.ManagedParameters.ManagedParameterDefinition> IParameterEditorState.Parameters
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        [XmlIgnore]
        public List<Type> ParameterTypeOptions
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        [XmlIgnore]
        public Type[] AllowedResultTypes
        {
            get
            {
                var result = new List<Type>();
                if (AllowedTypes != null)
                {
                    foreach (string typeName in AllowedTypes.Split(new [] {';'}, StringSplitOptions.RemoveEmptyEntries))
                    {
                        result.Add(TypeManager.GetType(typeName));
                    }
                }
                return result.ToArray();
            }
            set
            {
                AllowedTypes = value == null ? null : string.Join(";", from t in value select TypeManager.SerializeType(t));
            }
        }

        public bool WidgetFunctionSelection
        {
            get; set;
        }

        bool IFunctionCallEditorState.ShowLocalFunctionNames
        {
            get { return ShowLocalFunctionNames; }
        }

        bool IFunctionCallEditorState.AllowLocalFunctionNameEditing
        {
            get { return AllowLocalFunctionNameEditing; }
        }

        bool IFunctionCallEditorState.AllowSelectingInputParameters
        {
            get { return AllowSelectingInputParameters; }
        }

        public int MaxFunctionAllowed
        {
            get; set; 
        }

        int IFunctionCallEditorState.MaxFunctionAllowed
        {
            get { return MaxFunctionAllowed; }
        }

        public string ConsoleId
        {
            get; set;
        }
    }
}
