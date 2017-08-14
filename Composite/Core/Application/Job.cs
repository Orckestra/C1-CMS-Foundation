using System;
using System.Runtime.InteropServices;

namespace Composite.Core.Application
{
    enum JobObjectInfoType
    {
        AssociateCompletionPortInformation = 7,
        BasicLimitInformation = 2,
        BasicUIRestrictions = 4,
        EndOfJobTimeInformation = 6,
        ExtendedLimitInformation = 9,
        SecurityLimitInformation = 5,
        GroupInformation = 11
    }

    [StructLayout(LayoutKind.Sequential)]
    struct SECURITY_ATTRIBUTES
    {
        public UInt32 nLength;
        public IntPtr lpSecurityDescriptor;
        public Int32 bInheritHandle;
    }

    [StructLayout(LayoutKind.Sequential)]
    struct JOBOBJECT_BASIC_LIMIT_INFORMATION
    {
        public Int64 PerProcessUserTimeLimit;
        public Int64 PerJobUserTimeLimit;
        public UInt32 LimitFlags;
        public UIntPtr MinimumWorkingSetSize;
        public UIntPtr MaximumWorkingSetSize;
        public UInt32 ActiveProcessLimit;
        public UIntPtr Affinity;
        public UInt32 PriorityClass;
        public UInt32 SchedulingClass;
    }

    [StructLayout(LayoutKind.Sequential)]
    struct IO_COUNTERS
    {
        public UInt64 ReadOperationCount;
        public UInt64 WriteOperationCount;
        public UInt64 OtherOperationCount;
        public UInt64 ReadTransferCount;
        public UInt64 WriteTransferCount;
        public UInt64 OtherTransferCount;
    }

    [StructLayout(LayoutKind.Sequential)]
    struct JOBOBJECT_EXTENDED_LIMIT_INFORMATION
    {
        public JOBOBJECT_BASIC_LIMIT_INFORMATION BasicLimitInformation;
        public IO_COUNTERS IoInfo;
        public UIntPtr ProcessMemoryLimit;
        public UIntPtr JobMemoryLimit;
        public UIntPtr PeakProcessMemoryUsed;
        public UIntPtr PeakJobMemoryUsed;
    }

    /// <summary>
    /// An utility class for registering child processes that ensures that they will be killed if the current process crashes.
    /// </summary>
    internal class Job: IDisposable
    {
        [DllImport("kernel32.dll", CharSet = CharSet.Unicode)]
        static extern IntPtr CreateJobObject(IntPtr a, string lpName);

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern bool SetInformationJobObject(IntPtr hJob, JobObjectInfoType infoType, IntPtr lpJobObjectInfo, uint cbJobObjectInfoLength);

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern bool AssignProcessToJobObject(IntPtr job, IntPtr process);

        [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true, ExactSpelling = true)]
        static extern bool CloseHandle(IntPtr handle);
 
        private IntPtr m_handle;
        private bool m_disposed = false;

        public Job()
        {
            m_handle = CreateJobObject(IntPtr.Zero, null);

            var info = new JOBOBJECT_BASIC_LIMIT_INFORMATION { LimitFlags = 0x2000 };

            var extendedInfo = new JOBOBJECT_EXTENDED_LIMIT_INFORMATION { BasicLimitInformation = info };

            int length = Marshal.SizeOf(typeof(JOBOBJECT_EXTENDED_LIMIT_INFORMATION));
            IntPtr extendedInfoPtr = Marshal.AllocHGlobal(length);
            Marshal.StructureToPtr(extendedInfo, extendedInfoPtr, false);

            bool success = SetInformationJobObject(m_handle, JobObjectInfoType.ExtendedLimitInformation, extendedInfoPtr, (uint) length);
            if (!success)
            {
                Log.LogError(typeof(Job).FullName, "SetInformationJobObject returned error code " + Marshal.GetLastWin32Error());
            }
        }

        #region IDisposable Members

        public void Dispose()
        {
            Dispose(true);
#if LeakCheck
            GC.SuppressFinalize(this);
#endif
        }

#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <exclude />
        ~Job()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
        }
#endif
        #endregion

        private void Dispose(bool disposing)
        {
            if (m_disposed)
                return;

            if (disposing) { }

            Close();
            m_disposed = true;
        }

        public void Close()
        {
            CloseHandle(m_handle);
            m_handle = IntPtr.Zero;
        }

        public bool AddProcess(IntPtr handle)
        {
            return AssignProcessToJobObject(m_handle, handle);
        }
    }
}
