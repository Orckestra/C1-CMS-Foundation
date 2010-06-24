using System;


namespace Composite.Data.Visualization
{
    [AttributeUsageAttribute(AttributeTargets.Interface, Inherited = true, AllowMultiple = false)]
    public sealed class DataVisualizerAttribute: Attribute
    {
        private Type _dataVisualizerAttributeType;


        public DataVisualizerAttribute(Type dataVisualizerAttributeType)
        {
            _dataVisualizerAttributeType = dataVisualizerAttributeType;
        }


        public Type DataVisualizerType
        {
            get { return _dataVisualizerAttributeType; }
        }
    }
}
