using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Workflow.ComponentModel;
using System.Workflow.ComponentModel.Serialization;
using System.Workflow.Runtime.Hosting;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.Types;


namespace Composite.C1Console.Workflow
{
    internal class FileWorkFlowPersisetenceService : WorkflowPersistenceService
    {
        private static readonly string LogTitle = "Workflow File Persisting Service";
        private string _baseDirectory;
        private Guid[] _abortedWorkflows;
        private readonly object _syncRoot = new object();
   

        public FileWorkFlowPersisetenceService(string baseDirectory)
        {
            _baseDirectory = baseDirectory;
            this.PersistAll = false;
        }



        public bool PersistAll { get; set; }

        public IEnumerable<Guid> GetAbortedWorkflows()
        {
            return _abortedWorkflows ?? new Guid[0];
        }

        public IEnumerable<Guid> GetPersistedWorkflows()
        {
            foreach (string filePath in Directory.GetFiles(_baseDirectory, "*.bin"))
            {
                int idx = filePath.LastIndexOf(".bin");

                if (idx == -1) continue;

                string guidString = filePath.Remove(idx);

                Guid guid = Guid.Empty;
                try
                {
                    guid = new Guid(guidString);                    
                }
                catch {}

                if (guid.Equals(Guid.Empty) == false)
                {
                    yield return guid;
                }
            }
        }



        public bool RemovePersistedWorkflow(Guid instanceId)
        {
            string filename = GetFileName(instanceId);

            if (File.Exists(filename) == true)
            {
                try
                {
                    File.Delete(filename);

                    LoggingService.LogVerbose("FileWorkFlowPersisetenceService", string.Format("Workflow persisted state deleted. Id = {0}", instanceId));
                }
                catch
                {
                    return false;
                }
            }

            return true;
        }



        protected override Activity LoadCompletedContextActivity(Guid scopeId, Activity outerActivity)
        {
            object obj = DeserializeActivity(outerActivity, scopeId);
            return (Activity)obj;
        }



        protected override Activity LoadWorkflowInstanceState(Guid instanceId)
        {
            try
            {
                object obj = DeserializeActivity(null, instanceId);
                return (Activity)obj;
            }
            catch (Exception ex)
            {
                string filename = GetFileName(instanceId);
                LoggingService.LogCritical(LogTitle, ex);
                LoggingService.LogWarning(LogTitle, string.Format("Failed to load workflow with id '{0}'. Deleting file.", filename));
                File.Delete(filename);

                MarkWorkflowAsAborted(instanceId);
                return null;
            }
        }



        protected override void SaveCompletedContextActivity(Activity activity)
        {
            Guid contextGuid = (Guid)activity.GetValue(Activity.ActivityContextGuidProperty);
            SerializeActivity(activity, contextGuid);
        }



        protected override void SaveWorkflowInstanceState(Activity rootActivity, bool unlock)
        {
            Guid contextGuid = (Guid)rootActivity.GetValue(Activity.ActivityContextGuidProperty);
            SerializeActivity(rootActivity, contextGuid);
        }


        protected override bool UnloadOnIdle(Activity activity)
        {
            return GetPersistingType(activity) == WorkflowPersistingType.Idle;
        }



        protected override void UnlockWorkflowInstanceState(Activity rootActivity)
        {
            //empty
        }

        private bool ActivityIsSerializable(Activity activity)
        {
            return PersistAll || GetPersistingType(activity) != WorkflowPersistingType.Never;
        }

        private WorkflowPersistingType GetPersistingType(Activity activity)
        {
            List<AllowPersistingWorkflowAttribute> attributes = activity.GetType().GetCustomAttributesRecursively<AllowPersistingWorkflowAttribute>().ToList();

            if (attributes.Count == 0) return WorkflowPersistingType.Never;

            return attributes[0].WorkflowPersistingType;
        }

        private void SerializeActivity(Activity rootActivity, Guid id)
        {
            if (!ActivityIsSerializable(rootActivity))
            {
                LoggingService.LogVerbose("FileWorkFlowPersisetenceService", string.Format("The workflow does not support persiting. Id = {0}, Type = {1}", id, rootActivity.GetType()));
                return;
            }

            string filename = GetFileName(id);

            IFormatter formatter = new BinaryFormatter();
            formatter.SurrogateSelector = ActivitySurrogateSelector.Default;

            using (FileStream stream = new FileStream(filename, System.IO.FileMode.OpenOrCreate))
            {
                rootActivity.Save(stream, formatter);
                stream.Close();
            }

            // LoggingService.LogVerbose("FileWorkFlowPersisetenceService", string.Format("Workflow persisted. Id = {0}, Type = {1}", id, rootActivity.GetType()));
        }



        private object DeserializeActivity(Activity rootActivity, Guid id)
        {
            string filename = GetFileName(id);
            object result;

            IFormatter formatter = new BinaryFormatter();
            formatter.SurrogateSelector = ActivitySurrogateSelector.Default;

            using (FileStream stream = new FileStream(filename, System.IO.FileMode.Open))
            {
                result = Activity.Load(stream, rootActivity, formatter);
                stream.Close();
            }

            // LoggingService.LogVerbose("FileWorkFlowPersisetenceService", string.Format("Workflow loaded. Id = {0}, Type = {1}", id, result.GetType()));

            return result;
        }

        private void MarkWorkflowAsAborted(Guid id)
        {
            lock(_syncRoot)
            {
                List<Guid> newList = new List<Guid>(_abortedWorkflows ?? new Guid[0]);
                newList.Add(id);

                _abortedWorkflows = newList.ToArray();
            }
        }

        private string GetFileName(Guid id)
        {
            return System.IO.Path.Combine(this._baseDirectory, id.ToString() + ".bin");
        }
    }
}
