using System;
using System.Collections.Generic;
using System.Linq;
using Composite.EventSystem;
using Composite.Types;


namespace Composite.Data.Visualization.Foundation
{
    internal static class DataVisualizerCache
    {
        private static Dictionary<Type, IDataVisualizer> _dataVisualizerCache = new Dictionary<Type, IDataVisualizer>();

        private static object _lock = new object();


        static DataVisualizerCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlush);
        }



        public static IDataVisualizer GetVisualizer(Type dataType)
        {
            if (dataType == null) throw new ArgumentNullException("dataType");
            if (typeof(IData).IsAssignableFrom(dataType) == false) throw new ArgumentException(string.Format("The dataType does not implement the interface {0}", typeof(IData)), "dataType");

            IDataVisualizer dataVisualizer;

            if (_dataVisualizerCache.TryGetValue(dataType, out dataVisualizer) == false)
            {
                List<DataVisualizerAttribute> attributes = dataType.GetCustomInterfaceAttributes<DataVisualizerAttribute>().ToList();

                if (attributes.Count == 0) throw new InvalidOperationException(string.Format("Missing {0} attribute on the data type {1}", typeof(DataVisualizerAttribute), dataType));
                if (attributes.Count > 1) throw new InvalidOperationException(string.Format("Only one {0} attribute on the data type {1}", typeof(DataVisualizerAttribute), dataType));

                DataVisualizerAttribute attribute = attributes[0];

                if (attribute.DataVisualizerType == null) throw new InvalidOperationException(string.Format("Data visualizer type can not be null on the data type {0}", dataType));
                if (typeof(IDataVisualizer).IsAssignableFrom(attribute.DataVisualizerType) == false) throw new InvalidOperationException(string.Format("Data visualizer {0} should implement the interface {1}", attribute.DataVisualizerType, typeof(IDataVisualizer)));

                dataVisualizer = (IDataVisualizer)Activator.CreateInstance(attribute.DataVisualizerType);

                _dataVisualizerCache.Add(dataType, dataVisualizer);
            }

            return dataVisualizer;
        }



        private static void Flush()
        {
            _dataVisualizerCache = new Dictionary<Type, IDataVisualizer>();
        }



        private static void OnFlush(FlushEventArgs args)
        {
            Flush();
        }
    }
}
