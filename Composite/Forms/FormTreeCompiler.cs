using System.Xml;
using System.Collections.Generic;

using Composite.Forms.Foundation.FormTreeCompiler;
using Composite.Forms.Foundation.FormTreeCompiler.CompilePhases;
using Composite.Forms.Foundation.FormTreeCompiler.CompileTreeNodes;
using Composite.Validation.ClientValidationRules;
using System.Xml.Linq;
using Composite.Xml;
using System.Linq;
using Composite.ResourceSystem;
using System;
using Composite.ResourceSystem.Icons;


namespace Composite.Forms
{
    public sealed class FormTreeCompiler
    {
        private CompileContext _context;
        private Dictionary<string, object> _bindingObjects;

        private IUiControl _uiControl = null;
        private CompileTreeNode _rootCompilerNode = null;

        private string _label;
        private string _iconHandle;


        public void Compile(XmlReader reader, IFormChannelIdentifier channel, Dictionary<string, object> bindingObjects)
        {
            Compile(reader, channel, bindingObjects, false, "", null);
        }


        public void Compile(XmlReader reader, IFormChannelIdentifier channel, Dictionary<string, object> bindingObjects, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            Compile(reader, channel, bindingObjects, false, "", bindingsValidationRules);
        }


        public void Compile(XmlReader reader, IFormChannelIdentifier channel, Dictionary<string, object> bindingObjects, bool withDebug)
        {
            Compile(reader, channel, bindingObjects, withDebug, "", null);
        }



        public void Compile(XmlReader reader, IFormChannelIdentifier channel, Dictionary<string, object> bindingObjects, bool withDebug, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            Compile(reader, channel, bindingObjects, withDebug, "", bindingsValidationRules);
        }



        public void Compile(XmlReader reader, IFormChannelIdentifier channel, Dictionary<string, object> bindingObjects, bool withDebug, string customControlIdPrefix)
        {
            Compile(reader, channel, bindingObjects, withDebug, customControlIdPrefix, null);
        }



        public void Compile(XmlReader reader, IFormChannelIdentifier channel, Dictionary<string, object> bindingObjects, bool withDebug, string customControlIdPrefix, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            _bindingObjects = bindingObjects;

            _context = new CompileContext();
            _context.BindingObjects = bindingObjects;
            _context.BindingsValidationRules = bindingsValidationRules;
            _context.CurrentChannel = channel;
            _context.CustomControlIdPrefix = customControlIdPrefix;

            BuildFromXmlPhase buildPhase = new BuildFromXmlPhase(reader);
            _rootCompilerNode = buildPhase.BuildTree();

            UpdateXmlInformationPhase updateInfo = new UpdateXmlInformationPhase();
            updateInfo.UpdateInformation(_rootCompilerNode);

            CreateProducersPhase createProducers = new CreateProducersPhase(_context);
            createProducers.CreateProducers(_rootCompilerNode);            
          
            EvaluatePropertiesPhase evaluateProperties = new EvaluatePropertiesPhase(_context, withDebug);
            evaluateProperties.Evaluate(_rootCompilerNode);

            ExtractUiArtifactsPhase extractUiArtifacts = new ExtractUiArtifactsPhase();

            extractUiArtifacts.ExtractUiArtifacts(_rootCompilerNode, out _uiControl, out _label, out _iconHandle);
        }        



        public void SaveControlProperties()
        {
            _uiControl.BindStateToControlProperties();

            foreach (CompileContext.IRebinding rd in _context.Rebindings)
            {
                rd.Rebind(_bindingObjects);
            }
        }



        public IUiControl UiControl
        {
            get { return _uiControl; }
        }



        public string Label
        {
            get 
            {
                if (string.IsNullOrEmpty(_label) == false)
                {
                    return _label;
                }
                else
                {
                    return _uiControl.Label;
                }
            }
        }



        public ResourceHandle Icon
        {
            get
            {
                if (string.IsNullOrEmpty(_iconHandle) == false)
                {
                    if (_iconHandle.IndexOf(',') == -1)
                    {
                        return new ResourceHandle(BuildInIconProviderName.ProviderName, _iconHandle.Trim());
                    }
                    else
                    {
                        string[] resourceParts = _iconHandle.Split(',');
                        if (resourceParts.Length != 2) throw new InvalidOperationException( string.Format( "Invalid icon resource name '{0}'. Only one comma expected.", _iconHandle ));

                        return new ResourceHandle(resourceParts[0].Trim(), resourceParts[1].Trim());
                    }
                }
                else
                {
                    return null;
                }
            }
        }



        public CompileTreeNode RootCompileTreeNode
        {
            get { return _rootCompilerNode; }
        }
    }
}
