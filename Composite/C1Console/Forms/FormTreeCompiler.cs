using System;
using System.Collections.Generic;
using System.Xml;
using System.Xml.Linq;
using Composite.C1Console.Forms.Foundation.FormTreeCompiler;
using Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompilePhases;
using Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompileTreeNodes;
using Composite.C1Console.Forms.WebChannel;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Core.WebClient.FlowMediators.FormFlowRendering;
using Composite.Data.Validation.ClientValidationRules;


namespace Composite.C1Console.Forms
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class FormTreeCompiler
    {
        private CompileContext _context;
        private Dictionary<string, object> _bindingObjects;

        private IUiControl _uiControl;
        private CompileTreeNode _rootCompilerNode;

        private string _label;
        private string _tooltip;
        private string _iconHandle;


        /// <exclude />
        public void Compile(XmlReader reader, IFormChannelIdentifier channel, Dictionary<string, object> bindingObjects)
        {
            Compile(reader, channel, bindingObjects, false, "", null);
        }


        /// <exclude />
        public void Compile(XmlReader reader, IFormChannelIdentifier channel, Dictionary<string, object> bindingObjects, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            Compile(reader, channel, bindingObjects, false, "", bindingsValidationRules);
        }


        /// <exclude />
        public void Compile(XmlReader reader, IFormChannelIdentifier channel, Dictionary<string, object> bindingObjects, bool withDebug)
        {
            Compile(reader, channel, bindingObjects, withDebug, "", null);
        }


        /// <exclude />
        public void Compile(XmlReader reader, IFormChannelIdentifier channel, Dictionary<string, object> bindingObjects, bool withDebug, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            Compile(reader, channel, bindingObjects, withDebug, "", bindingsValidationRules);
        }


        /// <exclude />
        public void Compile(XmlReader reader, IFormChannelIdentifier channel, Dictionary<string, object> bindingObjects, bool withDebug, string customControlIdPrefix)
        {
            Compile(reader, channel, bindingObjects, withDebug, customControlIdPrefix, null);
        }


        /// <exclude />
        public void Compile(XmlReader reader, IFormChannelIdentifier channel,
                            Dictionary<string, object> bindingObjects, bool withDebug, string customControlIdPrefix,
                            Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            XDocument doc = XDocument.Load(reader);
            reader.Close();

            Compile(doc, channel, bindingObjects, withDebug, customControlIdPrefix, bindingsValidationRules);
        }

        /// <exclude />
        public void Compile(XDocument doc, IFormChannelIdentifier channel, Dictionary<string, object> bindingObjects, bool withDebug, string customControlIdPrefix, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            _bindingObjects = bindingObjects;

            _context = new CompileContext
            {
                BindingObjects = bindingObjects,
                BindingsValidationRules = bindingsValidationRules,
                CurrentChannel = channel,
                CustomControlIdPrefix = customControlIdPrefix
            };

            _rootCompilerNode = BuildFromXmlPhase.BuildTree(doc);

            UpdateXmlInformationPhase updateInfo = new UpdateXmlInformationPhase();
            updateInfo.UpdateInformation(_rootCompilerNode);

            CreateProducersPhase createProducers = new CreateProducersPhase(_context);
            createProducers.CreateProducers(_rootCompilerNode);

            EvaluatePropertiesPhase evaluateProperties = new EvaluatePropertiesPhase(_context, withDebug);
            evaluateProperties.Evaluate(_rootCompilerNode);

            ExtractUiArtifactsPhase extractUiArtifacts = new ExtractUiArtifactsPhase();

            extractUiArtifacts.ExtractUiArtifacts(_rootCompilerNode, out _uiControl, out _label, out _tooltip, out _iconHandle);
        }

        /// <summary>
        /// Saves control properties into bindings.
        /// </summary>
        /// <exclude />
        public void SaveControlProperties()
        {
            SaveAndValidateControlProperties();
        }

        /// <summary>
        /// Saves control properties into bindings and returns validation errors.
        /// </summary>
        /// <exclude />
        public Dictionary<string, Exception> SaveAndValidateControlProperties()
        {
            _uiControl.BindStateToControlProperties();

            var bindingErrors = new Dictionary<string, Exception>();

            foreach (CompileContext.IRebinding rd in _context.Rebindings)
            {
                rd.Rebind(_bindingObjects, bindingErrors);
            }

            return bindingErrors;
        }


        /// <exclude />
        public Dictionary<string, string> GetBindingToClientIDMapping()
        {
            var result = new Dictionary<string, string>();
            FormFlowUiDefinitionRenderer.ResolveBindingPathToClientIDMappings(_uiControl as IWebUiControl, result);

            return result;
        } 

        /// <exclude />
        public IUiControl UiControl => _uiControl;


        /// <exclude />
        public string Label
        {
            get 
            {
                return !string.IsNullOrEmpty(_label) ? _label : _uiControl.Label;
            }
        }


        /// <exclude />
        public string Tooltip => _tooltip;


        /// <exclude />
        public ResourceHandle Icon
        {
            get
            {
                if (string.IsNullOrEmpty(_iconHandle))
                {
                    return null;
                }
                
                if (_iconHandle.IndexOf(',') == -1)
                {
                    return new ResourceHandle(BuildInIconProviderName.ProviderName, _iconHandle.Trim());
                }
                
                string[] resourceParts = _iconHandle.Split(',');
                if (resourceParts.Length != 2)
                    throw new InvalidOperationException(
                        $"Invalid icon resource name '{_iconHandle}'. Only one comma expected.");

                return new ResourceHandle(resourceParts[0].Trim(), resourceParts[1].Trim());
            }
        }

        /// <exclude />
        public Dictionary<string, object> BindingObjects => _bindingObjects;

        /// <exclude />
        public CompileTreeNode RootCompileTreeNode => _rootCompilerNode;
    }
}
