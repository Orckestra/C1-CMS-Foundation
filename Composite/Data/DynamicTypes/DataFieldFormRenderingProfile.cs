using System;


namespace Composite.Data.DynamicTypes
{
    [Serializable()]
    public class DataFieldFormRenderingProfile
    {
        public virtual string Label { get; set; }
        public virtual string HelpText { get; set; }
        public virtual string WidgetFunctionMarkup { get; set; }
    }



    [Serializable()]
    internal class LazyDataFieldFormRenderingProfile : DataFieldFormRenderingProfile
    {
        [NonSerialized]
        private string _widgetFunctionMarkup = null;

        [NonSerialized]
        private Func<string> _widgetFunctionMarkupFunc;


        public Func<string> WidgetFunctionMarkupFunc { get { return _widgetFunctionMarkupFunc; } set { _widgetFunctionMarkupFunc = value; } }


        public override string WidgetFunctionMarkup
        {
            get
            {
                if (_widgetFunctionMarkup == null)
                {
                    _widgetFunctionMarkup = WidgetFunctionMarkupFunc();
                }

                return _widgetFunctionMarkup;
            }
            set
            {
                _widgetFunctionMarkup = value;
            }
        }
    }
}
