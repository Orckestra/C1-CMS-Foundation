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

        /// <exclude />
        [RequiredValue()]
        public string FormPath { get; set; }


        /// <exclude />
        public bool Debug { get; set; }


        /// <exclude />
        public Dictionary<string, object> Bindings { get; set; }


        /// <exclude />
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


        /// <exclude />
        public EmbeddedFormUiControl()
        {
            base.Label = null;
            this.Bindings = new Dictionary<string, object>();
        }


        /// <exclude />
        public override void BindStateToControlProperties()
        {
            _compiler.SaveControlProperties();
        }


        /// <exclude />
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
