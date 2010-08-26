using Composite.C1Console.Forms.Foundation.PluginFacades;
using Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompileTreeNodes;


namespace Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompilePhases
{
    internal sealed class CreateProducersPhase
    {
        private CompileContext _compileContext;


        public CreateProducersPhase(CompileContext compileContext)
        {
            _compileContext = compileContext;
        }



        public void CreateProducers(CompileTreeNode node)
        {
            if (node is ElementCompileTreeNode)
            {
                ElementCompileTreeNode element = node as ElementCompileTreeNode;

                if ((true == CompilerGlobals.IsProducerTag(element)) ||
                    (true == CompilerGlobals.IsReadTag(element)) ||
                    (true == CompilerGlobals.IsBindTag(element)) ||
                    (true == CompilerGlobals.IsBindingTag(element)) ||
                    (true == CompilerGlobals.IsLayoutTag(element)))
                {
                    element.Producer = ProducerMediatorPluginFacade.CreateProducer(_compileContext.CurrentChannel, element.XmlSourceNodeInformation.NamespaceURI, element.XmlSourceNodeInformation.Name);

                    if (element.Producer is IUiControl)
                    {
                        (element.Producer as IUiControl).UiControlID = _compileContext.GetNextControlId(element.XmlSourceNodeInformation.Name);
                        
                    }
                }
                else if (true == CompilerGlobals.IsBindingsTag(element))
                {
                    if (null == _compileContext.BindingsProducer)
                    {
                        _compileContext.BindingsProducer = ProducerMediatorPluginFacade.CreateProducer(_compileContext.CurrentChannel, element.XmlSourceNodeInformation.NamespaceURI, element.XmlSourceNodeInformation.Name);
                    }

                    element.Producer = _compileContext.BindingsProducer;
                }
            }

            foreach (CompileTreeNode subNode in node.AllSubNodes) CreateProducers(subNode);
        }
    }
}
