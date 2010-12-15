using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.Core.Logging;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ActionLockingFacade
    {
        private static Dictionary<EntityToken, LockingInformation> _lockingInformations = null;
        private static object _lock = new object();


        static ActionLockingFacade()
        {
            GlobalEventSystemFacade.SubscribeToShutDownEvent(OnShutDownEvent);
        }



        private static void EnsureInitialization()
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                lock (_lock)
                {
                    if (_lockingInformations == null)
                    {
                        DoInitialize();
                    }
                }
            }
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityToken"></param>
        /// <param name="ownerId">Should be serializable</param>
        public static void AcquireLock(EntityToken entityToken, object ownerId)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                LockingInformation lockingInformation;
                if (_lockingInformations.TryGetValue(entityToken, out lockingInformation) == false)
                {
                    lockingInformation = new LockingInformation
                    {
                        Username = UserValidationFacade.GetUsername(),
                        OwnerId = ownerId
                    };

                    _lockingInformations.Add(entityToken, lockingInformation);
                }
                else if (object.Equals(lockingInformation.OwnerId, ownerId) == true)
                {
                    // NOOP: The owner me acqure a lock multiple times
                }
                else
                {
                    // This will only happen if an entity token subclass not not rightly implemented
                    throw new ActionLockingException("This item is used by another user, try again.");
                }
            }
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityToken"></param>
        /// <param name="newOwnerId">Should be serializable</param>
        public static void ChangeLockOwner(EntityToken entityToken, object newOwnerId)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                LockingInformation lockingInformation;
                if (_lockingInformations.TryGetValue(entityToken, out lockingInformation) == true)
                {
                    lockingInformation.OwnerId = newOwnerId;
                }
                else
                {
                    throw new NotImplementedException();
                }
            }
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityToken"></param>
        /// <param name="ownerId">Should be serializable</param>
        public static void ReleaseLock(EntityToken entityToken, object ownerId)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                LockingInformation lockingInformation;
                if (_lockingInformations.TryGetValue(entityToken, out lockingInformation) == true)
                {
                    if (lockingInformation.OwnerId == ownerId)
                    {
                        _lockingInformations.Remove(entityToken);
                    }
                }
            }
        }        



        /// <summary>
        /// 
        /// </summary>
        /// <param name="ownerId">Should be serializable</param>
        public static void ReleaseAllLocks(object ownerId)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                List<EntityToken> entityTokens =
                    (from li in _lockingInformations
                     where object.Equals(li.Value.OwnerId, ownerId)
                     select li.Key).ToList();

                foreach (EntityToken entityToken in entityTokens)
                {
                    _lockingInformations.Remove(entityToken);
                }
            }
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityToken">Entity token to check if it is locked.</param>
        /// <returns>True if the given entityToken is locked</returns>
        public static bool IsLocked(EntityToken entityToken)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                return _lockingInformations.ContainsKey(entityToken);
            }
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityToken">Entity token to check if it is locked.</param>
        /// <returns>Returns the name of the user who has locked the given entity token. Null if no one has a lock on it.</returns>
        public static string LockedBy(EntityToken entityToken)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                LockingInformation lockingInformation;
                if (_lockingInformations.TryGetValue(entityToken, out lockingInformation) == true)
                {
                    return lockingInformation.Username;
                }
                else
                {
                    return null;
                }
            }
        }



        /// <summary>    
        /// </summary>
        /// <exclude />
        public static IDisposable Locker
        {
            get
            {
                return new LockerToken();
            }
        }


        internal static void ReleaseAll(string username)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                List<EntityToken> entityTokensToRemove =
                    (from info in _lockingInformations
                     where info.Value.Username == username
                     select info.Key).ToList();

                foreach (EntityToken entityToken in entityTokensToRemove)
                {
                    _lockingInformations.Remove(entityToken);
                }
            }
        }



        /// <summary>
        /// This is a "non-safe" release of a lock. For safe use, use ReleaseLock
        /// </summary>
        /// <param name="entityToken"></param>        
        public static void RemoveLock(EntityToken entityToken)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                if (_lockingInformations.ContainsKey(entityToken) == true)
                {
                    _lockingInformations.Remove(entityToken);
                }
            }
        }



        private static void DoInitialize()
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                LoggingService.LogVerbose("RGB(194, 252, 131)ActionLockingFacade", "----------========== Initializing EntityToken Locks ==========----------");
                int startTime = Environment.TickCount;

                if (_lockingInformations == null)
                {
                    _lockingInformations = new Dictionary<EntityToken, LockingInformation>();

                    LoadLockingInformation();
                }

                int endTime = Environment.TickCount;
                LoggingService.LogVerbose("RGB(194, 252, 131)ActionLockingFacade", string.Format("----------========== Done initializing EntityToken Locks ({0} ms ) ==========----------", endTime - startTime));
            }
        }



        private static void LoadLockingInformation()
        {
            IFormatter formatter = new BinaryFormatter();

            List<ILockingInformation> lockingInformations = DataFacade.GetData<ILockingInformation>().ToList();
            List<Guid> lockingInformationsToDelete = new List<Guid>();

            foreach (ILockingInformation lockingInformation in lockingInformations)
            {
                object ownerId;

                byte[] bytes = Convert.FromBase64String(lockingInformation.SerializedOwnerId);
                using (MemoryStream ms = new MemoryStream(bytes))
                {
                    ownerId = formatter.Deserialize(ms);
                }

                LockingInformation li = new LockingInformation
                {
                     OwnerId = ownerId, 
                     Username = lockingInformation.Username                    
                };

                EntityToken entityToken = EntityTokenSerializer.Deserialize(lockingInformation.SerializedEntityToken);

                try
                {
                    _lockingInformations.Add(entityToken, li);
                }
                catch (Exception)
                {
                    // Remove broking locking information (Ex. dead data source ids) /MRJ
                    lockingInformationsToDelete.Add(lockingInformation.Id);
                }
            }

            foreach (Guid id in lockingInformationsToDelete)
            {
                DataFacade.Delete<ILockingInformation>(f => f.Id == id);
            }
        }



        private static void PersistLockingInformation()
        {            
            DataFacade.Delete<ILockingInformation>(f => true);

            IFormatter formatter = new BinaryFormatter();
            foreach (var lockingInformation in _lockingInformations)
            {
                string serializedOwnerId;

                using (MemoryStream ms = new MemoryStream())
                {
                    formatter.Serialize(ms, lockingInformation.Value.OwnerId);

                    byte[] bytes = ms.ToArray();

                    serializedOwnerId = Convert.ToBase64String(bytes);
                }

                ILockingInformation li = DataFacade.BuildNew<ILockingInformation>();
                li.Id = Guid.NewGuid();
                li.SerializedEntityToken = EntityTokenSerializer.Serialize(lockingInformation.Key);
                li.SerializedOwnerId = serializedOwnerId;
                li.Username = lockingInformation.Value.Username;

                DataFacade.AddNew<ILockingInformation>(li);
            }
        }



        private static void Lock()
        {
            bool success = false;
            Monitor.TryEnter(_lock, TimeSpan.FromMinutes(1), ref success);

            if (!success)
            {
                throw new InvalidOperationException("Failed to obtain a required resource lock. Aborting to avoid system deadlocks.");
            }
        }



        private static void Exit()
        {
            Monitor.Exit(_lock);
        }



        private static void OnShutDownEvent(ShutDownEventArgs args)
        {
            PersistLockingInformation();
        }



        private sealed class LockingInformation
        {
            public string Username { get; set; }
            public object OwnerId { get; set; }
        }



        private sealed class LockerToken : IDisposable
        {
            internal LockerToken()
            {
                using (GlobalInitializerFacade.CoreNotLockedScope)
                {
                    ActionLockingFacade.Lock();
                }
            }



            public void Dispose()
            {
                ActionLockingFacade.Exit();
            }
        }
    }
}
