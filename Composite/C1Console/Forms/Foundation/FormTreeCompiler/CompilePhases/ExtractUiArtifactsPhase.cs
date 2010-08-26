using Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompileTreeNodes;
using Composite.C1Console.Forms.StandardProducerMediators.BuildinProducers;


namespace Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompilePhases
{
    internal sealed class ExtractUiArtifactsPhase
    {
        public void ExtractUiArtifacts(CompileTreeNode node, out IUiControl uiControl, out string label, out string iconhandle )
        {
            foreach (PropertyCompileTreeNode n in node.DefaultProperties)
            {
                if (n.Value is LayoutProducer)
                {
                    LayoutProducer lp = (n.Value as LayoutProducer);
                    uiControl = lp.UiControl;
                    label = lp.label;
                    iconhandle = lp.iconhandle;

                    return;
                }
            }

            throw new FormCompileException("No layout defined in the source file", node.XmlSourceNodeInformation);
        }
    }
}
