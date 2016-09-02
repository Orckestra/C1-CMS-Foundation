using Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompileTreeNodes;
using Composite.C1Console.Forms.StandardProducerMediators.BuildinProducers;


namespace Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompilePhases
{
    internal sealed class ExtractUiArtifactsPhase
    {
        public void ExtractUiArtifacts(CompileTreeNode node, out IUiControl uiControl, out string label, out string tooltip, out string iconhandle )
        {
            foreach (PropertyCompileTreeNode n in node.DefaultProperties)
            {
                if (n.Value is LayoutProducer)
                {
                    var lp = (LayoutProducer) n.Value;
                    uiControl = lp.UiControl;
                    label = lp.label;
                    iconhandle = lp.iconhandle;
                    tooltip = lp.tooltip;

                    return;
                }
            }

            throw new FormCompileException("No layout defined in the source file", node.XmlSourceNodeInformation);
        }
    }
}
