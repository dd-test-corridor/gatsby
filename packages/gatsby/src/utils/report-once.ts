import reporter from "gatsby-cli/lib/reporter"
import { isWorker } from "gatsby-worker"

const displayedWarnings = new Set<string>()

export const reportOnce = (
  message: string,
  method: "log" | "warn" | "info" | "success" | "verbose" | "error" = `warn`,
  key?: string
): void => {
  const messageId = key ?? message
  if (!displayedWarnings.has(messageId) && !isWorker) {
    displayedWarnings.add(messageId)
    switch (method) {
      case "log":
        reporter.log(message)
        break
      case "info":
        reporter.info(message)
        break
      case "success":
        reporter.success(message)
        break
      case "verbose":
        reporter.verbose(message)
        break
      case "error":
        reporter.error(message)
        break
      case "warn":
      default:
        reporter.warn(message)
        break
    }
  }
}
