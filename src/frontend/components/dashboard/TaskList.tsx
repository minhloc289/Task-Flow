"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Calendar, Clock, AlertCircle, CheckCircle, Check } from "lucide-react"
import type { Task } from "../../types"

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onStatusChange: (taskId: string, status: Task["status"]) => void
}

export function TaskList({ tasks, onEdit, onDelete, onStatusChange }: TaskListProps) {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          color: "bg-red-50 text-red-700 border-red-200",
          dotColor: "bg-red-500",
        }
      case "medium":
        return {
          color: "bg-amber-50 text-amber-700 border-amber-200",
          dotColor: "bg-amber-500",
        }
      case "low":
        return {
          color: "bg-green-50 text-green-700 border-green-200",
          dotColor: "bg-green-500",
        }
      default:
        return {
          color: "bg-slate-50 text-slate-700 border-slate-200",
          dotColor: "bg-slate-500",
        }
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "todo":
        return {
          icon: <Clock className="h-4 w-4" />,
          text: "To Do",
          color: "text-slate-600",
          bgColor: "bg-slate-50",
        }
      case "in-progress":
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          text: "In Progress",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        }
      case "completed":
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          text: "Completed",
          color: "text-green-600",
          bgColor: "bg-green-50",
        }
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          text: "To Do",
          color: "text-slate-600",
          bgColor: "bg-slate-50",
        }
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "High"
      case "medium":
        return "Medium"
      case "low":
        return "Low"
      default:
        return "Medium"
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">No tasks found</h3>
        <p className="text-slate-500 mb-6">Create your first task to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const priorityConfig = getPriorityConfig(task.priority)
        const statusConfig = getStatusConfig(task.status)
        const overdue = isOverdue(task.dueDate)

        return (
          <Card
            key={task.id}
            className={`group transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
              task.status === "completed" ? "bg-slate-50/50 opacity-75" : "bg-white"
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <h3
                        className={`text-lg font-semibold text-slate-800 truncate ${
                          task.status === "completed" ? "line-through text-slate-500" : ""
                        }`}
                      >
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className={`w-2 h-2 rounded-full ${priorityConfig.dotColor}`} />
                        <Badge variant="outline" className={`${priorityConfig.color} text-xs font-medium px-2 py-1`}>
                          {getPriorityText(task.priority)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 mb-4 leading-relaxed line-clamp-2">{task.description}</p>

                  {/* Footer */}
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    {/* Status */}
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusConfig.bgColor}`}>
                      <div className={statusConfig.color}>{statusConfig.icon}</div>
                      <span className={`font-medium ${statusConfig.color}`}>{statusConfig.text}</span>
                    </div>

                    {/* Due Date */}
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className={`font-medium ${overdue ? "text-red-600" : "text-slate-600"}`}>
                        {formatDate(task.dueDate)}
                      </span>
                      {overdue && (
                        <Badge variant="destructive" className="text-xs font-medium">
                          Overdue
                        </Badge>
                      )}
                    </div>

                    {/* Category */}
                    <Badge variant="secondary" className="text-xs font-medium bg-slate-100 text-slate-700">
                      {task.category}
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                  {/* Complete/Uncomplete Button */}
                  {task.status !== "completed" ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onStatusChange(task.id, "completed")}
                      className="h-9 w-9 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full"
                      title="Mark as completed"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onStatusChange(task.id, "todo")}
                      className="h-9 w-9 p-0 text-slate-600 hover:text-slate-700 hover:bg-slate-100 rounded-full"
                      title="Mark as incomplete"
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                  )}

                  {/* Edit Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(task)}
                    className="h-9 w-9 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full"
                    title="Edit task"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(task.id)}
                    className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full"
                    title="Delete task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
