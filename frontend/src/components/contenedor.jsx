{mockTodos.map((todo) => (
            <Card key={todo.id} className={`transition-all duration-200 ${todo.completed ? "bg-gray-50" : "bg-white"}`}>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3 flex-1 w-full">
                    <Button
                      variant={todo.completed ? "default" : "outline"}
                      size="sm"
                      className={`h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0 ${todo.completed ? "bg-green-600 hover:bg-green-700" : "bg-white text-gray-600"}`}
                    >
                      <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <div className="flex-1 min-w-0">
                      <span
                        className={`block text-sm sm:text-base break-words ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                      >
                        {todo.text}
                      </span>
                      {todo.completed && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs mt-1 sm:hidden">
                          Completada
                        </Badge>
                      )}
                    </div>
                    {todo.completed && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 text-xs sm:text-sm hidden sm:inline-flex"
                      >
                        Completada
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 bg-white text-red-600 hover:bg-red-50 flex-shrink-0 self-end sm:self-center"
                  >
                    <Trash2 className="h-4 w-4 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>