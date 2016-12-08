using System.Collections.Generic;

namespace Composite.Plugins.Components.ComponentsEndpoint
{
#warning heavily mocked!
    public class ComponentsResponseMessage
    {
        public string name => "component-selector-shim";
        public string type => "dialogPageShim";
        public Dialog dialog => new Dialog();
    }

    public class Provider
    {
        public string name => "elementSource";
        public string protocol => "wamp";
        public string uri => "components.getComponents";
    }

    public class FinishButton
    {
        public string label => "Next";
        public string style => "main";
    }

    public class FinishProvider
    {
        public string name => "elementInsert";
        public string protocol => "wamp";
        public string uri => "mock.provider.components.pick";
    }

    public class CancelButton
    {
        public string label => "Cancel";
    }

    public class CancelProvider
    {
        public string name => "componentListCancel";
        public string protocol => "wamp";
        public string uri => "mock.struct.dialog.cancel";
    }

    public class Pane
    {
        public string name => "component-list";
        public string type => "palette";
        public string headline => "Select a component";
        public string context => "left-aside";
        public Provider provider =>new Provider();
        public FinishButton finishButton => new FinishButton();
        public FinishProvider finishProvider =>new FinishProvider();
        public CancelButton cancelButton =>new CancelButton();
        public CancelProvider cancelProvider =>new CancelProvider();
    }

    public class Dialog
    {
        public string name => "component-selector";
        public List<Pane> panes =>new List<Pane>() {new Pane()};
    }

    

}
