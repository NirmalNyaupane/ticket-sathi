import { EnvConfiguration, Environment } from "../config/env.config";
import { Worker, Queue, Job } from "bullmq";
import RedisUtil from "./redis.util";
import { Redis } from "ioredis";
import sendMail, { MailType } from "./email.util";
import emailUtil from "./email.util";
class QueueUtil {
  static emailQueue: Queue | null = null;

  initiate() {
    if (EnvConfiguration.NODE_ENV === Environment.DEVELOPMENT) {
      QueueUtil.emailQueue = new Queue("email-queue", {
        connection: RedisUtil.redis ?? new Redis(),
      });
      return QueueUtil.emailQueue;
    }

    new Worker(
      "email-queue",
      async (job: Job) => {
        sendMail.sendMail(job.data.mailType, {
          to: job.data.to,
          subject: job.data.subject,
          data: job.data.data,
        });
      },
      {
        connection: RedisUtil.redis ?? new Redis(),
        limiter: {
          duration: 1000, //1 seconds
          max: 50, //send 50 email in one seconds
        },
      }
    );
  }

  static async addEmailJob(data: {
    to: string;
    mailType: MailType;
    subject: string;
    data: any;
  }) {
    await QueueUtil.emailQueue?.add("email-job", data);
  }
}

export default QueueUtil;
