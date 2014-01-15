using System;


namespace Composite.Data
{
    /// <summary>
    /// Assign this to properties on your IData interfaces to control how a data field whould be viewed and edited in a form view.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
	public sealed class FormRenderingProfileAttribute : Attribute
	{
        /// <summary>
        /// Defines the field's label
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// Defines the field's help text.
        /// </summary>
        public string HelpText { get; set; }

        /// <summary>
        /// Defines the widget function markup
        /// </summary>
        public string WidgetFunctionMarkup { get; set; }
	}
}
