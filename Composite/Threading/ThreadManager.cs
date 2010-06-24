using System.Threading;


namespace Composite.Threading
{
    public static class ThreadManager
    {
        public static ParameterizedThreadStart CreateThreadStart(ThreadStart threadStart)
        {
            return delegate(object parameter)
            {
                StartThreadData startThreadData = (StartThreadData)parameter;

                using (ThreadDataManager.Initialize(startThreadData.Data))
                {
                    threadStart();
                }
            };
        }



        public static ParameterizedThreadStart CreateParameterizedThreadStart(ParameterizedThreadStart parameterizedThreadStart)
        {
            return delegate(object parameter)
            {
                StartThreadData startThreadData = (StartThreadData)parameter;

                using (ThreadDataManager.Initialize(startThreadData.Data))
                {
                    parameterizedThreadStart(startThreadData.Parameter);
                }
            };
        }



        public static void StartThread(Thread thread)
        {
            ThreadDataManagerData data = ThreadDataManager.Current;

            StartThreadData startThreadData = new StartThreadData
            {
                Data = data,
            };

            thread.Start(startThreadData);
        }



        public static void StartThread(Thread thread, object parameter)
        {
            ThreadDataManagerData data = ThreadDataManager.Current;

            StartThreadData startThreadData = new StartThreadData
            {
                Data = data,
                Parameter = parameter
            };

            thread.Start(startThreadData);
        }



        private sealed class StartThreadData
        {
            public ThreadDataManagerData Data { get; set; }
            public object Parameter { get; set; }
        }
    }
}
