using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Forms.Foundation;

namespace Composite.C1Console.Forms.DataServices.UiControls
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [ControlValueProperty("Bindings")]
    public class EmbeddedFormUiControl : UiControl
    {
        private FormTreeCompiler _compiler;

        [RequiredValue()]
        public string FormPath { get; set; }

        public bool Debug { get; set; }

        public Dictionary<string, object> Bindings { get; set; }

        public override string Label
        {
            get
            {
                if (base.Label != null)
                {
                    return base.Label;
                }

                return this.CompiledUiControl.Label;
            }
            set
            {
                base.Label = value;
            }
        }


        public EmbeddedFormUiControl()
        {
            base.Label = null;
            this.Bindings = new Dictionary<string, object>();
        }


        public override void BindStateToControlProperties()
        {
            _compiler.SaveControlProperties();
        }


        protected internal IUiControl CompiledUiControl
        {
            get
            {
                if (_compiler == null)
                {
                    _compiler = Foundation.FormBuilder.Build(this.FormPath, this.UiControlChannel, this.Bindings, this.Debug);
                }

                return _compiler.UiControl;
            }
        }
    }
}
