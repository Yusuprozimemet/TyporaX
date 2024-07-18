1. prepare the github repository

   ![Screenshot (2185)](E:\NotesTypora\images\Screenshot (2185).png)

2. download the dataset

   ![Screenshot (2186)](E:\NotesTypora\images\Screenshot (2186).png)

3. clone the github repository on your computer with git bash

   ![Screenshot (2187)](E:\NotesTypora\images\Screenshot (2187).png)

4. go to the chicken disease classification project folder on git bash

   ![Screenshot (2188)](E:\NotesTypora\images\Screenshot (2188).png)

5. open the vs code using git bash
   ![Screenshot (2189)](E:\NotesTypora\images\Screenshot (2189).png)

6. then create template.py

   ![Screenshot (2191)](E:\NotesTypora\images\Screenshot (2191).png)

7. Then start to write the logic

   ![Screenshot (2192)](E:\NotesTypora\images\Screenshot (2192).png)

8. run template.py 

   ![Screenshot (2193)](E:\NotesTypora\images\Screenshot (2193).png)

**when I was running the template.py , Git Bash terminal does not recognize the Anaconda Python installation because the Anaconda `bin` directory is not included in my `PATH`. Here are the steps to ensure that my Anaconda Python is accessible from Git Bash:**

1. **nano ~/.bashrc**
2. **export PATH="/E/Anaconda:$PATH"**
3. **Save the file and exit the editor (`Ctrl+X`, `Y`, `Enter` in `nano`).**
4. **source ~/.bashrc**
5. **python --version**

then the project folder structure to be pushed to github 

![Screenshot (2194)](E:\NotesTypora\images\Screenshot (2194).png)

![Screenshot (2195)](E:\NotesTypora\images\Screenshot (2195).png)

9. **The `-e .` option in the `pip install` command is related to `setup.py` in that it installs the package in editable mode based on the instructions provided in the `setup.py` file. Here’s how they relate:**

   ### `setup.py`

   `setup.py` is a Python script traditionally used for **configuring Python packages**. It contains metadata about the package (such as name, version, and dependencies) and instructions on how to install it. Here is a basic example of what `setup.py` might look like:

   ```python
   from setuptools import setup, find_packages
   
   setup(
       name="my_package",
       version="0.1",
       packages=find_packages(),
       install_requires=[
           "numpy",
           "pandas",
           # Add other dependencies here
       ],
   )
   ```

   ### Editable Installation (`-e .`)

   When you run the command:

   ```sh
   pip install -e .
   ```

   Here's what happens:

   1. **Editable Mode**: The `-e` flag stands for "editable". This means that **the package is linked to the source code directory**. Changes made to the source code will be immediately available without needing to reinstall the package.
   2. **Current Directory (`.`)**: The `.` specifies the current directory as the location of the package source code, where `setup.py` is located.

   ### Relationship

   - **Setup Configuration**: The `setup.py` file provides the configuration that `pip` uses to understand how to install the package. This includes dependencies, package name, version, and other metadata.
   - **Link to Source Code**: The `-e .` command tells `pip` to install the package in a way that keeps a link to the source code directory. This is particularly useful during development because it allows you to edit your code and immediately test the changes without needing to reinstall the package.

   ### Why Use `-e .`?

   - **Development Convenience**: It allows developers to work on the package source code and test changes immediately.
   - **Dependency Management**: It ensures that all dependencies specified in `setup.py` are installed in the development environment.
   - **Consistency**: It keeps the package configuration consistent with what is defined in `setup.py`.

   By using `setup.py` with `pip install -e .`, you streamline the development process, making it easier to manage dependencies and iterate on your package code.

10. **The source code directory refers to the directory where the source code of your project or package is located.** This directory contains all the files and subdirectories that make up the project's codebase, including modules, scripts, configuration files, and resources.

    ### Structure of a Typical Source Code Directory

    Here’s an example structure of a source code directory for a Python project:

    ```
    my_project/
    ├── my_package/
    │   ├── __init__.py
    │   ├── module1.py
    │   ├── module2.py
    │   └── subpackage/
    │       ├── __init__.py
    │       └── submodule.py
    ├── tests/
    │   ├── __init__.py
    │   ├── test_module1.py
    │   └── test_module2.py
    ├── setup.py
    ├── README.md
    └── requirements.txt
    ```

    ### Components of the Source Code Directory

    - **`my_package/`**: This is the main package directory containing the Python modules and subpackages.
      - **`__init__.py`**: **This file makes the directory a package, allowing you to import its modules.**
      - **`module1.py`, `module2.py`**: Example Python modules containing source code.
      - **`subpackage/`**: A subpackage within the main package, with its own modules and `__init__.py`.
    - **`tests/`**: A directory containing unit tests for the package modules.
      - **`__init__.py`**: Makes the directory a package.
      - **`test_module1.py`, `test_module2.py`**: Test scripts for the corresponding modules.
    - **`setup.py`**: A script for configuring the package, specifying metadata and dependencies.
    - **`README.md`**: A markdown file providing an overview and documentation for the project.
    - **`requirements.txt`**: A file listing the project's dependencies.

    ### Example

    To elaborate further, here’s a simple example of what some of these files might contain:

    #### `my_package/module1.py`

    ```python
    def greet(name):
        return f"Hello, {name}!"
    ```

    #### `my_package/__init__.py`

    ```python
    from .module1 import greet
    ```

    #### `tests/test_module1.py`

    ```python
    import unittest
    from my_package.module1 import greet
    
    class TestGreet(unittest.TestCase):
        def test_greet(self):
            self.assertEqual(greet("World"), "Hello, World!")
    
    if __name__ == "__main__":
        unittest.main()
    ```

    #### `setup.py`

    ```python
    from setuptools import setup, find_packages
    
    setup(
        name="my_package",
        version="0.1",
        packages=find_packages(),
        install_requires=[
            # Dependencies go here, e.g., 'numpy', 'pandas'
        ],
    )
    ```

    ### Role of the Source Code Directory

    - **Development**: It is the directory where you write, organize, and maintain your project’s code.
    - **Distribution**: When packaging your project for distribution (e.g., via PyPI), `setup.py` uses this directory to collect and package the necessary files.
    - **Installation**: When you run `pip install -e .` from this directory, it installs the package in editable mode, linking the installed package to this source directory, so changes you make here are immediately reflected.

    Understanding the source code directory and its contents is essential for organizing, developing, and distributing Python projects effectively.

    11. **So, I need to set up `src/cnnClassifier` as a local package. That is why I need to write `setup.py`.**By setting up `src/cnnClassifier` as a local package and writing a `setup.py` file, you make it easier to manage dependencies, install the package in editable mode, and organize your project. This is particularly useful for larger projects or when you want to distribute your package.

    12. Before installing the packages, I need to create a virtual environment because I don't want to install them in the base environment. I will use `conda create -n chicken python=3.8 -y` for this purpose.

        ![Screenshot (2196)](E:\NotesTypora\images\Screenshot (2196).png)

    13. After creating the virtual environment, I needed to activate it. However, I encountered issues trying to activate `chicken` using Git Bash. So, I opened VS Code to navigate to the Python environment and activated `chicken` there. I then proceeded to install the packages listed in `requirements.txt`. Afterwards, I verified the installation by running `pip show tensorflow`, which confirmed that TensorFlow was installed. Everything seemed fine, but I still don't understand why `conda activate chicken` didn't work in Git Bash.

        ![Screenshot (2198)](E:\NotesTypora\images\Screenshot (2198).png)

        ## The problem is solved by this

        ![Screenshot (2202)](E:\NotesTypora\images\Screenshot (2202).png)

        ![Screenshot (2203)](E:\NotesTypora\images\Screenshot (2203).png)

        then I run git install -r requirements.txt on git bash. 

        ![Screenshot (2204)](E:\NotesTypora\images\Screenshot (2204).png)

14. I created a logging module and a utils module. I haven't created the exception module yet because I plan to use an exception package later. Typically, for the logging module, I would create a `logging` folder and place the constructor file inside it. However, for simplicity's sake, every time I import the logging file, I would need to specify `from src.cnnclassifier import logging`. On the other hand, if I include `logging` inside `src/__init__.py`, I can simplify the import process. From `cnnclassifier`, I can then directly import `logging`.

    ***Logging* is crucial in software development for tracking program execution, diagnosing issues, monitoring performance, ensuring compliance, and enhancing security. It categorizes messages by severity (e.g., `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`) and provides contextual information like timestamps and module names. Logs aid in debugging, performance monitoring, auditing, security monitoring, and long-term analysis of application behavior.**

    ***Exception handling*, on the other hand, manages errors during execution, enabling recovery and ensuring application stability. It uses `try`, `except`, `finally`, and `raise` statements to handle exceptions and provide robust error management. While logging provides insights into normal and abnormal program behavior, exception handling specifically focuses on error recovery and maintaining application reliability.**

    ![Screenshot (2199)](E:\NotesTypora\images\Screenshot (2199).png)

15. To begin, I import necessary libraries: `os`, `sys`, and `logging`. The `logging` library is particularly important because it allows me to record and manage log messages in my Python program.

    **For my custom logging setup,** I define a format string `logging_str` that specifies how each log message should appear. This format includes details like the timestamp of the log (`%(asctime)s`), the log level (`%(levelname)s`), the module name (`%(module)s`), and the actual message (`%(message)s`).

    Next, I prepare a directory named `logs` where all my log files will be stored. Inside this directory, I create a specific file called `running_logs.log`. This file will store all the log messages generated during the execution of my program.

    Now, I configure the logging system using `logging.basicConfig()`. This function sets up the foundational settings for how logging will work in my program:

    - **Level**: I set the logging level to `INFO`, which means only messages of `INFO` level and higher (like warnings and errors) will be logged.
    - **Format**: I specify the `logging_str` format that I defined earlier. This format ensures that each log message is structured with the timestamp, log level, module name, and message content.
    - **Handlers**: I configure two handlers:
      - `FileHandler`: This handler directs log messages to the `running_logs.log` file that I created. It ensures that all logged information is stored in this file.
      - `StreamHandler`: This handler sends log messages to the standard output (usually the terminal or command prompt). This allows me to see log messages as they are generated during program execution.

    Finally, I create a `logger` object named `cnnClassifierLogger` using `logging.getLogger()`. This `logger` object is what I will use throughout my Python program to record various events and messages. It simplifies logging by allowing me to call `logger.info()`, `logger.warning()`, `logger.error()`, etc., to log messages according to their severity level.

    Here's the Python code that accomplishes all of this:

    ```python
    import os
    import sys
    import logging
    
    # Define the logging format string
    logging_str = "[%(asctime)s: %(levelname)s: %(module)s: %(message)s]"
    
    # Create a directory for log files
    log_dir = "logs"
    log_filepath = os.path.join(log_dir, "running_logs.log")
    os.makedirs(log_dir, exist_ok=True)
    
    # Configure logging
    logging.basicConfig(
        level=logging.INFO,  # Set logging level to INFO
        format=logging_str,  # Use the defined logging format
        handlers=[
            logging.FileHandler(log_filepath),  # Log to file: running_logs.log
            logging.StreamHandler(sys.stdout)  # Log to terminal
        ]
    )
    
    # Create a logger object
    logger = logging.getLogger("cnnClassifierLogger")
    ```

    In summary, this setup ensures that all important events and messages in my Python program are logged both to a file (`running_logs.log`) and displayed in the terminal. The `logger` object simplifies the process of logging by providing a structured way to record and manage these messages throughout the program's execution.

16. So now I want to test if logging is working or not. First, create the `main.py` file outside of the folder. Then, import the logger by writing `from cnnclassifier import logger` and add a log info message. Finally, execute the `main.py`.

    **Placing `main.py` outside of the `src` folder is a common practice to improve project structure. It keeps the entry point of the application separate from the source code, making it clear which script starts the program and which files contain the library or module code. This organization helps maintain a clean and understandable directory layout.**

    ![Screenshot (2200)](E:\NotesTypora\images\Screenshot (2200).png)

17. Now I will start writing utility functions. These are functions that are used frequently in my code. For example, a function for reading files.

    ![Screenshot (2201)](E:\NotesTypora\images\Screenshot (2201).png)

18. Let's talk about `ConfigBox`. I'll look into how they work in the `research/trials.ipynb` notebook. And when it comes to handling errors, I use `BoxValueError`.

    ### ConfigBox

    `ConfigBox` helps us handle YAML files easily. It lets us grab configuration values quickly without any fuss.

    ### YAML (YAML Ain't Markup Language)

    YAML is a format for storing data. YAML supports several data types, including scalars (strings, numbers), sequences (lists), and mappings (dictionaries).

    ![Screenshot (2205)](E:\NotesTypora\images\Screenshot (2205).png)

19. now let's talk about the @ensure_annotation. 

    `ensure_annotations` is a Python decorator provided by the `ensure` library. It ensures that type annotations on function parameters and return values are checked at runtime. This helps in validating inputs and outputs according to specified types, enhancing code reliability and debugging efficiency.

    ![Screenshot (2206)](E:\NotesTypora\images\Screenshot (2206).png)

20. now let's follow this workflows

    ![Screenshot (2207)](E:\NotesTypora\images\Screenshot (2207).png)

21. Before implementing modular coding, I conduct experiments in a notebook. If everything functions correctly there, I then convert it to modular coding. Prior to that, I update the `config.yaml` file by adding the URL of the dataset, which is uploaded on GitHub as a zip file. All configurations related to data ingestion will be kept there. 

    ![Screenshot (2208)](E:\NotesTypora\images\Screenshot (2208).png)

22. read yaml file, before that, i need to write some content to constant __init__.py and params.yaml

    ![Screenshot (2210)](E:\NotesTypora\images\Screenshot (2210).png)

![Screenshot (2211)](E:\NotesTypora\images\Screenshot (2211).png)

for the first time when I run tried to read, I failed. 

![Screenshot (2209)](E:\NotesTypora\images\Screenshot (2209).png)

because I guess I need to specify the path of cnnClassifier, like this:

![Screenshot (2212)](E:\NotesTypora\images\Screenshot (2212).png)

23. then I need to update the configuration manager in src config. so this is also needs to be tested on notebook.

    ![Screenshot (2213)](E:\NotesTypora\images\Screenshot (2213).png)

24. then I need to update the components

    ![Screenshot (2214)](E:\NotesTypora\images\Screenshot (2214).png)

25. Now I need to create pipeline

    ![Screenshot (2215)](E:\NotesTypora\images\Screenshot (2215).png)

26. Well, this looks good in the notebook, so let me convert it to modular coding. To do this, follow these steps:

    1. Update config.yaml (done)

    2. Update secrets.yaml [Optional]
    3. Update params.yaml (done)
    4. **Update the entity (need to updated)**
    5. Update the configuration manager in src config
    6. Update the components
    7. Update the pipeline 
    8. Update the main.py
    9. Update the dvc.yaml

       

![Screenshot (2216)](E:\NotesTypora\images\Screenshot (2216).png)

copy from the notebook paste it to the config_entity.py

![Screenshot (2217)](E:\NotesTypora\images\Screenshot (2217).png)

27. then update
    1. Update config.yaml (done)
    2. Update secrets.yaml [Optional]
    3. Update params.yaml (done)
    4. Update the entity (done)
    5. **Update the configuration manager in src config**
    6. Update the components
    7. Update the pipeline 
    8. Update the main.py
    9. Update the dvc.yaml

copy paste again like previous one from notebook to configuration.py

![Screenshot (2218)](E:\NotesTypora\images\Screenshot (2218).png)

but it shows the DataIngestionConfig is not imported. so I need to import it from from src.cnnClassifier.entity.config_entity. 

![Screenshot (2219)](E:\NotesTypora\images\Screenshot (2219).png)

28. now I need to update components and create data_ingestion.py:

    1. Update config.yaml (done)

    2. Update secrets.yaml [Optional]

    3. Update params.yaml (done)

    4. Update the entity (done)

    5. Update the configuration manager in src config (done)

    6. **Update the components**

    7. Update the pipeline 

    8. Update the main.py

    9. Update the dvc.yaml

       

    ![Screenshot (2220)](E:\NotesTypora\images\Screenshot (2220).png)

29. then update the pipeline
    1. Update config.yaml (done)
    2. Update secrets.yaml [Optional]
    3. Update params.yaml (done)
    4. Update the entity (done)
    5. Update the configuration manager in src config (done)
    6. Update the components (done)
    7. **Update the pipeline** 
    8. Update the main.py
    9. Update the dvc.yaml

![Screenshot (2221)](E:\NotesTypora\images\Screenshot (2221).png)

30. update the main.py and run it if it is working properly.

    ![Screenshot (2222)](E:\NotesTypora\images\Screenshot (2222).png)

![Screenshot (2223)](E:\NotesTypora\images\Screenshot (2223).png)

When I ran `main.py`, I encountered an error stating that the module `src.cnnClassifier` could not be found. The issue was with the module path. By removing the `src` prefix from the import statements, the code worked correctly. 

By removing the `src` prefix from the import statements, I corrected the module path issue. This allows Python to find and import the `cnnClassifier` module correctly. This change aligns the import paths with the directory structure relative to the project root.

31. So far, everything is good. I pushed the code to GitHub and added `artifacts/*` to `.gitignore` to ignore the artifacts.

    ![Screenshot (2224)](E:\NotesTypora\images\Screenshot (2224).png)

32. Stage 02_prepare_base_model.ipynb is prepared. A more detailed explanation of the steps is written in the ipynb file.

    ![Screenshot (2225)](E:\NotesTypora\images\Screenshot (2225).png)

33. Now, let's convert `02_prepare_base_model.ipynb` to modular code. When I convert to modular code, I copy and paste the content into the original `.py` files. For the components, I created `prepare_base_model.py` and pasted the code into this file, not `data_ingestion.py`. so the components are separated.

    ![Screenshot (2228)](E:\NotesTypora\images\Screenshot (2228).png)

34. for the pipeline I also made separate py file.

    ![Screenshot (2229)](E:\NotesTypora\images\Screenshot (2229).png)

35. now I need to update main.py and run it. before running it delete the artifacts.

    ![Screenshot (2230)](E:\NotesTypora\images\Screenshot (2230).png)

36. When I ran `main.py`, I removed `src` from `src.cnnClassifier` in `utils/common.py`. After doing this, the run was successful. 

    ![Screenshot (2231)](E:\NotesTypora\images\Screenshot (2231).png)

37. So again push to the github

38. the next stage is prepare callbacks. so what is callbacks?

    Let's think of the training process of a machine learning model as a journey of a spaceship exploring the galaxy. The spaceship represents your model, and the mission is to reach the best possible performance.

    ### The Journey of the Spaceship: Callbacks

    1. **Mission Control (Main Program)**:
       - This is where you plan your journey. You set your spaceship's course, decide on the duration of the journey, and prepare for different scenarios. Your mission control is the main training loop in your code.

    2. **Navigation Officers (Callbacks)**:
       - These officers are the smart assistants who provide real-time insights and make decisions during the journey. They play different roles to ensure the spaceship stays on the right path and reaches its destination efficiently.

    #### Types of Navigation Officers:

    1. **Captain Early Stop**:
       - Captain Early Stop is always on the lookout for signs that the journey might be going off course. If the spaceship keeps heading in a direction without making any progress (no improvement in validation loss), Captain Early Stop commands to halt the mission to save resources.

       ```python
       from tensorflow.keras.callbacks import EarlyStopping
       captain_early_stop = EarlyStopping(monitor='val_loss', patience=3)
       ```

    2. **Lieutenant Model Checkpoint**:
       - Lieutenant Model Checkpoint ensures that every time the spaceship finds a better route (model improves), it logs the current state. This way, if something goes wrong, you can always revert to the best state.

       ```python
       from tensorflow.keras.callbacks import ModelCheckpoint
       lieutenant_model_checkpoint = ModelCheckpoint('best_model.h5', save_best_only=True, monitor='val_loss')
       ```

    3. **Engineer Learning Rate Scheduler**:
       - Engineer Learning Rate Scheduler adjusts the speed of the spaceship (learning rate) at different checkpoints of the journey. If the spaceship is going too fast or too slow, adjustments are made to optimize the journey.

       ```python
       from tensorflow.keras.callbacks import LearningRateScheduler
       def scheduler(epoch, lr):
           if epoch % 10 == 0 and epoch:
               return lr * 0.1
           return lr
       engineer_lr_scheduler = LearningRateScheduler(scheduler)
       ```

    4. **Commander Reduce LR on Plateau**:
       - Commander Reduce LR on Plateau monitors the journey and if the spaceship is not finding new paths for a while, it suggests slowing down (reducing learning rate) to explore more carefully.

       ```python
       from tensorflow.keras.callbacks import ReduceLROnPlateau
       commander_reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=5, min_lr=0.001)
       ```

    5. **Officer TensorBoard**:
       - Officer TensorBoard logs all the data about the journey, creating beautiful visualizations. This way, the mission control team can see detailed reports of the journey in real-time and make informed decisions.

       ```python
       from tensorflow.keras.callbacks import TensorBoard
       officer_tensorboard = TensorBoard(log_dir='./logs')
       ```

    ### Combining the Officers:

    **All these officers work together to ensure the spaceship’s journey is efficient and successful. You set them up in the mission control before launching the spaceship.**

    ```python
    # Combining the Navigation Officers
    callbacks = [
        captain_early_stop,
        lieutenant_model_checkpoint,
        engineer_lr_scheduler,
        commander_reduce_lr,
        officer_tensorboard
    ]
    
    # Launching the spaceship (training the model)
    model.fit(
        x_train, y_train,
        validation_data=(x_val, y_val),
        epochs=50,
        callbacks=callbacks
    )
    ```

    ### Conclusion:

    Callbacks are your trusty crew members during the machine learning training process. They provide real-time monitoring, adjust the course, save the best states, and ensure the journey (training) is successful. With their help, you can navigate through the challenges of training a model and reach your goal efficiently.

39. first start from the notebook experiment and it's done.

    ![Screenshot (2232)](E:\NotesTypora\images\Screenshot (2232).png)

40. I am now starting to convert it to module code. I have already updated the config.yaml, so now I will begin updating config_entity.py, configuration, and component. However, **for callbacks, I don't need to update the pipeline or the main.py file**. After all, I will push the code to GitHub.

    In many cases, you might not need to update `pipeline.py` for callbacks because callbacks are often designed to handle events or actions that occur during the execution of a pipeline, rather than modifying the structure or functionality of the pipeline itself. Here are a few reasons why this might be the case:

    1. **Separation of Concerns**: Callbacks typically handle specific tasks such as logging, early stopping, or adjusting learning rates, which are separate from the core functionality of the pipeline. Keeping them separate helps maintain clean and modular code.

    2. **Configurability**: Callbacks are often configured and attached to the pipeline externally. This allows you to add, remove, or modify callbacks without changing the pipeline code.

    3. **Reusability**: By not embedding callback logic directly into `pipeline.py`, you can reuse the same pipeline with different sets of callbacks for different experiments or use cases.

    4. **Simplicity**: Keeping `pipeline.py` focused on the main workflow simplifies the code, making it easier to understand and maintain. Callbacks can be complex and specialized, so isolating them in their own modules or configurations can keep the main pipeline code cleaner.

    If these reasons don't align with your specific context, providing more details about your project could help in offering a more tailored explanation.

41. Now I am starting to implement the next model component—model trainer. First, I created the trainer notebook and ran the experiment. I updated the config.yaml and ran the rest of the code. During the experiment for the trainer, I encountered several issues, such as "Unrecognized keyword arguments: ['batch_shape']". I tried to fix this by changing `model.save(path)` to `model.export(path)`. However, this created a model with a lower version of TensorFlow, which did not have attributes like `fit`. I was unsure how to fix it, so I removed all the config.yaml files and downloaded stage 04 training.ipynb from GitHub by Krish Naik. Then, I ran all the code from the beginning, using `model.save(path)` again. Somehow, this time it worked. I am still unsure what caused the initial problems with `['batch_shape']`.

42. So, now let me start the modular coding. I updated `entity` and `configuration.py`. Now I need to write my components in `training.py`. Then I will write the pipeline in `stage_03_training.py`. To open TensorBoard, I can run this command in Git Bash: `tensorboard --logdir artifacts/prepare_callbacks/tensorboard_log_dir/` and then open the localhost by **Ctrl + Click**. close it by control+c.

43. 

    ![Screenshot (2233)](E:\NotesTypora\images\Screenshot (2233).png)

44.  Then I will write the `pipeline--stage_03_training.py`. Right now, I have a problem with running `training.py`. It gives me the error: `ValueError: The filepath provided must end in .keras (Keras model format). Received: filepath=Model_ckpt.h5`. After all, it seems to be a compatibility or environmental setup issue. [GitHub Issue](https://github.com/keras-team/keras-io/issues/1844). So for now, I have left the problem as it is. I will fix it later. For now, I will check more details on how to set up a Python environment in data science projects using Conda, Virtualenv, and Python: [YouTube Video](https://youtu.be/bf7pCxj6mEg?si=JNsBkPlKl7BVt9bQ).

45. I downloaded the seemingly compatible versions of the packages and correctly set up the environment, but now I have this problem. Both the terminal in VSCode and Git Bash show the same error.

    

    ![Screenshot (2235)](E:\NotesTypora\images\Screenshot (2235).png)

46. I had a lot of problems, but now I will try this. Basically, I want to create an environment similar to Colab(python==3.10.12, tensorflow==2.15). So, I removed the old environment first using `conda remove --name chicken --all`.

    

    ![Screenshot (2236)](C:\Users\yosef\Pictures\Screenshots\Screenshot (2236).png)

    conda create -n chicken python=3.10.12 -y

    conda acitvate chicken

    pip install -r requirements.txt

    Well, after all of my efforts to fix the problems by reading [this GitHub issue](https://github.com/keras-team/keras-io/issues/1844), [this TensorFlow issue](https://github.com/tensorflow/models/issues/8990), and [this Keras issue](https://github.com/keras-team/keras/issues/13798), I finally fixed the problems and achieved success. 

    ![Screenshot (2237)](E:\NotesTypora\images\Screenshot (2237).png)

    extra knowledges: **Python 3.8 has been removed in Tensorflow 2.14**

47. Update the `dvc.yaml` file. To run that file, first initialize Git by running `git init`, then initialize DVC by running `dvc init`. To execute the commands one by one, use `dvc repro`. If `cnnClassifier` is a separate package that needs to be installed, ensure it’s installed in your environment by running `pip install -e .`.

    

    ![Screenshot (2238)](E:\NotesTypora\images\Screenshot (2238).png)

48. The `dvc dag` command generates a visual representation of the Directed Acyclic Graph (DAG) of your data pipeline. This DAG illustrates the dependencies between different stages of your pipeline, helping you understand how data flows through your project and which stages depend on which files or other stages.

![Screenshot (2239)](E:\NotesTypora\images\Screenshot (2239).png)

49. Now it's time to write the prediction pipeline in `predict.py`. Then, write `app.py` for the web application. For the website template, you can download one from [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/). Choose the appropriate one and paste it into `index.html`. For testing the app, open Git Bash and run `python app.py`. This will provide a localhost address. Then, open the browser and check if the application works. I can also train the model by simply adding `/training` after the localhost address, like this: `localhost:8080/training`.

![Screenshot (2240)](E:\NotesTypora\images\Screenshot (2240).png)

50. so the app is ready to be deployed. first I need to create docker image and then I will deploy the docker image. first create the docker file and initialize the docker by docker command.

![Screenshot (2242)](E:\NotesTypora\images\Screenshot (2242).png)

51. Then I create a `main.yaml` file in GitHub folder. This file helps with the CI/CD deployment. (Remove the `.gitkeep` file.) I can use this file for every project by just changing the name (in this case it is cnncls) without changing other things. whenever I push the code 2nd or 3rd time I need to uncomment the commented line.

    ![Screenshot (2243)](E:\NotesTypora\images\Screenshot (2243).png)

52. open aws console and search IAM and open IAM

    ![Screenshot (2244)](E:\NotesTypora\images\Screenshot (2244).png)

53. click user then create user

    ![Screenshot (2246)](E:\NotesTypora\images\Screenshot (2246).png)

54. I fill the user name as chicken and next, then I selected attach policies directly.

    ![Screenshot (2247)](E:\NotesTypora\images\Screenshot (2247).png)

55. search policies that are needed and select them and next

    ![Screenshot (2248)](E:\NotesTypora\images\Screenshot (2248).png)

55. and click create user

    ![Screenshot (2250)](E:\NotesTypora\images\Screenshot (2250).png)

56. it's successfully created and click click chicken.

    ![Screenshot (2251)](E:\NotesTypora\images\Screenshot (2251).png)

57. then click security credentials

    ![Screenshot (2253)](E:\NotesTypora\images\Screenshot (2253).png)

58.  then click create access key (right up), then next page click command line interface then click I understand the above recommendation...then click next.

    ![Screenshot (2256)](E:\NotesTypora\images\Screenshot (2256).png)

59. then click create access key

    ![Screenshot (2257)](E:\NotesTypora\images\Screenshot (2257).png)

60. then download the csv file, so I have already created the IAM user for deployment.

    ![Screenshot (2258)](E:\NotesTypora\images\Screenshot (2258).png)

61. so now I need to create ECR repository. click aws icon to back homepage,search for ECR

    ![Screenshot (2260)](E:\NotesTypora\images\Screenshot (2260).png)

62. then click create, name it chicken and click create repository

    ![Screenshot (2261)](E:\NotesTypora\images\Screenshot (2261).png)

63. it is successfully created and copy URI then save it on readme.md for later usage

    ![Screenshot (2263)](E:\NotesTypora\images\Screenshot (2263).png)

64. now I need to create EC2 machine.so go  back to homepage and search EC2.

    ![Screenshot (2264)](E:\NotesTypora\images\Screenshot (2264).png)

65. then click launch instance

    ![Screenshot (2265)](E:\NotesTypora\images\Screenshot (2265).png)

66. I fill the name as chicken_machine and selected Ubuntu and I selected default free version of amazon machine image

    ![Screenshot (2266)](E:\NotesTypora\images\Screenshot (2266).png)

67.for instance I selected t3.xlarge

![Screenshot (2267)](E:\NotesTypora\images\Screenshot (2267).png)

68. click create new key pair, name it chicken and lick create key pair.

    ![Screenshot (2268)](E:\NotesTypora\images\Screenshot (2268).png)

69. select these allow https ... allow http...

    ![Screenshot (2269)](E:\NotesTypora\images\Screenshot (2269).png)

70. for configure storage I write 32gb and lauch instance

    ![Screenshot (2271)](E:\NotesTypora\images\Screenshot (2271).png)

71. it's done and I click view all instance

    ![Screenshot (2272)](E:\NotesTypora\images\Screenshot (2272).png)

72. then click instance ID

![Screenshot (2273)](E:\NotesTypora\images\Screenshot (2273).png)

73. then click connect and another connect

    ![Screenshot (2274)](E:\NotesTypora\images\Screenshot (2274).png)

74. then I get the terminal

    ![Screenshot (2275)](E:\NotesTypora\images\Screenshot (2275).png)

75. then run this code on the machine one by one

    #optinal

    sudo apt-get update -y

    sudo apt-get upgrade

    #required

    curl -fsSL https://get.docker.com -o get-docker.sh

    sudo sh get-docker.sh

    sudo usermod -aG docker ubuntu

    newgrp docker

    ![Screenshot (2276)](E:\NotesTypora\images\Screenshot (2276).png)

76. so the docker is built

    ![Screenshot (2284)](E:\NotesTypora\images\Screenshot (2284).png)

77. then go to github--setting--runners

    ![Screenshot (2279)](E:\NotesTypora\images\Screenshot (2279).png)

78. then run the code from this page on the machine and after enter the name of the runner as self-hosted

    ![Screenshot (2283)](E:\NotesTypora\images\Screenshot (2283).png)

79. then on github create new repository secret

    ![Screenshot (2288)](E:\NotesTypora\images\Screenshot (2288).png)

80. then 

    ![Screenshot (2289)](E:\NotesTypora\images\Screenshot (2289).png)

![Screenshot (2290)](E:\NotesTypora\images\Screenshot (2290).png)

![Screenshot (2291)](E:\NotesTypora\images\Screenshot (2291).png)

![Screenshot (2292)](E:\NotesTypora\images\Screenshot (2292).png)

![Screenshot (2293)](E:\NotesTypora\images\Screenshot (2293).png)

81. then

     ![Screenshot (2294)](E:\NotesTypora\images\Screenshot (2294).png)

![Screenshot (2295)](E:\NotesTypora\images\Screenshot (2295).png)

![Screenshot (2296)](E:\NotesTypora\images\Screenshot (2296).png)

![Screenshot (2297)](E:\NotesTypora\images\Screenshot (2297).png)

![Screenshot (2298)](E:\NotesTypora\images\Screenshot (2298).png)

![Screenshot (2299)](E:\NotesTypora\images\Screenshot (2299).png)

![Screenshot (2300)](E:\NotesTypora\images\Screenshot (2300).png)

![Screenshot (2301)](E:\NotesTypora\images\Screenshot (2301).png)

![Screenshot (2302)](E:\NotesTypora\images\Screenshot (2302).png)

82. I have problem with the continuous delivery. I will fix this later. so I will terminate the instance for now. and I deleted ECR repository and IAM. 

    

![Screenshot (2303)](E:\NotesTypora\images\Screenshot (2303).png)

![Screenshot (2304)](E:\NotesTypora\images\Screenshot (2304).png)

